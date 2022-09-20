"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useResize;

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("zustand/shallow"));

var _useDeck3 = _interopRequireDefault(require("./use-deck"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useResize(width, height, viewWidth, viewHeight, mode) {
  // get the dimensions from the deck
  var _useDeck = (0, _useDeck3["default"])(function (deck) {
    return [deck.dimensions, deck.setDimensions];
  }, _shallow["default"]),
      _useDeck2 = _slicedToArray(_useDeck, 2),
      dimensions = _useDeck2[0],
      setDimensions = _useDeck2[1]; // ensure dimension state is calibrated


  _react["default"].useEffect(function () {
    if (typeof dimensions === 'undefined') {
      // set dimensions to props if undefined
      setDimensions({
        width: viewWidth,
        height: viewHeight
      });
    }
  }, [dimensions, viewWidth, viewHeight]); // create the css style for the resize


  return _react["default"].useMemo(function () {
    var deckWidth = dimensions && dimensions.width || viewWidth;
    var deckHeight = dimensions && dimensions.height || viewHeight;
    var scale = Math.min(width / deckWidth, height / deckHeight);
    var x = (width - deckWidth * scale) / 2;
    var y = (height - deckHeight * scale) / 2;
    var printMode = mode === _types.DeckMode.Print;
    var modeScale = printMode ? 0.66 : 1;
    var modeShiftX = deckWidth * scale * (1 - modeScale) / 2;
    var modeShiftY = printMode ? -y : 0;
    return {
      width: "".concat(deckWidth, "px"),
      height: "".concat(deckHeight, "px"),
      transform: "translate(".concat(x + modeShiftX, "px, ").concat(y + modeShiftY, "px) scale(").concat(scale * modeScale, ")"),
      transformOrigin: '0 0'
    };
  }, [dimensions, width, height, viewWidth, viewHeight, mode]);
}