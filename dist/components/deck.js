"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Deck;

var _react = _interopRequireDefault(require("react"));

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _types = require("../types");

var _useDeck = _interopRequireDefault(require("../hooks/use-deck"));

var _useDeckInitializer = _interopRequireDefault(require("../hooks/use-deck-initializer"));

var _useDeckStates = _interopRequireDefault(require("../hooks/use-deck-states"));

var _useLocation = _interopRequireDefault(require("../hooks/use-location"));

var _useKeyboard = _interopRequireDefault(require("../hooks/use-keyboard"));

var _useSwipe = _interopRequireDefault(require("../hooks/use-swipe"));

var _useResize = _interopRequireDefault(require("../hooks/use-resize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Deck(props) {
  // step 0: parse the props
  var children = props.children,
      location = props.location,
      data = props.data;
  var hash = location.hash;
  var _data$presentation = data.presentation,
      title = _data$presentation.title,
      slug = _data$presentation.slug,
      date = _data$presentation.date,
      width = _data$presentation.width,
      height = _data$presentation.height,
      fragmentsBySlide = _data$presentation.fragmentsBySlide; // step 1: initialize deck frontmatter

  (0, _useDeckInitializer["default"])(title, slug, date); // step 2: create a ref which is to be used for slide state calculations

  var ref = _react["default"].useRef(null); // step 3: ensure deck is aware of all of its states


  (0, _useDeckStates["default"])(ref, fragmentsBySlide); // step 4: ensure location is always calibrated with deck state

  (0, _useLocation["default"])(hash); // step 5: interface keyboard and swipe events with deck

  (0, _useKeyboard["default"])();
  var swipeHandlers = (0, _useSwipe["default"])();

  var refPassthrough = function refPassthrough(element) {
    swipeHandlers.ref(element); // @ts-ignore

    ref.current = element;
  }; // step 6 render depending on mode


  var mode = (0, _useDeck["default"])(function (deck) {
    return deck.mode;
  }); // step 7: interface window events with deck

  var _useMeasure = (0, _reactUseMeasure["default"])(),
      _useMeasure2 = _slicedToArray(_useMeasure, 2),
      containerRef = _useMeasure2[0],
      rect = _useMeasure2[1];

  var resizeStyle = (0, _useResize["default"])(rect.width, rect.height, width, height, mode); // render the deck

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: containerRef,
    className: "deck-container" + (mode === _types.DeckMode.Print ? ' print' : '')
  }, /*#__PURE__*/_react["default"].createElement("div", _extends({}, swipeHandlers, {
    style: resizeStyle,
    className: "deck",
    ref: refPassthrough
  }), children));
}