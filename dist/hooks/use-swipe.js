"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSwipe;

var _reactSwipeable = require("react-swipeable");

var _shallow = _interopRequireDefault(require("zustand/shallow"));

var _useDeck3 = _interopRequireDefault(require("./use-deck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useSwipe() {
  // get callbacks provided by the deck
  var _useDeck = (0, _useDeck3["default"])(function (s) {
    return [s.previous, s.next];
  }, _shallow["default"]),
      _useDeck2 = _slicedToArray(_useDeck, 2),
      previous = _useDeck2[0],
      next = _useDeck2[1]; // precompose our store callbacks into event callbacks


  var props = (0, _reactSwipeable.useSwipeable)({
    onSwipedLeft: next,
    onSwipedRight: previous
  }); // return the event callbacks

  return props;
}