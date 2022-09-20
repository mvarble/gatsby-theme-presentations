"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Slide;

var _react = _interopRequireDefault(require("react"));

var _useDeck = _interopRequireDefault(require("../hooks/use-deck"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DISPLAY_DISTANCE = 2;

function Slide(_ref) {
  var children = _ref.children,
      index = _ref.index;
  // parse the slide index
  var slideIndex = parseNumber(index); // create a reference to the dom element

  var ref = _react["default"].useRef(null); // interface with the deck to get the slide state


  var slideState = (0, _useDeck["default"])(function (deck) {
    return deck.slideState;
  });
  var visibilityClass;

  if (slideState) {
    var viewIndex = slideState.indexh;

    if (slideIndex < viewIndex - DISPLAY_DISTANCE) {
      visibilityClass = 'past hidden';
    } else if (slideIndex < viewIndex) {
      visibilityClass = 'past';
    } else if (slideIndex === viewIndex) {
      visibilityClass = 'present';
    } else if (slideIndex <= viewIndex + DISPLAY_DISTANCE) {
      visibilityClass = 'future';
    } else {
      visibilityClass = 'future hidden';
    }
  } else {
    visibilityClass = 'hidden';
  }

  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "slide ".concat(visibilityClass),
    ref: ref
  }, children);
}

function parseNumber(input) {
  var out = Number(input);

  if (!(0, _utils.isNonnegativeInteger)(out)) {
    throw new Error('Slide: index cannot be parsed to nonnegative integer!');
  }

  return out;
}