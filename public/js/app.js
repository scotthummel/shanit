webpackJsonp([25],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(12);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports["default"]
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports["default"]
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(63);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(8);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(8);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(70),
  /* template */
  __webpack_require__(106),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/components/misc/TextToSpeech.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TextToSpeech.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25888cdc", Component.options)
  } else {
    hotAPI.reload("data-v-25888cdc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * vue-strap 2.0.2
 * http://wffranco.github.io/vue-strap/
 * Compiled using Vue 2.1.10
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueStrap"] = factory();
	else
		root["VueStrap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	var _utils = __webpack_require__(65);
	
	var _ClickOutside = __webpack_require__(66);
	
	var _ClickOutside2 = _interopRequireDefault(_ClickOutside);
	
	var _Scroll = __webpack_require__(68);
	
	var _Scroll2 = _interopRequireDefault(_Scroll);
	
	var _Accordion = __webpack_require__(69);
	
	var _Accordion2 = _interopRequireDefault(_Accordion);
	
	var _Affix = __webpack_require__(72);
	
	var _Affix2 = _interopRequireDefault(_Affix);
	
	var _Alert = __webpack_require__(75);
	
	var _Alert2 = _interopRequireDefault(_Alert);
	
	var _Aside = __webpack_require__(82);
	
	var _Aside2 = _interopRequireDefault(_Aside);
	
	var _ButtonGroup = __webpack_require__(87);
	
	var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);
	
	var _Carousel = __webpack_require__(90);
	
	var _Carousel2 = _interopRequireDefault(_Carousel);
	
	var _Checkbox = __webpack_require__(95);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	var _Datepicker = __webpack_require__(100);
	
	var _Datepicker2 = _interopRequireDefault(_Datepicker);
	
	var _Dropdown = __webpack_require__(105);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _FormGroup = __webpack_require__(108);
	
	var _FormGroup2 = _interopRequireDefault(_FormGroup);
	
	var _FormValidator = __webpack_require__(111);
	
	var _FormValidator2 = _interopRequireDefault(_FormValidator);
	
	var _Input = __webpack_require__(114);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Modal = __webpack_require__(119);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _Navbar = __webpack_require__(128);
	
	var _Navbar2 = _interopRequireDefault(_Navbar);
	
	var _Option = __webpack_require__(131);
	
	var _Option2 = _interopRequireDefault(_Option);
	
	var _Panel = __webpack_require__(134);
	
	var _Panel2 = _interopRequireDefault(_Panel);
	
	var _Popover = __webpack_require__(139);
	
	var _Popover2 = _interopRequireDefault(_Popover);
	
	var _Progressbar = __webpack_require__(145);
	
	var _Progressbar2 = _interopRequireDefault(_Progressbar);
	
	var _Radio = __webpack_require__(148);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	var _Select = __webpack_require__(153);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Slider = __webpack_require__(158);
	
	var _Slider2 = _interopRequireDefault(_Slider);
	
	var _Spinner = __webpack_require__(161);
	
	var _Spinner2 = _interopRequireDefault(_Spinner);
	
	var _Tab = __webpack_require__(166);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabGroup = __webpack_require__(169);
	
	var _TabGroup2 = _interopRequireDefault(_TabGroup);
	
	var _Tabs = __webpack_require__(174);
	
	var _Tabs2 = _interopRequireDefault(_Tabs);
	
	var _ToggleButton = __webpack_require__(179);
	
	var _ToggleButton2 = _interopRequireDefault(_ToggleButton);
	
	var _Tooltip = __webpack_require__(182);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	var _Typeahead = __webpack_require__(187);
	
	var _Typeahead2 = _interopRequireDefault(_Typeahead);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// Components
	
	// Directives
	// Utils
	var VueStrap = {
	  directives: {
	    ClickOutside: _ClickOutside2["default"],
	    Scroll: _Scroll2["default"]
	  },
	  utils: {
	    $: _NodeList2["default"],
	    coerce: _utils.coerce
	  },
	  //components
	  accordion: _Accordion2["default"],
	  affix: _Affix2["default"],
	  alert: _Alert2["default"],
	  aside: _Aside2["default"],
	  buttonGroup: _ButtonGroup2["default"],
	  carousel: _Carousel2["default"],
	  checkbox: _Checkbox2["default"],
	  datepicker: _Datepicker2["default"],
	  dropdown: _Dropdown2["default"],
	  formGroup: _FormGroup2["default"],
	  formValidator: _FormValidator2["default"],
	  input: _Input2["default"],
	  modal: _Modal2["default"],
	  navbar: _Navbar2["default"],
	  option: _Option2["default"],
	  panel: _Panel2["default"],
	  popover: _Popover2["default"],
	  progressbar: _Progressbar2["default"],
	  radio: _Radio2["default"],
	  select: _Select2["default"],
	  slider: _Slider2["default"],
	  spinner: _Spinner2["default"],
	  tab: _Tab2["default"],
	  tabGroup: _TabGroup2["default"],
	  tabs: _Tabs2["default"],
	  toggleButton: _ToggleButton2["default"],
	  tooltip: _Tooltip2["default"],
	  typeahead: _Typeahead2["default"]
	};
	
	module.exports = VueStrap;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty = __webpack_require__(2);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _iterator = __webpack_require__(20);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _getOwnPropertyNames = __webpack_require__(56);
	
	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);
	
	var _classCallCheck2 = __webpack_require__(62);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(63);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	__webpack_require__(64);
	
	var ArrayProto = Array.prototype;
	var nodeError = new Error('Passed arguments must be of Node');
	var blurEvent;
	var blurList = [];
	var Events = [];
	
	function isNode(val) {
	  return val instanceof window.Node;
	}
	function isNodeList(val) {
	  return val instanceof window.NodeList || val instanceof NodeList || val instanceof window.HTMLCollection || val instanceof Array;
	}
	
	var NodeList = function () {
	  function NodeList(args) {
	    (0, _classCallCheck3["default"])(this, NodeList);
	
	    var nodes = args;
	    if (args[0] === window) {
	      nodes = [window];
	    } else if (typeof args[0] === 'string') {
	      nodes = (args[1] || document).querySelectorAll(args[0]);
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    } else if (0 in args && !isNode(args[0]) && args[0] && 'length' in args[0]) {
	      nodes = args[0];
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    }
	    if (nodes) {
	      for (var i in nodes) {
	        this[i] = nodes[i];
	      }
	      this.length = nodes.length;
	    } else {
	      this.length = 0;
	    }
	    window.prueba = this;
	  }
	
	  (0, _createClass3["default"])(NodeList, [{
	    key: 'concat',
	    value: function concat() {
	      var nodes = ArrayProto.slice.call(this);
	      function flatten(arr) {
	        ArrayProto.forEach.call(arr, function (el) {
	          if (isNode(el)) {
	            if (!~nodes.indexOf(el)) nodes.push(el);
	          } else if (isNodeList(el)) {
	            flatten(el);
	          }
	        });
	      }
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (isNode(arg)) {
	          if (!~nodes.indexOf(arg)) nodes.push(arg);
	        } else if (isNodeList(arg)) {
	          flatten(arg);
	        } else {
	          throw Error('Concat arguments must be of a Node, NodeList, HTMLCollection, or Array of (Node, NodeList, HTMLCollection, Array)');
	        }
	      });
	      return NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete() {
	      var notRemoved = flatten(this).filter(function (el) {
	        if (el.remove) {
	          el.remove();
	        } else if (el.parentNode) {
	          el.parentNode.removeChild(el);
	        }
	        return document.body.contains(el);
	      });
	      if (notRemoved.length) console.warn('NodeList: Some nodes could not be deleted.');
	      return notRemoved;
	    }
	  }, {
	    key: 'each',
	    value: function each() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      ArrayProto.forEach.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'filter',
	    value: function filter() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      return NodeListJS(ArrayProto.filter.apply(this, args), this);
	    }
	  }, {
	    key: 'find',
	    value: function find(element) {
	      var nodes = [];
	      if (typeof element === 'string') flatten(this).forEach(function (node) {
	        nodes.push(node.querySelectorAll(element));
	      });
	      if (isNode(element)) flatten(this).forEach(function (node) {
	        if (node !== element && node.contains(element)) nodes.push(element);
	      });
	      if (isNodeList(element)) {
	        var els = flatten(element);
	        flatten(this).forEach(function (node) {
	          els.forEach(function (el) {
	            if (node !== el && node.contains(el)) nodes.push(el);
	          });
	        });
	      }
	      return flatten(nodes, this.owner);
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      ArrayProto.forEach.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'includes',
	    value: function includes(element, index) {
	      return ~this.indexOf(element, index);
	    }
	  }, {
	    key: 'map',
	    value: function map() {
	      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	
	      var mapped = ArrayProto.map.apply(this, args);
	      return mapped.some(function (el) {
	        return isNode(el) || isNodeList(el);
	      }) ? flatten(mapped, this) : mapped;
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	      return flatten(this.map(function (el) {
	        return el.parentNode;
	      }), this);
	    }
	  }, {
	    key: 'pop',
	    value: function pop(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      var pop = ArrayProto.pop.bind(this);
	      while (amount--) {
	        nodes.push(pop());
	      }return NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'push',
	    value: function push() {
	      var _this = this;
	
	      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (!isNode(arg)) throw nodeError;
	        if (!~_this.indexOf(arg)) ArrayProto.push.call(_this, arg);
	      });
	      return this;
	    }
	  }, {
	    key: 'shift',
	    value: function shift(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      while (amount--) {
	        nodes.push(ArrayProto.shift.call(this));
	      }return nodes.length == 1 ? nodes[0] : NodeListJS(nodes, this);
	    }
	  }, {
	    key: 'slice',
	    value: function slice() {
	      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }
	
	      return NodeListJS(ArrayProto.slice.apply(this, args), this);
	    }
	  }, {
	    key: 'splice',
	    value: function splice() {
	      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	        args[_key8] = arguments[_key8];
	      }
	
	      for (var i = 2, l = args.length; i < l; i++) {
	        if (!isNode(args[i])) throw nodeError;
	      }
	      ArrayProto.splice.apply(this, args);
	      return this;
	    }
	  }, {
	    key: 'unshift',
	    value: function unshift() {
	      var _this2 = this;
	
	      var unshift = ArrayProto.unshift.bind(this);
	
	      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        args[_key9] = arguments[_key9];
	      }
	
	      ArrayProto.forEach.call(args, function (arg) {
	        if (!isNode(arg)) throw nodeError;
	        if (!~_this2.indexOf(arg)) unshift(arg);
	      });
	      return this;
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(classes) {
	      return this.toggleClass(classes, true);
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(classes) {
	      return this.toggleClass(classes, false);
	    }
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(classes) {
	      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      var method = value === undefined || value === null ? 'toggle' : value ? 'add' : 'remove';
	      if (typeof classes === 'string') {
	        classes = classes.trim().replace(/\s+/, ' ').split(' ');
	      }
	      return this.each(function (el) {
	        return classes.forEach(function (c) {
	          return el.classList[method](c);
	        });
	      });
	    }
	  }, {
	    key: 'get',
	    value: function get(prop) {
	      var arr = [];
	      this.each(function (el) {
	        if (el !== null) {
	          el = el[prop];
	        }
	        arr.push(el);
	      });
	      return flatten(arr, this);
	    }
	  }, {
	    key: 'set',
	    value: function set(prop, value) {
	      if (prop.constructor === Object) {
	        this.each(function (el) {
	          if (el) {
	            for (var key in prop) {
	              if (key in el) {
	                el[key] = prop[key];
	              }
	            }
	          }
	        });
	      } else {
	        this.each(function (el) {
	          if (prop in el) {
	            el[prop] = value;
	          }
	        });
	      }
	      return this;
	    }
	  }, {
	    key: 'call',
	    value: function call() {
	      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        args[_key10] = arguments[_key10];
	      }
	
	      var method = ArrayProto.shift.call(args);
	      var arr = [];
	      var returnThis = true;
	      this.each(function (el) {
	        if (el && el[method] instanceof Function) {
	          el = el[method].apply(el, args);
	          arr.push(el);
	          if (returnThis && el !== undefined) {
	            returnThis = false;
	          }
	        } else {
	          arr.push(undefined);
	        }
	      });
	      return returnThis ? this : flatten(arr, this);
	    }
	  }, {
	    key: 'item',
	    value: function item(index) {
	      return NodeListJS([this[index]], this);
	    }
	  }, {
	    key: 'on',
	
	
	    // event handlers
	    value: function on(events, selector, callback) {
	      if (typeof events === 'string') {
	        events = events.trim().replace(/\s+/, ' ').split(' ');
	      }
	      if (!this || !this.length) return this;
	      if (callback === undefined) {
	        callback = selector;
	        selector = null;
	      }
	      if (!callback) return this;
	      var fn = callback;
	      callback = selector ? function (e) {
	        var els = NodeListJS(selector, this);
	        if (!els.length) {
	          return;
	        }
	        els.some(function (el) {
	          var target = el.contains(e.target);
	          if (target) fn.call(el, e, el);
	          return target;
	        });
	      } : function (e) {
	        fn.apply(this, [e, this]);
	      };
	      this.each(function (el) {
	        events.forEach(function (event) {
	          if (el === window || isNode(el)) {
	            el.addEventListener(event, callback, false);
	            Events.push({
	              el: el,
	              event: event,
	              callback: callback
	            });
	          }
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'off',
	    value: function off(events, callback) {
	      if (events instanceof Function) {
	        callback = events;
	        events = null;
	      }
	      events = events instanceof Array ? events : typeof events === 'string' ? events.trim().replace(/\s+/, ' ').split(' ') : null;
	      this.each(function (el) {
	        Events = Events.filter(function (e) {
	          if (e && e.el === el && (!callback || callback === e.callback) && (!events || ~events.indexOf(e.event))) {
	            e.el.removeEventListener(e.event, e.callback);
	            return false;
	          }
	          return true;
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(callback) {
	      if (!this || !this.length) return this;
	      if (!callback) return this;
	      this.each(function (el) {
	        blurList.push({ el: el, callback: callback });
	      });
	      if (!blurEvent) {
	        blurEvent = function blurEvent(e) {
	          blurList.forEach(function (item) {
	            var target = item.el.contains(e.target) || item.el === e.target;
	            if (!target) item.callback.call(item.el, e, item.el);
	          });
	        };
	        document.addEventListener('click', blurEvent, false);
	        document.addEventListener('touchstart', blurEvent, false);
	      }
	      return this;
	    }
	  }, {
	    key: 'offBlur',
	    value: function offBlur(callback) {
	      this.each(function (el) {
	        blurList = blurList.filter(function (blur) {
	          if (blur && blur.el === el && (!callback || blur.callback === callback)) {
	            return false;
	          }
	          return el;
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'asArray',
	    get: function get() {
	      return ArrayProto.slice.call(this);
	    }
	  }]);
	  return NodeList;
	}();
	
	var NL = NodeList.prototype;
	
	function flatten(arr, owner) {
	  var list = [];
	  ArrayProto.forEach.call(arr, function (el) {
	    if (isNode(el)) {
	      if (!~list.indexOf(el)) list.push(el);
	    } else if (isNodeList(el)) {
	      for (var id in el) {
	        if (!~list.indexOf(el[id])) list.push(el[id]);
	      }
	    } else if (el !== null) {
	      arr.get = NL.get;
	      arr.set = NL.set;
	      arr.call = NL.call;
	      arr.owner = owner;
	      return arr;
	    }
	  });
	  return NodeListJS(list, owner);
	}
	
	var exceptions = ['join', 'copyWithin', 'fill', 'find', 'forEach'];
	(0, _getOwnPropertyNames2["default"])(ArrayProto).forEach(function (key) {
	  if (!~exceptions.indexOf(key) && NL[key] === undefined) {
	    NL[key] = ArrayProto[key];
	  }
	});
	if (window.Symbol && _iterator2["default"]) {
	  NL[_iterator2["default"]] = NL.values = ArrayProto[_iterator2["default"]];
	}
	var div = document.createElement('div');
	function setterGetter(prop) {
	  var _this3 = this;
	
	  if (NL[prop]) return;
	  if (div[prop] instanceof Function) {
	    NL[prop] = function () {
	      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        args[_key11] = arguments[_key11];
	      }
	
	      var arr = [];
	      var returnThis = true;
	      for (var i in NL) {
	        var el = NL[i];
	        if (el && el[prop] instanceof Function) {
	          el = el[prop].apply(el, args);
	          arr.push(el);
	          if (returnThis && el !== undefined) {
	            returnThis = false;
	          }
	        } else {
	          arr.push(undefined);
	        }
	      }
	      return returnThis ? _this3 : flatten(arr, _this3);
	    };
	  } else {
	    (0, _defineProperty2["default"])(NL, prop, {
	      get: function get() {
	        var arr = [];
	        this.each(function (el) {
	          if (el !== null) {
	            el = el[prop];
	          }
	          arr.push(el);
	        });
	        return flatten(arr, this);
	      },
	      set: function set(value) {
	        this.each(function (el) {
	          if (el && prop in el) {
	            el[prop] = value;
	          }
	        });
	      }
	    });
	  }
	}
	for (var prop in div) {
	  setterGetter(prop);
	}function NodeListJS() {
	  for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
	    args[_key12] = arguments[_key12];
	  }
	
	  return new NodeList(args);
	}
	window.NL = NodeListJS;
	
	exports["default"] = NodeListJS;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(18)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function(){
	  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	__webpack_require__(51);
	module.exports = __webpack_require__(55).f('iterator');

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(23)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(26)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(24)
	  , defined   = __webpack_require__(25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(27)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(28)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(29)
	  , Iterators      = __webpack_require__(30)
	  , $iterCreate    = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(47)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(48)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(32)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(47)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(48)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(33)
	  , enumBugKeys = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(34);
	
	module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(35)
	  , enumBugKeys = __webpack_require__(45);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(29)
	  , toIObject    = __webpack_require__(36)
	  , arrayIndexOf = __webpack_require__(39)(false)
	  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(37)
	  , defined = __webpack_require__(25);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(38);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(36)
	  , toLength  = __webpack_require__(40)
	  , toIndex   = __webpack_require__(41);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(24)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(24)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(43)('keys')
	  , uid    = __webpack_require__(44);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(29)
	  , TAG = __webpack_require__(48)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(43)('wks')
	  , uid        = __webpack_require__(44)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(29)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(42)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(25);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(30)
	  , TO_STRING_TAG = __webpack_require__(48)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(53)
	  , step             = __webpack_require__(54)
	  , Iterators        = __webpack_require__(30)
	  , toIObject        = __webpack_require__(36);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(26)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(48);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(58);
	var $Object = __webpack_require__(7).Object;
	module.exports = function getOwnPropertyNames(it){
	  return $Object.getOwnPropertyNames(it);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(59)('getOwnPropertyNames', function(){
	  return __webpack_require__(60).f;
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(36)
	  , gOPN      = __webpack_require__(61).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(35)
	  , hiddenKeys = __webpack_require__(45).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(2);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Array.find
	 */
	if (!Array.prototype.find) {
	  Array.prototype.find = function (predicate) {
	    'use strict';
	
	    if (this == null) {
	      throw new TypeError('Array.prototype.find called on null or undefined');
	    }
	    if (typeof predicate !== 'function') {
	      throw new TypeError('predicate must be a function');
	    }
	    var list = Object(this);
	    var length = list.length >>> 0;
	    var thisArg = arguments[1];
	    var value;
	
	    for (var i = 0; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) {
	        return value;
	      }
	    }
	    return undefined;
	  };
	}
	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 1.1.20150312
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: Dedicated to the public domain.
	 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
	 */
	/*global self, document, DOMException */
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if ("document" in self) {
	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
	
	    (function (view) {
	
	      "use strict";
	
	      if (!('Element' in view)) return;
	
	      var classListProp = "classList",
	          protoProp = "prototype",
	          elemCtrProto = view.Element[protoProp],
	          objCtr = Object,
	          strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      },
	          arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var i = 0,
	            len = this.length;
	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }
	        return -1;
	      }
	      // Vendors: please allow content code to instantiate DOMExceptions
	      ,
	          DOMEx = function DOMEx(type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      },
	          checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
	        if (token === "") {
	          throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
	        }
	        if (/\s/.test(token)) {
	          throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
	        }
	        return arrIndexOf.call(classList, token);
	      },
	          ClassList = function ClassList(elem) {
	        var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
	            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
	            i = 0,
	            len = classes.length;
	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      },
	          classListProto = ClassList[protoProp] = [],
	          classListGetter = function classListGetter() {
	        return new ClassList(this);
	      };
	      // Most DOMException implementations don't allow calling DOMException's toString()
	      // on non-DOMExceptions. Error's toString() is sufficient here.
	      DOMEx[protoProp] = Error[protoProp];
	      classListProto.item = function (i) {
	        return this[i] || null;
	      };
	      classListProto.contains = function (token) {
	        token += "";
	        return checkTokenAndGetIndex(this, token) !== -1;
	      };
	      classListProto.add = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false;
	        do {
	          token = tokens[i] + "";
	          if (checkTokenAndGetIndex(this, token) === -1) {
	            this.push(token);
	            updated = true;
	          }
	        } while (++i < l);
	
	        if (updated) {
	          this._updateClassName();
	        }
	      };
	      classListProto.remove = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false,
	            index;
	        do {
	          token = tokens[i] + "";
	          index = checkTokenAndGetIndex(this, token);
	          while (index !== -1) {
	            this.splice(index, 1);
	            updated = true;
	            index = checkTokenAndGetIndex(this, token);
	          }
	        } while (++i < l);
	
	        if (updated) {
	          this._updateClassName();
	        }
	      };
	      classListProto.toggle = function (token, force) {
	        token += "";
	
	        var result = this.contains(token),
	            method = result ? force !== true && "remove" : force !== false && "add";
	
	        if (method) {
	          this[method](token);
	        }
	
	        if (force === true || force === false) {
	          return force;
	        } else {
	          return !result;
	        }
	      };
	      classListProto.toString = function () {
	        return this.join(" ");
	      };
	
	      if (objCtr.defineProperty) {
	        var classListPropDesc = {
	          get: classListGetter,
	          enumerable: true,
	          configurable: true
	        };
	        try {
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        } catch (ex) {
	          // IE 8 doesn't support enumerable:true
	          if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	          }
	        }
	      } else if (objCtr[protoProp].__defineGetter__) {
	        elemCtrProto.__defineGetter__(classListProp, classListGetter);
	      }
	    })(self);
	  } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.
	
	    (function () {
	      "use strict";
	
	      var testElement = document.createElement("_");
	
	      testElement.classList.add("c1", "c2");
	
	      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.
	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function createMethod(method) {
	          var original = DOMTokenList.prototype[method];
	
	          DOMTokenList.prototype[method] = function (token) {
	            var i,
	                len = arguments.length;
	
	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };
	        createMethod('add');
	        createMethod('remove');
	      }
	
	      testElement.classList.toggle("c3", false);
	
	      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.
	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;
	
	        DOMTokenList.prototype.toggle = function (token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };
	      }
	
	      testElement = null;
	    })();
	  }
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getJSON = getJSON;
	exports.getScrollBarWidth = getScrollBarWidth;
	exports.translations = translations;
	exports.delayer = delayer;
	exports.VueFixer = VueFixer;
	// coerce convert som types of data into another type
	var coerce = exports.coerce = {
	  // Convert a string to booleam. Otherwise, return the value without modification, so if is not boolean, Vue throw a warning.
	  "boolean": function boolean(val) {
	    return typeof val === 'string' ? val === '' || val === 'true' ? true : val === 'false' || val === 'null' || val === 'undefined' ? false : val : val;
	  },
	  // Attempt to convert a string value to a Number. Otherwise, return 0.
	  number: function number(val) {
	    var alt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    return typeof val === 'number' ? val : val === undefined || val === null || isNaN(Number(val)) ? alt : Number(val);
	  },
	  // Attempt to convert to string any value, except for null or undefined.
	  string: function string(val) {
	    return val === undefined || val === null ? '' : val + '';
	  },
	  // Pattern accept RegExp, function, or string (converted to RegExp). Otherwise return null.
	  pattern: function pattern(val) {
	    return val instanceof Function || val instanceof RegExp ? val : typeof val === 'string' ? new RegExp(val) : null;
	  }
	};
	
	function getJSON(url) {
	  var request = new window.XMLHttpRequest();
	  var data = {};
	  // p (-simulated- promise)
	  var p = {
	    then: function then(fn1, fn2) {
	      return p.done(fn1).fail(fn2);
	    },
	    "catch": function _catch(fn) {
	      return p.fail(fn);
	    },
	    always: function always(fn) {
	      return p.done(fn).fail(fn);
	    }
	  };
	  ['done', 'fail'].forEach(function (name) {
	    data[name] = [];
	    p[name] = function (fn) {
	      if (fn instanceof Function) data[name].push(fn);
	      return p;
	    };
	  });
	  p.done(JSON.parse);
	  request.onreadystatechange = function () {
	    if (request.readyState === 4) {
	      var response;
	      var i;
	      var value;
	
	      (function () {
	        var e = { status: request.status };
	        if (request.status === 200) {
	          try {
	            response = request.responseText;
	
	            for (i in data.done) {
	              value = data.done[i](response);
	
	              if (value !== undefined) {
	                response = value;
	              }
	            }
	          } catch (err) {
	            data.fail.forEach(function (fail) {
	              return fail(err);
	            });
	          }
	        } else {
	          data.fail.forEach(function (fail) {
	            return fail(e);
	          });
	        }
	      })();
	    }
	  };
	  request.open('GET', url);
	  request.setRequestHeader('Accept', 'application/json');
	  request.send();
	  return p;
	}
	
	function getScrollBarWidth() {
	  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
	    return 0;
	  }
	  var inner = document.createElement('p');
	  inner.style.width = '100%';
	  inner.style.height = '200px';
	
	  var outer = document.createElement('div');
	  outer.style.position = 'absolute';
	  outer.style.top = '0px';
	  outer.style.left = '0px';
	  outer.style.visibility = 'hidden';
	  outer.style.width = '200px';
	  outer.style.height = '150px';
	  outer.style.overflow = 'hidden';
	  outer.appendChild(inner);
	
	  document.body.appendChild(outer);
	  var w1 = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var w2 = inner.offsetWidth;
	  if (w1 === w2) w2 = outer.clientWidth;
	
	  document.body.removeChild(outer);
	
	  return w1 - w2;
	}
	
	// return all the translations or the default language (english)
	function translations() {
	  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
	
	  var text = {
	    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	    limit: 'Limit reached ({{limit}} items max).',
	    loading: 'Loading...',
	    minLength: 'Min. Length',
	    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    notSelected: 'Nothing Selected',
	    required: 'Required',
	    search: 'Search',
	    selected: '{{count}} selected'
	  };
	  return window.VueStrapLang ? window.VueStrapLang(lang) : text;
	}
	
	// delayer: set a function that execute after a delay
	// @params (function, delay_prop or value, default_value)
	function delayer(fn, varTimer) {
	  var ifNaN = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	
	  function toInt(el) {
	    return (/^[0-9]+$/.test(el) ? Number(el) || 1 : null
	    );
	  }
	  var timerId;
	  return function () {
	    var _this = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (timerId) clearTimeout(timerId);
	    timerId = setTimeout(function () {
	      fn.apply(_this, args);
	    }, toInt(varTimer) || toInt(this[varTimer]) || ifNaN);
	  };
	}
	
	// Fix a vue instance Lifecycle to vue 1/2 (just the basic elements, is not a real parser, so this work only if your code is compatible with both)
	// (Waiting for testing)
	function VueFixer(vue) {
	  var vue2 = !window.Vue || !window.Vue.partial;
	  var mixin = {
	    computed: {
	      vue2: function vue2() {
	        return !this.$dispatch;
	      }
	    }
	  };
	  if (!vue2) {
	    //translate vue2 attributes to vue1
	    if (vue.beforeCreate) {
	      mixin.create = vue.beforeCreate;
	      delete vue.beforeCreate;
	    }
	    if (vue.beforeMount) {
	      vue.beforeCompile = vue.beforeMount;
	      delete vue.beforeMount;
	    }
	    if (vue.mounted) {
	      vue.ready = vue.mounted;
	      delete vue.mounted;
	    }
	  } else {
	    //translate vue1 attributes to vue2
	    if (vue.beforeCompile) {
	      vue.beforeMount = vue.beforeCompile;
	      delete vue.beforeCompile;
	    }
	    if (vue.compiled) {
	      mixin.compiled = vue.compiled;
	      delete vue.compiled;
	    }
	    if (vue.ready) {
	      vue.mounted = vue.ready;
	      delete vue.ready;
	    }
	  }
	  if (!vue.mixins) {
	    vue.mixins = [];
	  }
	  vue.mixins.unshift(mixin);
	  return vue;
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Click outside directive
	 */
	var binded = [];
	
	function handler(e) {
	  binded.forEach(function (el) {
	    if (!el.node.contains(e.target)) el.callback(e);
	  });
	}
	
	function addListener(node, callback) {
	  if (!binded.length) document.addEventListener('click', handler, false);
	  binded.push({ node: node, callback: callback });
	}
	
	function removeListener(node, callback) {
	  binded = binded.filter(function (el) {
	    return el.node !== node ? true : !callback ? false : el.callback !== callback;
	  });
	  if (!binded.length) document.removeEventListener('click', handler, false);
	}
	
	exports["default"] = {
	  bind: function bind(el, binding) {
	    removeListener(el, binding.value);
	    if (typeof binding.value !== 'function') {
	      if (process.env.NODE_ENV !== 'production') {
	        Vue.util.warn('ClickOutside only work with a function, received: v-' + binding.name + '="' + binding.expression + '"');
	      }
	    } else {
	      addListener(el, binding.value);
	    }
	  },
	  update: function update(el, binding) {
	    if (binding.value !== binding.oldValue) {
	      removeListener(el, binding.oldValue);
	      addListener(el, binding.value);
	    }
	  },
	  unbind: function unbind(el, binding) {
	    removeListener(el, binding.value);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ },
/* 67 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Click outside directive
	 */
	var HANDLER = '_vue_scroll_handler';
	var events = ['resize', 'scroll'];
	
	function bind(el, binding) {
	  unbind(el);
	
	  var callback = binding.value;
	  if (typeof callback !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      Vue.util.warn('ClickOutside only work with a function value, received: v-' + binding.name + '="' + binding.expression + '"');
	    }
	  } else {
	    el[HANDLER] = function (e) {
	      callback(e);
	    };
	    events.forEach(function (e) {
	      window.addEventListener(e, el[HANDLER], false);
	    });
	    document.addEventListener('load', el[HANDLER], false);
	    setTimeout(function () {
	      el[HANDLER]();
	    }, 0);
	  }
	}
	
	function unbind(el) {
	  events.forEach(function (e) {
	    window.removeEventListener(e, el[HANDLER], false);
	  });
	  document.removeEventListener('load', el[HANDLER], false);
	  delete el[HANDLER];
	}
	
	exports["default"] = {
	  bind: bind,
	  unbind: unbind,
	  update: function update(el, binding) {
	    if (binding.value !== binding.oldValue) bind(el, binding);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(70)
	
	/* template */
	var __vue_template__ = __webpack_require__(71)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Accordion.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d4b75a92", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-d4b75a92", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Accordion.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	
	
	exports["default"] = {
	  props: {
	    type: {
	      type: String,
	      "default": null
	    },
	    oneAtAtime: {
	      type: Boolean,
	      "default": false
	    }
	  },
	  methods: {
	    openChild: function openChild(child) {
	      if (this.oneAtAtime) {
	        this.$children.forEach(function (item) {
	          if (child !== item) {
	            item.open = false;
	          }
	        });
	      }
	    }
	  },
	  created: function created() {
	    this._isAccordion = true;
	  }
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "panel-group"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d4b75a92", module.exports)
	  }
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(73)
	
	/* template */
	var __vue_template__ = __webpack_require__(74)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Affix.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5ebddebf", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5ebddebf", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Affix.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Scroll = __webpack_require__(68);
	
	var _Scroll2 = _interopRequireDefault(_Scroll);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  directives: {
	    Scroll: _Scroll2["default"]
	  },
	  props: {
	    offset: {
	      type: Number,
	      "default": 0
	    }
	  },
	  data: function data() {
	    return {
	      affixed: false
	    };
	  },
	
	  computed: {
	    top: function top() {
	      return this.offset > 0 ? this.offset + 'px' : null;
	    }
	  },
	  methods: {
	    // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
	    checkScroll: function checkScroll() {
	      // if is hidden don't calculate anything
	      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
	        return;
	      }
	      // get window scroll and element position to detect if have to be normal or affixed
	      var scroll = {};
	      var element = {};
	      var rect = this.$el.getBoundingClientRect();
	      var body = document.body;
	      var _arr = ['Top', 'Left'];
	      for (var _i = 0; _i < _arr.length; _i++) {
	        var type = _arr[_i];
	        var t = type.toLowerCase();
	        var ret = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset'];
	        var method = 'scroll' + type;
	        if (typeof ret !== 'number') {
	          // ie6,7,8 standard mode
	          ret = document.documentElement[method];
	          if (typeof ret !== 'number') {
	            // quirks mode
	            ret = document.body[method];
	          }
	        }
	        scroll[t] = ret;
	        element[t] = scroll[t] + rect[t] - (this.$el['client' + type] || body['client' + type] || 0);
	      }
	      var fix = scroll.top > element.top - this.offset;
	      if (this.affixed !== fix) {
	        this.affixed = fix;
	      }
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "hidden-print hidden-xs hidden-sm"
	  }, [_vm._c('nav', {
	    directives: [{
	      name: "scroll",
	      rawName: "v-scroll",
	      value: (_vm.checkScroll),
	      expression: "checkScroll"
	    }],
	    staticClass: "bs-docs-sidebar",
	    "class": {
	      affix: _vm.affixed
	    },
	    style: ({
	      marginTop: _vm.top
	    })
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5ebddebf", module.exports)
	  }
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(76)
	
	/* script */
	__vue_exports__ = __webpack_require__(80)
	
	/* template */
	var __vue_template__ = __webpack_require__(81)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Alert.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-af7c1f6a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-af7c1f6a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Alert.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(77);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-af7c1f6a!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Alert.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-af7c1f6a!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Alert.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.fade-enter-active,\r\n.fade-leave-active {\r\n  transition: opacity .3s ease;\n}\n.fade-enter,\r\n.fade-leave-active {\r\n  height: 0;\r\n  opacity: 0;\n}\n.alert.top {\r\n  position: fixed;\r\n  top: 30px;\r\n  margin: 0 auto;\r\n  left: 0;\r\n  right: 0;\r\n  z-index: 1050;\n}\n.alert.top-right {\r\n  position: fixed;\r\n  top: 30px;\r\n  right: 50px;\r\n  z-index: 1050;\n}\r\n", "", {"version":3,"sources":["/./src/Alert.vue?71a91c1a"],"names":[],"mappings":";AAoDA;;EAEA,6BAAA;CACA;AACA;;EAEA,UAAA;EACA,WAAA;CACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,cAAA;CACA;AACA;EACA,gBAAA;EACA,UAAA;EACA,YAAA;EACA,cAAA;CACA","file":"Alert.vue","sourcesContent":["<template>\r\n  <transition name=\"fade\">\r\n    <div v-show=\"val\" :class=\"['alert', 'alert-'+type, placement]\" :style=\"{width:width}\" role=\"alert\">\r\n      <button v-show=\"dismissable\" type=\"button\" class=\"close\" @click=\"val = false\">\r\n        <span>&times;</span>\r\n      </button>\r\n      <slot></slot>\r\n    </div>\r\n  </transition>\r\n</template>\r\n\r\n<script>\r\nimport {coerce, delayer} from './utils/utils.js'\r\n\r\nvar DURATION = 0\r\nexport default {\r\n  props: {\r\n    dismissable: {type: Boolean, default: false},\r\n    duration: {default: DURATION},\r\n    placement: {type: String},\r\n    type: {type: String},\r\n    value: {type: Boolean, default: true },\r\n    width: {type: String}\r\n  },\r\n  data () {\r\n    return {\r\n      val: this.value\r\n    }\r\n  },\r\n  computed: {\r\n    durationNum () { return coerce.number(this.duration, DURATION) }\r\n  },\r\n  watch: {\r\n    val (val) {\r\n      if (val && this.durationNum > 0) { this._delayClose() }\r\n      this.$emit('input', val)\r\n    },\r\n    value (val) {\r\n      if (this.val !== val) {\r\n        this.val = val\r\n      }\r\n    }\r\n  },\r\n  created () {\r\n    this._delayClose = delayer(function () {\r\n      this.val = false\r\n    }, 'durationNum')\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.fade-enter-active,\r\n.fade-leave-active {\r\n  transition: opacity .3s ease;\r\n}\r\n.fade-enter,\r\n.fade-leave-active {\r\n  height: 0;\r\n  opacity: 0;\r\n}\r\n.alert.top {\r\n  position: fixed;\r\n  top: 30px;\r\n  margin: 0 auto;\r\n  left: 0;\r\n  right: 0;\r\n  z-index: 1050;\r\n}\r\n.alert.top-right {\r\n  position: fixed;\r\n  top: 30px;\r\n  right: 50px;\r\n  z-index: 1050;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 78 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var DURATION = 0; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    dismissable: { type: Boolean, "default": false },
	    duration: { "default": DURATION },
	    placement: { type: String },
	    type: { type: String },
	    value: { type: Boolean, "default": true },
	    width: { type: String }
	  },
	  data: function data() {
	    return {
	      val: this.value
	    };
	  },
	
	  computed: {
	    durationNum: function durationNum() {
	      return _utils.coerce.number(this.duration, DURATION);
	    }
	  },
	  watch: {
	    val: function val(_val) {
	      if (_val && this.durationNum > 0) {
	        this._delayClose();
	      }
	      this.$emit('input', _val);
	    },
	    value: function value(val) {
	      if (this.val !== val) {
	        this.val = val;
	      }
	    }
	  },
	  created: function created() {
	    this._delayClose = (0, _utils.delayer)(function () {
	      this.val = false;
	    }, 'durationNum');
	  }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [_vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    "class": ['alert', 'alert-' + _vm.type, _vm.placement],
	    style: ({
	      width: _vm.width
	    }),
	    attrs: {
	      "role": "alert"
	    }
	  }, [_vm._c('button', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.dismissable),
	      expression: "dismissable"
	    }],
	    staticClass: "close",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.val = false
	      }
	    }
	  }, [_vm._c('span', [_vm._v("×")])]), _vm._v(" "), _vm._t("default")], 2)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-af7c1f6a", module.exports)
	  }
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(83)
	
	/* script */
	__vue_exports__ = __webpack_require__(85)
	
	/* template */
	var __vue_template__ = __webpack_require__(86)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Aside.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3a4bde27", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3a4bde27", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Aside.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3a4bde27!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Aside.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3a4bde27!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Aside.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.aside-open {\r\n  transition: transform 0.3s;\n}\n.aside-open.has-push-right {\r\n  transform: translateX(-300px);\n}\n.aside {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  z-index: 1049;\r\n  overflow: auto;\r\n  background: #fff;\n}\n.aside.left {\r\n  left: 0;\r\n  right: auto;\n}\n.aside.right {\r\n  left: auto;\r\n  right: 0;\n}\n.slideleft-enter {\r\n  transform:translateX(-100%);\n}\n.slideleft-enter-active {\r\n  animation:slideleft-in .3s;\n}\n.slideleft-leave-active {\r\n  animation:slideleft-out .3s;\n}\n@keyframes slideleft-in {\n0% {\r\n    transform: translateX(-100%);\r\n    opacity: 0;\n}\n100% {\r\n    transform: translateX(0);\r\n    opacity: 1;\n}\n}\n@keyframes slideleft-out {\n0% {\r\n    transform: translateX(0);\r\n    opacity: 1;\n}\n100% {\r\n    transform: translateX(-100%);\r\n    opacity: 0;\n}\n}\n.slideright-enter-active {\r\n  animation:slideright-in .3s;\n}\n.slideright-leave-active {\r\n  animation:slideright-out .3s;\n}\n@keyframes slideright-in {\n0% {\r\n    transform: translateX(100%);\r\n    opacity: 0;\n}\n100% {\r\n    transform: translateX(0);\r\n    opacity: 1;\n}\n}\n@keyframes slideright-out {\n0% {\r\n    transform: translateX(0);\r\n    opacity: 1;\n}\n100% {\r\n    transform: translateX(100%);\r\n    opacity: 0;\n}\n}\n.aside:focus {\r\n    outline: 0;\n}\n@media (max-width: 991px) {\n.aside {\r\n    min-width: 240px;\n}\n}\n.aside .aside-dialog .aside-header {\r\n  border-bottom: 1px solid #e5e5e5;\r\n  min-height: 16.43px;\r\n  padding: 6px 15px;\r\n  background: #337ab7;\r\n  color: #fff;\n}\n.aside .aside-dialog .aside-header .close {\r\n  margin-right: -8px;\r\n  padding: 4px 8px;\r\n  color: #fff;\r\n  font-size: 25px;\r\n  opacity: .8;\n}\n.aside .aside-dialog .aside-body {\r\n  position: relative;\r\n  padding: 15px;\n}\n.aside .aside-dialog .aside-footer {\r\n  padding: 15px;\r\n  text-align: right;\r\n  border-top: 1px solid #e5e5e5;\n}\n.aside .aside-dialog .aside-footer .btn+.btn {\r\n  margin-left: 5px;\r\n  margin-bottom: 0;\n}\n.aside .aside-dialog .aside-footer .btn-group .btn+.btn {\r\n  margin-left: -1px;\n}\n.aside .aside-dialog .aside-footer .btn-block+.btn-block {\r\n  margin-left: 0;\n}\n.aside-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1040;\r\n  opacity: 0;\r\n  transition: opacity .3s ease;\r\n  background-color: #000;\n}\n.aside-backdrop.in {\r\n  opacity: .5;\r\n  filter: alpha(opacity=50);\n}\r\n", "", {"version":3,"sources":["/./src/Aside.vue?5739621f"],"names":[],"mappings":";AAkFA;EACA,2BAAA;CACA;AACA;EACA,8BAAA;CACA;AACA;EACA,gBAAA;EACA,OAAA;EACA,UAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;CACA;AACA;EACA,QAAA;EACA,YAAA;CACA;AACA;EACA,WAAA;EACA,SAAA;CACA;AACA;EACA,4BAAA;CACA;AACA;EACA,2BAAA;CACA;AACA;EACA,4BAAA;CACA;AACA;AACA;IACA,6BAAA;IACA,WAAA;CACA;AACA;IACA,yBAAA;IACA,WAAA;CACA;CACA;AACA;AACA;IACA,yBAAA;IACA,WAAA;CACA;AACA;IACA,6BAAA;IACA,WAAA;CACA;CACA;AACA;EACA,4BAAA;CACA;AACA;EACA,6BAAA;CACA;AACA;AACA;IACA,4BAAA;IACA,WAAA;CACA;AACA;IACA,yBAAA;IACA,WAAA;CACA;CACA;AACA;AACA;IACA,yBAAA;IACA,WAAA;CACA;AACA;IACA,4BAAA;IACA,WAAA;CACA;CACA;AACA;IACA,WAAA;CACA;AACA;AACA;IACA,iBAAA;CACA;CACA;AACA;EACA,iCAAA;EACA,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,YAAA;CACA;AACA;EACA,mBAAA;EACA,iBAAA;EACA,YAAA;EACA,gBAAA;EACA,YAAA;CACA;AACA;EACA,mBAAA;EACA,cAAA;CACA;AACA;EACA,cAAA;EACA,kBAAA;EACA,8BAAA;CACA;AACA;EACA,iBAAA;EACA,iBAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,eAAA;CACA;AACA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;EACA,cAAA;EACA,WAAA;EACA,6BAAA;EACA,uBAAA;CACA;AACA;EACA,YAAA;EACA,0BAAA;CACA","file":"Aside.vue","sourcesContent":["<template>\r\n  <transition :name=\"'slide' + placement\">\r\n    <div class=\"aside\" v-if=\"show\" :style=\"{width:width+'px'}\" :class=\"placement\">\r\n      <div class=\"aside-dialog\">\r\n        <div class=\"aside-content\">\r\n          <div class=\"aside-header\">\r\n            <button type=\"button\" class=\"close\" @click='trigger_close'><span>&times;</span></button>\r\n            <h4 class=\"aside-title\"><slot name=\"header\">{{ header }}</slot></h4>\r\n          </div>\r\n          <div class=\"aside-body\"><slot></slot></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </transition>\r\n</template>\r\n\r\n<script>\r\nimport {getScrollBarWidth} from './utils/utils.js'\r\nimport $ from './utils/NodeList.js'\r\n\r\nexport default {\r\n  props: {\r\n    header: {type: String},\r\n    placement: {type: String, default: 'right'},\r\n    show: {type: Boolean, required: true},\r\n    width: {type: Number, default: 320}\r\n  },\r\n  watch: {\r\n    show (val, old) {\r\n      this.$emit('input', val)\r\n      this.$emit(this.show ? 'open' : 'close')\r\n      const body = document.body\r\n      const scrollBarWidth = getScrollBarWidth()\r\n      if (val) {\r\n        if (!this._backdrop) {\r\n          this._backdrop = document.createElement('div')\r\n        }\r\n        this._backdrop.className = 'aside-backdrop'\r\n        body.appendChild(this._backdrop)\r\n        body.classList.add('modal-open')\r\n        if (scrollBarWidth !== 0) {\r\n          body.style.paddingRight = scrollBarWidth + 'px'\r\n        }\r\n        // request property that requires layout to force a layout\r\n        var x = this._backdrop.clientHeight\r\n        this._backdrop.classList.add('in')\r\n        $(this._backdrop).on('click', () => this.trigger_close())\r\n      } else {\r\n        $(this._backdrop).on('transitionend', () => {\r\n          $(this._backdrop).off()\r\n          try {\r\n            body.classList.remove('modal-open')\r\n            body.style.paddingRight = '0'\r\n            body.removeChild(this._backdrop)\r\n            this._backdrop = null\r\n          } catch (e) {}\r\n        })\r\n        this._backdrop.className = 'aside-backdrop'\r\n      }\r\n    }\r\n  },\r\n  methods: {\r\n    trigger () {\r\n      return {\r\n        close: () => this.trigger_close(),\r\n        open: () => this.trigger_open()\r\n      }\r\n    },\r\n    trigger_close () {\r\n      this.$emit( 'close' )\r\n    },\r\n    trigger_open() {\r\n      this.$emit( 'open' )\r\n    }\r\n  },\r\n  mounted () {\r\n    this.$emit('trigger', () => this.trigger)\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.aside-open {\r\n  transition: transform 0.3s;\r\n}\r\n.aside-open.has-push-right {\r\n  transform: translateX(-300px);\r\n}\r\n.aside {\r\n  position: fixed;\r\n  top: 0;\r\n  bottom: 0;\r\n  z-index: 1049;\r\n  overflow: auto;\r\n  background: #fff;\r\n}\r\n.aside.left {\r\n  left: 0;\r\n  right: auto;\r\n}\r\n.aside.right {\r\n  left: auto;\r\n  right: 0;\r\n}\r\n.slideleft-enter {\r\n  transform:translateX(-100%);\r\n}\r\n.slideleft-enter-active {\r\n  animation:slideleft-in .3s;\r\n}\r\n.slideleft-leave-active {\r\n  animation:slideleft-out .3s;\r\n}\r\n@keyframes slideleft-in {\r\n  0% {\r\n    transform: translateX(-100%);\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    transform: translateX(0);\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes slideleft-out {\r\n  0% {\r\n    transform: translateX(0);\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    transform: translateX(-100%);\r\n    opacity: 0;\r\n  }\r\n}\r\n.slideright-enter-active {\r\n  animation:slideright-in .3s;\r\n}\r\n.slideright-leave-active {\r\n  animation:slideright-out .3s;\r\n}\r\n@keyframes slideright-in {\r\n  0% {\r\n    transform: translateX(100%);\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    transform: translateX(0);\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes slideright-out {\r\n  0% {\r\n    transform: translateX(0);\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    transform: translateX(100%);\r\n    opacity: 0;\r\n  }\r\n}\r\n.aside:focus {\r\n    outline: 0;\r\n}\r\n@media (max-width: 991px) {\r\n  .aside {\r\n    min-width: 240px;\r\n  }\r\n}\r\n.aside .aside-dialog .aside-header {\r\n  border-bottom: 1px solid #e5e5e5;\r\n  min-height: 16.43px;\r\n  padding: 6px 15px;\r\n  background: #337ab7;\r\n  color: #fff;\r\n}\r\n.aside .aside-dialog .aside-header .close {\r\n  margin-right: -8px;\r\n  padding: 4px 8px;\r\n  color: #fff;\r\n  font-size: 25px;\r\n  opacity: .8;\r\n}\r\n.aside .aside-dialog .aside-body {\r\n  position: relative;\r\n  padding: 15px;\r\n}\r\n.aside .aside-dialog .aside-footer {\r\n  padding: 15px;\r\n  text-align: right;\r\n  border-top: 1px solid #e5e5e5;\r\n}\r\n.aside .aside-dialog .aside-footer .btn+.btn {\r\n  margin-left: 5px;\r\n  margin-bottom: 0;\r\n}\r\n.aside .aside-dialog .aside-footer .btn-group .btn+.btn {\r\n  margin-left: -1px;\r\n}\r\n.aside .aside-dialog .aside-footer .btn-block+.btn-block {\r\n  margin-left: 0;\r\n}\r\n.aside-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1040;\r\n  opacity: 0;\r\n  transition: opacity .3s ease;\r\n  background-color: #000;\r\n}\r\n.aside-backdrop.in {\r\n  opacity: .5;\r\n  filter: alpha(opacity=50);\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    header: { type: String },
	    placement: { type: String, "default": 'right' },
	    show: { type: Boolean, required: true },
	    width: { type: Number, "default": 320 }
	  },
	  watch: {
	    show: function show(val, old) {
	      var _this = this;
	
	      this.$emit('input', val);
	      this.$emit(this.show ? 'open' : 'close');
	      var body = document.body;
	      var scrollBarWidth = (0, _utils.getScrollBarWidth)();
	      if (val) {
	        if (!this._backdrop) {
	          this._backdrop = document.createElement('div');
	        }
	        this._backdrop.className = 'aside-backdrop';
	        body.appendChild(this._backdrop);
	        body.classList.add('modal-open');
	        if (scrollBarWidth !== 0) {
	          body.style.paddingRight = scrollBarWidth + 'px';
	        }
	        // request property that requires layout to force a layout
	        var x = this._backdrop.clientHeight;
	        this._backdrop.classList.add('in');
	        (0, _NodeList2["default"])(this._backdrop).on('click', function () {
	          return _this.trigger_close();
	        });
	      } else {
	        (0, _NodeList2["default"])(this._backdrop).on('transitionend', function () {
	          (0, _NodeList2["default"])(_this._backdrop).off();
	          try {
	            body.classList.remove('modal-open');
	            body.style.paddingRight = '0';
	            body.removeChild(_this._backdrop);
	            _this._backdrop = null;
	          } catch (e) {}
	        });
	        this._backdrop.className = 'aside-backdrop';
	      }
	    }
	  },
	  methods: {
	    trigger: function trigger() {
	      var _this2 = this;
	
	      return {
	        close: function close() {
	          return _this2.trigger_close();
	        },
	        open: function open() {
	          return _this2.trigger_open();
	        }
	      };
	    },
	    trigger_close: function trigger_close() {
	      this.$emit('close');
	    },
	    trigger_open: function trigger_open() {
	      this.$emit('open');
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;
	
	    this.$emit('trigger', function () {
	      return _this3.trigger;
	    });
	  }
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('transition', {
	    attrs: {
	      "name": 'slide' + _vm.placement
	    }
	  }, [(_vm.show) ? _vm._c('div', {
	    staticClass: "aside",
	    "class": _vm.placement,
	    style: ({
	      width: _vm.width + 'px'
	    })
	  }, [_vm._c('div', {
	    staticClass: "aside-dialog"
	  }, [_vm._c('div', {
	    staticClass: "aside-content"
	  }, [_vm._c('div', {
	    staticClass: "aside-header"
	  }, [_vm._c('button', {
	    staticClass: "close",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.trigger_close
	    }
	  }, [_vm._c('span', [_vm._v("×")])]), _vm._v(" "), _vm._c('h4', {
	    staticClass: "aside-title"
	  }, [_vm._t("header", [_vm._v(_vm._s(_vm.header))])], 2)]), _vm._v(" "), _vm._c('div', {
	    staticClass: "aside-body"
	  }, [_vm._t("default")], 2)])])]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3a4bde27", module.exports)
	  }
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(88)
	
	/* template */
	var __vue_template__ = __webpack_require__(89)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\ButtonGroup.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-125eb0c8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-125eb0c8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] ButtonGroup.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    buttons: { type: Boolean, "default": true },
	    disabled: { type: Boolean, "default": false },
	    justified: { type: Boolean, "default": false },
	    type: { type: String, "default": 'default' },
	    value: { "default": null },
	    vertical: { type: Boolean, "default": false }
	  },
	  computed: {
	    btnGroup: function btnGroup() {
	      return !this.disabled;
	    }
	  },
	  data: function data() {
	    return {
	      val: this.value
	    };
	  },
	
	  watch: {
	    // this will update EXTERNAL v-model when our val changes
	    val: function val(_val) {
	      this.$emit('input', _val);
	    },
	
	    // this will update our INTERNAL val, when something external changes our v-model
	    value: function value(val) {
	      this.val = val;
	    }
	  }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    "class": {
	      'btn-group': _vm.buttons, 'btn-group-justified': _vm.justified, 'btn-group-vertical': _vm.vertical
	    },
	    attrs: {
	      "data-toggle": _vm.buttons && 'buttons'
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-125eb0c8", module.exports)
	  }
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(91)
	
	/* script */
	__vue_exports__ = __webpack_require__(93)
	
	/* template */
	var __vue_template__ = __webpack_require__(94)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Carousel.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-322dee41"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-322dee41", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-322dee41", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Carousel.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(92);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-322dee41&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-322dee41&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Carousel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.carousel-control[data-v-322dee41] {\r\n  cursor: pointer;\n}\r\n", "", {"version":3,"sources":["/./src/Carousel.vue?2f446342"],"names":[],"mappings":";AA4GA;EACA,gBAAA;CACA","file":"Carousel.vue","sourcesContent":["<template>\r\n<div class=\"carousel slide\" data-ride=\"carousel\">\r\n  <!-- Indicators -->\r\n  <ol class=\"carousel-indicators\" v-show=\"indicators\">\r\n    <li v-for=\"(indicator,i) in indicator_list\" @click=\"indicatorClick(i)\" :class=\"{active:i === index}\"><span></span></li>\r\n  </ol>\r\n  <!-- Wrapper for slides -->\r\n  <div class=\"carousel-inner\" role=\"listbox\">\r\n    <slot></slot>\r\n  </div>\r\n  <!-- Controls -->\r\n  <div v-show=\"controls\" class=\"carousel-controls hidden-xs\">\r\n    <a class=\"left carousel-control\" role=\"button\" @click=\"prev\">\r\n      <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\r\n    </a>\r\n    <a class=\"right carousel-control\" role=\"button\" @click=\"next\">\r\n      <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\r\n    </a>\r\n  </div>\r\n</div>\r\n</template>\r\n\r\n<script>\r\nimport $ from './utils/NodeList.js'\r\n// let coerce = {\r\n//   interval: 'number'\r\n// }\r\n\r\nexport default {\r\n  props: {\r\n    indicators: {\r\n      type: Boolean,\r\n      default: true\r\n    },\r\n    controls: {\r\n      type: Boolean,\r\n      default: true\r\n    },\r\n    interval: {\r\n      type: Number,\r\n      default: 5000\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      indicator_list: [],\r\n      index: 0,\r\n      isAnimating: false\r\n    }\r\n  },\r\n  watch: {\r\n    index (newVal, oldVal) {\r\n      this.slide(newVal > oldVal ? 'left' : 'right', newVal, oldVal)\r\n    }\r\n  },\r\n  methods: {\r\n    indicatorClick (index) {\r\n      if (this.isAnimating || this.index === index) return false\r\n      this.isAnimating = true\r\n      this.index = index\r\n    },\r\n    slide (direction, next, prev) {\r\n      if (!this.$el) { return }\r\n      const $slider = $('.item', this.$el)\r\n      if (!$slider.length) { return }\r\n      const selected = $slider[next] || $slider[0]\r\n      $(selected).addClass(direction === 'left' ? 'next' : 'prev')\r\n      // request property that requires layout to force a layout\r\n      var x = selected.clientHeight\r\n      $([$slider[prev], selected]).addClass(direction).on('transitionend', () => {\r\n        $slider.off('transitionend').className = 'item'\r\n        $(selected).addClass('active')\r\n        this.isAnimating = false\r\n      })\r\n    },\r\n    next () {\r\n      if (!this.$el || this.isAnimating) { return false }\r\n      this.isAnimating = true\r\n      this.index + 1 < $('.item', this.$el).length ? this.index += 1 : this.index = 0\r\n    },\r\n    prev () {\r\n      if (!this.$el || this.isAnimating) { return false }\r\n      this.isAnimating = true\r\n      this.index === 0 ? this.index = $('.item', this.$el).length - 1 : this.index -= 1\r\n    },\r\n    toggleInterval (val) {\r\n      if (val === undefined) { val = this._intervalID }\r\n      if(this._intervalID) {\r\n        clearInterval(this._intervalID)\r\n        delete this._intervalID\r\n      }\r\n      if(val && this.interval > 0) {\r\n        this._intervalID = setInterval(this.next, this.interval)\r\n      }\r\n    }\r\n  },\r\n  mounted () {\r\n    this.toggleInterval(true)\r\n    $(this.$el).on('mouseenter', () => this.toggleInterval(false)).on('mouseleave', () => this.toggleInterval(true))\r\n  },\r\n  beforeDestroy () {\r\n    this.toggleInterval(false)\r\n    $(this.$el).off('mouseenter mouseleave')\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.carousel-control {\r\n  cursor: pointer;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// let coerce = {
	//   interval: 'number'
	// }
	
	exports["default"] = {
	  props: {
	    indicators: {
	      type: Boolean,
	      "default": true
	    },
	    controls: {
	      type: Boolean,
	      "default": true
	    },
	    interval: {
	      type: Number,
	      "default": 5000
	    }
	  },
	  data: function data() {
	    return {
	      indicator_list: [],
	      index: 0,
	      isAnimating: false
	    };
	  },
	
	  watch: {
	    index: function index(newVal, oldVal) {
	      this.slide(newVal > oldVal ? 'left' : 'right', newVal, oldVal);
	    }
	  },
	  methods: {
	    indicatorClick: function indicatorClick(index) {
	      if (this.isAnimating || this.index === index) return false;
	      this.isAnimating = true;
	      this.index = index;
	    },
	    slide: function slide(direction, next, prev) {
	      var _this = this;
	
	      if (!this.$el) {
	        return;
	      }
	      var $slider = (0, _NodeList2["default"])('.item', this.$el);
	      if (!$slider.length) {
	        return;
	      }
	      var selected = $slider[next] || $slider[0];
	      (0, _NodeList2["default"])(selected).addClass(direction === 'left' ? 'next' : 'prev');
	      // request property that requires layout to force a layout
	      var x = selected.clientHeight;
	      (0, _NodeList2["default"])([$slider[prev], selected]).addClass(direction).on('transitionend', function () {
	        $slider.off('transitionend').className = 'item';
	        (0, _NodeList2["default"])(selected).addClass('active');
	        _this.isAnimating = false;
	      });
	    },
	    next: function next() {
	      if (!this.$el || this.isAnimating) {
	        return false;
	      }
	      this.isAnimating = true;
	      this.index + 1 < (0, _NodeList2["default"])('.item', this.$el).length ? this.index += 1 : this.index = 0;
	    },
	    prev: function prev() {
	      if (!this.$el || this.isAnimating) {
	        return false;
	      }
	      this.isAnimating = true;
	      this.index === 0 ? this.index = (0, _NodeList2["default"])('.item', this.$el).length - 1 : this.index -= 1;
	    },
	    toggleInterval: function toggleInterval(val) {
	      if (val === undefined) {
	        val = this._intervalID;
	      }
	      if (this._intervalID) {
	        clearInterval(this._intervalID);
	        delete this._intervalID;
	      }
	      if (val && this.interval > 0) {
	        this._intervalID = setInterval(this.next, this.interval);
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;
	
	    this.toggleInterval(true);
	    (0, _NodeList2["default"])(this.$el).on('mouseenter', function () {
	      return _this2.toggleInterval(false);
	    }).on('mouseleave', function () {
	      return _this2.toggleInterval(true);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.toggleInterval(false);
	    (0, _NodeList2["default"])(this.$el).off('mouseenter mouseleave');
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "carousel slide",
	    attrs: {
	      "data-ride": "carousel"
	    }
	  }, [_vm._c('ol', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.indicators),
	      expression: "indicators"
	    }],
	    staticClass: "carousel-indicators"
	  }, _vm._l((_vm.indicator_list), function(indicator, i) {
	    return _vm._c('li', {
	      "class": {
	        active: i === _vm.index
	      },
	      on: {
	        "click": function($event) {
	          _vm.indicatorClick(i)
	        }
	      }
	    }, [_vm._c('span')])
	  })), _vm._v(" "), _vm._c('div', {
	    staticClass: "carousel-inner",
	    attrs: {
	      "role": "listbox"
	    }
	  }, [_vm._t("default")], 2), _vm._v(" "), _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.controls),
	      expression: "controls"
	    }],
	    staticClass: "carousel-controls hidden-xs"
	  }, [_vm._c('a', {
	    staticClass: "left carousel-control",
	    attrs: {
	      "role": "button"
	    },
	    on: {
	      "click": _vm.prev
	    }
	  }, [_vm._c('span', {
	    staticClass: "glyphicon glyphicon-chevron-left",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })]), _vm._v(" "), _vm._c('a', {
	    staticClass: "right carousel-control",
	    attrs: {
	      "role": "button"
	    },
	    on: {
	      "click": _vm.next
	    }
	  }, [_vm._c('span', {
	    staticClass: "glyphicon glyphicon-chevron-right",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-322dee41", module.exports)
	  }
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(96)
	
	/* script */
	__vue_exports__ = __webpack_require__(98)
	
	/* template */
	var __vue_template__ = __webpack_require__(99)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Checkbox.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6922bf24"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6922bf24", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6922bf24", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(97);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6922bf24&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkbox.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6922bf24&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkbox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\nlabel.checkbox[data-v-6922bf24] {\r\n  position: relative;\r\n  padding-left: 18px;\n}\nlabel.checkbox > input[data-v-6922bf24] {\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n  z-index: -1;\r\n  padding: 0;\r\n  opacity: 0;\r\n  margin: 0;\n}\nlabel.checkbox > .icon[data-v-6922bf24] {\r\n  position: absolute;\r\n  top: .2rem;\r\n  left: 0;\r\n  display: block;\r\n  width: 1.4rem;\r\n  height: 1.4rem;\r\n  line-height:1rem;\r\n  text-align: center;\r\n  user-select: none;\r\n  border-radius: .35rem;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: 50% 50%;\n}\nlabel.checkbox:not(.active) > .icon[data-v-6922bf24] {\r\n  background-color: #ddd;\r\n  border: 1px solid #bbb;\n}\nlabel.checkbox > input:focus ~ .icon[data-v-6922bf24] {\r\n  outline: 0;\r\n  border: 1px solid #66afe9;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\nlabel.checkbox.active > .icon[data-v-6922bf24] {\r\n  background-size: 1rem 1rem;\r\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+);\n}\nlabel.checkbox.active .btn-default[data-v-6922bf24] { filter: brightness(75%);\n}\nlabel.checkbox.disabled[data-v-6922bf24],\r\nlabel.checkbox.readonly[data-v-6922bf24],\r\n.btn.readonly[data-v-6922bf24] {\r\n  filter: alpha(opacity=65);\r\n  box-shadow: none;\r\n  opacity: .65;\n}\nlabel.btn > input[type=checkbox][data-v-6922bf24] {\r\n  position: absolute;\r\n  clip: rect(0,0,0,0);\r\n  pointer-events: none;\n}\r\n", "", {"version":3,"sources":["/./src/Checkbox.vue?58a1e5c4"],"names":[],"mappings":";AAuFA;EACA,mBAAA;EACA,mBAAA;CACA;AACA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,WAAA;EACA,UAAA;CACA;AACA;EACA,mBAAA;EACA,WAAA;EACA,QAAA;EACA,eAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,kBAAA;EACA,sBAAA;EACA,6BAAA;EACA,mCAAA;EACA,yBAAA;CACA;AACA;EACA,uBAAA;EACA,uBAAA;CACA;AACA;EACA,WAAA;EACA,0BAAA;EACA,0EAAA;CACA;AACA;EACA,2BAAA;EACA,kZAAA;CACA;AACA,sDAAA,wBAAA;CAAA;AAEA;;;EAGA,0BAAA;EACA,iBAAA;EACA,aAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,qBAAA;CACA","file":"Checkbox.vue","sourcesContent":["<template>\r\n  <a :is=\"isButton?'a':'label'\" @click=\"toggle\" :class=\"[isButton?'btn btn-'+typeColor:'open checkbox '+typeColor,{active:checked,disabled:disabled,readonly:readonly}]\">\r\n    <input v-if=\"name\" type=\"hidden\" :name=\"name\" :value=\"checked?trueValue:falseValue\" />\r\n    <span v-if=\"!isButton\" class=\"icon dropdown-toggle\" :class=\"[checked?'btn-'+typeColor:'',{bg:typeColor==='default'}]\"></span>\r\n    <span v-if=\"!isButton&&checked&&typeColor==='default'\" class=\"icon\"></span>\r\n    <slot></slot>\r\n  </a>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    button: {type: Boolean, default: false},\r\n    disabled: {type: Boolean, default: false},\r\n    falseValue: {default: false},\r\n    name: {type: String, default: null},\r\n    readonly: {type: Boolean, default: false},\r\n    trueValue: {default: true},\r\n    type: {type: String, default: null},\r\n    value: {default: false}\r\n  },\r\n  data () {\r\n    return {\r\n      checked: (this.value === this.trueValue)\r\n    }\r\n  },\r\n  computed: {\r\n    inGroup () { return this.$parent && this.$parent.btnGroup && !this.$parent._radioGroup },\r\n    isButton () { return this.button || (this.$parent && this.$parent.btnGroup && this.$parent.buttons) },\r\n    isFalse () { return this.value === this.falseValue },\r\n    isTrue () { return this.value === this.trueValue },\r\n    parentValue () { return this.$parent.val },\r\n    typeColor () { return (this.type || (this.$parent && this.$parent.type)) || 'default' }\r\n  },\r\n  watch: {\r\n    checked (val, old) {\r\n      var value = val ? this.trueValue : this.falseValue\r\n      this.$emit('checked', val)\r\n      this.$emit('input', value);\r\n      this.updateParent()\r\n    },\r\n    parentValue (val) {\r\n      this.updateFromParent();\r\n    },\r\n    value (val, old) {\r\n      var checked = val === this.trueValue\r\n      if (this.checked !== checked) {\r\n        this.checked = checked\r\n      }\r\n    }\r\n  },\r\n  created () {\r\n    if (this.inGroup) {\r\n      const parent = this.$parent\r\n      parent._checkboxGroup = true\r\n      if (!(parent.val instanceof Array)) { parent.val = [] }\r\n    }\r\n  },\r\n  mounted () {\r\n    this.updateFromParent();\r\n  },\r\n  methods: {\r\n    // called @ mounted(), or whenever $parent.val changes\r\n    // sync our state with the $parent.val\r\n    updateFromParent() {\r\n      if (this.inGroup) {\r\n        var index = this.$parent.val.indexOf(this.trueValue)\r\n        this.checked = ~index\r\n      }\r\n    },\r\n    // called when our checked state changes\r\n    updateParent() {\r\n      if (this.inGroup) {\r\n        var index = this.$parent.val.indexOf(this.trueValue)\r\n        if (this.checked && !~index) this.$parent.val.push(this.trueValue)\r\n        if (!this.checked && ~index) this.$parent.val.splice(index, 1)\r\n      }\r\n    },\r\n    toggle () {\r\n      if (this.disabled || this.readonly) { return }\r\n      this.checked = !this.checked\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\nlabel.checkbox {\r\n  position: relative;\r\n  padding-left: 18px;\r\n}\r\nlabel.checkbox > input {\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n  z-index: -1;\r\n  padding: 0;\r\n  opacity: 0;\r\n  margin: 0;\r\n}\r\nlabel.checkbox > .icon {\r\n  position: absolute;\r\n  top: .2rem;\r\n  left: 0;\r\n  display: block;\r\n  width: 1.4rem;\r\n  height: 1.4rem;\r\n  line-height:1rem;\r\n  text-align: center;\r\n  user-select: none;\r\n  border-radius: .35rem;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: 50% 50%;\r\n}\r\nlabel.checkbox:not(.active) > .icon {\r\n  background-color: #ddd;\r\n  border: 1px solid #bbb;\r\n}\r\nlabel.checkbox > input:focus ~ .icon {\r\n  outline: 0;\r\n  border: 1px solid #66afe9;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\r\n}\r\nlabel.checkbox.active > .icon {\r\n  background-size: 1rem 1rem;\r\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtNS43MywwLjUybC0zLjEyNDIyLDMuMzQxNjFsLTEuMzM4OTUsLTEuNDMyMTJsLTEuMjQ5NjksMS4zMzY2NWwyLjU4ODYzLDIuNzY4NzZsNC4zNzM5LC00LjY3ODI2bC0xLjI0OTY5LC0xLjMzNjY1bDAsMGwwLjAwMDAyLDAuMDAwMDF6Ii8+PC9zdmc+);\r\n}\r\nlabel.checkbox.active .btn-default { filter: brightness(75%); }\r\n\r\nlabel.checkbox.disabled,\r\nlabel.checkbox.readonly,\r\n.btn.readonly {\r\n  filter: alpha(opacity=65);\r\n  box-shadow: none;\r\n  opacity: .65;\r\n}\r\nlabel.btn > input[type=checkbox] {\r\n  position: absolute;\r\n  clip: rect(0,0,0,0);\r\n  pointer-events: none;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    button: { type: Boolean, "default": false },
	    disabled: { type: Boolean, "default": false },
	    falseValue: { "default": false },
	    name: { type: String, "default": null },
	    readonly: { type: Boolean, "default": false },
	    trueValue: { "default": true },
	    type: { type: String, "default": null },
	    value: { "default": false }
	  },
	  data: function data() {
	    return {
	      checked: this.value === this.trueValue
	    };
	  },
	
	  computed: {
	    inGroup: function inGroup() {
	      return this.$parent && this.$parent.btnGroup && !this.$parent._radioGroup;
	    },
	    isButton: function isButton() {
	      return this.button || this.$parent && this.$parent.btnGroup && this.$parent.buttons;
	    },
	    isFalse: function isFalse() {
	      return this.value === this.falseValue;
	    },
	    isTrue: function isTrue() {
	      return this.value === this.trueValue;
	    },
	    parentValue: function parentValue() {
	      return this.$parent.val;
	    },
	    typeColor: function typeColor() {
	      return this.type || this.$parent && this.$parent.type || 'default';
	    }
	  },
	  watch: {
	    checked: function checked(val, old) {
	      var value = val ? this.trueValue : this.falseValue;
	      this.$emit('checked', val);
	      this.$emit('input', value);
	      this.updateParent();
	    },
	    parentValue: function parentValue(val) {
	      this.updateFromParent();
	    },
	    value: function value(val, old) {
	      var checked = val === this.trueValue;
	      if (this.checked !== checked) {
	        this.checked = checked;
	      }
	    }
	  },
	  created: function created() {
	    if (this.inGroup) {
	      var parent = this.$parent;
	      parent._checkboxGroup = true;
	      if (!(parent.val instanceof Array)) {
	        parent.val = [];
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.updateFromParent();
	  },
	
	  methods: {
	    // called @ mounted(), or whenever $parent.val changes
	    // sync our state with the $parent.val
	    updateFromParent: function updateFromParent() {
	      if (this.inGroup) {
	        var index = this.$parent.val.indexOf(this.trueValue);
	        this.checked = ~index;
	      }
	    },
	
	    // called when our checked state changes
	    updateParent: function updateParent() {
	      if (this.inGroup) {
	        var index = this.$parent.val.indexOf(this.trueValue);
	        if (this.checked && !~index) this.$parent.val.push(this.trueValue);
	        if (!this.checked && ~index) this.$parent.val.splice(index, 1);
	      }
	    },
	    toggle: function toggle() {
	      if (this.disabled || this.readonly) {
	        return;
	      }
	      this.checked = !this.checked;
	    }
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c(_vm.isButton ? 'a' : 'label', {
	    tag: "a",
	    "class": [_vm.isButton ? 'btn btn-' + _vm.typeColor : 'open checkbox ' + _vm.typeColor, {
	      active: _vm.checked,
	      disabled: _vm.disabled,
	      readonly: _vm.readonly
	    }],
	    on: {
	      "click": _vm.toggle
	    }
	  }, [(_vm.name) ? _vm._c('input', {
	    attrs: {
	      "type": "hidden",
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.checked ? _vm.trueValue : _vm.falseValue
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.isButton) ? _vm._c('span', {
	    staticClass: "icon dropdown-toggle",
	    "class": [_vm.checked ? 'btn-' + _vm.typeColor : '', {
	      bg: _vm.typeColor === 'default'
	    }]
	  }) : _vm._e(), _vm._v(" "), (!_vm.isButton && _vm.checked && _vm.typeColor === 'default') ? _vm._c('span', {
	    staticClass: "icon"
	  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6922bf24", module.exports)
	  }
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(101)
	
	/* script */
	__vue_exports__ = __webpack_require__(103)
	
	/* template */
	var __vue_template__ = __webpack_require__(104)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Datepicker.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-477b8e5d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-477b8e5d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Datepicker.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-477b8e5d!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datepicker.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-477b8e5d!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datepicker.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.datepicker {\r\n  position: relative;\r\n  display: inline-block;\n}\ninput.datepicker-input.with-reset-button {\r\n  padding-right: 25px;\n}\n.datepicker > button.close {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  outline: none;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\n}\n.datepicker > button.close:focus {\r\n  opacity: .2;\n}\n.datepicker-popup {\r\n  position: absolute;\r\n  border: 1px solid #ccc;\r\n  border-radius: 5px;\r\n  background: #fff;\r\n  margin-top: 2px;\r\n  z-index: 1000;\r\n  box-shadow: 0 6px 12px rgba(0,0,0,0.175);\n}\n.datepicker-inner {\r\n  width: 218px;\n}\n.datepicker-body {\r\n  padding: 10px 10px;\n}\n.datepicker-ctrl p,\r\n.datepicker-ctrl span,\r\n.datepicker-body span {\r\n  display: inline-block;\r\n  width: 28px;\r\n  line-height: 28px;\r\n  height: 28px;\r\n  border-radius: 4px;\n}\n.datepicker-ctrl p {\r\n  width: 65%;\n}\n.datepicker-ctrl span {\r\n  position: absolute;\n}\n.datepicker-body span {\r\n  text-align: center;\n}\n.datepicker-monthRange span {\r\n  width: 48px;\r\n  height: 50px;\r\n  line-height: 45px;\n}\n.datepicker-item-disable {\r\n  background-color: white!important;\r\n  cursor: not-allowed!important;\n}\n.decadeRange span:first-child,\r\n.decadeRange span:last-child,\r\n.datepicker-item-disable,\r\n.datepicker-item-gray {\r\n  color: #999;\n}\n.datepicker-dateRange-item-active:hover,\r\n.datepicker-dateRange-item-active {\r\n  background: rgb(50, 118, 177)!important;\r\n  color: white!important;\n}\n.datepicker-monthRange {\r\n  margin-top: 10px\n}\n.datepicker-monthRange span,\r\n.datepicker-ctrl span,\r\n.datepicker-ctrl p,\r\n.datepicker-dateRange span {\r\n  cursor: pointer;\n}\n.datepicker-monthRange span:hover,\r\n.datepicker-ctrl p:hover,\r\n.datepicker-ctrl i:hover,\r\n.datepicker-dateRange span:hover,\r\n.datepicker-dateRange-item-hover {\r\n  background-color : #eeeeee;\n}\n.datepicker-weekRange span {\r\n  font-weight: bold;\n}\n.datepicker-label {\r\n  background-color: #f8f8f8;\r\n  font-weight: 700;\r\n  padding: 7px 0;\r\n  text-align: center;\n}\n.datepicker-ctrl {\r\n  position: relative;\r\n  height: 30px;\r\n  line-height: 30px;\r\n  font-weight: bold;\r\n  text-align: center;\n}\n.month-btn {\r\n  font-weight: bold;\r\n  -webkit-user-select:none;\r\n  -moz-user-select:none;\r\n  -ms-user-select:none;\r\n  user-select:none;\n}\n.datepicker-preBtn {\r\n  left: 2px;\n}\n.datepicker-nextBtn {\r\n  right: 2px;\n}\r\n", "", {"version":3,"sources":["/./src/Datepicker.vue?52006f6c"],"names":[],"mappings":";AAiVA;EACA,mBAAA;EACA,sBAAA;CACA;AACA;EACA,oBAAA;CACA;AACA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,cAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;CACA;AACA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,iBAAA;EACA,gBAAA;EACA,cAAA;EACA,yCAAA;CACA;AACA;EACA,aAAA;CACA;AACA;EACA,mBAAA;CACA;AACA;;;EAGA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;CACA;AACA;EACA,WAAA;CACA;AACA;EACA,mBAAA;CACA;AACA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA;AACA;EACA,kCAAA;EACA,8BAAA;CACA;AACA;;;;EAIA,YAAA;CACA;AAEA;;EAEA,wCAAA;EACA,uBAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;;;;EAIA,gBAAA;CACA;AACA;;;;;EAKA,2BAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,0BAAA;EACA,iBAAA;EACA,eAAA;EACA,mBAAA;CACA;AACA;EACA,mBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,kBAAA;EACA,yBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;CACA;AACA;EACA,UAAA;CACA;AACA;EACA,WAAA;CACA","file":"Datepicker.vue","sourcesContent":["<template>\r\n  <div class=\"datepicker\">\r\n    <input class=\"form-control datepicker-input\" type=\"text\"\r\n      v-model=\"val\"\r\n      :class=\"{'with-reset-button': clearButton}\"\r\n      :placeholder=\"placeholder\"\r\n      :style=\"{width:width}\"\r\n      @click=\"inputClick\"\r\n    />\r\n    <button v-if=\"clearButton&&val\" type=\"button\" class=\"close\" @click=\"val = ''\">\r\n      <span>&times;</span>\r\n    </button>\r\n    <div class=\"datepicker-popup\" v-show=\"displayDayView\">\r\n      <div class=\"datepicker-inner\">\r\n        <div class=\"datepicker-body\">\r\n          <div class=\"datepicker-ctrl\">\r\n            <span :class=\"preBtnClasses\" aria-hidden=\"true\" @click=\"preNextMonthClick(0)\"></span>\r\n            <span :class=\"nextBtnClasses\" aria-hidden=\"true\" @click=\"preNextMonthClick(1)\"></span>\r\n            <p @click=\"switchMonthView\">{{stringifyDayHeader(currDate)}}</p>\r\n          </div>\r\n          <div class=\"datepicker-weekRange\">\r\n            <span v-for=\"w in text.daysOfWeek\">{{w}}</span>\r\n          </div>\r\n          <div class=\"datepicker-dateRange\">\r\n            <span v-for=\"d in dateRange\" :class=\"d.sclass\" @click=\"daySelect(d)\">{{d.text}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"datepicker-popup\" v-show=\"displayMonthView\">\r\n      <div class=\"datepicker-inner\">\r\n        <div class=\"datepicker-body\">\r\n          <div class=\"datepicker-ctrl\">\r\n            <span :class=\"preBtnClasses\" aria-hidden=\"true\" @click=\"preNextYearClick(0)\"></span>\r\n            <span :class=\"nextBtnClasses\" aria-hidden=\"true\" @click=\"preNextYearClick(1)\"></span>\r\n            <p @click=\"switchDecadeView\">{{stringifyYearHeader(currDate)}}</p>\r\n          </div>\r\n          <div class=\"datepicker-monthRange\">\r\n            <template v-for=\"(m, index) in text.months\">\r\n              <span v-text=\"m.substr(0,3)\"\r\n                :class=\"{'datepicker-dateRange-item-active':\r\n                  (text.months[parse(val).getMonth()] === m) &&\r\n                  currDate.getFullYear() === parse(val).getFullYear()}\"\r\n                @click=\"monthSelect(index)\"\r\n              ></span>\r\n            </template>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"datepicker-popup\" v-show=\"displayYearView\">\r\n      <div class=\"datepicker-inner\">\r\n        <div class=\"datepicker-body\">\r\n          <div class=\"datepicker-ctrl\">\r\n            <span :class=\"preBtnClasses\" aria-hidden=\"true\" @click=\"preNextDecadeClick(0)\"></span>\r\n            <span :class=\"nextBtnClasses\" aria-hidden=\"true\" @click=\"preNextDecadeClick(1)\"></span>\r\n            <p>{{stringifyDecadeHeader(currDate)}}</p>\r\n          </div>\r\n          <div class=\"datepicker-monthRange decadeRange\">\r\n            <template v-for=\"decade in decadeRange\">\r\n              <span :class=\"{'datepicker-dateRange-item-active':parse(val).getFullYear() === decade.text}\"\r\n                v-text=\"decade.text\"\r\n                @click.stop=\"yearSelect(decade.text)\"\r\n              ></span>\r\n            </template>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {translations} from './utils/utils.js'\r\n// import $ from './utils/NodeList.js'\r\n\r\nexport default {\r\n  props: {\r\n    value: {type: String},\r\n    format: {default: 'MM/dd/yyyy'},\r\n    disabledDaysOfWeek: {type: Array, default () { return [] }},\r\n    width: {type: String},\r\n    clearButton: {type: Boolean, default: false},\r\n    lang: {type: String, default: navigator.language},\r\n    placeholder: {type: String},\r\n    iconsFont: {type: String, default: 'glyphicon'}\r\n  },\r\n  data () {\r\n    return {\r\n      currDate: new Date(),\r\n      dateRange: [],\r\n      decadeRange: [],\r\n      displayDayView: false,\r\n      displayMonthView: false,\r\n      displayYearView: false,\r\n      val: this.value\r\n    }\r\n  },\r\n  watch: {\r\n    currDate () {\r\n      this.getDateRange()\r\n    },\r\n    format () {\r\n      this.val = this.stringify(this.currDate)\r\n    },\r\n    val (val, old) {\r\n      this.$emit('input', val)\r\n    },\r\n    value (val) {\r\n      if (this.val !== val) { this.val = val }\r\n    }\r\n  },\r\n  computed: {\r\n    text () {\r\n      return translations(this.lang)\r\n    },\r\n    preBtnClasses () {\r\n      return `datepicker-preBtn ${this.iconsFont} ${this.iconsFont}-chevron-left`\r\n    },\r\n    nextBtnClasses () {\r\n      return `datepicker-nextBtn ${this.iconsFont} ${this.iconsFont}-chevron-right`\r\n    },\r\n    disabledDaysArray () {\r\n      return this.disabledDaysOfWeek.map(d => parseInt(d, 10))\r\n    }\r\n  },\r\n  methods: {\r\n    close () {\r\n      this.displayDayView = this.displayMonthView = this.displayYearView = false\r\n    },\r\n    inputClick () {\r\n      this.currDate = this.parse(this.val) || this.parse(new Date())\r\n      if (this.displayMonthView || this.displayYearView) {\r\n        this.displayDayView = false\r\n      } else {\r\n        this.displayDayView = !this.displayDayView\r\n      }\r\n    },\r\n    preNextDecadeClick (flag) {\r\n      const year = this.currDate.getFullYear()\r\n      const months = this.currDate.getMonth()\r\n      const date = this.currDate.getDate()\r\n\r\n      if (flag === 0) {\r\n        this.currDate = new Date(year - 10, months, date)\r\n      } else {\r\n        this.currDate = new Date(year + 10, months, date)\r\n      }\r\n    },\r\n    preNextMonthClick (flag) {\r\n      const year = this.currDate.getFullYear()\r\n      const month = this.currDate.getMonth()\r\n      const date = this.currDate.getDate()\r\n\r\n      if (flag === 0) {\r\n        const preMonth = this.getYearMonth(year, month - 1)\r\n        this.currDate = new Date(preMonth.year, preMonth.month, date)\r\n      } else {\r\n        const nextMonth = this.getYearMonth(year, month + 1)\r\n        this.currDate = new Date(nextMonth.year, nextMonth.month, date)\r\n      }\r\n    },\r\n    preNextYearClick (flag) {\r\n      const year = this.currDate.getFullYear()\r\n      const months = this.currDate.getMonth()\r\n      const date = this.currDate.getDate()\r\n\r\n      if (flag === 0) {\r\n        this.currDate = new Date(year - 1, months, date)\r\n      } else {\r\n        this.currDate = new Date(year + 1, months, date)\r\n      }\r\n    },\r\n    yearSelect (year) {\r\n      this.displayYearView = false\r\n      this.displayMonthView = true\r\n      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())\r\n    },\r\n    daySelect (day) {\r\n      if (day.sclass === 'datepicker-item-disable') {\r\n        return false\r\n      } else {\r\n        this.currDate = day.date\r\n        this.val = this.stringify(this.currDate)\r\n        this.displayDayView = false\r\n      }\r\n    },\r\n    switchMonthView () {\r\n      this.displayDayView = false\r\n      this.displayMonthView = true\r\n    },\r\n    switchDecadeView () {\r\n      this.displayMonthView = false\r\n      this.displayYearView = true\r\n    },\r\n    monthSelect (index) {\r\n      this.displayMonthView = false\r\n      this.displayDayView = true\r\n      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())\r\n    },\r\n    getYearMonth (year, month) {\r\n      if (month > 11) {\r\n        year++\r\n        month = 0\r\n      } else if (month < 0) {\r\n        year--\r\n        month = 11\r\n      }\r\n      return {year: year, month: month}\r\n    },\r\n    stringifyDecadeHeader (date) {\r\n      const yearStr = date.getFullYear().toString()\r\n      const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0\r\n      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10\r\n      return firstYearOfDecade + '-' + lastYearOfDecade\r\n    },\r\n    stringifyDayHeader (date) {\r\n      return this.text.months[date.getMonth()] + ' ' + date.getFullYear()\r\n    },\r\n    parseMonth (date) {\r\n      return this.text.months[date.getMonth()]\r\n    },\r\n    stringifyYearHeader (date) {\r\n      return date.getFullYear()\r\n    },\r\n    stringify (date, format = this.format) {\r\n      if (!date) date = this.parse()\r\n      if (!date) return ''\r\n      const year = date.getFullYear()\r\n      const month = date.getMonth() + 1\r\n      const day = date.getDate()\r\n      const monthName = this.parseMonth(date)\r\n      return format\r\n        .replace(/yyyy/g, year)\r\n        .replace(/yy/g, year)\r\n        .replace(/MMMM/g, monthName)\r\n        .replace(/MMM/g, monthName.substring(0, 3))\r\n        .replace(/MM/g, ('0' + month).slice(-2))\r\n        .replace(/M(?!a)/g, month)\r\n        .replace(/dd/g, ('0' + day).slice(-2))\r\n        .replace(/d/g, day)\r\n    },\r\n    parse (str) {\r\n      if (str === undefined || str === null) { str = this.val }\r\n      let date = str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy') ?\r\n        new Date(str.substring(6, 10), str.substring(3, 5)-1, str.substring(0, 2)) :\r\n        new Date(str)\r\n      return isNaN(date.getFullYear()) ? new Date() : date\r\n    },\r\n    getDayCount (year, month) {\r\n      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]\r\n      if (month === 1) {\r\n        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {\r\n          return 29\r\n        }\r\n      }\r\n      return dict[month]\r\n    },\r\n    getDateRange () {\r\n      this.dateRange = []\r\n      this.decadeRange = []\r\n      const time = {\r\n        year: this.currDate.getFullYear(),\r\n        month: this.currDate.getMonth(),\r\n        day: this.currDate.getDate()\r\n      }\r\n      const yearStr = time.year.toString()\r\n      const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1\r\n      for (let i = 0; i < 12; i++) {\r\n        this.decadeRange.push({\r\n          text: firstYearOfDecade + i\r\n        })\r\n      }\r\n\r\n      const currMonthFirstDay = new Date(time.year, time.month, 1)\r\n      let firstDayWeek = currMonthFirstDay.getDay() + 1\r\n      if (firstDayWeek === 0) {\r\n        firstDayWeek = 7\r\n      }\r\n      const dayCount = this.getDayCount(time.year, time.month)\r\n      if (firstDayWeek > 1) {\r\n        const preMonth = this.getYearMonth(time.year, time.month - 1)\r\n        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)\r\n        for (let i = 1; i < firstDayWeek; i++) {\r\n          const dayText = prevMonthDayCount - firstDayWeek + i + 1\r\n          const date = new Date(preMonth.year, preMonth.month, dayText)\r\n          let sclass = 'datepicker-item-gray'\r\n          if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {\r\n            sclass = 'datepicker-item-disable'\r\n          }\r\n          this.dateRange.push({text: dayText, date, sclass })\r\n        }\r\n      }\r\n\r\n      for (let i = 1; i <= dayCount; i++) {\r\n        const date = new Date(time.year, time.month, i)\r\n        let sclass = ''\r\n        if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {\r\n          sclass = 'datepicker-item-disable'\r\n        }\r\n        if (i == time.day && date.getFullYear() == time.year && date.getMonth() == time.month){\r\n          sclass = 'datepicker-dateRange-item-active'\r\n        }\r\n        this.dateRange.push({text: i, date, sclass})\r\n      }\r\n\r\n      if (this.dateRange.length < 42) {\r\n        const nextMonthNeed = 42 - this.dateRange.length\r\n        const nextMonth = this.getYearMonth(time.year, time.month + 1)\r\n\r\n        for (let i = 1; i <= nextMonthNeed; i++) {\r\n          const date = new Date(nextMonth.year, nextMonth.month, i)\r\n          let sclass = 'datepicker-item-gray'\r\n          if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {\r\n            sclass = 'datepicker-item-disable'\r\n          }\r\n          this.dateRange.push({text: i, date, sclass})\r\n        }\r\n      }\r\n    }\r\n  },\r\n  mounted () {\r\n    this.$emit('child-created', this)\r\n    this.currDate = this.parse(this.val) || this.parse(new Date())\r\n    this._blur = e => {\r\n      if (!this.$el.contains(e.target))\r\n        this.close()\r\n    }\r\n    window.addEventListener('click', this._blur);\r\n  },\r\n  beforeDestroy () {\r\n    window.removeEventListener('click', this._blur)\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.datepicker {\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\ninput.datepicker-input.with-reset-button {\r\n  padding-right: 25px;\r\n}\r\n.datepicker > button.close {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  outline: none;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n.datepicker > button.close:focus {\r\n  opacity: .2;\r\n}\r\n.datepicker-popup {\r\n  position: absolute;\r\n  border: 1px solid #ccc;\r\n  border-radius: 5px;\r\n  background: #fff;\r\n  margin-top: 2px;\r\n  z-index: 1000;\r\n  box-shadow: 0 6px 12px rgba(0,0,0,0.175);\r\n}\r\n.datepicker-inner {\r\n  width: 218px;\r\n}\r\n.datepicker-body {\r\n  padding: 10px 10px;\r\n}\r\n.datepicker-ctrl p,\r\n.datepicker-ctrl span,\r\n.datepicker-body span {\r\n  display: inline-block;\r\n  width: 28px;\r\n  line-height: 28px;\r\n  height: 28px;\r\n  border-radius: 4px;\r\n}\r\n.datepicker-ctrl p {\r\n  width: 65%;\r\n}\r\n.datepicker-ctrl span {\r\n  position: absolute;\r\n}\r\n.datepicker-body span {\r\n  text-align: center;\r\n}\r\n.datepicker-monthRange span {\r\n  width: 48px;\r\n  height: 50px;\r\n  line-height: 45px;\r\n}\r\n.datepicker-item-disable {\r\n  background-color: white!important;\r\n  cursor: not-allowed!important;\r\n}\r\n.decadeRange span:first-child,\r\n.decadeRange span:last-child,\r\n.datepicker-item-disable,\r\n.datepicker-item-gray {\r\n  color: #999;\r\n}\r\n\r\n.datepicker-dateRange-item-active:hover,\r\n.datepicker-dateRange-item-active {\r\n  background: rgb(50, 118, 177)!important;\r\n  color: white!important;\r\n}\r\n.datepicker-monthRange {\r\n  margin-top: 10px\r\n}\r\n.datepicker-monthRange span,\r\n.datepicker-ctrl span,\r\n.datepicker-ctrl p,\r\n.datepicker-dateRange span {\r\n  cursor: pointer;\r\n}\r\n.datepicker-monthRange span:hover,\r\n.datepicker-ctrl p:hover,\r\n.datepicker-ctrl i:hover,\r\n.datepicker-dateRange span:hover,\r\n.datepicker-dateRange-item-hover {\r\n  background-color : #eeeeee;\r\n}\r\n.datepicker-weekRange span {\r\n  font-weight: bold;\r\n}\r\n.datepicker-label {\r\n  background-color: #f8f8f8;\r\n  font-weight: 700;\r\n  padding: 7px 0;\r\n  text-align: center;\r\n}\r\n.datepicker-ctrl {\r\n  position: relative;\r\n  height: 30px;\r\n  line-height: 30px;\r\n  font-weight: bold;\r\n  text-align: center;\r\n}\r\n.month-btn {\r\n  font-weight: bold;\r\n  -webkit-user-select:none;\r\n  -moz-user-select:none;\r\n  -ms-user-select:none;\r\n  user-select:none;\r\n}\r\n.datepicker-preBtn {\r\n  left: 2px;\r\n}\r\n.datepicker-nextBtn {\r\n  right: 2px;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	// import $ from './utils/NodeList.js'
	
	exports["default"] = {
	  props: {
	    value: { type: String },
	    format: { "default": 'MM/dd/yyyy' },
	    disabledDaysOfWeek: { type: Array, "default": function _default() {
	        return [];
	      }
	    },
	    width: { type: String },
	    clearButton: { type: Boolean, "default": false },
	    lang: { type: String, "default": navigator.language },
	    placeholder: { type: String },
	    iconsFont: { type: String, "default": 'glyphicon' }
	  },
	  data: function data() {
	    return {
	      currDate: new Date(),
	      dateRange: [],
	      decadeRange: [],
	      displayDayView: false,
	      displayMonthView: false,
	      displayYearView: false,
	      val: this.value
	    };
	  },
	
	  watch: {
	    currDate: function currDate() {
	      this.getDateRange();
	    },
	    format: function format() {
	      this.val = this.stringify(this.currDate);
	    },
	    val: function val(_val, old) {
	      this.$emit('input', _val);
	    },
	    value: function value(val) {
	      if (this.val !== val) {
	        this.val = val;
	      }
	    }
	  },
	  computed: {
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    },
	    preBtnClasses: function preBtnClasses() {
	      return 'datepicker-preBtn ' + this.iconsFont + ' ' + this.iconsFont + '-chevron-left';
	    },
	    nextBtnClasses: function nextBtnClasses() {
	      return 'datepicker-nextBtn ' + this.iconsFont + ' ' + this.iconsFont + '-chevron-right';
	    },
	    disabledDaysArray: function disabledDaysArray() {
	      return this.disabledDaysOfWeek.map(function (d) {
	        return parseInt(d, 10);
	      });
	    }
	  },
	  methods: {
	    close: function close() {
	      this.displayDayView = this.displayMonthView = this.displayYearView = false;
	    },
	    inputClick: function inputClick() {
	      this.currDate = this.parse(this.val) || this.parse(new Date());
	      if (this.displayMonthView || this.displayYearView) {
	        this.displayDayView = false;
	      } else {
	        this.displayDayView = !this.displayDayView;
	      }
	    },
	    preNextDecadeClick: function preNextDecadeClick(flag) {
	      var year = this.currDate.getFullYear();
	      var months = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        this.currDate = new Date(year - 10, months, date);
	      } else {
	        this.currDate = new Date(year + 10, months, date);
	      }
	    },
	    preNextMonthClick: function preNextMonthClick(flag) {
	      var year = this.currDate.getFullYear();
	      var month = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        var preMonth = this.getYearMonth(year, month - 1);
	        this.currDate = new Date(preMonth.year, preMonth.month, date);
	      } else {
	        var nextMonth = this.getYearMonth(year, month + 1);
	        this.currDate = new Date(nextMonth.year, nextMonth.month, date);
	      }
	    },
	    preNextYearClick: function preNextYearClick(flag) {
	      var year = this.currDate.getFullYear();
	      var months = this.currDate.getMonth();
	      var date = this.currDate.getDate();
	
	      if (flag === 0) {
	        this.currDate = new Date(year - 1, months, date);
	      } else {
	        this.currDate = new Date(year + 1, months, date);
	      }
	    },
	    yearSelect: function yearSelect(year) {
	      this.displayYearView = false;
	      this.displayMonthView = true;
	      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate());
	    },
	    daySelect: function daySelect(day) {
	      if (day.sclass === 'datepicker-item-disable') {
	        return false;
	      } else {
	        this.currDate = day.date;
	        this.val = this.stringify(this.currDate);
	        this.displayDayView = false;
	      }
	    },
	    switchMonthView: function switchMonthView() {
	      this.displayDayView = false;
	      this.displayMonthView = true;
	    },
	    switchDecadeView: function switchDecadeView() {
	      this.displayMonthView = false;
	      this.displayYearView = true;
	    },
	    monthSelect: function monthSelect(index) {
	      this.displayMonthView = false;
	      this.displayDayView = true;
	      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate());
	    },
	    getYearMonth: function getYearMonth(year, month) {
	      if (month > 11) {
	        year++;
	        month = 0;
	      } else if (month < 0) {
	        year--;
	        month = 11;
	      }
	      return { year: year, month: month };
	    },
	    stringifyDecadeHeader: function stringifyDecadeHeader(date) {
	      var yearStr = date.getFullYear().toString();
	      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0;
	      var lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10;
	      return firstYearOfDecade + '-' + lastYearOfDecade;
	    },
	    stringifyDayHeader: function stringifyDayHeader(date) {
	      return this.text.months[date.getMonth()] + ' ' + date.getFullYear();
	    },
	    parseMonth: function parseMonth(date) {
	      return this.text.months[date.getMonth()];
	    },
	    stringifyYearHeader: function stringifyYearHeader(date) {
	      return date.getFullYear();
	    },
	    stringify: function stringify(date) {
	      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.format;
	
	      if (!date) date = this.parse();
	      if (!date) return '';
	      var year = date.getFullYear();
	      var month = date.getMonth() + 1;
	      var day = date.getDate();
	      var monthName = this.parseMonth(date);
	      return format.replace(/yyyy/g, year).replace(/yy/g, year).replace(/MMMM/g, monthName).replace(/MMM/g, monthName.substring(0, 3)).replace(/MM/g, ('0' + month).slice(-2)).replace(/M(?!a)/g, month).replace(/dd/g, ('0' + day).slice(-2)).replace(/d/g, day);
	    },
	    parse: function parse(str) {
	      if (str === undefined || str === null) {
	        str = this.val;
	      }
	      var date = str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy') ? new Date(str.substring(6, 10), str.substring(3, 5) - 1, str.substring(0, 2)) : new Date(str);
	      return isNaN(date.getFullYear()) ? new Date() : date;
	    },
	    getDayCount: function getDayCount(year, month) {
	      var dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	      if (month === 1) {
	        if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
	          return 29;
	        }
	      }
	      return dict[month];
	    },
	    getDateRange: function getDateRange() {
	      this.dateRange = [];
	      this.decadeRange = [];
	      var time = {
	        year: this.currDate.getFullYear(),
	        month: this.currDate.getMonth(),
	        day: this.currDate.getDate()
	      };
	      var yearStr = time.year.toString();
	      var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0 - 1;
	      for (var i = 0; i < 12; i++) {
	        this.decadeRange.push({
	          text: firstYearOfDecade + i
	        });
	      }
	
	      var currMonthFirstDay = new Date(time.year, time.month, 1);
	      var firstDayWeek = currMonthFirstDay.getDay() + 1;
	      if (firstDayWeek === 0) {
	        firstDayWeek = 7;
	      }
	      var dayCount = this.getDayCount(time.year, time.month);
	      if (firstDayWeek > 1) {
	        var preMonth = this.getYearMonth(time.year, time.month - 1);
	        var prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
	        for (var _i = 1; _i < firstDayWeek; _i++) {
	          var dayText = prevMonthDayCount - firstDayWeek + _i + 1;
	          var date = new Date(preMonth.year, preMonth.month, dayText);
	          var sclass = 'datepicker-item-gray';
	          if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {
	            sclass = 'datepicker-item-disable';
	          }
	          this.dateRange.push({ text: dayText, date: date, sclass: sclass });
	        }
	      }
	
	      for (var _i2 = 1; _i2 <= dayCount; _i2++) {
	        var _date = new Date(time.year, time.month, _i2);
	        var _sclass = '';
	        if (this.disabledDaysArray.indexOf(_date.getDay()) > -1) {
	          _sclass = 'datepicker-item-disable';
	        }
	        if (_i2 == time.day && _date.getFullYear() == time.year && _date.getMonth() == time.month) {
	          _sclass = 'datepicker-dateRange-item-active';
	        }
	        this.dateRange.push({ text: _i2, date: _date, sclass: _sclass });
	      }
	
	      if (this.dateRange.length < 42) {
	        var nextMonthNeed = 42 - this.dateRange.length;
	        var nextMonth = this.getYearMonth(time.year, time.month + 1);
	
	        for (var _i3 = 1; _i3 <= nextMonthNeed; _i3++) {
	          var _date2 = new Date(nextMonth.year, nextMonth.month, _i3);
	          var _sclass2 = 'datepicker-item-gray';
	          if (this.disabledDaysArray.indexOf(_date2.getDay()) > -1) {
	            _sclass2 = 'datepicker-item-disable';
	          }
	          this.dateRange.push({ text: _i3, date: _date2, sclass: _sclass2 });
	        }
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.$emit('child-created', this);
	    this.currDate = this.parse(this.val) || this.parse(new Date());
	    this._blur = function (e) {
	      if (!_this.$el.contains(e.target)) _this.close();
	    };
	    window.addEventListener('click', this._blur);
	  },
	  beforeDestroy: function beforeDestroy() {
	    window.removeEventListener('click', this._blur);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "datepicker"
	  }, [_vm._c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    staticClass: "form-control datepicker-input",
	    "class": {
	      'with-reset-button': _vm.clearButton
	    },
	    style: ({
	      width: _vm.width
	    }),
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.placeholder
	    },
	    domProps: {
	      "value": _vm._s(_vm.val)
	    },
	    on: {
	      "click": _vm.inputClick,
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.val = $event.target.value
	      }
	    }
	  }), _vm._v(" "), (_vm.clearButton && _vm.val) ? _vm._c('button', {
	    staticClass: "close",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.val = ''
	      }
	    }
	  }, [_vm._c('span', [_vm._v("×")])]) : _vm._e(), _vm._v(" "), _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.displayDayView),
	      expression: "displayDayView"
	    }],
	    staticClass: "datepicker-popup"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-inner"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-body"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-ctrl"
	  }, [_vm._c('span', {
	    "class": _vm.preBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextMonthClick(0)
	      }
	    }
	  }), _vm._v(" "), _vm._c('span', {
	    "class": _vm.nextBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextMonthClick(1)
	      }
	    }
	  }), _vm._v(" "), _vm._c('p', {
	    on: {
	      "click": _vm.switchMonthView
	    }
	  }, [_vm._v(_vm._s(_vm.stringifyDayHeader(_vm.currDate)))])]), _vm._v(" "), _vm._c('div', {
	    staticClass: "datepicker-weekRange"
	  }, _vm._l((_vm.text.daysOfWeek), function(w) {
	    return _vm._c('span', [_vm._v(_vm._s(w))])
	  })), _vm._v(" "), _vm._c('div', {
	    staticClass: "datepicker-dateRange"
	  }, _vm._l((_vm.dateRange), function(d) {
	    return _vm._c('span', {
	      "class": d.sclass,
	      on: {
	        "click": function($event) {
	          _vm.daySelect(d)
	        }
	      }
	    }, [_vm._v(_vm._s(d.text))])
	  }))])])]), _vm._v(" "), _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.displayMonthView),
	      expression: "displayMonthView"
	    }],
	    staticClass: "datepicker-popup"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-inner"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-body"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-ctrl"
	  }, [_vm._c('span', {
	    "class": _vm.preBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextYearClick(0)
	      }
	    }
	  }), _vm._v(" "), _vm._c('span', {
	    "class": _vm.nextBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextYearClick(1)
	      }
	    }
	  }), _vm._v(" "), _vm._c('p', {
	    on: {
	      "click": _vm.switchDecadeView
	    }
	  }, [_vm._v(_vm._s(_vm.stringifyYearHeader(_vm.currDate)))])]), _vm._v(" "), _vm._c('div', {
	    staticClass: "datepicker-monthRange"
	  }, [_vm._l((_vm.text.months), function(m, index) {
	    return [_vm._c('span', {
	      "class": {
	        'datepicker-dateRange-item-active':
	        (_vm.text.months[_vm.parse(_vm.val).getMonth()] === m) &&
	        _vm.currDate.getFullYear() === _vm.parse(_vm.val).getFullYear()
	      },
	      domProps: {
	        "textContent": _vm._s(m.substr(0, 3))
	      },
	      on: {
	        "click": function($event) {
	          _vm.monthSelect(index)
	        }
	      }
	    })]
	  })], 2)])])]), _vm._v(" "), _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.displayYearView),
	      expression: "displayYearView"
	    }],
	    staticClass: "datepicker-popup"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-inner"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-body"
	  }, [_vm._c('div', {
	    staticClass: "datepicker-ctrl"
	  }, [_vm._c('span', {
	    "class": _vm.preBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextDecadeClick(0)
	      }
	    }
	  }), _vm._v(" "), _vm._c('span', {
	    "class": _vm.nextBtnClasses,
	    attrs: {
	      "aria-hidden": "true"
	    },
	    on: {
	      "click": function($event) {
	        _vm.preNextDecadeClick(1)
	      }
	    }
	  }), _vm._v(" "), _vm._c('p', [_vm._v(_vm._s(_vm.stringifyDecadeHeader(_vm.currDate)))])]), _vm._v(" "), _vm._c('div', {
	    staticClass: "datepicker-monthRange decadeRange"
	  }, [_vm._l((_vm.decadeRange), function(decade) {
	    return [_vm._c('span', {
	      "class": {
	        'datepicker-dateRange-item-active': _vm.parse(_vm.val).getFullYear() === decade.text
	      },
	      domProps: {
	        "textContent": _vm._s(decade.text)
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.yearSelect(decade.text)
	        }
	      }
	    })]
	  })], 2)])])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-477b8e5d", module.exports)
	  }
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(106)
	
	/* template */
	var __vue_template__ = __webpack_require__(107)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Dropdown.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-39be1072", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-39be1072", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Dropdown.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	var _ClickOutside = __webpack_require__(66);
	
	var _ClickOutside2 = _interopRequireDefault(_ClickOutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  directives: {
	    ClickOutside: _ClickOutside2["default"]
	  },
	  props: {
	    disabled: { type: Boolean, "default": false },
	    size: { type: String, "default": null },
	    text: { type: String, "default": null },
	    type: { type: String, "default": 'default' },
	    value: { type: Boolean, "default": false }
	  },
	  data: function data() {
	    var show = this.value;
	    return { show: show };
	  },
	
	  watch: {
	    show: function show(val) {
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.show = val;
	    }
	  },
	  computed: {
	    buttonSize: function buttonSize() {
	      return ~['lg', 'sm', 'xs'].indexOf(this.size) ? 'btn-' + this.size : '';
	    },
	    inInput: function inInput() {
	      return this.$parent._input;
	    },
	    isLi: function isLi() {
	      return this.$parent._isTabs || this.$parent._navbar || this.$parent.menu;
	    },
	    menu: function menu() {
	      return !this.$parent || this.$parent.navbar;
	    },
	    slots: function slots() {
	      return this._slotContents;
	    },
	    submenu: function submenu() {
	      return this.$parent && (this.$parent.menu || this.$parent.submenu);
	    }
	  },
	  methods: {
	    blur: function blur() {
	      this.show = false;
	    },
	    toggle: function toggle() {
	      if (!this.disabled) {
	        this.show = !this.show;
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    (0, _NodeList2["default"])('ul', this.$el).on('click', 'li>a', function (e) {
	      _this.show = false;
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _NodeList2["default"])('ul', this.$el).off();
	  }
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c(_vm.isLi ? 'li' : 'div', {
	    directives: [{
	      name: "click-outside",
	      rawName: "v-click-outside",
	      value: (_vm.blur),
	      expression: "blur"
	    }],
	    tag: "div",
	    "class": [{
	      open: _vm.show,
	      disabled: _vm.disabled,
	      dropdown: _vm.isLi,
	      'input-group-btn': _vm.inInput,
	      'btn-group': !_vm.isLi && !_vm.inInput
	    }]
	  }, [_vm._t("before"), _vm._v(" "), (_vm.isLi) ? _vm._c('a', {
	    "class": ['dropdown-toggle', _vm.buttonSize, {
	      disabled: _vm.disabled
	    }],
	    attrs: {
	      "role": "button"
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.show = false
	      },
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.toggle($event)
	      }
	    }
	  }, [_vm._t("button", [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _vm._c('span', {
	    staticClass: "caret"
	  })], 2) : _vm._c('button', {
	    "class": ['btn btn-' + _vm.type, _vm.buttonSize, 'dropdown-toggle'],
	    attrs: {
	      "type": "button",
	      "disabled": _vm.disabled
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.show = false
	      },
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.toggle($event)
	      }
	    }
	  }, [_vm._t("button", [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _vm._c('span', {
	    staticClass: "caret"
	  })], 2), _vm._v(" "), _vm._t("dropdown-menu", [_vm._c('ul', {
	    staticClass: "dropdown-menu"
	  }, [_vm._t("default")], 2)])], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-39be1072", module.exports)
	  }
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(109)
	
	/* template */
	var __vue_template__ = __webpack_require__(110)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\FormGroup.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-79eb400a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-79eb400a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormGroup.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// let coerce = {
	//     enterSubmit: 'boolean',
	//     icon: 'boolean'
	// }
	
	exports["default"] = {
	  props: {
	    enterSubmit: {
	      type: Boolean,
	      "default": false
	    },
	    icon: {
	      type: Boolean,
	      "default": false
	    },
	    lang: {
	      type: String,
	      "default": navigator.language
	    }
	  },
	  data: function data() {
	    return {
	      children: [],
	      valid: null,
	      timeout: null
	    };
	  },
	
	  watch: {
	    valid: function valid(val, old) {
	      this.$emit('isvalid', val);
	      this.$emit(!val ? 'invalid' : 'valid');
	      if (val !== old && this._parent) this._parent.validate();
	    }
	  },
	  methods: {
	    validate: function validate() {
	      var valid = true;
	      this.children.some(function (el) {
	        var v = el.validate ? el.validate() : el.valid !== undefined ? el.valid : el.required && !~['', null, undefined].indexOf(el.value);
	        if (!v) valid = false;
	        return !valid;
	      });
	      this.valid = valid;
	      return valid === true;
	    }
	  },
	  created: function created() {
	    this._formGroup = true;
	    var parent = this.$parent;
	    while (parent && !parent._formGroup) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formGroup) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	  },
	  mounted: function mounted() {
	    this.validate();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._parent) {
	      var index = this._parent.children.indexOf(this);
	      this._parent.children.splice(index, 1);
	    }
	  }
	}; //
	//

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('span', [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-79eb400a", module.exports)
	  }
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(112)
	
	/* template */
	var __vue_template__ = __webpack_require__(113)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\FormValidator.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b9f57c46", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b9f57c46", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormValidator.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  props: {
	    enterSubmit: { type: Boolean, "default": false },
	    icon: { type: Boolean, "default": false },
	    lang: { type: String, "default": navigator.language },
	    value: null
	  },
	  data: function data() {
	    return {
	      children: [],
	      valid: null,
	      timeout: null
	    };
	  },
	
	  watch: {
	    valid: function valid(val, old) {
	      this.$emit('isvalid', val);
	      this.$emit('input', val);
	      this.$emit(!val ? 'invalid' : 'valid');
	      if (val !== old && this._parent) this._parent.validate();
	    }
	  },
	  methods: {
	    validate: function validate() {
	      var invalid = !this.children.every(function (el) {
	        return el.validate ? el.validate() : el.valid !== undefined ? el.valid : el.required && !~['', null, undefined].indexOf(el.value);
	      });
	      this.valid = !invalid;
	      return !invalid;
	    }
	  },
	  created: function created() {
	    this._formValidator = true;
	    var parent = this.$parent;
	    while (parent && !parent._formValidator) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formValidator) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	  },
	  mounted: function mounted() {
	    this.validate();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._parent) {
	      var index = this._parent.children.indexOf(this);
	      this._parent.children.splice(index, 1);
	    }
	  }
	}; //
	//

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('span', [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b9f57c46", module.exports)
	  }
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(115)
	
	/* script */
	__vue_exports__ = __webpack_require__(117)
	
	/* template */
	var __vue_template__ = __webpack_require__(118)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Input.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-652ad7b9"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-652ad7b9", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-652ad7b9", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Input.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-652ad7b9&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Input.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-652ad7b9&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Input.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.form-group[data-v-652ad7b9] {\r\n  position: relative;\n}\nlabel~.close[data-v-652ad7b9] {\r\n  top: 25px;\n}\n.input-group>.icon[data-v-652ad7b9] {\r\n  position: relative;\r\n  display: table-cell;\r\n  width:0;\r\n  z-index: 3;\n}\n.close[data-v-652ad7b9] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\n}\n.has-feedback .close[data-v-652ad7b9] {\r\n  right: 20px;\n}\r\n", "", {"version":3,"sources":["/./src/Input.vue?56ce169d"],"names":[],"mappings":";AA0QA;EACA,mBAAA;CACA;AACA;EACA,UAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,QAAA;EACA,WAAA;CACA;AACA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;CACA","file":"Input.vue","sourcesContent":["<template>\r\n  <div class=\"form-group\" :class=\"{validate:canValidate,'has-feedback':icon,'has-error':canValidate&&valid===false,'has-success':canValidate&&valid}\">\r\n    <slot name=\"label\"><label v-if=\"label\" class=\"control-label\" @click=\"focus\">{{label}}</label></slot>\r\n    <div v-if=\"$slots.before||$slots.after\" class=\"input-group\">\r\n      <slot name=\"before\"></slot>\r\n      <textarea :is=\"type=='textarea'?type:'input'\" class=\"form-control\" ref=\"input\"\r\n        :cols=\"cols\"\r\n        :disabled=\"disabled\"\r\n        :list=\"id_datalist\"\r\n        :max=\"attr(max)\"\r\n        :maxlength=\"maxlength\"\r\n        :min=\"attr(min)\"\r\n        :name=\"name\"\r\n        :placeholder=\"placeholder\"\r\n        :readonly=\"readonly\"\r\n        :required=\"required\"\r\n        :rows=\"rows\"\r\n        :step=\"step\"\r\n        :title=\"attr(title)\"\r\n        :type=\"type=='textarea'?null:type\"\r\n        v-model=\"val\"\r\n        @blur=\"emit\" @focus=\"emit\" @input=\"emit\"\r\n        @keyup.enter=\"type!='textarea'&&enterSubmit&&submit()\"\r\n      ></textarea>\r\n      <div v-if=\"clearButton && value\" :class=\"{icon:icon}\">\r\n        <span class=\"close\" @click=\"value = ''\">&times;</span>\r\n      </div>\r\n      <div v-if=\"icon\" class=\"icon\">\r\n        <span v-if=\"icon&&valid!==null\" :class=\"['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]\" aria-hidden=\"true\"></span>\r\n      </div>\r\n      <slot name=\"after\"></slot>\r\n    </div>\r\n    <template v-else>\r\n      <textarea :is=\"type=='textarea'?type:'input'\" class=\"form-control\" ref=\"input\"\r\n        :cols=\"cols\"\r\n        :disabled=\"disabled\"\r\n        :list=\"id_datalist\"\r\n        :max=\"attr(max)\"\r\n        :maxlength=\"maxlength\"\r\n        :min=\"attr(min)\"\r\n        :name=\"name\"\r\n        :placeholder=\"placeholder\"\r\n        :readonly=\"readonly\"\r\n        :required=\"required\"\r\n        :rows=\"rows\"\r\n        :step=\"step\"\r\n        :title=\"attr(title)\"\r\n        :type=\"type=='textarea'?null:type\"\r\n        v-model=\"val\"\r\n        @blur=\"emit\" @focus=\"emit\" @input=\"emit\"\r\n        @keyup.enter=\"type!='textarea'&&enterSubmit&&submit()\"\r\n      ></textarea>\r\n      <span v-if=\"clearButton && val\" class=\"close\" @click=\"val = ''\">&times;</span>\r\n      <span v-if=\"icon&&valid!==null\" :class=\"['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]\" aria-hidden=\"true\"></span>\r\n    </template>\r\n    <datalist v-if=\"id_datalist\" :id=\"id_datalist\">\r\n      <option v-for=\"opc in options\" :value=\"opc\"></option>\r\n    </datalist>\r\n    <div v-if=\"showHelp\" class=\"help-block\" @click=\"focus\">{{help}}</div>\r\n    <div v-if=\"showError\" class=\"help-block with-errors\" @click=\"focus\">{{errorText}}</div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {coerce, delayer, translations} from './utils/utils.js'\r\nimport $ from './utils/NodeList.js'\r\n\r\nvar DELAY = 300\r\n\r\nexport default {\r\n  props: {\r\n    clearButton: {type: Boolean, default: false},\r\n    cols: {type: Number, default: null},\r\n    datalist: {type: Array, default: null},\r\n    disabled: {type: Boolean, default: false},\r\n    enterSubmit: {type: Boolean, default: false},\r\n    error: {type: String, default: null},\r\n    help: {type: String, default: null},\r\n    hideHelp: {type: Boolean, default: true},\r\n    icon: {type: Boolean, default: false},\r\n    label: {type: String, default: null},\r\n    lang: {type: String, default: navigator.language},\r\n    mask: null,\r\n    maskDelay: {type: Number, default: 100},\r\n    match: {type: String, default: null},\r\n    max: {type: String, default: null},\r\n    maxlength: {type: Number, default: null},\r\n    min: {type: String, default: null},\r\n    minlength: {type: Number, default: 0},\r\n    name: {type: String, default: null},\r\n    pattern: {default: null},\r\n    placeholder: {type: String, default: null},\r\n    readonly: {type: Boolean, default: false},\r\n    required: {type: Boolean, default: false},\r\n    rows: {type: Number, default: 3},\r\n    step: {type: Number, default: null},\r\n    type: {type: String, default: 'text'},\r\n    url: {type: String, default: null},\r\n    urlMap: {type: Function, default: null},\r\n    validationDelay: {type: Number, default: 250},\r\n    value: {default: null}\r\n  },\r\n  data () {\r\n    var val = this.value\r\n    return {\r\n      options: this.datalist,\r\n      val,\r\n      valid: null,\r\n      timeout: null\r\n    }\r\n  },\r\n  computed: {\r\n    canValidate () { return !this.disabled && !this.readonly && (this.required || this.regex || this.nativeValidate || this.match !== null) },\r\n    errorText () {\r\n      let value = this.value\r\n      let error = [this.error]\r\n      if (!value && this.required) error.push('(' + this.text.required.toLowerCase() + ')')\r\n      if (value && (value.length < this.minlength)) error.push('(' + this.text.minLength.toLowerCase() + ': ' + this.minlength + ')')\r\n      return error.join(' ')\r\n    },\r\n    id_datalist () {\r\n      if (this.type !== 'textarea' && this.datalist instanceof Array) {\r\n        if (!this._id_datalist) {\r\n          if (!this.$root.id_datalist) { this.$root.id_datalist = 0 }\r\n          this._id_datalist = 'input-datalist' + this.$root.id_datalist++\r\n        }\r\n        return this._id_datalist\r\n      }\r\n      return null\r\n    },\r\n    input () { return this.$refs.input },\r\n    nativeValidate () { return (this.input || {}).checkValidity && (~['url', 'email'].indexOf(this.type.toLowerCase()) || this.min || this.max) },\r\n    regex () { return coerce.pattern(this.pattern) },\r\n    showError () { return this.error && this.valid === false },\r\n    showHelp () { return this.help && (!this.showError || !this.hideHelp) },\r\n    text () { return translations(this.lang) },\r\n    title () { return this.errorText || this.help || '' }\r\n  },\r\n  watch: {\r\n    datalist (val, old) {\r\n      if (val !== old && val instanceof Array) { this.options = val }\r\n    },\r\n    match (val) { this.eval() },\r\n    options (val, old) {\r\n      if (val !== old) this.$emit('options', val)\r\n    },\r\n    url (val) {\r\n      this._url()\r\n    },\r\n    val (val, old) {\r\n      this.$emit('input', val)\r\n      if (val !== old) {\r\n        if (this.mask instanceof Function) {\r\n          val = this.mask(val || '')\r\n          if (this.val !== val) {\r\n            if (this._timeout.mask) clearTimeout(this._timeout.mask)\r\n            this._timeout.mask = setTimeout(() => {\r\n              this.val = val\r\n            }, isNaN(this.maskDelay) ? 0 : this.maskDelay)\r\n          }\r\n        }\r\n        this.eval()\r\n      }\r\n    },\r\n    valid (val, old) {\r\n      this.$emit('isvalid', val)\r\n      this.$emit(!val ? 'invalid' : 'valid')\r\n      if (this._parent) this._parent.validate()\r\n    },\r\n    value (val) {\r\n      if (this.val !== val) { this.val = val }\r\n    }\r\n  },\r\n  methods: {\r\n    attr (value) {\r\n      return ~['', null, undefined].indexOf(value) || value instanceof Function ? null : value\r\n    },\r\n    emit (e) {\r\n      this.$emit(e.type, e.type == 'input' ? e.target.value : e)\r\n      if (e.type === 'blur' && this.canValidate) { this.valid = this.validate() }\r\n    },\r\n    eval () {\r\n      if (this._timeout.eval) clearTimeout(this._timeout.eval)\r\n      if (!this.canValidate) {\r\n        this.valid = true\r\n      } else {\r\n        this._timeout.eval = setTimeout(() => {\r\n          this.valid = this.validate()\r\n          this._timeout.eval = null\r\n        }, this.validationDelay)\r\n      }\r\n    },\r\n    focus () { this.input.focus() },\r\n    submit () {\r\n      if (this.$parent._formValidator) {\r\n        return this.$parent.validate()\r\n      }\r\n      if (this.input.form) {\r\n        const invalids = $('.form-group.validate:not(.has-success)', this.input.form)\r\n        if (invalids.length) {\r\n          invalids.find('input,textarea,select')[0].focus()\r\n        } else {\r\n          this.input.form.submit()\r\n        }\r\n      }\r\n    },\r\n    validate () {\r\n      if (!this.canValidate) { return true }\r\n      let value = (this.val || '').trim()\r\n      if (!value) { return !this.required }\r\n      if (this.match !== null) { return this.match === value }\r\n      if (value.length < this.minlength) { return false }\r\n      if (this.nativeValidate && !this.input.checkValidity()) { return false }\r\n      if (this.regex) {\r\n        if (!(this.regex instanceof Function ? this.regex(this.val) : this.regex.test(this.val))) { return false }\r\n      }\r\n      return true\r\n    },\r\n    reset() {\r\n      this.value = ''\r\n      this.valid = null\r\n      if (this._timeout.mask) clearTimeout(this._timeout.mask)\r\n      if (this._timeout.eval) clearTimeout(this._timeout.eval)\r\n    }\r\n  },\r\n  created () {\r\n    this._input = true\r\n    this._timeout = {}\r\n    let parent = this.$parent\r\n    while (parent && !parent._formValidator) { parent = parent.$parent }\r\n    if (parent && parent._formValidator) {\r\n      parent.children.push(this)\r\n      this._parent = parent\r\n    }\r\n    this._url = delayer(function () {\r\n      if (!this.url || !this.$http || this._loading) { return }\r\n      this._loading = true\r\n      this.$http.get(this.url).then(response => {\r\n        var data = response.data instanceof Array ? response.data : []\r\n        try { data = JSON.parse(data) } catch (e) {}\r\n        if (this.urlMap) { data = data.map(this.urlMap) }\r\n        this.options = data\r\n        this.loading = false\r\n      }, response => {\r\n        this.loading = false\r\n      })\r\n    }, DELAY)\r\n    if (this.url) this._url()\r\n  },\r\n  mounted () {\r\n    // $(this.input).on('focus', e => { this.$emit('focus', e) }).on('blur', e => {\r\n    //   if (this.canValidate) { this.valid = this.validate() }\r\n    //   this.$emit('blur', e)\r\n    // })\r\n  },\r\n  beforeDestroy () {\r\n    // $(this.input).off()\r\n    if (this._parent) {\r\n      var index = this._parent.children.indexOf(this)\r\n      this._parent.children.splice(index, 1)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.form-group {\r\n  position: relative;\r\n}\r\nlabel~.close {\r\n  top: 25px;\r\n}\r\n.input-group>.icon {\r\n  position: relative;\r\n  display: table-cell;\r\n  width:0;\r\n  z-index: 3;\r\n}\r\n.close {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n.has-feedback .close {\r\n  right: 20px;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var DELAY = 300;
	
	exports["default"] = {
	  props: {
	    clearButton: { type: Boolean, "default": false },
	    cols: { type: Number, "default": null },
	    datalist: { type: Array, "default": null },
	    disabled: { type: Boolean, "default": false },
	    enterSubmit: { type: Boolean, "default": false },
	    error: { type: String, "default": null },
	    help: { type: String, "default": null },
	    hideHelp: { type: Boolean, "default": true },
	    icon: { type: Boolean, "default": false },
	    label: { type: String, "default": null },
	    lang: { type: String, "default": navigator.language },
	    mask: null,
	    maskDelay: { type: Number, "default": 100 },
	    match: { type: String, "default": null },
	    max: { type: String, "default": null },
	    maxlength: { type: Number, "default": null },
	    min: { type: String, "default": null },
	    minlength: { type: Number, "default": 0 },
	    name: { type: String, "default": null },
	    pattern: { "default": null },
	    placeholder: { type: String, "default": null },
	    readonly: { type: Boolean, "default": false },
	    required: { type: Boolean, "default": false },
	    rows: { type: Number, "default": 3 },
	    step: { type: Number, "default": null },
	    type: { type: String, "default": 'text' },
	    url: { type: String, "default": null },
	    urlMap: { type: Function, "default": null },
	    validationDelay: { type: Number, "default": 250 },
	    value: { "default": null }
	  },
	  data: function data() {
	    var val = this.value;
	    return {
	      options: this.datalist,
	      val: val,
	      valid: null,
	      timeout: null
	    };
	  },
	
	  computed: {
	    canValidate: function canValidate() {
	      return !this.disabled && !this.readonly && (this.required || this.regex || this.nativeValidate || this.match !== null);
	    },
	    errorText: function errorText() {
	      var value = this.value;
	      var error = [this.error];
	      if (!value && this.required) error.push('(' + this.text.required.toLowerCase() + ')');
	      if (value && value.length < this.minlength) error.push('(' + this.text.minLength.toLowerCase() + ': ' + this.minlength + ')');
	      return error.join(' ');
	    },
	    id_datalist: function id_datalist() {
	      if (this.type !== 'textarea' && this.datalist instanceof Array) {
	        if (!this._id_datalist) {
	          if (!this.$root.id_datalist) {
	            this.$root.id_datalist = 0;
	          }
	          this._id_datalist = 'input-datalist' + this.$root.id_datalist++;
	        }
	        return this._id_datalist;
	      }
	      return null;
	    },
	    input: function input() {
	      return this.$refs.input;
	    },
	    nativeValidate: function nativeValidate() {
	      return (this.input || {}).checkValidity && (~['url', 'email'].indexOf(this.type.toLowerCase()) || this.min || this.max);
	    },
	    regex: function regex() {
	      return _utils.coerce.pattern(this.pattern);
	    },
	    showError: function showError() {
	      return this.error && this.valid === false;
	    },
	    showHelp: function showHelp() {
	      return this.help && (!this.showError || !this.hideHelp);
	    },
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    },
	    title: function title() {
	      return this.errorText || this.help || '';
	    }
	  },
	  watch: {
	    datalist: function datalist(val, old) {
	      if (val !== old && val instanceof Array) {
	        this.options = val;
	      }
	    },
	    match: function match(val) {
	      this.eval();
	    },
	    options: function options(val, old) {
	      if (val !== old) this.$emit('options', val);
	    },
	    url: function url(val) {
	      this._url();
	    },
	    val: function val(_val, old) {
	      var _this = this;
	
	      this.$emit('input', _val);
	      if (_val !== old) {
	        if (this.mask instanceof Function) {
	          _val = this.mask(_val || '');
	          if (this.val !== _val) {
	            if (this._timeout.mask) clearTimeout(this._timeout.mask);
	            this._timeout.mask = setTimeout(function () {
	              _this.val = _val;
	            }, isNaN(this.maskDelay) ? 0 : this.maskDelay);
	          }
	        }
	        this.eval();
	      }
	    },
	    valid: function valid(val, old) {
	      this.$emit('isvalid', val);
	      this.$emit(!val ? 'invalid' : 'valid');
	      if (this._parent) this._parent.validate();
	    },
	    value: function value(val) {
	      if (this.val !== val) {
	        this.val = val;
	      }
	    }
	  },
	  methods: {
	    attr: function attr(value) {
	      return ~['', null, undefined].indexOf(value) || value instanceof Function ? null : value;
	    },
	    emit: function emit(e) {
	      this.$emit(e.type, e.type == 'input' ? e.target.value : e);
	      if (e.type === 'blur' && this.canValidate) {
	        this.valid = this.validate();
	      }
	    },
	    eval: function _eval() {
	      var _this2 = this;
	
	      if (this._timeout.eval) clearTimeout(this._timeout.eval);
	      if (!this.canValidate) {
	        this.valid = true;
	      } else {
	        this._timeout.eval = setTimeout(function () {
	          _this2.valid = _this2.validate();
	          _this2._timeout.eval = null;
	        }, this.validationDelay);
	      }
	    },
	    focus: function focus() {
	      this.input.focus();
	    },
	    submit: function submit() {
	      if (this.$parent._formValidator) {
	        return this.$parent.validate();
	      }
	      if (this.input.form) {
	        var invalids = (0, _NodeList2["default"])('.form-group.validate:not(.has-success)', this.input.form);
	        if (invalids.length) {
	          invalids.find('input,textarea,select')[0].focus();
	        } else {
	          this.input.form.submit();
	        }
	      }
	    },
	    validate: function validate() {
	      if (!this.canValidate) {
	        return true;
	      }
	      var value = (this.val || '').trim();
	      if (!value) {
	        return !this.required;
	      }
	      if (this.match !== null) {
	        return this.match === value;
	      }
	      if (value.length < this.minlength) {
	        return false;
	      }
	      if (this.nativeValidate && !this.input.checkValidity()) {
	        return false;
	      }
	      if (this.regex) {
	        if (!(this.regex instanceof Function ? this.regex(this.val) : this.regex.test(this.val))) {
	          return false;
	        }
	      }
	      return true;
	    },
	    reset: function reset() {
	      this.value = '';
	      this.valid = null;
	      if (this._timeout.mask) clearTimeout(this._timeout.mask);
	      if (this._timeout.eval) clearTimeout(this._timeout.eval);
	    }
	  },
	  created: function created() {
	    this._input = true;
	    this._timeout = {};
	    var parent = this.$parent;
	    while (parent && !parent._formValidator) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formValidator) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	    this._url = (0, _utils.delayer)(function () {
	      var _this3 = this;
	
	      if (!this.url || !this.$http || this._loading) {
	        return;
	      }
	      this._loading = true;
	      this.$http.get(this.url).then(function (response) {
	        var data = response.data instanceof Array ? response.data : [];
	        try {
	          data = JSON.parse(data);
	        } catch (e) {}
	        if (_this3.urlMap) {
	          data = data.map(_this3.urlMap);
	        }
	        _this3.options = data;
	        _this3.loading = false;
	      }, function (response) {
	        _this3.loading = false;
	      });
	    }, DELAY);
	    if (this.url) this._url();
	  },
	  mounted: function mounted() {
	    // $(this.input).on('focus', e => { this.$emit('focus', e) }).on('blur', e => {
	    //   if (this.canValidate) { this.valid = this.validate() }
	    //   this.$emit('blur', e)
	    // })
	  },
	  beforeDestroy: function beforeDestroy() {
	    // $(this.input).off()
	    if (this._parent) {
	      var index = this._parent.children.indexOf(this);
	      this._parent.children.splice(index, 1);
	    }
	  }
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "form-group",
	    "class": {
	      validate: _vm.canValidate, 'has-feedback': _vm.icon, 'has-error': _vm.canValidate && _vm.valid === false, 'has-success': _vm.canValidate && _vm.valid
	    }
	  }, [_vm._t("label", [(_vm.label) ? _vm._c('label', {
	    staticClass: "control-label",
	    on: {
	      "click": _vm.focus
	    }
	  }, [_vm._v(_vm._s(_vm.label))]) : _vm._e()]), _vm._v(" "), (_vm.$slots.before || _vm.$slots.after) ? _vm._c('div', {
	    staticClass: "input-group"
	  }, [_vm._t("before"), _vm._v(" "), _vm._c(_vm.type == 'textarea' ? _vm.type : 'input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    ref: "input",
	    tag: "textarea",
	    staticClass: "form-control",
	    attrs: {
	      "cols": _vm.cols,
	      "disabled": _vm.disabled,
	      "list": _vm.id_datalist,
	      "max": _vm.attr(_vm.max),
	      "maxlength": _vm.maxlength,
	      "min": _vm.attr(_vm.min),
	      "name": _vm.name,
	      "placeholder": _vm.placeholder,
	      "readonly": _vm.readonly,
	      "required": _vm.required,
	      "rows": _vm.rows,
	      "step": _vm.step,
	      "title": _vm.attr(_vm.title),
	      "type": _vm.type == 'textarea' ? null : _vm.type
	    },
	    domProps: {
	      "value": _vm._s(_vm.val)
	    },
	    on: {
	      "blur": _vm.emit,
	      "focus": _vm.emit,
	      "input": [function($event) {
	        if ($event.target.composing) { return; }
	        _vm.val = $event.target.value
	      }, _vm.emit],
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.type != 'textarea' && _vm.enterSubmit && _vm.submit()
	      }
	    }
	  }), _vm._v(" "), (_vm.clearButton && _vm.value) ? _vm._c('div', {
	    "class": {
	      icon: _vm.icon
	    }
	  }, [_vm._c('span', {
	    staticClass: "close",
	    on: {
	      "click": function($event) {
	        _vm.value = ''
	      }
	    }
	  }, [_vm._v("×")])]) : _vm._e(), _vm._v(" "), (_vm.icon) ? _vm._c('div', {
	    staticClass: "icon"
	  }, [(_vm.icon && _vm.valid !== null) ? _vm._c('span', {
	    "class": ['form-control-feedback glyphicon', 'glyphicon-' + (_vm.valid ? 'ok' : 'remove')],
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._t("after")], 2) : [_vm._c(_vm.type == 'textarea' ? _vm.type : 'input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    ref: "input",
	    tag: "textarea",
	    staticClass: "form-control",
	    attrs: {
	      "cols": _vm.cols,
	      "disabled": _vm.disabled,
	      "list": _vm.id_datalist,
	      "max": _vm.attr(_vm.max),
	      "maxlength": _vm.maxlength,
	      "min": _vm.attr(_vm.min),
	      "name": _vm.name,
	      "placeholder": _vm.placeholder,
	      "readonly": _vm.readonly,
	      "required": _vm.required,
	      "rows": _vm.rows,
	      "step": _vm.step,
	      "title": _vm.attr(_vm.title),
	      "type": _vm.type == 'textarea' ? null : _vm.type
	    },
	    domProps: {
	      "value": _vm._s(_vm.val)
	    },
	    on: {
	      "blur": _vm.emit,
	      "focus": _vm.emit,
	      "input": [function($event) {
	        if ($event.target.composing) { return; }
	        _vm.val = $event.target.value
	      }, _vm.emit],
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.type != 'textarea' && _vm.enterSubmit && _vm.submit()
	      }
	    }
	  }), _vm._v(" "), (_vm.clearButton && _vm.val) ? _vm._c('span', {
	    staticClass: "close",
	    on: {
	      "click": function($event) {
	        _vm.val = ''
	      }
	    }
	  }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), (_vm.icon && _vm.valid !== null) ? _vm._c('span', {
	    "class": ['form-control-feedback glyphicon', 'glyphicon-' + (_vm.valid ? 'ok' : 'remove')],
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }) : _vm._e()], _vm._v(" "), (_vm.id_datalist) ? _vm._c('datalist', {
	    attrs: {
	      "id": _vm.id_datalist
	    }
	  }, _vm._l((_vm.options), function(opc) {
	    return _vm._c('option', {
	      domProps: {
	        "value": opc
	      }
	    })
	  })) : _vm._e(), _vm._v(" "), (_vm.showHelp) ? _vm._c('div', {
	    staticClass: "help-block",
	    on: {
	      "click": _vm.focus
	    }
	  }, [_vm._v(_vm._s(_vm.help))]) : _vm._e(), _vm._v(" "), (_vm.showError) ? _vm._c('div', {
	    staticClass: "help-block with-errors",
	    on: {
	      "click": _vm.focus
	    }
	  }, [_vm._v(_vm._s(_vm.errorText))]) : _vm._e()], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-652ad7b9", module.exports)
	  }
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(120)
	
	/* script */
	__vue_exports__ = __webpack_require__(122)
	
	/* template */
	var __vue_template__ = __webpack_require__(127)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Modal.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-fe7d5dc8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-fe7d5dc8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Modal.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(121);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fe7d5dc8!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fe7d5dc8!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.modal {\r\n  transition: all 0.3s ease;\n}\n.modal.in {\r\n  background-color: rgba(0,0,0,0.5);\n}\n.modal.zoom .modal-dialog {\r\n  -webkit-transform: scale(0.1);\r\n  -moz-transform: scale(0.1);\r\n  -ms-transform: scale(0.1);\r\n  transform: scale(0.1);\r\n  top: 300px;\r\n  opacity: 0;\r\n  -webkit-transition: all 0.3s;\r\n  -moz-transition: all 0.3s;\r\n  transition: all 0.3s;\n}\n.modal.zoom.in .modal-dialog {\r\n  -webkit-transform: scale(1);\r\n  -moz-transform: scale(1);\r\n  -ms-transform: scale(1);\r\n  transform: scale(1);\r\n  -webkit-transform: translate3d(0, -300px, 0);\r\n  transform: translate3d(0, -300px, 0);\r\n  opacity: 1;\n}\r\n", "", {"version":3,"sources":["/./src/Modal.vue?1fdd6260"],"names":[],"mappings":";AAsGA;EACA,0BAAA;CACA;AACA;EACA,kCAAA;CACA;AACA;EACA,8BAAA;EACA,2BAAA;EACA,0BAAA;EACA,sBAAA;EACA,WAAA;EACA,WAAA;EACA,6BAAA;EACA,0BAAA;EACA,qBAAA;CACA;AACA;EACA,4BAAA;EACA,yBAAA;EACA,wBAAA;EACA,oBAAA;EACA,6CAAA;EACA,qCAAA;EACA,WAAA;CACA","file":"Modal.vue","sourcesContent":["<template>\r\n  <div role=\"dialog\" :class=\"['modal',effect]\" @click=\"backdrop&&action(false,1)\" @transitionend=\"transition = false\">\r\n    <div :class=\"['modal-dialog',{'modal-lg':large,'modal-sm':small}]\" role=\"document\" :style=\"{width: optionalWidth}\" @click.stop=\"action(null)\">\r\n      <div class=\"modal-content\">\r\n        <slot name=\"modal-header\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" @click=\"action(false,2)\"><span>&times;</span></button>\r\n            <h4 class=\"modal-title\"><slot name=\"title\">{{title}}</slot></h4>\r\n          </div>\r\n        </slot>\r\n        <slot name=\"modal-body\"><div class=\"modal-body\"><slot></slot></div></slot>\r\n        <slot name=\"modal-footer\">\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default\" @click=\"action(false,3)\">{{ cancelText }}</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"action(true,4)\">{{ okText }}</button>\r\n          </div>\r\n        </slot>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {getScrollBarWidth} from './utils/utils.js'\r\n\r\nexport default {\r\n  props: {\r\n    backdrop: {type: Boolean, default: true},\r\n    callback: {type: Function, default: null},\r\n    cancelText: {type: String, default: 'Close'},\r\n    effect: {type: String, default: null},\r\n    large: {type: Boolean, default: false},\r\n    okText: {type: String, default: 'Save changes'},\r\n    small: {type: Boolean, default: false},\r\n    title: {type: String, default: ''},\r\n    value: {type: Boolean, required: true},\r\n    width: {default: null}\r\n  },\r\n  data () {\r\n    return {\r\n      transition: false,\r\n      val: null\r\n    }\r\n  },\r\n  computed: {\r\n    optionalWidth () {\r\n      if (this.width === null) {\r\n        return null\r\n      } else if (Number.isInteger(this.width)) {\r\n        return this.width + 'px'\r\n      }\r\n      return this.width\r\n    }\r\n  },\r\n  watch: {\r\n    transition (val, old) {\r\n      if (val === old) { return }\r\n      const el = this.$el\r\n      const body = document.body\r\n      if (val) {//starting\r\n        if (this.val) {\r\n          el.querySelector('.modal-content').focus()\r\n          el.style.display = 'block'\r\n          setTimeout(() => el.classList.add('in'), 0)\r\n          body.classList.add('modal-open')\r\n          if (getScrollBarWidth() !== 0) {\r\n            body.style.paddingRight = getScrollBarWidth() + 'px'\r\n          }\r\n        } else {\r\n          el.classList.remove('in')\r\n        }\r\n      } else {//ending\r\n        this.$emit(this.val ? 'opened' : 'closed')\r\n        if (!this.val) {\r\n          el.style.display = 'none'\r\n          body.style.paddingRight = null\r\n          body.classList.remove('modal-open')\r\n        }\r\n      }\r\n    },\r\n    val (val, old) {\r\n      this.$emit('input', val)\r\n      if (old === null ? val === true : val !== old) this.transition = true\r\n    },\r\n    value (val, old) {\r\n      if (val !== old) this.val = val\r\n    }\r\n  },\r\n  methods: {\r\n    action (val,p) {\r\n      if (val === null) { return }\r\n      if (val && this.callback instanceof Function) this.callback()\r\n      this.$emit(val ? 'ok' : 'cancel',p)\r\n      this.val = val || false\r\n    }\r\n  },\r\n  mounted () {\r\n    this.val = this.value\r\n  }\r\n}\r\n</script>\r\n<style>\r\n.modal {\r\n  transition: all 0.3s ease;\r\n}\r\n.modal.in {\r\n  background-color: rgba(0,0,0,0.5);\r\n}\r\n.modal.zoom .modal-dialog {\r\n  -webkit-transform: scale(0.1);\r\n  -moz-transform: scale(0.1);\r\n  -ms-transform: scale(0.1);\r\n  transform: scale(0.1);\r\n  top: 300px;\r\n  opacity: 0;\r\n  -webkit-transition: all 0.3s;\r\n  -moz-transition: all 0.3s;\r\n  transition: all 0.3s;\r\n}\r\n.modal.zoom.in .modal-dialog {\r\n  -webkit-transform: scale(1);\r\n  -moz-transform: scale(1);\r\n  -ms-transform: scale(1);\r\n  transform: scale(1);\r\n  -webkit-transform: translate3d(0, -300px, 0);\r\n  transform: translate3d(0, -300px, 0);\r\n  opacity: 1;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isInteger = __webpack_require__(123);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _utils = __webpack_require__(65);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  props: {
	    backdrop: { type: Boolean, "default": true },
	    callback: { type: Function, "default": null },
	    cancelText: { type: String, "default": 'Close' },
	    effect: { type: String, "default": null },
	    large: { type: Boolean, "default": false },
	    okText: { type: String, "default": 'Save changes' },
	    small: { type: Boolean, "default": false },
	    title: { type: String, "default": '' },
	    value: { type: Boolean, required: true },
	    width: { "default": null }
	  },
	  data: function data() {
	    return {
	      transition: false,
	      val: null
	    };
	  },
	
	  computed: {
	    optionalWidth: function optionalWidth() {
	      if (this.width === null) {
	        return null;
	      } else if ((0, _isInteger2["default"])(this.width)) {
	        return this.width + 'px';
	      }
	      return this.width;
	    }
	  },
	  watch: {
	    transition: function transition(val, old) {
	      if (val === old) {
	        return;
	      }
	      var el = this.$el;
	      var body = document.body;
	      if (val) {
	        //starting
	        if (this.val) {
	          el.querySelector('.modal-content').focus();
	          el.style.display = 'block';
	          setTimeout(function () {
	            return el.classList.add('in');
	          }, 0);
	          body.classList.add('modal-open');
	          if ((0, _utils.getScrollBarWidth)() !== 0) {
	            body.style.paddingRight = (0, _utils.getScrollBarWidth)() + 'px';
	          }
	        } else {
	          el.classList.remove('in');
	        }
	      } else {
	        //ending
	        this.$emit(this.val ? 'opened' : 'closed');
	        if (!this.val) {
	          el.style.display = 'none';
	          body.style.paddingRight = null;
	          body.classList.remove('modal-open');
	        }
	      }
	    },
	    val: function val(_val, old) {
	      this.$emit('input', _val);
	      if (old === null ? _val === true : _val !== old) this.transition = true;
	    },
	    value: function value(val, old) {
	      if (val !== old) this.val = val;
	    }
	  },
	  methods: {
	    action: function action(val, p) {
	      if (val === null) {
	        return;
	      }
	      if (val && this.callback instanceof Function) this.callback();
	      this.$emit(val ? 'ok' : 'cancel', p);
	      this.val = val || false;
	    }
	  },
	  mounted: function mounted() {
	    this.val = this.value;
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(125);
	module.exports = __webpack_require__(7).Number.isInteger;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(5);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(126)});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(13)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    "class": ['modal', _vm.effect],
	    attrs: {
	      "role": "dialog"
	    },
	    on: {
	      "click": function($event) {
	        _vm.backdrop && _vm.action(false, 1)
	      },
	      "transitionend": function($event) {
	        _vm.transition = false
	      }
	    }
	  }, [_vm._c('div', {
	    "class": ['modal-dialog', {
	      'modal-lg': _vm.large,
	      'modal-sm': _vm.small
	    }],
	    style: ({
	      width: _vm.optionalWidth
	    }),
	    attrs: {
	      "role": "document"
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.action(null)
	      }
	    }
	  }, [_vm._c('div', {
	    staticClass: "modal-content"
	  }, [_vm._t("modal-header", [_vm._c('div', {
	    staticClass: "modal-header"
	  }, [_vm._c('button', {
	    staticClass: "close",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.action(false, 2)
	      }
	    }
	  }, [_vm._c('span', [_vm._v("×")])]), _vm._v(" "), _vm._c('h4', {
	    staticClass: "modal-title"
	  }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2)])]), _vm._v(" "), _vm._t("modal-body", [_vm._c('div', {
	    staticClass: "modal-body"
	  }, [_vm._t("default")], 2)]), _vm._v(" "), _vm._t("modal-footer", [_vm._c('div', {
	    staticClass: "modal-footer"
	  }, [_vm._c('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.action(false, 3)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _vm._c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.action(true, 4)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.okText))])])])], 2)])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-fe7d5dc8", module.exports)
	  }
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(129)
	
	/* template */
	var __vue_template__ = __webpack_require__(130)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Navbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-38f0619e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-38f0619e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Navbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  props: {
	    type: { type: String, "default": 'default' },
	    placement: { type: String, "default": '' },
	    container: { type: String, "default": '' }
	  },
	  data: function data() {
	    return {
	      id: 'bs-example-navbar-collapse-1',
	      collapsed: true,
	      styles: {}
	    };
	  },
	
	  computed: {
	    slots: function slots() {
	      return this._slotContents;
	    }
	  },
	  methods: {
	    toggleCollapse: function toggleCollapse(e) {
	      e && e.preventDefault();
	      this.collapsed = !this.collapsed;
	    }
	  },
	  created: function created() {
	    this._navbar = true;
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    try {
	      (function () {
	        var $dropdown = (0, _NodeList2["default"])('.dropdown>[data-toggle="dropdown"]', _this.$el).parent();
	        if ($dropdown) {
	          $dropdown.on('click', '.dropdown-toggle', function (e) {
	            e.preventDefault();
	            $dropdown.each(function (content) {
	              if (content.contains(e.target)) content.classList.toggle('open');
	            });
	          }).on('click', '.dropdown-menu>li>a', function (e) {
	            $dropdown.each(function (content) {
	              if (content.contains(e.target)) content.classList.remove('open');
	            });
	          }).onBlur(function (e) {
	            $dropdown.each(function (content) {
	              if (!content.contains(e.target)) content.classList.remove('open');
	            });
	          });
	        }
	      })();
	    } catch (ex) {
	      console.log('error finding dropdown');
	    }
	
	    (0, _NodeList2["default"])(this.$el).on('click touchstart', 'li:not(.dropdown)>a', function (e) {
	      setTimeout(function () {
	        _this.collapsed = true;
	      }, 200);
	    }).onBlur(function (e) {
	      if (!_this.$el.contains(e.target)) {
	        _this.collapsed = true;
	      }
	    });
	    var height = this.$el.offsetHeight;
	    if (this.placement === 'top') {
	      document.body.style.paddingTop = height + 'px';
	    }
	    if (this.placement === 'bottom') {
	      document.body.style.paddingBottom = height + 'px';
	    }
	    if (this.$slots.collapse) (0, _NodeList2["default"])('[data-toggle="collapse"]', this.$el).on('click', function (e) {
	      return _this.toggleCollapse(e);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    (0, _NodeList2["default"])('.dropdown', this.$el).off('click').offBlur();
	    if (this.$slots.collapse) (0, _NodeList2["default"])('[data-toggle="collapse"]', this.$el).off('click');
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('nav', {
	    "class": ['navbar', 'navbar-' + _vm.type, _vm.placement === 'static' ? 'navbar-static-top' : 'navbar-fixed-' + _vm.placement]
	  }, [_vm._c('div', {
	    "class": _vm.container === 'fluid' ? 'container-fluid' : 'container'
	  }, [_vm._c('div', {
	    staticClass: "navbar-header"
	  }, [(!_vm.$slots.collapse) ? _vm._c('button', {
	    staticClass: "navbar-toggle collapsed",
	    attrs: {
	      "type": "button",
	      "aria-expanded": "false"
	    },
	    on: {
	      "click": _vm.toggleCollapse
	    }
	  }, [_vm._c('span', {
	    staticClass: "sr-only"
	  }, [_vm._v("Toggle navigation")]), _vm._v(" "), _vm._c('span', {
	    staticClass: "icon-bar"
	  }), _vm._v(" "), _vm._c('span', {
	    staticClass: "icon-bar"
	  }), _vm._v(" "), _vm._c('span', {
	    staticClass: "icon-bar"
	  })]) : _vm._e(), _vm._v(" "), _vm._t("collapse"), _vm._v(" "), _vm._t("brand")], 2), _vm._v(" "), _vm._c('div', {
	    "class": ['navbar-collapse', {
	      collapse: _vm.collapsed
	    }]
	  }, [_vm._c('ul', {
	    staticClass: "nav navbar-nav"
	  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.$slots.left) ? _vm._c('ul', {
	    staticClass: "nav navbar-nav navbar-left"
	  }, [_vm._t("left")], 2) : _vm._e(), _vm._v(" "), (_vm.$slots.right) ? _vm._c('ul', {
	    staticClass: "nav navbar-nav navbar-right"
	  }, [_vm._t("right")], 2) : _vm._e()])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-38f0619e", module.exports)
	  }
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(132)
	
	/* template */
	var __vue_template__ = __webpack_require__(133)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Option.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-42088116", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-42088116", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Option.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	
	exports["default"] = {
	  props: { value: null },
	  data: function data() {
	    return { loading: true };
	  },
	  mounted: function mounted() {
	    if (this.$parent._select) {
	      if (!this.$parent.options) {
	        this.$parent.options = [];
	      }
	      var el = {};
	      el[this.$parent.optionsLabel] = this.$el.innerHTML;
	      el[this.$parent.optionsValue] = this.value;
	      this.$parent.options.push(el);
	      this.loading = false;
	    } else {
	      console.warn('options only work inside a select component');
	    }
	  }
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return (_vm.loading) ? _vm._c('li', [_vm._t("default")], 2) : _vm._e()
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-42088116", module.exports)
	  }
	}

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(135)
	
	/* script */
	__vue_exports__ = __webpack_require__(137)
	
	/* template */
	var __vue_template__ = __webpack_require__(138)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Panel.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b1e0461a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b1e0461a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Panel.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(136);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b1e0461a!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Panel.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b1e0461a!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Panel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.accordion-toggle {\r\n  cursor: pointer;\n}\n.collapse-enter-active,\r\n.collapse-leave-active {\r\n  transition: all .5s ease;\r\n  overflow: hidden;\n}\n.collapse-enter,\r\n.collapse-leave-active {\n}\r\n\r\n", "", {"version":3,"sources":["/./src/Panel.vue?60e798e2"],"names":[],"mappings":";AAyEA;EACA,gBAAA;CACA;AACA;;EAEA,yBAAA;EACA,iBAAA;CACA;AACA;;CAGA","file":"Panel.vue","sourcesContent":["<template>\r\n  <div :class=\"['panel',panelType]\">\r\n    <div :class=\"['panel-heading',{'accordion-toggle':inAccordion}]\" @click.prevent=\"inAccordion&&toggle()\">\r\n      <slot name=\"header\"><h4 class=\"panel-title\">{{ header }}</h4></slot>\r\n    </div>\r\n    <transition\r\n      name=\"collapse\"\r\n      @enter=\"enter\"\r\n      @after-enter=\"afterEnter\"\r\n      @before-leave=\"beforeLeave\"\r\n    >\r\n      <div class=\"panel-collapse\" v-if=\"open\">\r\n        <div class=\"panel-body\">\r\n          <slot></slot>\r\n        </div>\r\n      </div>\r\n    </transition>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    header: {type: String},\r\n    isOpen: {type: Boolean, default: null},\r\n    type: {type: String, default : null}\r\n  },\r\n  data() {\r\n    return {\r\n      open: this.isOpen\r\n    }\r\n  },\r\n  watch: {\r\n    isOpen( val ) {\r\n      this.open = val\r\n    }\r\n  },\r\n  computed: {\r\n    inAccordion () { return this.$parent && this.$parent._isAccordion },\r\n    panelType () { return 'panel-' + (this.type || (this.$parent && this.$parent.type) || 'default') }\r\n  },\r\n  methods: {\r\n    toggle () {\r\n      this.open = !this.open\r\n      if (this.inAccordion) {\r\n        this.$parent.openChild(this)\r\n      }\r\n    },\r\n    enter (el) {\r\n      el.style.height = 'auto'\r\n      var endWidth = getComputedStyle(el).height\r\n      el.style.height = '0px'\r\n      el.offsetHeight // force repaint\r\n      el.style.height = endWidth;\r\n    },\r\n    afterEnter (el) {\r\n      el.style.height = 'auto'\r\n    },\r\n    beforeLeave (el) {\r\n      el.style.height = getComputedStyle(el).height\r\n      el.offsetHeight // force repaint\r\n      el.style.height = '0px'\r\n    },\r\n  },\r\n  created () {\r\n    if (this.isOpen === null) {\r\n      this.open = !this.inAccordion\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.accordion-toggle {\r\n  cursor: pointer;\r\n}\r\n.collapse-enter-active,\r\n.collapse-leave-active {\r\n  transition: all .5s ease;\r\n  overflow: hidden;\r\n}\r\n.collapse-enter,\r\n.collapse-leave-active {\r\n\r\n}\r\n\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    header: { type: String },
	    isOpen: { type: Boolean, "default": null },
	    type: { type: String, "default": null }
	  },
	  data: function data() {
	    return {
	      open: this.isOpen
	    };
	  },
	
	  watch: {
	    isOpen: function isOpen(val) {
	      this.open = val;
	    }
	  },
	  computed: {
	    inAccordion: function inAccordion() {
	      return this.$parent && this.$parent._isAccordion;
	    },
	    panelType: function panelType() {
	      return 'panel-' + (this.type || this.$parent && this.$parent.type || 'default');
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      this.open = !this.open;
	      if (this.inAccordion) {
	        this.$parent.openChild(this);
	      }
	    },
	    enter: function enter(el) {
	      el.style.height = 'auto';
	      var endWidth = getComputedStyle(el).height;
	      el.style.height = '0px';
	      el.offsetHeight; // force repaint
	      el.style.height = endWidth;
	    },
	    afterEnter: function afterEnter(el) {
	      el.style.height = 'auto';
	    },
	    beforeLeave: function beforeLeave(el) {
	      el.style.height = getComputedStyle(el).height;
	      el.offsetHeight; // force repaint
	      el.style.height = '0px';
	    }
	  },
	  created: function created() {
	    if (this.isOpen === null) {
	      this.open = !this.inAccordion;
	    }
	  }
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    "class": ['panel', _vm.panelType]
	  }, [_vm._c('div', {
	    "class": ['panel-heading', {
	      'accordion-toggle': _vm.inAccordion
	    }],
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.inAccordion && _vm.toggle()
	      }
	    }
	  }, [_vm._t("header", [_vm._c('h4', {
	    staticClass: "panel-title"
	  }, [_vm._v(_vm._s(_vm.header))])])], 2), _vm._v(" "), _vm._c('transition', {
	    attrs: {
	      "name": "collapse"
	    },
	    on: {
	      "enter": _vm.enter,
	      "after-enter": _vm.afterEnter,
	      "before-leave": _vm.beforeLeave
	    }
	  }, [(_vm.open) ? _vm._c('div', {
	    staticClass: "panel-collapse"
	  }, [_vm._c('div', {
	    staticClass: "panel-body"
	  }, [_vm._t("default")], 2)]) : _vm._e()])], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b1e0461a", module.exports)
	  }
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(140)
	
	/* script */
	__vue_exports__ = __webpack_require__(142)
	
	/* template */
	var __vue_template__ = __webpack_require__(144)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Popover.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2465bf54", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2465bf54", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Popover.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(141);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2465bf54!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Popover.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2465bf54!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Popover.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.popover.top,\r\n.popover.left,\r\n.popover.right,\r\n.popover.bottom {\r\n  display: block;\n}\n.scale-enter {\r\n  animation:scale-in 0.15s ease-in;\n}\n.scale-leave-active {\r\n  animation:scale-out 0.15s ease-out;\n}\n@keyframes scale-in {\n0% {\r\n    transform: scale(0);\r\n    opacity: 0;\n}\n100% {\r\n    transform: scale(1);\r\n    opacity: 1;\n}\n}\n@keyframes scale-out {\n0% {\r\n    transform: scale(1);\r\n    opacity: 1;\n}\n100% {\r\n    transform: scale(0);\r\n    opacity: 0;\n}\n}\r\n", "", {"version":3,"sources":["/./src/Popover.vue?e616963a"],"names":[],"mappings":";AAyBA;;;;EAIA,eAAA;CACA;AACA;EACA,iCAAA;CACA;AACA;EACA,mCAAA;CACA;AACA;AACA;IACA,oBAAA;IACA,WAAA;CACA;AACA;IACA,oBAAA;IACA,WAAA;CACA;CACA;AACA;AACA;IACA,oBAAA;IACA,WAAA;CACA;AACA;IACA,oBAAA;IACA,WAAA;CACA;CACA","file":"Popover.vue","sourcesContent":["<template>\r\n  <span ref=\"trigger\">\r\n    <slot></slot>\r\n    <transition :name=\"effect\">\r\n      <div ref=\"popover\" v-if=\"show\" :class=\"['popover',placement]\">\r\n        <div class=\"arrow\"></div>\r\n        <h3 class=\"popover-title\" v-if=\"title\"><slot name=\"title\">{{title}}</slot></h3>\r\n        <div class=\"popover-content\"><slot name=\"content\"><span v-html=\"content\"></span></slot></div>\r\n      </div>\r\n    </transition>\r\n  </span>\r\n</template>\r\n\r\n<script>\r\nimport PopoverMixin from './utils/popoverMixins.js'\r\n\r\nexport default {\r\n  mixins: [PopoverMixin],\r\n  props: {\r\n    trigger: {type: String, default: 'click'}\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.popover.top,\r\n.popover.left,\r\n.popover.right,\r\n.popover.bottom {\r\n  display: block;\r\n}\r\n.scale-enter {\r\n  animation:scale-in 0.15s ease-in;\r\n}\r\n.scale-leave-active {\r\n  animation:scale-out 0.15s ease-out;\r\n}\r\n@keyframes scale-in {\r\n  0% {\r\n    transform: scale(0);\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    transform: scale(1);\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes scale-out {\r\n  0% {\r\n    transform: scale(1);\r\n    opacity: 1;\r\n  }\r\n  100% {\r\n    transform: scale(0);\r\n    opacity: 0;\r\n  }\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _popoverMixins = __webpack_require__(143);
	
	var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  mixins: [_popoverMixins2["default"]],
	  props: {
	    trigger: { type: String, "default": 'click' }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _NodeList = __webpack_require__(1);
	
	var _NodeList2 = _interopRequireDefault(_NodeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  props: {
	    content: { type: String },
	    effect: { type: String, "default": 'fade' },
	    header: { type: Boolean, "default": true },
	    placement: { type: String, "default": 'top' },
	    title: { type: String },
	    trigger: { type: String }
	  },
	  data: function data() {
	    return {
	      top: 0,
	      left: 0,
	      show: false
	    };
	  },
	
	  computed: {
	    events: function events() {
	      return { contextmenu: ['contextmenu'], hover: ['mouseleave', 'mouseenter'], focus: ['blur', 'focus'] }[this.trigger] || ['click'];
	    }
	  },
	  methods: {
	    beforeEnter: function beforeEnter() {
	      var _this = this;
	
	      this.position();
	      setTimeout(function () {
	        return _this.position();
	      }, 30);
	    },
	    position: function position() {
	      var _this2 = this;
	
	      this.$nextTick(function () {
	        var popover = _this2.$refs.popover;
	        var trigger = _this2.$refs.trigger.children[0];
	        switch (_this2.placement) {
	          case 'top':
	            _this2.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
	            _this2.top = trigger.offsetTop - popover.offsetHeight;
	            break;
	          case 'left':
	            _this2.left = trigger.offsetLeft - popover.offsetWidth;
	            _this2.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
	            break;
	          case 'right':
	            _this2.left = trigger.offsetLeft + trigger.offsetWidth;
	            _this2.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
	            break;
	          case 'bottom':
	            _this2.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
	            _this2.top = trigger.offsetTop + trigger.offsetHeight;
	            break;
	          default:
	            console.warn('Wrong placement prop');
	        }
	        popover.style.top = _this2.top + 'px';
	        popover.style.left = _this2.left + 'px';
	      });
	    },
	    toggle: function toggle(e) {
	      if (e && this.trigger === 'contextmenu') e.preventDefault();
	      this.show = !this.show;
	      if (this.show) this.beforeEnter();
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;
	
	    var trigger = this.$refs.trigger.children[0];
	    if (!trigger) return console.error('Could not find trigger v-el in your component that uses popoverMixin.');
	
	    if (this.trigger === 'focus' && !~trigger.tabIndex) {
	      trigger = (0, _NodeList2["default"])('a,input,select,textarea,button', trigger);
	      if (!trigger.length) {
	        return;
	      }
	    }
	    this.events.forEach(function (event) {
	      (0, _NodeList2["default"])(trigger).on(event, _this3.toggle);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._trigger) (0, _NodeList2["default"])(this._trigger).off();
	  }
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('span', {
	    ref: "trigger"
	  }, [_vm._t("default"), _vm._v(" "), _vm._c('transition', {
	    attrs: {
	      "name": _vm.effect
	    }
	  }, [(_vm.show) ? _vm._c('div', {
	    ref: "popover",
	    "class": ['popover', _vm.placement]
	  }, [_vm._c('div', {
	    staticClass: "arrow"
	  }), _vm._v(" "), (_vm.title) ? _vm._c('h3', {
	    staticClass: "popover-title"
	  }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2) : _vm._e(), _vm._v(" "), _vm._c('div', {
	    staticClass: "popover-content"
	  }, [_vm._t("content", [_vm._c('span', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.content)
	    }
	  })])], 2)]) : _vm._e()])], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2465bf54", module.exports)
	  }
	}

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(146)
	
	/* template */
	var __vue_template__ = __webpack_require__(147)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Progressbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-68aa3375", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-68aa3375", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Progressbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	exports["default"] = {
	  props: {
	    animated: { type: Boolean, "default": false },
	    label: { "default": false },
	    now: { required: true },
	    striped: { type: Boolean, "default": false },
	    type: { type: String }
	  },
	  computed: {
	    labelBool: function labelBool() {
	      return _utils.coerce["boolean"](this.label);
	    },
	    nowNum: function nowNum() {
	      return _utils.coerce.number(this.now);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    "class": ['progress-bar', 'progress-bar-' + _vm.type, {
	      active: _vm.animated,
	      'progress-bar-striped': _vm.striped
	    }],
	    style: ({
	      width: _vm.nowNum + '%'
	    }),
	    domProps: {
	      "textContent": _vm._s(_vm.labelBool ? _vm.nowNum + '%' : null)
	    }
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-68aa3375", module.exports)
	  }
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(149)
	
	/* script */
	__vue_exports__ = __webpack_require__(151)
	
	/* template */
	var __vue_template__ = __webpack_require__(152)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Radio.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-74cfd92c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-74cfd92c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(150);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-74cfd92c!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Radio.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-74cfd92c!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Radio.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.radio { position: relative;\n}\n.radio > label > input {\r\n  position: absolute;\r\n  margin: 0;\r\n  padding: 0;\r\n  opacity: 0;\r\n  z-index: -1;\r\n  box-sizing: border-box;\n}\n.radio > label > .icon {\r\n  position: absolute;\r\n  top: .15rem;\r\n  left: 0;\r\n  display: block;\r\n  width: 1.4rem;\r\n  height: 1.4rem;\r\n  text-align: center;\r\n  user-select: none;\r\n  border-radius: .7rem;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: 50% 50%;\n}\n.radio:not(.active) > label > .icon {\r\n  background-color: #ddd;\r\n  border: 1px solid #bbb;\n}\n.radio > label > input:focus ~ .icon {\r\n  outline: 0;\r\n  border: 1px solid #66afe9;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\n.radio.active > label > .icon {\r\n  background-size: 1rem 1rem;\r\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+);\n}\n.radio.active .btn-default { filter: brightness(75%);\n}\n.radio.disabled > label > .icon,\r\n.radio.readonly > label > .icon,\r\n.btn.readonly {\r\n  filter: alpha(opacity=65);\r\n  box-shadow: none;\r\n  opacity: .65;\n}\nlabel.btn > input[type=radio] {\r\n  position: absolute;\r\n  clip: rect(0,0,0,0);\r\n  pointer-events: none;\n}\r\n", "", {"version":3,"sources":["/./src/Radio.vue?11624c48"],"names":[],"mappings":";AA8GA,SAAA,mBAAA;CAAA;AACA;EACA,mBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,uBAAA;CACA;AACA;EACA,mBAAA;EACA,YAAA;EACA,QAAA;EACA,eAAA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,qBAAA;EACA,6BAAA;EACA,mCAAA;EACA,yBAAA;CACA;AACA;EACA,uBAAA;EACA,uBAAA;CACA;AACA;EACA,WAAA;EACA,0BAAA;EACA,0EAAA;CACA;AACA;EACA,2BAAA;EACA,8OAAA;CACA;AACA,6BAAA,wBAAA;CAAA;AAEA;;;EAGA,0BAAA;EACA,iBAAA;EACA,aAAA;CACA;AACA;EACA,mBAAA;EACA,oBAAA;EACA,qBAAA;CACA","file":"Radio.vue","sourcesContent":["<template>\r\n  <div :is=\"buttonStyle?'label':'div'\" @click.prevent=\"toggle\"\r\n    :class=\"[(buttonStyle?'btn btn-'+typeColor:'radio '+typeColor),{active:active,disabled:disabled,readonly:readonly}]\"\r\n  >\r\n    <template v-if=\"buttonStyle\">\r\n      <input type=\"radio\" autocomplete=\"off\" ref=\"input\"\r\n        v-show=\"!readonly\"\r\n        v-model=\"check\"\r\n        :value=\"selectedValue\"\r\n        :name=\"name\"\r\n        :readonly=\"readonly\"\r\n        :disabled=\"disabled\"\r\n      />\r\n      <slot></slot>\r\n    </template>\r\n    <label v-else class=\"open\">\r\n      <input type=\"radio\" autocomplete=\"off\" ref=\"input\"\r\n        v-model=\"check\"\r\n        :value=\"selectedValue\"\r\n        :name=\"name\"\r\n        :readonly=\"readonly\"\r\n        :disabled=\"disabled\"\r\n      />\r\n      <span class=\"icon dropdown-toggle\" :class=\"[active?'btn-'+typeColor:'',{bg:typeColor==='default'}]\"></span>\r\n      <span v-if=\"active&&typeColor==='default'\" class=\"icon\"></span>\r\n      <slot></slot>\r\n    </label>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    button: {type: Boolean, default: false},\r\n    disabled: {type: Boolean, default: false},\r\n    name: {type: String, default: null},\r\n    readonly: {type: Boolean, default: false},\r\n    selectedValue: {default: true},\r\n    type: {type: String, default: null},\r\n    value: {default: false}\r\n  },\r\n  data () {\r\n    return {\r\n      check: this.value\r\n    }\r\n  },\r\n  computed: {\r\n    active () { return this.check === this.selectedValue },\r\n    inGroup () { return this.$parent && this.$parent.btnGroup && !this.$parent._checkboxGroup },\r\n    parentValue () { return this.$parent.val },\r\n    buttonStyle () { return this.button || (this.$parent && this.$parent.btnGroup && this.$parent.buttons) },\r\n    typeColor () { return (this.type || (this.$parent && this.$parent.type)) || 'default' }\r\n  },\r\n  watch: {\r\n    check (val) {\r\n      if (this.selectedValue === val) {\r\n        this.$emit('input', val)\r\n        this.$emit('checked', true)\r\n        this.updateParent()\r\n      }\r\n    },\r\n    parentValue (val) {\r\n      this.updateFromParent()\r\n    },\r\n    value (val) {\r\n      if (this.selectedValue == val) {\r\n        this.check = val\r\n      } else {\r\n        this.check = false\r\n      }\r\n    }\r\n  },\r\n  created () {\r\n    if (this.inGroup) {\r\n      var parent = this.$parent\r\n      parent._radioGroup = true\r\n      this.updateFromParent()\r\n    }\r\n  },\r\n  methods: {\r\n    updateFromParent() {\r\n      if (this.inGroup) {\r\n        if (this.selectedValue == this.$parent.val) {\r\n          this.check = this.selectedValue\r\n        } else {\r\n          this.check = false\r\n        }\r\n      }\r\n    },\r\n    updateParent() {\r\n      if (this.inGroup) {\r\n        if (this.selectedValue === this.check) {\r\n          this.$parent.val = this.selectedValue\r\n        }\r\n      }\r\n    },\r\n    focus () {\r\n      this.$refs.input.focus()\r\n    },\r\n    toggle () {\r\n      if (this.disabled) { return }\r\n      this.focus()\r\n      if (this.readonly) { return }\r\n      this.check = this.selectedValue\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scope>\r\n.radio { position: relative; }\r\n.radio > label > input {\r\n  position: absolute;\r\n  margin: 0;\r\n  padding: 0;\r\n  opacity: 0;\r\n  z-index: -1;\r\n  box-sizing: border-box;\r\n}\r\n.radio > label > .icon {\r\n  position: absolute;\r\n  top: .15rem;\r\n  left: 0;\r\n  display: block;\r\n  width: 1.4rem;\r\n  height: 1.4rem;\r\n  text-align: center;\r\n  user-select: none;\r\n  border-radius: .7rem;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n  background-size: 50% 50%;\r\n}\r\n.radio:not(.active) > label > .icon {\r\n  background-color: #ddd;\r\n  border: 1px solid #bbb;\r\n}\r\n.radio > label > input:focus ~ .icon {\r\n  outline: 0;\r\n  border: 1px solid #66afe9;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\r\n}\r\n.radio.active > label > .icon {\r\n  background-size: 1rem 1rem;\r\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSI0IiBmaWxsPSIjZmZmIi8+PC9zdmc+);\r\n}\r\n.radio.active .btn-default { filter: brightness(75%); }\r\n\r\n.radio.disabled > label > .icon,\r\n.radio.readonly > label > .icon,\r\n.btn.readonly {\r\n  filter: alpha(opacity=65);\r\n  box-shadow: none;\r\n  opacity: .65;\r\n}\r\nlabel.btn > input[type=radio] {\r\n  position: absolute;\r\n  clip: rect(0,0,0,0);\r\n  pointer-events: none;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 151 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    button: { type: Boolean, "default": false },
	    disabled: { type: Boolean, "default": false },
	    name: { type: String, "default": null },
	    readonly: { type: Boolean, "default": false },
	    selectedValue: { "default": true },
	    type: { type: String, "default": null },
	    value: { "default": false }
	  },
	  data: function data() {
	    return {
	      check: this.value
	    };
	  },
	
	  computed: {
	    active: function active() {
	      return this.check === this.selectedValue;
	    },
	    inGroup: function inGroup() {
	      return this.$parent && this.$parent.btnGroup && !this.$parent._checkboxGroup;
	    },
	    parentValue: function parentValue() {
	      return this.$parent.val;
	    },
	    buttonStyle: function buttonStyle() {
	      return this.button || this.$parent && this.$parent.btnGroup && this.$parent.buttons;
	    },
	    typeColor: function typeColor() {
	      return this.type || this.$parent && this.$parent.type || 'default';
	    }
	  },
	  watch: {
	    check: function check(val) {
	      if (this.selectedValue === val) {
	        this.$emit('input', val);
	        this.$emit('checked', true);
	        this.updateParent();
	      }
	    },
	    parentValue: function parentValue(val) {
	      this.updateFromParent();
	    },
	    value: function value(val) {
	      if (this.selectedValue == val) {
	        this.check = val;
	      } else {
	        this.check = false;
	      }
	    }
	  },
	  created: function created() {
	    if (this.inGroup) {
	      var parent = this.$parent;
	      parent._radioGroup = true;
	      this.updateFromParent();
	    }
	  },
	
	  methods: {
	    updateFromParent: function updateFromParent() {
	      if (this.inGroup) {
	        if (this.selectedValue == this.$parent.val) {
	          this.check = this.selectedValue;
	        } else {
	          this.check = false;
	        }
	      }
	    },
	    updateParent: function updateParent() {
	      if (this.inGroup) {
	        if (this.selectedValue === this.check) {
	          this.$parent.val = this.selectedValue;
	        }
	      }
	    },
	    focus: function focus() {
	      this.$refs.input.focus();
	    },
	    toggle: function toggle() {
	      if (this.disabled) {
	        return;
	      }
	      this.focus();
	      if (this.readonly) {
	        return;
	      }
	      this.check = this.selectedValue;
	    }
	  }
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c(_vm.buttonStyle ? 'label' : 'div', {
	    tag: "div",
	    "class": [(_vm.buttonStyle ? 'btn btn-' + _vm.typeColor : 'radio ' + _vm.typeColor), {
	      active: _vm.active,
	      disabled: _vm.disabled,
	      readonly: _vm.readonly
	    }],
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.toggle($event)
	      }
	    }
	  }, [(_vm.buttonStyle) ? [_vm._c('input', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.readonly),
	      expression: "!readonly"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.check),
	      expression: "check"
	    }],
	    ref: "input",
	    attrs: {
	      "type": "radio",
	      "autocomplete": "off",
	      "name": _vm.name,
	      "readonly": _vm.readonly,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.selectedValue,
	      "checked": _vm._q(_vm.check, _vm.selectedValue)
	    },
	    on: {
	      "click": function($event) {
	        _vm.check = _vm.selectedValue
	      }
	    }
	  }), _vm._v(" "), _vm._t("default")] : _vm._c('label', {
	    staticClass: "open"
	  }, [_vm._c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.check),
	      expression: "check"
	    }],
	    ref: "input",
	    attrs: {
	      "type": "radio",
	      "autocomplete": "off",
	      "name": _vm.name,
	      "readonly": _vm.readonly,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.selectedValue,
	      "checked": _vm._q(_vm.check, _vm.selectedValue)
	    },
	    on: {
	      "click": function($event) {
	        _vm.check = _vm.selectedValue
	      }
	    }
	  }), _vm._v(" "), _vm._c('span', {
	    staticClass: "icon dropdown-toggle",
	    "class": [_vm.active ? 'btn-' + _vm.typeColor : '', {
	      bg: _vm.typeColor === 'default'
	    }]
	  }), _vm._v(" "), (_vm.active && _vm.typeColor === 'default') ? _vm._c('span', {
	    staticClass: "icon"
	  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-74cfd92c", module.exports)
	  }
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(154)
	
	/* script */
	__vue_exports__ = __webpack_require__(156)
	
	/* template */
	var __vue_template__ = __webpack_require__(157)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Select.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-e514dbc6"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e514dbc6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e514dbc6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Select.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(155);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e514dbc6&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Select.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e514dbc6&scoped=true!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Select.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.form-control.dropdown-toggle[data-v-e514dbc6]{\r\n  height: auto;\r\n  padding-right: 24px;\n}\n.form-control.dropdown-toggle[data-v-e514dbc6]:after{\r\n  content: ' ';\r\n  position: absolute;\r\n  right: 13px;\r\n  top: 50%;\r\n  margin: -1px 0 0;\r\n  border-top: 4px dashed;\r\n  border-top: 4px solid \\9;\r\n  border-right: 4px solid transparent;\r\n  border-left: 4px solid transparent;\n}\n.bs-searchbox[data-v-e514dbc6] {\r\n  position: relative;\r\n  margin: 4px 8px;\n}\n.bs-searchbox .close[data-v-e514dbc6] {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\n}\n.bs-searchbox input[data-v-e514dbc6]:focus,\r\n.form-control.dropdown-toggle[data-v-e514dbc6]:focus {\r\n  outline: 0;\r\n  border-color: #66afe9 !important;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\n}\n.secret[data-v-e514dbc6] {\r\n  border: 0;\r\n  clip: rect(0 0 0 0);\r\n  height: 1px;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  padding: 0;\r\n  position: absolute;\r\n  width: 1px;\n}\n.form-control.dropdown-toggle>.close[data-v-e514dbc6] { margin-left: 5px;\n}\n.notify.out[data-v-e514dbc6] { position: relative;\n}\n.notify.in[data-v-e514dbc6],\r\n.notify>div[data-v-e514dbc6] {\r\n  position: absolute;\r\n  width: 96%;\r\n  margin: 0 2%;\r\n  min-height: 26px;\r\n  padding: 3px 5px;\r\n  background: #f5f5f5;\r\n  border: 1px solid #e3e3e3;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\r\n  pointer-events: none;\n}\n.notify>div[data-v-e514dbc6] {\r\n  top: 5px;\r\n  z-index: 1;\n}\n.notify.in[data-v-e514dbc6] {\r\n  opacity: .9;\r\n  bottom: 5px;\n}\n.btn-group-justified .dropdown-toggle>span[data-v-e514dbc6]:not(.close) {\r\n  width: calc(100% - 18px);\r\n  display: inline-block;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  margin-bottom: -4px;\n}\n.btn-group-justified .dropdown-menu[data-v-e514dbc6] { width: 100%;\n}\r\n", "", {"version":3,"sources":["/./src/Select.vue?68298c13"],"names":[],"mappings":";AAuQA;EACA,aAAA;EACA,oBAAA;CACA;AACA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;EACA,uBAAA;EACA,yBAAA;EACA,oCAAA;EACA,mCAAA;CACA;AACA;EACA,mBAAA;EACA,gBAAA;CACA;AACA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;;EAEA,WAAA;EACA,iCAAA;EACA,0EAAA;CACA;AACA;EACA,UAAA;EACA,oBAAA;EACA,YAAA;EACA,aAAA;EACA,iBAAA;EACA,WAAA;EACA,mBAAA;EACA,WAAA;CACA;AACA,wDAAA,iBAAA;CAAA;AACA,+BAAA,mBAAA;CAAA;AACA;;EAEA,mBAAA;EACA,WAAA;EACA,aAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,0BAAA;EACA,4CAAA;EACA,qBAAA;CACA;AACA;EACA,SAAA;EACA,WAAA;CACA;AACA;EACA,YAAA;EACA,YAAA;CACA;AACA;EACA,yBAAA;EACA,sBAAA;EACA,iBAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;CACA;AACA,uDAAA,YAAA;CAAA","file":"Select.vue","sourcesContent":["<template>\r\n  <div ref=\"select\" :class=\"classes\" v-click-outside=\"close\">\r\n    <div ref=\"btn\" class=\"form-control dropdown-toggle\" tabindex=\"1\" :disabled=\"disabled || !hasParent\" :readonly=\"readonly\"\r\n      @blur=\"canSearch ? null : close()\"\r\n      @click=\"toggle()\"\r\n      @keydown.esc.stop.prevent=\"close\"\r\n      @keydown.space.stop.prevent=\"toggle\"\r\n      @keydown.enter.stop.prevent=\"toggle\"\r\n    >\r\n      <span class=\"btn-content\" v-html=\"loading ? text.loading : showPlaceholder || (multiple && showCount ? selectedText : selected)\"></span>\r\n      <span v-if=\"clearButton&&values.length\" class=\"close\" @click=\"clear()\">&times;</span>\r\n    </div>\r\n    <select ref=\"sel\" v-model=\"val\" :name=\"name\" class=\"secret\" :multiple=\"multiple\" :required=\"required\" :readonly=\"readonly\" :disabled=\"disabled\">\r\n      <option v-if=\"required\" value=\"\"></option>\r\n      <option v-for=\"option in list\" :value=\"option[optionsValue]\">{{ option[optionsLabel] }}</option>\r\n    </select>\r\n    <ul class=\"dropdown-menu\">\r\n      <template v-if=\"list.length\">\r\n        <li v-if=\"canSearch\" class=\"bs-searchbox\">\r\n          <input type=\"text\" :placeholder=\"searchText||text.search\" class=\"form-control\" autocomplete=\"off\" ref=\"search\"\r\n            v-model=\"searchValue\"\r\n            @keyup.esc=\"close\"\r\n          />\r\n          <span v-show=\"searchValue\" class=\"close\" @click=\"clearSearch\">&times;</span>\r\n        </li>\r\n        <li v-if=\"required&&!clearButton\"><a @mousedown.prevent=\"clear() && close()\">{{ placeholder || text.notSelected }}</a></li>\r\n        <li v-for=\"option in filteredOptions\" :id=\"option[optionsValue]\">\r\n          <a @mousedown.prevent=\"select(option[optionsValue])\">\r\n            <span v-html=\"option[optionsLabel]\"></span>\r\n            <span class=\"glyphicon glyphicon-ok check-mark\" v-show=\"isSelected(option[optionsValue])\"></span>\r\n          </a>\r\n        </li>\r\n      </template>\r\n      <slot></slot>\r\n      <transition v-if=\"notify && !closeOnSelect\" name=\"fadein\"><div class=\"notify in\">{{limitText}}</div></transition>\r\n    </ul>\r\n    <transition v-if=\"notify && closeOnSelect\" name=\"fadein\"><div class=\"notify out\"><div>{{limitText}}</div></div></transition>\r\n    <!-- <pre>Options: {{list}}</pre> -->\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {translations} from './utils/utils.js'\r\nimport ClickOutside from './directives/ClickOutside.js'\r\n\r\nvar timeout = {}\r\nexport default {\r\n  directives: {\r\n    ClickOutside\r\n  },\r\n  props: {\r\n    clearButton: {type: Boolean, default: false},\r\n    closeOnSelect: {type: Boolean, default: false},\r\n    disabled: {type: Boolean, default: false},\r\n    lang: {type: String, default: navigator.language},\r\n    limit: {type: Number, default: 1024},\r\n    minSearch: {type: Number, default: 0},\r\n    multiple: {type: Boolean, default: false},\r\n    name: {type: String, default: null},\r\n    options: {type: Array, default () { return [] }},\r\n    optionsLabel: {type: String, default: 'label'},\r\n    optionsValue: {type: String, default: 'value'},\r\n    parent: {default: true},\r\n    placeholder: {type: String, default: null},\r\n    readonly: {type: Boolean, default: null},\r\n    required: {type: Boolean, default: null},\r\n    search: {type: Boolean, default: false},\r\n    searchText: {type: String, default: null},\r\n    countText: {type: String, default: null},\r\n    showCount: {type: Boolean, default: false},\r\n    url: {type: String, default: null},\r\n    value: null\r\n  },\r\n  data () {\r\n    return {\r\n      list: [],\r\n      loading: null,\r\n      searchValue: null,\r\n      show: false,\r\n      notify: false,\r\n      val: null,\r\n      valid: null\r\n    }\r\n  },\r\n  computed: {\r\n    canSearch () { return this.minSearch ? this.list.length >= this.minSearch : this.search },\r\n    classes () { return [{open: this.show, disabled: this.disabled}, this.class, this.isLi ? 'dropdown' : this.inInput ? 'input-group-btn' : 'btn-group'] },\r\n    filteredOptions () {\r\n      var search = (this.searchValue || '').toLowerCase()\r\n      return !search ? this.list : this.list.filter(el => {\r\n        return ~el[this.optionsLabel].toLowerCase().search(search)\r\n      })\r\n    },\r\n    hasParent () { return this.parent instanceof Array ? this.parent.length : this.parent },\r\n    inInput () { return this.$parent._input },\r\n    isLi () { return this.$parent._navbar || this.$parent.menu || this.$parent._tabset },\r\n    limitText () { return this.text.limit.replace('{{limit}}', this.limit) },\r\n    selected () {\r\n      if (this.list.length === 0) { return '' }\r\n      var sel = this.values.map(val => (this.list.find(o => o[this.optionsValue] === val) || {})[this.optionsLabel]).filter(val => val !== undefined)\r\n      this.$emit('selected', sel)\r\n      return sel.join(', ')\r\n    },\r\n    selectedText () { return this.countText || this.text.selected.replace('{{count}}', this.values.length) },\r\n    showPlaceholder () { return (this.values.length === 0 || !this.hasParent) ? (this.placeholder || this.text.notSelected) : null },\r\n    text () { return translations(this.lang) },\r\n    values () { return this.val instanceof Array ? this.val : ~[null, undefined].indexOf(this.val) ? [] : [this.val] },\r\n    valOptions () { return this.list.map(el => el[this.optionsValue]) }\r\n  },\r\n  watch: {\r\n    options (options) {\r\n      if (options instanceof Array) this.setOptions(options)\r\n    },\r\n    show (val) {\r\n      if (val) {\r\n        this.$refs.search ? this.$refs.search.focus() : this.$refs.btn.focus()\r\n        // onBlur(this.$refs.select, e => { this.show = false })\r\n      } else {\r\n        // offBlur(this.$refs.select)\r\n      }\r\n    },\r\n    url () {\r\n      this.urlChanged()\r\n    },\r\n    valid (val, old) {\r\n      this.$emit('isvalid', val)\r\n      this.$emit(!val ? 'invalid' : 'valid')\r\n      if (val !== old && this._parent) this._parent.validate()\r\n    },\r\n    value (val, old) {\r\n      if (val !== old) { this.val = val }\r\n    },\r\n    val (val, old) {\r\n      if (val === undefined) { this.val = val = null }\r\n      if (val !== old) {\r\n        this.$emit('change', val)\r\n        this.$emit('input', val)\r\n      }\r\n      if (val instanceof Array && val.length > this.limit) {\r\n        this.val = val.slice(0, this.limit)\r\n        this.notify = true\r\n        if (timeout.limit) clearTimeout(timeout.limit)\r\n        timeout.limit = setTimeout(() => {\r\n          timeout.limit = false\r\n          this.notify = false\r\n        }, 1500)\r\n      }\r\n      this.valid = this.validate()\r\n    }\r\n  },\r\n  methods: {\r\n    close () {\r\n      this.show = false\r\n    },\r\n    checkData () {\r\n      if (this.multiple) {\r\n        if (this.limit < 1) { this.limit = 1 }\r\n        if (!(this.val instanceof Array)) {\r\n          this.val = (this.val === null || this.val === undefined) ? [] : [this.val]\r\n        }\r\n        var values = this.valOptions\r\n        this.val = this.val.filter(el => ~values.indexOf(el))\r\n        if (this.values.length > this.limit) {\r\n          this.val = this.val.slice(0, this.limit)\r\n        }\r\n      } else {\r\n        if (!~this.valOptions.indexOf(this.val)) { this.val = null }\r\n      }\r\n    },\r\n    clear () {\r\n      if (this.disabled || this.readonly) { return }\r\n      this.val = this.val instanceof Array ? [] : null\r\n      this.toggle()\r\n    },\r\n    clearSearch () {\r\n      this.searchValue = ''\r\n      this.$refs.search.focus()\r\n    },\r\n    isSelected (v) {\r\n      return this.values.indexOf(v) > -1\r\n    },\r\n    select (v) {\r\n      if (this.val instanceof Array) {\r\n        var newVal = this.val.slice(0)\r\n        if (~newVal.indexOf(v)) {\r\n          newVal.splice(newVal.indexOf(v), 1)\r\n        } else {\r\n          newVal.push(v)\r\n        }\r\n        this.val = newVal\r\n        if (this.closeOnSelect) {\r\n          this.toggle()\r\n        }\r\n      } else {\r\n        this.val = v\r\n        this.toggle()\r\n      }\r\n    },\r\n    setOptions (options) {\r\n      this.list = options.map(el => {\r\n        if (el instanceof Object) { return el }\r\n        let obj = {}\r\n        obj[this.optionsLabel] = el\r\n        obj[this.optionsValue] = el\r\n        return obj\r\n      })\r\n      this.$emit('options', this.list)\r\n    },\r\n    toggle () {\r\n      if (this.disabled && !this.show) return;\r\n      this.show = !this.show\r\n      if (!this.show) this.$refs.btn.focus()\r\n    },\r\n    urlChanged () {\r\n      if (!this.url || !this.$http) { return }\r\n      this.loading = true\r\n      this.$http.get(this.url).then(response => {\r\n        var data = response.data instanceof Array ? response.data : []\r\n        try { data = JSON.parse(data) } catch (e) {}\r\n        this.setOptions(data)\r\n        this.loading = false\r\n        this.checkData()\r\n      }, response => {\r\n        this.loading = false\r\n      })\r\n    },\r\n    validate () {\r\n      return !this.required ? true : this.val instanceof Array ? this.val.length > 0 : this.val !== null\r\n    }\r\n  },\r\n  created () {\r\n    this.setOptions(this.options)\r\n    this.val = this.value\r\n    this._select = true\r\n    if (this.val === undefined || !this.parent) { this.val = null }\r\n    if (!this.multiple && this.val instanceof Array) {\r\n      this.val = this.val[0]\r\n    }\r\n    this.checkData()\r\n    if (this.url) this.urlChanged()\r\n    let parent = this.$parent\r\n    while (parent && !parent._formValidator) { parent = parent.$parent }\r\n    if (parent && parent._formValidator) {\r\n      parent.children.push(this)\r\n      this._parent = parent\r\n    }\r\n  },\r\n  mounted () {\r\n    if (this._parent) this._parent.children.push(this)\r\n    this.setOptions(this.options)\r\n    this.val = this.value\r\n    this.checkData()\r\n  },\r\n  beforeDestroy () {\r\n    if (this._parent) {\r\n      var index = this._parent.children.indexOf(this)\r\n      this._parent.children.splice(index, 1)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.form-control.dropdown-toggle{\r\n  height: auto;\r\n  padding-right: 24px;\r\n}\r\n.form-control.dropdown-toggle:after{\r\n  content: ' ';\r\n  position: absolute;\r\n  right: 13px;\r\n  top: 50%;\r\n  margin: -1px 0 0;\r\n  border-top: 4px dashed;\r\n  border-top: 4px solid \\9;\r\n  border-right: 4px solid transparent;\r\n  border-left: 4px solid transparent;\r\n}\r\n.bs-searchbox {\r\n  position: relative;\r\n  margin: 4px 8px;\r\n}\r\n.bs-searchbox .close {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n}\r\n.bs-searchbox input:focus,\r\n.form-control.dropdown-toggle:focus {\r\n  outline: 0;\r\n  border-color: #66afe9 !important;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);\r\n}\r\n.secret {\r\n  border: 0;\r\n  clip: rect(0 0 0 0);\r\n  height: 1px;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  padding: 0;\r\n  position: absolute;\r\n  width: 1px;\r\n}\r\n.form-control.dropdown-toggle>.close { margin-left: 5px;}\r\n.notify.out { position: relative; }\r\n.notify.in,\r\n.notify>div {\r\n  position: absolute;\r\n  width: 96%;\r\n  margin: 0 2%;\r\n  min-height: 26px;\r\n  padding: 3px 5px;\r\n  background: #f5f5f5;\r\n  border: 1px solid #e3e3e3;\r\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);\r\n  pointer-events: none;\r\n}\r\n.notify>div {\r\n  top: 5px;\r\n  z-index: 1;\r\n}\r\n.notify.in {\r\n  opacity: .9;\r\n  bottom: 5px;\r\n}\r\n.btn-group-justified .dropdown-toggle>span:not(.close) {\r\n  width: calc(100% - 18px);\r\n  display: inline-block;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  margin-bottom: -4px;\r\n}\r\n.btn-group-justified .dropdown-menu { width: 100%; }\r\n</style>\r\n\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var _ClickOutside = __webpack_require__(66);
	
	var _ClickOutside2 = _interopRequireDefault(_ClickOutside);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var timeout = {};
	exports["default"] = {
	  directives: {
	    ClickOutside: _ClickOutside2["default"]
	  },
	  props: {
	    clearButton: { type: Boolean, "default": false },
	    closeOnSelect: { type: Boolean, "default": false },
	    disabled: { type: Boolean, "default": false },
	    lang: { type: String, "default": navigator.language },
	    limit: { type: Number, "default": 1024 },
	    minSearch: { type: Number, "default": 0 },
	    multiple: { type: Boolean, "default": false },
	    name: { type: String, "default": null },
	    options: { type: Array, "default": function _default() {
	        return [];
	      }
	    },
	    optionsLabel: { type: String, "default": 'label' },
	    optionsValue: { type: String, "default": 'value' },
	    parent: { "default": true },
	    placeholder: { type: String, "default": null },
	    readonly: { type: Boolean, "default": null },
	    required: { type: Boolean, "default": null },
	    search: { type: Boolean, "default": false },
	    searchText: { type: String, "default": null },
	    countText: { type: String, "default": null },
	    showCount: { type: Boolean, "default": false },
	    url: { type: String, "default": null },
	    value: null
	  },
	  data: function data() {
	    return {
	      list: [],
	      loading: null,
	      searchValue: null,
	      show: false,
	      notify: false,
	      val: null,
	      valid: null
	    };
	  },
	
	  computed: {
	    canSearch: function canSearch() {
	      return this.minSearch ? this.list.length >= this.minSearch : this.search;
	    },
	    classes: function classes() {
	      return [{ open: this.show, disabled: this.disabled }, this["class"], this.isLi ? 'dropdown' : this.inInput ? 'input-group-btn' : 'btn-group'];
	    },
	    filteredOptions: function filteredOptions() {
	      var _this = this;
	
	      var search = (this.searchValue || '').toLowerCase();
	      return !search ? this.list : this.list.filter(function (el) {
	        return ~el[_this.optionsLabel].toLowerCase().search(search);
	      });
	    },
	    hasParent: function hasParent() {
	      return this.parent instanceof Array ? this.parent.length : this.parent;
	    },
	    inInput: function inInput() {
	      return this.$parent._input;
	    },
	    isLi: function isLi() {
	      return this.$parent._navbar || this.$parent.menu || this.$parent._tabset;
	    },
	    limitText: function limitText() {
	      return this.text.limit.replace('{{limit}}', this.limit);
	    },
	    selected: function selected() {
	      var _this2 = this;
	
	      if (this.list.length === 0) {
	        return '';
	      }
	      var sel = this.values.map(function (val) {
	        return (_this2.list.find(function (o) {
	          return o[_this2.optionsValue] === val;
	        }) || {})[_this2.optionsLabel];
	      }).filter(function (val) {
	        return val !== undefined;
	      });
	      this.$emit('selected', sel);
	      return sel.join(', ');
	    },
	    selectedText: function selectedText() {
	      return this.countText || this.text.selected.replace('{{count}}', this.values.length);
	    },
	    showPlaceholder: function showPlaceholder() {
	      return this.values.length === 0 || !this.hasParent ? this.placeholder || this.text.notSelected : null;
	    },
	    text: function text() {
	      return (0, _utils.translations)(this.lang);
	    },
	    values: function values() {
	      return this.val instanceof Array ? this.val : ~[null, undefined].indexOf(this.val) ? [] : [this.val];
	    },
	    valOptions: function valOptions() {
	      var _this3 = this;
	
	      return this.list.map(function (el) {
	        return el[_this3.optionsValue];
	      });
	    }
	  },
	  watch: {
	    options: function options(_options) {
	      if (_options instanceof Array) this.setOptions(_options);
	    },
	    show: function show(val) {
	      if (val) {
	        this.$refs.search ? this.$refs.search.focus() : this.$refs.btn.focus();
	        // onBlur(this.$refs.select, e => { this.show = false })
	      } else {
	          // offBlur(this.$refs.select)
	        }
	    },
	    url: function url() {
	      this.urlChanged();
	    },
	    valid: function valid(val, old) {
	      this.$emit('isvalid', val);
	      this.$emit(!val ? 'invalid' : 'valid');
	      if (val !== old && this._parent) this._parent.validate();
	    },
	    value: function value(val, old) {
	      if (val !== old) {
	        this.val = val;
	      }
	    },
	    val: function val(_val, old) {
	      var _this4 = this;
	
	      if (_val === undefined) {
	        this.val = _val = null;
	      }
	      if (_val !== old) {
	        this.$emit('change', _val);
	        this.$emit('input', _val);
	      }
	      if (_val instanceof Array && _val.length > this.limit) {
	        this.val = _val.slice(0, this.limit);
	        this.notify = true;
	        if (timeout.limit) clearTimeout(timeout.limit);
	        timeout.limit = setTimeout(function () {
	          timeout.limit = false;
	          _this4.notify = false;
	        }, 1500);
	      }
	      this.valid = this.validate();
	    }
	  },
	  methods: {
	    close: function close() {
	      this.show = false;
	    },
	    checkData: function checkData() {
	      if (this.multiple) {
	        if (this.limit < 1) {
	          this.limit = 1;
	        }
	        if (!(this.val instanceof Array)) {
	          this.val = this.val === null || this.val === undefined ? [] : [this.val];
	        }
	        var values = this.valOptions;
	        this.val = this.val.filter(function (el) {
	          return ~values.indexOf(el);
	        });
	        if (this.values.length > this.limit) {
	          this.val = this.val.slice(0, this.limit);
	        }
	      } else {
	        if (!~this.valOptions.indexOf(this.val)) {
	          this.val = null;
	        }
	      }
	    },
	    clear: function clear() {
	      if (this.disabled || this.readonly) {
	        return;
	      }
	      this.val = this.val instanceof Array ? [] : null;
	      this.toggle();
	    },
	    clearSearch: function clearSearch() {
	      this.searchValue = '';
	      this.$refs.search.focus();
	    },
	    isSelected: function isSelected(v) {
	      return this.values.indexOf(v) > -1;
	    },
	    select: function select(v) {
	      if (this.val instanceof Array) {
	        var newVal = this.val.slice(0);
	        if (~newVal.indexOf(v)) {
	          newVal.splice(newVal.indexOf(v), 1);
	        } else {
	          newVal.push(v);
	        }
	        this.val = newVal;
	        if (this.closeOnSelect) {
	          this.toggle();
	        }
	      } else {
	        this.val = v;
	        this.toggle();
	      }
	    },
	    setOptions: function setOptions(options) {
	      var _this5 = this;
	
	      this.list = options.map(function (el) {
	        if (el instanceof Object) {
	          return el;
	        }
	        var obj = {};
	        obj[_this5.optionsLabel] = el;
	        obj[_this5.optionsValue] = el;
	        return obj;
	      });
	      this.$emit('options', this.list);
	    },
	    toggle: function toggle() {
	      if (this.disabled && !this.show) return;
	      this.show = !this.show;
	      if (!this.show) this.$refs.btn.focus();
	    },
	    urlChanged: function urlChanged() {
	      var _this6 = this;
	
	      if (!this.url || !this.$http) {
	        return;
	      }
	      this.loading = true;
	      this.$http.get(this.url).then(function (response) {
	        var data = response.data instanceof Array ? response.data : [];
	        try {
	          data = JSON.parse(data);
	        } catch (e) {}
	        _this6.setOptions(data);
	        _this6.loading = false;
	        _this6.checkData();
	      }, function (response) {
	        _this6.loading = false;
	      });
	    },
	    validate: function validate() {
	      return !this.required ? true : this.val instanceof Array ? this.val.length > 0 : this.val !== null;
	    }
	  },
	  created: function created() {
	    this.setOptions(this.options);
	    this.val = this.value;
	    this._select = true;
	    if (this.val === undefined || !this.parent) {
	      this.val = null;
	    }
	    if (!this.multiple && this.val instanceof Array) {
	      this.val = this.val[0];
	    }
	    this.checkData();
	    if (this.url) this.urlChanged();
	    var parent = this.$parent;
	    while (parent && !parent._formValidator) {
	      parent = parent.$parent;
	    }
	    if (parent && parent._formValidator) {
	      parent.children.push(this);
	      this._parent = parent;
	    }
	  },
	  mounted: function mounted() {
	    if (this._parent) this._parent.children.push(this);
	    this.setOptions(this.options);
	    this.val = this.value;
	    this.checkData();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._parent) {
	      var index = this._parent.children.indexOf(this);
	      this._parent.children.splice(index, 1);
	    }
	  }
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    directives: [{
	      name: "click-outside",
	      rawName: "v-click-outside",
	      value: (_vm.close),
	      expression: "close"
	    }],
	    ref: "select",
	    "class": _vm.classes
	  }, [_vm._c('div', {
	    ref: "btn",
	    staticClass: "form-control dropdown-toggle",
	    attrs: {
	      "tabindex": "1",
	      "disabled": _vm.disabled || !_vm.hasParent,
	      "readonly": _vm.readonly
	    },
	    on: {
	      "blur": function($event) {
	        _vm.canSearch ? null : _vm.close()
	      },
	      "click": function($event) {
	        _vm.toggle()
	      },
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        $event.stopPropagation();
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "space", 32)) { return; }
	        $event.stopPropagation();
	        $event.preventDefault();
	        _vm.toggle($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        $event.stopPropagation();
	        $event.preventDefault();
	        _vm.toggle($event)
	      }]
	    }
	  }, [_vm._c('span', {
	    staticClass: "btn-content",
	    domProps: {
	      "innerHTML": _vm._s(_vm.loading ? _vm.text.loading : _vm.showPlaceholder || (_vm.multiple && _vm.showCount ? _vm.selectedText : _vm.selected))
	    }
	  }), _vm._v(" "), (_vm.clearButton && _vm.values.length) ? _vm._c('span', {
	    staticClass: "close",
	    on: {
	      "click": function($event) {
	        _vm.clear()
	      }
	    }
	  }, [_vm._v("×")]) : _vm._e()]), _vm._v(" "), _vm._c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    ref: "sel",
	    staticClass: "secret",
	    attrs: {
	      "name": _vm.name,
	      "multiple": _vm.multiple,
	      "required": _vm.required,
	      "readonly": _vm.readonly,
	      "disabled": _vm.disabled
	    },
	    on: {
	      "change": function($event) {
	        _vm.val = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [(_vm.required) ? _vm._c('option', {
	    attrs: {
	      "value": ""
	    }
	  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.list), function(option) {
	    return _vm._c('option', {
	      domProps: {
	        "value": option[_vm.optionsValue]
	      }
	    }, [_vm._v(_vm._s(option[_vm.optionsLabel]))])
	  })], 2), _vm._v(" "), _vm._c('ul', {
	    staticClass: "dropdown-menu"
	  }, [(_vm.list.length) ? [(_vm.canSearch) ? _vm._c('li', {
	    staticClass: "bs-searchbox"
	  }, [_vm._c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.searchValue),
	      expression: "searchValue"
	    }],
	    ref: "search",
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.searchText || _vm.text.search,
	      "autocomplete": "off"
	    },
	    domProps: {
	      "value": _vm._s(_vm.searchValue)
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.close($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.searchValue = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _vm._c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.searchValue),
	      expression: "searchValue"
	    }],
	    staticClass: "close",
	    on: {
	      "click": _vm.clearSearch
	    }
	  }, [_vm._v("×")])]) : _vm._e(), _vm._v(" "), (_vm.required && !_vm.clearButton) ? _vm._c('li', [_vm._c('a', {
	    on: {
	      "mousedown": function($event) {
	        $event.preventDefault();
	        _vm.clear() && _vm.close()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.placeholder || _vm.text.notSelected))])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredOptions), function(option) {
	    return _vm._c('li', {
	      attrs: {
	        "id": option[_vm.optionsValue]
	      }
	    }, [_vm._c('a', {
	      on: {
	        "mousedown": function($event) {
	          $event.preventDefault();
	          _vm.select(option[_vm.optionsValue])
	        }
	      }
	    }, [_vm._c('span', {
	      domProps: {
	        "innerHTML": _vm._s(option[_vm.optionsLabel])
	      }
	    }), _vm._v(" "), _vm._c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.isSelected(option[_vm.optionsValue])),
	        expression: "isSelected(option[optionsValue])"
	      }],
	      staticClass: "glyphicon glyphicon-ok check-mark"
	    })])])
	  })] : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.notify && !_vm.closeOnSelect) ? _vm._c('transition', {
	    attrs: {
	      "name": "fadein"
	    }
	  }, [_vm._c('div', {
	    staticClass: "notify in"
	  }, [_vm._v(_vm._s(_vm.limitText))])]) : _vm._e()], 2), _vm._v(" "), (_vm.notify && _vm.closeOnSelect) ? _vm._c('transition', {
	    attrs: {
	      "name": "fadein"
	    }
	  }, [_vm._c('div', {
	    staticClass: "notify out"
	  }, [_vm._c('div', [_vm._v(_vm._s(_vm.limitText))])])]) : _vm._e()], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e514dbc6", module.exports)
	  }
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(159)
	
	/* template */
	var __vue_template__ = __webpack_require__(160)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Slider.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-32185b82", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-32185b82", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Slider.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 159 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	
	exports["default"] = {
	  computed: {
	    index: function index() {
	      return this.$parent.$children.indexOf(this);
	    },
	    show: function show() {
	      return this.$parent.index === this.index;
	    }
	  },
	  mounted: function mounted() {
	    if (this.$parent.indicator_list) {
	      this.$parent.indicator_list.push(this.index);
	    }
	
	    if (this.index === 0) {
	      this.$el.classList.add('active');
	    }
	  }
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    staticClass: "item"
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-32185b82", module.exports)
	  }
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(162)
	
	/* script */
	__vue_exports__ = __webpack_require__(164)
	
	/* template */
	var __vue_template__ = __webpack_require__(165)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Spinner.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8b298e70", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8b298e70", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Spinner.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(163);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8b298e70!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Spinner.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8b298e70!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Spinner.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n@keyframes spin {\n100% {\r\n    transform: rotate(360deg);\n}\n}\n.spinner-gritcode {\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  z-index: 9998;\r\n  position: absolute;\r\n  width: 100%;\r\n  text-align: center;\r\n  background: rgba(255, 255, 255, 0.9);\n}\n.spinner-gritcode.spinner-fixed {\r\n  position: fixed;\n}\n.spinner-gritcode .spinner-wrapper {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  -ms-transform: translate(-50%, -50%);\n}\n.spinner-gritcode .spinner-circle {\r\n  position: relative;\r\n  border: 4px solid #ccc;\r\n  border-right-color: #337ab7;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  animation: spin 0.6s linear;\r\n  animation-iteration-count: infinite;\r\n  width: 3em;\r\n  height: 3em;\r\n  z-index: 2;\n}\n.spinner-gritcode .spinner-text {\r\n  position: relative;\r\n  text-align: center;\r\n  margin-top: 0.5em;\r\n  z-index: 2;\r\n  width: 100%;\r\n  font-size: 95%;\r\n  color: #337ab7;\n}\n.spinner-gritcode.spinner-sm .spinner-circle {\r\n  width: 1.5em;\r\n  height: 1.5em;\n}\n.spinner-gritcode.spinner-md .spinner-circle {\r\n  width: 2em;\r\n  height: 2em;\n}\n.spinner-gritcode.spinner-lg .spinner-circle {\r\n  width: 2.5em;\r\n  height: 2.5em;\n}\n.spinner-gritcode.spinner-xl .spinner-circle {\r\n  width: 3.5em;\r\n  height: 3.5em;\n}\n.lt-ie10 .spinner-gritcode .spinner-circle,\r\n.ie9 .spinner-gritcode .spinner-circle,\r\n.oldie .spinner-gritcode .spinner-circle,\r\n.no-csstransitions .spinner-gritcode .spinner-circle,\r\n.no-csstransforms3d .spinner-gritcode .spinner-circle {\r\n  background: url(\"http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif\") center center no-repeat;\r\n  animation: none;\r\n  margin-left: 0;\r\n  margin-top: 5px;\r\n  border: none;\r\n  width: 32px;\r\n  height: 32px;\n}\r\n", "", {"version":3,"sources":["/./src/Spinner.vue?65fc5a8f"],"names":[],"mappings":";AA2FA;AACA;IACA,0BAAA;CACA;CACA;AACA;EACA,OAAA;EACA,QAAA;EACA,UAAA;EACA,SAAA;EACA,cAAA;EACA,mBAAA;EACA,YAAA;EACA,mBAAA;EACA,qCAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,mBAAA;EACA,SAAA;EACA,UAAA;EACA,iCAAA;EACA,qCAAA;CACA;AACA;EACA,mBAAA;EACA,uBAAA;EACA,4BAAA;EACA,mBAAA;EACA,sBAAA;EACA,4BAAA;EACA,oCAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;CACA;AACA;EACA,mBAAA;EACA,mBAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;CACA;AACA;EACA,aAAA;EACA,cAAA;CACA;AACA;EACA,WAAA;EACA,YAAA;CACA;AACA;EACA,aAAA;EACA,cAAA;CACA;AACA;EACA,aAAA;EACA,cAAA;CACA;AACA;;;;;EAKA,6IAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,aAAA;EACA,YAAA;EACA,aAAA;CACA","file":"Spinner.vue","sourcesContent":["<template>\r\n  <div :class=\"['spinner spinner-gritcode',spinnerSize,{'spinner-fixed':fixed}]\" v-show=\"active||locked\">\r\n    <div class=\"spinner-wrapper\">\r\n      <div class=\"spinner-circle\"></div>\r\n      <div class=\"spinner-text\">{{text}}</div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {coerce, delayer} from './utils/utils.js'\r\nconst MIN_WAIT = 500 // in ms\r\n\r\nexport default {\r\n  props: {\r\n    fixed: {type: Boolean, default: false},\r\n    global: {type: Boolean, default: false},\r\n    size: {type: String, default: 'md'},\r\n    text: {type: String, default: ''},\r\n    value: {default: false}\r\n  },\r\n  data () {\r\n    return {\r\n      active: this.value,\r\n      locked: false\r\n    }\r\n  },\r\n  computed: {\r\n    spinnerSize () { return 'spinner-' + (this.size ? this.size : 'sm') }\r\n  },\r\n  watch: {\r\n    active (val, old) {\r\n      if (val !== old) this.$emit('input', val)\r\n    },\r\n    value (val, old) {\r\n      if (val !== old) { this[val ? 'show' : 'hide']() }\r\n    }\r\n  },\r\n  methods: {\r\n    hide () {\r\n      var delay = 0\r\n      this.active = false\r\n    },\r\n    show (options) {\r\n      if (options) {\r\n        if (options.text) { this.text = options.text }\r\n        if (options.size) { this.size = options.size }\r\n        if (options.fixed) { this.fixed = options.fixed }\r\n      }\r\n      // block scrolling when spinner is on\r\n      this._body.style.overflowY = 'hidden'\r\n      // activate spinner\r\n      this._started = new Date()\r\n      this.active = true\r\n      this.locked = true\r\n      this._unlock()\r\n    }\r\n  },\r\n  created () {\r\n    this._body = document.body\r\n    this._bodyOverflow = document.body.style.overflowY\r\n    this._unlock = delayer(function () {\r\n      this.locked = false\r\n      this._body.style.overflowY = this._bodyOverflow\r\n    }, MIN_WAIT)\r\n    if (this.global) {\r\n      if (!this.$root._globalSpinner) {\r\n        this.$root._globalSpinner = true\r\n        var self = this\r\n        this._global = {\r\n          hide () { self.hide() },\r\n          show () { self.show() }\r\n        }\r\n        this.$root.$on('spinner::show', this._global.show)\r\n        this.$root.$on('spinner::hide', this._global.hide)\r\n      }\r\n    }\r\n  },\r\n  beforeDestroy () {\r\n    if (this._global) {\r\n      this.$root.$off('spinner::show', this._global.show)\r\n      this.$root.$off('spinner::hide', this._global.hide)\r\n      delete this.$root._globalSpinner\r\n    }\r\n    clearTimeout(this._spinnerAnimation)\r\n    this._body.style.overflowY = this._bodyOverflow\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n@keyframes spin {\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n.spinner-gritcode {\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  z-index: 9998;\r\n  position: absolute;\r\n  width: 100%;\r\n  text-align: center;\r\n  background: rgba(255, 255, 255, 0.9);\r\n}\r\n.spinner-gritcode.spinner-fixed {\r\n  position: fixed;\r\n}\r\n.spinner-gritcode .spinner-wrapper {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  -ms-transform: translate(-50%, -50%);\r\n}\r\n.spinner-gritcode .spinner-circle {\r\n  position: relative;\r\n  border: 4px solid #ccc;\r\n  border-right-color: #337ab7;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  animation: spin 0.6s linear;\r\n  animation-iteration-count: infinite;\r\n  width: 3em;\r\n  height: 3em;\r\n  z-index: 2;\r\n}\r\n.spinner-gritcode .spinner-text {\r\n  position: relative;\r\n  text-align: center;\r\n  margin-top: 0.5em;\r\n  z-index: 2;\r\n  width: 100%;\r\n  font-size: 95%;\r\n  color: #337ab7;\r\n}\r\n.spinner-gritcode.spinner-sm .spinner-circle {\r\n  width: 1.5em;\r\n  height: 1.5em;\r\n}\r\n.spinner-gritcode.spinner-md .spinner-circle {\r\n  width: 2em;\r\n  height: 2em;\r\n}\r\n.spinner-gritcode.spinner-lg .spinner-circle {\r\n  width: 2.5em;\r\n  height: 2.5em;\r\n}\r\n.spinner-gritcode.spinner-xl .spinner-circle {\r\n  width: 3.5em;\r\n  height: 3.5em;\r\n}\r\n.lt-ie10 .spinner-gritcode .spinner-circle,\r\n.ie9 .spinner-gritcode .spinner-circle,\r\n.oldie .spinner-gritcode .spinner-circle,\r\n.no-csstransitions .spinner-gritcode .spinner-circle,\r\n.no-csstransforms3d .spinner-gritcode .spinner-circle {\r\n  background: url(\"http://i2.wp.com/www.thegreatnovelingadventure.com/wp-content/plugins/wp-polls/images/loading.gif\") center center no-repeat;\r\n  animation: none;\r\n  margin-left: 0;\r\n  margin-top: 5px;\r\n  border: none;\r\n  width: 32px;\r\n  height: 32px;\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var MIN_WAIT = 500; // in ms
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    fixed: { type: Boolean, "default": false },
	    global: { type: Boolean, "default": false },
	    size: { type: String, "default": 'md' },
	    text: { type: String, "default": '' },
	    value: { "default": false }
	  },
	  data: function data() {
	    return {
	      active: this.value,
	      locked: false
	    };
	  },
	
	  computed: {
	    spinnerSize: function spinnerSize() {
	      return 'spinner-' + (this.size ? this.size : 'sm');
	    }
	  },
	  watch: {
	    active: function active(val, old) {
	      if (val !== old) this.$emit('input', val);
	    },
	    value: function value(val, old) {
	      if (val !== old) {
	        this[val ? 'show' : 'hide']();
	      }
	    }
	  },
	  methods: {
	    hide: function hide() {
	      var delay = 0;
	      this.active = false;
	    },
	    show: function show(options) {
	      if (options) {
	        if (options.text) {
	          this.text = options.text;
	        }
	        if (options.size) {
	          this.size = options.size;
	        }
	        if (options.fixed) {
	          this.fixed = options.fixed;
	        }
	      }
	      // block scrolling when spinner is on
	      this._body.style.overflowY = 'hidden';
	      // activate spinner
	      this._started = new Date();
	      this.active = true;
	      this.locked = true;
	      this._unlock();
	    }
	  },
	  created: function created() {
	    this._body = document.body;
	    this._bodyOverflow = document.body.style.overflowY;
	    this._unlock = (0, _utils.delayer)(function () {
	      this.locked = false;
	      this._body.style.overflowY = this._bodyOverflow;
	    }, MIN_WAIT);
	    if (this.global) {
	      if (!this.$root._globalSpinner) {
	        this.$root._globalSpinner = true;
	        var self = this;
	        this._global = {
	          hide: function hide() {
	            self.hide();
	          },
	          show: function show() {
	            self.show();
	          }
	        };
	        this.$root.$on('spinner::show', this._global.show);
	        this.$root.$on('spinner::hide', this._global.hide);
	      }
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._global) {
	      this.$root.$off('spinner::show', this._global.show);
	      this.$root.$off('spinner::hide', this._global.hide);
	      delete this.$root._globalSpinner;
	    }
	    clearTimeout(this._spinnerAnimation);
	    this._body.style.overflowY = this._bodyOverflow;
	  }
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.active || _vm.locked),
	      expression: "active||locked"
	    }],
	    "class": ['spinner spinner-gritcode', _vm.spinnerSize, {
	      'spinner-fixed': _vm.fixed
	    }]
	  }, [_vm._c('div', {
	    staticClass: "spinner-wrapper"
	  }, [_vm._c('div', {
	    staticClass: "spinner-circle"
	  }), _vm._v(" "), _vm._c('div', {
	    staticClass: "spinner-text"
	  }, [_vm._v(_vm._s(_vm.text))])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8b298e70", module.exports)
	  }
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(167)
	
	/* template */
	var __vue_template__ = __webpack_require__(168)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Tab.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0985e878", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0985e878", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Tab.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    disabled: { type: Boolean, "default": false },
	    header: { type: String }
	  },
	  data: function data() {
	    return {
	      fadein: false
	    };
	  },
	
	  computed: {
	    active: function active() {
	      var _this = this;
	
	      var active = !this._tabs || this._tabs.show === this;
	      this.fadein = false;
	      if (active) {
	        setTimeout(function () {
	          _this.fadein = true;
	        }, 0);
	      }
	      return active;
	    },
	    index: function index() {
	      return this._tabs.tabs.indexOf(this);
	    },
	    transition: function transition() {
	      return this._tabs ? this._tabs.effect : null;
	    }
	  },
	  created: function created() {
	    this._isTab = true;
	    var tabs = this;
	    while (!this._tabs && tabs.$parent) {
	      if (tabs._isTabGroup) {
	        tabs.tabs.push(this);
	        this._tabGroup = tabs;
	      }
	      if (tabs._isTabs) {
	        tabs.tabs.push(this);
	        this._tabs = tabs;
	        if (!this._tabGroup) tabs.headers.push(this);
	      }
	      tabs = tabs.$parent;
	    }
	    if (!this._tabs) throw Error('tab depend on tabs.');
	  },
	  beforeDestroy: function beforeDestroy() {
	    var _this2 = this;
	
	    if (this._tabGroup) {
	      this._tabGroup.tabs = this._tabGroup.tabs.filter(function (el) {
	        return el !== _this2;
	      });
	    }
	    if (this._tabs) {
	      this._tabs.tabs = this._tabs.tabs.filter(function (el) {
	        return el !== _this2;
	      });
	    }
	    if (this._tabs) {
	      if (this._tabs.active === this.index) {
	        this._tabs.index = 0;
	      }
	      if (this._ingroup) {
	        var id = this.$parent.tabs.indexOf(this);
	        if (~id) this.$parent.tabs.splice(id, 1);
	      }
	    }
	    if (this._tabs) {
	      var _id = this._tabs.tabs.indexOf(this);
	      if (~_id) this._tabs.tabs.splice(_id, 1);
	    }
	  }
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    ref: "panel",
	    "class": ['tab-pane', {
	      'active fade': _vm.active,
	      'in': _vm.fadein
	    }],
	    attrs: {
	      "role": "tabpanel"
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0985e878", module.exports)
	  }
	}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(170)
	
	/* script */
	__vue_exports__ = __webpack_require__(172)
	
	/* template */
	var __vue_template__ = __webpack_require__(173)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\TabGroup.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-55faf3cb", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-55faf3cb", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] TabGroup.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(171);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-55faf3cb!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TabGroup.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-55faf3cb!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TabGroup.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tab-content .tab-pane { display: none;\n}\n.tab-content .tab-pane.active { display: block;\n}\r\n", "", {"version":3,"sources":["/./src/TabGroup.vue?22ae1c08"],"names":[],"mappings":";AAkCA,yBAAA,cAAA;CAAA;AACA,gCAAA,eAAA;CAAA","file":"TabGroup.vue","sourcesContent":["<template><span><slot></slot></span></template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    disabled: {type: Boolean, default: false},\r\n    header: {type: String}\r\n  },\r\n  data () {\r\n    return {\r\n      show: false,\r\n      tabs: []\r\n    }\r\n  },\r\n  computed: {\r\n    active () { return ~this.tabs.indexOf(this._tabs.show) }\r\n  },\r\n  methods: {\r\n    blur () { this.show = false },\r\n    toggle () { this.show = !this.show }\r\n  },\r\n  created () {\r\n    this._isTabGroup = true\r\n    if (this.$parent) {\r\n      if (this.$parent._isTabGroup) throw Error('Can\\'t nest tab-groups.')\r\n      if (!this.$parent._isTabs) throw Error('tab-group depend on tabs.')\r\n    }\r\n    this._tabs = this.$parent\r\n    this._tabs.headers.push(this)\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.tab-content .tab-pane { display: none; }\r\n.tab-content .tab-pane.active { display: block; }\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 172 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	
	exports["default"] = {
	  props: {
	    disabled: { type: Boolean, "default": false },
	    header: { type: String }
	  },
	  data: function data() {
	    return {
	      show: false,
	      tabs: []
	    };
	  },
	
	  computed: {
	    active: function active() {
	      return ~this.tabs.indexOf(this._tabs.show);
	    }
	  },
	  methods: {
	    blur: function blur() {
	      this.show = false;
	    },
	    toggle: function toggle() {
	      this.show = !this.show;
	    }
	  },
	  created: function created() {
	    this._isTabGroup = true;
	    if (this.$parent) {
	      if (this.$parent._isTabGroup) throw Error('Can\'t nest tab-groups.');
	      if (!this.$parent._isTabs) throw Error('tab-group depend on tabs.');
	    }
	    this._tabs = this.$parent;
	    this._tabs.headers.push(this);
	  }
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('span', [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-55faf3cb", module.exports)
	  }
	}

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(175)
	
	/* script */
	__vue_exports__ = __webpack_require__(177)
	
	/* template */
	var __vue_template__ = __webpack_require__(178)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Tabs.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-70100ddf", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-70100ddf", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Tabs.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(176);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-70100ddf!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tabs.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-70100ddf!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tabs.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n[tabs] > .tab-content {\r\n  margin: 15px 0;\n}\r\n", "", {"version":3,"sources":["/./src/Tabs.vue?4317b9af"],"names":[],"mappings":";AA0EA;EACA,eAAA;CACA","file":"Tabs.vue","sourcesContent":["<template>\r\n  <div tabs>\r\n    <ul :class=\"navStyleClass\" role=\"tablist\">\r\n      <template v-for=\"header in headers\">\r\n        <li v-if=\"header._isTab\" :class=\"{active:header.active, disabled:header.disabled}\" @click.prevent=\"select(header)\">\r\n          <slot name=\"header\"><a href=\"#\" v-html=\"header.header\"></a></slot>\r\n        </li>\r\n        <dropdown v-if=\"header._isTabGroup\" :text=\"header.header\" :class=\"{active:header.active}\" :disabled=\"header.disabled\">\r\n          <li v-for=\"tab in header.tabs\" :class=\"{disabled:tab.disabled}\"><a href=\"#\" @click.prevent=\"select(tab)\">{{tab.header}}</a></li>\r\n        </dropdown>\r\n      </template>\r\n    </ul>\r\n    <div class=\"tab-content\"><slot></slot></div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {coerce} from './utils/utils.js'\r\nimport dropdown from './Dropdown.vue'\r\n\r\nexport default {\r\n  components: {\r\n    dropdown\r\n  },\r\n  props: {\r\n    // effect: {type: String, default: 'fadein'},\r\n    justified: false,\r\n    navStyle: {type: String, default: null},\r\n    value: {type: Number, default: 0}\r\n  },\r\n  data () {\r\n    var index = this.value || 0\r\n    return {\r\n      index,\r\n      headers: [],\r\n      tabs: []\r\n    }\r\n  },\r\n  watch: {\r\n    index (val) {\r\n      this.$emit('active', val)\r\n      this.$emit('input', val)\r\n    },\r\n    value (val) {\r\n      this.index = val\r\n    }\r\n  },\r\n  computed: {\r\n    navStyleClass () {\r\n      return [\r\n        'nav',\r\n        ~['pills', 'stacked'].indexOf(this.navStyle) ? 'nav-' + this.navStyle : 'nav-tabs',\r\n        {\r\n          'nav-justified': coerce.boolean(this.justified),\r\n          'nav-pills': this.navStyle === 'stacked'\r\n        }\r\n      ]\r\n    },\r\n    show () { return this.tabs[this.index] || this.tabs[0] }\r\n  },\r\n  methods: {\r\n    select (tab) {\r\n      if (!tab.disabled) {\r\n        this.index = this.tabs.indexOf(tab)\r\n      }\r\n    }\r\n  },\r\n  created () {\r\n    this._isTabs = true\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n[tabs] > .tab-content {\r\n  margin: 15px 0;\r\n}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	var _Dropdown = __webpack_require__(105);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  components: {
	    dropdown: _Dropdown2["default"]
	  },
	  props: {
	    // effect: {type: String, default: 'fadein'},
	    justified: false,
	    navStyle: { type: String, "default": null },
	    value: { type: Number, "default": 0 }
	  },
	  data: function data() {
	    var index = this.value || 0;
	    return {
	      index: index,
	      headers: [],
	      tabs: []
	    };
	  },
	
	  watch: {
	    index: function index(val) {
	      this.$emit('active', val);
	      this.$emit('input', val);
	    },
	    value: function value(val) {
	      this.index = val;
	    }
	  },
	  computed: {
	    navStyleClass: function navStyleClass() {
	      return ['nav', ~['pills', 'stacked'].indexOf(this.navStyle) ? 'nav-' + this.navStyle : 'nav-tabs', {
	        'nav-justified': _utils.coerce["boolean"](this.justified),
	        'nav-pills': this.navStyle === 'stacked'
	      }];
	    },
	    show: function show() {
	      return this.tabs[this.index] || this.tabs[0];
	    }
	  },
	  methods: {
	    select: function select(tab) {
	      if (!tab.disabled) {
	        this.index = this.tabs.indexOf(tab);
	      }
	    }
	  },
	  created: function created() {
	    this._isTabs = true;
	  }
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    attrs: {
	      "tabs": ""
	    }
	  }, [_vm._c('ul', {
	    "class": _vm.navStyleClass,
	    attrs: {
	      "role": "tablist"
	    }
	  }, [_vm._l((_vm.headers), function(header) {
	    return [(header._isTab) ? _vm._c('li', {
	      "class": {
	        active: header.active, disabled: header.disabled
	      },
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          _vm.select(header)
	        }
	      }
	    }, [_vm._t("header", [_vm._c('a', {
	      attrs: {
	        "href": "#"
	      },
	      domProps: {
	        "innerHTML": _vm._s(header.header)
	      }
	    })])], 2) : _vm._e(), _vm._v(" "), (header._isTabGroup) ? _vm._c('dropdown', {
	      "class": {
	        active: header.active
	      },
	      attrs: {
	        "text": header.header,
	        "disabled": header.disabled
	      }
	    }, _vm._l((header.tabs), function(tab) {
	      return _vm._c('li', {
	        "class": {
	          disabled: tab.disabled
	        }
	      }, [_vm._c('a', {
	        attrs: {
	          "href": "#"
	        },
	        on: {
	          "click": function($event) {
	            $event.preventDefault();
	            _vm.select(tab)
	          }
	        }
	      }, [_vm._v(_vm._s(tab.header))])])
	    })) : _vm._e()]
	  })], 2), _vm._v(" "), _vm._c('div', {
	    staticClass: "tab-content"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-70100ddf", module.exports)
	  }
	}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(180)
	
	/* template */
	var __vue_template__ = __webpack_require__(181)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\ToggleButton.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f034a5f2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f034a5f2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] ToggleButton.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(65);
	
	exports["default"] = {
	  props: {
	    disabled: { "default": null },
	    falseType: { "default": null },
	    name: null,
	    readonly: { "default": null },
	    trueType: { "default": 'primary' },
	    value: false
	  },
	  data: function data() {
	    return {
	      active: _utils.coerce["boolean"](this.value),
	      types: {
	        danger: 'btn-danger',
	        info: 'btn-info',
	        primary: 'btn-primary',
	        success: 'btn-success',
	        warning: 'btn-warning'
	      }
	    };
	  },
	
	  watch: {
	    active: function active(val, old) {
	      if (val !== old) {
	        this.$emit('changed', val);
	        this.$emit(val ? 'enabled' : 'disabled');
	        this.$emit('input', val);
	      }
	    },
	    value: function value(val, old) {
	      if (val !== old) {
	        this.active = _utils.coerce["boolean"](this.value);
	      }
	    }
	  },
	  computed: {
	    boolDisabled: function boolDisabled() {
	      return _utils.coerce["boolean"](this.disabled);
	    },
	    boolReadonly: function boolReadonly() {
	      return _utils.coerce["boolean"](this.readonly);
	    },
	    type: function type() {
	      return this.types[this.value ? this.trueType : this.falseType] || 'btn-default';
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      if (this.boolDisabled || this.boolReadonly) {
	        return;
	      }
	      this.active = !this.active;
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('a', {
	    "class": ['btn', _vm.type, {
	      readonly: _vm.boolReadonly
	    }],
	    attrs: {
	      "href": "javascript:void(0)",
	      "disabled": _vm.boolDisabled
	    },
	    on: {
	      "click": _vm.toggle
	    }
	  }, [_vm._c('span', {
	    "class": ['glyphicon', 'glyphicon-' + (_vm.value ? 'ok' : 'remove')]
	  }), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.name) ? _vm._c('input', {
	    attrs: {
	      "type": "hidden",
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.active ? 1 : 0
	    }
	  }) : _vm._e()], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f034a5f2", module.exports)
	  }
	}

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(183)
	
	/* script */
	__vue_exports__ = __webpack_require__(185)
	
	/* template */
	var __vue_template__ = __webpack_require__(186)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Tooltip.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-48fb51b2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-48fb51b2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Tooltip.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(184);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-48fb51b2!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tooltip.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-48fb51b2!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tooltip.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.tooltip.top,\r\n.tooltip.left,\r\n.tooltip.right,\r\n.tooltip.bottom {\r\n  opacity: .9;\n}\n.fadein-enter {\r\n  animation:fadein-in 0.3s ease-in;\n}\n.fadein-leave-active {\r\n  animation:fadein-out 0.3s ease-out;\n}\n@keyframes fadein-in {\n0% {\r\n    opacity: 0;\n}\n100% {\r\n    opacity: .9;\n}\n}\n@keyframes fadein-out {\n0% {\r\n    opacity: .9;\n}\n100% {\r\n    opacity: 0;\n}\n}\r\n", "", {"version":3,"sources":["/./src/Tooltip.vue?37d183ec"],"names":[],"mappings":";AA2BA;;;;EAIA,YAAA;CACA;AACA;EACA,iCAAA;CACA;AACA;EACA,mCAAA;CACA;AACA;AACA;IACA,WAAA;CACA;AACA;IACA,YAAA;CACA;CACA;AACA;AACA;IACA,YAAA;CACA;AACA;IACA,WAAA;CACA;CACA","file":"Tooltip.vue","sourcesContent":["<template>\r\n  <span ref=\"trigger\">\r\n    <slot></slot>\r\n    <transition :name=\"effect\">\r\n      <div ref=\"popover\" v-if=\"show\" :class=\"['tooltip',placement]\">\r\n        <div class=\"tooltip-arrow\"></div>\r\n        <div class=\"tooltip-inner\">\r\n          <slot name=\"content\"><div v-html=\"content\"></div></slot>\r\n        </div>\r\n      </div>\r\n    </transition>\r\n  </span>\r\n</template>\r\n\r\n<script>\r\nimport PopoverMixin from './utils/popoverMixins.js'\r\n\r\nexport default {\r\n  mixins: [PopoverMixin],\r\n  props: {\r\n    effect: {type: String, default: 'scale'},\r\n    trigger: {type: String, default: 'hover'}\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.tooltip.top,\r\n.tooltip.left,\r\n.tooltip.right,\r\n.tooltip.bottom {\r\n  opacity: .9;\r\n}\r\n.fadein-enter {\r\n  animation:fadein-in 0.3s ease-in;\r\n}\r\n.fadein-leave-active {\r\n  animation:fadein-out 0.3s ease-out;\r\n}\r\n@keyframes fadein-in {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: .9;\r\n  }\r\n}\r\n@keyframes fadein-out {\r\n  0% {\r\n    opacity: .9;\r\n  }\r\n  100% {\r\n    opacity: 0;\r\n  }\r\n}\r\n</style>\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _popoverMixins = __webpack_require__(143);
	
	var _popoverMixins2 = _interopRequireDefault(_popoverMixins);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = {
	  mixins: [_popoverMixins2["default"]],
	  props: {
	    effect: { type: String, "default": 'scale' },
	    trigger: { type: String, "default": 'hover' }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('span', {
	    ref: "trigger"
	  }, [_vm._t("default"), _vm._v(" "), _vm._c('transition', {
	    attrs: {
	      "name": _vm.effect
	    }
	  }, [(_vm.show) ? _vm._c('div', {
	    ref: "popover",
	    "class": ['tooltip', _vm.placement]
	  }, [_vm._c('div', {
	    staticClass: "tooltip-arrow"
	  }), _vm._v(" "), _vm._c('div', {
	    staticClass: "tooltip-inner"
	  }, [_vm._t("content", [_vm._c('div', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.content)
	    }
	  })])], 2)]) : _vm._e()])], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-48fb51b2", module.exports)
	  }
	}

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(188)
	
	/* script */
	__vue_exports__ = __webpack_require__(190)
	
	/* template */
	var __vue_template__ = __webpack_require__(206)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__["default"] === "object" ||
	  typeof __vue_exports__["default"] === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__["default"]
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\laragon\\www\\vue-strap\\src\\Typeahead.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5b5f5e94", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5b5f5e94", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Typeahead.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(189);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(79)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5b5f5e94!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Typeahead.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5b5f5e94!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Typeahead.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(78)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.dropdown-menu > li > a {\r\n  cursor: pointer;\n}\r\n", "", {"version":3,"sources":["/./src/Typeahead.vue?73fcd4be"],"names":[],"mappings":";AAkIA;EACA,gBAAA;CACA","file":"Typeahead.vue","sourcesContent":["<template>\r\n  <div style=\"position: relative\" :class=\"{open:showDropdown}\">\r\n    <input class=\"form-control\" autocomplete=\"off\"\r\n      v-model=\"val\"\r\n      :placeholder=\"placeholder\"\r\n      :type.once=\"type\"\r\n      @blur=\"showDropdown = false\"\r\n      @keydown.down.prevent=\"down\"\r\n      @keydown.enter=\"hit\"\r\n      @keydown.esc=\"reset\"\r\n      @keydown.up.prevent=\"up\"\r\n    />\r\n    <ul class=\"dropdown-menu\" ref=\"dropdown\">\r\n      <li v-for=\"(item, i) in items\" :class=\"{active: isActive(i)}\">\r\n        <a @mousedown.prevent=\"hit\" @mousemove=\"setActive(i)\">\r\n          <component :is=\"templateComp\" :item=\"item\"></component>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {delayer, getJSON} from './utils/utils.js'\r\nvar DELAY = 300\r\n\r\nexport default {\r\n  props: {\r\n    async: {type: String},\r\n    data: {type: Array},\r\n    delay: {type: Number, default: DELAY},\r\n    asyncKey: {type: String, default: null},\r\n    limit: {type: Number, default: 8},\r\n    matchCase: {type: Boolean, default: false},\r\n    matchStart: {type: Boolean, default: false},\r\n    onHit: {\r\n      type: Function,\r\n      default (item) { return item }\r\n    },\r\n    placeholder: {type: String},\r\n    template: {type: String},\r\n    type: {type: String, default: 'text'},\r\n    value: {type: String, default: ''}\r\n  },\r\n  data () {\r\n    return {\r\n      asign: '',\r\n      showDropdown: false,\r\n      noResults: true,\r\n      current: 0,\r\n      items: [],\r\n      val: this.value\r\n    }\r\n  },\r\n  computed: {\r\n    templateComp () {\r\n      return {\r\n        template: typeof this.template === 'string' ? '<span>' + this.template + '</span>' : '<strong v-html=\"item\"></strong>',\r\n        props: { item: {default: null} }\r\n      }\r\n    }\r\n  },\r\n  watch: {\r\n    val (val, old) {\r\n      this.$emit('input', val)\r\n      if (val !== old && val !== this.asign) this.__update()\r\n    },\r\n    value (val) {\r\n      if (this.val !== val) { this.val = val }\r\n    }\r\n  },\r\n  methods: {\r\n    setItems (data) {\r\n      if (this.async) {\r\n        this.items = this.asyncKey ? data[this.asyncKey] : data\r\n        this.items = this.items.slice(0, this.limit)\r\n      } else {\r\n        this.items = (data || []).filter(value => {\r\n          if (typeof value === 'object') { return true }\r\n          value = this.matchCase ? value : value.toLowerCase()\r\n          var query = this.matchCase ? this.val : this.val.toLowerCase()\r\n          return this.matchStart ? value.indexOf(query) === 0 : value.indexOf(query) !== -1\r\n        }).slice(0, this.limit)\r\n      }\r\n      this.showDropdown = this.items.length > 0\r\n    },\r\n    setValue (value) {\r\n      this.asign = value\r\n      this.val = value\r\n      this.items = []\r\n      this.loading = false\r\n      this.showDropdown = false\r\n    },\r\n    reset () { this.setValue(null) },\r\n    setActive (index) { this.current = index },\r\n    isActive (index) { return this.current === index },\r\n    hit (e) {\r\n      e.preventDefault()\r\n      this.setValue(this.onHit(this.items[this.current], this))\r\n    },\r\n    up () {\r\n      if (this.current > 0) { this.current-- }\r\n      else { this.current = this.items.length - 1 }\r\n    },\r\n    down () {\r\n      if (this.current < this.items.length - 1) { this.current++ }\r\n      else { this.current = 0 }\r\n    }\r\n  },\r\n  created () {\r\n    this.__update = delayer(function () {\r\n      if (!this.val) {\r\n        this.reset()\r\n        return\r\n      }\r\n      this.asign = ''\r\n      if (this.async) {\r\n        getJSON(this.async + this.val).then(data => {\r\n          this.setItems(data)\r\n        })\r\n      } else if (this.data) {\r\n        this.setItems(this.data)\r\n      }\r\n    }, 'delay', DELAY)\r\n    this.__update()\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.dropdown-menu > li > a {\r\n  cursor: pointer;\r\n}\r\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(191);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _utils = __webpack_require__(65);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var DELAY = 300; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports["default"] = {
	  props: {
	    async: { type: String },
	    data: { type: Array },
	    delay: { type: Number, "default": DELAY },
	    asyncKey: { type: String, "default": null },
	    limit: { type: Number, "default": 8 },
	    matchCase: { type: Boolean, "default": false },
	    matchStart: { type: Boolean, "default": false },
	    onHit: {
	      type: Function,
	      "default": function _default(item) {
	        return item;
	      }
	    },
	    placeholder: { type: String },
	    template: { type: String },
	    type: { type: String, "default": 'text' },
	    value: { type: String, "default": '' }
	  },
	  data: function data() {
	    return {
	      asign: '',
	      showDropdown: false,
	      noResults: true,
	      current: 0,
	      items: [],
	      val: this.value
	    };
	  },
	
	  computed: {
	    templateComp: function templateComp() {
	      return {
	        template: typeof this.template === 'string' ? '<span>' + this.template + '</span>' : '<strong v-html="item"></strong>',
	        props: { item: { "default": null } }
	      };
	    }
	  },
	  watch: {
	    val: function val(_val, old) {
	      this.$emit('input', _val);
	      if (_val !== old && _val !== this.asign) this.__update();
	    },
	    value: function value(val) {
	      if (this.val !== val) {
	        this.val = val;
	      }
	    }
	  },
	  methods: {
	    setItems: function setItems(data) {
	      var _this = this;
	
	      if (this.async) {
	        this.items = this.asyncKey ? data[this.asyncKey] : data;
	        this.items = this.items.slice(0, this.limit);
	      } else {
	        this.items = (data || []).filter(function (value) {
	          if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3["default"])(value)) === 'object') {
	            return true;
	          }
	          value = _this.matchCase ? value : value.toLowerCase();
	          var query = _this.matchCase ? _this.val : _this.val.toLowerCase();
	          return _this.matchStart ? value.indexOf(query) === 0 : value.indexOf(query) !== -1;
	        }).slice(0, this.limit);
	      }
	      this.showDropdown = this.items.length > 0;
	    },
	    setValue: function setValue(value) {
	      this.asign = value;
	      this.val = value;
	      this.items = [];
	      this.loading = false;
	      this.showDropdown = false;
	    },
	    reset: function reset() {
	      this.setValue(null);
	    },
	    setActive: function setActive(index) {
	      this.current = index;
	    },
	    isActive: function isActive(index) {
	      return this.current === index;
	    },
	    hit: function hit(e) {
	      e.preventDefault();
	      this.setValue(this.onHit(this.items[this.current], this));
	    },
	    up: function up() {
	      if (this.current > 0) {
	        this.current--;
	      } else {
	        this.current = this.items.length - 1;
	      }
	    },
	    down: function down() {
	      if (this.current < this.items.length - 1) {
	        this.current++;
	      } else {
	        this.current = 0;
	      }
	    }
	  },
	  created: function created() {
	    this.__update = (0, _utils.delayer)(function () {
	      var _this2 = this;
	
	      if (!this.val) {
	        this.reset();
	        return;
	      }
	      this.asign = '';
	      if (this.async) {
	        (0, _utils.getJSON)(this.async + this.val).then(function (data) {
	          _this2.setItems(data);
	        });
	      } else if (this.data) {
	        this.setItems(this.data);
	      }
	    }, 'delay', DELAY);
	    this.__update();
	  }
	};

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(20);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(192);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = typeof _symbol2["default"] === "function" && _typeof(_iterator2["default"]) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(193), __esModule: true };

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(194);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(29)
	  , DESCRIPTORS    = __webpack_require__(15)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(28)
	  , META           = __webpack_require__(195).KEY
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(43)
	  , setToStringTag = __webpack_require__(47)
	  , uid            = __webpack_require__(44)
	  , wks            = __webpack_require__(48)
	  , wksExt         = __webpack_require__(55)
	  , wksDefine      = __webpack_require__(196)
	  , keyOf          = __webpack_require__(197)
	  , enumKeys       = __webpack_require__(198)
	  , isArray        = __webpack_require__(201)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(36)
	  , toPrimitive    = __webpack_require__(18)
	  , createDesc     = __webpack_require__(19)
	  , _create        = __webpack_require__(32)
	  , gOPNExt        = __webpack_require__(60)
	  , $GOPD          = __webpack_require__(202)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(34)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(61).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(200).f  = $propertyIsEnumerable;
	  __webpack_require__(199).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(27)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(44)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(29)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(27)
	  , wksExt         = __webpack_require__(55)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(34)
	  , toIObject = __webpack_require__(36);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34)
	  , gOPS    = __webpack_require__(199)
	  , pIE     = __webpack_require__(200);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 199 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 200 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(38);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(200)
	  , createDesc     = __webpack_require__(19)
	  , toIObject      = __webpack_require__(36)
	  , toPrimitive    = __webpack_require__(18)
	  , has            = __webpack_require__(29)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 203 */
/***/ function(module, exports) {



/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(196)('asyncIterator');

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(196)('observable');

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _vm._c('div', {
	    "class": {
	      open: _vm.showDropdown
	    },
	    staticStyle: {
	      "position": "relative"
	    }
	  }, [_vm._c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.val),
	      expression: "val"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "autocomplete": "off",
	      "placeholder": _vm.placeholder,
	      "type": _vm.type
	    },
	    domProps: {
	      "value": _vm._s(_vm.val)
	    },
	    on: {
	      "blur": function($event) {
	        _vm.showDropdown = false
	      },
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "down", 40)) { return; }
	        $event.preventDefault();
	        _vm.down($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.hit($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.reset($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "up", 38)) { return; }
	        $event.preventDefault();
	        _vm.up($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.val = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _vm._c('ul', {
	    ref: "dropdown",
	    staticClass: "dropdown-menu"
	  }, _vm._l((_vm.items), function(item, i) {
	    return _vm._c('li', {
	      "class": {
	        active: _vm.isActive(i)
	      }
	    }, [_vm._c('a', {
	      on: {
	        "mousedown": function($event) {
	          $event.preventDefault();
	          _vm.hit($event)
	        },
	        "mousemove": function($event) {
	          _vm.setActive(i)
	        }
	      }
	    }, [_vm._c(_vm.templateComp, {
	      tag: "component",
	      attrs: {
	        "item": item
	      }
	    })], 1)])
	  }))])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5b5f5e94", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-strap.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(55);
var buildURL = __webpack_require__(58);
var parseHeaders = __webpack_require__(64);
var isURLSameOrigin = __webpack_require__(62);
var createError = __webpack_require__(11);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(57);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(60);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(54);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(78);
var IE8_DOM_DEFINE = __webpack_require__(83);
var toPrimitive = __webpack_require__(85);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      "default": 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      "default": 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      "default": 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      "class": classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots["default"]);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots["default"])
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { "default": route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { "default": route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (true) {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef["default"]) {
            resolvedDef = resolvedDef["default"];
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _es6Promise = __webpack_require__(87);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

__webpack_require__(71);

var _routes = __webpack_require__(72);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_es6Promise2['default'].polyfill(); //import "babel-polyfill";


Vue.component('psg-header', __webpack_require__(100));
Vue.component('psg-page', __webpack_require__(102));
Vue.component('psg-footer', __webpack_require__(99));

Vue.mixin({
    methods: {
        charge: function charge(formId) {
            var form = document.querySelector(formId);

            var token = document.head.querySelector('meta[name="csrf-token"]');
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = token.content;

            form.append(input);
        }
    }
});

var app = new Vue({
    el: '#app',
    router: _routes2['default']
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(12);
var Axios = __webpack_require__(51);
var defaults = __webpack_require__(3);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(9);
axios.CancelToken = __webpack_require__(50);
axios.isCancel = __webpack_require__(10);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(65);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(9);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(3);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(52);
var dispatchRequest = __webpack_require__(53);
var isAbsoluteURL = __webpack_require__(61);
var combineURLs = __webpack_require__(59);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(56);
var isCancel = __webpack_require__(10);
var defaults = __webpack_require__(3);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(11);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TextToSpeech = __webpack_require__(6);

var _TextToSpeech2 = _interopRequireDefault(_TextToSpeech);

var _vueSimpleLightbox = __webpack_require__(108);

var _vueSimpleLightbox2 = _interopRequireDefault(_vueSimpleLightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports['default'] = {
    data: function data() {
        return {
            posts: [],
            events: [],
            email: '',
            subscriptionResult: '',
            subscriptionSuccess: false,
            images: [{
                src: '/uploads/gallery/l4l2_1.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_2.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_3.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_4.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_5.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_7.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_8.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_9.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_10.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_11.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_12.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/l4l2_13.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/1.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/2.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/37.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/38.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/39.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/40.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/41.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/42.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/43.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/44.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/45.jpg',
                title: 'Laughs for Life II'
            }, {
                src: '/uploads/gallery/46.jpg',
                title: 'Laughs for Life II'
            }]
        };
    },

    methods: {
        getPosts: function getPosts() {
            var _this = this;

            http.get('/posts/footer').then(function (response) {
                var posts = response.body.posts;

                var reformatted = [];

                if (_this.$cookie.get('language') === 'es') {
                    posts.forEach(function (post) {
                        reformatted.push({
                            headline: post.es_headline,
                            slug: post.slug
                        });
                    });
                } else {
                    posts.forEach(function (post) {
                        reformatted.push({
                            headline: post.en_headline,
                            slug: post.slug
                        });
                    });
                }

                _this.posts = reformatted;
            })['catch'](function (error) {
                console.error(error);
            });
        },
        getEvents: function getEvents() {
            var _this2 = this;

            http.get('/events').then(function (response) {
                var events = response.body.events;

                var reformatted = [];

                if (_this2.$cookie.get('language') === 'es') {
                    events.forEach(function (event) {
                        reformatted.push({
                            event_name: event.es_event_name,
                            slug: event.slug
                        });
                    });
                } else {
                    events.forEach(function (event) {
                        reformatted.push({
                            event_name: event.en_event_name,
                            slug: event.slug
                        });
                    });
                }

                _this2.events = reformatted;
            })['catch'](function (error) {
                console.error(error);
            });
        },
        subscribe: function subscribe() {
            var _this3 = this;

            axios.post('/mailchimp', { email: this.email }).then(function (response) {
                _this3.subscriptionResult = response.data.message;
                _this3.subscriptionSuccess = response.data.success;
            })['catch'](function (error) {
                _this3.subscriptionResult = error.data.message;
                _this3.subscriptionSuccess = false;
            });
        }
    },
    computed: {
        currentYear: function currentYear() {
            return new Date().getFullYear();
        },
        about: function about() {
            if (this.$cookie.get('language') === 'es') {
                return 'Acerca de';
            } else {
                return 'About';
            }
        },
        shantiText: function shantiText() {
            if (this.$cookie.get('language') === 'es') {
                return '"Shanti" es una palabra sánscrita que significa "paz interna" y es un reflejo de enfoque de promover la capacitación personal y el mantenimiento de la independencia y la dignidad de Phoenix Shanti Grupos.';
            } else {
                return '"Shanti" is a Sanskrit word meaning "Inner Peace" and is reflective of Phoenix Shanti Group\'s approach of promoting personal empowerment and maintaining independence and dignity.';
            }
        },
        home: function home() {
            if (this.$cookie.get('language') === 'es') {
                return 'Casa';
            } else {
                return 'Home';
            }
        },
        mission: function mission() {
            if (this.$cookie.get('language') === 'es') {
                return 'Misión';
            } else {
                return 'Mission';
            }
        },
        housing: function housing() {
            if (this.$cookie.get('language') === 'es') {
                return '+ Vivienda VIH';
            } else {
                return 'HIV+ Housing';
            }
        },
        services: function services() {
            if (this.$cookie.get('language') === 'es') {
                return 'Servicios de VIH+';
            } else {
                return 'HIV+ Services';
            }
        },
        contact: function contact() {
            if (this.$cookie.get('language') === 'es') {
                return 'Contacto';
            } else {
                return 'Contact';
            }
        },
        siteMap: function siteMap() {
            if (this.$cookie.get('language') === 'es') {
                return 'Mapa de Sitio';
            } else {
                return 'Site Map';
            }
        },
        copperStar: function copperStar() {
            if (this.$cookie.get('language') === 'es') {
                return 'Diseño, desarrollo y alojamiento por';
            } else {
                return 'Design, development and hosting by';
            }
        },
        copyright: function copyright() {
            if (this.$cookie.get('language') === 'es') {
                return 'Derechos de autor';
            } else {
                return 'Copyright';
            }
        },
        recentPosts: function recentPosts() {
            if (this.$cookie.get('language') === 'es') {
                return 'Mensajes recientes';
            } else {
                return 'Recent Posts';
            }
        },
        upcomingEvents: function upcomingEvents() {
            if (this.$cookie.get('language') === 'es') {
                return 'Próximos Eventos';
            } else {
                return 'Upcoming Events';
            }
        },
        recentImages: function recentImages() {
            if (this.$cookie.get('language') === 'es') {
                return 'Imágenes recientes';
            } else {
                return 'Recent Images';
            }
        },
        contactUs: function contactUs() {
            if (this.$cookie.get('language') === 'es') {
                return 'Contáctenos';
            } else {
                return 'Contact Us';
            }
        },
        mainOffice: function mainOffice() {
            if (this.$cookie.get('language') === 'es') {
                return 'Oficina principal';
            } else {
                return 'Main Office';
            }
        },
        secureFax: function secureFax() {
            if (this.$cookie.get('language') === 'es') {
                return 'Fax seguro';
            } else {
                return 'Secure Fax';
            }
        },
        hours: function hours() {
            if (this.$cookie.get('language') === 'es') {
                return 'Horas de trabajo';
            } else {
                return 'Hours';
            }
        },
        store: function store() {
            if (this.$cookie.get('language') === 'es') {
                return 'Tienda';
            } else {
                return 'Store';
            }
        },
        storeFax: function storeFax() {
            if (this.$cookie.get('language') === 'es') {
                return 'Fax de la tienda';
            } else {
                return 'Store Fax';
            }
        },
        mondayFriday: function mondayFriday() {
            if (this.$cookie.get('language') === 'es') {
                return 'de lunes a viernes';
            } else {
                return 'Monday through Friday';
            }
        },
        saturday: function saturday() {
            if (this.$cookie.get('language') === 'es') {
                return 'sábado';
            } else {
                return 'Saturday';
            }
        },
        enterEmailAddress: function enterEmailAddress() {
            if (this.$cookie.get('language') === 'es') {
                return 'Dirección de correo electrónico';
            } else {
                return 'Enter email address';
            }
        },
        subscribeTo: function subscribeTo() {
            if (this.$cookie.get('language') === 'es') {
                return 'Suscribir';
            } else {
                return 'Subscribe';
            }
        },
        phoenixShanti: function phoenixShanti() {
            if (this.$cookie.get('language') === 'es') {
                return 'Grupo Phoenix Shanti';
            } else {
                return 'Phoenix Shanti Group';
            }
        },
        secondChances: function secondChances() {
            if (this.$cookie.get('language') === 'es') {
                return 'Tienda 2nd Chances';
            } else {
                return '2nd Chances Store';
            }
        }
    },
    beforeMount: function beforeMount() {
        this.getPosts();
        this.getEvents();
    },

    components: {
        'psg-speak': _TextToSpeech2['default'],
        Lightbox: _vueSimpleLightbox2['default']
    }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Nav = __webpack_require__(101);

var _Nav2 = _interopRequireDefault(_Nav);

var _vueStrap = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    data: function data() {
        return {
            keywords: '',
            language: this.$cookie.get('language')
        };
    },

    methods: {
        search: function search() {
            this.$router.push({ path: 'search-results', query: { keywords: this.keywords } });
        },
        disableEnter: function disableEnter() {
            var evt = evt ? evt : window.event ? window.event : null;
            var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
            if (evt.keyCode === 13 && node.type === "search") {
                return false;
            }
        },
        setLanguage: function setLanguage(language) {
            if (language !== '' && language !== this.$cookie.get('language') && language !== null) {
                this.$cookie.set('language', language, 1);
                window.location.reload();
            }
        }
    },
    computed: {
        typeKeywords: function typeKeywords() {
            if (this.$cookie.get('language') === 'es') {
                return 'Palabras clave';
            } else {
                return 'Enter keywords';
            }
        }
    },
    components: {
        'psg-nav': _Nav2['default'],
        'v-select': _vueStrap.select,
        'v-option': _vueStrap.option
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(74);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _computed; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vueStrap = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    components: {
        navbar: _vueStrap.navbar,
        dropdown: _vueStrap.dropdown
    },
    computed: (_computed = {
        home: function home() {
            if (this.$cookie.get('language') === 'es') {
                return 'Casa';
            } else {
                return 'Home';
            }
        },
        about: function about() {
            if (this.$cookie.get('language') === 'es') {
                return 'Acerca de';
            } else {
                return 'About';
            }
        },
        contact: function contact() {
            if (this.$cookie.get('language') === 'es') {
                return 'Contacto';
            } else {
                return 'Contact';
            }
        },
        gettingStarted: function gettingStarted() {
            if (this.$cookie.get('language') === 'es') {
                return 'Empezando';
            } else {
                return 'Getting Started';
            }
        },
        testimonials: function testimonials() {
            if (this.$cookie.get('language') === 'es') {
                return 'Testimonios';
            } else {
                return 'Testimonials';
            }
        },
        mission: function mission() {
            if (this.$cookie.get('language') === 'es') {
                return 'Misión';
            } else {
                return 'Mission';
            }
        },
        history: function history() {
            if (this.$cookie.get('language') === 'es') {
                return 'Historia';
            } else {
                return 'History';
            }
        },
        culturalCompetency: function culturalCompetency() {
            if (this.$cookie.get('language') === 'es') {
                return 'Competencia Cultural';
            } else {
                return 'Cultural Competency';
            }
        },
        privacyPolicy: function privacyPolicy() {
            if (this.$cookie.get('language') === 'es') {
                return 'Política de privacidad';
            } else {
                return 'Privacy Policy';
            }
        },
        housing: function housing() {
            if (this.$cookie.get('language') === 'es') {
                return '+ Vivienda VIH';
            } else {
                return 'HIV+ Housing';
            }
        },
        services: function services() {
            if (this.$cookie.get('language') === 'es') {
                return 'Servicios de VIH+';
            } else {
                return 'HIV+ Services';
            }
        },
        support: function support() {
            if (this.$cookie.get('language') === 'es') {
                return 'Apoyo';
            } else {
                return 'Support';
            }
        }
    }, (0, _defineProperty3['default'])(_computed, 'support', function support() {
        if (this.$cookie.get('language') === 'es') {
            return 'Apoyo';
        } else {
            return 'Support';
        }
    }), (0, _defineProperty3['default'])(_computed, 'donate', function donate() {
        if (this.$cookie.get('language') === 'es') {
            return 'Donar';
        } else {
            return 'Donate';
        }
    }), (0, _defineProperty3['default'])(_computed, 'contribute', function contribute() {
        if (this.$cookie.get('language') === 'es') {
            return 'Contribuir';
        } else {
            return 'Contribute';
        }
    }), (0, _defineProperty3['default'])(_computed, 'volunteer', function volunteer() {
        if (this.$cookie.get('language') === 'es') {
            return 'Voluntario';
        } else {
            return 'Volunteer';
        }
    }), (0, _defineProperty3['default'])(_computed, 'resources', function resources() {
        if (this.$cookie.get('language') === 'es') {
            return 'Recursos';
        } else {
            return 'Resources';
        }
    }), (0, _defineProperty3['default'])(_computed, 'office', function office() {
        if (this.$cookie.get('language') === 'es') {
            return 'Oficina';
        } else {
            return 'Office';
        }
    }), (0, _defineProperty3['default'])(_computed, 'staff', function staff() {
        if (this.$cookie.get('language') === 'es') {
            return 'Personal';
        } else {
            return 'Staff';
        }
    }), (0, _defineProperty3['default'])(_computed, 'board', function board() {
        if (this.$cookie.get('language') === 'es') {
            return 'Junta Directiva';
        } else {
            return 'Board of Directors';
        }
    }), (0, _defineProperty3['default'])(_computed, 'events', function events() {
        if (this.$cookie.get('language') === 'es') {
            return 'Eventos';
        } else {
            return 'Events';
        }
    }), (0, _defineProperty3['default'])(_computed, 'gallery', function gallery() {
        if (this.$cookie.get('language') === 'es') {
            return 'Galería';
        } else {
            return 'Gallery';
        }
    }), (0, _defineProperty3['default'])(_computed, 'store', function store() {
        if (this.$cookie.get('language') === 'es') {
            return 'Tienda';
        } else {
            return 'Store';
        }
    }), _computed)
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TextToSpeech = __webpack_require__(6);

var _TextToSpeech2 = _interopRequireDefault(_TextToSpeech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    props: ['article', 'loading'],
    components: {
        'psg-speak': _TextToSpeech2['default']
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//

exports['default'] = {
    data: function data() {
        return {
            styling: this.primary ? 'btn-lpurple' : 'btn-default'
        };
    },

    props: ['text', 'primary'],
    methods: {
        speak: function speak() {
            if ('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance();
                msg.rate = 0.8;
                msg.pitch = 1.0;

                if (this.$cookie.get('language') !== 'es') {
                    msg.text = this.textOnly;
                } else {
                    msg.text = 'This feature currently does not work in Spanish. Lo siento.';
                }

                speechSynthesis.speak(msg);
            } else {
                alert('Speech synthesis not available in your browser. Please upgrade to a modern browser.');
            }
        }
    },
    computed: {
        speakText: function speakText() {
            if (this.$cookie.get('language') === 'es') {
                return 'Habla';
            } else {
                return 'Speak';
            }
        },
        textOnly: function textOnly() {
            var div = document.createElement('div');
            div.innerHTML = this.text;
            return div.textContent || div.innerText || '';
        }
    }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(19);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _axios = __webpack_require__(48);

var _axios2 = _interopRequireDefault(_axios);

var _veeValidate = __webpack_require__(97);

var _veeValidate2 = _interopRequireDefault(_veeValidate);

var _vueCookie = __webpack_require__(98);

var _vueCookie2 = _interopRequireDefault(_vueCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import ES6Promise from 'es6-promise';
// ES6Promise.polyfill();

window.Vue = _vue2['default'];
_vue2['default'].use(_vueRouter2['default']);

window.axios = _axios2['default'];

var cacheModule = __webpack_require__(75);
var cache = new cacheModule({ storage: 'session', defaultExpiration: 60 });

// Require superagent-cache-plugin and pass your cache module
var superagentCache = __webpack_require__(88)(cache, {
    expiration: 60 * 30
});
window.saCache = superagentCache;

var http = __webpack_require__(90);
window.http = http;

_vue2['default'].use(_veeValidate2['default']);

_vue2['default'].use(_vueCookie2['default']);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

window.bus = new _vue2['default']();

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueRouter = __webpack_require__(19);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Home = function Home(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
        resolve(__webpack_require__(23));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var CulturalCompetency = function CulturalCompetency(resolve) {
    __webpack_require__.e/* require.ensure */(20).then((function () {
        resolve(__webpack_require__(28));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var History = function History(resolve) {
    __webpack_require__.e/* require.ensure */(5).then((function () {
        resolve(__webpack_require__(30));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Mission = function Mission(resolve) {
    __webpack_require__.e/* require.ensure */(18).then((function () {
        resolve(__webpack_require__(31));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var PrivacyPolicy = function PrivacyPolicy(resolve) {
    __webpack_require__.e/* require.ensure */(17).then((function () {
        resolve(__webpack_require__(32));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Testimonials = function Testimonials(resolve) {
    __webpack_require__.e/* require.ensure */(4).then((function () {
        resolve(__webpack_require__(33));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Board = function Board(resolve) {
    __webpack_require__.e/* require.ensure */(14).then((function () {
        resolve(__webpack_require__(36));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Office = function Office(resolve) {
    __webpack_require__.e/* require.ensure */(13).then((function () {
        resolve(__webpack_require__(37));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Staff = function Staff(resolve) {
    __webpack_require__.e/* require.ensure */(2).then((function () {
        resolve(__webpack_require__(38));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Housing = function Housing(resolve) {
    __webpack_require__.e/* require.ensure */(10).then((function () {
        resolve(__webpack_require__(42));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Services = function Services(resolve) {
    __webpack_require__.e/* require.ensure */(9).then((function () {
        resolve(__webpack_require__(43));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Donate = function Donate(resolve) {
    __webpack_require__.e/* require.ensure */(1).then((function () {
        resolve(__webpack_require__(45));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Resources = function Resources(resolve) {
    __webpack_require__.e/* require.ensure */(7).then((function () {
        resolve(__webpack_require__(46));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Volunteer = function Volunteer(resolve) {
    __webpack_require__.e/* require.ensure */(6).then((function () {
        resolve(__webpack_require__(47));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Contribute = function Contribute(resolve) {
    __webpack_require__.e/* require.ensure */(8).then((function () {
        resolve(__webpack_require__(44));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Posts = function Posts(resolve) {
    __webpack_require__.e/* require.ensure */(15).then((function () {
        resolve(__webpack_require__(35));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Post = function Post(resolve) {
    __webpack_require__.e/* require.ensure */(16).then((function () {
        resolve(__webpack_require__(34));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Events = function Events(resolve) {
    __webpack_require__.e/* require.ensure */(11).then((function () {
        resolve(__webpack_require__(40));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Event = function Event(resolve) {
    __webpack_require__.e/* require.ensure */(12).then((function () {
        resolve(__webpack_require__(39));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var Gallery = function Gallery(resolve) {
    __webpack_require__.e/* require.ensure */(3).then((function () {
        resolve(__webpack_require__(41));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var GettingStarted = function GettingStarted(resolve) {
    __webpack_require__.e/* require.ensure */(19).then((function () {
        resolve(__webpack_require__(29));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var SiteMap = function SiteMap(resolve) {
    __webpack_require__.e/* require.ensure */(22).then((function () {
        resolve(__webpack_require__(26));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var SearchResults = function SearchResults(resolve) {
    __webpack_require__.e/* require.ensure */(23).then((function () {
        resolve(__webpack_require__(25));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var ThirtiethAnniversary = function ThirtiethAnniversary(resolve) {
    __webpack_require__.e/* require.ensure */(21).then((function () {
        resolve(__webpack_require__(27));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var NotFound = function NotFound(resolve) {
    __webpack_require__.e/* require.ensure */(24).then((function () {
        resolve(__webpack_require__(24));
    }).bind(null, __webpack_require__))["catch"](__webpack_require__.oe);
};

var router = new _vueRouter2['default']({
    routes: [{ path: '/', component: Home, meta: { title: { en: 'Home', es: 'Casa' } } }, { path: '/about/cultural-competency', component: CulturalCompetency, meta: { title: { en: 'Cultural Competency', es: 'Competencia cultural' } } }, { path: '/about/history', component: History, meta: { title: { en: 'History', es: 'Historia' } } }, { path: '/about/mission', component: Mission, meta: { title: { en: 'Mission', es: 'Nuestra misión' } } }, { path: '/about/privacy-policy', component: PrivacyPolicy, meta: { title: { en: 'Privacy Policy', es: 'Política de privacidad' } } }, { path: '/about/testimonials', component: Testimonials, meta: { title: { en: 'Testimonials', es: 'Testimonios' } } }, { path: '/contact/board', component: Board, meta: { title: { en: 'Board of Directors', es: 'Junta Directiva' } } }, { path: '/contact/office', component: Office, meta: { title: { en: 'Main Office', es: 'Oficina principal' } } }, { path: '/contact/staff', component: Staff, meta: { title: { en: 'Staff', es: 'Personal' } } }, { path: '/services/housing', component: Housing, meta: { title: { en: 'Housing', es: 'Alojamiento' } } }, { path: '/services/hiv', component: Services, meta: { title: { en: 'HIV Services', es: 'Servicios de VIH / SIDA' } } }, { path: '/support/donate', component: Donate, meta: { title: { en: 'Donate', es: 'Donar' } } }, { path: '/support/resources', component: Resources, meta: { title: { en: 'Resources', es: 'Recusos' } } }, { path: '/support/contribute', component: Contribute, meta: { title: { en: 'Contribute', es: 'Contribuir' } } }, { path: '/support/volunteer', component: Volunteer, meta: { title: { en: 'Volunteer', es: 'Voluntario' } } },
    // { path: '/about', component: require('./views/About'), meta: { title: 'About'}},
    { path: '/blog', component: Posts, meta: { title: { en: 'Blog', es: 'Blog' } } }, { path: '/blog/30', redirect: '/30' }, { path: '/blog/:slug', name: 'blog/view', component: Post, meta: { title: { en: 'Blog', es: 'Blog' } } }, { path: '/events', component: Events, meta: { title: { en: 'Events', es: 'Eventos' } } }, { path: '/events/gallery', component: Gallery, meta: { title: { en: 'Gallery', es: 'Galería' } } }, { path: '/events/:slug', name: 'event/view', component: Event, meta: { title: { en: '', es: '' } } }, { path: '/getting-started', component: GettingStarted, meta: { title: { en: 'Getting Started', es: 'Emezpando' } } }, { path: '/site-map', component: SiteMap, meta: { title: { en: 'Site Map', es: 'Mapa de Sitio' } } }, { path: '/search-results', component: SearchResults, meta: { title: { en: 'Search Results', es: 'Resultados de la búsqueda' } } }, { path: '/30', component: ThirtiethAnniversary, meta: { title: { en: '30th Anniversary', es: 'Trigésimo aniversario' } } }, { path: '*', component: NotFound, meta: { title: { en: 'Page Not Found', es: 'Página no encontrada' } } }]
});

router.beforeEach(function (to, from, next) {
    var matches = document.cookie.match(new RegExp('language' + '=([^;]+)'));

    if (to.name === 'blog/view') {
        var slug = to.params.slug;
        axios.get('/posts/' + slug).then(function (response) {
            if (matches !== null && matches[1] === 'es') {
                document.title = response.data.post.es_headline + ' | Phoenix Shanti Group';
            } else {
                document.title = response.data.post.en_headline + ' | Phoenix Shanti Group';
            }
        })['catch'](function (error) {
            return console.log(error);
        });
    } else if (to.name === 'event/view') {
        var _slug = to.params.slug;
        axios.get('/events/' + _slug).then(function (response) {
            if (matches !== null && matches[1] === 'es') {
                document.title = response.data.post.en_event_name + ' | Phoenix Shanti Group';
            } else {
                document.title = response.data.event.en_event_name + ' | Phoenix Shanti Group';
            }
        })['catch'](function (error) {
            return console.log(error);
        });
    } else {
        if (matches !== null && matches[1] === 'es') {
            document.title = to.meta.title.es + ' | Grupo Phoenix Shanti';
        } else {
            document.title = to.meta.title.en + ' | Phoenix Shanti Group';
        }
    }
    next();
});

exports['default'] = router;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(73);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2["default"])(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * cacheModule constructor
 * @param config: {
 *    type:                           {string  | 'cache-module'}
 *    verbose:                        {boolean | false},
 *    defaultExpiration:              {integer | 900},
 *    readOnly:                       {boolean | false},
 *    checkOnPreviousEmpty:           {boolean | true},
 *    backgroundRefreshIntervalCheck: {boolean | true},
 *    backgroundRefreshInterval:      {integer | 60000},
 *    backgroundRefreshMinTtl:        {integer | 70000},
 *    storage:                        {string  | null},
 *    storageMock:                    {object  | null}
 * }
 */
function cacheModule(config){
  var self = this;
  config = config || {};
  self.type = config.type || 'cache-module';
  self.verbose = config.verbose || false;
  self.defaultExpiration = config.defaultExpiration || 900;
  self.readOnly = config.readOnly || false;
  self.checkOnPreviousEmpty = (typeof config.checkOnPreviousEmpty === 'boolean') ? config.checkOnPreviousEmpty : true;
  self.backgroundRefreshIntervalCheck = (typeof config.backgroundRefreshIntervalCheck === 'boolean') ? config.backgroundRefreshIntervalCheck : true;
  self.backgroundRefreshInterval = config.backgroundRefreshInterval || 60000;
  self.backgroundRefreshMinTtl = config.backgroundRefreshMinTtl || 70000;
  var store = null;
  var storageMock = config.storageMock || false;
  var backgroundRefreshEnabled = false;
  var browser = (typeof window !== 'undefined');
  var cache = {
    db: {},
    expirations: {},
    refreshKeys: {}
  };
  var storageKey;

  setupBrowserStorage();
  log(false, 'Cache-module client created with the following defaults:', {type: self.type, defaultExpiration: self.defaultExpiration, verbose: self.verbose, readOnly: self.readOnly});

  /**
   * Get the value associated with a given key
   * @param {string} key
   * @param {function} cb
   */
  self.get = function(key, cb){
    throwErrorIf((arguments.length < 2), 'ARGUMENT_EXCEPTION: .get() requires 2 arguments.');
    log(false, 'get() called:', {key: key});
    try {
      var now = Date.now();
      var expiration = cache.expirations[key];
      if(expiration > now){
        cb(null, cache.db[key]);
      }
      else{
        expire(key);
        cb(null, null);
      }
    } catch (err) {
      cb({name: 'GetException', message: err}, null);
    }
  }

  /**
   * Get multiple values given multiple keys
   * @param {array} keys
   * @param {function} cb
   * @param {integer} index
   */
  self.mget = function(keys, cb, index){
    throwErrorIf((arguments.length < 2), 'ARGUMENT_EXCEPTION: .mget() requires 2 arguments.');
    log(false, '.mget() called:', {keys: keys});
    var values = {};
    for(var i = 0; i < keys.length; i++){
      var key = keys[i];
      self.get(key, function(err, response){
        if(response !== null){
          values[key] = response;
        }
      });
    }
    cb(null, values, index);
  }

  /**
   * Associate a key and value and optionally set an expiration
   * @param {string} key
   * @param {string | object} value
   * @param {integer} expiration
   * @param {function} refresh
   * @param {function} cb
   */
  self.set = function(){
    throwErrorIf((arguments.length < 2), 'ARGUMENT_EXCEPTION: .set() requires at least 2 arguments.');
    var key = arguments[0];
    var value = arguments[1];
    var expiration = arguments[2] || null;
    var refresh = (arguments.length == 5) ? arguments[3] : null;
    var cb = (arguments.length == 5) ? arguments[4] : arguments[3];
    log(false, '.set() called:', {key: key, value: value});
    if(!self.readOnly){
      try {
        expiration = (expiration) ? (expiration * 1000) : (self.defaultExpiration * 1000);
        var exp = expiration + Date.now();
        cache.expirations[key] = exp;
        cache.db[key] = value;
        if(cb) cb();
        if(refresh){
          cache.refreshKeys[key] = {expiration: exp, lifeSpan: expiration, refresh: refresh};
          backgroundRefreshInit();
        }
        overwriteBrowserStorage();
      } catch (err) {
        log(true, '.set() failed for cache of type ' + self.type, {name: 'CacheModuleSetException', message: err});
      }
    }
  }

  /**
   * Associate multiple keys with multiple values and optionally set expirations per function and/or key
   * @param {object} obj
   * @param {integer} expiration
   * @param {function} cb
   */
  self.mset = function(obj, expiration, cb){
    throwErrorIf((arguments.length < 1), 'ARGUMENT_EXCEPTION: .mset() requires at least 1 argument.');
    log(false, '.mset() called:', {data: obj});
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        var tempExpiration = expiration || self.defaultExpiration;
        var value = obj[key];
        if(typeof value === 'object' && value.cacheValue){
          tempExpiration = value.expiration || tempExpiration;
          value = value.cacheValue;
        }
        self.set(key, value, tempExpiration);
      }
    }
    if(cb) cb();
  }

  /**
   * Delete the provided keys and their associated values
   * @param {array} keys
   * @param {function} cb
   */
  self.del = function(keys, cb){
    throwErrorIf((arguments.length < 1), 'ARGUMENT_EXCEPTION: .del() requires at least 1 argument.');
    log(false, '.del() called:', {keys: keys});
    if(typeof keys === 'object'){
      for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        delete cache.db[key];
        delete cache.expirations[key];
        delete cache.refreshKeys[key];
      }
      if(cb) cb(null, keys.length);
    }
    else{
      delete cache.db[keys];
      delete cache.expirations[keys];
      delete cache.refreshKeys[keys];
      if(cb) cb(null, 1); 
    }
    overwriteBrowserStorage();
  }

  /**
   * Flush all keys and values
   * @param {function} cb
   */
  self.flush = function(cb){
    log(false, '.flush() called');
    cache.db = {};
    cache.expirations = {};
    cache.refreshKeys = {};
    if(cb) cb();
    overwriteBrowserStorage();
  }

  /**
   * Enable browser storage if desired and available
   */
  function setupBrowserStorage(){
    if(browser || storageMock){
      if(storageMock){
        store = storageMock;
        storageKey = 'cache-module-storage-mock';
      }
      else{
        var storageType = (config.storage === 'local' || config.storage === 'session') ? config.storage : null;
        store = (storageType && typeof Storage !== void(0)) ? window[storageType + 'Storage'] : false;
        storageKey = (storageType) ? 'cache-module-' + storageType + '-storage' : null;
      }
      if(store){
        var db = store.getItem(storageKey);
        try {
          cache = JSON.parse(db) || cache;
        } catch (err) { /* Do nothing */ }
      }
      // If storageType is set but store is not, the desired storage mechanism was not available
      else if(storageType){
        log(true, 'Browser storage is not supported by this browser. Defaulting to an in-memory cache.');
      }
    }
  }

  /**
   * Overwrite namespaced browser storage with current cache
   */
  function overwriteBrowserStorage(){
    if((browser && store) || storageMock){
      var db = cache;
      try {
        db = JSON.stringify(db);
      } catch (err) { /* Do nothing */ }
      store.setItem(storageKey, db);
    }
  }

  /**
   * Throw a given error if error is true
   * @param {boolean} error
   * @param {string} message
   */
  function throwErrorIf(error, message){
    if(error) throw new Error(message);
  }

  /**
   * Delete a given key from cache.db and cache.expirations but not from cache.refreshKeys
   * @param {string} key
   */
  function expire(key){
    delete cache.db[key];
    delete cache.expirations[key];
    overwriteBrowserStorage();
  }

  /**
   * Initialize background refresh
   */
  function backgroundRefreshInit(){
    if(!backgroundRefreshEnabled){
      backgroundRefreshEnabled = true;
      if(self.backgroundRefreshIntervalCheck){
        if(self.backgroundRefreshInterval > self.backgroundRefreshMinTtl){
          throw new Error('BACKGROUND_REFRESH_INTERVAL_EXCEPTION: backgroundRefreshInterval cannot be greater than backgroundRefreshMinTtl.');
        }
      }
      setInterval(backgroundRefresh, self.backgroundRefreshInterval);
    }
  }

  /**
   * Handle the refresh callback from the consumer, save the data to redis.
   *
   * @param {string} key The key used to save.
   * @param {Object} data refresh keys data.
   * @param {Error|null} err consumer callback failure.
   * @param {*} response The consumer response.
   */
  function handleRefreshResponse (key, data, err, response) {
    if(!err) {
      this.set(key, response, (data.lifeSpan / 1000), data.refresh, function(){});
    }
  }

  /**
   * Refreshes all keys that were set with a refresh function
   */
  function backgroundRefresh() {
    var keys = Object.keys(cache.refreshKeys);
    keys.forEach(function(key) {
      var data = cache.refreshKeys[key];
      if(data.expiration - Date.now() < this.backgroundRefreshMinTtl){
        data.refresh(key, handleRefreshResponse.bind(this, key, data));
      }
    }, self);
  }

  /**
   * Error logging logic
   * @param {boolean} isError
   * @param {string} message
   * @param {object} data
   */
  function log(isError, message, data){
    if(self.verbose || isError){
      if(data) console.log(self.type + ': ' + message, data);
      else console.log(self.type + message);
    }
  }
}

module.exports = cacheModule;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var $Object = __webpack_require__(13).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(77);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(15).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(15);
var core = __webpack_require__(13);
var ctx = __webpack_require__(79);
var hide = __webpack_require__(82);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(16);
var createDesc = __webpack_require__(84);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(14)(function () {
  return Object.defineProperty(__webpack_require__(80)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(81);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(2), 'Object', { defineProperty: __webpack_require__(16).f });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(109);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(20)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(89);

/**
 * superagentCache constructor
 * @constructor
 * @param {cache module} cache
 * @param {object} defaults (optional)
 */
module.exports = function(cache, defaults){
  var self = this;
  var supportedMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'];
  var cacheableMethods = ['GET', 'HEAD'];
  this.cache = cache;
  this.defaults = defaults || {};

  return function (Request) {
    var props = utils.resetProps(self.defaults);

    /**
     * Whether to execute an http query if the cache does not have the generated key
     * @param {boolean} doQuery
     */
    Request.doQuery = function(doQuery){
      props.doQuery = doQuery;
      return Request;
    }

    /**
     * Remove the given params from the query object after executing an http query and before generating a cache key
     * @param {array of strings} pruneQuery
     */
    Request.pruneQuery = function(pruneQuery){
      props.pruneQuery = pruneQuery;
      return Request;
    }

    /**
     * Remove the given options from the headers object after executing an http query and before generating a cache key
     * @param {boolean} pruneHeader
     */
    Request.pruneHeader = function(pruneHeader){
      props.pruneHeader = pruneHeader;
      return Request;
    }

    /**
     * Execute some logic on superagent's http response object before caching and returning it
     * @param {function} prune
     */
    Request.prune = function(prune){
      props.prune = prune;
      return Request;
    }

    /**
     * Retrieve a top-level property from superagent's http response object before to cache and return
     * @param {string} responseProp
     */
    Request.responseProp = function(responseProp){
      props.responseProp = responseProp;
      return Request;
    }

    /**
     * Set an expiration for Request key that will override the configured cache's default expiration
     * @param {integer} expiration (seconds)
     */
    Request.expiration = function(expiration){
      props.expiration = expiration;
      return Request;
    }

    /**
     * Whether to cache superagent's http response object when it "empty"--especially useful with .prune and .pruneQuery
     * @param {boolean} cacheWhenEmpty
     */
    Request.cacheWhenEmpty = function(cacheWhenEmpty){
      props.cacheWhenEmpty = cacheWhenEmpty;
      return Request;
    }

    /**
     * Whether to execute an http query regardless of whether the cache has the generated key
     * @param {boolean} forceUpdate
     */
    Request.forceUpdate = function(forceUpdate){
      props.forceUpdate = (typeof forceUpdate === 'boolean') ? forceUpdate : true;
      return Request;
    }

    /**
     * Save the exisitng .end() value ("namespaced" in case of other plugins)
     * so that we can provide our customized .end() and then call through to
     * the underlying implementation.
     */
    var end = Request.end;

    /**
     * Execute all caching and http logic
     * @param {function} cb
     */
    Request.end = function(cb){
      Request.scRedirectsList = Request.scRedirectsList || [];
      Request.scRedirectsList = Request.scRedirectsList.concat(Request._redirectList);
      if(~supportedMethods.indexOf(Request.method.toUpperCase())){
        var _Request = Request;
        var key = utils.keygen(Request, props);
        if(~cacheableMethods.indexOf(Request.method.toUpperCase())){
          cache.get(key, function (err, response){
            if(!err && response && !props.forceUpdate){
              utils.callbackExecutor(cb, err, response, key);
            }
            else{
              if(props.doQuery){
                end.call(Request, function (err, response){
                  if(err){
                    return utils.callbackExecutor(cb, err, response, key);
                  }
                  else if(!err && response){
                    response.redirects = _Request.scRedirectsList;
                    if(props.prune){
                      response = props.prune(response);
                    }
                    else if(props.responseProp){
                      response = response[props.responseProp] || null;
                    }
                    else{
                      response = utils.gutResponse(response);
                    }
                    if(!utils.isEmpty(response) || props.cacheWhenEmpty){
                      cache.set(key, response, props.expiration, function (){
                        return utils.callbackExecutor(cb, err, response, key);
                      });
                    }
                    else{
                      return utils.callbackExecutor(cb, err, response, key);
                    }
                  }
                });
              }
              else{
                return utils.callbackExecutor(cb, null, null, key);
              }
            }
          });
        }
        else{
          end.call(Request, function (err, response){
            if(err){
              return utils.callbackExecutor(cb, err, response, key);
            }
            if(!err && response){
              var keyGet = key.replace('"method":"' + _Request.method + '"', '"method":"GET"');
              var keyHead = key.replace('"method":"' + _Request.method + '"', '"method":"HEAD"');
              cache.del([keyGet, keyHead], function (){
                utils.callbackExecutor(cb, err, response, key);
              });
            }
          });
        }
      }
      else{
        end.call(Request, function (err, response){
          return utils.callbackExecutor(cb, err, response, undefined);
        });
      }
    }

    return Request;
  }
}


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = {
  /**
   * Generate a cache key unique to this query
   * @param {superagent} agent
   * @param {object} reg
   * @param {object} cProps
   */
  keygen: function(req, props){
    var cleanParams = null;
    var cleanOptions = null;
    var params = this.getQueryParams(req);
    var options = this.getHeaderOptions(req);
    if(props.pruneQuery || props.pruneHeader){
      cleanParams = (props.pruneQuery) ? this.pruneObj(this.cloneObject(params), props.pruneQuery) : params;
      cleanOptions = (props.pruneHeader) ? this.pruneObj(this.cloneObject(options), props.pruneHeader, true) : options;
    }
    return JSON.stringify({
      method: req.method,
      uri: req.url,
      params: cleanParams || params || null,
      options: cleanOptions || options || null
    });
  },

  /**
   * Find and extract query params
   * @param {object} reg
   */
  getQueryParams: function(req){
    if(req && req.qs && !this.isEmpty(req.qs)){
      return req.qs;
    }
    else if(req && req.qsRaw){
      return this.arrayToObj(req.qsRaw);
    }
    else if(req && req.req){
      return this.stringToObj(req.req.path);
    }
    else if(req && req._query){
      return this.stringToObj(req._query.join('&'));
    }
    return null;
  },

  /**
   * Find and extract headers
   * @param {object} reg
   */
  getHeaderOptions: function(req){
    //I have to remove the User-Agent header ever since superagent 1.7.0
    if(req && req._header){
      return this.pruneObj(req._header, ['User-Agent', 'user-agent']);
    }
    else if(req && req.req && req.req._headers){
      return this.pruneObj(req.req._headers, ['User-Agent', 'user-agent']);
    }
    else if(req && req.header){
      return this.pruneObj(req.header, ['User-Agent', 'user-agent']);
    }
    return null;
  },

  /**
   * Convert an array to an object
   * @param {array} arr
   */
  arrayToObj: function(arr){
    if(arr && arr.length){
      var obj = {};
      for(var i = 0; i < arr.length; i++){
        var str = arr[i];
        var kvArray = str.split('&');
        for(var j = 0; j < kvArray.length; j++){
          var kvString = kvArray[j].split('=');
          obj[kvString[0]] = kvString[1];
        }
      }
      return obj;
    }
    return null;
  },

  /**
   * Convert a string to an object
   * @param {string} str
   */
  stringToObj: function(str){
    if(str){
      var obj = {};
      if(~str.indexOf('?')){
        var strs = str.split('?');
        str = strs[1];
      }
      var kvArray = str.split('&');
      for(var i = 0; i < kvArray.length; i++){
        var kvString = kvArray[i].split('=');
        obj[kvString[0]] = kvString[1];
      }
      return obj;
    }
    return null;
  },

  /**
   * Remove properties from an object
   * @param {object} obj
   * @param {array} props
   * @param {boolean} isOptions
   */
  pruneObj: function(obj, props, isOptions){
    for(var i = 0; i < props.length; i++){
      var prop = props[i];
      if(isOptions){
        delete obj[prop.toLowerCase()];
      }
      delete obj[prop];
    }
    return obj;
  },

  /**
   * Simplify superagent's http response object
   * @param {object} r
   */
  gutResponse: function(r){
    var newResponse = {};
    newResponse.body = r.body;
    newResponse.text = r.text;
    newResponse.headers = r.headers;
    newResponse.statusCode = r.statusCode;
    newResponse.status = r.status;
    newResponse.ok = r.ok;
    return newResponse;
  },

  /**
   * Determine whether a value is considered empty
   * @param {*} val
   */
  isEmpty: function(val){
    return (val === false || val === null || (typeof val == 'object' && Object.keys(val).length == 0));
  },

  /**
   * Return a clone of an object
   * @param {object} obj
   */
  cloneObject: function(obj){
    var newObj = {};
    for(var attr in obj) {
      if (obj.hasOwnProperty(attr)){
        newObj[attr] = obj[attr];
      }
    }
    return newObj;
  },

  /**
   * Reset superagent-cache's default query properties using the defaults object
   * @param {object} d
   */
  resetProps: function(d){
    return {
      doQuery: (typeof d.doQuery === 'boolean') ? d.doQuery : true,
      cacheWhenEmpty: (typeof d.cacheWhenEmpty === 'boolean') ? d.cacheWhenEmpty : true,
      prune: d.prune,
      pruneQuery: d.pruneQuery,
      pruneHeader: d.pruneHeader,
      responseProp: d.responseProp,
      expiration: d.expiration,
      forceUpdate: d.forceUpdate,
      preventDuplicateCalls: d.preventDuplicateCalls,
      backgroundRefresh: d.backgroundRefresh
    };
  },

  /**
   * Handle the varying number of callback output params
   * @param {function} cb
   * @param {object} err
   * @param {object} response
   * @param {string} key
   */
  callbackExecutor: function(cb, err, response, key){
    if(cb.length === 1){
      cb(response);
    }
    else if(cb.length > 1){
      cb(err, response, key);
    }
    else{
      throw new Error('UnsupportedCallbackException: Your .end() callback must pass at least one argument.');
    }
  }
}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = __webpack_require__(95);
var RequestBase = __webpack_require__(91);
var isObject = __webpack_require__(18);
var ResponseBase = __webpack_require__(92);
var shouldRetry = __webpack_require__(93);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto'
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(18);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype["catch"] = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(94);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * tiny-cookie - A tiny cookie manipulation plugin
 * https://github.com/Alex1990/tiny-cookie
 * Under the MIT license | (c) Alex Chao
 */

!(function(root, factory) {

  // Uses CommonJS, AMD or browser global to create a jQuery plugin.
  // See: https://github.com/umdjs/umd
  if (true) {
    // Expose this plugin as an AMD module. Register an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // Node/CommonJS module
    module.exports = factory();
  } else {
    // Browser globals 
    root.Cookie = factory();
  }

}(this, function() {

  'use strict';

  // The public function which can get/set/remove cookie.
  function Cookie(key, value, opts) {
    if (value === void 0) {
      return Cookie.get(key);
    } else if (value === null) {
      Cookie.remove(key);
    } else {
      Cookie.set(key, value, opts);
    }
  }

  // Check if the cookie is enabled.
  Cookie.enabled = function() {
    var key = '__test_key';
    var enabled;

    document.cookie = key + '=1';
    enabled = !!document.cookie;

    if (enabled) Cookie.remove(key);

    return enabled;
  };

  // Get the cookie value by the key.
  Cookie.get = function(key, raw) {
    if (typeof key !== 'string' || !key) return null;

    key = '(?:^|; )' + escapeRe(key) + '(?:=([^;]*?))?(?:;|$)';

    var reKey = new RegExp(key);
    var res = reKey.exec(document.cookie);

    return res !== null ? (raw ? res[1] : decodeURIComponent(res[1])) : null;
  };

  // Get the cookie's value without decoding.
  Cookie.getRaw = function(key) {
    return Cookie.get(key, true);
  };

  // Set a cookie.
  Cookie.set = function(key, value, raw, opts) {
    if (raw !== true) {
      opts = raw;
      raw = false;
    }
    opts = opts ? convert(opts) : convert({});
    var cookie = key + '=' + (raw ? value : encodeURIComponent(value)) + opts;
    document.cookie = cookie;
  };

  // Set a cookie without encoding the value.
  Cookie.setRaw = function(key, value, opts) {
    Cookie.set(key, value, true, opts);
  };

  // Remove a cookie by the specified key.
  Cookie.remove = function(key) {
    Cookie.set(key, 'a', { expires: new Date() });
  };

  // Helper function
  // ---------------

  // Escape special characters.
  function escapeRe(str) {
    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
  }

  // Convert an object to a cookie option string.
  function convert(opts) {
    var res = '';

    for (var p in opts) {
      if (opts.hasOwnProperty(p)) {

        if (p === 'expires') {
          var expires = opts[p];
          if (typeof expires !== 'object') {
            expires += typeof expires === 'number' ? 'D' : '';
            expires = computeExpires(expires);
          }
          opts[p] = expires.toUTCString();
        }

        if (p === 'secure') {
          if (opts[p]) {
            res += ';' + p;
          }

          continue;
        }

        res += ';' + p + '=' + opts[p];
      }
    }

    if (!opts.hasOwnProperty('path')) {
      res += ';path=/';
    }

    return res;
  }

  // Return a future date by the given string.
  function computeExpires(str) {
    var expires = new Date();
    var lastCh = str.charAt(str.length - 1);
    var value = parseInt(str, 10);

    switch (lastCh) {
      case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
      case 'M': expires.setMonth(expires.getMonth() + value); break;
      case 'D': expires.setDate(expires.getDate() + value); break;
      case 'h': expires.setHours(expires.getHours() + value); break;
      case 'm': expires.setMinutes(expires.getMinutes() + value); break;
      case 's': expires.setSeconds(expires.getSeconds() + value); break;
      default: expires = new Date(str);
    }

    return expires;
  }

  return Cookie;

}));


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VeeValidate"] = factory();
	else
		root["VeeValidate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return getDataAttribute; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return getScope; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return isObject; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Gets the data attribute. the name must be kebab-case.
 */
var getDataAttribute = function getDataAttribute(el, name) {
    return el.getAttribute('data-vv-' + name);
};

/**
 * Determines the input field scope.
 */
var getScope = function getScope(el) {
    var scope = getDataAttribute(el, 'scope');
    if (!scope && el.form) {
        scope = getDataAttribute(el.form, 'scope');
    }

    return scope;
};

/**
 * Debounces a function.
 */
var debounce = function debounce(func) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var execAsap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!threshold) {
        return func;
    }

    var timeout = void 0;

    return function debounced(_ref) {
        var _ref2 = _toArray(_ref);

        var args = _ref2;

        var obj = this;

        function delayed() {
            if (!execAsap) {
                func.apply(obj, args);
            }
            timeout = null;
        }

        if (timeout) {
            clearTimeout(timeout);
        } else if (execAsap) {
            func.apply.apply(func, [obj].concat(_toConsumableArray(args)));
        }

        timeout = setTimeout(delayed, threshold || 100);
    };
};

/**
 * Emits a warning to the console.
 */
var warn = function warn(message) {
    if (!console) {
        return;
    }

    console.warn('[vee-validate]: ' + message); // eslint-disable-line
};

/**
 * Checks if the value is an object.
 */
// eslint-disable-next-line
var isObject = function isObject(object) {
    return object !== null && object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && !Array.isArray(object);
};

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorBag = function () {
    function ErrorBag() {
        _classCallCheck(this, ErrorBag);

        this.errors = [];
    }

    /**
     * Adds an error to the internal array.
     *
     * @param {string} field The field name.
     * @param {string} msg The error message.
     * @param {String} rule The rule that is responsible for the error.
     * @param {String} scope The Scope name, optional.
     */


    _createClass(ErrorBag, [{
        key: 'add',
        value: function add(field, msg, rule) {
            var scope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            this.errors.push({ field: field, msg: msg, rule: rule, scope: scope });
        }

        /**
         * Gets all error messages from the internal array.
         *
         * @param {String} scope The Scope name optional.
         * @return {Array} errors Array of all error messages.
         */

    }, {
        key: 'all',
        value: function all(scope) {
            if (scope) {
                return this.errors.filter(function (e) {
                    return e.scope === scope;
                }).map(function (e) {
                    return e.msg;
                });
            }

            return this.errors.map(function (e) {
                return e.msg;
            });
        }

        /**
         * Checks if there are any errors in the internal array.
         * @param {String} scope The Scope name optional.
         * @return {boolean} result True if there was at least one error false otherwise.
         */

    }, {
        key: 'any',
        value: function any(scope) {
            if (scope) {
                return !!this.errors.filter(function (e) {
                    return e.scope === scope;
                }).length;
            }

            return !!this.errors.length;
        }

        /**
         * Removes all items from the internal array.
         *
         * @param {String} scope The Scope name optional.
         */

    }, {
        key: 'clear',
        value: function clear(scope) {
            if (scope) {
                this.errors = this.errors.filter(function (e) {
                    return e.scope !== scope;
                });

                return;
            }

            this.errors = [];
        }

        /**
         * Collects errors into groups or for a specific field.
         *
         * @param  {string} field The field name.
         * @param  {string} scope The scope name.
         * @param {Boolean} map If it should map the errors to strings instead of objects.
         * @return {Array} errors The errors for the specified field.
         */

    }, {
        key: 'collect',
        value: function collect(field, scope) {
            var _this = this;

            var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (!field) {
                var _ret = function () {
                    var collection = {};
                    _this.errors.forEach(function (e) {
                        if (!collection[e.field]) {
                            collection[e.field] = [];
                        }

                        collection[e.field].push(map ? e.msg : e);
                    });

                    return {
                        v: collection
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }

            if (scope) {
                return this.errors.filter(function (e) {
                    return e.field === field && e.scope === scope;
                }).map(function (e) {
                    return map ? e.msg : e;
                });
            }

            return this.errors.filter(function (e) {
                return e.field === field;
            }).map(function (e) {
                return map ? e.msg : e;
            });
        }
        /**
         * Gets the internal array length.
         *
         * @return {Number} length The internal array length.
         */

    }, {
        key: 'count',
        value: function count() {
            return this.errors.length;
        }

        /**
         * Gets the first error message for a specific field.
         *
         * @param  {string} field The field name.
         * @return {string|null} message The error message.
         */

    }, {
        key: 'first',
        value: function first(field, scope) {
            var selector = this.selector(field);

            if (selector) {
                return this.firstByRule(selector.name, selector.rule, scope);
            }

            for (var i = 0; i < this.errors.length; i++) {
                if (this.errors[i].field === field && (!scope || this.errors[i].scope === scope)) {
                    return this.errors[i].msg;
                }
            }

            return null;
        }

        /**
         * Checks if the internal array has at least one error for the specified field.
         *
         * @param  {string} field The specified field.
         * @return {Boolean} result True if at least one error is found false otherwise.
         */

    }, {
        key: 'has',
        value: function has(field, scope) {
            return !!this.first(field, scope);
        }

        /**
         * Gets the first error message for a specific field and a rule.
         * @param {String} name The name of the field.
         * @param {String} rule The name of the rule.
         * @param {String} scope The name of the scope (optional).
         */

    }, {
        key: 'firstByRule',
        value: function firstByRule(name, rule, scope) {
            var error = this.collect(name, scope, false).filter(function (e) {
                return e.rule === rule;
            })[0];

            return error && error.msg || null;
        }

        /**
         * Removes all error messages associated with a specific field.
         *
         * @param  {string} field The field which messages are to be removed.
         * @param {String} scope The Scope name optional.
         */

    }, {
        key: 'remove',
        value: function remove(field, scope) {
            if (scope) {
                this.errors = this.errors.filter(function (e) {
                    return e.field !== field || e.scope !== scope;
                });

                return;
            }

            this.errors = this.errors.filter(function (e) {
                return e.field !== field;
            });
        }

        /**
         * Get the field attributes if there's a rule selector.
         *
         * @param  {string} field The specified field.
         * @return {Object|null}
         */

    }, {
        key: 'selector',
        value: function selector(field) {
            if (field.indexOf(':') > -1) {
                var _field$split = field.split(':');

                var _field$split2 = _slicedToArray(_field$split, 2);

                var name = _field$split2[0];
                var rule = _field$split2[1];


                return { name: name, rule: rule };
            }

            return null;
        }
    }]);

    return ErrorBag;
}();

/* harmony default export */ exports["a"] = ErrorBag;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validator__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return unregister; });
/* unused harmony export find */


/**
 * Keeps track of $vm, $validator instances.
 * @type {Array}
 */
var instances = [];

/**
 * Finds a validator instance from the instances array.
 * @param  {[type]} $vm The Vue instance.
 * @return {object} pair the $vm,$validator pair.
 */
var find = function find($vm) {
    for (var i = 0; i < instances.length; i++) {
        if (instances[i].$vm === $vm) {
            return instances[i].$validator;
        }
    }

    return undefined;
};

/**
 * Registers a validator for a $vm instance.
 * @param  {*} $vm The Vue instance.
 * @return {Validator} $validator The validator instance.
 */
var register = function register($vm) {
    var instance = find($vm);
    if (!instance) {
        instance = __WEBPACK_IMPORTED_MODULE_0__validator__["a" /* default */].create(undefined, $vm);

        instances.push({
            $vm: $vm,
            $validator: instance
        });
    }

    return instance;
};

var unregister = function unregister($vm) {
    for (var i = 0; i < instances.length; i++) {
        if (instances[i].$vm === $vm) {
            instances.splice(i, 1);

            return true;
        }
    }

    return false;
};



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rules__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorBag__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exceptions_validatorException__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dictionary__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_date__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fieldBag__ = __webpack_require__(12);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










var LOCALE = 'en';
var STRICT_MODE = true;
var dictionary = new __WEBPACK_IMPORTED_MODULE_3__dictionary__["a" /* default */]({
    en: {
        messages: __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* default */],
        attributes: {}
    }
});

var Validator = function () {
    function Validator(validations, $vm) {
        _classCallCheck(this, Validator);

        this.strictMode = STRICT_MODE;
        this.$fields = {};
        this.fieldBag = new __WEBPACK_IMPORTED_MODULE_7__fieldBag__["a" /* default */]();
        this._createFields(validations);
        this.errorBag = new __WEBPACK_IMPORTED_MODULE_1__errorBag__["a" /* default */]();
        this.$vm = $vm;

        // if momentjs is present, install the validators.
        if (typeof moment === 'function') {
            // eslint-disable-next-line
            this.installDateTimeValidators(moment);
        }
    }

    /**
     * Merges a validator object into the Rules and Messages.
     *
     * @param  {string} name The name of the validator.
     * @param  {function|object} validator The validator object.
     */


    _createClass(Validator, [{
        key: '_resolveValuesFromGetters',


        /**
         * Resolves the field values from the getter functions.
         */
        value: function _resolveValuesFromGetters(scope) {
            var _this = this;

            var values = {};
            Object.keys(this.$fields).forEach(function (field) {
                var getter = _this.$fields[field].getter;
                var context = _this.$fields[field].context;
                var fieldScope = typeof _this.$fields[field].scope === 'function' ? _this.$fields[field].scope() : undefined;

                if (getter && context && (!scope || fieldScope === scope)) {
                    values[field] = {
                        value: getter(context()),
                        scope: fieldScope
                    };
                }
            });

            return values;
        }

        /**
         * Creates the fields to be validated.
         *
         * @param  {object} validations
         * @return {object} Normalized object.
         */

    }, {
        key: '_createFields',
        value: function _createFields(validations) {
            var _this2 = this;

            if (!validations) {
                return;
            }

            Object.keys(validations).forEach(function (field) {
                _this2._createField(field, validations[field]);
            });
        }

        /**
         * Creates a field entry in the fields object.
         * @param {String} name.
         * @param {String} Checks.
         */

    }, {
        key: '_createField',
        value: function _createField(name, checks) {
            var _this3 = this;

            if (!this.$fields[name]) {
                this.$fields[name] = {};
            }

            this.fieldBag._add(name);
            this.$fields[name].validations = [];

            if (Array.isArray(checks)) {
                this.$fields[name].validations = checks;

                return;
            }

            checks.split('|').forEach(function (rule) {
                var normalizedRule = _this3._normalizeRule(rule, _this3.$fields[name].validations);
                if (!normalizedRule.name) {
                    return;
                }

                if (normalizedRule.name === 'required') {
                    _this3.$fields[name].required = true;
                }

                _this3.$fields[name].validations.push(normalizedRule);
            });
        }

        /**
         * Normalizes a single validation object.
         *
         * @param  {string} rule The rule to be normalized.
         * @return {object} rule The normalized rule.
         */

    }, {
        key: '_normalizeRule',
        value: function _normalizeRule(rule, validations) {
            var params = [];
            var name = rule.split(':')[0];

            if (~rule.indexOf(':')) {
                params = rule.split(':').slice(1).join(':').split(',');
            }

            // Those rules need the date format to parse and compare correctly.
            if (__WEBPACK_IMPORTED_MODULE_6__plugins_date__["a" /* default */].installed && ~['after', 'before', 'date_between'].indexOf(name)) {
                var dateFormat = validations.filter(function (v) {
                    return v.name === 'date_format';
                })[0];
                if (dateFormat) {
                    // pass it as the last param.
                    params.push(dateFormat.params[0]);
                }
            }

            return { name: name, params: params };
        }

        /**
         * Formats an error message for field and a rule.
         *
         * @param  {string} field The field name.
         * @param  {object} rule Normalized rule object.
         * @param {object} data Additional Information about the validation result.
         * @return {string} msg Formatted error message.
         */

    }, {
        key: '_formatErrorMessage',
        value: function _formatErrorMessage(field, rule) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var name = this._getFieldDisplayName(field);
            var params = this._getLocalizedParams(rule);

            if (!dictionary.hasLocale(LOCALE) || typeof dictionary.getMessage(LOCALE, rule.name) !== 'function') {
                // Default to english message.
                return dictionary.getMessage('en', rule.name)(name, params, data);
            }

            return dictionary.getMessage(LOCALE, rule.name)(name, params, data);
        }

        /**
         * Translates the parameters passed to the rule (mainly for target fields).
         */

    }, {
        key: '_getLocalizedParams',
        value: function _getLocalizedParams(rule) {
            if (~['after', 'before', 'confirmed'].indexOf(rule.name) && rule.params && rule.params[0]) {
                return [dictionary.getAttribute(LOCALE, rule.params[0], rule.params[0])];
            }

            return rule.params;
        }

        /**
         * Resolves an appropiate display name first checking 'data-as' or the registered 'prettyName'
         * Then the dictionary then fallsback to field name.
         * @return {String} displayName The name to be used in the errors.
         */

    }, {
        key: '_getFieldDisplayName',
        value: function _getFieldDisplayName(field) {
            return this.$fields[field].name || dictionary.getAttribute(LOCALE, field, field);
        }

        /**
         * Tests a single input value against a rule.
         *
         * @param  {*} name The name of the field.
         * @param  {*} value  [description]
         * @param  {object} rule the rule object.
         * @return {boolean} Whether it passes the check.
         */

    }, {
        key: '_test',
        value: function _test(name, value, rule, scope) {
            var _this4 = this;

            var validator = __WEBPACK_IMPORTED_MODULE_0__rules__["a" /* default */][rule.name];
            if (!validator || typeof validator !== 'function') {
                throw new __WEBPACK_IMPORTED_MODULE_2__exceptions_validatorException__["a" /* default */]('No such validator \'' + rule.name + '\' exists.');
            }

            var result = validator(value, rule.params, name);

            // If it is a promise.
            if (typeof result.then === 'function') {
                return result.then(function (values) {
                    var allValid = true;
                    var data = {};
                    if (Array.isArray(values)) {
                        allValid = values.every(function (t) {
                            return t.valid;
                        });
                    } else {
                        // Is a single object.
                        allValid = values.valid;
                        data = values.data;
                    }

                    if (!allValid) {
                        _this4.errorBag.add(name, _this4._formatErrorMessage(name, rule, data), rule.name, scope);
                    }

                    return allValid;
                });
            }

            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_helpers__["a" /* isObject */])(result)) {
                result = { valid: result, data: {} };
            }

            if (!result.valid) {
                this.errorBag.add(name, this._formatErrorMessage(name, rule, result.data), rule.name, scope);
            }

            return result.valid;
        }

        /**
         * Registers a field to be validated.
         *
         * @param  {string} name The field name.
         * @param  {string} checks validations expression.
         * @param {string} prettyName Custom name to be used as field name in error messages.
         * @param {Function} getter A function used to retrive a fresh value for the field.
         */

    }, {
        key: 'attach',
        value: function attach(name, checks) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.errorBag.remove(name);
            this._createField(name, checks);
            this.$fields[name].scope = options.scope;
            this.$fields[name].name = options.prettyName;
            this.$fields[name].getter = options.getter;
            this.$fields[name].context = options.context;
            this.$fields[name].listeners = options.listeners || {
                detach: function detach() {}
            };
        }

        /**
         * Removes a field from the validator.
         *
         * @param  {String} name The name of the field.
         * @param {String} scope The name of the field scope.
         */

    }, {
        key: 'detach',
        value: function detach(name, scope) {
            // No such field.
            if (!this.$fields[name]) {
                return;
            }

            /* istanbul ignore if */
            if (this.$vm && typeof this.$vm.$emit === 'function') {
                this.$fields[name].listeners.detach();
            }

            this.errorBag.remove(name, scope);
            this.fieldBag._remove(name);
            delete this.$fields[name];
        }

        /**
         * Adds a custom validator to the list of validation rules.
         *
         * @param  {string} name The name of the validator.
         * @param  {object|function} validator The validator object/function.
         */

    }, {
        key: 'extend',
        value: function extend(name, validator) {
            Validator.extend(name, validator);
        }

        /**
         * Gets the internal errorBag instance.
         *
         * @return {ErrorBag} errorBag The internal error bag object.
         */

    }, {
        key: 'getErrors',
        value: function getErrors() {
            return this.errorBag;
        }

        /**
         * Gets the currently active locale.
         *
         * @return {String} Locale identifier.
         */

    }, {
        key: 'getLocale',
        value: function getLocale() {
            return LOCALE;
        }

        /**
         * Just an alias to the static method for convienece.
         */

    }, {
        key: 'installDateTimeValidators',
        value: function installDateTimeValidators(moment) {
            Validator.installDateTimeValidators(moment);
        }

        /**
         * Removes a rule from the list of validators.
         * @param {String} name The name of the validator/rule.
         */

    }, {
        key: 'remove',
        value: function remove(name) {
            Validator.remove(name);
        }

        /**
         * Sets the validator current langauge.
         *
         * @param {string} language locale or language id.
         */

    }, {
        key: 'setLocale',
        value: function setLocale(language) {
            /* istanbul ignore if */
            if (!dictionary.hasLocale(language)) {
                // eslint-disable-next-line
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_helpers__["b" /* warn */])('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
            }

            LOCALE = language;
        }

        /**
         * Sets the operating mode for this validator.
         * strictMode = true: Values without a rule are invalid and cause failure.
         * strictMode = false: Values without a rule are valid and are skipped.
         * @param {Boolean} strictMode.
         */

    }, {
        key: 'setStrictMode',
        value: function setStrictMode() {
            var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.strictMode = strictMode;
        }

        /**
         * Updates the messages dicitionary overwriting existing values and adding new ones.
         *
         * @param  {object} data The messages object.
         */

    }, {
        key: 'updateDictionary',
        value: function updateDictionary(data) {
            Validator.updateDictionary(data);
        }

        /**
         * Validates a value against a registered field validations.
         *
         * @param  {string} name the field name.
         * @param  {*} value The value to be validated.
         * @return {boolean|Promise} result returns a boolean or a promise that will resolve to
         *  a boolean.
         */

    }, {
        key: 'validate',
        value: function validate(name, value, scope) {
            var _this5 = this;

            if (!this.$fields[name]) {
                if (!this.strictMode) {
                    return true;
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_helpers__["b" /* warn */])('Trying to validate a non-existant field: "' + name + '". Use "attach()" first.');

                return false;
            }

            this.errorBag.remove(name, scope);
            // if its not required and is empty or null or undefined then it passes.
            if (!this.$fields[name].required && ~[null, undefined, ''].indexOf(value)) {
                return true;
            }

            var test = true;
            var promises = [];
            this.$fields[name].validations.forEach(function (rule) {
                var result = _this5._test(name, value, rule, scope);
                if (typeof result.then === 'function') {
                    promises.push(result);
                    return;
                }

                test = test && result;
            });

            if (promises.length) {
                return Promise.all(promises).then(function (values) {
                    var valid = values.every(function (t) {
                        return t;
                    }) && test;
                    _this5.fieldBag._setFlags(name, { valid: valid, dirty: true });

                    return valid;
                });
            }

            this.fieldBag._setFlags(name, { valid: test, dirty: true });

            return test;
        }

        /**
         * Validates each value against the corresponding field validations.
         * @param  {object} values The values to be validated.
         * @return {Promise} Returns a promise with the validation result.
         */

    }, {
        key: 'validateAll',
        value: function validateAll(values) {
            var _this6 = this;

            var normalizedValues = void 0;
            if (!values) {
                normalizedValues = this._resolveValuesFromGetters();
                this.errorBag.clear();
            } else if (typeof values === 'string') {
                this.errorBag.clear(values);
                normalizedValues = this._resolveValuesFromGetters(values);
            } else {
                normalizedValues = {};
                Object.keys(values).forEach(function (key) {
                    normalizedValues[key] = {
                        value: values[key]
                    };
                });
            }

            var test = true;
            var promises = [];
            Object.keys(normalizedValues).forEach(function (property) {
                var result = _this6.validate(property, normalizedValues[property].value, normalizedValues[property].scope);
                if (typeof result.then === 'function') {
                    promises.push(result);
                    return;
                }

                test = test && result;
            });

            return Promise.all(promises).then(function (vals) {
                var valid = vals.every(function (t) {
                    return t;
                }) && test;

                return valid;
            });
        }
    }], [{
        key: '_merge',
        value: function _merge(name, validator) {
            if (typeof validator === 'function') {
                __WEBPACK_IMPORTED_MODULE_0__rules__["a" /* default */][name] = validator;
                dictionary.setMessage('en', name, function (field) {
                    return 'The ' + field + ' value is not valid.';
                });
                return;
            }

            __WEBPACK_IMPORTED_MODULE_0__rules__["a" /* default */][name] = validator.validate;

            if (validator.getMessage && typeof validator.getMessage === 'function') {
                dictionary.setMessage('en', name, validator.getMessage);
            }

            if (validator.messages) {
                dictionary.merge(Object.keys(validator.messages).reduce(function (prev, curr) {
                    var dict = prev;
                    dict[curr] = {
                        messages: _defineProperty({}, name, validator.messages[curr])
                    };

                    return dict;
                }, {}));
            }
        }

        /**
         * Guards from extnsion violations.
         *
         * @param  {string} name name of the validation rule.
         * @param  {object} validator a validation rule object.
         */

    }, {
        key: '_guardExtend',
        value: function _guardExtend(name, validator) {
            if (__WEBPACK_IMPORTED_MODULE_0__rules__["a" /* default */][name]) {
                throw new __WEBPACK_IMPORTED_MODULE_2__exceptions_validatorException__["a" /* default */]('Extension Error: There is an existing validator with the same name \'' + name + '\'.');
            }

            if (typeof validator === 'function') {
                return;
            }

            if (typeof validator.validate !== 'function') {
                throw new __WEBPACK_IMPORTED_MODULE_2__exceptions_validatorException__["a" /* default */](
                // eslint-disable-next-line
                'Extension Error: The validator \'' + name + '\' must be a function or have a \'validate\' method.');
            }

            if (typeof validator.getMessage !== 'function' && _typeof(validator.messages) !== 'object') {
                throw new __WEBPACK_IMPORTED_MODULE_2__exceptions_validatorException__["a" /* default */](
                // eslint-disable-next-line
                'Extension Error: The validator \'' + name + '\' must have a \'getMessage\' method or have a \'messages\' object.');
            }
        }

        /**
         * Static constructor.
         *
         * @param  {object} validations The validations object.
         * @return {Validator} validator A validator object.
         */

    }, {
        key: 'create',
        value: function create(validations, $vm) {
            return new Validator(validations, $vm);
        }

        /**
         * Adds a custom validator to the list of validation rules.
         *
         * @param  {string} name The name of the validator.
         * @param  {object|function} validator The validator object/function.
         */

    }, {
        key: 'extend',
        value: function extend(name, validator) {
            Validator._guardExtend(name, validator);
            Validator._merge(name, validator);
        }

        /**
         * Installs the datetime validators and the messages.
         */

    }, {
        key: 'installDateTimeValidators',
        value: function installDateTimeValidators(moment) {
            if (typeof moment !== 'function') {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_helpers__["b" /* warn */])('To use the date-time validators you must provide moment reference.');

                return false;
            }

            if (__WEBPACK_IMPORTED_MODULE_6__plugins_date__["a" /* default */].installed) {
                return true;
            }

            var validators = __WEBPACK_IMPORTED_MODULE_6__plugins_date__["a" /* default */].make(moment);
            Object.keys(validators).forEach(function (name) {
                Validator.extend(name, validators[name]);
            });

            Validator.updateDictionary({
                en: {
                    messages: __WEBPACK_IMPORTED_MODULE_6__plugins_date__["a" /* default */].messages
                }
            });
            __WEBPACK_IMPORTED_MODULE_6__plugins_date__["a" /* default */].installed = true;

            return true;
        }

        /**
         * Removes a rule from the list of validators.
         * @param {String} name The name of the validator/rule.
         */

    }, {
        key: 'remove',
        value: function remove(name) {
            delete __WEBPACK_IMPORTED_MODULE_0__rules__["a" /* default */][name];
        }

        /**
         * Sets the default locale for all validators.
         *
         * @param {String} language The locale id.
         */

    }, {
        key: 'setLocale',
        value: function setLocale() {
            var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

            /* istanbul ignore if */
            if (!dictionary.hasLocale(language)) {
                // eslint-disable-next-line
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_helpers__["b" /* warn */])('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
            }

            LOCALE = language;
        }

        /**
         * Sets the operating mode for all newly created validators.
         * strictMode = true: Values without a rule are invalid and cause failure.
         * strictMode = false: Values without a rule are valid and are skipped.
         * @param {Boolean} strictMode.
         */

    }, {
        key: 'setStrictMode',
        value: function setStrictMode() {
            var strictMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            STRICT_MODE = strictMode;
        }

        /**
         * Updates the dicitionary overwriting existing values and adding new ones.
         *
         * @param  {object} data The dictionary object.
         */

    }, {
        key: 'updateDictionary',
        value: function updateDictionary(data) {
            dictionary.merge(data);
        }
    }]);

    return Validator;
}();

/* harmony default export */ exports["a"] = Validator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isFDQN;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(2);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2["default"])(str);
  options = (0, _merge2["default"])(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isIP;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2["default"])(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listeners__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helpers__ = __webpack_require__(1);



var listenersInstances = [];

/* harmony default export */ exports["a"] = function (options) {
    return {
        bind: function bind(el, binding, vnode) {
            var listener = new __WEBPACK_IMPORTED_MODULE_0__listeners__["a" /* default */](el, binding, vnode, options);
            listener.attach();
            listenersInstances.push({ vm: vnode.context, el: el, instance: listener });
        },
        update: function update(el, _ref, _ref2) {
            var expression = _ref.expression;
            var value = _ref.value;
            var modifiers = _ref.modifiers;
            var oldValue = _ref.oldValue;
            var context = _ref2.context;

            if (!expression || value === oldValue) {
                return;
            }

            context.$validator.validate(expression || el.name, value, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_helpers__["d" /* getScope */])(el));
        },
        unbind: function unbind(el, binding, _ref3) {
            var context = _ref3.context;

            var holder = listenersInstances.filter(function (l) {
                return l.vm === context && l.el === el;
            })[0];
            holder.instance.detach();
            listenersInstances.splice(listenersInstances.indexOf(holder), 1);
        }
    };
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_maps__ = __webpack_require__(4);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ exports["a"] = function (options) {
    return {
        data: function data() {
            return _defineProperty({}, options.errorBagName, this.$validator.errorBag);
        },

        computed: _defineProperty({}, options.fieldsBagName, {
            get: function get() {
                return this.$validator.fieldBag;
            }
        }),
        mounted: function mounted() {
            this.$emit('validatorReady');
        },
        destroyed: function destroyed() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_maps__["a" /* unregister */])(this);
        }
    };
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable prefer-rest-params */


var Dictionary = function () {
    function Dictionary() {
        var dictionary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Dictionary);

        this.dictionary = {};
        this.merge(dictionary);
    }

    _createClass(Dictionary, [{
        key: 'hasLocale',
        value: function hasLocale(locale) {
            return !!this.dictionary[locale];
        }
    }, {
        key: 'getMessage',
        value: function getMessage(locale, key) {
            var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            if (!this.hasMessage(locale, key)) {
                return fallback;
            }

            return this.dictionary[locale].messages[key];
        }
    }, {
        key: 'getAttribute',
        value: function getAttribute(locale, key) {
            var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            if (!this.hasAttribute(locale, key)) {
                return fallback;
            }

            return this.dictionary[locale].attributes[key];
        }
    }, {
        key: 'hasMessage',
        value: function hasMessage(locale, key) {
            return !!(this.hasLocale(locale) && this.dictionary[locale].messages && this.dictionary[locale].messages[key]);
        }
    }, {
        key: 'hasAttribute',
        value: function hasAttribute(locale, key) {
            return !!(this.hasLocale(locale) && this.dictionary[locale].attributes && this.dictionary[locale].attributes[key]);
        }
    }, {
        key: 'merge',
        value: function merge(dictionary) {
            this._merge(this.dictionary, dictionary);
        }
    }, {
        key: 'setMessage',
        value: function setMessage(locale, key, message) {
            if (!this.hasLocale(locale)) {
                this.dictionary[locale] = {
                    messages: {},
                    attributes: {}
                };
            }

            this.dictionary[locale].messages[key] = message;
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(locale, key, attribute) {
            if (!this.hasLocale(locale)) {
                this.dictionary[locale] = {
                    messages: {},
                    attributes: {}
                };
            }

            this.dictionary[locale].attributes[key] = attribute;
        }
    }, {
        key: '_merge',
        value: function _merge(target, source) {
            var _this = this;

            if (!(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["a" /* isObject */])(target) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["a" /* isObject */])(source))) {
                return target;
            }

            Object.keys(source).forEach(function (key) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["a" /* isObject */])(source[key])) {
                    if (!target[key]) {
                        _extends(target, _defineProperty({}, key, {}));
                    }

                    _this._merge(target[key], source[key]);
                    return;
                }

                _extends(target, _defineProperty({}, key, source[key]));
            });

            return target;
        }
    }]);

    return Dictionary;
}();

/* harmony default export */ exports["a"] = Dictionary;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(msg) {
        _classCallCheck(this, _class);

        this.msg = "[vee-validate]: " + msg;
    }

    _createClass(_class, [{
        key: "toString",
        value: function toString() {
            return this.msg;
        }
    }]);

    return _class;
}();

/* harmony default export */ exports["a"] = _class;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldBag = function () {
    function FieldBag() {
        _classCallCheck(this, FieldBag);

        this.fields = {};
    }

    /**
     * Initializes and adds a new field to the bag.
     */


    _createClass(FieldBag, [{
        key: '_add',
        value: function _add(name) {
            this.fields[name] = {};
            this._setFlags(name, { dirty: false, valid: false }, true);
        }

        /**
         * Remooves a field from the bag.
         */

    }, {
        key: '_remove',
        value: function _remove(name) {
            delete this.fields[name];
        }

        /**
         * Resets the flags state for a specified field or all fields.
         */

    }, {
        key: 'reset',
        value: function reset(name) {
            var _this = this;

            if (!name) {
                Object.keys(this.fields).forEach(function (field) {
                    _this._setFlags(field, { dirty: false, valid: false }, true);
                });

                return;
            }

            this._setFlags(name, { dirty: false, valid: false }, true);
        }

        /**
         * Sets the flags for a specified field.
         */

    }, {
        key: '_setFlags',
        value: function _setFlags(name, flags) {
            var _this2 = this;

            var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return Object.keys(flags).every(function (flag) {
                return _this2._setFlag(name, flag, flags[flag], initial);
            });
        }

        /**
         * Sets a flag for a specified field.
         */

    }, {
        key: '_setFlag',
        value: function _setFlag(name, flag, value) {
            var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var method = 'set' + flag.charAt(0).toUpperCase() + flag.slice(1);
            if (typeof this[method] !== 'function') {
                return false;
            }

            this[method](name, value, initial);

            return true;
        }

        /**
         * Sets the dirty flag along with dependant flags.
         */

    }, {
        key: 'setDirty',
        value: function setDirty(name, value) {
            var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            this.fields[name].dirty = value;
            this.fields[name].clean = initial || !value;
            this.fields[name].passed = this.fields[name].valid && value;
            this.fields[name].failed = !this.fields[name].valid && value;
        }

        /**
         * Sets the valid flag along with dependant flags.
         */

    }, {
        key: 'setValid',
        value: function setValid(name, value) {
            this.fields[name].valid = value;
            this.fields[name].passed = this.fields[name].dirty && value;
            this.fields[name].failed = this.fields[name].dirty && !value;
        }

        /**
         * Gets a field flag value.
         */

    }, {
        key: '_getFieldFlag',
        value: function _getFieldFlag(name, flag) {
            if (this.fields[name]) {
                return this.fields[name][flag];
            }

            return false;
        }
    }, {
        key: 'dirty',
        value: function dirty(name) {
            var _this3 = this;

            if (!name) {
                return Object.keys(this.fields).some(function (field) {
                    return _this3.fields[field].dirty;
                });
            }

            return this._getFieldFlag(name, 'dirty');
        }
    }, {
        key: 'valid',
        value: function valid(name) {
            var _this4 = this;

            if (!name) {
                return Object.keys(this.fields).every(function (field) {
                    return _this4.fields[field].valid;
                });
            }

            return this._getFieldFlag(name, 'valid');
        }
    }, {
        key: 'passed',
        value: function passed(name) {
            var _this5 = this;

            if (!name) {
                return Object.keys(this.fields).every(function (field) {
                    return _this5.fields[field].passed;
                });
            }

            return this._getFieldFlag(name, 'passed');
        }
    }, {
        key: 'failed',
        value: function failed(name) {
            var _this6 = this;

            if (!name) {
                return Object.keys(this.fields).some(function (field) {
                    return _this6.fields[field].failed;
                });
            }

            return this._getFieldFlag(name, 'failed');
        }
    }, {
        key: 'clean',
        value: function clean(name) {
            if (!name) {
                return !this.dirty();
            }

            return this._getFieldFlag(name, 'clean');
        }
    }]);

    return FieldBag;
}();

/* harmony default export */ exports["a"] = FieldBag;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ListenerGenerator = function () {
    function ListenerGenerator(el, binding, vnode, options) {
        _classCallCheck(this, ListenerGenerator);

        this.callbacks = [];
        this.el = el;
        this.binding = binding;
        this.vm = vnode.context;
        this.component = vnode.child;
        this.options = options;
        this.fieldName = this._resolveFieldName();
    }

    /**
     * Resolves the field name to trigger validations.
     * @return {String} The field name.
     */


    _createClass(ListenerGenerator, [{
        key: '_resolveFieldName',
        value: function _resolveFieldName() {
            if (this.component) {
                return this.component.name || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'name');
            }

            return this.binding.expression || this.el.name || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'name');
        }

        /**
         * Determines if the validation rule requires additional listeners on target fields.
         */

    }, {
        key: '_hasFieldDependency',
        value: function _hasFieldDependency(rules) {
            var _this = this;

            var fieldName = false;
            rules.split('|').every(function (r) {
                if (/\b(confirmed|after|before):/.test(r)) {
                    fieldName = r.split(':')[1];
                    return false;
                }

                if (/\b(confirmed)/.test(r)) {
                    fieldName = _this.fieldName + '_confirmation';
                    return false;
                }

                return true;
            });

            return fieldName;
        }

        /**
         * Validates input value triggered by 'input' event.
         */

    }, {
        key: '_inputListener',
        value: function _inputListener() {
            this._validate(this.el.value);
        }

        /**
         * Validates files triggered by 'change' event.
         */

    }, {
        key: '_fileListener',
        value: function _fileListener() {
            var isValid = this._validate(this.el.files);

            if (!isValid && this.binding.modifiers.reject) {
                // eslint-disable-next-line
                el.value = '';
            }
        }

        /**
         * Validates radio buttons triggered by 'change' event.
         */

    }, {
        key: '_radioListener',
        value: function _radioListener() {
            var checked = document.querySelector('input[name="' + this.el.name + '"]:checked');
            this._validate(checked ? checked.value : null);
        }

        /**
         * Validates checkboxes triggered by change event.
         */

    }, {
        key: '_checkboxListener',
        value: function _checkboxListener() {
            var _this2 = this;

            var checkedBoxes = document.querySelectorAll('input[name="' + this.el.name + '"]:checked');
            if (!checkedBoxes || !checkedBoxes.length) {
                this._validate(null);
                return;
            }

            [].concat(_toConsumableArray(checkedBoxes)).forEach(function (box) {
                _this2._validate(box.value);
            });
        }

        /**
         * Trigger the validation for a specific value.
         */

    }, {
        key: '_validate',
        value: function _validate(value) {
            return this.vm.$validator.validate(this.fieldName, value, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* getScope */])(this.el));
        }

        /**
         * Returns a scoped callback only runs if the el scope is the same as the recieved scope
         * From the event.
         */

    }, {
        key: '_getScopedListener',
        value: function _getScopedListener(callback) {
            var _this3 = this;

            return function (scope) {
                if (!scope || scope === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* getScope */])(_this3.el) || scope instanceof Event) {
                    callback();
                }
            };
        }

        /**
         * Attaches validator event-triggered validation.
         */

    }, {
        key: '_attachValidatorEvent',
        value: function _attachValidatorEvent() {
            var _this4 = this;

            var listener = this._getScopedListener(this._getSuitableListener().listener.bind(this));
            var fieldName = this._hasFieldDependency(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'rules'));
            if (fieldName) {
                // Wait for the validator ready triggered when vm is mounted because maybe
                // the element isn't mounted yet.
                this.vm.$once('validatorReady', function () {
                    var target = document.querySelector('input[name=\'' + fieldName + '\']');
                    if (!target) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["b" /* warn */])('Cannot find target field, no additional listeners were attached.');
                        return;
                    }

                    target.addEventListener('input', listener);
                    _this4.callbacks.push({ name: 'input', listener: listener, el: target });
                });
            }
        }

        /**
         * Determines a suitable listener for the element.
         */

    }, {
        key: '_getSuitableListener',
        value: function _getSuitableListener() {
            var listener = void 0;

            // determine the suitable listener and events to handle
            switch (this.el.type) {
                case 'file':
                    listener = {
                        names: ['change'],
                        listener: this._fileListener
                    };
                    break;

                case 'radio':
                    listener = {
                        names: ['change'],
                        listener: this._radioListener
                    };
                    break;

                case 'checkbox':
                    listener = {
                        names: ['change'],
                        listener: this._checkboxListener
                    };
                    break;

                default:
                    listener = {
                        names: ['input', 'blur'],
                        listener: this._inputListener
                    };
                    break;
            }

            // users are able to specify which events they want to validate on
            // pipe separated list of handler names to use
            var events = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'validate-on');
            if (events) {
                listener.names = events.split('|');
            }

            return listener;
        }

        /**
         * Attaches neccessary validation events for the component.
         */

    }, {
        key: '_attachComponentListeners',
        value: function _attachComponentListeners() {
            var _this5 = this;

            this.component.$on('input', function (value) {
                _this5.vm.$validator.validate(_this5.fieldName, value);
            });
        }

        /**
         * Attachs a suitable listener for the input.
         */

    }, {
        key: '_attachFieldListeners',
        value: function _attachFieldListeners() {
            var _this6 = this;

            // If it is a component, use vue events instead.
            if (this.component) {
                this._attachComponentListeners();

                return;
            }

            var handler = this._getSuitableListener();
            var listener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["e" /* debounce */])(handler.listener.bind(this), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'delay') || this.options.delay);

            if (~['radio', 'checkbox'].indexOf(this.el.type)) {
                this.vm.$once('validatorReady', function () {
                    [].concat(_toConsumableArray(document.querySelectorAll('input[name="' + _this6.el.name + '"]'))).forEach(function (input) {
                        handler.names.forEach(function (handlerName) {
                            input.addEventListener(handlerName, listener);
                            _this6.callbacks.push({ name: handlerName, listener: listener, el: input });
                        });
                    });
                });

                return;
            }

            handler.names.forEach(function (handlerName) {
                _this6.el.addEventListener(handlerName, listener);
                _this6.callbacks.push({ name: handlerName, listener: listener, el: _this6.el });
            });
        }

        /**
         * Returns a context getter factory pairs for each input type.
         */

    }, {
        key: '_resolveValueGetter',
        value: function _resolveValueGetter() {
            var _this7 = this;

            if (this.component) {
                return {
                    context: function context() {
                        return _this7.component;
                    },
                    getter: function getter(context) {
                        return context[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(context.$el, 'value-path')] || context.value;
                    }
                };
            }

            switch (this.el.type) {
                case 'checkbox':
                    return {
                        context: function context() {
                            return document.querySelectorAll('input[name="' + _this7.el.name + '"]:checked');
                        },
                        getter: function getter(context) {
                            if (!context || !context.length) {
                                return null;
                            }

                            return [].concat(_toConsumableArray(context)).map(function (checkbox) {
                                return checkbox.value;
                            });
                        }
                    };
                case 'radio':
                    return {
                        context: function context() {
                            return document.querySelector('input[name="' + _this7.el.name + '"]:checked');
                        },
                        getter: function getter(context) {
                            return context && context.value;
                        }
                    };
                case 'file':
                    return {
                        context: function context() {
                            return _this7.el;
                        },
                        getter: function getter(context) {
                            return context.files;
                        }
                    };

                default:
                    return {
                        context: function context() {
                            return _this7.el;
                        },
                        getter: function getter(context) {
                            return context.value;
                        }
                    };
            }
        }

        /**
         * Attaches the Event Listeners.
         */

    }, {
        key: 'attach',
        value: function attach() {
            var _this8 = this;

            var _resolveValueGetter2 = this._resolveValueGetter();

            var context = _resolveValueGetter2.context;
            var getter = _resolveValueGetter2.getter;

            this.vm.$validator.attach(this.fieldName, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'rules'), {
                scope: function scope() {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* getScope */])(_this8.el);
                },
                prettyName: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["c" /* getDataAttribute */])(this.el, 'as'),
                context: context,
                getter: getter,
                listeners: this
            });

            this._attachValidatorEvent();
            if (this.binding.expression) {
                // if its bound, validate it. (since update doesn't trigger after bind).
                if (!this.binding.modifiers.initial) {
                    this.vm.$validator.validate(this.binding.expression, this.binding.value, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d" /* getScope */])(this.el));
                }

                return;
            }

            this._attachFieldListeners();
        }

        /**
         * Removes all attached event listeners.
         */

    }, {
        key: 'detach',
        value: function detach() {
            this.callbacks.forEach(function (h) {
                h.el.removeEventListener(h.name, h.listener);
            });
        }
    }]);

    return ListenerGenerator;
}();

/* harmony default export */ exports["a"] = ListenerGenerator;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* istanbul ignore next */
/* eslint-disable max-len */
/* harmony default export */ exports["a"] = {
    alpha_dash: function alpha_dash(field) {
        return 'The ' + field + ' may contain alpha-numeric characters as well as dashes and underscores.';
    },
    alpha_num: function alpha_num(field) {
        return 'The ' + field + ' may only contain alpha-numeric characters.';
    },
    alpha_spaces: function alpha_spaces(field) {
        return 'The ' + field + ' may only contain alphabetic characters as well as spaces.';
    },
    alpha: function alpha(field) {
        return 'The ' + field + ' may only contain alphabetic characters.';
    },
    between: function between(field, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var min = _ref2[0];
        var max = _ref2[1];
        return 'The ' + field + ' must be between ' + min + ' and ' + max + '.';
    },
    confirmed: function confirmed(field) {
        return 'The ' + field + ' confirmation does not match.';
    },
    credit_card: function credit_card(field) {
        return 'The ' + field + ' is invalid.';
    },
    decimal: function decimal(field) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['*'];

        var _ref4 = _slicedToArray(_ref3, 1);

        var decimals = _ref4[0];
        return 'The ' + field + ' must be numeric and may contain ' + (decimals === '*' ? '' : decimals) + ' decimal points.';
    },
    digits: function digits(field, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 1);

        var length = _ref6[0];
        return 'The ' + field + ' must be numeric and exactly contain ' + length + ' digits.';
    },
    dimensions: function dimensions(field, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 2);

        var width = _ref8[0];
        var height = _ref8[1];
        return 'The ' + field + ' must be ' + width + ' pixels by ' + height + ' pixels.';
    },
    email: function email(field) {
        return 'The ' + field + ' must be a valid email.';
    },
    ext: function ext(field) {
        return 'The ' + field + ' must be a valid file.';
    },
    image: function image(field) {
        return 'The ' + field + ' must be an image.';
    },
    "in": function _in(field) {
        return 'The ' + field + ' must be a valid value.';
    },
    ip: function ip(field) {
        return 'The ' + field + ' must be a valid ip address.';
    },
    max: function max(field, _ref9) {
        var _ref10 = _slicedToArray(_ref9, 1);

        var length = _ref10[0];
        return 'The ' + field + ' may not be greater than ' + length + ' characters.';
    },
    max_value: function max_value(field, _ref11) {
        var _ref12 = _slicedToArray(_ref11, 1);

        var max = _ref12[0];
        return 'The ' + field + ' must be ' + max + ' or less.';
    },
    mimes: function mimes(field) {
        return 'The ' + field + ' must have a valid file type.';
    },
    min: function min(field, _ref13) {
        var _ref14 = _slicedToArray(_ref13, 1);

        var length = _ref14[0];
        return 'The ' + field + ' must be at least ' + length + ' characters.';
    },
    min_value: function min_value(field, _ref15) {
        var _ref16 = _slicedToArray(_ref15, 1);

        var min = _ref16[0];
        return 'The ' + field + ' must be ' + min + ' or more.';
    },
    not_in: function not_in(field) {
        return 'The ' + field + ' must be a valid value.';
    },
    numeric: function numeric(field) {
        return 'The ' + field + ' may only contain numeric characters.';
    },
    regex: function regex(field) {
        return 'The ' + field + ' format is invalid.';
    },
    required: function required(field) {
        return 'The ' + field + ' is required.';
    },
    size: function size(field, _ref17) {
        var _ref18 = _slicedToArray(_ref17, 1);

        var _size = _ref18[0];
        return 'The ' + field + ' must be less than ' + _size + ' KB.';
    },
    url: function url(field) {
        return 'The ' + field + ' is not a valid URL.';
    }
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (moment) {
    return function (value, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var targetField = _ref2[0];
        var format = _ref2[1];

        var dateValue = moment(value, format, true);
        var field = document.querySelector("input[name='" + targetField + "']");

        if (!(dateValue.isValid() && field)) {
            return false;
        }

        var other = moment(field.value, format, true);

        if (!other.isValid()) {
            return false;
        }

        return dateValue.isAfter(other);
    };
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (moment) {
    return function (value, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var targetField = _ref2[0];
        var format = _ref2[1];

        var dateValue = moment(value, format, true);
        var field = document.querySelector("input[name='" + targetField + "']");

        if (!dateValue.isValid() || !field) {
            return false;
        }

        var other = moment(field.value, format, true);

        if (!other.isValid()) {
            return false;
        }

        return dateValue.isBefore(other);
    };
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (moment) {
    return function (value, _ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var min = _ref2[0];
        var max = _ref2[1];
        var format = _ref2[2];

        var minDate = moment(min, format, true);
        var maxDate = moment(max, format, true);
        var dateVal = moment(value, format, true);

        if (!(minDate.isValid() && maxDate.isValid() && dateVal.isValid())) {
            return false;
        }

        return dateVal.isBetween(minDate, maxDate);
    };
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (moment) {
  return function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var format = _ref2[0];
    return moment(value, format, true).isValid();
  };
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__after__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__before__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__date_format__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__date_between__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages__ = __webpack_require__(20);


 // eslint-disable-line
 // eslint-disable-line


/* harmony default export */ exports["a"] = {
    make: function make(moment) {
        return {
            date_format: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__date_format__["a" /* default */])(moment),
            after: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__after__["a" /* default */])(moment),
            before: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__before__["a" /* default */])(moment),
            date_between: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__date_between__["a" /* default */])(moment)
        };
    },
    messages: __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* default */],
    installed: false
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* istanbul ignore next */
/* eslint-disable max-len */
/* harmony default export */ exports["a"] = {
    after: function after(field, _ref) {
        var _ref2 = _slicedToArray(_ref, 1);

        var target = _ref2[0];
        return "The " + field + " must be after " + target + ".";
    },
    before: function before(field, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 1);

        var target = _ref4[0];
        return "The " + field + " must be before " + target + ".";
    },
    date_between: function date_between(field, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2);

        var min = _ref6[0];
        var max = _ref6[1];
        return "The " + field + " must be between " + min + " and " + max + ".";
    },
    date_format: function date_format(field, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 1);

        var format = _ref8[0];
        return "The " + field + " must be in the format " + format + ".";
    }
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value) {
  return (/^[a-zA-Z]*$/.test(value)
  );
};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value) {
  return (/^[a-zA-Z0-9_-]*$/.test(value)
  );
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value) {
  return (/^[a-zA-Z0-9]*$/.test(value)
  );
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value) {
  return (/^[a-zA-Z\s]*$/.test(value)
  );
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var min = _ref2[0];
  var max = _ref2[1];
  return Number(min) <= value && Number(max) >= value;
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref, validatingField) {
    var _ref2 = _slicedToArray(_ref, 1);

    var confirmedField = _ref2[0];

    var field = confirmedField ? document.querySelector("input[name='" + confirmedField + "']") : document.querySelector("input[name='" + validatingField + "_confirmation']");

    return !!(field && String(value) === field.value);
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isCreditCard__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isCreditCard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator_lib_isCreditCard__);


/* harmony default export */ exports["a"] = function (value) {
  return __WEBPACK_IMPORTED_MODULE_0_validator_lib_isCreditCard___default()(String(value));
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['*'];

    var _ref2 = _slicedToArray(_ref, 1);

    var decimals = _ref2[0];

    if (Array.isArray(value)) {
        return false;
    }

    if (value === null || value === undefined || value === '') {
        return true;
    }

    // if is 0.
    if (Number(decimals) === 0) {
        return (/^-?\d*$/.test(value)
        );
    }

    var regexPart = decimals === '*' ? '+' : '{1,' + decimals + '}';
    var regex = new RegExp('^-?\\d*(\\.\\d' + regexPart + ')?$');

    if (!regex.test(value)) {
        return false;
    }

    return !Number.isNaN(parseFloat(value));
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var length = _ref2[0];

    var strVal = String(value);

    return (/^[0-9]*$/.test(strVal) && strVal.length === Number(length)
    );
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var validateImage = function validateImage(file, width, height) {
    var URL = window.URL || window.webkitURL;
    return new Promise(function (resolve) {
        var image = new Image();
        image.onerror = function () {
            return resolve({ valid: false });
        };
        image.onload = function () {
            return resolve({
                valid: image.width === Number(width) && image.height === Number(height)
            });
        };

        image.src = URL.createObjectURL(file);
    });
};

/* harmony default export */ exports["a"] = function (files, _ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var width = _ref2[0];
    var height = _ref2[1];

    var list = [];
    for (var i = 0; i < files.length; i++) {
        // if file is not an image, reject.
        if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
            return false;
        }

        list.push(files[i]);
    }

    return Promise.all(list.map(function (file) {
        return validateImage(file, width, height);
    }));
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isEmail__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isEmail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator_lib_isEmail__);


/* harmony default export */ exports["a"] = function (value) {
  return __WEBPACK_IMPORTED_MODULE_0_validator_lib_isEmail___default()(String(value));
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (files, extensions) {
    var regex = new RegExp('.(' + extensions.join('|') + ')$', 'i');
    for (var i = 0; i < files.length; i++) {
        if (!regex.test(files[i].name)) {
            return false;
        }
    }

    return true;
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (files) {
    for (var i = 0; i < files.length; i++) {
        if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
            return false;
        }
    }

    return true;
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value, options) {
  return !!options.filter(function (option) {
    return option == value;
  }).length;
}; // eslint-disable-line

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alpha__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alpha_dash__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alpha_num__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alpha_spaces__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__between__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confirmed__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__credit_card__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__decimal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__digits__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dimensions__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__email__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ext__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__image__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__in__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ip__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__max__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__max_value__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__mimes__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__min__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__min_value__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__notIn__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__numeric__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__regex__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__required__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__size__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__url__ = __webpack_require__(47);
/* eslint-disable camelcase */



























/* harmony default export */ exports["a"] = {
    alpha_dash: __WEBPACK_IMPORTED_MODULE_1__alpha_dash__["a" /* default */],
    alpha_num: __WEBPACK_IMPORTED_MODULE_2__alpha_num__["a" /* default */],
    alpha_spaces: __WEBPACK_IMPORTED_MODULE_3__alpha_spaces__["a" /* default */],
    alpha: __WEBPACK_IMPORTED_MODULE_0__alpha__["a" /* default */],
    between: __WEBPACK_IMPORTED_MODULE_4__between__["a" /* default */],
    confirmed: __WEBPACK_IMPORTED_MODULE_5__confirmed__["a" /* default */],
    credit_card: __WEBPACK_IMPORTED_MODULE_6__credit_card__["a" /* default */],
    decimal: __WEBPACK_IMPORTED_MODULE_7__decimal__["a" /* default */],
    digits: __WEBPACK_IMPORTED_MODULE_8__digits__["a" /* default */],
    dimensions: __WEBPACK_IMPORTED_MODULE_9__dimensions__["a" /* default */],
    email: __WEBPACK_IMPORTED_MODULE_10__email__["a" /* default */],
    ext: __WEBPACK_IMPORTED_MODULE_11__ext__["a" /* default */],
    image: __WEBPACK_IMPORTED_MODULE_12__image__["a" /* default */],
    "in": __WEBPACK_IMPORTED_MODULE_13__in__["a" /* default */],
    ip: __WEBPACK_IMPORTED_MODULE_14__ip__["a" /* default */],
    max: __WEBPACK_IMPORTED_MODULE_15__max__["a" /* default */],
    max_value: __WEBPACK_IMPORTED_MODULE_16__max_value__["a" /* default */],
    mimes: __WEBPACK_IMPORTED_MODULE_17__mimes__["a" /* default */],
    min: __WEBPACK_IMPORTED_MODULE_18__min__["a" /* default */],
    min_value: __WEBPACK_IMPORTED_MODULE_19__min_value__["a" /* default */],
    not_in: __WEBPACK_IMPORTED_MODULE_20__notIn__["a" /* default */],
    numeric: __WEBPACK_IMPORTED_MODULE_21__numeric__["a" /* default */],
    regex: __WEBPACK_IMPORTED_MODULE_22__regex__["a" /* default */],
    required: __WEBPACK_IMPORTED_MODULE_23__required__["a" /* default */],
    size: __WEBPACK_IMPORTED_MODULE_24__size__["a" /* default */],
    url: __WEBPACK_IMPORTED_MODULE_25__url__["a" /* default */]
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isIP__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isIP___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator_lib_isIP__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



/* harmony default export */ exports["a"] = function (value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [4];

  var _ref2 = _slicedToArray(_ref, 1);

  var version = _ref2[0];
  return __WEBPACK_IMPORTED_MODULE_0_validator_lib_isIP___default()(value, version);
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var length = _ref2[0];

    if (value === undefined || value === null) {
        return length >= 0;
    }

    return String(value).length <= length;
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var max = _ref2[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
        return false;
    }

    return Number(value) <= max;
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (files, mimes) {
    var regex = new RegExp(mimes.join('|').replace('*', '.+') + '$', 'i');
    for (var i = 0; i < files.length; i++) {
        if (!regex.test(files[i].type)) {
            return false;
        }
    }

    return true;
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var length = _ref2[0];

    if (value === undefined || value === null) {
        return false;
    }
    return String(value).length >= length;
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var min = _ref2[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
        return false;
    }

    return Number(value) >= min;
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value, options) {
  return !options.filter(function (option) {
    return option == value;
  }).length;
}; // eslint-disable-line

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isNumeric__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isNumeric___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator_lib_isNumeric__);


/* harmony default export */ exports["a"] = function (value) {
  return __WEBPACK_IMPORTED_MODULE_0_validator_lib_isNumeric___default()(String(value));
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/* harmony default export */ exports["a"] = function (value, _ref) {
    var _ref2 = _toArray(_ref);

    var regex = _ref2[0];

    var flags = _ref2.slice(1);

    if (regex instanceof RegExp) {
        return regex.test(value);
    }

    return new RegExp(regex, flags).test(String(value));
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (value) {
    if (Array.isArray(value)) {
        return !!value.length;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return !!String(value).trim().length;
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* harmony default export */ exports["a"] = function (files, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var size = _ref2[0];

    if (isNaN(size)) {
        return false;
    }

    var nSize = Number(size) * 1024;
    for (var i = 0; i < files.length; i++) {
        if (files[i].size > nSize) {
            return false;
        }
    }

    return true;
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isURL__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_validator_lib_isURL___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_validator_lib_isURL__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



/* harmony default export */ exports["a"] = function (value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined];

    var _ref2 = _slicedToArray(_ref, 1);

    var domain = _ref2[0];
    return __WEBPACK_IMPORTED_MODULE_0_validator_lib_isURL___default()(value, { host_whitelist: domain ? [domain] : undefined });
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports["default"] = isByteLength;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2["default"])(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isCreditCard;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|62[0-9]{14}$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString2["default"])(str);
  var sanitized = str.replace(/[^0-9]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }
  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = void 0;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isEmail;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__(2);

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__(48);

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__(6);

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var default_email_options = {
  allow_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2["default"])(str);
  options = (0, _merge2["default"])(options, default_email_options);

  if (options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2["default"])(user, { max: 64 }) || !(0, _isByteLength2["default"])(domain, { max: 256 })) {
    return false;
  }

  if (!(0, _isFQDN2["default"])(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNumeric;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var numeric = /^[-+]?[0-9]+$/;

function isNumeric(str) {
  (0, _assertString2["default"])(str);
  return numeric.test(str);
}
module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isURL;

var _assertString = __webpack_require__(0);

var _assertString2 = _interopRequireDefault(_assertString);

var _isFQDN = __webpack_require__(6);

var _isFQDN2 = _interopRequireDefault(_isFQDN);

var _isIP = __webpack_require__(7);

var _isIP2 = _interopRequireDefault(_isIP);

var _merge = __webpack_require__(2);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2["default"])(url);
  if (!url || url.length >= 2083 || /\s/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2["default"])(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2["default"])(host) && !(0, _isFQDN2["default"])(host, options) && (!ipv6 || !(0, _isIP2["default"])(ipv6, 6)) && host !== 'localhost') {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__validator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_maps__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directive__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errorBag__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(exports, "install", function() { return install; });






// eslint-disable-next-line
var install = function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref$locale = _ref.locale;
    var locale = _ref$locale === undefined ? 'en' : _ref$locale;
    var _ref$delay = _ref.delay;
    var delay = _ref$delay === undefined ? 0 : _ref$delay;
    var _ref$errorBagName = _ref.errorBagName;
    var errorBagName = _ref$errorBagName === undefined ? 'errors' : _ref$errorBagName;
    var _ref$dictionary = _ref.dictionary;
    var dictionary = _ref$dictionary === undefined ? null : _ref$dictionary;
    var _ref$strict = _ref.strict;
    var strict = _ref$strict === undefined ? true : _ref$strict;
    var _ref$fieldsBagName = _ref.fieldsBagName;
    var fieldsBagName = _ref$fieldsBagName === undefined ? 'fields' : _ref$fieldsBagName;

    if (dictionary) {
        __WEBPACK_IMPORTED_MODULE_0__validator__["a" /* default */].updateDictionary(dictionary);
    }

    __WEBPACK_IMPORTED_MODULE_0__validator__["a" /* default */].setLocale(locale);
    __WEBPACK_IMPORTED_MODULE_0__validator__["a" /* default */].setStrictMode(strict);

    var options = {
        locale: locale,
        delay: delay,
        dictionary: dictionary,
        errorBagName: errorBagName,
        fieldsBagName: fieldsBagName
    };

    Object.defineProperties(Vue.prototype, {
        $validator: {
            get: function get() {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_maps__["b" /* register */])(this);
            }
        }
    });

    Vue.mixin(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__mixin__["a" /* default */])(options)); // Install Mixin.
    Vue.directive('validate', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__directive__["a" /* default */])(options)); // Install directive.
};

/* harmony reexport (binding) */ __webpack_require__.d(exports, "Validator", function() { return __WEBPACK_IMPORTED_MODULE_0__validator__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ErrorBag", function() { return __WEBPACK_IMPORTED_MODULE_4__errorBag__["a"]; });


/***/ }
/******/ ])
});
;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
    var Cookie = __webpack_require__(96);

    var VueCookie = {

        install: function (Vue) {
            Vue.prototype.$cookie = this;
            Vue.cookie = this;
        },
        set: function (name, value, daysOrOptions) {
            var opts = daysOrOptions;
            if(Number.isInteger(daysOrOptions)) {
                opts = {expires: daysOrOptions};
            }
            return Cookie.set(name, value, opts);
        },

        get: function (name) {
            return Cookie.get(name);
        },

        "delete": function (name, options) {
            var opts = {expires: -1};
            if(options !== undefined) {
                opts = Object.assign(options, opts);
            }
            this.set(name, '', opts);
        }
    };

    if (true) {
        module.exports = VueCookie;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return VueCookie; })
    } else if (window.Vue) {
        window.VueCookie = VueCookie;
        Vue.use(VueCookie);
    }

})();


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(66),
  /* template */
  __webpack_require__(107),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/components/Footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6085d134", Component.options)
  } else {
    hotAPI.reload("data-v-6085d134", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(67),
  /* template */
  __webpack_require__(105),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/components/Header.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Header.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e210950", Component.options)
  } else {
    hotAPI.reload("data-v-1e210950", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(103),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/components/Nav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Nav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02eb9268", Component.options)
  } else {
    hotAPI.reload("data-v-02eb9268", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(69),
  /* template */
  __webpack_require__(104),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/components/Page.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Page.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1396bb1a", Component.options)
  } else {
    hotAPI.reload("data-v-1396bb1a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "shanti-nav"
  }, [_c('navbar', {
    attrs: {
      "placement": "static",
      "type": "default"
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.home))])]), _vm._v(" "), _c('router-link', {
    staticClass: "visible-xs hidden-sm hidden-md hidden-lg",
    attrs: {
      "slot": "brand",
      "to": "/",
      "exact": ""
    },
    slot: "brand"
  }, [_c('img', {
    staticClass: "nav-logo",
    attrs: {
      "src": "/img/shanti_logo_white.png",
      "alt": "Shanti logo"
    }
  })]), _vm._v(" "), _c('dropdown', {
    attrs: {
      "text": _vm.about
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/getting-started",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.gettingStarted))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/testimonials",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.testimonials))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/mission",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.mission))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/history",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.history))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/cultural-competency",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.culturalCompetency))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/privacy-policy",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.privacyPolicy))])])], 1), _vm._v(" "), _c('dropdown', {
    attrs: {
      "text": _vm.support
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/support/donate",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.donate))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/support/volunteer",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.volunteer))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/support/resources",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.resources))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/support/contribute",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.contribute))])])], 1), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/services/housing",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.housing))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/services/hiv",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.services))])]), _vm._v(" "), _c('dropdown', {
    attrs: {
      "text": "@shanti"
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/blog",
      "tag": "li"
    }
  }, [_c('a', [_vm._v("Blog")])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/events",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.events))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/events/gallery",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.gallery))])])], 1), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://store.shantiaz.org"
    }
  }, [_vm._v(_vm._s(_vm.store))])]), _vm._v(" "), _c('dropdown', {
    attrs: {
      "text": _vm.contact
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/contact/office",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.office))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/contact/staff",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.staff))])]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/contact/board",
      "tag": "li"
    }
  }, [_c('a', [_vm._v(_vm._s(_vm.board))])])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-02eb9268", module.exports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main-block"
  }, [_c('div', {
    staticClass: "page-heading-one"
  }, [_c('h2', [_vm._v(_vm._s(_vm.article.headline))]), _vm._v(" "), _c('p', {
    staticClass: "bg-color"
  }, [_vm._v(_vm._s(_vm.article.subhead))])]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading),
      expression: "loading"
    }],
    staticClass: "fa fa-refresh fa-spin fa-4x color"
  })]), _vm._v(" "), _c('div', {
    staticClass: "about-us-three"
  }, [_c('div', {
    staticClass: "about-hero"
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.article.callout)
    }
  }), _vm._v(" "), (_vm.article.callout) ? _c('div', [_c('psg-speak', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.loading),
      expression: "!loading"
    }],
    attrs: {
      "text": _vm.article.callout,
      "primary": "true"
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('hr'), _vm._v(" "), _vm._t("copy"), _vm._v(" "), _vm._t("posts")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1396bb1a", module.exports)
  }
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "outer"
  }, [_c('div', {
    staticClass: "top-bar"
  }, [_c('div', {
    staticClass: "container"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "tb-language dropdown pull-right"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-5"
  }, [_c('v-select', {
    attrs: {
      "placeholder": "Choose / Escoge",
      "justified": "",
      "clear-button": "",
      "close-on-select": ""
    },
    on: {
      "change": _vm.setLanguage
    },
    model: {
      value: (_vm.language),
      callback: function($$v) {
        _vm.language = $$v
      },
      expression: "language"
    }
  }, [_c('v-option', {
    attrs: {
      "value": "en"
    }
  }, [_vm._v("English")]), _vm._v(" "), _c('v-option', {
    attrs: {
      "value": "es"
    }
  }, [_vm._v("Español")])], 1)], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "tb-search pull-left"
  }, [_c('form', [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keywords),
      expression: "keywords"
    }],
    staticClass: "form-control",
    attrs: {
      "maxlength": "100",
      "name": "keywords",
      "placeholder": _vm.typeKeywords,
      "type": "search"
    },
    domProps: {
      "value": (_vm.keywords)
    },
    on: {
      "keypress": _vm.disableEnter,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keywords = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn",
    staticStyle: {
      "font-size": "15px"
    }
  }, [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.search($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-search square-2 rounded-1 bg-color white",
    staticStyle: {
      "display": "block",
      "height": "36px",
      "padding-top": "4px"
    }
  })])])])])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "header-2"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-3 col-sm-offset-9"
  }, [_c('div', {
    staticClass: "head-search pull-right"
  }, [_c('form', [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keywords),
      expression: "keywords"
    }],
    staticClass: "form-control",
    attrs: {
      "maxlength": "100",
      "name": "keywords",
      "placeholder": _vm.typeKeywords,
      "type": "search"
    },
    domProps: {
      "value": (_vm.keywords)
    },
    on: {
      "keypress": _vm.disableEnter,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keywords = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn",
    staticStyle: {
      "font-size": "15px"
    }
  }, [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.search($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-search square-2 rounded-1 bg-color white",
    staticStyle: {
      "display": "block",
      "height": "36px",
      "padding-top": "4px"
    }
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "row",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('div', {
    staticClass: "col-md-2"
  }, [_c('div', {
    staticClass: "logo hidden-xs"
  }, [_c('router-link', {
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_c('img', {
    attrs: {
      "width": "175px",
      "src": "/img/shanti_logo.png",
      "alt": "Phoenix Shanti Group"
    }
  })])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-10"
  }, [_c('psg-nav')], 1)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tb-contact pull-left"
  }, [_c('i', {
    staticClass: "fa fa-envelope"
  }), _vm._v("   "), _c('a', {
    attrs: {
      "href": "mailto:info@shantiaz.org"
    }
  }, [_vm._v("info@shantiaz.org")]), _vm._v("\n                  \n                "), _vm._v(" "), _c('i', {
    staticClass: "fa fa-phone"
  }), _vm._v("  (602) 279-0008\n            ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-sm-7"
  }, [_c('p', {
    staticClass: "pull-right"
  }, [_c('i', {
    staticClass: "fa fa-globe"
  }), _vm._v(" Language/Lengua")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tb-social pull-right"
  }, [_c('div', {
    staticClass: "brand-bg text-right"
  }, [_c('a', {
    staticClass: "facebook",
    attrs: {
      "target": "_blank",
      "href": "http://www.facebook.com/phoenixshantigroup"
    }
  }, [_c('i', {
    staticClass: "fa fa-facebook square-2 rounded-1"
  })]), _vm._v(" "), _c('a', {
    staticClass: "facebook",
    attrs: {
      "target": "_blank",
      "href": "http://www.facebook.com/shanti2ndchances"
    }
  }, [_c('i', {
    staticClass: "fa fa-facebook square-2 rounded-1"
  })]), _vm._v(" "), _c('a', {
    staticClass: "twitter",
    attrs: {
      "target": "_blank",
      "href": "https://twitter.com/PhoenixShanti"
    }
  }, [_c('i', {
    staticClass: "fa fa-twitter square-2 rounded-1"
  })]), _vm._v(" "), _c('a', {
    staticClass: "youtube",
    attrs: {
      "target": "_blank",
      "href": "https://www.youtube.com/user/PhoenixShantiGroup"
    }
  }, [_c('i', {
    staticClass: "fa fa-youtube square-2 rounded-1"
  })])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1e210950", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-xs",
    "class": _vm.styling,
    attrs: {
      "type": "button",
      "primary": _vm.primary,
      "text": _vm.text
    },
    on: {
      "click": _vm.speak
    }
  }, [_c('i', {
    staticClass: "fa fa-deaf"
  }), _vm._v(" " + _vm._s(_vm.speakText))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-25888cdc", module.exports)
  }
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "foot"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-3 col-sm-6"
  }, [_c('div', {
    staticClass: "foot-item"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-user"
  }), _vm._v("  " + _vm._s(_vm.about))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.shantiText))]), _vm._v(" "), _c('psg-speak', {
    attrs: {
      "text": "Shanti is a Sanskrit word meaning Inner Peace and is reflective of Phoenix Shanti Group's approach of promoting personal empowerment and maintaining independence and dignity."
    }
  }), _vm._v(" "), _c('hr'), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "subscribe-box"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_vm._v(_vm._s(_vm.subscribeTo) + ":")]), _vm._v(" "), _c('form', {
    attrs: {
      "role": "form",
      "method": "POST"
    }
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": _vm.enterEmailAddress
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-color",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.subscribe($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.subscribeTo))])])]), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.subscriptionSuccess) ? _c('div', {
    staticClass: "alert alert-success"
  }, [_vm._v("\n                                    " + _vm._s(_vm.subscriptionResult) + "\n                                ")]) : _vm._e(), _vm._v(" "), (!_vm.subscriptionSuccess && _vm.subscriptionResult) ? _c('div', {
    staticClass: "alert alert-danger"
  }, [_vm._v("\n                                    " + _vm._s(_vm.subscriptionResult) + "\n                                ")]) : _vm._e()])])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3 col-sm-6"
  }, [_c('div', {
    staticClass: "foot-item"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-comments"
  }), _vm._v("  " + _vm._s(_vm.recentPosts))]), _vm._v(" "), (_vm.posts) ? _c('div', {
    staticClass: "foot-item-content"
  }, [_c('ul', {
    staticClass: "list-unstyled"
  }, _vm._l((_vm.posts), function(post, index) {
    return _c('router-link', {
      key: "index",
      attrs: {
        "to": {
          name: 'blog/view',
          params: {
            slug: post.slug
          }
        },
        "tag": "li"
      }
    }, [_c('a', [_vm._v(_vm._s(post.headline))])])
  }))]) : _vm._e(), _vm._v(" "), (!_vm.posts) ? _c('div', [_c('p', [_vm._v("There are no current posts.")])]) : _vm._e()]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "foot-item"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-calendar"
  }), _vm._v(" " + _vm._s(_vm.upcomingEvents))]), _vm._v(" "), (_vm.events) ? _c('div', {
    staticClass: "foot-item-content"
  }, [_c('ul', {
    staticClass: "list-unstyled"
  }, _vm._l((_vm.events), function(event, index) {
    return _c('router-link', {
      key: index,
      attrs: {
        "to": {
          name: 'event/view',
          params: {
            slug: event.slug
          }
        },
        "tag": "li"
      }
    }, [_c('a', [_vm._v(_vm._s(event.event_name))])])
  }))]) : _vm._e(), _vm._v(" "), (!_vm.posts) ? _c('div', [_c('p', [_vm._v("There are no current posts.")])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3 col-sm-6"
  }, [_c('div', {
    staticClass: "foot-item"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-picture-o"
  }), _vm._v("  " + _vm._s(_vm.recentImages))]), _vm._v(" "), _c('div', {
    staticClass: "foot-item-content"
  }, [_c('lightbox', {
    attrs: {
      "id": "shantiLightbox",
      "images": _vm.images,
      "image_class": 'img-responsive img-rounded',
      "album_class": 'my-album-class'
    }
  })], 1), _vm._v(" "), _c('br', {
    staticStyle: {
      "clear": "both"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3 col-sm-6"
  }, [_c('div', {
    staticClass: "foot-item"
  }, [_c('h5', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-building-o"
  }), _vm._v("  " + _vm._s(_vm.contactUs))]), _vm._v(" "), _c('div', {
    staticClass: "foot-item-content address"
  }, [_c('h6', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-home"
  }), _vm._v("  " + _vm._s(_vm.phoenixShanti))]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-phone"
  }), _vm._v(" " + _vm._s(_vm.mainOffice) + " : (602) 279-0008\n                            ")]), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-fax"
  }), _vm._v(" " + _vm._s(_vm.secureFax) + " : (602) 279-2004\n                            ")]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-calendar"
  }), _vm._v(" " + _vm._s(_vm.hours) + " : 8 am - 4 pm\n                            ")]), _vm._v(" "), _c('p', {
    staticClass: "add"
  }, [_vm._v("\n                                " + _vm._s(_vm.mondayFriday) + "\n                            ")]), _vm._v(" "), _c('psg-speak', {
    attrs: {
      "text": "Phoenix Shanti Group 2345 West Glendale Avenue,Phoenix, Arizona 85021. Main Office : (602) 279-0008. Secure Fax : (602) 279-2004. Email : info@shantiaz.org. Hours : 8 am to 4 pm, Monday through Friday"
    }
  }), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h6', {
    staticClass: "bold"
  }, [_c('i', {
    staticClass: "fa fa-home"
  }), _vm._v(" " + _vm._s(_vm.secondChances))]), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-phone"
  }), _vm._v(" " + _vm._s(_vm.store) + " : (602) 283-0100\n                            ")]), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-fax"
  }), _vm._v(" " + _vm._s(_vm.storeFax) + " : (602) 283-0101\n                            ")]), _vm._v(" "), _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-calendar"
  }), _vm._v(" " + _vm._s(_vm.hours) + " : 9 am - 6 pm, " + _vm._s(_vm.mondayFriday) + "; 9 am - 5 pm, " + _vm._s(_vm.saturday) + "\n                            ")]), _vm._v(" "), _c('psg-speak', {
    attrs: {
      "text": "Second Chances Store, 4015 N 16th Street, Suites E-F, Phoenix AZ, 85016. Store : (602) 283-0100. Store Fax : (602) 283-0101.  Store Hours : 9 am to 6 pm, Monday through Friday; 9 am to 5 pm, Saturday"
    }
  })], 1)])])])])]), _vm._v(" "), _c('footer', [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('p', {
    staticClass: "pull-left"
  }, [_vm._v(_vm._s(_vm.copyright) + " © " + _vm._s(_vm.currentYear) + " - "), _c('router-link', {
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_vm._v("Phoenix Shanti Group")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('p', {
    staticClass: "text-center"
  }, [_vm._v(_vm._s(_vm.copperStar) + " "), _c('a', {
    attrs: {
      "href": "https://www.copperstardigital.com"
    }
  }, [_vm._v("Copper Star Digital")])]), _vm._v(" "), _vm._m(4)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('ul', {
    staticClass: "list-inline pull-right"
  }, [_c('router-link', {
    attrs: {
      "to": "/",
      "exact": ""
    }
  }, [_vm._v(_vm._s(_vm.home))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/about/mission"
    }
  }, [_vm._v(_vm._s(_vm.mission))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/services/housing"
    }
  }, [_vm._v(_vm._s(_vm.housing))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/services/hiv"
    }
  }, [_vm._v(_vm._s(_vm.services))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/contact/office"
    }
  }, [_vm._v(_vm._s(_vm.contact))]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/site-map"
    }
  }, [_vm._v(_vm._s(_vm.siteMap))])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "brand-bg"
  }, [_c('p', [_c('a', {
    staticClass: "facebook",
    attrs: {
      "target": "_blank",
      "href": "http://www.facebook.com/phoenixshantigroup",
      "title": "Phoenix Shanti Group"
    }
  }, [_c('i', {
    staticClass: "fa fa-facebook circle-3"
  }), _vm._v("\n                                Phoenix Shanti Group Facebook")])]), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "facebook",
    attrs: {
      "target": "_blank",
      "href": "http://www.facebook.com/shanti2ndchances",
      "title": "Shanti 2nd Chances"
    }
  }, [_c('i', {
    staticClass: "fa fa-facebook circle-3"
  }), _vm._v("\n                                2nd Chances Store Facebook")])]), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "twitter",
    attrs: {
      "target": "_blank",
      "href": "https://twitter.com/PhoenixShanti"
    }
  }, [_c('i', {
    staticClass: "fa fa-twitter circle-3"
  }), _vm._v("\n                                Phoenix Shanti Group Twitter")])]), _vm._v(" "), _c('p', [_c('a', {
    staticClass: "youtube",
    attrs: {
      "target": "_blank",
      "href": "https://www.youtube.com/user/PhoenixShantiGroup"
    }
  }, [_c('i', {
    staticClass: "fa fa-youtube circle-3"
  }), _vm._v("\n                                Phoenix Shanti Group YouTube")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "add"
  }, [_c('a', {
    attrs: {
      "href": "https://www.google.com/maps/place/Shanti+Group+Inc/@33.538261,-112.1124087,17z/data=!4m13!1m7!3m6!1s0x872b6cc37ffef96b:0xf1cfbc15274e3eba!2s2345+W+Glendale+Ave,+Phoenix,+AZ+85021!3b1!8m2!3d33.538261!4d-112.11022!3m4!1s0x872b6cc381a410dd:0xfd063606639b3257!8m2!3d33.538261!4d-112.11022",
      "target": "_blank"
    }
  }, [_vm._v("2345 West Glendale Avenue,"), _c('br'), _vm._v("\n                                    Phoenix, Arizona 85021")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "tel"
  }, [_c('i', {
    staticClass: "fa fa-envelope"
  }), _vm._v("  Email : "), _c('a', {
    attrs: {
      "href": "mailto:info@shantiaz.org"
    }
  }, [_vm._v("info@shantiaz.org")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "add"
  }, [_c('a', {
    attrs: {
      "href": "https://www.google.com/maps/place/Shanti's+2nd+Chances/@33.3971266,-112.0400743,10z/data=!4m8!1m2!2m1!1s2nd+chances++store!3m4!1s0x872b0d7fc9f202e9:0x9f0be06bb80d0a45!8m2!3d33.4938439!4d-112.0461918",
      "target": "_blank"
    }
  }, [_vm._v("4015 North 16th Street, Suites E-F,"), _c('br'), _vm._v("\n                                    Phoenix, Arizona 85016")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "text-center"
  }, [_c('a', {
    attrs: {
      "target": "_blank",
      "href": "https://www.copperstardigital.com"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "70%",
      "margin": "0 auto"
    },
    attrs: {
      "src": "/img/csd-wht-30.png",
      "alt": "Copper Star Digital"
    }
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6085d134", module.exports)
  }
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["vue-simple-lightbox"]=t():e["vue-simple-lightbox"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var r,i,o={};n(9),r=n(2),i=n(7),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]);var a="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(a.template=i),a.computed||(a.computed={}),Object.keys(o).forEach(function(e){var t=o[e];a.computed[e]=function(){return t}})},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{id:{type:String,required:!0},images:{type:Array,required:!0},image_class:{type:String},album_class:{type:String}},mounted:function(){try{window.$=window.jQuery=n(5);n(6),$(".my-gallery a").simpleLightbox()}catch(e){}}}},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,"body.hidden-scroll{overflow:hidden}.sl-overlay{position:fixed;left:0;right:0;top:0;bottom:0;background:#fff;opacity:.7;display:none;z-index:1050}.sl-wrapper{z-index:1040}.sl-wrapper button{border:0 none;background:transparent;font-size:28px;padding:0;cursor:pointer}.sl-wrapper button:hover{opacity:.7}.sl-wrapper .sl-close{right:30px;margin-top:-14px;margin-right:-14px;height:44px;width:44px;line-height:44px;font-family:Arial,Baskerville,monospace;font-size:3rem}.sl-wrapper .sl-close,.sl-wrapper .sl-counter{display:none;position:fixed;top:30px;z-index:1060;color:#000}.sl-wrapper .sl-counter{left:30px;font-size:1rem}.sl-wrapper .sl-navigation{width:100%;display:none}.sl-wrapper .sl-navigation button{position:fixed;top:50%;margin-top:-22px;height:44px;width:22px;line-height:44px;text-align:center;display:block;z-index:1060;font-family:Arial,Baskerville,monospace;color:#000}.sl-wrapper .sl-navigation button.sl-next{right:5px;font-size:2rem}.sl-wrapper .sl-navigation button.sl-prev{left:5px;font-size:2rem}@media (min-width:35.5em){.sl-wrapper .sl-navigation button{width:44px}.sl-wrapper .sl-navigation button.sl-next{right:10px;font-size:3rem}.sl-wrapper .sl-navigation button.sl-prev{left:10px;font-size:3rem}}@media (min-width:50em){.sl-wrapper .sl-navigation button{width:44px}.sl-wrapper .sl-navigation button.sl-next{right:20px;font-size:3rem}.sl-wrapper .sl-navigation button.sl-prev{left:20px;font-size:3rem}}.sl-wrapper .sl-image{position:fixed;-ms-touch-action:none;touch-action:none;z-index:10000}.sl-wrapper .sl-image img{margin:0;padding:0;display:block;border:0 none}@media (min-width:35.5em){.sl-wrapper .sl-image img{border:0 none}}@media (min-width:50em){.sl-wrapper .sl-image img{border:0 none}}.sl-wrapper .sl-image iframe{background:#000;border:0 none}@media (min-width:35.5em){.sl-wrapper .sl-image iframe{border:0 none}}@media (min-width:50em){.sl-wrapper .sl-image iframe{border:0 none}}.sl-wrapper .sl-image .sl-caption{display:none;padding:10px;color:#fff;background:rgba(0,0,0,.8);position:absolute;bottom:0;left:0;right:0}.sl-wrapper .sl-image .sl-caption.pos-top{bottom:auto;top:0}.sl-wrapper .sl-image .sl-caption.pos-outside{bottom:auto}.sl-wrapper .sl-image .sl-download{display:none;position:absolute;bottom:5px;right:5px;color:#000;z-index:1060}.sl-spinner{display:none;border:5px solid #333;border-radius:40px;height:40px;left:50%;margin:-20px 0 0 -20px;opacity:0;position:fixed;top:50%;width:40px;z-index:1007;-webkit-animation:pulsate 1s ease-out infinite;animation:pulsate 1s ease-out infinite}.sl-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@-webkit-keyframes pulsate{0%{transform:scale(.1);opacity:0}50%{opacity:1}to{transform:scale(1.2);opacity:0}}@keyframes pulsate{0%{transform:scale(.1);opacity:0}50%{opacity:1}to{transform:scale(1.2);opacity:0}}",""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,"@import url(https://fonts.googleapis.com/css?family=Ruda);",""]),t.i(n(3),""),t.push([e.id,".my-gallery a img{float:left;width:20%;height:auto;border:2px solid #fff;transition:-webkit-transform .15s ease;transition:transform .15s ease;transition:transform .15s ease,-webkit-transform .15s ease;position:relative}.my-gallery a:hover img{-webkit-transform:scale(1.05);transform:scale(1.05);z-index:5}.my-gallery a.big img{width:40%}.align-center{text-align:center}",""])},function(e,t,n){var r,i;/*!
	 * jQuery JavaScript Library v3.2.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2017-03-20T18:59Z
	 */
!function(t,n){"use strict";"object"==typeof e&&"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:this,function(n,o){"use strict";function a(e,t){t=t||ae;var n=t.createElement("script");n.text=e,t.head.appendChild(n).parentNode.removeChild(n)}function s(e){var t=!!e&&"length"in e&&e.length,n=xe.type(e);return"function"!==n&&!xe.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function l(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}function u(e,t,n){return xe.isFunction(t)?xe.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?xe.grep(e,function(e){return e===t!==n}):"string"!=typeof t?xe.grep(e,function(e){return fe.call(t,e)>-1!==n}):je.test(t)?xe.filter(t,e,n):(t=xe.filter(t,e),xe.grep(e,function(e){return fe.call(t,e)>-1!==n&&1===e.nodeType}))}function c(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function f(e){var t={};return xe.each(e.match(Fe)||[],function(e,n){t[n]=!0}),t}function p(e){return e}function d(e){throw e}function h(e,t,n,r){var i;try{e&&xe.isFunction(i=e.promise)?i.call(e).done(t).fail(n):e&&xe.isFunction(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}function g(){ae.removeEventListener("DOMContentLoaded",g),n.removeEventListener("load",g),xe.ready()}function m(){this.expando=xe.expando+m.uid++}function v(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:$e.test(e)?JSON.parse(e):e)}function y(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ze,"-$&").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n=v(n)}catch(e){}Be.set(e,t,n)}else n=void 0;return n}function x(e,t,n,r){var i,o=1,a=20,s=r?function(){return r.cur()}:function(){return xe.css(e,t,"")},l=s(),u=n&&n[3]||(xe.cssNumber[t]?"":"px"),c=(xe.cssNumber[t]||"px"!==u&&+l)&&Xe.exec(xe.css(e,t));if(c&&c[3]!==u){u=u||c[3],n=n||[],c=+l||1;do o=o||".5",c/=o,xe.style(e,t,c+u);while(o!==(o=s()/l)&&1!==o&&--a)}return n&&(c=+c||+l||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=u,r.start=c,r.end=i)),i}function b(e){var t,n=e.ownerDocument,r=e.nodeName,i=Ge[r];return i?i:(t=n.body.appendChild(n.createElement(r)),i=xe.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),Ge[r]=i,i)}function w(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)r=e[o],r.style&&(n=r.style.display,t?("none"===n&&(i[o]=We.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&Ve(r)&&(i[o]=b(r))):"none"!==n&&(i[o]="none",We.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}function T(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&l(e,t)?xe.merge([e],n):n}function C(e,t){for(var n=0,r=e.length;n<r;n++)We.set(e[n],"globalEval",!t||We.get(t[n],"globalEval"))}function E(e,t,n,r,i){for(var o,a,s,l,u,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if(o=e[d],o||0===o)if("object"===xe.type(o))xe.merge(p,o.nodeType?[o]:o);else if(et.test(o)){for(a=a||f.appendChild(t.createElement("div")),s=(Je.exec(o)||["",""])[1].toLowerCase(),l=Ze[s]||Ze._default,a.innerHTML=l[1]+xe.htmlPrefilter(o)+l[2],c=l[0];c--;)a=a.lastChild;xe.merge(p,a.childNodes),a=f.firstChild,a.textContent=""}else p.push(t.createTextNode(o));for(f.textContent="",d=0;o=p[d++];)if(r&&xe.inArray(o,r)>-1)i&&i.push(o);else if(u=xe.contains(o.ownerDocument,o),a=T(f.appendChild(o),"script"),u&&C(a),n)for(c=0;o=a[c++];)Ke.test(o.type||"")&&n.push(o);return f}function k(){return!0}function S(){return!1}function N(){try{return ae.activeElement}catch(e){}}function D(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)D(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),i===!1)i=S;else if(!i)return e;return 1===o&&(a=i,i=function(e){return xe().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=xe.guid++)),e.each(function(){xe.event.add(this,t,i,r,n)})}function j(e,t){return l(e,"table")&&l(11!==t.nodeType?t:t.firstChild,"tr")?xe(">tbody",e)[0]||e:e}function A(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function q(e){var t=lt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function L(e,t){var n,r,i,o,a,s,l,u;if(1===t.nodeType){if(We.hasData(e)&&(o=We.access(e),a=We.set(t,o),u=o.events)){delete a.handle,a.events={};for(i in u)for(n=0,r=u[i].length;n<r;n++)xe.event.add(t,i,u[i][n])}Be.hasData(e)&&(s=Be.access(e),l=xe.extend({},s),Be.set(t,l))}}function H(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Qe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function O(e,t,n,r){t=ue.apply([],t);var i,o,s,l,u,c,f=0,p=e.length,d=p-1,h=t[0],g=xe.isFunction(h);if(g||p>1&&"string"==typeof h&&!ve.checkClone&&st.test(h))return e.each(function(i){var o=e.eq(i);g&&(t[0]=h.call(this,i,o.html())),O(o,t,n,r)});if(p&&(i=E(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(s=xe.map(T(i,"script"),A),l=s.length;f<p;f++)u=i,f!==d&&(u=xe.clone(u,!0,!0),l&&xe.merge(s,T(u,"script"))),n.call(e[f],u,f);if(l)for(c=s[s.length-1].ownerDocument,xe.map(s,q),f=0;f<l;f++)u=s[f],Ke.test(u.type||"")&&!We.access(u,"globalEval")&&xe.contains(c,u)&&(u.src?xe._evalUrl&&xe._evalUrl(u.src):a(u.textContent.replace(ut,""),c))}return e}function F(e,t,n){for(var r,i=t?xe.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||xe.cleanData(T(r)),r.parentNode&&(n&&xe.contains(r.ownerDocument,r)&&C(T(r,"script")),r.parentNode.removeChild(r));return e}function M(e,t,n){var r,i,o,a,s=e.style;return n=n||pt(e),n&&(a=n.getPropertyValue(t)||n[t],""!==a||xe.contains(e.ownerDocument,e)||(a=xe.style(e,t)),!ve.pixelMarginRight()&&ft.test(a)&&ct.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function R(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function P(e){if(e in yt)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=vt.length;n--;)if(e=vt[n]+t,e in yt)return e}function I(e){var t=xe.cssProps[e];return t||(t=xe.cssProps[e]=P(e)||e),t}function W(e,t,n){var r=Xe.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function B(e,t,n,r,i){var o,a=0;for(o=n===(r?"border":"content")?4:"width"===t?1:0;o<4;o+=2)"margin"===n&&(a+=xe.css(e,n+Ue[o],!0,i)),r?("content"===n&&(a-=xe.css(e,"padding"+Ue[o],!0,i)),"margin"!==n&&(a-=xe.css(e,"border"+Ue[o]+"Width",!0,i))):(a+=xe.css(e,"padding"+Ue[o],!0,i),"padding"!==n&&(a+=xe.css(e,"border"+Ue[o]+"Width",!0,i)));return a}function $(e,t,n){var r,i=pt(e),o=M(e,t,i),a="border-box"===xe.css(e,"boxSizing",!1,i);return ft.test(o)?o:(r=a&&(ve.boxSizingReliable()||o===e.style[t]),"auto"===o&&(o=e["offset"+t[0].toUpperCase()+t.slice(1)]),o=parseFloat(o)||0,o+B(e,t,n||(a?"border":"content"),r,i)+"px")}function z(e,t,n,r,i){return new z.prototype.init(e,t,n,r,i)}function _(){bt&&(ae.hidden===!1&&n.requestAnimationFrame?n.requestAnimationFrame(_):n.setTimeout(_,xe.fx.interval),xe.fx.tick())}function X(){return n.setTimeout(function(){xt=void 0}),xt=xe.now()}function U(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)n=Ue[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function V(e,t,n){for(var r,i=(Q.tweeners[t]||[]).concat(Q.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function Y(e,t,n){var r,i,o,a,s,l,u,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&Ve(e),m=We.get(e,"fxshow");n.queue||(a=xe._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,xe.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],wt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!m||void 0===m[r])continue;g=!0}d[r]=m&&m[r]||xe.style(e,r)}if(l=!xe.isEmptyObject(t),l||!xe.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],u=m&&m.display,null==u&&(u=We.get(e,"display")),c=xe.css(e,"display"),"none"===c&&(u?c=u:(w([e],!0),u=e.style.display||u,c=xe.css(e,"display"),w([e]))),("inline"===c||"inline-block"===c&&null!=u)&&"none"===xe.css(e,"float")&&(l||(p.done(function(){h.display=u}),null==u&&(c=h.display,u="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),l=!1;for(r in d)l||(m?"hidden"in m&&(g=m.hidden):m=We.access(e,"fxshow",{display:u}),o&&(m.hidden=!g),g&&w([e],!0),p.done(function(){g||w([e]),We.remove(e,"fxshow");for(r in d)xe.style(e,r,d[r])})),l=V(g?m[r]:0,r,p),r in m||(m[r]=l.start,g&&(l.end=l.start,l.start=0))}}function G(e,t){var n,r,i,o,a;for(n in e)if(r=xe.camelCase(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=xe.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function Q(e,t,n){var r,i,o=0,a=Q.prefilters.length,s=xe.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;for(var t=xt||X(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;a<l;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),o<1&&l?n:(l||s.notifyWith(e,[u,1,0]),s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:xe.extend({},t),opts:xe.extend(!0,{specialEasing:{},easing:xe.easing._default},n),originalProperties:t,originalOptions:n,startTime:xt||X(),duration:n.duration,tweens:[],createTween:function(t,n){var r=xe.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)u.tweens[n].run(1);return t?(s.notifyWith(e,[u,1,0]),s.resolveWith(e,[u,t])):s.rejectWith(e,[u,t]),this}}),c=u.props;for(G(c,u.opts.specialEasing);o<a;o++)if(r=Q.prefilters[o].call(u,e,c,u.opts))return xe.isFunction(r.stop)&&(xe._queueHooks(u.elem,u.opts.queue).stop=xe.proxy(r.stop,r)),r;return xe.map(c,V,u),xe.isFunction(u.opts.start)&&u.opts.start.call(e,u),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always),xe.fx.timer(xe.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u}function J(e){var t=e.match(Fe)||[];return t.join(" ")}function K(e){return e.getAttribute&&e.getAttribute("class")||""}function Z(e,t,n,r){var i;if(Array.isArray(t))xe.each(t,function(t,i){n||Lt.test(e)?r(e,i):Z(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==xe.type(t))r(e,t);else for(i in t)Z(e+"["+i+"]",t[i],n,r)}function ee(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(Fe)||[];if(xe.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function te(e,t,n,r){function i(s){var l;return o[s]=!0,xe.each(e[s]||[],function(e,s){var u=s(t,n,r);return"string"!=typeof u||a||o[u]?a?!(l=u):void 0:(t.dataTypes.unshift(u),i(u),!1)}),l}var o={},a=e===_t;return i(t.dataTypes[0])||!o["*"]&&i("*")}function ne(e,t){var n,r,i=xe.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&xe.extend(!0,e,r),e}function re(e,t,n){for(var r,i,o,a,s=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){l.unshift(i);break}if(l[0]in n)o=l[0];else{for(i in n){if(!l[0]||e.converters[i+" "+l[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==l[0]&&l.unshift(o),n[o]}function ie(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}var oe=[],ae=n.document,se=Object.getPrototypeOf,le=oe.slice,ue=oe.concat,ce=oe.push,fe=oe.indexOf,pe={},de=pe.toString,he=pe.hasOwnProperty,ge=he.toString,me=ge.call(Object),ve={},ye="3.2.1",xe=function(e,t){return new xe.fn.init(e,t)},be=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,we=/^-ms-/,Te=/-([a-z])/g,Ce=function(e,t){return t.toUpperCase()};xe.fn=xe.prototype={jquery:ye,constructor:xe,length:0,toArray:function(){return le.call(this)},get:function(e){return null==e?le.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=xe.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return xe.each(this,e)},map:function(e){return this.pushStack(xe.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(le.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:ce,sort:oe.sort,splice:oe.splice},xe.extend=xe.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof a&&(u=a,a=arguments[s]||{},s++),"object"==typeof a||xe.isFunction(a)||(a={}),s===l&&(a=this,s--);s<l;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],r=e[t],a!==r&&(u&&r&&(xe.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&xe.isPlainObject(n)?n:{},a[t]=xe.extend(u,o,r)):void 0!==r&&(a[t]=r));return a},xe.extend({expando:"jQuery"+(ye+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===xe.type(e)},isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){var t=xe.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==de.call(e))&&(!(t=se(e))||(n=he.call(t,"constructor")&&t.constructor,"function"==typeof n&&ge.call(n)===me))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?pe[de.call(e)]||"object":typeof e},globalEval:function(e){a(e)},camelCase:function(e){return e.replace(we,"ms-").replace(Te,Ce)},each:function(e,t){var n,r=0;if(s(e))for(n=e.length;r<n&&t.call(e[r],r,e[r])!==!1;r++);else for(r in e)if(t.call(e[r],r,e[r])===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(be,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(s(Object(e))?xe.merge(n,"string"==typeof e?[e]:e):ce.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:fe.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,a=[];if(s(e))for(r=e.length;o<r;o++)i=t(e[o],o,n),null!=i&&a.push(i);else for(o in e)i=t(e[o],o,n),null!=i&&a.push(i);return ue.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),xe.isFunction(e))return r=le.call(arguments,2),i=function(){return e.apply(t||this,r.concat(le.call(arguments)))},i.guid=e.guid=e.guid||xe.guid++,i},now:Date.now,support:ve}),"function"==typeof Symbol&&(xe.fn[Symbol.iterator]=oe[Symbol.iterator]),xe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){pe["[object "+t+"]"]=t.toLowerCase()});var Ee=/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
function(e){function t(e,t,n,r){var i,o,a,s,l,u,c,p=t&&t.ownerDocument,h=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==h&&9!==h&&11!==h)return n;if(!r&&((t?t.ownerDocument||t:B)!==H&&L(t),t=t||H,F)){if(11!==h&&(l=ve.exec(e)))if(i=l[1]){if(9===h){if(!(a=t.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(p&&(a=p.getElementById(i))&&I(t,a)&&a.id===i)return n.push(a),n}else{if(l[2])return K.apply(n,t.getElementsByTagName(e)),n;if((i=l[3])&&T.getElementsByClassName&&t.getElementsByClassName)return K.apply(n,t.getElementsByClassName(i)),n}if(T.qsa&&!U[e+" "]&&(!M||!M.test(e))){if(1!==h)p=t,c=e;else if("object"!==t.nodeName.toLowerCase()){for((s=t.getAttribute("id"))?s=s.replace(we,Te):t.setAttribute("id",s=W),u=S(e),o=u.length;o--;)u[o]="#"+s+" "+d(u[o]);c=u.join(","),p=ye.test(e)&&f(t.parentNode)||t}if(c)try{return K.apply(n,p.querySelectorAll(c)),n}catch(e){}finally{s===W&&t.removeAttribute("id")}}}return D(e.replace(se,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>C.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[W]=!0,e}function i(e){var t=H.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=n.length;r--;)C.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function u(e){return function(t){return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&Ee(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function p(){}function d(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function h(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=z++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,l){var u,c,f,p=[$,s];if(l){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,l))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(f=t[W]||(t[W]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((u=c[o])&&u[0]===$&&u[1]===s)return p[2]=u[2];if(c[o]=p,p[2]=e(t,n,l))return!0}return!1}}function g(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(e,n,r){for(var i=0,o=n.length;i<o;i++)t(e,n[i],r);return r}function v(e,t,n,r,i){for(var o,a=[],s=0,l=e.length,u=null!=t;s<l;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),u&&t.push(s)));return a}function y(e,t,n,i,o,a){return i&&!i[W]&&(i=y(i)),o&&!o[W]&&(o=y(o,a)),r(function(r,a,s,l){var u,c,f,p=[],d=[],h=a.length,g=r||m(t||"*",s.nodeType?[s]:s,[]),y=!e||!r&&t?g:v(g,p,e,s,l),x=n?o||(r?e:h||i)?[]:a:y;if(n&&n(y,x,s,l),i)for(u=v(x,d),i(u,[],s,l),c=u.length;c--;)(f=u[c])&&(x[d[c]]=!(y[d[c]]=f));if(r){if(o||e){if(o){for(u=[],c=x.length;c--;)(f=x[c])&&u.push(y[c]=f);o(null,x=[],u,l)}for(c=x.length;c--;)(f=x[c])&&(u=o?ee(r,f):p[c])>-1&&(r[u]=!(a[u]=f))}}else x=v(x===a?x.splice(h,x.length):x),o?o(null,a,x,l):K.apply(a,x)})}function x(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,l=h(function(e){return e===t},a,!0),u=h(function(e){return ee(t,e)>-1},a,!0),c=[function(e,n,r){var i=!o&&(r||n!==j)||((t=n).nodeType?l(e,n,r):u(e,n,r));return t=null,i}];s<i;s++)if(n=C.relative[e[s].type])c=[h(g(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[W]){for(r=++s;r<i&&!C.relative[e[r].type];r++);return y(s>1&&g(c),s>1&&d(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(se,"$1"),n,s<r&&x(e.slice(s,r)),r<i&&x(e=e.slice(r)),r<i&&d(e))}c.push(n)}return g(c)}function b(e,n){var i=n.length>0,o=e.length>0,a=function(r,a,s,l,u){var c,f,p,d=0,h="0",g=r&&[],m=[],y=j,x=r||o&&C.find.TAG("*",u),b=$+=null==y?1:Math.random()||.1,w=x.length;for(u&&(j=a===H||a||u);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0,a||c.ownerDocument===H||(L(c),s=!F);p=e[f++];)if(p(c,a||H,s)){l.push(c);break}u&&($=b)}i&&((c=!p&&c)&&d--,r&&g.push(c))}if(d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,m,a,s);if(r){if(d>0)for(;h--;)g[h]||m[h]||(m[h]=Q.call(l));m=v(m)}K.apply(l,m),u&&!r&&m.length>0&&d+n.length>1&&t.uniqueSort(l)}return u&&($=b,j=y),g};return i?r(a):a}var w,T,C,E,k,S,N,D,j,A,q,L,H,O,F,M,R,P,I,W="sizzle"+1*new Date,B=e.document,$=0,z=0,_=n(),X=n(),U=n(),V=function(e,t){return e===t&&(q=!0),0},Y={}.hasOwnProperty,G=[],Q=G.pop,J=G.push,K=G.push,Z=G.slice,ee=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},te="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",re="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",ie="\\["+ne+"*("+re+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+re+"))|)"+ne+"*\\]",oe=":("+re+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ie+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),se=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),le=new RegExp("^"+ne+"*,"+ne+"*"),ue=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ce=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),fe=new RegExp(oe),pe=new RegExp("^"+re+"$"),de={ID:new RegExp("^#("+re+")"),CLASS:new RegExp("^\\.("+re+")"),TAG:new RegExp("^("+re+"|[*])"),ATTR:new RegExp("^"+ie),PSEUDO:new RegExp("^"+oe),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+te+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,me=/^[^{]+\{\s*\[native \w/,ve=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ye=/[+~]/,xe=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),be=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},we=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,Te=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},Ce=function(){L()},Ee=h(function(e){return e.disabled===!0&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{K.apply(G=Z.call(B.childNodes),B.childNodes),G[B.childNodes.length].nodeType}catch(e){K={apply:G.length?function(e,t){J.apply(e,Z.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}T=t.support={},k=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},L=t.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:B;return r!==H&&9===r.nodeType&&r.documentElement?(H=r,O=H.documentElement,F=!k(H),B!==H&&(n=H.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ce,!1):n.attachEvent&&n.attachEvent("onunload",Ce)),T.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),T.getElementsByTagName=i(function(e){return e.appendChild(H.createComment("")),!e.getElementsByTagName("*").length}),T.getElementsByClassName=me.test(H.getElementsByClassName),T.getById=i(function(e){return O.appendChild(e).id=W,!H.getElementsByName||!H.getElementsByName(W).length}),T.getById?(C.filter.ID=function(e){var t=e.replace(xe,be);return function(e){return e.getAttribute("id")===t}},C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&F){var n=t.getElementById(e);return n?[n]:[]}}):(C.filter.ID=function(e){var t=e.replace(xe,be);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},C.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&F){var n,r,i,o=t.getElementById(e);if(o){if(n=o.getAttributeNode("id"),n&&n.value===e)return[o];for(i=t.getElementsByName(e),r=0;o=i[r++];)if(n=o.getAttributeNode("id"),n&&n.value===e)return[o]}return[]}}),C.find.TAG=T.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):T.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},C.find.CLASS=T.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&F)return t.getElementsByClassName(e)},R=[],M=[],(T.qsa=me.test(H.querySelectorAll))&&(i(function(e){O.appendChild(e).innerHTML="<a id='"+W+"'></a><select id='"+W+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&M.push("[*^$]="+ne+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||M.push("\\["+ne+"*(?:value|"+te+")"),e.querySelectorAll("[id~="+W+"-]").length||M.push("~="),e.querySelectorAll(":checked").length||M.push(":checked"),e.querySelectorAll("a#"+W+"+*").length||M.push(".#.+[+~]")}),i(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=H.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&M.push("name"+ne+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&M.push(":enabled",":disabled"),O.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&M.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),M.push(",.*:")})),(T.matchesSelector=me.test(P=O.matches||O.webkitMatchesSelector||O.mozMatchesSelector||O.oMatchesSelector||O.msMatchesSelector))&&i(function(e){T.disconnectedMatch=P.call(e,"*"),P.call(e,"[s!='']:x"),R.push("!=",oe)}),M=M.length&&new RegExp(M.join("|")),R=R.length&&new RegExp(R.join("|")),t=me.test(O.compareDocumentPosition),I=t||me.test(O.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},V=t?function(e,t){if(e===t)return q=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n?n:(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&n||!T.sortDetached&&t.compareDocumentPosition(e)===n?e===H||e.ownerDocument===B&&I(B,e)?-1:t===H||t.ownerDocument===B&&I(B,t)?1:A?ee(A,e)-ee(A,t):0:4&n?-1:1)}:function(e,t){if(e===t)return q=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,s=[e],l=[t];if(!i||!o)return e===H?-1:t===H?1:i?-1:o?1:A?ee(A,e)-ee(A,t):0;if(i===o)return a(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;s[r]===l[r];)r++;return r?a(s[r],l[r]):s[r]===B?-1:l[r]===B?1:0},H):H},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==H&&L(e),n=n.replace(ce,"='$1']"),T.matchesSelector&&F&&!U[n+" "]&&(!R||!R.test(n))&&(!M||!M.test(n)))try{var r=P.call(e,n);if(r||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return t(n,H,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==H&&L(e),I(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==H&&L(e);var n=C.attrHandle[t.toLowerCase()],r=n&&Y.call(C.attrHandle,t.toLowerCase())?n(e,t,!F):void 0;return void 0!==r?r:T.attributes||!F?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.escape=function(e){return(e+"").replace(we,Te)},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(q=!T.detectDuplicates,A=!T.sortStable&&e.slice(0),e.sort(V),q){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return A=null,e},E=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=E(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=E(t);return n},C=t.selectors={cacheLength:50,createPseudo:r,match:de,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xe,be),e[3]=(e[3]||e[4]||e[5]||"").replace(xe,be),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return de.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&fe.test(n)&&(t=S(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(xe,be).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=_[e+" "];return t||(t=new RegExp("(^|"+ne+")"+e+"("+ne+"|$)"))&&_(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:!n||(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o.replace(ae," ")+" ").indexOf(r)>-1:"|="===n&&(o===r||o.slice(0,r.length+1)===r+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!l&&!s,x=!1;if(m){if(o){for(;g;){for(p=t;p=p[g];)if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&y){for(p=m,f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),u=c[e]||[],d=u[0]===$&&u[1],x=d&&u[2],p=d&&m.childNodes[d];p=++d&&p&&p[g]||(x=d=0)||h.pop();)if(1===p.nodeType&&++x&&p===t){c[e]=[$,d,x];break}}else if(y&&(p=t,f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),u=c[e]||[],d=u[0]===$&&u[1],x=d),x===!1)for(;(p=++d&&p&&p[g]||(x=d=0)||h.pop())&&((s?p.nodeName.toLowerCase()!==v:1!==p.nodeType)||!++x||(y&&(f=p[W]||(p[W]={}),c=f[p.uniqueID]||(f[p.uniqueID]={}),c[e]=[$,x]),p!==t)););return x-=i,x===r||x%r===0&&x/r>=0}}},PSEUDO:function(e,n){var i,o=C.pseudos[e]||C.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);return o[W]?o(n):o.length>1?(i=[e,e,"",n],C.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=ee(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=N(e.replace(se,"$1"));return i[W]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return e=e.replace(xe,be),function(t){return(t.textContent||t.innerText||E(t)).indexOf(e)>-1}}),lang:r(function(e){return pe.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(xe,be).toLowerCase(),function(t){var n;do if(n=F?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===O},focus:function(e){return e===H.activeElement&&(!H.hasFocus||H.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:u(!1),disabled:u(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return ge.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[n<0?n+t:n]}),even:c(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},C.pseudos.nth=C.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=s(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);return p.prototype=C.filters=C.pseudos,C.setFilters=new p,S=t.tokenize=function(e,n){var r,i,o,a,s,l,u,c=X[e+" "];if(c)return n?0:c.slice(0);for(s=e,l=[],u=C.preFilter;s;){r&&!(i=le.exec(s))||(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ue.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(se," ")}),s=s.slice(r.length));for(a in C.filter)!(i=de[a].exec(s))||u[a]&&!(i=u[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return n?s.length:s?t.error(e):X(e,l).slice(0)},N=t.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=S(e)),n=t.length;n--;)o=x(t[n]),o[W]?r.push(o):i.push(o);o=U(e,b(i,r)),o.selector=e}return o},D=t.select=function(e,t,n,r){var i,o,a,s,l,u="function"==typeof e&&e,c=!r&&S(e=u.selector||e);if(n=n||[],1===c.length){if(o=c[0]=c[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&F&&C.relative[o[1].type]){if(t=(C.find.ID(a.matches[0].replace(xe,be),t)||[])[0],!t)return n;u&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=de.needsContext.test(e)?0:o.length;i--&&(a=o[i],!C.relative[s=a.type]);)if((l=C.find[s])&&(r=l(a.matches[0].replace(xe,be),ye.test(o[0].type)&&f(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&d(o),!e)return K.apply(n,r),n;break}}return(u||N(e,c))(r,t,!F,n,!t||ye.test(e)&&f(t.parentNode)||t),n},T.sortStable=W.split("").sort(V).join("")===W,T.detectDuplicates=!!q,L(),T.sortDetached=i(function(e){return 1&e.compareDocumentPosition(H.createElement("fieldset"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),T.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(te,function(e,t,n){var r;if(!n)return e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(n);xe.find=Ee,xe.expr=Ee.selectors,xe.expr[":"]=xe.expr.pseudos,xe.uniqueSort=xe.unique=Ee.uniqueSort,xe.text=Ee.getText,xe.isXMLDoc=Ee.isXML,xe.contains=Ee.contains,xe.escapeSelector=Ee.escape;var ke=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&xe(e).is(n))break;r.push(e)}return r},Se=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},Ne=xe.expr.match.needsContext,De=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,je=/^.[^:#\[\.,]*$/;xe.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?xe.find.matchesSelector(r,e)?[r]:[]:xe.find.matches(e,xe.grep(t,function(e){return 1===e.nodeType}))},xe.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(xe(e).filter(function(){for(t=0;t<r;t++)if(xe.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)xe.find(e,i[t],n);return r>1?xe.uniqueSort(n):n},filter:function(e){return this.pushStack(u(this,e||[],!1))},not:function(e){return this.pushStack(u(this,e||[],!0))},is:function(e){return!!u(this,"string"==typeof e&&Ne.test(e)?xe(e):e||[],!1).length}});var Ae,qe=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,Le=xe.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||Ae,"string"==typeof e){if(r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:qe.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof xe?t[0]:t,xe.merge(this,xe.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:ae,!0)),De.test(r[1])&&xe.isPlainObject(t))for(r in t)xe.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=ae.getElementById(r[2]),i&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):xe.isFunction(e)?void 0!==n.ready?n.ready(e):e(xe):xe.makeArray(e,this)};Le.prototype=xe.fn,Ae=xe(ae);var He=/^(?:parents|prev(?:Until|All))/,Oe={children:!0,contents:!0,next:!0,prev:!0};xe.fn.extend({has:function(e){var t=xe(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(xe.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&xe(e);if(!Ne.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&xe.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?xe.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?fe.call(xe(e),this[0]):fe.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(xe.uniqueSort(xe.merge(this.get(),xe(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),xe.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return ke(e,"parentNode")},parentsUntil:function(e,t,n){return ke(e,"parentNode",n)},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")},nextAll:function(e){return ke(e,"nextSibling")},prevAll:function(e){return ke(e,"previousSibling")},nextUntil:function(e,t,n){return ke(e,"nextSibling",n)},prevUntil:function(e,t,n){return ke(e,"previousSibling",n)},siblings:function(e){return Se((e.parentNode||{}).firstChild,e)},children:function(e){return Se(e.firstChild)},contents:function(e){return l(e,"iframe")?e.contentDocument:(l(e,"template")&&(e=e.content||e),xe.merge([],e.childNodes))}},function(e,t){xe.fn[e]=function(n,r){var i=xe.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=xe.filter(r,i)),this.length>1&&(Oe[e]||xe.uniqueSort(i),He.test(e)&&i.reverse()),this.pushStack(i)}});var Fe=/[^\x20\t\r\n\f]+/g;xe.Callbacks=function(e){e="string"==typeof e?f(e):xe.extend({},e);var t,n,r,i,o=[],a=[],s=-1,l=function(){for(i=i||e.once,r=t=!0;a.length;s=-1)for(n=a.shift();++s<o.length;)o[s].apply(n[0],n[1])===!1&&e.stopOnFalse&&(s=o.length,n=!1);e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},u={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){xe.each(n,function(n,r){xe.isFunction(r)?e.unique&&u.has(r)||o.push(r):r&&r.length&&"string"!==xe.type(r)&&t(r)})}(arguments),n&&!t&&l()),this},remove:function(){return xe.each(arguments,function(e,t){for(var n;(n=xe.inArray(t,o,n))>-1;)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?xe.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=n||[],n=[e,n.slice?n.slice():n],a.push(n),t||l()),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!r}};return u},xe.extend({Deferred:function(e){var t=[["notify","progress",xe.Callbacks("memory"),xe.Callbacks("memory"),2],["resolve","done",xe.Callbacks("once memory"),xe.Callbacks("once memory"),0,"resolved"],["reject","fail",xe.Callbacks("once memory"),xe.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return xe.Deferred(function(n){xe.each(t,function(t,r){var i=xe.isFunction(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&xe.isFunction(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(e,r,i){function o(e,t,r,i){return function(){var s=this,l=arguments,u=function(){var n,u;if(!(e<a)){if(n=r.apply(s,l),n===t.promise())throw new TypeError("Thenable self-resolution");u=n&&("object"==typeof n||"function"==typeof n)&&n.then,xe.isFunction(u)?i?u.call(n,o(a,t,p,i),o(a,t,d,i)):(a++,u.call(n,o(a,t,p,i),o(a,t,d,i),o(a,t,p,t.notifyWith))):(r!==p&&(s=void 0,l=[n]),(i||t.resolveWith)(s,l))}},c=i?u:function(){try{u()}catch(n){xe.Deferred.exceptionHook&&xe.Deferred.exceptionHook(n,c.stackTrace),e+1>=a&&(r!==d&&(s=void 0,l=[n]),t.rejectWith(s,l))}};e?c():(xe.Deferred.getStackHook&&(c.stackTrace=xe.Deferred.getStackHook()),n.setTimeout(c))}}var a=0;return xe.Deferred(function(n){t[0][3].add(o(0,n,xe.isFunction(i)?i:p,n.notifyWith)),t[1][3].add(o(0,n,xe.isFunction(e)?e:p)),t[2][3].add(o(0,n,xe.isFunction(r)?r:d))}).promise()},promise:function(e){return null!=e?xe.extend(e,i):i}},o={};return xe.each(t,function(e,n){var a=n[2],s=n[5];i[n[1]]=a.add,s&&a.add(function(){r=s},t[3-e][2].disable,t[0][2].lock),a.add(n[3].fire),o[n[0]]=function(){return o[n[0]+"With"](this===o?void 0:this,arguments),this},o[n[0]+"With"]=a.fireWith}),i.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=le.call(arguments),o=xe.Deferred(),a=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?le.call(arguments):n,--t||o.resolveWith(r,i)}};if(t<=1&&(h(e,o.done(a(n)).resolve,o.reject,!t),"pending"===o.state()||xe.isFunction(i[n]&&i[n].then)))return o.then();for(;n--;)h(i[n],a(n),o.reject);return o.promise()}});var Me=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;xe.Deferred.exceptionHook=function(e,t){n.console&&n.console.warn&&e&&Me.test(e.name)&&n.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},xe.readyException=function(e){n.setTimeout(function(){throw e})};var Re=xe.Deferred();xe.fn.ready=function(e){return Re.then(e)["catch"](function(e){xe.readyException(e)}),this},xe.extend({isReady:!1,readyWait:1,ready:function(e){(e===!0?--xe.readyWait:xe.isReady)||(xe.isReady=!0,e!==!0&&--xe.readyWait>0||Re.resolveWith(ae,[xe]))}}),xe.ready.then=Re.then,"complete"===ae.readyState||"loading"!==ae.readyState&&!ae.documentElement.doScroll?n.setTimeout(xe.ready):(ae.addEventListener("DOMContentLoaded",g),n.addEventListener("load",g));var Pe=function(e,t,n,r,i,o,a){var s=0,l=e.length,u=null==n;if("object"===xe.type(n)){i=!0;for(s in n)Pe(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,xe.isFunction(r)||(a=!0),u&&(a?(t.call(e,r),t=null):(u=t,t=function(e,t,n){return u.call(xe(e),n)})),t))for(;s<l;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:u?t.call(e):l?t(e[0],n):o},Ie=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};m.uid=1,m.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Ie(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[xe.camelCase(t)]=n;else for(r in t)i[xe.camelCase(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][xe.camelCase(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){Array.isArray(t)?t=t.map(xe.camelCase):(t=xe.camelCase(t),t=t in r?[t]:t.match(Fe)||[]),n=t.length;for(;n--;)delete r[t[n]]}(void 0===t||xe.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!xe.isEmptyObject(t)}};var We=new m,Be=new m,$e=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ze=/[A-Z]/g;xe.extend({hasData:function(e){return Be.hasData(e)||We.hasData(e)},data:function(e,t,n){return Be.access(e,t,n)},removeData:function(e,t){Be.remove(e,t)},_data:function(e,t,n){return We.access(e,t,n)},_removeData:function(e,t){We.remove(e,t)}}),xe.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=Be.get(o),1===o.nodeType&&!We.get(o,"hasDataAttrs"))){for(n=a.length;n--;)a[n]&&(r=a[n].name,0===r.indexOf("data-")&&(r=xe.camelCase(r.slice(5)),y(o,r,i[r])));We.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){Be.set(this,e)}):Pe(this,function(t){var n;if(o&&void 0===t){if(n=Be.get(o,e),void 0!==n)return n;if(n=y(o,e),void 0!==n)return n}else this.each(function(){Be.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){Be.remove(this,e)})}}),xe.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=We.get(e,t),n&&(!r||Array.isArray(n)?r=We.access(e,t,xe.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=xe.queue(e,t),r=n.length,i=n.shift(),o=xe._queueHooks(e,t),a=function(){xe.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return We.get(e,n)||We.access(e,n,{empty:xe.Callbacks("once memory").add(function(){We.remove(e,[t+"queue",n])})})}}),xe.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?xe.queue(this[0],e):void 0===t?this:this.each(function(){var n=xe.queue(this,e,t);xe._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&xe.dequeue(this,e)})},dequeue:function(e){return this.each(function(){xe.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=xe.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)n=We.get(o[a],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var _e=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Xe=new RegExp("^(?:([+-])=|)("+_e+")([a-z%]*)$","i"),Ue=["Top","Right","Bottom","Left"],Ve=function(e,t){return e=t||e,"none"===e.style.display||""===e.style.display&&xe.contains(e.ownerDocument,e)&&"none"===xe.css(e,"display")},Ye=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i},Ge={};xe.fn.extend({show:function(){return w(this,!0)},hide:function(){return w(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ve(this)?xe(this).show():xe(this).hide()})}});var Qe=/^(?:checkbox|radio)$/i,Je=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Ke=/^$|\/(?:java|ecma)script/i,Ze={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ze.optgroup=Ze.option,Ze.tbody=Ze.tfoot=Ze.colgroup=Ze.caption=Ze.thead,
Ze.th=Ze.td;var et=/<|&#?\w+;/;!function(){var e=ae.createDocumentFragment(),t=e.appendChild(ae.createElement("div")),n=ae.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),ve.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",ve.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var tt=ae.documentElement,nt=/^key/,rt=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,it=/^([^.]*)(?:\.(.+)|)/;xe.event={global:{},add:function(e,t,n,r,i){var o,a,s,l,u,c,f,p,d,h,g,m=We.get(e);if(m)for(n.handler&&(o=n,n=o.handler,i=o.selector),i&&xe.find.matchesSelector(tt,i),n.guid||(n.guid=xe.guid++),(l=m.events)||(l=m.events={}),(a=m.handle)||(a=m.handle=function(t){return"undefined"!=typeof xe&&xe.event.triggered!==t.type?xe.event.dispatch.apply(e,arguments):void 0}),t=(t||"").match(Fe)||[""],u=t.length;u--;)s=it.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d&&(f=xe.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=xe.event.special[d]||{},c=xe.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&xe.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=l[d])||(p=l[d]=[],p.delegateCount=0,f.setup&&f.setup.call(e,r,h,a)!==!1||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),xe.event.global[d]=!0)},remove:function(e,t,n,r,i){var o,a,s,l,u,c,f,p,d,h,g,m=We.hasData(e)&&We.get(e);if(m&&(l=m.events)){for(t=(t||"").match(Fe)||[""],u=t.length;u--;)if(s=it.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=xe.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=l[d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||xe.removeEvent(e,d,m.handle),delete l[d])}else for(d in l)xe.event.remove(e,d+t[u],n,r,!0);xe.isEmptyObject(l)&&We.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=xe.event.fix(e),l=new Array(arguments.length),u=(We.get(this,"events")||{})[s.type]||[],c=xe.event.special[s.type]||{};for(l[0]=s,t=1;t<arguments.length;t++)l[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,s)!==!1){for(a=xe.event.handlers.call(this,s,u),t=0;(i=a[t++])&&!s.isPropagationStopped();)for(s.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!s.isImmediatePropagationStopped();)s.rnamespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,r=((xe.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,l),void 0!==r&&(s.result=r)===!1&&(s.preventDefault(),s.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],l=t.delegateCount,u=e.target;if(l&&u.nodeType&&!("click"===e.type&&e.button>=1))for(;u!==this;u=u.parentNode||this)if(1===u.nodeType&&("click"!==e.type||u.disabled!==!0)){for(o=[],a={},n=0;n<l;n++)r=t[n],i=r.selector+" ",void 0===a[i]&&(a[i]=r.needsContext?xe(i,this).index(u)>-1:xe.find(i,this,null,[u]).length),a[i]&&o.push(r);o.length&&s.push({elem:u,handlers:o})}return u=this,l<t.length&&s.push({elem:u,handlers:t.slice(l)}),s},addProp:function(e,t){Object.defineProperty(xe.Event.prototype,e,{enumerable:!0,configurable:!0,get:xe.isFunction(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[xe.expando]?e:new xe.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==N()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===N()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&l(this,"input"))return this.click(),!1},_default:function(e){return l(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},xe.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},xe.Event=function(e,t){return this instanceof xe.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?k:S,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&xe.extend(this,t),this.timeStamp=e&&e.timeStamp||xe.now(),void(this[xe.expando]=!0)):new xe.Event(e,t)},xe.Event.prototype={constructor:xe.Event,isDefaultPrevented:S,isPropagationStopped:S,isImmediatePropagationStopped:S,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=k,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=k,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=k,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},xe.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&nt.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&rt.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},xe.event.addProp),xe.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){xe.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||xe.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),xe.fn.extend({on:function(e,t,n,r){return D(this,e,t,n,r)},one:function(e,t,n,r){return D(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,xe(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return t!==!1&&"function"!=typeof t||(n=t,t=void 0),n===!1&&(n=S),this.each(function(){xe.event.remove(this,e,n,t)})}});var ot=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,at=/<script|<style|<link/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,lt=/^true\/(.*)/,ut=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;xe.extend({htmlPrefilter:function(e){return e.replace(ot,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),l=xe.contains(e.ownerDocument,e);if(!(ve.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||xe.isXMLDoc(e)))for(a=T(s),o=T(e),r=0,i=o.length;r<i;r++)H(o[r],a[r]);if(t)if(n)for(o=o||T(e),a=a||T(s),r=0,i=o.length;r<i;r++)L(o[r],a[r]);else L(e,s);return a=T(s,"script"),a.length>0&&C(a,!l&&T(e,"script")),s},cleanData:function(e){for(var t,n,r,i=xe.event.special,o=0;void 0!==(n=e[o]);o++)if(Ie(n)){if(t=n[We.expando]){if(t.events)for(r in t.events)i[r]?xe.event.remove(n,r):xe.removeEvent(n,r,t.handle);n[We.expando]=void 0}n[Be.expando]&&(n[Be.expando]=void 0)}}}),xe.fn.extend({detach:function(e){return F(this,e,!0)},remove:function(e){return F(this,e)},text:function(e){return Pe(this,function(e){return void 0===e?xe.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return O(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=j(this,e);t.appendChild(e)}})},prepend:function(){return O(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=j(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return O(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return O(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(xe.cleanData(T(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return xe.clone(this,e,t)})},html:function(e){return Pe(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!at.test(e)&&!Ze[(Je.exec(e)||["",""])[1].toLowerCase()]){e=xe.htmlPrefilter(e);try{for(;n<r;n++)t=this[n]||{},1===t.nodeType&&(xe.cleanData(T(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return O(this,arguments,function(t){var n=this.parentNode;xe.inArray(this,e)<0&&(xe.cleanData(T(this)),n&&n.replaceChild(t,this))},e)}}),xe.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){xe.fn[e]=function(e){for(var n,r=[],i=xe(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),xe(i[a])[t](n),ce.apply(r,n.get());return this.pushStack(r)}});var ct=/^margin/,ft=new RegExp("^("+_e+")(?!px)[a-z%]+$","i"),pt=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=n),t.getComputedStyle(e)};!function(){function e(){if(s){s.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",s.innerHTML="",tt.appendChild(a);var e=n.getComputedStyle(s);t="1%"!==e.top,o="2px"===e.marginLeft,r="4px"===e.width,s.style.marginRight="50%",i="4px"===e.marginRight,tt.removeChild(a),s=null}}var t,r,i,o,a=ae.createElement("div"),s=ae.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",ve.clearCloneStyle="content-box"===s.style.backgroundClip,a.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",a.appendChild(s),xe.extend(ve,{pixelPosition:function(){return e(),t},boxSizingReliable:function(){return e(),r},pixelMarginRight:function(){return e(),i},reliableMarginLeft:function(){return e(),o}}))}();var dt=/^(none|table(?!-c[ea]).+)/,ht=/^--/,gt={position:"absolute",visibility:"hidden",display:"block"},mt={letterSpacing:"0",fontWeight:"400"},vt=["Webkit","Moz","ms"],yt=ae.createElement("div").style;xe.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=M(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=xe.camelCase(t),l=ht.test(t),u=e.style;return l||(t=I(s)),a=xe.cssHooks[t]||xe.cssHooks[s],void 0===n?a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:u[t]:(o=typeof n,"string"===o&&(i=Xe.exec(n))&&i[1]&&(n=x(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(xe.cssNumber[s]?"":"px")),ve.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(l?u.setProperty(t,n):u[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,a,s=xe.camelCase(t),l=ht.test(t);return l||(t=I(s)),a=xe.cssHooks[t]||xe.cssHooks[s],a&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=M(e,t,r)),"normal"===i&&t in mt&&(i=mt[t]),""===n||n?(o=parseFloat(i),n===!0||isFinite(o)?o||0:i):i}}),xe.each(["height","width"],function(e,t){xe.cssHooks[t]={get:function(e,n,r){if(n)return!dt.test(xe.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?$(e,t,r):Ye(e,gt,function(){return $(e,t,r)})},set:function(e,n,r){var i,o=r&&pt(e),a=r&&B(e,t,r,"border-box"===xe.css(e,"boxSizing",!1,o),o);return a&&(i=Xe.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=xe.css(e,t)),W(e,n,a)}}}),xe.cssHooks.marginLeft=R(ve.reliableMarginLeft,function(e,t){if(t)return(parseFloat(M(e,"marginLeft"))||e.getBoundingClientRect().left-Ye(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),xe.each({margin:"",padding:"",border:"Width"},function(e,t){xe.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+Ue[r]+t]=o[r]||o[r-2]||o[0];return i}},ct.test(e)||(xe.cssHooks[e+t].set=W)}),xe.fn.extend({css:function(e,t){return Pe(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=pt(e),i=t.length;a<i;a++)o[t[a]]=xe.css(e,t[a],!1,r);return o}return void 0!==n?xe.style(e,t,n):xe.css(e,t)},e,t,arguments.length>1)}}),xe.Tween=z,z.prototype={constructor:z,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||xe.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(xe.cssNumber[n]?"":"px")},cur:function(){var e=z.propHooks[this.prop];return e&&e.get?e.get(this):z.propHooks._default.get(this)},run:function(e){var t,n=z.propHooks[this.prop];return this.options.duration?this.pos=t=xe.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):z.propHooks._default.set(this),this}},z.prototype.init.prototype=z.prototype,z.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=xe.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function(e){xe.fx.step[e.prop]?xe.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[xe.cssProps[e.prop]]&&!xe.cssHooks[e.prop]?e.elem[e.prop]=e.now:xe.style(e.elem,e.prop,e.now+e.unit)}}},z.propHooks.scrollTop=z.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},xe.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},xe.fx=z.prototype.init,xe.fx.step={};var xt,bt,wt=/^(?:toggle|show|hide)$/,Tt=/queueHooks$/;xe.Animation=xe.extend(Q,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return x(n.elem,e,Xe.exec(t),n),n}]},tweener:function(e,t){xe.isFunction(e)?(t=e,e=["*"]):e=e.match(Fe);for(var n,r=0,i=e.length;r<i;r++)n=e[r],Q.tweeners[n]=Q.tweeners[n]||[],Q.tweeners[n].unshift(t)},prefilters:[Y],prefilter:function(e,t){t?Q.prefilters.unshift(e):Q.prefilters.push(e)}}),xe.speed=function(e,t,n){var r=e&&"object"==typeof e?xe.extend({},e):{complete:n||!n&&t||xe.isFunction(e)&&e,duration:e,easing:n&&t||t&&!xe.isFunction(t)&&t};return xe.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in xe.fx.speeds?r.duration=xe.fx.speeds[r.duration]:r.duration=xe.fx.speeds._default),null!=r.queue&&r.queue!==!0||(r.queue="fx"),r.old=r.complete,r.complete=function(){xe.isFunction(r.old)&&r.old.call(this),r.queue&&xe.dequeue(this,r.queue)},r},xe.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Ve).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=xe.isEmptyObject(e),o=xe.speed(t,n,r),a=function(){var t=Q(this,xe.extend({},e),o);(i||We.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=xe.timers,a=We.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&Tt.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||xe.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=We.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=xe.timers,a=r?r.length:0;for(n.finish=!0,xe.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),xe.each(["toggle","show","hide"],function(e,t){var n=xe.fn[t];xe.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(U(t,!0),e,r,i)}}),xe.each({slideDown:U("show"),slideUp:U("hide"),slideToggle:U("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){xe.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),xe.timers=[],xe.fx.tick=function(){var e,t=0,n=xe.timers;for(xt=xe.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||xe.fx.stop(),xt=void 0},xe.fx.timer=function(e){xe.timers.push(e),xe.fx.start()},xe.fx.interval=13,xe.fx.start=function(){bt||(bt=!0,_())},xe.fx.stop=function(){bt=null},xe.fx.speeds={slow:600,fast:200,_default:400},xe.fn.delay=function(e,t){return e=xe.fx?xe.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,r){var i=n.setTimeout(t,e);r.stop=function(){n.clearTimeout(i)}})},function(){var e=ae.createElement("input"),t=ae.createElement("select"),n=t.appendChild(ae.createElement("option"));e.type="checkbox",ve.checkOn=""!==e.value,ve.optSelected=n.selected,e=ae.createElement("input"),e.value="t",e.type="radio",ve.radioValue="t"===e.value}();var Ct,Et=xe.expr.attrHandle;xe.fn.extend({attr:function(e,t){return Pe(this,xe.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){xe.removeAttr(this,e)})}}),xe.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?xe.prop(e,t,n):(1===o&&xe.isXMLDoc(e)||(i=xe.attrHooks[t.toLowerCase()]||(xe.expr.match.bool.test(t)?Ct:void 0)),void 0!==n?null===n?void xe.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:(r=xe.find.attr(e,t),null==r?void 0:r))},attrHooks:{type:{set:function(e,t){if(!ve.radioValue&&"radio"===t&&l(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(Fe);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),Ct={set:function(e,t,n){return t===!1?xe.removeAttr(e,n):e.setAttribute(n,n),n}},xe.each(xe.expr.match.bool.source.match(/\w+/g),function(e,t){var n=Et[t]||xe.find.attr;Et[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=Et[a],Et[a]=i,i=null!=n(e,t,r)?a:null,Et[a]=o),i}});var kt=/^(?:input|select|textarea|button)$/i,St=/^(?:a|area)$/i;xe.fn.extend({prop:function(e,t){return Pe(this,xe.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[xe.propFix[e]||e]})}}),xe.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&xe.isXMLDoc(e)||(t=xe.propFix[t]||t,i=xe.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=xe.find.attr(e,"tabindex");return t?parseInt(t,10):kt.test(e.nodeName)||St.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),ve.optSelected||(xe.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),xe.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){xe.propFix[this.toLowerCase()]=this}),xe.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,l=0;if(xe.isFunction(e))return this.each(function(t){xe(this).addClass(e.call(this,t,K(this)))});if("string"==typeof e&&e)for(t=e.match(Fe)||[];n=this[l++];)if(i=K(n),r=1===n.nodeType&&" "+J(i)+" "){for(a=0;o=t[a++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");s=J(r),i!==s&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,l=0;if(xe.isFunction(e))return this.each(function(t){xe(this).removeClass(e.call(this,t,K(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(Fe)||[];n=this[l++];)if(i=K(n),r=1===n.nodeType&&" "+J(i)+" "){for(a=0;o=t[a++];)for(;r.indexOf(" "+o+" ")>-1;)r=r.replace(" "+o+" "," ");s=J(r),i!==s&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):xe.isFunction(e)?this.each(function(n){xe(this).toggleClass(e.call(this,n,K(this),t),t)}):this.each(function(){var t,r,i,o;if("string"===n)for(r=0,i=xe(this),o=e.match(Fe)||[];t=o[r++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else void 0!==e&&"boolean"!==n||(t=K(this),t&&We.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||e===!1?"":We.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+J(K(n))+" ").indexOf(t)>-1)return!0;return!1}});var Nt=/\r/g;xe.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=xe.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,xe(this).val()):e,null==i?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=xe.map(i,function(e){return null==e?"":e+""})),t=xe.valHooks[this.type]||xe.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return t=xe.valHooks[i.type]||xe.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(Nt,""):null==n?"":n)}}}),xe.extend({valHooks:{option:{get:function(e){var t=xe.find.attr(e,"value");return null!=t?t:J(xe.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(n=i[r],(n.selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!l(n.parentNode,"optgroup"))){if(t=xe(n).val(),a)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=xe.makeArray(t),a=i.length;a--;)r=i[a],(r.selected=xe.inArray(xe.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),xe.each(["radio","checkbox"],function(){xe.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=xe.inArray(xe(e).val(),t)>-1}},ve.checkOn||(xe.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Dt=/^(?:focusinfocus|focusoutblur)$/;xe.extend(xe.event,{trigger:function(e,t,r,i){var o,a,s,l,u,c,f,p=[r||ae],d=he.call(e,"type")?e.type:e,h=he.call(e,"namespace")?e.namespace.split("."):[];if(a=s=r=r||ae,3!==r.nodeType&&8!==r.nodeType&&!Dt.test(d+xe.event.triggered)&&(d.indexOf(".")>-1&&(h=d.split("."),d=h.shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,e=e[xe.expando]?e:new xe.Event(d,"object"==typeof e&&e),e.isTrigger=i?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=r),t=null==t?[e]:xe.makeArray(t,[e]),f=xe.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,t)!==!1)){if(!i&&!f.noBubble&&!xe.isWindow(r)){for(l=f.delegateType||d,Dt.test(l+d)||(a=a.parentNode);a;a=a.parentNode)p.push(a),s=a;s===(r.ownerDocument||ae)&&p.push(s.defaultView||s.parentWindow||n)}for(o=0;(a=p[o++])&&!e.isPropagationStopped();)e.type=o>1?l:f.bindType||d,c=(We.get(a,"events")||{})[e.type]&&We.get(a,"handle"),c&&c.apply(a,t),c=u&&a[u],c&&c.apply&&Ie(a)&&(e.result=c.apply(a,t),e.result===!1&&e.preventDefault());return e.type=d,i||e.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),t)!==!1||!Ie(r)||u&&xe.isFunction(r[d])&&!xe.isWindow(r)&&(s=r[u],s&&(r[u]=null),xe.event.triggered=d,r[d](),xe.event.triggered=void 0,s&&(r[u]=s)),e.result}},simulate:function(e,t,n){var r=xe.extend(new xe.Event,n,{type:e,isSimulated:!0});xe.event.trigger(r,null,t)}}),xe.fn.extend({trigger:function(e,t){return this.each(function(){xe.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return xe.event.trigger(e,t,n,!0)}}),xe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){xe.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),xe.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),ve.focusin="onfocusin"in n,ve.focusin||xe.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){xe.event.simulate(t,e.target,xe.event.fix(e))};xe.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=We.access(r,t);i||r.addEventListener(e,n,!0),We.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=We.access(r,t)-1;i?We.access(r,t,i):(r.removeEventListener(e,n,!0),We.remove(r,t))}}});var jt=n.location,At=xe.now(),qt=/\?/;xe.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new n.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||xe.error("Invalid XML: "+e),t};var Lt=/\[\]$/,Ht=/\r?\n/g,Ot=/^(?:submit|button|image|reset|file)$/i,Ft=/^(?:input|select|textarea|keygen)/i;xe.param=function(e,t){var n,r=[],i=function(e,t){var n=xe.isFunction(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!xe.isPlainObject(e))xe.each(e,function(){i(this.name,this.value)});else for(n in e)Z(n,e[n],t,i);return r.join("&")},xe.fn.extend({serialize:function(){return xe.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=xe.prop(this,"elements");return e?xe.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!xe(this).is(":disabled")&&Ft.test(this.nodeName)&&!Ot.test(e)&&(this.checked||!Qe.test(e))}).map(function(e,t){var n=xe(this).val();return null==n?null:Array.isArray(n)?xe.map(n,function(e){return{name:t.name,value:e.replace(Ht,"\r\n")}}):{name:t.name,value:n.replace(Ht,"\r\n")}}).get()}});var Mt=/%20/g,Rt=/#.*$/,Pt=/([?&])_=[^&]*/,It=/^(.*?):[ \t]*([^\r\n]*)$/gm,Wt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Bt=/^(?:GET|HEAD)$/,$t=/^\/\//,zt={},_t={},Xt="*/".concat("*"),Ut=ae.createElement("a");Ut.href=jt.href,xe.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jt.href,type:"GET",isLocal:Wt.test(jt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":xe.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?ne(ne(e,xe.ajaxSettings),t):ne(xe.ajaxSettings,e)},ajaxPrefilter:ee(zt),ajaxTransport:ee(_t),ajax:function(e,t){function r(e,t,r,s){var u,p,d,b,w,T=t;c||(c=!0,l&&n.clearTimeout(l),i=void 0,a=s||"",C.readyState=e>0?4:0,u=e>=200&&e<300||304===e,r&&(b=re(h,C,r)),b=ie(h,b,C,u),u?(h.ifModified&&(w=C.getResponseHeader("Last-Modified"),w&&(xe.lastModified[o]=w),w=C.getResponseHeader("etag"),w&&(xe.etag[o]=w)),204===e||"HEAD"===h.type?T="nocontent":304===e?T="notmodified":(T=b.state,p=b.data,d=b.error,u=!d)):(d=T,!e&&T||(T="error",e<0&&(e=0))),C.status=e,C.statusText=(t||T)+"",u?v.resolveWith(g,[p,T,C]):v.rejectWith(g,[C,T,d]),C.statusCode(x),x=void 0,f&&m.trigger(u?"ajaxSuccess":"ajaxError",[C,h,u?p:d]),y.fireWith(g,[C,T]),f&&(m.trigger("ajaxComplete",[C,h]),--xe.active||xe.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var i,o,a,s,l,u,c,f,p,d,h=xe.ajaxSetup({},t),g=h.context||h,m=h.context&&(g.nodeType||g.jquery)?xe(g):xe.event,v=xe.Deferred(),y=xe.Callbacks("once memory"),x=h.statusCode||{},b={},w={},T="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s)for(s={};t=It.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)C.always(e[C.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(v.promise(C),h.url=((e||h.url||jt.href)+"").replace($t,jt.protocol+"//"),h.type=t.method||t.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(Fe)||[""],null==h.crossDomain){u=ae.createElement("a");try{u.href=h.url,u.href=u.href,h.crossDomain=Ut.protocol+"//"+Ut.host!=u.protocol+"//"+u.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=xe.param(h.data,h.traditional)),te(zt,h,t,C),c)return C;f=xe.event&&h.global,f&&0===xe.active++&&xe.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Bt.test(h.type),o=h.url.replace(Rt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(Mt,"+")):(d=h.url.slice(o.length),h.data&&(o+=(qt.test(o)?"&":"?")+h.data,delete h.data),h.cache===!1&&(o=o.replace(Pt,"$1"),d=(qt.test(o)?"&":"?")+"_="+At++ +d),h.url=o+d),h.ifModified&&(xe.lastModified[o]&&C.setRequestHeader("If-Modified-Since",xe.lastModified[o]),xe.etag[o]&&C.setRequestHeader("If-None-Match",xe.etag[o])),(h.data&&h.hasContent&&h.contentType!==!1||t.contentType)&&C.setRequestHeader("Content-Type",h.contentType),C.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Xt+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)C.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(h.beforeSend.call(g,C,h)===!1||c))return C.abort();if(T="abort",y.add(h.complete),C.done(h.success),C.fail(h.error),i=te(_t,h,t,C)){if(C.readyState=1,f&&m.trigger("ajaxSend",[C,h]),c)return C;h.async&&h.timeout>0&&(l=n.setTimeout(function(){C.abort("timeout")},h.timeout));try{c=!1,i.send(b,r)}catch(e){if(c)throw e;r(-1,e)}}else r(-1,"No Transport");return C},getJSON:function(e,t,n){return xe.get(e,t,n,"json")},getScript:function(e,t){return xe.get(e,void 0,t,"script")}}),xe.each(["get","post"],function(e,t){xe[t]=function(e,n,r,i){return xe.isFunction(n)&&(i=i||r,r=n,n=void 0),xe.ajax(xe.extend({url:e,type:t,dataType:i,data:n,success:r},xe.isPlainObject(e)&&e))}}),xe._evalUrl=function(e){return xe.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},xe.fn.extend({wrapAll:function(e){var t;return this[0]&&(xe.isFunction(e)&&(e=e.call(this[0])),t=xe(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return xe.isFunction(e)?this.each(function(t){xe(this).wrapInner(e.call(this,t))}):this.each(function(){var t=xe(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=xe.isFunction(e);return this.each(function(n){xe(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){xe(this).replaceWith(this.childNodes)}),this}}),xe.expr.pseudos.hidden=function(e){return!xe.expr.pseudos.visible(e)},xe.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
},xe.ajaxSettings.xhr=function(){try{return new n.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Yt=xe.ajaxSettings.xhr();ve.cors=!!Yt&&"withCredentials"in Yt,ve.ajax=Yt=!!Yt,xe.ajaxTransport(function(e){var t,r;if(ve.cors||Yt&&!e.crossDomain)return{send:function(i,o){var a,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)s[a]=e.xhrFields[a];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);t=function(e){return function(){t&&(t=r=s.onload=s.onerror=s.onabort=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=t(),r=s.onerror=t("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&n.setTimeout(function(){t&&r()})},t=t("abort");try{s.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}}),xe.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),xe.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return xe.globalEval(e),e}}}),xe.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),xe.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=xe("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),ae.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Gt=[],Qt=/(=)\?(?=&|$)|\?\?/;xe.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||xe.expando+"_"+At++;return this[e]=!0,e}}),xe.ajaxPrefilter("json jsonp",function(e,t,r){var i,o,a,s=e.jsonp!==!1&&(Qt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(e.data)&&"data");if(s||"jsonp"===e.dataTypes[0])return i=e.jsonpCallback=xe.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,s?e[s]=e[s].replace(Qt,"$1"+i):e.jsonp!==!1&&(e.url+=(qt.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return a||xe.error(i+" was not called"),a[0]},e.dataTypes[0]="json",o=n[i],n[i]=function(){a=arguments},r.always(function(){void 0===o?xe(n).removeProp(i):n[i]=o,e[i]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(i)),a&&xe.isFunction(o)&&o(a[0]),a=o=void 0}),"script"}),ve.createHTMLDocument=function(){var e=ae.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),xe.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var r,i,o;return t||(ve.createHTMLDocument?(t=ae.implementation.createHTMLDocument(""),r=t.createElement("base"),r.href=ae.location.href,t.head.appendChild(r)):t=ae),i=De.exec(e),o=!n&&[],i?[t.createElement(i[1])]:(i=E([e],t,o),o&&o.length&&xe(o).remove(),xe.merge([],i.childNodes))},xe.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=J(e.slice(s)),e=e.slice(0,s)),xe.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&xe.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?xe("<div>").append(xe.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},xe.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){xe.fn[t]=function(e){return this.on(t,e)}}),xe.expr.pseudos.animated=function(e){return xe.grep(xe.timers,function(t){return e===t.elem}).length},xe.offset={setOffset:function(e,t,n){var r,i,o,a,s,l,u,c=xe.css(e,"position"),f=xe(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=xe.css(e,"top"),l=xe.css(e,"left"),u=("absolute"===c||"fixed"===c)&&(o+l).indexOf("auto")>-1,u?(r=f.position(),a=r.top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(l)||0),xe.isFunction(t)&&(t=t.call(e,n,xe.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},xe.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){xe.offset.setOffset(this,e,t)});var t,n,r,i,o=this[0];if(o)return o.getClientRects().length?(r=o.getBoundingClientRect(),t=o.ownerDocument,n=t.documentElement,i=t.defaultView,{top:r.top+i.pageYOffset-n.clientTop,left:r.left+i.pageXOffset-n.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===xe.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),l(e[0],"html")||(r=e.offset()),r={top:r.top+xe.css(e[0],"borderTopWidth",!0),left:r.left+xe.css(e[0],"borderLeftWidth",!0)}),{top:t.top-r.top-xe.css(n,"marginTop",!0),left:t.left-r.left-xe.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===xe.css(e,"position");)e=e.offsetParent;return e||tt})}}),xe.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;xe.fn[e]=function(r){return Pe(this,function(e,r,i){var o;return xe.isWindow(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i?o?o[t]:e[r]:void(o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i)},e,r,arguments.length)}}),xe.each(["top","left"],function(e,t){xe.cssHooks[t]=R(ve.pixelPosition,function(e,n){if(n)return n=M(e,t),ft.test(n)?xe(e).position()[t]+"px":n})}),xe.each({Height:"height",Width:"width"},function(e,t){xe.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){xe.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(i===!0||o===!0?"margin":"border");return Pe(this,function(t,n,i){var o;return xe.isWindow(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?xe.css(t,n,s):xe.style(t,n,i,s)},t,a?i:void 0,a)}})}),xe.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),xe.holdReady=function(e){e?xe.readyWait++:xe.ready(!0)},xe.isArray=Array.isArray,xe.parseJSON=JSON.parse,xe.nodeName=l,r=[],i=function(){return xe}.apply(t,r),!(void 0!==i&&(e.exports=i));var Jt=n.jQuery,Kt=n.$;return xe.noConflict=function(e){return n.$===xe&&(n.$=Kt),e&&n.jQuery===xe&&(n.jQuery=Jt),xe},o||(n.jQuery=n.$=xe),xe})},function(e,t){!function(e,t,n,r){"use strict";e.fn.simpleLightbox=function(r){var i,r=e.extend({overlay:!0,spinner:!0,nav:!0,navText:["&lsaquo;","&rsaquo;"],captions:!0,captionDelay:0,captionSelector:"img",captionType:"attr",captionsData:"title",captionPosition:"bottom",close:!0,closeText:"×",swipeClose:!0,showCounter:!0,fileExt:"png|jpg|jpeg|gif",animationSlide:!0,animationSpeed:250,preloading:!0,enableKeyboard:!0,loop:!0,rel:!1,docClose:!0,swipeTolerance:50,className:"simple-lightbox",widthRatio:.8,heightRatio:.9,disableRightClick:!1,disableScroll:!0,alertError:!0,alertErrorMessage:"Image not found, next image will be loaded",additionalHtml:!1,history:!0},r),o=(t.navigator.pointerEnabled||t.navigator.msPointerEnabled,0),a=0,s=e(),l=function(){var e=n.body||n.documentElement;return e=e.style,""===e.WebkitTransition?"-webkit-":""===e.MozTransition?"-moz-":""===e.OTransition?"-o-":""===e.transition&&""},u=!1,c=[],f=function(t,n){var r=e(n.selector).filter(function(){return e(this).attr("rel")===t});return r},p=r.rel&&r.rel!==!1?f(r.rel,this):this,l=l(),d=0,h=l!==!1,g="pushState"in history,m=!1,v=t.location,y=function(){return v.hash.substring(1)},x=y(),b=function(){var e=(y(),"pid="+(A+1)),t=v.href.split("#")[0]+"#"+e;g?history[m?"replaceState":"pushState"]("",n.title,t):m?v.replace(t):v.hash=e,m=!0},w=function(){g?history.pushState("",n.title,v.pathname+v.search):v.hash="",clearTimeout(i)},T=function(){m?i=setTimeout(b,800):b()},C="simplelb",E=e("<div>").addClass("sl-overlay"),k=e("<button>").addClass("sl-close").html(r.closeText),S=e("<div>").addClass("sl-spinner").html("<div></div>"),N=e("<div>").addClass("sl-navigation").html('<button class="sl-prev">'+r.navText[0]+'</button><button class="sl-next">'+r.navText[1]+"</button>"),D=e("<div>").addClass("sl-counter").html('<span class="sl-current"></span>/<span class="sl-total"></span>'),j=!1,A=0,q=e("<div>").addClass("sl-caption pos-"+r.captionPosition),L=e("<div>").addClass("sl-image"),H=e("<div>").addClass("sl-wrapper").addClass(r.className),O=function(t){return!r.fileExt||"a"==e(t).prop("tagName").toLowerCase()&&new RegExp(".("+r.fileExt+")$","i").test(e(t).attr("href"))},F=function(){r.close&&k.appendTo(H),r.showCounter&&p.length>1&&(D.appendTo(H),D.find(".sl-total").text(p.length)),r.nav&&N.appendTo(H),r.spinner&&S.appendTo(H)},M=function(t){t.trigger(e.Event("show.simplelightbox")),r.disableScroll&&(d=X("hide")),H.appendTo("body"),L.appendTo(H),r.overlay&&E.appendTo(e("body")),j=!0,A=p.index(t),s=e("<img/>").hide().attr("src",t.attr("href")),c.indexOf(t.attr("href"))==-1&&c.push(t.attr("href")),L.html("").attr("style",""),s.appendTo(L),W(),E.fadeIn("fast"),e(".sl-close").fadeIn("fast"),S.show(),N.fadeIn("fast"),e(".sl-wrapper .sl-counter .sl-current").text(A+1),D.fadeIn("fast"),R(),r.preloading&&$(),setTimeout(function(){t.trigger(e.Event("shown.simplelightbox"))},r.animationSpeed)},R=function(n){if(s.length){var i=new Image,o=e(t).width()*r.widthRatio,a=e(t).height()*r.heightRatio;i.src=s.attr("src"),e(i).bind("error",function(t){p.eq(A).trigger(e.Event("error.simplelightbox")),j=!1,u=!0,S.hide(),r.alertError&&alert(r.alertErrorMessage),z(1==n||n==-1?n:1)}),i.onload=function(){"undefined"!=typeof n&&p.eq(A).trigger(e.Event("changed.simplelightbox")).trigger(e.Event((1===n?"nextDone":"prevDone")+".simplelightbox")),r.history&&T(),c.indexOf(s.attr("src"))==-1&&c.push(s.attr("src"));var l=i.width,f=i.height;if(l>o||f>a){var g=l/f>o/a?l/o:f/a;l/=g,f/=g}e(".sl-image").css({top:(e(t).height()-f)/2+"px",left:(e(t).width()-l-d)/2+"px"}),S.hide(),s.css({width:l+"px",height:f+"px"}).fadeIn("fast"),u=!0;var m,v="self"==r.captionSelector?p.eq(A):p.eq(A).find(r.captionSelector);if(m="data"==r.captionType?v.data(r.captionsData):"text"==r.captionType?v.html():v.prop(r.captionsData),r.loop||(0===A&&e(".sl-prev").hide(),A>=p.length-1&&e(".sl-next").hide(),A>0&&e(".sl-prev").show(),A<p.length-1&&e(".sl-next").show()),1==p.length&&e(".sl-prev, .sl-next").hide(),1==n||n==-1){var y={opacity:1};r.animationSlide&&(h?(I(0,100*n+"px"),setTimeout(function(){I(r.animationSpeed/1e3,"0px"),50})):y.left=parseInt(e(".sl-image").css("left"))+100*n+"px"),e(".sl-image").animate(y,r.animationSpeed,function(){j=!1,P(m)})}else j=!1,P(m);r.additionalHtml&&0===e(".sl-additional-html").length&&e("<div>").html(r.additionalHtml).addClass("sl-additional-html").appendTo(e(".sl-image"))}}},P=function(t){""!==t&&"undefined"!=typeof t&&r.captions&&q.html(t).hide().appendTo(e(".sl-image")).delay(r.captionDelay).fadeIn("fast")},I=function(t,n){var r={};r[l+"transform"]="translateX("+n+")",r[l+"transition"]=l+"transform "+t+"s linear",e(".sl-image").css(r)},W=function(){e(t).on("resize."+C,R),e(n).on("click."+C+" touchstart."+C,".sl-close",function(e){e.preventDefault(),u&&_()}),r.history&&setTimeout(function(){e(t).on("hashchange."+C,function(){if(u&&y()===x)return void _()})},40),N.on("click."+C,"button",function(t){t.preventDefault(),o=0,z(e(this).hasClass("sl-next")?1:-1)});var i=0,s=0,l=0,c=0,f=!1,d=0;L.on("touchstart."+C+" mousedown."+C,function(e){return!!f||(h&&(d=parseInt(L.css("left"))),f=!0,i=e.originalEvent.pageX||e.originalEvent.touches[0].pageX,l=e.originalEvent.pageY||e.originalEvent.touches[0].pageY,!1)}).on("touchmove."+C+" mousemove."+C+" pointermove MSPointerMove",function(e){return!f||(e.preventDefault(),s=e.originalEvent.pageX||e.originalEvent.touches[0].pageX,c=e.originalEvent.pageY||e.originalEvent.touches[0].pageY,o=i-s,a=l-c,void(r.animationSlide&&(h?I(0,-o+"px"):L.css("left",d-o+"px"))))}).on("touchend."+C+" mouseup."+C+" touchcancel."+C+" mouseleave."+C+" pointerup pointercancel MSPointerUp MSPointerCancel",function(e){if(f){f=!1;var t=!0;r.loop||(0===A&&o<0&&(t=!1),A>=p.length-1&&o>0&&(t=!1)),Math.abs(o)>r.swipeTolerance&&t?z(o>0?1:-1):r.animationSlide&&(h?I(r.animationSpeed/1e3,"0px"):L.animate({left:d+"px"},r.animationSpeed/2)),r.swipeClose&&Math.abs(a)>50&&Math.abs(o)<r.swipeTolerance&&_()}})},B=function(){N.off("click","button"),e(n).off("click."+C,".sl-close"),e(t).off("resize."+C),e(t).off("hashchange."+C)},$=function(){var t=A+1<0?p.length-1:A+1>=p.length-1?0:A+1,n=A-1<0?p.length-1:A-1>=p.length-1?0:A-1;e("<img />").attr("src",p.eq(t).attr("href")).on("load",function(){c.indexOf(e(this).attr("src"))==-1&&c.push(e(this).attr("src")),p.eq(A).trigger(e.Event("nextImageLoaded.simplelightbox"))}),e("<img />").attr("src",p.eq(n).attr("href")).on("load",function(){c.indexOf(e(this).attr("src"))==-1&&c.push(e(this).attr("src")),p.eq(A).trigger(e.Event("prevImageLoaded.simplelightbox"))})},z=function(t){p.eq(A).trigger(e.Event("change.simplelightbox")).trigger(e.Event((1===t?"next":"prev")+".simplelightbox"));var n=A+t;if(!(j||(n<0||n>=p.length)&&r.loop===!1)){A=n<0?p.length-1:n>p.length-1?0:n,e(".sl-wrapper .sl-counter .sl-current").text(A+1);var i={opacity:0};r.animationSlide&&(h?I(r.animationSpeed/1e3,-100*t-o+"px"):i.left=parseInt(e(".sl-image").css("left"))+-100*t+"px"),e(".sl-image").animate(i,r.animationSpeed,function(){setTimeout(function(){var n=p.eq(A);s.attr("src",n.attr("href")),c.indexOf(n.attr("href"))==-1&&S.show(),e(".sl-caption").remove(),R(t),r.preloading&&$()},100)})}},_=function(){if(!j){var t=p.eq(A),n=!1;t.trigger(e.Event("close.simplelightbox")),r.history&&w(),e(".sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter").fadeOut("fast",function(){r.disableScroll&&X("show"),e(".sl-wrapper, .sl-overlay").remove(),B(),n||t.trigger(e.Event("closed.simplelightbox")),n=!0}),s=e(),u=!1,j=!1}},X=function(r){var i=0;if("hide"==r){var o=t.innerWidth;if(!o){var a=n.documentElement.getBoundingClientRect();o=a.right-Math.abs(a.left)}if(n.body.clientWidth<o){var s=n.createElement("div"),l=parseInt(e("body").css("padding-right"),10);s.className="sl-scrollbar-measure",e("body").append(s),i=s.offsetWidth-s.clientWidth,e(n.body)[0].removeChild(s),e("body").data("padding",l),i>0&&e("body").addClass("hidden-scroll").css({"padding-right":l+i})}}else e("body").removeClass("hidden-scroll").css({"padding-right":e("body").data("padding")});return i};return F(),p.on("click."+C,function(t){if(O(this)){if(t.preventDefault(),j)return!1;M(e(this))}}),e(n).on("click."+C+" touchstart."+C,function(t){u&&r.docClose&&0===e(t.target).closest(".sl-image").length&&0===e(t.target).closest(".sl-navigation").length&&_()}),r.disableRightClick&&e(n).on("contextmenu",".sl-image img",function(e){return!1}),r.enableKeyboard&&e(n).on("keyup."+C,function(e){if(o=0,u){e.preventDefault();var t=e.keyCode;27==t&&_(),37!=t&&39!=e.keyCode||z(39==e.keyCode?1:-1)}}),this.open=function(t){t=t||e(this[0]),M(t)},this.next=function(){z(1)},this.prev=function(){z(-1)},this.close=function(){_()},this.destroy=function(){e(n).unbind("click."+C).unbind("keyup."+C),_(),e(".sl-overlay, .sl-wrapper").remove(),this.off("click")},this.refresh=function(){this.destroy(),e(this.selector).simpleLightbox(r)},this}}(jQuery,window,document)},function(e,t){e.exports=' <div> <div class=my-gallery :class=album_class> <a :href=image.src v-for="image,key in images"> <img :src=image.src alt="" :title=image.title :class=image_class /> </a> </div> </div> '},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=f[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(l(r.parts[o],t))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(l(r.parts[o],t));f[r.id]={id:r.id,refs:1,parts:a}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],o=i[0],a=i[1],s=i[2],l=i[3],u={css:a,media:s,sourceMap:l};n[o]?n[o].parts.push(u):t.push(n[o]={id:o,parts:[u]})}return t}function o(e,t){var n=h(),r=v[v.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",o(e,t),t}function l(e,t){var n,r,i;if(t.singleton){var o=m++;n=g||(g=s(t)),r=u.bind(null,n,o,!1),i=u.bind(null,n,o,!0)}else n=s(t),r=c.bind(null,n),i=function(){a(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function u(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function c(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var f={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,m=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=d()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var s=n[a],l=f[s.id];l.refs--,o.push(l)}if(e){var u=i(e);r(u,t)}for(var a=0;a<o.length;a++){var l=o[a];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete f[l.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.id,r,""]]);n(8)(r,{});r.locals&&(e.exports=r.locals)}])});

/***/ }),
/* 109 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
module.exports = __webpack_require__(22);


/***/ })
],[110]);