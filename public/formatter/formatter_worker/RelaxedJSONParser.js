// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
FormatterWorker.RelaxedJSONParser = {};

/** @enum {string} */
FormatterWorker.RelaxedJSONParser.States = {
  ExpectKey: 'ExpectKey',
  ExpectValue: 'ExpectValue'
};

/** @enum {*} */
FormatterWorker.RelaxedJSONParser.Keywords = {
  'NaN': NaN,
  'true': true,
  'false': false,
  'Infinity': Infinity,
  'undefined': undefined,
  'null': null
};

/**
 * @param {string} content
 * @return {*}
 */
FormatterWorker.RelaxedJSONParser.parse = function(content) {
  var Keywords = FormatterWorker.RelaxedJSONParser.Keywords;
  var States = FormatterWorker.RelaxedJSONParser.States;
  content = '(' + content + ')';

  try {
    var root = acorn.parse(content, {});
  } catch (e) {
    return null;
  }

  var walker = new FormatterWorker.ESTreeWalker(beforeVisit, afterVisit);

  var rootTip = [];

  /** @type {!Array.<!FormatterWorker.RelaxedJSONParser.Context>} */
  var stack = [];

  var stackData = /** @type {!FormatterWorker.RelaxedJSONParser.Context} */ (
      {key: 0, tip: rootTip, state: States.ExpectValue, parentIsArray: true});

  walker.setWalkNulls(true);
  var hasExpression = false;

  walker.walk(root);

  if (hasExpression)
    return null;
  return rootTip.length ? rootTip[0] : null;

  /**
   * @param {!FormatterWorker.RelaxedJSONParser.Context} newStack
   */
  function pushStack(newStack) {
    stack.push(stackData);
    stackData = newStack;
  }

  function popStack() {
    stackData = stack.pop();
  }

  /**
   * @param {*} value
   */
  function applyValue(value) {
    stackData.tip[stackData.key] = value;
    if (stackData.parentIsArray)
      stackData.key++;
    else
      stackData.state = null;
  }

  /**
   * @param {!ESTree.Node} node
   * @return {!Object|undefined}
   */
  function beforeVisit(node) {
    switch (node.type) {
      case 'ObjectExpression':
        var newTip = {};
        applyValue(newTip);

        pushStack(/** @type {!FormatterWorker.RelaxedJSONParser.Context} */ (
            {key: null, tip: newTip, state: null, parentIsArray: false}));
        break;
      case 'ArrayExpression':
        var newTip = [];
        applyValue(newTip);

        pushStack(/** @type {!FormatterWorker.RelaxedJSONParser.Context} */ (
            {key: 0, tip: newTip, state: States.ExpectValue, parentIsArray: true}));
        break;
      case 'Property':
        stackData.state = States.ExpectKey;
        break;
      case 'Literal':
        if (stackData.state === States.ExpectKey) {
          stackData.key = node.value;
          stackData.state = States.ExpectValue;
        } else if (stackData.state === States.ExpectValue) {
          applyValue(extractValue(node));
          return FormatterWorker.ESTreeWalker.SkipSubtree;
        }
        break;
      case 'Identifier':
        if (stackData.state === States.ExpectKey) {
          stackData.key = /** @type {string} */ (node.name);
          stackData.state = States.ExpectValue;
        } else if (stackData.state === States.ExpectValue) {
          applyValue(extractValue(node));
          return FormatterWorker.ESTreeWalker.SkipSubtree;
        }
        break;
      case 'UnaryExpression':
        if (stackData.state === States.ExpectValue) {
          applyValue(extractValue(node));
          return FormatterWorker.ESTreeWalker.SkipSubtree;
        }
        break;
      case 'Program':
      case 'ExpressionStatement':
        break;
      default:
        if (stackData.state === States.ExpectValue)
          applyValue(extractValue(node));
        return FormatterWorker.ESTreeWalker.SkipSubtree;
    }
  }

  /**
   * @param {!ESTree.Node} node
   */
  function afterVisit(node) {
    if (node.type === 'ObjectExpression' || node.type === 'ArrayExpression')
      popStack();
  }

  /**
   * @param {!ESTree.Node} node
   * @return {*}
   */
  function extractValue(node) {
    var isNegative = false;
    var originalNode = node;
    var value;
    if (node.type === 'UnaryExpression' && (node.operator === '-' || node.operator === '+')) {
      if (node.operator === '-')
        isNegative = true;
      node = /** @type {!ESTree.Node} */ (node.argument);
    }

    if (node.type === 'Literal') {
      value = node.value;
    } else if (node.type === 'Identifier' && Keywords.hasOwnProperty(node.name)) {
      value = Keywords[node.name];
    } else {
      hasExpression = true;
      return content.substring(originalNode.start, originalNode.end);
    }

    if (isNegative) {
      if (typeof value !== 'number') {
        hasExpression = true;
        return content.substring(originalNode.start, originalNode.end);
      }
      value = -(value);
    }
    return value;
  }
};

/**
 * @typedef {!{key: (number|string), tip: (!Array|!Object), state: ?FormatterWorker.RelaxedJSONParser.States, parentIsArray: boolean}}
 */
FormatterWorker.RelaxedJSONParser.Context;

//# sourceURL=http://plasma-umass.org/BLeak/viewer/chrome-devtools-frontend/front_end/formatter_worker/RelaxedJSONParser.js