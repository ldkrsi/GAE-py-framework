import os

config = {
	'production': os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'),
	'cacheKey': '1521363055',
}

__all__ = [ config ]