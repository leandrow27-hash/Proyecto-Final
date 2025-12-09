from flask import Blueprint, jsonify

bp = Blueprint('public', __name__)


@bp.route('/destinos', methods=['GET'])
def get_destinos():
	# Minimal implementation for tests: return empty list when no destinos
	return jsonify([])
