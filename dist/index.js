"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Deck", {
  enumerable: true,
  get: function get() {
    return _deck["default"];
  }
});
Object.defineProperty(exports, "DeckMode", {
  enumerable: true,
  get: function get() {
    return _types.DeckMode;
  }
});
Object.defineProperty(exports, "DeckModeCallback", {
  enumerable: true,
  get: function get() {
    return _types.DeckModeCallback;
  }
});
Object.defineProperty(exports, "DeckState", {
  enumerable: true,
  get: function get() {
    return _types.DeckState;
  }
});
Object.defineProperty(exports, "Dimensions", {
  enumerable: true,
  get: function get() {
    return _types.Dimensions;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function get() {
    return _fragment["default"];
  }
});
Object.defineProperty(exports, "Options", {
  enumerable: true,
  get: function get() {
    return _types.Options;
  }
});
Object.defineProperty(exports, "Slide", {
  enumerable: true,
  get: function get() {
    return _slide["default"];
  }
});
Object.defineProperty(exports, "SlideState", {
  enumerable: true,
  get: function get() {
    return _types.SlideState;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "defaultOptions", {
  enumerable: true,
  get: function get() {
    return _types.defaultOptions;
  }
});
Object.defineProperty(exports, "remarkToDeckSchema", {
  enumerable: true,
  get: function get() {
    return _remarkToDeckSchema["default"];
  }
});
Object.defineProperty(exports, "useDeck", {
  enumerable: true,
  get: function get() {
    return _useDeck["default"];
  }
});

var _remarkToDeckSchema = _interopRequireDefault(require("./remark-to-deck-schema"));

var _deck = _interopRequireDefault(require("./components/deck"));

var _fragment = _interopRequireDefault(require("./components/fragment"));

var _slide = _interopRequireDefault(require("./components/slide"));

var _useDeck = _interopRequireDefault(require("./hooks/use-deck"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _remarkToDeckSchema["default"];
exports["default"] = _default;