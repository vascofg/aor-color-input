'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorInput = exports.ColorField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _raCore = require('ra-core');

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _reactColor = require('react-color');

var ReactColor = _interopRequireWildcard(_reactColor);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./ColorInput.css');

var ColorFieldComponent = function ColorFieldComponent(_ref) {
  var source = _ref.source,
      _ref$record = _ref.record,
      record = _ref$record === undefined ? {} : _ref$record,
      className = _ref.className;
  return _react2.default.createElement(
    'div',
    { style: { display: 'flex' } },
    _react2.default.createElement('div', { style: {
        width: '20px',
        height: '20px',
        background: (0, _lodash2.default)(record, source),
        marginRight: '5px'
      }
    }),
    _react2.default.createElement(
      'span',
      { className: className },
      (0, _lodash2.default)(record, source)
    )
  );
};

ColorFieldComponent.propTypes = {
  addLabel: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  elStyle: _propTypes2.default.object,
  label: _propTypes2.default.string,
  record: _propTypes2.default.object,
  source: _propTypes2.default.string.isRequired
};

var PureTextField = (0, _pure2.default)(ColorFieldComponent);

PureTextField.defaultProps = {
  addLabel: true
};

var ColorInputComponent = function (_React$Component) {
  _inherits(ColorInputComponent, _React$Component);

  function ColorInputComponent() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ColorInputComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ColorInputComponent.__proto__ || Object.getPrototypeOf(ColorInputComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      show: false
    }, _this.handleOpen = function () {
      return _this.setState({ show: true });
    }, _this.handleClose = function () {
      return _this.setState({ show: false });
    }, _this.handleChange = function (_ref3) {
      var hex = _ref3.hex;

      _this.props.input.onChange(hex);
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ColorInputComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          source = _props.source,
          meta = _props.meta,
          className = _props.className,
          options = _props.options,
          picker = _props.picker,
          input = _props.input,
          resource = _props.resource,
          isRequired = _props.isRequired;
      var touched = meta.touched,
          error = meta.error;


      var Picker = ReactColor[picker + 'Picker'];

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TextField2.default, _extends({}, input, {
          margin: 'normal',
          onFocus: this.handleOpen,
          label: _react2.default.createElement(_raCore.FieldTitle, {
            label: label,
            source: source,
            resource: resource,
            isRequired: isRequired
          }),
          error: !!(touched && error),
          helperText: touched && error,
          className: className
        })),
        this.state.show ? _react2.default.createElement(
          'div',
          { className: 'ColorInput-popup' },
          _react2.default.createElement('div', {
            className: 'ColorInput-cover',
            onClick: this.handleClose
          }),
          _react2.default.createElement(Picker, _extends({}, options, {
            color: input.value,
            onChange: this.handleChange
          }))
        ) : null
      );
    }
  }]);

  return ColorInputComponent;
}(_react2.default.Component);

;

ColorInputComponent.propTypes = {
  label: _propTypes2.default.string,
  options: _propTypes2.default.object,
  source: _propTypes2.default.string,
  input: _propTypes2.default.object,
  meta: _propTypes2.default.shape({
    touched: _propTypes2.default.bool,
    error: _propTypes2.default.string
  }),
  className: _propTypes2.default.string,
  picker: function picker(props, propName, componentName) {
    return !ReactColor[props[propName] + 'Picker'] && new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`.');
  }
};

ColorInputComponent.defaultProps = {
  picker: 'Chrome',
  options: {
    disableAlpha: true
  }
};

var ColorField = exports.ColorField = PureTextField;
var ColorInput = exports.ColorInput = (0, _raCore.addField)(ColorInputComponent);