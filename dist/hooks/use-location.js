"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useLocation;

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("zustand/shallow"));

var _useDeck3 = _interopRequireDefault(require("./use-deck"));

var _utils = require("../utils");

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useLocation(hash) {
  // step 0: interface with deck state
  var _useDeck = (0, _useDeck3["default"])(function (deck) {
    return [deck.mode, deck.slideState, deck.setMode, deck.setSlideState, deck.ready];
  }, _shallow["default"]),
      _useDeck2 = _slicedToArray(_useDeck, 5),
      mode = _useDeck2[0],
      slideState = _useDeck2[1],
      setMode = _useDeck2[2],
      setSlideState = _useDeck2[3],
      ready = _useDeck2[4]; // step 1: calibrate deck state to location


  _react["default"].useEffect(function () {
    // `mode` and `slideState` depend on `hash`
    if (typeof mode === 'undefined' || typeof slideState === 'undefined') {
      var newMode;
      var newSlideState;

      if (hash === '#/print') {
        // print mode
        newMode = _types.DeckMode.Print;
        newSlideState = {
          indexh: 0,
          indexf: -1
        };
      } else if (hash.match(/^#\/[0-9]+\/-?[0-9]+$/)) {
        var _hash$slice$split$map = hash.slice(2).split('/').map(Number),
            _hash$slice$split$map2 = _slicedToArray(_hash$slice$split$map, 2),
            indexh = _hash$slice$split$map2[0],
            indexf = _hash$slice$split$map2[1];

        if ((0, _utils.isNonnegativeInteger)(indexh) && (0, _utils.isNonnegativeInteger)(indexf + 1)) {
          newMode = _types.DeckMode.Present;
          newSlideState = {
            indexh: indexh,
            indexf: indexf
          };
        }
      }

      if (typeof newMode === 'undefined' || typeof newSlideState === 'undefined') {
        newMode = _types.DeckMode.Present;
        newSlideState = {
          indexh: 0,
          indexf: -1
        };
      }

      setMode(newMode);
      setSlideState(newSlideState);
    }
  }, [hash, mode, slideState, setMode, setSlideState, ready]);
}