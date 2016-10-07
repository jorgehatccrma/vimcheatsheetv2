"""Data structure to hold main vim movements, so they can be visualized using D3.js"""

from collections import namedtuple, OrderedDict

Movement = namedtuple('Movement', ['keys', 'arg', 'desc', 'pos', 'level'])

moves = []
abs_moves = []

# UP (previous)
moves.append(Movement('k', None, 'up', (0, -1), 0))
moves.append(Movement('{', None, 'paragraph', (0, -2), 0))
moves.append(Movement('(', None, 'sentence', (1, -2), 1))
moves.append(Movement('H', None, 'screen', (0, -3), 0))
moves.append(Movement('C-b', None, 'page', (0, -4), 0))
moves.append(Movement('C-u', None, '1/2 page', (1, -4), 1))
moves.append(Movement('?', 'text', 'find {arg}', (0, -5), 0))
moves.append(Movement('N', None, 'next {arg}', (1, -5), 1))
moves.append(Movement('n', None, 'previous {arg}', (-1, -5), 1))
moves.append(Movement('#', None, 'find word under cursor', (-2, -5), 1))
moves.append(Movement('gg', None, 'first line', (0, -6), 0))

# DOWN (next)
moves.append(Movement('j', None, 'down', (0, 1), 0))
moves.append(Movement('}', None, 'paragraph', (0, 2), 0))
moves.append(Movement(')', None, 'sentence', (-1, 2), 1))
moves.append(Movement('L', None, 'screen', (0, 3), 0))
moves.append(Movement('C-f', None, 'page', (0, 4), 0))
moves.append(Movement('C-d', None, '1/2 page', (-1, 4), 1))
moves.append(Movement('/', 'text', 'find {arg}', (0, 5), 0))
moves.append(Movement('N', None, 'previous {arg}', (-1, 5), 1))
moves.append(Movement('n', None, 'next {arg}', (1, 5), 1))
moves.append(Movement('*', None, 'find word under cursor', (2, 5), 1))
moves.append(Movement('G', None, 'last line', (0, 6), 0))

# RIGHT (forward)
moves.append(Movement('l', None, 'right', (1, 0), 0))
moves.append(Movement('e', None, 'end', (2, 0), 0))
moves.append(Movement('E', None, 'delimited end', (2, 1), 1))
moves.append(Movement('w', None, 'word', (3, 0), 0))
moves.append(Movement('W', None, 'delimited word', (3, 1), 1))
moves.append(Movement('t', 'x', 'before {arg}', (4, 0), 0))
moves.append(Movement('f', 'x', 'find {arg}', (5, 0), 0))
moves.append(Movement(',', None, 'previous {arg}', (5, -1), 1))
moves.append(Movement(';', None, 'next {arg}', (5, 1), 1))
moves.append(Movement('$', None, 'end of line', (6, 0), 0))

# LEFT (backward)
moves.append(Movement('h', None, 'left', (-1, 0), 0))
moves.append(Movement('ge', None, 'end', (-2, 0), 0))
moves.append(Movement('gE', None, 'delimited end', (-2, -1), 1))
moves.append(Movement('b', None, 'word', (-3, 0), 0))
moves.append(Movement('B', None, 'delimited word', (-3, -1), 1))
moves.append(Movement('T', 'x', 'after {arg}', (-4, 0), 0))
moves.append(Movement('F', 'x', 'find {arg}', (-5, 0), 0))
moves.append(Movement(',', None, 'next {arg}', (-5, 1), 1))
moves.append(Movement(';', None, 'previous {arg}', (-5, -1), 1))
moves.append(Movement('^', None, 'first non-blank', (-6, 0), 0))
moves.append(Movement('0', None, 'start of line', (-7, 0), 0))

abs_moves.append(Movement("''", None, 'last location', (0, 0), 0))
abs_moves.append(Movement("'.", None, 'last edit', (1, 0), 0))
abs_moves.append(Movement("#G", None, 'line #', (2, 0), 0))
abs_moves.append(Movement("%", None, 'matching bracket', (3, 0), 0))
abs_moves.append(Movement("g;", None, 'changelist backward', (4, 0), 0))
abs_moves.append(Movement("g,", None, 'changelist forward', (4, 1), 1))
abs_moves.append(Movement("C-o", None, 'jumplist backward', (5, 0), 0))
abs_moves.append(Movement("C-i", None, 'jumplist forward', (5, 1), 1))


import json

def namedtuple_asdict(obj):
    """from http://stackoverflow.com/a/32782927/1620879"""
    if hasattr(obj, "_asdict"): # detect namedtuple
        return OrderedDict(zip(obj._fields, (namedtuple_asdict(item) for item in obj)))
    elif isinstance(obj, basestring): # iterables - strings
        return obj
    elif hasattr(obj, "keys"): # iterables - mapping
        return OrderedDict(zip(obj.keys(), (namedtuple_asdict(item) for item in obj.values())))
    elif hasattr(obj, "__iter__"): # iterables - sequence
        return type(obj)((namedtuple_asdict(item) for item in obj))
    else: # non-iterable cannot contain namedtuples
        return obj

#  print json.dumps(moves, sort_keys=False, indent=4, separators=(',', ': '))
print json.dumps(dict(moves=namedtuple_asdict(moves), abs_moves=namedtuple_asdict(abs_moves)))

