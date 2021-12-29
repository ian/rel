var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// ../../node_modules/.pnpm/tsup@5.11.9_typescript@4.1.3/node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "../../node_modules/.pnpm/tsup@5.11.9_typescript@4.1.3/node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// ../../node_modules/.pnpm/dataloader@2.0.0/node_modules/dataloader/index.js
var require_dataloader = __commonJS({
  "../../node_modules/.pnpm/dataloader@2.0.0/node_modules/dataloader/index.js"(exports, module2) {
    "use strict";
    init_cjs_shims();
    var DataLoader2 = /* @__PURE__ */ function() {
      function DataLoader3(batchLoadFn, options) {
        if (typeof batchLoadFn !== "function") {
          throw new TypeError("DataLoader must be constructed with a function which accepts " + ("Array<key> and returns Promise<Array<value>>, but got: " + batchLoadFn + "."));
        }
        this._batchLoadFn = batchLoadFn;
        this._maxBatchSize = getValidMaxBatchSize(options);
        this._batchScheduleFn = getValidBatchScheduleFn(options);
        this._cacheKeyFn = getValidCacheKeyFn(options);
        this._cacheMap = getValidCacheMap(options);
        this._batch = null;
      }
      var _proto = DataLoader3.prototype;
      _proto.load = function load(key) {
        if (key === null || key === void 0) {
          throw new TypeError("The loader.load() function must be called with a value," + ("but got: " + String(key) + "."));
        }
        var batch = getCurrentBatch(this);
        var cacheMap = this._cacheMap;
        var cacheKey = this._cacheKeyFn(key);
        if (cacheMap) {
          var cachedPromise = cacheMap.get(cacheKey);
          if (cachedPromise) {
            var cacheHits = batch.cacheHits || (batch.cacheHits = []);
            return new Promise(function(resolve5) {
              cacheHits.push(function() {
                return resolve5(cachedPromise);
              });
            });
          }
        }
        batch.keys.push(key);
        var promise = new Promise(function(resolve5, reject) {
          batch.callbacks.push({
            resolve: resolve5,
            reject
          });
        });
        if (cacheMap) {
          cacheMap.set(cacheKey, promise);
        }
        return promise;
      };
      _proto.loadMany = function loadMany(keys) {
        if (!isArrayLike(keys)) {
          throw new TypeError("The loader.loadMany() function must be called with Array<key> " + ("but got: " + keys + "."));
        }
        var loadPromises = [];
        for (var i = 0; i < keys.length; i++) {
          loadPromises.push(this.load(keys[i])["catch"](function(error) {
            return error;
          }));
        }
        return Promise.all(loadPromises);
      };
      _proto.clear = function clear(key) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          cacheMap["delete"](cacheKey);
        }
        return this;
      };
      _proto.clearAll = function clearAll() {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          cacheMap.clear();
        }
        return this;
      };
      _proto.prime = function prime(key, value) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          if (cacheMap.get(cacheKey) === void 0) {
            var promise;
            if (value instanceof Error) {
              promise = Promise.reject(value);
              promise["catch"](function() {
              });
            } else {
              promise = Promise.resolve(value);
            }
            cacheMap.set(cacheKey, promise);
          }
        }
        return this;
      };
      return DataLoader3;
    }();
    var enqueuePostPromiseJob = typeof process === "object" && typeof process.nextTick === "function" ? function(fn) {
      if (!resolvedPromise) {
        resolvedPromise = Promise.resolve();
      }
      resolvedPromise.then(function() {
        return process.nextTick(fn);
      });
    } : setImmediate || setTimeout;
    var resolvedPromise;
    function getCurrentBatch(loader) {
      var existingBatch = loader._batch;
      if (existingBatch !== null && !existingBatch.hasDispatched && existingBatch.keys.length < loader._maxBatchSize && (!existingBatch.cacheHits || existingBatch.cacheHits.length < loader._maxBatchSize)) {
        return existingBatch;
      }
      var newBatch = {
        hasDispatched: false,
        keys: [],
        callbacks: []
      };
      loader._batch = newBatch;
      loader._batchScheduleFn(function() {
        return dispatchBatch(loader, newBatch);
      });
      return newBatch;
    }
    function dispatchBatch(loader, batch) {
      batch.hasDispatched = true;
      if (batch.keys.length === 0) {
        resolveCacheHits(batch);
        return;
      }
      var batchPromise = loader._batchLoadFn(batch.keys);
      if (!batchPromise || typeof batchPromise.then !== "function") {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise: " + String(batchPromise) + ".")));
      }
      batchPromise.then(function(values) {
        if (!isArrayLike(values)) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise of an Array: " + String(values) + "."));
        }
        if (values.length !== batch.keys.length) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys." + ("\n\nKeys:\n" + String(batch.keys)) + ("\n\nValues:\n" + String(values)));
        }
        resolveCacheHits(batch);
        for (var i = 0; i < batch.callbacks.length; i++) {
          var value = values[i];
          if (value instanceof Error) {
            batch.callbacks[i].reject(value);
          } else {
            batch.callbacks[i].resolve(value);
          }
        }
      })["catch"](function(error) {
        return failedDispatch(loader, batch, error);
      });
    }
    function failedDispatch(loader, batch, error) {
      resolveCacheHits(batch);
      for (var i = 0; i < batch.keys.length; i++) {
        loader.clear(batch.keys[i]);
        batch.callbacks[i].reject(error);
      }
    }
    function resolveCacheHits(batch) {
      if (batch.cacheHits) {
        for (var i = 0; i < batch.cacheHits.length; i++) {
          batch.cacheHits[i]();
        }
      }
    }
    function getValidMaxBatchSize(options) {
      var shouldBatch = !options || options.batch !== false;
      if (!shouldBatch) {
        return 1;
      }
      var maxBatchSize = options && options.maxBatchSize;
      if (maxBatchSize === void 0) {
        return Infinity;
      }
      if (typeof maxBatchSize !== "number" || maxBatchSize < 1) {
        throw new TypeError("maxBatchSize must be a positive number: " + maxBatchSize);
      }
      return maxBatchSize;
    }
    function getValidBatchScheduleFn(options) {
      var batchScheduleFn = options && options.batchScheduleFn;
      if (batchScheduleFn === void 0) {
        return enqueuePostPromiseJob;
      }
      if (typeof batchScheduleFn !== "function") {
        throw new TypeError("batchScheduleFn must be a function: " + batchScheduleFn);
      }
      return batchScheduleFn;
    }
    function getValidCacheKeyFn(options) {
      var cacheKeyFn = options && options.cacheKeyFn;
      if (cacheKeyFn === void 0) {
        return function(key) {
          return key;
        };
      }
      if (typeof cacheKeyFn !== "function") {
        throw new TypeError("cacheKeyFn must be a function: " + cacheKeyFn);
      }
      return cacheKeyFn;
    }
    function getValidCacheMap(options) {
      var shouldCache = !options || options.cache !== false;
      if (!shouldCache) {
        return null;
      }
      var cacheMap = options && options.cacheMap;
      if (cacheMap === void 0) {
        return /* @__PURE__ */ new Map();
      }
      if (cacheMap !== null) {
        var cacheFunctions = ["get", "set", "delete", "clear"];
        var missingFunctions = cacheFunctions.filter(function(fnName) {
          return cacheMap && typeof cacheMap[fnName] !== "function";
        });
        if (missingFunctions.length !== 0) {
          throw new TypeError("Custom cacheMap missing methods: " + missingFunctions.join(", "));
        }
      }
      return cacheMap;
    }
    function isArrayLike(x) {
      return typeof x === "object" && x !== null && typeof x.length === "number" && (x.length === 0 || x.length > 0 && Object.prototype.hasOwnProperty.call(x, x.length - 1));
    }
    module2.exports = DataLoader2;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BooleanScalarInputType: () => BooleanScalarInputType,
  IDScalarInputType: () => IDScalarInputType,
  OrderByInputType: () => OrderByInputType,
  PageRequest: () => PageRequest,
  Plugin: () => SchemaCRUDPlugin,
  SCHEMA_CRUD_PLUGIN_NAME: () => SCHEMA_CRUD_PLUGIN_NAME,
  SchemaCRUDPlugin: () => SchemaCRUDPlugin,
  SortDirectionEnum: () => SortDirectionEnum,
  StringScalarInputType: () => StringScalarInputType,
  addCreateObjectInputType: () => addCreateObjectInputType,
  addUpdateObjectInputType: () => addUpdateObjectInputType,
  buildCreateMutationInputType: () => buildCreateMutationInputType,
  buildFilterInputType: () => buildFilterInputType,
  buildFindOneFieldMap: () => buildFindOneFieldMap,
  buildMutationInputType: () => buildMutationInputType,
  buildSubscriptionFilterType: () => buildSubscriptionFilterType,
  createInputTypeForScalar: () => createInputTypeForScalar,
  createModelListResultType: () => createModelListResultType,
  createMutationListResultType: () => createMutationListResultType,
  createVersionedFields: () => createVersionedFields,
  createVersionedInputFields: () => createVersionedInputFields,
  getInputName: () => getInputName
});
init_cjs_shims();

// src/SchemaCRUDPlugin.ts
init_cjs_shims();
var import_path = require("path");
var import_fs = require("fs");
var import_dataloader = __toESM(require_dataloader());
var import_graphql_metadata = require("graphql-metadata");
var import_graphql_compose = require("graphql-compose");

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/index.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/error/GraphQLError.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/isObjectLike.mjs
init_cjs_shims();
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof6(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof6(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function isObjectLike(value) {
  return _typeof(value) == "object" && value !== null;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/symbols.mjs
init_cjs_shims();
var SYMBOL_ITERATOR = typeof Symbol === "function" && Symbol.iterator != null ? Symbol.iterator : "@@iterator";
var SYMBOL_ASYNC_ITERATOR = typeof Symbol === "function" && Symbol.asyncIterator != null ? Symbol.asyncIterator : "@@asyncIterator";
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/location.mjs
init_cjs_shims();
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return {
    line,
    column
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/printLocation.mjs
init_cjs_shims();
function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];
    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
      return ["", subLine];
    }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
  }
  return locationStr + printPrefixedLines([
    ["".concat(lineNum - 1), lines[lineIndex - 1]],
    ["".concat(lineNum), locationLine],
    ["", whitespace(columnNum - 1) + "^"],
    ["".concat(lineNum + 1), lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  var existingLines = lines.filter(function(_ref) {
    var _ = _ref[0], line = _ref[1];
    return line !== void 0;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function(_ref3) {
    var prefix = _ref3[0], line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? " | " + line : " |");
  }).join("\n");
}
function whitespace(len) {
  return Array(len + 1).join(" ");
}
function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/error/GraphQLError.mjs
function _typeof2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof6(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof2 = function _typeof6(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof2(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var GraphQLError = /* @__PURE__ */ function(_Error) {
  _inherits(GraphQLError2, _Error);
  var _super = _createSuper(GraphQLError2);
  function GraphQLError2(message, nodes, source, positions, path, originalError, extensions) {
    var _nodeLocations, _nodeLocations2, _nodeLocations3;
    var _this;
    _classCallCheck(this, GraphQLError2);
    _this = _super.call(this, message);
    _this.name = "GraphQLError";
    _this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0);
    var nodeLocations = [];
    for (var _i2 = 0, _ref3 = (_this$nodes = _this.nodes) !== null && _this$nodes !== void 0 ? _this$nodes : []; _i2 < _ref3.length; _i2++) {
      var _this$nodes;
      var _ref4 = _ref3[_i2];
      var loc = _ref4.loc;
      if (loc != null) {
        nodeLocations.push(loc);
      }
    }
    nodeLocations = undefinedIfEmpty(nodeLocations);
    _this.source = source !== null && source !== void 0 ? source : (_nodeLocations = nodeLocations) === null || _nodeLocations === void 0 ? void 0 : _nodeLocations[0].source;
    _this.positions = positions !== null && positions !== void 0 ? positions : (_nodeLocations2 = nodeLocations) === null || _nodeLocations2 === void 0 ? void 0 : _nodeLocations2.map(function(loc2) {
      return loc2.start;
    });
    _this.locations = positions && source ? positions.map(function(pos) {
      return getLocation(source, pos);
    }) : (_nodeLocations3 = nodeLocations) === null || _nodeLocations3 === void 0 ? void 0 : _nodeLocations3.map(function(loc2) {
      return getLocation(loc2.source, loc2.start);
    });
    _this.path = path !== null && path !== void 0 ? path : void 0;
    var originalExtensions = originalError === null || originalError === void 0 ? void 0 : originalError.extensions;
    if (extensions == null && isObjectLike(originalExtensions)) {
      _this.extensions = _objectSpread({}, originalExtensions);
    } else {
      _this.extensions = extensions !== null && extensions !== void 0 ? extensions : {};
    }
    Object.defineProperties(_assertThisInitialized(_this), {
      message: {
        enumerable: true
      },
      locations: {
        enumerable: _this.locations != null
      },
      path: {
        enumerable: _this.path != null
      },
      extensions: {
        enumerable: _this.extensions != null && Object.keys(_this.extensions).length > 0
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError2);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    return _this;
  }
  _createClass(GraphQLError2, [{
    key: "toString",
    value: function toString3() {
      return printError(this);
    }
  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "Object";
    }
  }]);
  return GraphQLError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error) {
  var output = error.message;
  if (error.nodes) {
    for (var _i4 = 0, _error$nodes2 = error.nodes; _i4 < _error$nodes2.length; _i4++) {
      var node = _error$nodes2[_i4];
      if (node.loc) {
        output += "\n\n" + printLocation(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i6 = 0, _error$locations2 = error.locations; _i6 < _error$locations2.length; _i6++) {
      var location = _error$locations2[_i6];
      output += "\n\n" + printSourceLocation(error.source, location);
    }
  }
  return output;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/kinds.mjs
init_cjs_shims();
var Kind = Object.freeze({
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  SCHEMA_EXTENSION: "SchemaExtension",
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
});

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/ast.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/defineInspect.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/invariant.mjs
init_cjs_shims();
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs
init_cjs_shims();
var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
var nodejsCustomInspectSymbol_default = nodejsCustomInspectSymbol;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/defineInspect.mjs
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === "function" || invariant(0);
  classObject.prototype.inspect = fn;
  if (nodejsCustomInspectSymbol_default) {
    classObject.prototype[nodejsCustomInspectSymbol_default] = fn;
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/ast.mjs
var Location = /* @__PURE__ */ function() {
  function Location2(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  var _proto = Location2.prototype;
  _proto.toJSON = function toJSON3() {
    return {
      start: this.start,
      end: this.end
    };
  };
  return Location2;
}();
defineInspect(Location);
var Token = /* @__PURE__ */ function() {
  function Token2(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
  var _proto2 = Token2.prototype;
  _proto2.toJSON = function toJSON3() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };
  return Token2;
}();
defineInspect(Token);
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/inspect.mjs
init_cjs_shims();
function _typeof3(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof3 = function _typeof6(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof3 = function _typeof6(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof3(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof3(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol_default)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/devAssert.mjs
init_cjs_shims();
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/instanceOf.mjs
init_cjs_shims();
function _typeof4(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof4 = function _typeof6(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof4 = function _typeof6(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof4(obj);
}
var instanceOf_default = process.env.NODE_ENV === "production" ? function instanceOf(value, constructor) {
  return value instanceof constructor;
} : function instanceOf2(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }
  if (_typeof4(value) === "object" && value !== null) {
    var _value$constructor;
    var className = constructor.prototype[Symbol.toStringTag];
    var valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;
    if (className === valueClassName) {
      var stringifiedValue = inspect(value);
      throw new Error("Cannot use ".concat(className, ' "').concat(stringifiedValue, '" from another module or realm.\n\nEnsure that there is only one instance of "graphql" in the node_modules\ndirectory. If different versions of "graphql" are the dependencies of other\nrelied on modules, use "resolutions" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate "graphql" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results.'));
    }
  }
  return false;
};

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/directiveLocation.mjs
init_cjs_shims();
var DirectiveLocation = Object.freeze({
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
});

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/blockString.mjs
init_cjs_shims();
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += "\n" + indentation;
  }
  result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result += "\n";
  }
  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/visitor.mjs
init_cjs_shims();
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
  InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }
    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/find.mjs
init_cjs_shims();
var find = Array.prototype.find ? function(list, predicate) {
  return Array.prototype.find.call(list, predicate);
} : function(list, predicate) {
  for (var _i2 = 0; _i2 < list.length; _i2++) {
    var value = list[_i2];
    if (predicate(value)) {
      return value;
    }
  }
};
var find_default = find;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/objectValues.mjs
init_cjs_shims();
var objectValues = Object.values || function(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};
var objectValues_default = objectValues;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/definition.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/objectEntries.mjs
init_cjs_shims();
var objectEntries = Object.entries || function(obj) {
  return Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
};
var objectEntries_default = objectEntries;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/keyMap.mjs
init_cjs_shims();
function keyMap(list, keyFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = item;
    return map;
  }, Object.create(null));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/mapValue.mjs
init_cjs_shims();
function mapValue(map, fn) {
  var result = Object.create(null);
  for (var _i2 = 0, _objectEntries2 = objectEntries_default(map); _i2 < _objectEntries2.length; _i2++) {
    var _ref2 = _objectEntries2[_i2];
    var _key = _ref2[0];
    var _value = _ref2[1];
    result[_key] = fn(_value, _key);
  }
  return result;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/toObjMap.mjs
init_cjs_shims();
function toObjMap(obj) {
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  var map = Object.create(null);
  for (var _i2 = 0, _objectEntries2 = objectEntries_default(obj); _i2 < _objectEntries2.length; _i2++) {
    var _ref2 = _objectEntries2[_i2];
    var key = _ref2[0];
    var value = _ref2[1];
    map[key] = value;
  }
  return map;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/keyValMap.mjs
init_cjs_shims();
function keyValMap(list, keyFn, valFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = valFn(item);
    return map;
  }, Object.create(null));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/didYouMean.mjs
init_cjs_shims();
var MAX_SUGGESTIONS = 5;
function didYouMean(firstArg, secondArg) {
  var _ref = typeof firstArg === "string" ? [firstArg, secondArg] : [void 0, firstArg], subMessage = _ref[0], suggestionsArg = _ref[1];
  var message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  var suggestions = suggestionsArg.map(function(x) {
    return '"'.concat(x, '"');
  });
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  var selected = suggestions.slice(0, MAX_SUGGESTIONS);
  var lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/identityFunc.mjs
init_cjs_shims();
function identityFunc(x) {
  return x;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/suggestionList.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/naturalCompare.mjs
init_cjs_shims();
function naturalCompare(aStr, bStr) {
  var aIdx = 0;
  var bIdx = 0;
  while (aIdx < aStr.length && bIdx < bStr.length) {
    var aChar = aStr.charCodeAt(aIdx);
    var bChar = bStr.charCodeAt(bIdx);
    if (isDigit(aChar) && isDigit(bChar)) {
      var aNum = 0;
      do {
        ++aIdx;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIdx);
      } while (isDigit(aChar) && aNum > 0);
      var bNum = 0;
      do {
        ++bIdx;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIdx);
      } while (isDigit(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIdx;
      ++bIdx;
    }
  }
  return aStr.length - bStr.length;
}
var DIGIT_0 = 48;
var DIGIT_9 = 57;
function isDigit(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/suggestionList.mjs
function suggestionList(input, options) {
  var optionsByDistance = Object.create(null);
  var lexicalDistance = new LexicalDistance(input);
  var threshold = Math.floor(input.length * 0.4) + 1;
  for (var _i2 = 0; _i2 < options.length; _i2++) {
    var option = options[_i2];
    var distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort(function(a, b) {
    var distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
var LexicalDistance = /* @__PURE__ */ function() {
  function LexicalDistance2(input) {
    this._input = input;
    this._inputLowerCase = input.toLowerCase();
    this._inputArray = stringToArray(this._inputLowerCase);
    this._rows = [new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0)];
  }
  var _proto = LexicalDistance2.prototype;
  _proto.measure = function measure(option, threshold) {
    if (this._input === option) {
      return 0;
    }
    var optionLowerCase = option.toLowerCase();
    if (this._inputLowerCase === optionLowerCase) {
      return 1;
    }
    var a = stringToArray(optionLowerCase);
    var b = this._inputArray;
    if (a.length < b.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }
    var aLength = a.length;
    var bLength = b.length;
    if (aLength - bLength > threshold) {
      return void 0;
    }
    var rows = this._rows;
    for (var j = 0; j <= bLength; j++) {
      rows[0][j] = j;
    }
    for (var i = 1; i <= aLength; i++) {
      var upRow = rows[(i - 1) % 3];
      var currentRow = rows[i % 3];
      var smallestCell = currentRow[0] = i;
      for (var _j = 1; _j <= bLength; _j++) {
        var cost = a[i - 1] === b[_j - 1] ? 0 : 1;
        var currentCell = Math.min(upRow[_j] + 1, currentRow[_j - 1] + 1, upRow[_j - 1] + cost);
        if (i > 1 && _j > 1 && a[i - 1] === b[_j - 2] && a[i - 2] === b[_j - 1]) {
          var doubleDiagonalCell = rows[(i - 2) % 3][_j - 2];
          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
        }
        if (currentCell < smallestCell) {
          smallestCell = currentCell;
        }
        currentRow[_j] = currentCell;
      }
      if (smallestCell > threshold) {
        return void 0;
      }
    }
    var distance = rows[aLength % 3][bLength];
    return distance <= threshold ? distance : void 0;
  };
  return LexicalDistance2;
}();
function stringToArray(str) {
  var strLength = str.length;
  var array = new Array(strLength);
  for (var i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/printer.mjs
init_cjs_shims();
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return "$" + node.name;
  },
  Document: function Document(node) {
    return join(node.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
    var directives = join(node.directives, " ");
    var selectionSet = node.selectionSet;
    return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
    return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
    var prefix = wrap("", alias, ": ") + name;
    var argsLine = prefix + wrap("(", join(args, ", "), ")");
    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
    }
    return join([argsLine, join(directives, " "), selectionSet], " ");
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name, value = _ref4.value;
    return name + ": " + value;
  },
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name, directives = _ref5.directives;
    return "..." + name + wrap(" ", join(directives, " "));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
    return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
    return "fragment ".concat(name).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet;
  },
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value, isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? "true" : "false";
  },
  NullValue: function NullValue() {
    return "null";
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return "[" + join(values, ", ") + "]";
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields7 = _ref14.fields;
    return "{" + join(fields7, ", ") + "}";
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name, value = _ref15.value;
    return name + ": " + value;
  },
  Directive: function Directive(_ref16) {
    var name = _ref16.name, args = _ref16.arguments;
    return "@" + name + wrap("(", join(args, ", "), ")");
  },
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return "[" + type + "]";
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + "!";
  },
  SchemaDefinition: addDescription(function(_ref20) {
    var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
    return join(["schema", join(directives, " "), block(operationTypes)], " ");
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation, type = _ref21.type;
    return operation + ": " + type;
  },
  ScalarTypeDefinition: addDescription(function(_ref22) {
    var name = _ref22.name, directives = _ref22.directives;
    return join(["scalar", name, join(directives, " ")], " ");
  }),
  ObjectTypeDefinition: addDescription(function(_ref23) {
    var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields7 = _ref23.fields;
    return join(["type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  }),
  FieldDefinition: addDescription(function(_ref24) {
    var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
  }),
  InputValueDefinition: addDescription(function(_ref25) {
    var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
    return join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
  }),
  InterfaceTypeDefinition: addDescription(function(_ref26) {
    var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields7 = _ref26.fields;
    return join(["interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  }),
  UnionTypeDefinition: addDescription(function(_ref27) {
    var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
    return join(["union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  }),
  EnumTypeDefinition: addDescription(function(_ref28) {
    var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
    return join(["enum", name, join(directives, " "), block(values)], " ");
  }),
  EnumValueDefinition: addDescription(function(_ref29) {
    var name = _ref29.name, directives = _ref29.directives;
    return join([name, join(directives, " ")], " ");
  }),
  InputObjectTypeDefinition: addDescription(function(_ref30) {
    var name = _ref30.name, directives = _ref30.directives, fields7 = _ref30.fields;
    return join(["input", name, join(directives, " "), block(fields7)], " ");
  }),
  DirectiveDefinition: addDescription(function(_ref31) {
    var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
    return "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
    return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name, directives = _ref33.directives;
    return join(["extend scalar", name, join(directives, " ")], " ");
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields7 = _ref34.fields;
    return join(["extend type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields7 = _ref35.fields;
    return join(["extend interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
    return join(["extend union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
    return join(["extend enum", name, join(directives, " "), block(values)], " ");
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name, directives = _ref38.directives, fields7 = _ref38.fields;
    return join(["extend input", name, join(directives, " "), block(fields7)], " ");
  }
};
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/valueFromASTUntyped.mjs
init_cjs_shims();
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(function(node) {
        return valueFromASTUntyped(node, variables);
      });
    case Kind.OBJECT:
      return keyValMap(valueNode.fields, function(field) {
        return field.name.value;
      }, function(field) {
        return valueFromASTUntyped(field.value, variables);
      });
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
  invariant(0, "Unexpected value node: " + inspect(valueNode));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/definition.mjs
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties2(Constructor, staticProps);
  return Constructor;
}
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function assertType(type) {
  if (!isType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL type."));
  }
  return type;
}
function isScalarType(type) {
  return instanceOf_default(type, GraphQLScalarType);
}
function isObjectType(type) {
  return instanceOf_default(type, GraphQLObjectType);
}
function isInterfaceType(type) {
  return instanceOf_default(type, GraphQLInterfaceType);
}
function isUnionType(type) {
  return instanceOf_default(type, GraphQLUnionType);
}
function isEnumType(type) {
  return instanceOf_default(type, GraphQLEnumType);
}
function isInputObjectType(type) {
  return instanceOf_default(type, GraphQLInputObjectType);
}
function isListType(type) {
  return instanceOf_default(type, GraphQLList);
}
function isNonNullType(type) {
  return instanceOf_default(type, GraphQLNonNull);
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function GraphQLList(ofType) {
  if (this instanceof GraphQLList) {
    this.ofType = assertType(ofType);
  } else {
    return new GraphQLList(ofType);
  }
}
GraphQLList.prototype.toString = function toString() {
  return "[" + String(this.ofType) + "]";
};
GraphQLList.prototype.toJSON = function toJSON() {
  return this.toString();
};
Object.defineProperty(GraphQLList.prototype, SYMBOL_TO_STRING_TAG, {
  get: function get() {
    return "GraphQLList";
  }
});
defineInspect(GraphQLList);
function GraphQLNonNull(ofType) {
  if (this instanceof GraphQLNonNull) {
    this.ofType = assertNullableType(ofType);
  } else {
    return new GraphQLNonNull(ofType);
  }
}
GraphQLNonNull.prototype.toString = function toString2() {
  return String(this.ofType) + "!";
};
GraphQLNonNull.prototype.toJSON = function toJSON2() {
  return this.toString();
};
Object.defineProperty(GraphQLNonNull.prototype, SYMBOL_TO_STRING_TAG, {
  get: function get2() {
    return "GraphQLNonNull";
  }
});
defineInspect(GraphQLNonNull);
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function assertNullableType(type) {
  if (!isNullableType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL nullable type."));
  }
  return type;
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function getNamedType(type) {
  if (type) {
    var unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function undefineIfEmpty(arr) {
  return arr && arr.length > 0 ? arr : void 0;
}
var GraphQLScalarType = /* @__PURE__ */ function() {
  function GraphQLScalarType4(config) {
    var _config$parseValue, _config$serialize, _config$parseLiteral;
    var parseValue = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
    this.name = config.name;
    this.description = config.description;
    this.specifiedByUrl = config.specifiedByUrl;
    this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
    this.parseValue = parseValue;
    this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : function(node, variables) {
      return parseValue(valueFromASTUntyped(node, variables));
    };
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.specifiedByUrl == null || typeof config.specifiedByUrl === "string" || devAssert(0, "".concat(this.name, ' must provide "specifiedByUrl" as a string, ') + "but got: ".concat(inspect(config.specifiedByUrl), "."));
    config.serialize == null || typeof config.serialize === "function" || devAssert(0, "".concat(this.name, ' must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.'));
    if (config.parseLiteral) {
      typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(0, "".concat(this.name, ' must provide both "parseValue" and "parseLiteral" functions.'));
    }
  }
  var _proto = GraphQLScalarType4.prototype;
  _proto.toConfig = function toConfig() {
    var _this$extensionASTNod;
    return {
      name: this.name,
      description: this.description,
      specifiedByUrl: this.specifiedByUrl,
      serialize: this.serialize,
      parseValue: this.parseValue,
      parseLiteral: this.parseLiteral,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : []
    };
  };
  _proto.toString = function toString3() {
    return this.name;
  };
  _proto.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLScalarType4, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLScalarType";
    }
  }]);
  return GraphQLScalarType4;
}();
defineInspect(GraphQLScalarType);
var GraphQLObjectType = /* @__PURE__ */ function() {
  function GraphQLObjectType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.isTypeOf = config.isTypeOf;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineFieldMap.bind(void 0, config);
    this._interfaces = defineInterfaces.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(0, "".concat(this.name, ' must provide "isTypeOf" as a function, ') + "but got: ".concat(inspect(config.isTypeOf), "."));
  }
  var _proto2 = GraphQLObjectType2.prototype;
  _proto2.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto2.getInterfaces = function getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  };
  _proto2.toConfig = function toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      isTypeOf: this.isTypeOf,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes || []
    };
  };
  _proto2.toString = function toString3() {
    return this.name;
  };
  _proto2.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLObjectType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLObjectType";
    }
  }]);
  return GraphQLObjectType2;
}();
defineInspect(GraphQLObjectType);
function defineInterfaces(config) {
  var _resolveThunk;
  var interfaces = (_resolveThunk = resolveThunk(config.interfaces)) !== null && _resolveThunk !== void 0 ? _resolveThunk : [];
  Array.isArray(interfaces) || devAssert(0, "".concat(config.name, " interfaces must be an Array or a function which returns an Array."));
  return interfaces;
}
function defineFieldMap(config) {
  var fieldMap = resolveThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
  return mapValue(fieldMap, function(fieldConfig, fieldName) {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field config must be an object."));
    !("isDeprecated" in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, ' should provide "deprecationReason" instead of "isDeprecated".'));
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field resolver must be a function if ") + "provided, but got: ".concat(inspect(fieldConfig.resolve), "."));
    var argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " args must be an object with argument names as keys."));
    var args = objectEntries_default(argsConfig).map(function(_ref) {
      var argName = _ref[0], argConfig = _ref[1];
      return {
        name: argName,
        description: argConfig.description,
        type: argConfig.type,
        defaultValue: argConfig.defaultValue,
        deprecationReason: argConfig.deprecationReason,
        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
        astNode: argConfig.astNode
      };
    });
    return {
      name: fieldName,
      description: fieldConfig.description,
      type: fieldConfig.type,
      args,
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      isDeprecated: fieldConfig.deprecationReason != null,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields7) {
  return mapValue(fields7, function(field) {
    return {
      description: field.description,
      type: field.type,
      args: argsToArgsConfig(field.args),
      resolve: field.resolve,
      subscribe: field.subscribe,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode
    };
  });
}
function argsToArgsConfig(args) {
  return keyValMap(args, function(arg) {
    return arg.name;
  }, function(arg) {
    return {
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    };
  });
}
var GraphQLInterfaceType = /* @__PURE__ */ function() {
  function GraphQLInterfaceType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineFieldMap.bind(void 0, config);
    this._interfaces = defineInterfaces.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(0, "".concat(this.name, ' must provide "resolveType" as a function, ') + "but got: ".concat(inspect(config.resolveType), "."));
  }
  var _proto3 = GraphQLInterfaceType2.prototype;
  _proto3.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto3.getInterfaces = function getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  };
  _proto3.toConfig = function toConfig() {
    var _this$extensionASTNod2;
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod2 = this.extensionASTNodes) !== null && _this$extensionASTNod2 !== void 0 ? _this$extensionASTNod2 : []
    };
  };
  _proto3.toString = function toString3() {
    return this.name;
  };
  _proto3.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLInterfaceType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLInterfaceType";
    }
  }]);
  return GraphQLInterfaceType2;
}();
defineInspect(GraphQLInterfaceType);
var GraphQLUnionType = /* @__PURE__ */ function() {
  function GraphQLUnionType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._types = defineTypes.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(0, "".concat(this.name, ' must provide "resolveType" as a function, ') + "but got: ".concat(inspect(config.resolveType), "."));
  }
  var _proto4 = GraphQLUnionType2.prototype;
  _proto4.getTypes = function getTypes() {
    if (typeof this._types === "function") {
      this._types = this._types();
    }
    return this._types;
  };
  _proto4.toConfig = function toConfig() {
    var _this$extensionASTNod3;
    return {
      name: this.name,
      description: this.description,
      types: this.getTypes(),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod3 = this.extensionASTNodes) !== null && _this$extensionASTNod3 !== void 0 ? _this$extensionASTNod3 : []
    };
  };
  _proto4.toString = function toString3() {
    return this.name;
  };
  _proto4.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLUnionType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLUnionType";
    }
  }]);
  return GraphQLUnionType2;
}();
defineInspect(GraphQLUnionType);
function defineTypes(config) {
  var types = resolveThunk(config.types);
  Array.isArray(types) || devAssert(0, "Must provide Array of types or a function which returns such an array for Union ".concat(config.name, "."));
  return types;
}
var GraphQLEnumType = /* @__PURE__ */ function() {
  function GraphQLEnumType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._values = defineEnumValues(this.name, config.values);
    this._valueLookup = new Map(this._values.map(function(enumValue) {
      return [enumValue.value, enumValue];
    }));
    this._nameLookup = keyMap(this._values, function(value) {
      return value.name;
    });
    typeof config.name === "string" || devAssert(0, "Must provide name.");
  }
  var _proto5 = GraphQLEnumType2.prototype;
  _proto5.getValues = function getValues() {
    return this._values;
  };
  _proto5.getValue = function getValue(name) {
    return this._nameLookup[name];
  };
  _proto5.serialize = function serialize(outputValue) {
    var enumValue = this._valueLookup.get(outputValue);
    if (enumValue === void 0) {
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent value: ').concat(inspect(outputValue)));
    }
    return enumValue.name;
  };
  _proto5.parseValue = function parseValue(inputValue) {
    if (typeof inputValue !== "string") {
      var valueStr = inspect(inputValue);
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent non-string value: ').concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr));
    }
    var enumValue = this.getValue(inputValue);
    if (enumValue == null) {
      throw new GraphQLError('Value "'.concat(inputValue, '" does not exist in "').concat(this.name, '" enum.') + didYouMeanEnumValue(this, inputValue));
    }
    return enumValue.value;
  };
  _proto5.parseLiteral = function parseLiteral6(valueNode, _variables) {
    if (valueNode.kind !== Kind.ENUM) {
      var valueStr = print(valueNode);
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent non-enum value: ').concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr), valueNode);
    }
    var enumValue = this.getValue(valueNode.value);
    if (enumValue == null) {
      var _valueStr = print(valueNode);
      throw new GraphQLError('Value "'.concat(_valueStr, '" does not exist in "').concat(this.name, '" enum.') + didYouMeanEnumValue(this, _valueStr), valueNode);
    }
    return enumValue.value;
  };
  _proto5.toConfig = function toConfig() {
    var _this$extensionASTNod4;
    var values = keyValMap(this.getValues(), function(value) {
      return value.name;
    }, function(value) {
      return {
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode
      };
    });
    return {
      name: this.name,
      description: this.description,
      values,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod4 = this.extensionASTNodes) !== null && _this$extensionASTNod4 !== void 0 ? _this$extensionASTNod4 : []
    };
  };
  _proto5.toString = function toString3() {
    return this.name;
  };
  _proto5.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLEnumType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLEnumType";
    }
  }]);
  return GraphQLEnumType2;
}();
defineInspect(GraphQLEnumType);
function didYouMeanEnumValue(enumType, unknownValueStr) {
  var allNames = enumType.getValues().map(function(value) {
    return value.name;
  });
  var suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(0, "".concat(typeName, " values must be an object with value names as keys."));
  return objectEntries_default(valueMap).map(function(_ref2) {
    var valueName = _ref2[0], valueConfig = _ref2[1];
    isPlainObj(valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, ' must refer to an object with a "value" key ') + "representing an internal value but got: ".concat(inspect(valueConfig), "."));
    !("isDeprecated" in valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, ' should provide "deprecationReason" instead of "isDeprecated".'));
    return {
      name: valueName,
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      isDeprecated: valueConfig.deprecationReason != null,
      deprecationReason: valueConfig.deprecationReason,
      extensions: valueConfig.extensions && toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
var GraphQLInputObjectType = /* @__PURE__ */ function() {
  function GraphQLInputObjectType3(config) {
    this.name = config.name;
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineInputFieldMap.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
  }
  var _proto6 = GraphQLInputObjectType3.prototype;
  _proto6.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto6.toConfig = function toConfig() {
    var _this$extensionASTNod5;
    var fields7 = mapValue(this.getFields(), function(field) {
      return {
        description: field.description,
        type: field.type,
        defaultValue: field.defaultValue,
        deprecationReason: field.deprecationReason,
        extensions: field.extensions,
        astNode: field.astNode
      };
    });
    return {
      name: this.name,
      description: this.description,
      fields: fields7,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod5 = this.extensionASTNodes) !== null && _this$extensionASTNod5 !== void 0 ? _this$extensionASTNod5 : []
    };
  };
  _proto6.toString = function toString3() {
    return this.name;
  };
  _proto6.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass2(GraphQLInputObjectType3, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLInputObjectType";
    }
  }]);
  return GraphQLInputObjectType3;
}();
defineInspect(GraphQLInputObjectType);
function defineInputFieldMap(config) {
  var fieldMap = resolveThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
  return mapValue(fieldMap, function(fieldConfig, fieldName) {
    !("resolve" in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field has a resolve property, but Input Types cannot define resolvers."));
    return {
      name: fieldName,
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/schema.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/arrayFrom.mjs
init_cjs_shims();
var arrayFrom = Array.from || function(obj, mapFn, thisArg) {
  if (obj == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  var iteratorMethod = obj[SYMBOL_ITERATOR];
  if (typeof iteratorMethod === "function") {
    var iterator = iteratorMethod.call(obj);
    var result = [];
    var step;
    for (var i = 0; !(step = iterator.next()).done; ++i) {
      result.push(mapFn.call(thisArg, step.value, i));
      if (i > 9999999) {
        throw new TypeError("Near-infinite iteration.");
      }
    }
    return result;
  }
  var length = obj.length;
  if (typeof length === "number" && length >= 0 && length % 1 === 0) {
    var _result = [];
    for (var _i = 0; _i < length; ++_i) {
      if (Object.prototype.hasOwnProperty.call(obj, _i)) {
        _result.push(mapFn.call(thisArg, obj[_i], _i));
      }
    }
    return _result;
  }
  return [];
};
var arrayFrom_default = arrayFrom;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/introspection.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/astFromValue.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/isFinite.mjs
init_cjs_shims();
var isFinitePolyfill = Number.isFinite || function(value) {
  return typeof value === "number" && isFinite(value);
};
var isFinite_default = isFinitePolyfill;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/safeArrayFrom.mjs
init_cjs_shims();
function _typeof5(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof5 = function _typeof6(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof5 = function _typeof6(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof5(obj);
}
function safeArrayFrom(collection) {
  var mapFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function(item) {
    return item;
  };
  if (collection == null || _typeof5(collection) !== "object") {
    return null;
  }
  if (Array.isArray(collection)) {
    return collection.map(mapFn);
  }
  var iteratorMethod = collection[SYMBOL_ITERATOR];
  if (typeof iteratorMethod === "function") {
    var iterator = iteratorMethod.call(collection);
    var result = [];
    var step;
    for (var i = 0; !(step = iterator.next()).done; ++i) {
      result.push(mapFn(step.value, i));
    }
    return result;
  }
  var length = collection.length;
  if (typeof length === "number" && length >= 0 && length % 1 === 0) {
    var _result = [];
    for (var _i = 0; _i < length; ++_i) {
      if (!Object.prototype.hasOwnProperty.call(collection, _i)) {
        return null;
      }
      _result.push(mapFn(collection[String(_i)], _i));
    }
    return _result;
  }
  return null;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/scalars.mjs
init_cjs_shims();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/isInteger.mjs
init_cjs_shims();
var isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
var isInteger_default = isInteger;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/scalars.mjs
var MAX_INT = 2147483647;
var MIN_INT = -2147483648;
function serializeInt(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue ? 1 : 0;
  }
  var num = coercedValue;
  if (typeof coercedValue === "string" && coercedValue !== "") {
    num = Number(coercedValue);
  }
  if (!isInteger_default(num)) {
    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(coercedValue)));
  }
  if (num > MAX_INT || num < MIN_INT) {
    throw new GraphQLError("Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue));
  }
  return num;
}
function coerceInt(inputValue) {
  if (!isInteger_default(inputValue)) {
    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(inputValue)));
  }
  if (inputValue > MAX_INT || inputValue < MIN_INT) {
    throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(inputValue));
  }
  return inputValue;
}
var GraphQLInt = new GraphQLScalarType({
  name: "Int",
  description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
  serialize: serializeInt,
  parseValue: coerceInt,
  parseLiteral: function parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw new GraphQLError("Int cannot represent non-integer value: ".concat(print(valueNode)), valueNode);
    }
    var num = parseInt(valueNode.value, 10);
    if (num > MAX_INT || num < MIN_INT) {
      throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(valueNode.value), valueNode);
    }
    return num;
  }
});
function serializeFloat(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue ? 1 : 0;
  }
  var num = coercedValue;
  if (typeof coercedValue === "string" && coercedValue !== "") {
    num = Number(coercedValue);
  }
  if (!isFinite_default(num)) {
    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(coercedValue)));
  }
  return num;
}
function coerceFloat(inputValue) {
  if (!isFinite_default(inputValue)) {
    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLFloat = new GraphQLScalarType({
  name: "Float",
  description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
  serialize: serializeFloat,
  parseValue: coerceFloat,
  parseLiteral: function parseLiteral2(valueNode) {
    if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
      throw new GraphQLError("Float cannot represent non numeric value: ".concat(print(valueNode)), valueNode);
    }
    return parseFloat(valueNode.value);
  }
});
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      var valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
function serializeString(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "string") {
    return coercedValue;
  }
  if (typeof coercedValue === "boolean") {
    return coercedValue ? "true" : "false";
  }
  if (isFinite_default(coercedValue)) {
    return coercedValue.toString();
  }
  throw new GraphQLError("String cannot represent value: ".concat(inspect(outputValue)));
}
function coerceString(inputValue) {
  if (typeof inputValue !== "string") {
    throw new GraphQLError("String cannot represent a non string value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLString = new GraphQLScalarType({
  name: "String",
  description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
  serialize: serializeString,
  parseValue: coerceString,
  parseLiteral: function parseLiteral3(valueNode) {
    if (valueNode.kind !== Kind.STRING) {
      throw new GraphQLError("String cannot represent a non string value: ".concat(print(valueNode)), valueNode);
    }
    return valueNode.value;
  }
});
function serializeBoolean(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue;
  }
  if (isFinite_default(coercedValue)) {
    return coercedValue !== 0;
  }
  throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(coercedValue)));
}
function coerceBoolean(inputValue) {
  if (typeof inputValue !== "boolean") {
    throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLBoolean = new GraphQLScalarType({
  name: "Boolean",
  description: "The `Boolean` scalar type represents `true` or `false`.",
  serialize: serializeBoolean,
  parseValue: coerceBoolean,
  parseLiteral: function parseLiteral4(valueNode) {
    if (valueNode.kind !== Kind.BOOLEAN) {
      throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(print(valueNode)), valueNode);
    }
    return valueNode.value;
  }
});
function serializeID(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "string") {
    return coercedValue;
  }
  if (isInteger_default(coercedValue)) {
    return String(coercedValue);
  }
  throw new GraphQLError("ID cannot represent value: ".concat(inspect(outputValue)));
}
function coerceID(inputValue) {
  if (typeof inputValue === "string") {
    return inputValue;
  }
  if (isInteger_default(inputValue)) {
    return inputValue.toString();
  }
  throw new GraphQLError("ID cannot represent value: ".concat(inspect(inputValue)));
}
var GraphQLID = new GraphQLScalarType({
  name: "ID",
  description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
  serialize: serializeID,
  parseValue: coerceID,
  parseLiteral: function parseLiteral5(valueNode) {
    if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
      throw new GraphQLError("ID cannot represent a non-string and non-integer value: " + print(valueNode), valueNode);
    }
    return valueNode.value;
  }
});
var specifiedScalarTypes = Object.freeze([GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLID]);
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(function(_ref) {
    var name = _ref.name;
    return type.name === name;
  });
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/astFromValue.mjs
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    var astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    var itemType = type.ofType;
    var items = safeArrayFrom(value);
    if (items != null) {
      var valuesNodes = [];
      for (var _i2 = 0; _i2 < items.length; _i2++) {
        var item = items[_i2];
        var itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    var fieldNodes = [];
    for (var _i4 = 0, _objectValues2 = objectValues_default(type.getFields()); _i4 < _objectValues2.length; _i4++) {
      var field = _objectValues2[_i4];
      var fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    var serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && isFinite_default(serialized)) {
      var stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError("Cannot convert value to AST: ".concat(inspect(serialized), "."));
  }
  invariant(0, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/introspection.mjs
var __Schema = new GraphQLObjectType({
  name: "__Schema",
  description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
  fields: function fields() {
    return {
      description: {
        type: GraphQLString,
        resolve: function resolve5(schema) {
          return schema.description;
        }
      },
      types: {
        description: "A list of all types supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
        resolve: function resolve5(schema) {
          return objectValues_default(schema.getTypeMap());
        }
      },
      queryType: {
        description: "The type that query operations will be rooted at.",
        type: new GraphQLNonNull(__Type),
        resolve: function resolve5(schema) {
          return schema.getQueryType();
        }
      },
      mutationType: {
        description: "If this server supports mutation, the type that mutation operations will be rooted at.",
        type: __Type,
        resolve: function resolve5(schema) {
          return schema.getMutationType();
        }
      },
      subscriptionType: {
        description: "If this server support subscription, the type that subscription operations will be rooted at.",
        type: __Type,
        resolve: function resolve5(schema) {
          return schema.getSubscriptionType();
        }
      },
      directives: {
        description: "A list of all directives supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Directive))),
        resolve: function resolve5(schema) {
          return schema.getDirectives();
        }
      }
    };
  }
});
var __Directive = new GraphQLObjectType({
  name: "__Directive",
  description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: function fields2() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve5(directive) {
          return directive.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve5(directive) {
          return directive.description;
        }
      },
      isRepeatable: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve5(directive) {
          return directive.isRepeatable;
        }
      },
      locations: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__DirectiveLocation))),
        resolve: function resolve5(directive) {
          return directive.locations;
        }
      },
      args: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve5(field, _ref) {
          var includeDeprecated = _ref.includeDeprecated;
          return includeDeprecated ? field.args : field.args.filter(function(arg) {
            return arg.deprecationReason == null;
          });
        }
      }
    };
  }
});
var __DirectiveLocation = new GraphQLEnumType({
  name: "__DirectiveLocation",
  description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
  values: {
    QUERY: {
      value: DirectiveLocation.QUERY,
      description: "Location adjacent to a query operation."
    },
    MUTATION: {
      value: DirectiveLocation.MUTATION,
      description: "Location adjacent to a mutation operation."
    },
    SUBSCRIPTION: {
      value: DirectiveLocation.SUBSCRIPTION,
      description: "Location adjacent to a subscription operation."
    },
    FIELD: {
      value: DirectiveLocation.FIELD,
      description: "Location adjacent to a field."
    },
    FRAGMENT_DEFINITION: {
      value: DirectiveLocation.FRAGMENT_DEFINITION,
      description: "Location adjacent to a fragment definition."
    },
    FRAGMENT_SPREAD: {
      value: DirectiveLocation.FRAGMENT_SPREAD,
      description: "Location adjacent to a fragment spread."
    },
    INLINE_FRAGMENT: {
      value: DirectiveLocation.INLINE_FRAGMENT,
      description: "Location adjacent to an inline fragment."
    },
    VARIABLE_DEFINITION: {
      value: DirectiveLocation.VARIABLE_DEFINITION,
      description: "Location adjacent to a variable definition."
    },
    SCHEMA: {
      value: DirectiveLocation.SCHEMA,
      description: "Location adjacent to a schema definition."
    },
    SCALAR: {
      value: DirectiveLocation.SCALAR,
      description: "Location adjacent to a scalar definition."
    },
    OBJECT: {
      value: DirectiveLocation.OBJECT,
      description: "Location adjacent to an object type definition."
    },
    FIELD_DEFINITION: {
      value: DirectiveLocation.FIELD_DEFINITION,
      description: "Location adjacent to a field definition."
    },
    ARGUMENT_DEFINITION: {
      value: DirectiveLocation.ARGUMENT_DEFINITION,
      description: "Location adjacent to an argument definition."
    },
    INTERFACE: {
      value: DirectiveLocation.INTERFACE,
      description: "Location adjacent to an interface definition."
    },
    UNION: {
      value: DirectiveLocation.UNION,
      description: "Location adjacent to a union definition."
    },
    ENUM: {
      value: DirectiveLocation.ENUM,
      description: "Location adjacent to an enum definition."
    },
    ENUM_VALUE: {
      value: DirectiveLocation.ENUM_VALUE,
      description: "Location adjacent to an enum value definition."
    },
    INPUT_OBJECT: {
      value: DirectiveLocation.INPUT_OBJECT,
      description: "Location adjacent to an input object type definition."
    },
    INPUT_FIELD_DEFINITION: {
      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: "Location adjacent to an input object field definition."
    }
  }
});
var __Type = new GraphQLObjectType({
  name: "__Type",
  description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
  fields: function fields3() {
    return {
      kind: {
        type: new GraphQLNonNull(__TypeKind),
        resolve: function resolve5(type) {
          if (isScalarType(type)) {
            return TypeKind.SCALAR;
          }
          if (isObjectType(type)) {
            return TypeKind.OBJECT;
          }
          if (isInterfaceType(type)) {
            return TypeKind.INTERFACE;
          }
          if (isUnionType(type)) {
            return TypeKind.UNION;
          }
          if (isEnumType(type)) {
            return TypeKind.ENUM;
          }
          if (isInputObjectType(type)) {
            return TypeKind.INPUT_OBJECT;
          }
          if (isListType(type)) {
            return TypeKind.LIST;
          }
          if (isNonNullType(type)) {
            return TypeKind.NON_NULL;
          }
          invariant(0, 'Unexpected type: "'.concat(inspect(type), '".'));
        }
      },
      name: {
        type: GraphQLString,
        resolve: function resolve5(type) {
          return type.name !== void 0 ? type.name : void 0;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve5(type) {
          return type.description !== void 0 ? type.description : void 0;
        }
      },
      specifiedByUrl: {
        type: GraphQLString,
        resolve: function resolve5(obj) {
          return obj.specifiedByUrl !== void 0 ? obj.specifiedByUrl : void 0;
        }
      },
      fields: {
        type: new GraphQLList(new GraphQLNonNull(__Field)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve5(type, _ref2) {
          var includeDeprecated = _ref2.includeDeprecated;
          if (isObjectType(type) || isInterfaceType(type)) {
            var fields7 = objectValues_default(type.getFields());
            return includeDeprecated ? fields7 : fields7.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      interfaces: {
        type: new GraphQLList(new GraphQLNonNull(__Type)),
        resolve: function resolve5(type) {
          if (isObjectType(type) || isInterfaceType(type)) {
            return type.getInterfaces();
          }
        }
      },
      possibleTypes: {
        type: new GraphQLList(new GraphQLNonNull(__Type)),
        resolve: function resolve5(type, _args, _context, _ref3) {
          var schema = _ref3.schema;
          if (isAbstractType(type)) {
            return schema.getPossibleTypes(type);
          }
        }
      },
      enumValues: {
        type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve5(type, _ref4) {
          var includeDeprecated = _ref4.includeDeprecated;
          if (isEnumType(type)) {
            var values = type.getValues();
            return includeDeprecated ? values : values.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      inputFields: {
        type: new GraphQLList(new GraphQLNonNull(__InputValue)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve5(type, _ref5) {
          var includeDeprecated = _ref5.includeDeprecated;
          if (isInputObjectType(type)) {
            var values = objectValues_default(type.getFields());
            return includeDeprecated ? values : values.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      ofType: {
        type: __Type,
        resolve: function resolve5(type) {
          return type.ofType !== void 0 ? type.ofType : void 0;
        }
      }
    };
  }
});
var __Field = new GraphQLObjectType({
  name: "__Field",
  description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
  fields: function fields4() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve5(field) {
          return field.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve5(field) {
          return field.description;
        }
      },
      args: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve5(field, _ref6) {
          var includeDeprecated = _ref6.includeDeprecated;
          return includeDeprecated ? field.args : field.args.filter(function(arg) {
            return arg.deprecationReason == null;
          });
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve5(field) {
          return field.type;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve5(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve5(field) {
          return field.deprecationReason;
        }
      }
    };
  }
});
var __InputValue = new GraphQLObjectType({
  name: "__InputValue",
  description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
  fields: function fields5() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve5(inputValue) {
          return inputValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve5(inputValue) {
          return inputValue.description;
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve5(inputValue) {
          return inputValue.type;
        }
      },
      defaultValue: {
        type: GraphQLString,
        description: "A GraphQL-formatted string representing the default value for this input value.",
        resolve: function resolve5(inputValue) {
          var type = inputValue.type, defaultValue = inputValue.defaultValue;
          var valueAST = astFromValue(defaultValue, type);
          return valueAST ? print(valueAST) : null;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve5(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve5(obj) {
          return obj.deprecationReason;
        }
      }
    };
  }
});
var __EnumValue = new GraphQLObjectType({
  name: "__EnumValue",
  description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
  fields: function fields6() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve5(enumValue) {
          return enumValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve5(enumValue) {
          return enumValue.description;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve5(enumValue) {
          return enumValue.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve5(enumValue) {
          return enumValue.deprecationReason;
        }
      }
    };
  }
});
var TypeKind = Object.freeze({
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  INPUT_OBJECT: "INPUT_OBJECT",
  LIST: "LIST",
  NON_NULL: "NON_NULL"
});
var __TypeKind = new GraphQLEnumType({
  name: "__TypeKind",
  description: "An enum describing what kind of type a given `__Type` is.",
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: "Indicates this type is a scalar."
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
    },
    UNION: {
      value: TypeKind.UNION,
      description: "Indicates this type is a union. `possibleTypes` is a valid field."
    },
    ENUM: {
      value: TypeKind.ENUM,
      description: "Indicates this type is an enum. `enumValues` is a valid field."
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description: "Indicates this type is an input object. `inputFields` is a valid field."
    },
    LIST: {
      value: TypeKind.LIST,
      description: "Indicates this type is a list. `ofType` is a valid field."
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description: "Indicates this type is a non-null. `ofType` is a valid field."
    }
  }
});
var SchemaMetaFieldDef = {
  name: "__schema",
  type: new GraphQLNonNull(__Schema),
  description: "Access the current type schema of this server.",
  args: [],
  resolve: function resolve(_source, _args, _context, _ref7) {
    var schema = _ref7.schema;
    return schema;
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var TypeMetaFieldDef = {
  name: "__type",
  type: __Type,
  description: "Request the type information of a single type.",
  args: [{
    name: "name",
    description: void 0,
    type: new GraphQLNonNull(GraphQLString),
    defaultValue: void 0,
    deprecationReason: void 0,
    extensions: void 0,
    astNode: void 0
  }],
  resolve: function resolve2(_source, _ref8, _context, _ref9) {
    var name = _ref8.name;
    var schema = _ref9.schema;
    return schema.getType(name);
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var TypeNameMetaFieldDef = {
  name: "__typename",
  type: new GraphQLNonNull(GraphQLString),
  description: "The name of the current Object type at runtime.",
  args: [],
  resolve: function resolve3(_source, _args, _context, _ref10) {
    var parentType = _ref10.parentType;
    return parentType.name;
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var introspectionTypes = Object.freeze([__Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, __TypeKind]);

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/directives.mjs
init_cjs_shims();
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties3(Constructor, staticProps);
  return Constructor;
}
function isDirective(directive) {
  return instanceOf_default(directive, GraphQLDirective);
}
var GraphQLDirective = /* @__PURE__ */ function() {
  function GraphQLDirective2(config) {
    var _config$isRepeatable, _config$args;
    this.name = config.name;
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    config.name || devAssert(0, "Directive must be named.");
    Array.isArray(config.locations) || devAssert(0, "@".concat(config.name, " locations must be an Array."));
    var args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
    isObjectLike(args) && !Array.isArray(args) || devAssert(0, "@".concat(config.name, " args must be an object with argument names as keys."));
    this.args = objectEntries_default(args).map(function(_ref) {
      var argName = _ref[0], argConfig = _ref[1];
      return {
        name: argName,
        description: argConfig.description,
        type: argConfig.type,
        defaultValue: argConfig.defaultValue,
        deprecationReason: argConfig.deprecationReason,
        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
        astNode: argConfig.astNode
      };
    });
  }
  var _proto = GraphQLDirective2.prototype;
  _proto.toConfig = function toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: argsToArgsConfig(this.args),
      isRepeatable: this.isRepeatable,
      extensions: this.extensions,
      astNode: this.astNode
    };
  };
  _proto.toString = function toString3() {
    return "@" + this.name;
  };
  _proto.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass3(GraphQLDirective2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLDirective";
    }
  }]);
  return GraphQLDirective2;
}();
defineInspect(GraphQLDirective);
var GraphQLIncludeDirective = new GraphQLDirective({
  name: "include",
  description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Included when true."
    }
  }
});
var GraphQLSkipDirective = new GraphQLDirective({
  name: "skip",
  description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Skipped when true."
    }
  }
});
var DEFAULT_DEPRECATION_REASON = "No longer supported";
var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: "deprecated",
  description: "Marks an element of a GraphQL schema as no longer supported.",
  locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.ARGUMENT_DEFINITION, DirectiveLocation.INPUT_FIELD_DEFINITION, DirectiveLocation.ENUM_VALUE],
  args: {
    reason: {
      type: GraphQLString,
      description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
var GraphQLSpecifiedByDirective = new GraphQLDirective({
  name: "specifiedBy",
  description: "Exposes a URL that specifies the behaviour of this scalar.",
  locations: [DirectiveLocation.SCALAR],
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The URL that specifies the behaviour of this scalar."
    }
  }
});
var specifiedDirectives = Object.freeze([GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective]);

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/schema.mjs
function _defineProperties4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties4(Constructor, staticProps);
  return Constructor;
}
var GraphQLSchema = /* @__PURE__ */ function() {
  function GraphQLSchema2(config) {
    var _config$directives;
    this.__validationErrors = config.assumeValid === true ? [] : void 0;
    isObjectLike(config) || devAssert(0, "Must provide configuration object.");
    !config.types || Array.isArray(config.types) || devAssert(0, '"types" must be Array if provided but got: '.concat(inspect(config.types), "."));
    !config.directives || Array.isArray(config.directives) || devAssert(0, '"directives" must be Array if provided but got: ' + "".concat(inspect(config.directives), "."));
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription;
    this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
    var allReferencedTypes = new Set(config.types);
    if (config.types != null) {
      for (var _i2 = 0, _config$types2 = config.types; _i2 < _config$types2.length; _i2++) {
        var type = _config$types2[_i2];
        allReferencedTypes.delete(type);
        collectReferencedTypes(type, allReferencedTypes);
      }
    }
    if (this._queryType != null) {
      collectReferencedTypes(this._queryType, allReferencedTypes);
    }
    if (this._mutationType != null) {
      collectReferencedTypes(this._mutationType, allReferencedTypes);
    }
    if (this._subscriptionType != null) {
      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
    }
    for (var _i4 = 0, _this$_directives2 = this._directives; _i4 < _this$_directives2.length; _i4++) {
      var directive = _this$_directives2[_i4];
      if (isDirective(directive)) {
        for (var _i6 = 0, _directive$args2 = directive.args; _i6 < _directive$args2.length; _i6++) {
          var arg = _directive$args2[_i6];
          collectReferencedTypes(arg.type, allReferencedTypes);
        }
      }
    }
    collectReferencedTypes(__Schema, allReferencedTypes);
    this._typeMap = Object.create(null);
    this._subTypeMap = Object.create(null);
    this._implementationsMap = Object.create(null);
    for (var _i8 = 0, _arrayFrom2 = arrayFrom_default(allReferencedTypes); _i8 < _arrayFrom2.length; _i8++) {
      var namedType = _arrayFrom2[_i8];
      if (namedType == null) {
        continue;
      }
      var typeName = namedType.name;
      typeName || devAssert(0, "One of the provided types for building the Schema is missing a name.");
      if (this._typeMap[typeName] !== void 0) {
        throw new Error('Schema must contain uniquely named types but contains multiple types named "'.concat(typeName, '".'));
      }
      this._typeMap[typeName] = namedType;
      if (isInterfaceType(namedType)) {
        for (var _i10 = 0, _namedType$getInterfa2 = namedType.getInterfaces(); _i10 < _namedType$getInterfa2.length; _i10++) {
          var iface = _namedType$getInterfa2[_i10];
          if (isInterfaceType(iface)) {
            var implementations = this._implementationsMap[iface.name];
            if (implementations === void 0) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            implementations.interfaces.push(namedType);
          }
        }
      } else if (isObjectType(namedType)) {
        for (var _i12 = 0, _namedType$getInterfa4 = namedType.getInterfaces(); _i12 < _namedType$getInterfa4.length; _i12++) {
          var _iface = _namedType$getInterfa4[_i12];
          if (isInterfaceType(_iface)) {
            var _implementations = this._implementationsMap[_iface.name];
            if (_implementations === void 0) {
              _implementations = this._implementationsMap[_iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            _implementations.objects.push(namedType);
          }
        }
      }
    }
  }
  var _proto = GraphQLSchema2.prototype;
  _proto.getQueryType = function getQueryType() {
    return this._queryType;
  };
  _proto.getMutationType = function getMutationType() {
    return this._mutationType;
  };
  _proto.getSubscriptionType = function getSubscriptionType() {
    return this._subscriptionType;
  };
  _proto.getTypeMap = function getTypeMap() {
    return this._typeMap;
  };
  _proto.getType = function getType(name) {
    return this.getTypeMap()[name];
  };
  _proto.getPossibleTypes = function getPossibleTypes(abstractType) {
    return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
  };
  _proto.getImplementations = function getImplementations(interfaceType) {
    var implementations = this._implementationsMap[interfaceType.name];
    return implementations !== null && implementations !== void 0 ? implementations : {
      objects: [],
      interfaces: []
    };
  };
  _proto.isPossibleType = function isPossibleType(abstractType, possibleType) {
    return this.isSubType(abstractType, possibleType);
  };
  _proto.isSubType = function isSubType(abstractType, maybeSubType) {
    var map = this._subTypeMap[abstractType.name];
    if (map === void 0) {
      map = Object.create(null);
      if (isUnionType(abstractType)) {
        for (var _i14 = 0, _abstractType$getType2 = abstractType.getTypes(); _i14 < _abstractType$getType2.length; _i14++) {
          var type = _abstractType$getType2[_i14];
          map[type.name] = true;
        }
      } else {
        var implementations = this.getImplementations(abstractType);
        for (var _i16 = 0, _implementations$obje2 = implementations.objects; _i16 < _implementations$obje2.length; _i16++) {
          var _type = _implementations$obje2[_i16];
          map[_type.name] = true;
        }
        for (var _i18 = 0, _implementations$inte2 = implementations.interfaces; _i18 < _implementations$inte2.length; _i18++) {
          var _type2 = _implementations$inte2[_i18];
          map[_type2.name] = true;
        }
      }
      this._subTypeMap[abstractType.name] = map;
    }
    return map[maybeSubType.name] !== void 0;
  };
  _proto.getDirectives = function getDirectives() {
    return this._directives;
  };
  _proto.getDirective = function getDirective(name) {
    return find_default(this.getDirectives(), function(directive) {
      return directive.name === name;
    });
  };
  _proto.toConfig = function toConfig() {
    var _this$extensionASTNod;
    return {
      description: this.description,
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      types: objectValues_default(this.getTypeMap()),
      directives: this.getDirectives().slice(),
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : [],
      assumeValid: this.__validationErrors !== void 0
    };
  };
  _createClass4(GraphQLSchema2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLSchema";
    }
  }]);
  return GraphQLSchema2;
}();
function collectReferencedTypes(type, typeSet) {
  var namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (var _i20 = 0, _namedType$getTypes2 = namedType.getTypes(); _i20 < _namedType$getTypes2.length; _i20++) {
        var memberType = _namedType$getTypes2[_i20];
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (var _i22 = 0, _namedType$getInterfa6 = namedType.getInterfaces(); _i22 < _namedType$getInterfa6.length; _i22++) {
        var interfaceType = _namedType$getInterfa6[_i22];
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (var _i24 = 0, _objectValues2 = objectValues_default(namedType.getFields()); _i24 < _objectValues2.length; _i24++) {
        var field = _objectValues2[_i24];
        collectReferencedTypes(field.type, typeSet);
        for (var _i26 = 0, _field$args2 = field.args; _i26 < _field$args2.length; _i26++) {
          var arg = _field$args2[_i26];
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (var _i28 = 0, _objectValues4 = objectValues_default(namedType.getFields()); _i28 < _objectValues4.length; _i28++) {
        var _field = _objectValues4[_i28];
        collectReferencedTypes(_field.type, typeSet);
      }
    }
  }
  return typeSet;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/index.mjs
init_cjs_shims();

// src/SchemaCRUDPlugin.ts
var import_core2 = require("@graphback/core");

// src/writer/schemaFormatters.ts
init_cjs_shims();
var noteString = "NOTE: This schema was generated by Graphback and should not be changed manually";
var tsSchemaFormatter = {
  format: (schemaString) => {
    return `
// ${noteString}
export const schemaString = \`
${schemaString}
\`;
`;
  }
};
var jsSchemaFormatter = {
  format: (schemaString) => {
    return `
// ${noteString}
const schemaString = \`
${schemaString}
\`;

module.exports = { schemaString };
`;
  }
};
var gqlSchemaFormatter = {
  format: (schemaString) => {
    return `## ${noteString}

${schemaString}`;
  }
};

// src/definitions/schemaDefinitions.ts
init_cjs_shims();
var import_core = require("@graphback/core");

// src/definitions/copyWrappingType.ts
init_cjs_shims();
function copyWrappingType(copyFromType, copyToType) {
  const wrappers = [];
  let oldTypeCopy = copyFromType;
  while (isWrappingType(oldTypeCopy)) {
    if (isListType(oldTypeCopy)) {
      wrappers.push("GraphQLList");
    } else {
      wrappers.push("GraphQLNonNull");
    }
    oldTypeCopy = oldTypeCopy.ofType;
  }
  let namedNewType = getNamedType(copyToType);
  while (wrappers.length > 0) {
    const wrappingType = wrappers.pop();
    if (wrappingType === "GraphQLList") {
      namedNewType = GraphQLList(namedNewType);
    } else {
      namedNewType = GraphQLNonNull(namedNewType);
    }
  }
  return namedNewType;
}

// src/definitions/schemaDefinitions.ts
var PageRequestTypeName = "PageRequest";
var SortDirectionEnumName = "SortDirectionEnum";
var OrderByInputTypeName = "OrderByInput";
var getInputName = (type) => {
  if (isEnumType(type)) {
    return `StringInput`;
  }
  if (isInputObjectType(type)) {
    return type.name;
  }
  return `${type.name}Input`;
};
var createInputTypeForScalar = (scalarType) => {
  const newInput = new GraphQLInputObjectType({
    name: getInputName(scalarType),
    fields: {
      ne: { type: scalarType },
      eq: { type: scalarType },
      le: { type: scalarType },
      lt: { type: scalarType },
      ge: { type: scalarType },
      gt: { type: scalarType },
      in: { type: GraphQLList(GraphQLNonNull(scalarType)) },
      between: { type: GraphQLList(GraphQLNonNull(scalarType)) }
    }
  });
  return newInput;
};
var StringScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLString),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    le: { type: GraphQLString },
    lt: { type: GraphQLString },
    ge: { type: GraphQLString },
    gt: { type: GraphQLString },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLString)) },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
    endsWith: { type: GraphQLString }
  }
});
var IDScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLID),
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLID)) }
  }
});
var BooleanScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
});
var PageRequest = new GraphQLInputObjectType({
  name: PageRequestTypeName,
  fields: {
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  }
});
var SortDirectionEnum = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: "desc" },
    ASC: { value: "asc" }
  }
});
var OrderByInputType = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: "asc" }
  }
});
function getModelInputFields(schemaComposer, modelType, operationType) {
  const inputFields = [];
  const fields7 = Object.values(modelType.getFields());
  for (const field of fields7) {
    if ((0, import_core.isTransientField)(field) || (0, import_core.isOneToManyField)(field)) {
      continue;
    }
    const typeName = (0, import_core.getInputFieldTypeName)(modelType.name, field, operationType);
    if (!typeName) {
      continue;
    }
    const name = (0, import_core.getInputFieldName)(field);
    const type = schemaComposer.getAnyTC(typeName).getType();
    const wrappedType = copyWrappingType(field.type, type);
    const inputField = {
      name,
      type: wrappedType,
      description: void 0,
      extensions: [],
      deprecationReason: field.deprecationReason
    };
    inputFields.push(inputField);
  }
  return inputFields;
}
function buildFindOneFieldMap(modelType, schemaComposer) {
  const { type } = modelType.primaryKey;
  return {
    id: {
      name: "id",
      type: GraphQLNonNull(schemaComposer.getAnyTC(type).getType()),
      description: void 0,
      extensions: void 0,
      deprecationReason: void 0
    }
  };
}
var buildFilterInputType = (schemaComposer, modelType) => {
  const operationType = import_core.GraphbackOperationType.FIND;
  const inputTypeName = (0, import_core.getInputTypeName)(modelType.name, operationType);
  const inputFields = getModelInputFields(schemaComposer, modelType, operationType);
  const scalarInputFields = {};
  for (const field of inputFields) {
    const namedType = getNamedType(field.type);
    if (import_core.FILTER_SUPPORTED_SCALARS.includes(namedType.name) || isEnumType(namedType)) {
      const type = getInputName(namedType);
      scalarInputFields[field.name] = {
        name: field.name,
        type
      };
    }
  }
  const filterInput = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: __spreadProps(__spreadValues({}, scalarInputFields), {
      and: {
        type: `[${inputTypeName}!]`
      },
      or: {
        type: `[${inputTypeName}!]`
      },
      not: {
        type: `${inputTypeName}`
      }
    })
  });
  schemaComposer.add(filterInput);
};
var buildCreateMutationInputType = (schemaComposer, modelType) => {
  const operationType = import_core.GraphbackOperationType.CREATE;
  const inputTypeName = (0, import_core.getInputTypeName)(modelType.name, operationType);
  const idField = (0, import_core.getPrimaryKey)(modelType);
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
  const mutationInputType = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => {
      const fields7 = {};
      for (const field of allModelFields) {
        if (field.name === idField.name && (0, import_core.isAutoPrimaryKey)(field)) {
          continue;
        }
        fields7[field.name] = {
          name: field.name,
          type: field.type
        };
      }
      return fields7;
    }
  });
  schemaComposer.add(mutationInputType);
};
var buildSubscriptionFilterType = (schemaComposer, modelType) => {
  const inputTypeName = (0, import_core.getInputTypeName)(modelType.name, import_core.GraphbackOperationType.SUBSCRIPTION_CREATE);
  const modelFields = Object.values(modelType.getFields());
  const subscriptionFilterFields = modelFields.filter((f) => {
    const namedType = getNamedType(f.type);
    return !(0, import_core.isTransientField)(f) && (isScalarType(namedType) && import_core.FILTER_SUPPORTED_SCALARS.includes(namedType.name)) || isEnumType(namedType);
  });
  const fields7 = {
    and: {
      type: `[${inputTypeName}!]`
    },
    or: {
      type: `[${inputTypeName}!]`
    },
    not: {
      type: `${inputTypeName}`
    }
  };
  for (const { name, type } of subscriptionFilterFields) {
    const fieldType = getNamedType(type);
    const inputFilterName = getInputName(fieldType);
    fields7[name] = {
      name,
      type: schemaComposer.get(inputFilterName)
    };
  }
  schemaComposer.createInputTC({
    name: inputTypeName,
    fields: fields7
  });
};
var buildMutationInputType = (schemaComposer, modelType) => {
  const operationType = import_core.GraphbackOperationType.UPDATE;
  const inputTypeName = (0, import_core.getInputTypeName)(modelType.name, operationType);
  const idField = (0, import_core.getPrimaryKey)(modelType);
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);
  const mutationInputObject = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => {
      const fields7 = {};
      for (const { name, type } of allModelFields) {
        let fieldType;
        if (name !== idField.name) {
          fieldType = getNullableType(type);
        }
        if (isListType(fieldType)) {
          fieldType = GraphQLList(getNamedType(fieldType));
        }
        fields7[name] = {
          name,
          type: fieldType || type
        };
      }
      return fields7;
    }
  });
  schemaComposer.add(mutationInputObject);
};
function mapObjectInputFields(schemaComposer, fields7, objectName) {
  return fields7.map((field) => {
    let namedType = getNamedType(field.type);
    let typeName = namedType.name;
    let inputType;
    if (isObjectType(namedType)) {
      typeName = (0, import_core.getInputTypeName)(typeName, import_core.GraphbackOperationType.CREATE);
      namedType = schemaComposer.getOrCreateITC(typeName).getType();
      inputType = copyWrappingType(field.type, namedType);
    }
    return {
      name: field.name,
      type: inputType || field.type,
      extensions: [],
      deprecationReason: field.deprecationReason
    };
  });
}
function addCreateObjectInputType(schemaComposer, objectType) {
  const objectFields = Object.values(objectType.getFields());
  const operationType = import_core.GraphbackOperationType.CREATE;
  const inputType = new GraphQLInputObjectType({
    name: (0, import_core.getInputTypeName)(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name).reduce((fieldObj, { name, type, description }) => {
      fieldObj[name] = { type, description };
      return fieldObj;
    }, {})
  });
  schemaComposer.add(inputType);
}
function addUpdateObjectInputType(schemaComposer, objectType) {
  const objectFields = Object.values(objectType.getFields());
  const operationType = import_core.GraphbackOperationType.UPDATE;
  const inputType = new GraphQLInputObjectType({
    name: (0, import_core.getInputTypeName)(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields, objectType.name).reduce((fieldObj, { name, type, description }) => {
      fieldObj[name] = { type: getNullableType(type), description };
      return fieldObj;
    }, {})
  });
  schemaComposer.add(inputType);
}
var createMutationListResultType = (modelType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}MutationResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      }
    }
  });
};
var createModelListResultType = (modelType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      count: { type: GraphQLInt }
    }
  });
};
function createVersionedInputFields(versionedInputType) {
  return {
    [import_core.metadataMap.fieldNames.createdAt]: {
      type: versionedInputType
    },
    [import_core.metadataMap.fieldNames.updatedAt]: {
      type: versionedInputType
    }
  };
}
function createVersionedFields(type) {
  return {
    [import_core.metadataMap.fieldNames.createdAt]: {
      type,
      description: `@${import_core.metadataMap.markers.createdAt}`
    },
    [import_core.metadataMap.fieldNames.updatedAt]: {
      type,
      description: `@${import_core.metadataMap.markers.updatedAt}`
    }
  };
}

// src/SchemaCRUDPlugin.ts
var SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";
var SchemaCRUDPlugin = class extends import_core2.GraphbackPlugin {
  pluginConfig;
  constructor(pluginConfig) {
    super();
    this.pluginConfig = __spreadValues({}, pluginConfig);
  }
  transformSchema(metadata) {
    const schema = metadata.getSchema();
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.");
      return schema;
    }
    ;
    const schemaComposer = new import_graphql_compose.SchemaComposer(schema);
    this.buildSchemaModelRelationships(schemaComposer, models);
    this.buildSchemaForModels(schemaComposer, models);
    this.addVersionedMetadataFields(schemaComposer, models);
    return schemaComposer.buildSchema();
  }
  createResolvers(metadata) {
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      return void 0;
    }
    const resolvers = {};
    const schema = metadata.getSchema();
    for (const graphbackScalar of import_core2.graphbackScalarsTypes) {
      if (schema.getType(graphbackScalar.name)) {
        resolvers[graphbackScalar.name] = graphbackScalar;
      }
    }
    const modelNameToModelDefinition = models.reduce((acc, model) => {
      return __spreadProps(__spreadValues({}, acc), {
        [model.graphqlType.name]: model
      });
    }, {});
    for (const model of models) {
      this.addQueryResolvers(model, resolvers);
      this.addMutationResolvers(model, resolvers);
      this.addSubscriptionResolvers(model, resolvers);
      this.addRelationshipResolvers(model, resolvers, modelNameToModelDefinition);
    }
    return resolvers;
  }
  createResources(metadata) {
    if (!this.pluginConfig.outputPath) {
      return;
    }
    let schemaPath = (0, import_path.resolve)(this.pluginConfig.outputPath);
    if (!schemaPath.includes(".")) {
      schemaPath = (0, import_path.join)(schemaPath, "schema.graphql");
    }
    const fileExtension = schemaPath.split(".").pop();
    const schemaString = this.transformSchemaToString(metadata.getSchema(), fileExtension);
    const outputDir = (0, import_path.resolve)((0, import_path.dirname)(this.pluginConfig.outputPath));
    if (!(0, import_fs.existsSync)(outputDir)) {
      (0, import_fs.mkdirSync)(outputDir, { recursive: true });
    }
    (0, import_fs.writeFileSync)(schemaPath, schemaString);
  }
  getPluginName() {
    return SCHEMA_CRUD_PLUGIN_NAME;
  }
  buildSchemaForModels(schemaComposer, models) {
    this.createSchemaCRUDTypes(schemaComposer);
    for (const model of Object.values(models)) {
      this.createQueries(model, schemaComposer);
      this.createMutations(model, schemaComposer);
      this.createSubscriptions(model, schemaComposer);
    }
    for (const model of Object.values(models)) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      (0, import_core2.extendOneToManyFieldArguments)(model, modifiedType);
    }
  }
  createSubscriptions(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    buildSubscriptionFilterType(schemaComposer, modelType);
    const subscriptionFields = {};
    if (model.crudOptions.subCreate) {
      const operation = (0, import_core2.getSubscriptionName)(name, import_core2.GraphbackOperationType.CREATE);
      const filterInputName = (0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.SUBSCRIPTION_CREATE);
      const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subCreateFilterInputType
          }
        }
      };
    }
    if (model.crudOptions.subUpdate) {
      const operation = (0, import_core2.getSubscriptionName)(name, import_core2.GraphbackOperationType.UPDATE);
      const filterInputName = (0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.SUBSCRIPTION_UPDATE);
      const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subUpdateFilterInputType
          }
        }
      };
    }
    if (model.crudOptions.subDelete) {
      const operation = (0, import_core2.getSubscriptionName)(name, import_core2.GraphbackOperationType.DELETE);
      const filterInputName = (0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.SUBSCRIPTION_DELETE);
      const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType();
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subDeleteFilterInputType
          }
        }
      };
    }
    schemaComposer.Subscription.addFields(subscriptionFields);
  }
  createSchema(queryTypes, mutationTypes, subscriptionTypes) {
    const queryType = new GraphQLObjectType({
      name: "Query",
      fields: () => queryTypes
    });
    let mutationType;
    if (Object.keys(mutationTypes).length !== 0) {
      mutationType = new GraphQLObjectType({
        name: "Mutation",
        fields: () => mutationTypes
      });
    }
    let subscriptionType;
    if (Object.keys(subscriptionTypes).length !== 0) {
      subscriptionType = new GraphQLObjectType({
        name: "Subscription",
        fields: () => subscriptionTypes
      });
    }
    return new GraphQLSchema({
      query: queryType,
      mutation: mutationType,
      subscription: subscriptionType
    });
  }
  createMutations(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    const resultListType = createMutationListResultType(modelType);
    buildMutationInputType(schemaComposer, modelType);
    const mutationFields = {};
    if (model.crudOptions.create) {
      const operationType = import_core2.GraphbackOperationType.CREATE;
      buildCreateMutationInputType(schemaComposer, modelType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const createMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const operation = (0, import_core2.getFieldName)(name, operationType);
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(createMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.update) {
      const operationType = import_core2.GraphbackOperationType.UPDATE;
      const operation = (0, import_core2.getFieldName)(name, operationType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(updateMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.updateBy) {
      const operationType = import_core2.GraphbackOperationType.UPDATE_BY;
      const operation = (0, import_core2.getFieldName)(name, operationType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const filterInputType = schemaComposer.getITC((0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.FIND)).getType();
      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          },
          input: {
            type: GraphQLNonNull(updateMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.delete) {
      const operationType = import_core2.GraphbackOperationType.DELETE;
      const operation = (0, import_core2.getFieldName)(name, operationType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(deleteMutationInputType)
          }
        }
      };
    }
    if (model.crudOptions.deleteBy) {
      const operationType = import_core2.GraphbackOperationType.DELETE_BY;
      const operation = (0, import_core2.getFieldName)(name, operationType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType();
      const filterInputType = schemaComposer.getITC((0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.FIND)).getType();
      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          },
          input: {
            type: GraphQLNonNull(deleteMutationInputType)
          }
        }
      };
    }
    schemaComposer.Mutation.addFields(mutationFields);
  }
  createQueries(model, schemaComposer) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const modelType = modelTC.getType();
    buildFilterInputType(schemaComposer, modelType);
    const queryFields = {};
    if (model.crudOptions.findOne) {
      const operation = (0, import_core2.getFieldName)(name, import_core2.GraphbackOperationType.FIND_ONE);
      queryFields[operation] = {
        type: model.graphqlType,
        args: buildFindOneFieldMap(model, schemaComposer)
      };
    }
    if (model.crudOptions.find) {
      const operationType = import_core2.GraphbackOperationType.FIND;
      const operation = (0, import_core2.getFieldName)(name, operationType);
      const inputTypeName = (0, import_core2.getInputTypeName)(name, operationType);
      const filterInputType = schemaComposer.getITC(inputTypeName).getType();
      const resultListType = createModelListResultType(modelType);
      queryFields[operation] = {
        type: GraphQLNonNull(resultListType),
        args: {
          filter: {
            type: filterInputType
          },
          page: {
            type: PageRequest
          },
          orderBy: {
            type: OrderByInputType
          }
        }
      };
    }
    schemaComposer.Query.addFields(queryFields);
  }
  addVersionedMetadataFields(schemaComposer, models) {
    const timeStampInputName = getInputName(import_core2.Timestamp);
    let timestampInputType;
    let timestampType;
    for (const model of models) {
      const name = model.graphqlType.name;
      const modelTC = schemaComposer.getOTC(name);
      const desc = model.graphqlType.description;
      const { markers } = import_core2.metadataMap;
      if ((0, import_graphql_metadata.parseMetadata)(markers.versioned, desc)) {
        const updateField = model.fields[import_core2.metadataMap.fieldNames.updatedAt];
        const createAtField = model.fields[import_core2.metadataMap.fieldNames.createdAt];
        const errorMessage = (field) => `Type "${model.graphqlType.name}" annotated with @versioned, cannot contain custom "${field}" field since it is generated automatically. Either remove the @versioned annotation, change the type of the field to "${import_core2.Timestamp.name}" or remove the field.`;
        if (createAtField && createAtField.type !== import_core2.Timestamp.name) {
          throw new Error(errorMessage(import_core2.metadataMap.fieldNames.createdAt));
        }
        if (updateField && updateField.type !== import_core2.Timestamp.name) {
          throw new Error(errorMessage(import_core2.metadataMap.fieldNames.updatedAt));
        }
        if (!timestampInputType) {
          if (schemaComposer.has(import_core2.Timestamp.name)) {
            timestampInputType = schemaComposer.getITC(timeStampInputName).getType();
          } else {
            schemaComposer.createScalarTC(import_core2.Timestamp);
            timestampInputType = createInputTypeForScalar(import_core2.Timestamp);
            schemaComposer.add(timestampInputType);
          }
          timestampType = schemaComposer.getSTC(import_core2.Timestamp.name).getType();
        }
        const metadataFields = createVersionedFields(timestampType);
        modelTC.addFields(metadataFields);
        const inputType = schemaComposer.getITC((0, import_core2.getInputTypeName)(name, import_core2.GraphbackOperationType.FIND));
        if (inputType) {
          const metadataInputFields = createVersionedInputFields(timestampInputType);
          inputType.addFields(metadataInputFields);
        }
      }
    }
    ;
  }
  transformSchemaToString(schema, fileExtension) {
    const schemaString = (0, import_core2.printSchemaWithDirectives)(schema);
    if (this.pluginConfig) {
      if (fileExtension === "ts") {
        return tsSchemaFormatter.format(schemaString);
      }
      if (fileExtension === "js") {
        return jsSchemaFormatter.format(schemaString);
      }
      if (fileExtension === "graphql") {
        return gqlSchemaFormatter.format(schemaString);
      }
    }
    throw Error(`Invalid format '${fileExtension}' specified. \`options.format\` supports only \`ts\`, \`js\` and \`graphql\` flags`);
  }
  addQueryResolvers(model, resolvers) {
    if (model.crudOptions.findOne || model.crudOptions.find) {
      resolvers.Query = resolvers.Query || {};
      if (model.crudOptions.findOne) {
        this.addFindOneQueryResolver(model, resolvers.Query);
      }
      if (model.crudOptions.find) {
        this.addFindQueryResolver(model, resolvers.Query);
      }
    }
  }
  addMutationResolvers(model, resolvers) {
    if (model.crudOptions.create || model.crudOptions.update || model.crudOptions.delete) {
      resolvers.Mutation = resolvers.Mutation || {};
      if (model.crudOptions.create) {
        this.addCreateMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.update) {
        this.addUpdateMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.updateBy) {
        this.addUpdateByMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.delete) {
        this.addDeleteMutationResolver(model, resolvers.Mutation);
      }
      if (model.crudOptions.deleteBy) {
        this.addDeleteByMutationResolver(model, resolvers.Mutation);
      }
    }
  }
  addSubscriptionResolvers(model, resolvers) {
    const modelType = model.graphqlType;
    if (model.crudOptions.subCreate || model.crudOptions.subUpdate || model.crudOptions.subDelete) {
      resolvers.Subscription = resolvers.Subscription || {};
      if (model.crudOptions.subCreate) {
        this.addCreateSubscriptionResolver(modelType, resolvers.Subscription);
      }
      if (model.crudOptions.subUpdate) {
        this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription);
      }
      if (model.crudOptions.subDelete) {
        this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription);
      }
    }
  }
  addRelationshipResolvers(model, resolversObj, modelNameToModelDefinition) {
    const relationResolvers = {};
    for (const relationship of model.relationships) {
      if (relationship.kind === "oneToMany") {
        this.addOneToManyResolver(relationship, relationResolvers, modelNameToModelDefinition);
      } else {
        this.addOneToOneResolver(relationship, relationResolvers, modelNameToModelDefinition);
      }
    }
    if (Object.keys(relationResolvers).length > 0) {
      resolversObj[model.graphqlType.name] = relationResolvers;
    }
  }
  addCreateMutationResolver(model, mutationObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const resolverCreateField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.CREATE);
    mutationObj[resolverCreateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].create(args.input, context, info);
    };
  }
  addUpdateMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const updateField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.UPDATE);
    mutationObj[updateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].update(args.input, context, info);
    };
  }
  addUpdateByMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const updateField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.UPDATE_BY);
    mutationObj[updateField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].updateBy(args, context, info);
    };
  }
  addDeleteMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const deleteField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.DELETE);
    mutationObj[deleteField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].delete(args.input, context, info);
    };
  }
  addDeleteByMutationResolver(model, mutationObj) {
    const modelName = model.graphqlType.name;
    const deleteField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.DELETE_BY);
    mutationObj[deleteField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].deleteBy(args, context, info);
    };
  }
  addFindQueryResolver(model, queryObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const findField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.FIND);
    queryObj[findField] = async (_, args, context, info) => {
      return await context.graphback[modelName].findBy(args, context, info, "items");
    };
  }
  addFindOneQueryResolver(model, queryObj) {
    const modelType = model.graphqlType;
    const modelName = modelType.name;
    const findOneField = (0, import_core2.getFieldName)(modelName, import_core2.GraphbackOperationType.FIND_ONE);
    const primaryKeyLabel = model.primaryKey.name;
    queryObj[findOneField] = (_, args, context, info) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context, info);
    };
  }
  addCreateSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = (0, import_core2.getSubscriptionName)(modelName, import_core2.GraphbackOperationType.CREATE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToCreate(args.filter, context);
      }
    };
  }
  addUpdateSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = (0, import_core2.getSubscriptionName)(modelName, import_core2.GraphbackOperationType.UPDATE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToUpdate(args.filter, context);
      }
    };
  }
  addDeleteSubscriptionResolver(modelType, subscriptionObj) {
    const modelName = modelType.name;
    const operation = (0, import_core2.getSubscriptionName)(modelName, import_core2.GraphbackOperationType.DELETE);
    subscriptionObj[operation] = {
      subscribe: (_, args, context) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }
        return context.graphback[modelName].subscribeToDelete(args.filter, context);
      }
    };
  }
  addOneToManyResolver(relationship, resolverObj, modelNameToModelDefinition) {
    const modelName = relationship.relationType.name;
    const relationOwner = relationship.ownerField.name;
    const model = modelNameToModelDefinition[modelName];
    resolverObj[relationOwner] = (parent, args, context, info) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner];
      }
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      return context.graphback[modelName].batchLoadData(relationship.relationForeignKey, parent[model.primaryKey.name], args.filter, context, info);
    };
  }
  addOneToOneResolver(relationship, resolverObj, modelNameToModelDefinition) {
    const modelName = relationship.relationType.name;
    const relationIdField = (0, import_core2.getPrimaryKey)(relationship.relationType);
    const relationOwner = relationship.ownerField.name;
    const model = modelNameToModelDefinition[modelName];
    resolverObj[relationOwner] = (parent, _, context, info) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner];
      }
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }
      const selectedFields = (0, import_core2.getSelectedFieldsFromResolverInfo)(info, model);
      selectedFields.push(relationIdField.name);
      const fetchedKeys = selectedFields.join("-");
      const dataLoaderName = `${modelName}-${relationship.kind}-${relationIdField.name}-${relationship.relationForeignKey}-${fetchedKeys}-DataLoader`;
      if (!context[dataLoaderName]) {
        context[dataLoaderName] = new import_dataloader.default(async (keys) => {
          const service = context.graphback[modelName];
          const results = await service.findBy({ [relationIdField.name]: { in: keys } }, context, info);
          return keys.map((key) => {
            return results.items.find((item) => item[relationIdField.name].toString() === key.toString());
          });
        });
      }
      const relationForeignKey = parent[relationship.relationForeignKey];
      if (relationForeignKey === void 0 || relationForeignKey === null) {
        return null;
      }
      return context[dataLoaderName].load(relationForeignKey);
    };
  }
  createSchemaCRUDTypes(schemaComposer) {
    schemaComposer.add(PageRequest);
    schemaComposer.add(IDScalarInputType);
    schemaComposer.add(SortDirectionEnum);
    schemaComposer.add(StringScalarInputType);
    schemaComposer.add(BooleanScalarInputType);
    schemaComposer.add(createInputTypeForScalar(GraphQLInt));
    schemaComposer.add(createInputTypeForScalar(GraphQLFloat));
    schemaComposer.forEach((tc) => {
      const namedType = tc.getType();
      if (isScalarType(namedType) && !isSpecifiedScalarType(namedType) && import_core2.FILTER_SUPPORTED_SCALARS.includes(namedType.name)) {
        schemaComposer.add(createInputTypeForScalar(namedType));
        return;
      }
      const isRootType = ["Query", "Subscription", "Mutation"].includes(namedType.name);
      if (isObjectType(namedType) && !(0, import_core2.isModelType)(namedType) && !isRootType) {
        addCreateObjectInputType(schemaComposer, namedType);
        addUpdateObjectInputType(schemaComposer, namedType);
      }
    });
  }
  buildSchemaModelRelationships(schemaComposer, models) {
    for (const model of models) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      (0, import_core2.addRelationshipFields)(model, modifiedType);
      (0, import_core2.extendRelationshipFields)(model, modifiedType);
    }
  }
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BooleanScalarInputType,
  IDScalarInputType,
  OrderByInputType,
  PageRequest,
  Plugin,
  SCHEMA_CRUD_PLUGIN_NAME,
  SchemaCRUDPlugin,
  SortDirectionEnum,
  StringScalarInputType,
  addCreateObjectInputType,
  addUpdateObjectInputType,
  buildCreateMutationInputType,
  buildFilterInputType,
  buildFindOneFieldMap,
  buildMutationInputType,
  buildSubscriptionFilterType,
  createInputTypeForScalar,
  createModelListResultType,
  createMutationListResultType,
  createVersionedFields,
  createVersionedInputFields,
  getInputName
});
