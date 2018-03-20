from flask import Flask, redirect, url_for
from decorators import *
from lib import render_html
from config import config
from routes import routes

app = Flask(__name__, template_folder='views')

app.debug = not config['production']
app.jinja_env.add_extension('lib.HTMLCompress')

for route in routes:
	if 'cache' not in route:
		route['cache'] = True
	if 'method' not in route:
		route['method'] = 'GET'
	app.add_url_rule(
		route['path'],
		view_func= pageCacheDecorator(route['func']) if route['cache'] else route['func'],
		endpoint= route['path']+':'+route['method'],
		methods= [route['method']]
	)
