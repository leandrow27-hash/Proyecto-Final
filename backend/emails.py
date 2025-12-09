import smtplib
from email.mime.text import MIMEText
from flask import current_app
from models import EmailLog
from app import db


def send_email(to, subject, html_body):
cfg = current_app.config
host = cfg.get('SMTP_HOST')
port = cfg.get('SMTP_PORT')
user = cfg.get('SMTP_USER')
pwd = cfg.get('SMTP_PASS')


log = EmailLog(to=to, subject=subject, body=html_body)
db.session.add(log)
try:
if host and user:
msg = MIMEText(html_body, 'html')
msg['Subject'] = subject
msg['From'] = user
msg['To'] = to
s = smtplib.SMTP(host, port)
s.starttls()
s.login(user, pwd)
s.sendmail(user, [to], msg.as_string())
s.quit()
log.sent = True
db.session.commit()
else:
db.session.commit() # we log the email but can't send
except Exception as e:
db.session.commit()
current_app.logger.error('Email send failed: %s', str(e))


def send_order_confirm(pedido_id):
# fetch pedido, user, build html
# simplified for brevity
send_email('cliente@example.com', 'Confirmación de pedido', '<p>Gracias por su compra</p>')