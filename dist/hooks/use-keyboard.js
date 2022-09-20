"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useKeyboard;

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

var PREVIOUS_KEYS = ['ArrowLeft', 'h', 'k'];
var NEXT_KEYS = ['ArrowRight', 'l', 'j'];
var PRINT_KEYS = ['p'];
var INPUTS = ['input', 'select', 'textarea', 'a', 'button'];
/**
 * This React hook binds the provided callbacks to specific keyboard events
 */

function useKeyboard() {
  // create the relevant deck callbacks
  var _useDeck = (0, _useDeck3["default"])(function (state) {
    return [state.previous, state.next, state.setMode];
  }, _shallow["default"]),
      _useDeck2 = _slicedToArray(_useDeck, 3),
      previous = _useDeck2[0],
      next = _useDeck2[1],
      setMode = _useDeck2[2];

  var togglePrint = _react["default"].useCallback(function () {
    return setMode(function (mode) {
      return mode === _types.DeckMode.Print ? _types.DeckMode.Present : _types.DeckMode.Print;
    });
  }, []); // bind listeners to keyboard events


  _react["default"].useEffect(function () {
    // our keydown listener
    var handleKeyDown = function handleKeyDown(e) {
      // return if we are holding META+..., CTRL+..., or SHIFT+...
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // ignore when elements are focused

      if (document.activeElement !== null) {
        var el = document.activeElement.tagName.toLowerCase();
        if (INPUTS.includes(el)) return;
      } // map keys to effects


      if (PREVIOUS_KEYS.includes(e.key)) previous();
      if (NEXT_KEYS.includes(e.key)) next();
      if (PRINT_KEYS.includes(e.key)) togglePrint();
    }; // add to event listeners


    window.addEventListener('keydown', handleKeyDown); // remove callback

    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previous, next, togglePrint]);
}