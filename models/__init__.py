import importlib, glob
from os.path import dirname, basename, isfile


__all__ = []
for f in glob.glob(dirname(__file__)+"/*.py"): 
    if not isfile(f) or f.endswith('__init__.py'):
        continue
    name = basename(f)[:-3]
    tmp = importlib.import_module('models.' + name)
    globals()[name] = tmp.__dict__[name]
    __all__.append(name)

