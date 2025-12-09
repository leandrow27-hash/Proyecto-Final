from flask import Blueprint, request, jsonify, current_app, url_for
from models import db, Cliente
from utils import validar_email, validar_telefono, jwt_encode, jwt_decode
import bcrypt
from authlib.integrations.flask_client import OAuth
import os
from functools import wraps

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
oauth = OAuth()

def init_oauth(app):
    oauth.init_app(app)
    # register google if credentials exist
    google_client_id = app.config.get('GOOGLE_CLIENT_ID') or os.getenv('GOOGLE_CLIENT_ID')
    google_client_secret = app.config.get('GOOGLE_CLIENT_SECRET') or os.getenv('GOOGLE_CLIENT_SECRET')
    if google_client_id and google_client_secret:
        oauth.register(
            name='google',
            client_id=google_client_id,
            client_secret=google_client_secret,
            server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
            client_kwargs={'scope': 'openid email profile'}
        )

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json or {}
    email = (data.get('email') or '').strip()
    telefono = (data.get('telefono') or '').strip()
    password = data.get('password','')

    if not validar_email(email):
        return jsonify({'error':'Email inválido'}), 400
    if telefono and not validar_telefono(telefono):
        return jsonify({'error':'Teléfono inválido'}), 400
    if not password or len(password) < 6:
        return jsonify({'error':'Password mínimo 6 caracteres'}), 400
    if Cliente.query.filter_by(email=email).first():
        return jsonify({'error':'Email ya registrado'}), 400

    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    cliente = Cliente(email=email, telefono=telefono, password_hash=pw_hash,
                      nombre=data.get('nombre'), apellido=data.get('apellido'))
    db.session.add(cliente)
    db.session.commit()

    token = jwt_encode({'cliente_id': cliente.id, 'email': cliente.email}, current_app.config['JWT_SECRET'], current_app.config['JWT_EXP_DELTA_SECONDS'])
    return jsonify({'token': token, 'cliente_id': cliente.id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    email = (data.get('email') or '').strip()
    password = data.get('password','')
    cliente = Cliente.query.filter_by(email=email).first()
    if not cliente or not cliente.password_hash:
        return jsonify({'error':'Credenciales inválidas'}), 401
    if not bcrypt.checkpw(password.encode(), cliente.password_hash.encode()):
        return jsonify({'error':'Credenciales inválidas'}), 401
    token = jwt_encode({'cliente_id': cliente.id, 'email': cliente.email}, current_app.config['JWT_SECRET'], current_app.config['JWT_EXP_DELTA_SECONDS'])
    return jsonify({'token': token, 'cliente_id': cliente.id}), 200

# jwt decorator
from flask import request as flask_request
def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = flask_request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return jsonify({'error':'Missing token'}), 401
        token = auth.split(' ',1)[1]
        try:
            payload = jwt_decode(token, current_app.config['JWT_SECRET'])
            flask_request.cliente_id = payload.get('cliente_id')
        except Exception as e:
            return jsonify({'error':'Token inválido', 'detail': str(e)}), 401
        return fn(*args, **kwargs)
    return wrapper


# auth.py (

from functools import wraps
from flask import request as flask_request

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = flask_request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return jsonify({'error':'Missing token'}), 401
        token = auth.split(' ',1)[1]
        try:
            payload = jwt_decode(token, current_app.config['JWT_SECRET'])
            flask_request.cliente_id = payload.get('cliente_id')
        except Exception as e:
            return jsonify({'error':'Token inválido', 'detail': str(e)}), 401

        # check is_admin in DB
        cliente = Cliente.query.get(flask_request.cliente_id)
        if not cliente or not getattr(cliente, 'is_admin', False):
            return jsonify({'error':'Acceso denegado - admin required'}), 403
        return fn(*args, **kwargs)
    return wrapper

# Endpoint para promover a admin (solo otro admin puede usarlo)
@auth_bp.route('/promote/<int:cliente_id>', methods=['POST'])
@admin_required
def promote_to_admin(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    cliente.is_admin = True
    db.session.commit()
    return jsonify({'msg': f'Cliente {cliente.id} promovido a admin'})


# Google OAuth endpoints (optional)
@auth_bp.route('/google/login')
def google_login():
    redirect_uri = current_app.config.get('GOOGLE_REDIRECT_URI') or url_for('auth.google_callback', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@auth_bp.route('/google/callback')
def google_callback():
    token = oauth.google.authorize_access_token()
    userinfo = oauth.google.parse_id_token(token)
    email = userinfo.get('email')
    google_id = userinfo.get('sub')
    cliente = Cliente.query.filter_by(email=email).first()
    if not cliente:
        cliente = Cliente(email=email, google_id=google_id, nombre=userinfo.get('given_name'), apellido=userinfo.get('family_name'))
        db.session.add(cliente)
        db.session.commit()
    jwt_token = jwt_encode({'cliente_id': cliente.id, 'email': cliente.email}, current_app.config['JWT_SECRET'], current_app.config['JWT_EXP_DELTA_SECONDS'])
    return jsonify({'token': jwt_token, 'cliente_id': cliente.id})
