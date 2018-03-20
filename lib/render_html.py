from flask import render_template, request

def render_html(filename, variables={}):
    variables['request'] = request
    return render_template(filename, **variables)

