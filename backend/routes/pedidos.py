from flask import Blueprint, request, jsonify, current_app
from app import db
from models import Pedido, PedidoItem, Producto
from decimal import Decimal
import stripe


bp = Blueprint('pedidos', __name__)


stripe.api_key = current_app.config.get('STRIPE_SECRET_KEY')


@bp.route('/carrito/checkout', methods=['POST'])
def iniciar_checkout():
data = request.json
user_id = data.get('user_id')
items = data.get('items', [])


# crear pedido en status pending
total = Decimal('0.00')
pedido = Pedido(user_id=user_id, total=0)
db.session.add(pedido)
db.session.flush()


line_items = []
for it in items:
prod = Producto.query.get(it['producto_id'])
cantidad = int(it.get('cantidad', 1))
precio = prod.precio
total += precio * cantidad
pi = PedidoItem(pedido_id=pedido.id, producto_id=prod.id, cantidad=cantidad, precio_unit=precio)
db.session.add(pi)
line_items.append({
'price_data': {
'currency': 'usd',
'product_data': {'name': prod.nombre},
'unit_amount': int(float(precio) * 100)
},
'quantity': cantidad
})


pedido.total = total
db.session.commit()


session = stripe.checkout.Session.create(
payment_method_types=['card'],
line_items=line_items,
mode='payment',
success_url=current_app.config.get('FRONTEND_URL') + '/pago/exito?session_id={CHECKOUT_SESSION_ID}',
cancel_url=current_app.config.get('FRONTEND_URL') + '/pago/error'
)


pedido.stripe_session_id = session.id
db.session.commit()


return jsonify({'checkout_url': session.url, 'session_id': session.id})