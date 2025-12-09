from backend.app import create_app, db
from backend.models import Producto, Cliente
import bcrypt


def create_seed():
    app = create_app()
    with app.app_context():
        db.create_all()
        if not Cliente.query.filter_by(email='admin@empresa.local').first():
            pw = 'Admin123!'
            pw_hash = bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()
            admin = Cliente(email='admin@empresa.local', nombre='Admin', apellido='Portal', password_hash=pw_hash, is_admin=True)
            db.session.add(admin)
            db.session.commit()
            print('Admin creado: admin@empresa.local / Admin123!')


if __name__ == '__main__':
    create_seed()