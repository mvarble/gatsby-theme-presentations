"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = remarkToDeckSchema;

var _types = require("./types");

var _utils = require("./utils");

/**
 * This gatsby remark plugin will transform markdownAST to our deck schema.
 * 1: regions of the mdast separated by `---` will be wrapped by `Slide` components, so that the 
 *    root children are precisely the slides.
 * 2: `Fragment` blocks will be manipulated to have appropriate `index` data. If `index` is not 
 *    specified for a given `Fragment`, its `index` will be updated to one larger than the running
 *    maximum.
 */
function remarkToDeckSchema(options) {
  // extract from the options the directory from which we source `deck` files
  var sourceDir = process.cwd() + (0, _types.defaultOptions)(options).sourceDir.slice(1);

  function transformer(markdownAST, vfile) {
    // only transform if the file corresponds to a deck.
    var filePath = vfile.history.at(-1);
    if (filePath && !filePath.includes(sourceDir)) return; // prepare a state for manipulation of the tree

    var newChildren = []; // ultimately the root node's children

    var currentSlideChildren = []; // children of running slide

    var fragmentIndex = 0; // running fragment index for new fragments

    var fragmentsBySlide = []; // an array of the amount of fragments by slide
    // add an import statement to the children for the Slide component

    newChildren.push({
      type: 'mdxjsEsm',
      // @ts-ignore
      value: "import { Slide } from '@presentations';",
      // @ts-ignore
      data: {
        estree: {
          type: 'Program',
          body: [{
            type: 'ImportDeclaration',
            specifiers: [{
              type: 'ImportSpecifier',
              imported: {
                type: 'Identifier',
                name: 'Slide'
              },
              local: {
                type: 'Identifier',
                name: 'Slide'
              }
            }],
            source: {
              type: 'literal',
              value: '@presentations',
              raw: "'@presentations'"
            }
          }]
        }
      }
    }); // run through the children of the root node, building the new tree

    markdownAST.children.forEach(function (child) {
      if (child.type === 'mdxjsEsm') {
        // if it is esm stuff, we append it and make no adjustments to the running slide
        newChildren.push(child);
      } else if (child.type === 'thematicBreak') {
        // if it is a `---`, we create the new slide
        var slideIndex = fragmentsBySlide.length;
        newChildren.push(slideWithChildren(currentSlideChildren, slideIndex));
        fragmentsBySlide.push(fragmentIndex);
        fragmentIndex = 0;
        currentSlideChildren = [];
      } else {
        // anything else will have its `Fragment` components normalized and be appended to the slide
        var _slideIndex = fragmentsBySlide.length;
        fragmentIndex = manipulateFragments(child, _slideIndex, fragmentIndex);
        currentSlideChildren.push(child);
      }
    }); // finish off last running slide

    if (currentSlideChildren.length) {
      var slideIndex = fragmentsBySlide.length;
      newChildren.push(slideWithChildren(currentSlideChildren, slideIndex));
      fragmentsBySlide.push(fragmentIndex);
    } // append the fragmentIndices data to the vfile


    vfile.data.presentation = {
      fragmentsBySlide: fragmentsBySlide
    }; // update the children of the markdownAST

    markdownAST.children = newChildren;
    return markdownAST;
  }

  return transformer;
} // recursive function which will append the running maximum fragment index to any fragment with 
// unspecified fragment


function manipulateFragments(node, slideIndex, fragmentIndex) {
  // we will ultimately return some number which is the index a new fragment should receive
  var newFragmentIndex = fragmentIndex; // if the node is a fragment, we must coerce its `index` and `slideIndex`

  if (node.type === 'mdxJsxFlowElement' && node.name === 'Fragment') {
    // try to grab the index attribute
    var indexAttr = node.attributes.find(function (attr) {
      return attr.name === 'index';
    }); // coerce the index attribute

    if (indexAttr) {
      // if the attribute exists, grab its proposed index
      var value = extractValue(indexAttr); // before updating state, we must check if user provided correctly

      if ((0, _utils.isNonnegativeInteger)(value)) {
        // update fragment index so that it is one larger than last seen
        newFragmentIndex = Math.max(value + 1, newFragmentIndex);
      } else {
        // throw error if user provided non-integer value
        throw new Error('@mvarble/gatsby-theme-presentations: ' + 'Fragment has illegal index; only positive integer literals allowed: \n' + JSON.stringify(node, null, '  '));
      }
    } else {
      // if no index attribute, add one with the new fragment index and update
      node.attributes.push(attributeKeyValue('index', String(newFragmentIndex)));
      newFragmentIndex++;
    } // check if user put a `slideIndex`


    var slideIndexAttr = node.attributes.find(function (attr) {
      return attr.name === 'slideIndex';
    });

    if (slideIndexAttr) {
      throw new Error('@mvarble/gatsby-theme-presentations: ' + 'Do not provide a `slideIndex` for a `Fragment`.' + 'This is calculated from the remark plugin.' + JSON.stringify(node, null, '  '));
    } else {
      node.attributes.push(attributeKeyValue('slideIndex', String(slideIndex)));
    }
  } // perform the same logic on each of the children


  if (Array.isArray(node.children)) {
    node.children.forEach(function (child) {
      newFragmentIndex = manipulateFragments(child, slideIndex, newFragmentIndex);
    });
  }

  return newFragmentIndex;
}

function extractValue(attr) {
  if (typeof attr.value === 'string') {
    return Number(attr.value);
  } else {
    return Number(attr.value.value);
  }
}

function attributeKeyValue(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name: name,
    value: value
  };
}

function slideWithChildren(children, index) {
  return {
    type: 'mdxJsxFlowElement',
    name: 'Slide',
    attributes: [attributeKeyValue('index', String(index))],
    children: children
  };
}