"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Fragment;

var _react = _interopRequireDefault(require("react"));

var _fp = _interopRequireDefault(require("lodash/fp"));

var _useDeck = _interopRequireDefault(require("../hooks/use-deck"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Fragment(_ref) {
  var children = _ref.children,
      sI = _ref.slideIndex,
      i = _ref.index,
      startOn = _ref.startOn,
      out = _ref.out,
      semiOut = _ref.semiOut,
      appearDown = _ref.appearDown,
      appearUp = _ref.appearUp,
      appearRight = _ref.appearRight,
      appearLeft = _ref.appearLeft,
      grow = _ref.grow;
  // parse the props
  var slideIndex = parseIndex(sI);
  var index = parseIndex(i); // interface with deck state for visibility

  var slideState = (0, _useDeck["default"])(function (deck) {
    return deck.slideState;
  }); // calculate visibility off of slide state

  var visibilityClass;

  if (slideState) {
    var indexh = slideState.indexh,
        indexf = slideState.indexf;

    if (slideIndex < indexh) {
      visibilityClass = 'past';
    } else if (slideIndex === indexh) {
      if (index < indexf) {
        visibilityClass = 'past';
      } else if (index === indexf) {
        visibilityClass = 'present';
      } else {
        visibilityClass = 'future';
      }
    } else {
      visibilityClass = 'future';
    }
  } else {
    visibilityClass = 'future';
  } // ensure one child per `Fragment`


  var newChildren = _react["default"].useMemo(function () {
    return _react["default"].Children.map(children, function (child) {
      var className = (_fp["default"].get('props.className')(child) || '') + ' ' + 'fragment ' + visibilityClass + ' ' + (out ? 'out ' : '') + (semiOut ? 'semi-out ' : '') + (startOn ? 'start-on ' : '') + (appearDown ? 'appear-down ' : '') + (appearUp ? 'appear-up ' : '') + (appearLeft ? 'appear-left ' : '') + (appearRight ? 'appear-right ' : '') + (grow ? 'grow ' : '');
      return /*#__PURE__*/_react["default"].cloneElement(child, {
        className: className,
        index: index,
        slideIndex: slideIndex
      });
    });
  }, [children, visibilityClass, semiOut, startOn]);

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, newChildren);
}

function parseIndex(index) {
  var indexNumber = Number(index);

  if ((0, _utils.isNonnegativeInteger)(indexNumber)) {
    return indexNumber;
  } else {
    throw new Error('Fragment: index must be a nonnegative integer!');
  }
}