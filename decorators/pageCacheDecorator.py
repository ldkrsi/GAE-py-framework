from functools import wraps
from flask import request
from lib import memcache
from config import config

def pageCacheDecorator(controller):
    if not config['production']:
        return controller
    @wraps(controller)
    def decorated_function(*args, **kwargs):
        cache_key = "%s-%s" % (request.path, config['cacheKey'])
        view = memcache.get(cache_key)
        if view is not None:
            return view
        view = controller(*args, **kwargs)    
        memcache.add(cache_key, view)
        return view
    return decorated_function