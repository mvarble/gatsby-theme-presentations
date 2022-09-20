"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = _interopRequireDefault(require("zustand"));

var _fp = _interopRequireDefault(require("lodash/fp"));

var _types = require("../types");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useDeck = (0, _zustand["default"])(function (set, get) {
  return {
    ready: false,
    reset: function reset() {
      set(_fp["default"].flow(_fp["default"].set('mode')(undefined), _fp["default"].set('slideState')(undefined), _fp["default"].set('_rootElm')(undefined), _fp["default"].set('_fragmentsBySlide')(undefined), _fp["default"].set('ready')(false)));
    },
    setTitle: function setTitle(title) {
      return set(_fp["default"].set('title')(title));
    },
    setSlug: function setSlug(slug) {
      return set(_fp["default"].set('slug')(slug));
    },
    setDate: function setDate(date) {
      return set(_fp["default"].set('date')(date));
    },
    initializeStates: function initializeStates(elm, fragmentsBySlide) {
      set(_fp["default"].flow(_fp["default"].set('ready')(true), _fp["default"].set('_rootElm')(elm), _fp["default"].set('_fragmentsBySlide')(fragmentsBySlide)));
    },
    mode: undefined,
    setMode: function setMode(modeOrCallback) {
      // get the deck state
      var _get = get(),
          ready = _get.ready,
          mode = _get.mode,
          slideState = _get.slideState; // don't allow interfacing if not ready


      if (!ready) return; // calculate the new mode from user payload

      var newMode;

      if (typeof modeOrCallback !== 'function') {
        newMode = modeOrCallback;
      } else {
        newMode = typeof mode === 'undefined' ? undefined : modeOrCallback(mode);
      } // perform different operations depending mode state


      if (newMode === _types.DeckMode.Present) {
        // if we are presenting, go to the slide state (or default)
        if (slideState) {
          set(_fp["default"].set('mode')(newMode));
          (0, _utils.navigate)((0, _utils.toHash)(newMode, slideState));
        } else {
          var newSlideState = {
            indexh: 0,
            indexf: -1
          };
          set(_fp["default"].flow(_fp["default"].set('mode')(newMode), _fp["default"].set('slideState')(newSlideState)));
          (0, _utils.navigate)((0, _utils.toHash)(newMode, newSlideState));
        }
      } else if (newMode === _types.DeckMode.Print) {
        // if we are printing, 
        set(_fp["default"].set('mode')(newMode)); // @ts-ignore

        (0, _utils.navigate)((0, _utils.toHash)(newMode, slideState));
      }
    },
    slideState: undefined,
    setSlideState: function setSlideState(_ref) {
      var indexf = _ref.indexf,
          indexh = _ref.indexh;

      // get the state
      var _get2 = get(),
          ready = _get2.ready,
          _fragmentsBySlide = _get2._fragmentsBySlide,
          mode = _get2.mode; // don't change slide state if in print mode or not ready


      if (mode !== _types.DeckMode.Present || !ready || !_fragmentsBySlide) return; // change the state to something legal

      if (indexh >= _fragmentsBySlide.length) {
        // if we are at too large a slide, make it the last slide and last fragment
        var lastIndexH = _fragmentsBySlide.length - 1;

        if (lastIndexH >= 0) {
          var lastIndexF = _fragmentsBySlide[lastIndexH] - 1;
          var newSlideState = {
            indexh: lastIndexH,
            indexf: lastIndexF
          };
          set(_fp["default"].set('slideState')(newSlideState));
          (0, _utils.navigate)((0, _utils.toHash)(mode, newSlideState));
        } else {
          var _newSlideState = {
            indexh: 0,
            indexf: -1
          };
          set(_fp["default"].set('slideState')(_newSlideState));
          (0, _utils.navigate)((0, _utils.toHash)(mode, _newSlideState));
        }
      } else if (indexh < 0) {
        // if we are at a negative slide, make it the initial slide and fragment
        var _newSlideState2 = {
          indexh: 0,
          indexf: -1
        };
        set(_fp["default"].set('slideState')(_newSlideState2));
        (0, _utils.navigate)((0, _utils.toHash)(mode, _newSlideState2));
      } else {
        // if we are at an appropriate slide, clamp the fragment
        var _lastIndexF = _fragmentsBySlide[indexh] - 1;

        var newIndexF = Math.max(-1, Math.min(indexf, _lastIndexF));
        var _newSlideState3 = {
          indexh: indexh,
          indexf: newIndexF
        };
        set(_fp["default"].set('slideState')(_newSlideState3));
        (0, _utils.navigate)((0, _utils.toHash)(mode, _newSlideState3));
      }
    },
    next: function next() {
      // parse the current slide state and its fragments to see if we increase fragment or slide
      var _get3 = get(),
          ready = _get3.ready,
          slideState = _get3.slideState,
          setSlideState = _get3.setSlideState,
          _fragmentsBySlide = _get3._fragmentsBySlide; // if not ready, no effect


      if (!ready || !slideState || !_fragmentsBySlide) return; // go to the next slide state

      var indexh = slideState.indexh,
          indexf = slideState.indexf;

      if (indexf === _fragmentsBySlide[indexh] - 1) {
        if (indexh === _fragmentsBySlide.length - 1) return;
        setSlideState({
          indexh: indexh + 1,
          indexf: -1
        });
      } else {
        setSlideState({
          indexh: indexh,
          indexf: indexf + 1
        });
      }
    },
    previous: function previous() {
      // parse the current slide state and its fragments to see if we decrease fragment or slide
      var _get4 = get(),
          ready = _get4.ready,
          slideState = _get4.slideState,
          setSlideState = _get4.setSlideState,
          _fragmentsBySlide = _get4._fragmentsBySlide; // if not ready, no effect


      if (!ready || !slideState || !_fragmentsBySlide) return; // go to the previous slide state

      var indexh = slideState.indexh,
          indexf = slideState.indexf;

      if (indexf === -1) {
        if (indexh === 0) return;
        var lastIndexF = _fragmentsBySlide[indexh - 1] - 1;
        setSlideState({
          indexh: indexh - 1,
          indexf: lastIndexF
        });
      } else {
        setSlideState({
          indexh: indexh,
          indexf: indexf - 1
        });
      }
    },
    dimensions: undefined,
    setDimensions: function setDimensions(dimensions) {
      return set(_fp["default"].set('dimensions')(dimensions));
    },
    getParentSlide: function getParentSlide(elm) {
      var _get5 = get(),
          ready = _get5.ready,
          _rootElm = _get5._rootElm;

      if (!ready || typeof _rootElm === 'undefined') {
        return undefined;
      } else {
        var slideIndex = undefined;
        var offsetIndex = 0;

        _rootElm.childNodes.forEach(function (slide, index) {
          if (typeof slideIndex === 'number') return;
          if (slide.nodeName === '#text') offsetIndex++;
          if (slide.contains(elm)) slideIndex = index - offsetIndex;
        });

        return slideIndex;
      }
    },
    _rootElm: undefined,
    _fragmentsBySlide: undefined
  };
});
var _default = useDeck;
exports["default"] = _default;