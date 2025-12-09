import re
import jwt
from datetime import datetime, timedelta
from flask import current_app

def validar_email(email: str) -> bool:
    return re.fullmatch(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email) is not None

def validar_telefono(phone: str) -> bool:
    return re.fullmatch(r"^\+?[0-9\- ]{6,20}$", phone) is not None

def jwt_encode(payload: dict, secret: str, exp_seconds: int):
    data = payload.copy()
    data['exp'] = datetime.utcnow() + timedelta(seconds=exp_seconds)
    return jwt.encode(data, secret, algorithm='HS256')

def jwt_decode(token: str, secret: str):
    return jwt.decode(token, secret, algorithms=['HS256'])
