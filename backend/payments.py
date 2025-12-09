from flask import request, Blueprint, current_app
import stripe
from app import db
from models import Pedido


stripe.api_key = current_app.config.get('STRIPE_SECRET_KEY') if current_app else None


def register_webhook(app):
bp = Blueprint('stripe_webhook', __name__)


@bp.route('/stripe/webhook', methods=['POST'])
def webhook():
payload = request.data
sig_header = request.headers.get('Stripe-Signature')
endpoint_secret = app.config.get('STRIPE_WEBHOOK_SECRET')
try:
event = stripe.Webhook.construct_event(
payload, sig_header, endpoint_secret
)
except Exception as e:
return 'Invalid signature', 400


if event['type'] == 'checkout.session.completed':
session = event['data']['object']
session_id = session.get('id')
pedido = Pedido.query.filter_by(stripe_session_id=session_id).first()
if pedido:
pedido.status = 'paid'
db.session.commit()
# trigger email
from emails import send_order_confirm
send_order_confirm(pedido.id)


return '', 200


app.register_blueprint(bp, url_prefix='/webhooks')
from flask import Blueprint, request, current_app, jsonify
from models import db, Pedido, Pago
import stripe
import json

payments_bp = Blueprint('payments', __name__, url_prefix='/payments')

@payments_bp.before_app_first_request
def init_stripe():
    stripe.api_key = current_app.config.get('STRIPE_SECRET_KEY') or ''

@payments_bp.route('/create-session', methods=['POST'])
def create_session():
    data = request.json or {}
    pedido_id = data.get('pedido_id')
    pedido = Pedido.query.get(pedido_id)
    if not pedido:
        return jsonify({'error':'Pedido no encontrado'}), 404

    try:
        # create stripe checkout session and store session id on Pedido
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(max(1, pedido.total) * 100),
                    'product_data': {'name': f'Pedido #{pedido.id}'}
                },
                'quantity': 1
            }],
            mode='payment',
            success_url=request.host_url + f'payments/success/{pedido.id}',
            cancel_url=request.host_url + f'payments/cancel/{pedido.id}'
        )
        pedido.stripe_session_id = session.id
        db.session.commit()
        return jsonify({'sessionId': session.id, 'stripe_pk': current_app.config.get('STRIPE_PUBLISHABLE_KEY')})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/success/<int:pedido_id>', methods=['GET'])
def success(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    pedido.estado = 'pagado'
    pago = Pago(pedido_id=pedido.id, monto=pedido.total, metodo='stripe', estado='confirmado')
    db.session.add(pago)
    db.session.commit()
    return jsonify({'msg':'Pago registrado y pedido marcado como pagado'})

@payments_bp.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature', None)
    webhook_secret = current_app.config.get('STRIPE_WEBHOOK_SECRET') or ''
    event = None
    try:
        if webhook_secret:
            event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        else:
            event = stripe.Event.construct_from(request.get_json(force=True), stripe.api_key)
    except Exception as e:
        return jsonify({'error': 'Webhook error', 'detail': str(e)}), 400

    if event and event.get('type') == 'checkout.session.completed':
        sess = event['data']['object']
        session_id = sess.get('id')
        # find pedido by session id
        pedido = Pedido.query.filter_by(stripe_session_id=session_id).first()
        if pedido:
            pedido.estado = 'pagado'
            pago = Pago(pedido_id=pedido.id, monto=pedido.total, metodo='stripe', estado='confirmado')
            db.session.add(pago)
            db.session.commit()
    return jsonify({'ok': True})