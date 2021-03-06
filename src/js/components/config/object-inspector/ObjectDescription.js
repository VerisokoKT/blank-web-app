'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * A short description of the object
 */

var ObjectDescription = (function (_Component) {
  _inherits(ObjectDescription, _Component);

  function ObjectDescription() {
    _classCallCheck(this, ObjectDescription);

    _get(Object.getPrototypeOf(ObjectDescription.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ObjectDescription, [{
    key: 'render',
    value: function render() {
      var object = this.props.object;
      switch (typeof object) {
        case 'number':
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-number' },
            object
          );
        case 'string':
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-string' },
            '"',
            object,
            '"'
          );
        case 'boolean':
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-boolean' },
            String(object)
          ); // why simple {object} won't work?
        case 'undefined':
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-undefined' },
            'undefined'
          );
        case 'object':
          if (object === null) {
            return _react2['default'].createElement(
              'span',
              { className: 'ObjectInspector-object-value-null' },
              'null'
            );
          }
          if (object instanceof Date) {
            return _react2['default'].createElement(
              'span',
              null,
              object.toString()
            );
          }
          if (Array.isArray(object)) {
            return _react2['default'].createElement(
              'span',
              null,
              'Array[' + object.length + ']'
            );
          }
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-object' },
            'Object'
          );
        case 'function':
          return _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement(
              'span',
              { className: 'ObjectInspector-object-value-function-keyword' },
              'function'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'ObjectInspector-object-value-function-name' },
              ' ',
              object.name,
              '()'
            )
          );
        case 'symbol':
          return _react2['default'].createElement(
            'span',
            { className: 'ObjectInspector-object-value-symbol' },
            'Symbol()'
          );
        default:
          return _react2['default'].createElement('span', null);
      }
    }
  }]);

  return ObjectDescription;
})(_react.Component);

exports['default'] = ObjectDescription;
module.exports = exports['default'];