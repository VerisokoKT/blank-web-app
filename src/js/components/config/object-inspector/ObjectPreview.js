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

var _ObjectDescription = require('./ObjectDescription');

var _ObjectDescription2 = _interopRequireDefault(_ObjectDescription);

function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function (xs, x, i) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}

/**
 * A preview of the object on root level node
 */

var ObjectPreview = (function (_Component) {
  _inherits(ObjectPreview, _Component);

  function ObjectPreview() {
    _classCallCheck(this, ObjectPreview);

    _get(Object.getPrototypeOf(ObjectPreview.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ObjectPreview, [{
    key: 'render',
    value: function render() {
      var object = this.props.object;
      if (typeof object !== 'object' || object === null) {
        return _react2['default'].createElement(_ObjectDescription2['default'], { object: object });
      }

      if (Array.isArray(object)) {
        return _react2['default'].createElement(
          'span',
          { className: 'ObjectInspector-object-preview' },
          '[',
          intersperse(object.map(function (element, index) {
            return _react2['default'].createElement(_ObjectDescription2['default'], { key: index, object: element });
          }), ", "),
          ']'
        );
      } else if (object instanceof Date) {
        return _react2['default'].createElement(
          'span',
          null,
          object.toString()
        );
      } else {
        var propertyNodes = [];
        for (var propertyName in object) {
          var propertyValue = object[propertyName];
          if (object.hasOwnProperty(propertyName)) {
            var ellipsis = undefined;
            if (propertyNodes.length === this.props.maxProperties - 1 && Object.keys(object).length > this.props.maxProperties) {
              ellipsis = _react2['default'].createElement(
                'span',
                { key: 'ellipsis' },
                '…'
              );
            }
            propertyNodes.push(_react2['default'].createElement(
              'span',
              { key: propertyName },
              _react2['default'].createElement(
                'span',
                { className: 'ObjectInspector-object-name' },
                propertyName
              ),
              ': ',
              _react2['default'].createElement(_ObjectDescription2['default'], { object: propertyValue }),
              ellipsis
            ));
            if (ellipsis) break;
          }
        }

        return _react2['default'].createElement(
          'span',
          { className: 'ObjectInspector-object-preview' },
          'Object {',
          intersperse(propertyNodes, ", "),
          '}'
        );
      }
    }
  }], [{
    key: 'defaultProps',
    // maximum properties displayed in preview
    value: {
      maxProperties: 5
    },
    enumerable: true
  }]);

  return ObjectPreview;
})(_react.Component);

exports['default'] = ObjectPreview;
module.exports = exports['default'];