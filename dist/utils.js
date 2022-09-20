"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNonnegativeInteger = isNonnegativeInteger;
exports.navigate = navigate;
exports.toHash = toHash;

var _types = require("./types");

function isNonnegativeInteger(x) {
  return Number.isFinite(x) && Math.floor(x) === x && x >= 0;
}

function toHash(mode, slideState) {
  return mode === _types.DeckMode.Print ? '#/print' : "#/".concat(slideState.indexh, "/").concat(slideState.indexf);
}

function navigate(hash) {
  if (window) window.history.replaceState(null, '', hash);
}