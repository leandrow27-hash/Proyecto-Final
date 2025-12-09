import pytest
from backend.app import create_app, db


@pytest.fixture
def client():
	app = create_app()
	app.config['TESTING'] = True
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
	with app.test_client() as c:
		with app.app_context():
			db.create_all()
		yield c


def test_get_destinos_empty(client):
	rv = client.get('/api/destinos')
	assert rv.status_code == 200
	assert rv.get_json() == []