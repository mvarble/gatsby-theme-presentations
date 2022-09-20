"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckMode = void 0;
exports.defaultOptions = defaultOptions;

function defaultOptions(options) {
  var themeOptions = Object.assign({}, options);

  if (!themeOptions.sourceDir) {
    themeOptions.sourceDir = './content/presentations';
  }

  return themeOptions;
}

;
var DeckMode;
exports.DeckMode = DeckMode;

(function (DeckMode) {
  DeckMode[DeckMode["Present"] = 0] = "Present";
  DeckMode[DeckMode["Print"] = 1] = "Print";
})(DeckMode || (exports.DeckMode = DeckMode = {}));

;