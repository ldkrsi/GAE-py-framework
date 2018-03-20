from google.appengine.api import memcache as cache

class memcache:
    expire_time = 172800
    namespace_default = 'default'
    @staticmethod
    def add(key, value, time = expire_time, namespace = namespace_default):
        return cache.add(key, value, time = time, namespace = namespace)
    @staticmethod
    def set(key, value, time = expire_time, namespace = namespace_default):
        return cache.set(key, value, time = time, namespace = namespace)
    @staticmethod
    def get(key, namespace = namespace_default):
        return cache.get(key, namespace = namespace)