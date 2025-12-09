from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

try:
    from backend.config import Config
except Exception:
    from config import Config

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # If tests are running under pytest, prefer an in-memory sqlite DB
    try:
        import sys
        if 'pytest' in sys.modules:
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    except Exception:
        pass
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints if available (import inside to avoid circular imports)
    # Register blueprints: try both package-qualified and local imports
    # auth
    try:
        from backend.routes.auth_routes import bp as auth_bp
    except Exception:
        try:
            from routes.auth_routes import bp as auth_bp
        except Exception:
            auth_bp = None
    if auth_bp:
        app.register_blueprint(auth_bp, url_prefix='/auth')

    # public
    try:
        from backend.routes.public import bp as public_bp
    except Exception:
        try:
            from routes.public import bp as public_bp
        except Exception:
            public_bp = None
    if public_bp:
        app.register_blueprint(public_bp, url_prefix='/api')

    # productos
    try:
        from backend.routes.productos import bp as productos_bp
    except Exception:
        try:
            from routes.productos import bp as productos_bp
        except Exception:
            productos_bp = None
    if productos_bp:
        app.register_blueprint(productos_bp, url_prefix='/api')

    # pedidos
    try:
        from backend.routes.pedidos import bp as pedidos_bp
    except Exception:
        try:
            from routes.pedidos import bp as pedidos_bp
        except Exception:
            pedidos_bp = None
    if pedidos_bp:
        app.register_blueprint(pedidos_bp, url_prefix='/api')

    # admin
    try:
        from backend.routes.admin import bp as admin_bp
    except Exception:
        try:
            from routes.admin import bp as admin_bp
        except Exception:
            admin_bp = None
    if admin_bp:
        app.register_blueprint(admin_bp, url_prefix='/admin')

    # Stripe webhook registration (optional)
    try:
        from backend.payments import register_webhook
    except Exception:
        try:
            from payments import register_webhook
        except Exception:
            register_webhook = None
    if register_webhook:
        try:
            register_webhook(app)
        except Exception:
            pass

    return app


app = create_app()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
