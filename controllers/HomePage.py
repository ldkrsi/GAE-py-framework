from lib import render_html

def HomePage():
	return render_html('index.html', {'h1': 'hello'})