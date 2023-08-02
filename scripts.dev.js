"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.addEventListener('DOMContentLoaded', function () {
  var d = document,
      root = d.getElementById('root'),
      words = ['-direction', 'space-', 'grid-', 'template-'],
      themes = ['flex', 'grid'],
      axis = ['justify', 'align'],
      attr = ['content', 'items'],
      table = ['col', 'row'],
      dir = ['start', 'end'],
      wrap = ['wrap', 'nowrap', 'reverse'],
      color = ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'grey', 'dark', 'light'],
      direction = ['row', 'row-reverse', 'column', 'column-reverse'],
      content = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
      flex = {
    "flex-direction": direction,
    "justify-content": content,
    "align-items": ['stretch'].concat(_toConsumableArray(content.slice(0, 3))),
    wrap: wrap
  },
      grid = {},
      boxStyle = {
    className: 'col-24 col-md-18 min-w-5 o-auto br-2 b-1 b-solid border-light shadow-grey',
    style: 'min-height:min(80vh, 480px); box-shadow:0 0 .25rem var(--shadow)'
  },
      create = function create(element, attributes) {
    return Object.assign(d.createElement(element), attributes);
  },
      replace = function replace(text) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : text;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var w = _step.value;
        if (text.includes(w)) value = text.replace(w, '');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return value;
  },
      fill = function fill(parent, element, limit) {
    for (var i = 0; i < limit; i++) {
      parent.appendChild(create(element, {
        className: "br-2 p-4 text-light bg-".concat(color[i]),
        innerHTML: "child ".concat(i + 1)
      }));
    }
  },
      filter = function filter(array, word, value, type) {
    return Array.from(array).filter(function (c) {
      return !c.includes(replace(word));
    }).join(',').replaceAll(',', ' ') + " d-".concat(type, " ") + replace(word + '-' + value);
  },
      nest = function nest(array) {
    for (var i = 1; i < array.length; i++) {
      array[i - 1].append(array[i]);
    }
  },
      array = function array(obj, arr, values) {
    arr[0].forEach(function (a) {
      return arr[1].forEach(function (b) {
        return combine(obj, a + '-' + b, values);
      });
    });
  },
      combine = function combine(object, index, c) {
    return object[index] = c;
  },
      form = function form(content, type) {
    Object.keys(content).forEach(function (key) {
      var item = create('div', {
        className: 'd-grid wrap-wrap g-1'
      }),
          select = create('select', {
        className: 'g-1 p-1',
        oninput: function oninput(e) {
          return box.className = filter(box.classList, key, e.target.value, type);
        }
      });
      item.innerHTML += "<label class=\"fs-10\">".concat(key.toUpperCase(), ": </label>");
      content[key].forEach(function (prop) {
        var option = create('option', {
          className: 'p-1',
          innerHTML: prop
        });
        nest([list, item, select, option]);
      });
    });
  },
      selection = function selection(option, type) {
    list.innerHTML = '';
    form(option, type);
    Object.assign(box, boxStyle);
  },
      title = create('select', {
    className: 'col-24 col-md-24 p-1',
    innerHTML: themes.map(function (theme) {
      return "<option value=".concat(theme, ">").concat(theme.toUpperCase(), "</option>");
    }),
    oninput: function oninput(e) {
      return selection(eval(e.target.value), e.target.value);
    }
  }),
      section = create('section', {
    className: 'd-flex wrap-wrap align-items-start justify-content-md-evenly g-2'
  }),
      box = create('div', boxStyle),
      list = create('form', {
    className: 'd-grid g-2 m-0 p-0 col-24 col-md-5',
    style: "grid-template-columns: repeat( auto-fit, minmax(min(100%, 280px), 1fr))"
  }),
      numbers = function numbers(ini, fin) {
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    for (var i = ini; i <= fin; i++) {
      arr[i] = i;
    }

    ;
    return arr;
  };

  array(grid, [["template"], ["columns", "rows"]], numbers(1, 12));
  array(grid, [axis, attr], [].concat(content, ['stretch']));
  fill(box, 'div', 6);
  section.append(list);
  selection(flex, 'flex');
  nest([root, title]);
  nest([root, section, box]);
});