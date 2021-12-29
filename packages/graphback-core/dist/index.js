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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BigInt_: () => BigInt_,
  Byte: () => Byte,
  CRUDService: () => CRUDService,
  Currency: () => Currency,
  DID: () => DID,
  DateTime: () => DateTime,
  Date_: () => Date_,
  Duration: () => Duration,
  EmailAddress: () => EmailAddress,
  FILTER_SUPPORTED_SCALARS: () => FILTER_SUPPORTED_SCALARS,
  GUID: () => GUID,
  GraphbackCoreMetadata: () => GraphbackCoreMetadata,
  GraphbackObjectID: () => GraphbackObjectID,
  GraphbackOperationType: () => GraphbackOperationType,
  GraphbackPlugin: () => GraphbackPlugin,
  GraphbackPluginEngine: () => GraphbackPluginEngine,
  GraphbackProxyService: () => GraphbackProxyService,
  HSL: () => HSL,
  HSLA: () => HSLA,
  HexColorCode: () => HexColorCode,
  Hexadecimal: () => Hexadecimal,
  IBAN: () => IBAN,
  IPv4: () => IPv4,
  IPv6: () => IPv6,
  ISBN: () => ISBN,
  ISO8601Duration: () => ISO8601Duration,
  JSONObject: () => JSONObject,
  JSON_: () => JSON_,
  JWT: () => JWT,
  Latitude: () => Latitude,
  LocalDate: () => LocalDate,
  LocalEndTime: () => LocalEndTime,
  LocalTime: () => LocalTime,
  Longitude: () => Longitude,
  MAC: () => MAC,
  NegativeFloat: () => NegativeFloat,
  NegativeInt: () => NegativeInt,
  NoDataError: () => NoDataError,
  NonEmptyString: () => NonEmptyString,
  NonNegativeFloat: () => NonNegativeFloat,
  NonNegativeInt: () => NonNegativeInt,
  NonPositiveFloat: () => NonPositiveFloat,
  NonPositiveInt: () => NonPositiveInt,
  PhoneNumber: () => PhoneNumber,
  Port: () => Port,
  PositiveFloat: () => PositiveFloat,
  PositiveInt: () => PositiveInt,
  PostalCode: () => PostalCode,
  RGB: () => RGB,
  RGBA: () => RGBA,
  RelationshipMetadataBuilder: () => RelationshipMetadataBuilder,
  Time: () => Time,
  Timestamp: () => Timestamp,
  TransformType: () => TransformType,
  URL: () => URL,
  USCurrency: () => USCurrency,
  UUID: () => UUID,
  UtcOffset: () => UtcOffset,
  addRelationshipFields: () => addRelationshipFields,
  buildModelTableMap: () => buildModelTableMap,
  createCRUDService: () => createCRUDService,
  createInMemoryFilterPredicate: () => createInMemoryFilterPredicate,
  defaultTableNameTransform: () => defaultTableNameTransform,
  extendOneToManyFieldArguments: () => extendOneToManyFieldArguments,
  extendRelationshipFields: () => extendRelationshipFields,
  filterModelTypes: () => filterModelTypes,
  filterNonModelTypes: () => filterNonModelTypes,
  getColumnName: () => getColumnName,
  getDatabaseArguments: () => getDatabaseArguments,
  getFieldName: () => getFieldName,
  getFieldTransformations: () => getFieldTransformations,
  getInputFieldName: () => getInputFieldName,
  getInputFieldTypeName: () => getInputFieldTypeName,
  getInputTypeName: () => getInputTypeName,
  getModelByName: () => getModelByName,
  getModelFieldsFromResolverFields: () => getModelFieldsFromResolverFields,
  getPrimaryKey: () => getPrimaryKey,
  getRelationFieldName: () => getRelationFieldName,
  getResolverInfoFieldsList: () => getResolverInfoFieldsList,
  getSelectedFieldsFromResolverInfo: () => getSelectedFieldsFromResolverInfo,
  getSubscriptionName: () => getSubscriptionName,
  getTableName: () => getTableName,
  getUserModels: () => getUserModels,
  graphbackScalarsTypes: () => graphbackScalarsTypes,
  isAutoPrimaryKey: () => isAutoPrimaryKey,
  isInputField: () => isInputField,
  isModelType: () => isModelType,
  isOneToManyField: () => isOneToManyField,
  isSpecifiedGraphbackJSONScalarType: () => isSpecifiedGraphbackJSONScalarType,
  isSpecifiedGraphbackScalarType: () => isSpecifiedGraphbackScalarType,
  isTransientField: () => isTransientField,
  lowerCaseFirstChar: () => lowerCaseFirstChar,
  metadataMap: () => metadataMap,
  parseRelationshipAnnotation: () => parseRelationshipAnnotation,
  printSchemaWithDirectives: () => printSchemaWithDirectives,
  relationshipFieldDescriptionTemplate: () => relationshipFieldDescriptionTemplate,
  relationshipOneToOneFieldDescriptionTemplate: () => relationshipOneToOneFieldDescriptionTemplate,
  transformForeignKeyName: () => transformForeignKeyName,
  upperCaseFirstChar: () => upperCaseFirstChar
});

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/isObjectLike.mjs
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
var SYMBOL_ITERATOR = typeof Symbol === "function" && Symbol.iterator != null ? Symbol.iterator : "@@iterator";
var SYMBOL_ASYNC_ITERATOR = typeof Symbol === "function" && Symbol.asyncIterator != null ? Symbol.asyncIterator : "@@asyncIterator";
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/location.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/kinds.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/tokenKind.mjs
var TokenKind = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment"
});

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/inspect.mjs
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
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/instanceOf.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/source.mjs
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
var Source = /* @__PURE__ */ function() {
  function Source2(body) {
    var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
    var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === "string" || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  _createClass2(Source2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "Source";
    }
  }]);
  return Source2;
}();
function isSource(source) {
  return instanceOf_default(source, Source);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/directiveLocation.mjs
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
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== " " && str[i] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        if (value.charCodeAt(i + 1) === 10) {
          ++i;
        }
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/lexer.mjs
var Lexer = /* @__PURE__ */ function() {
  function Lexer2(source) {
    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  var _proto = Lexer2.prototype;
  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  };
  _proto.lookahead = function lookahead() {
    var token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next;
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  };
  return Lexer2;
}();
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function printCharCode(code) {
  return isNaN(code) ? TokenKind.EOF : code < 127 ? JSON.stringify(String.fromCharCode(code)) : '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"');
}
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;
  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;
    var _col = 1 + pos - lexer.lineStart;
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++pos;
        continue;
      case 10:
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 13:
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 33:
        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
      case 35:
        return readComment(source, pos, _line, _col, prev);
      case 36:
        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
      case 38:
        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
      case 40:
        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
      case 41:
        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
      case 46:
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }
        break;
      case 58:
        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
      case 61:
        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
      case 64:
        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
      case 91:
        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
      case 93:
        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
      case 123:
        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
      case 124:
        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
      case 125:
        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
      case 34:
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }
        return readString(source, pos, _line, _col, prev);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return readNumber(source, pos, code, _line, _col, prev);
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
      case 95:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return readName(source, pos, _line, _col, prev);
    }
    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
function unexpectedCharacterMessage(code) {
  if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }
  if (code === 39) {
    return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
  }
  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;
  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && (code > 31 || code === 9));
  return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }
  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57);
    return position;
  }
  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && code !== 10 && code !== 13) {
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
    }
    if (code < 32 && code !== 9) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    ++position;
    if (code === 92) {
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += "/";
          break;
        case 92:
          value += "\\";
          break;
        case 98:
          value += "\b";
          break;
        case 102:
          value += "\f";
          break;
        case 110:
          value += "\n";
          break;
        case 114:
          value += "\r";
          break;
        case 116:
          value += "	";
          break;
        case 117: {
          var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
          if (charCode < 0) {
            var invalidSequence = body.slice(position + 1, position + 5);
            throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        }
        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }
      ++position;
      chunkStart = position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
    }
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    if (code === 10) {
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 70 ? a - 55 : a >= 97 && a <= 102 ? a - 87 : -1;
}
function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;
  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122)) {
    ++position;
  }
  return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
}
function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/parser.mjs
function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
var Parser = /* @__PURE__ */ function() {
  function Parser2(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  var _proto = Parser2.prototype;
  _proto.parseName = function parseName() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  };
  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start)
    };
  };
  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "directive":
          return this.parseTypeSystemDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }
    throw this.unexpected();
  };
  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: "query",
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    var operation = this.parseOperationType();
    var name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return "query";
      case "mutation":
        return "mutation";
      case "subscription":
        return "subscription";
    }
    throw this.unexpected(operationToken);
  };
  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  };
  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  };
  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  };
  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
      loc: this.loc(start)
    };
  };
  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  };
  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };
  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  };
  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;
    var start = this._lexer.token;
    this.expectKeyword("fragment");
    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  };
  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this._lexer.advance();
        return {
          kind: Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.FLOAT:
        this._lexer.advance();
        return {
          kind: Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this._lexer.advance();
        switch (token.value) {
          case "true":
            return {
              kind: Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };
          case "false":
            return {
              kind: Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };
          case "null":
            return {
              kind: Kind.NULL,
              loc: this.loc(token)
            };
          default:
            return {
              kind: Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }
      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }
        break;
    }
    throw this.unexpected();
  };
  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;
    this._lexer.advance();
    return {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  };
  _proto.parseList = function parseList(isConst) {
    var _this = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this.parseValueLiteral(isConst);
    };
    return {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this2.parseObjectField(isConst);
    };
    return {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  };
  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: Kind.LIST_TYPE,
        type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type,
        loc: this.loc(start)
      };
    }
    return type;
  };
  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  };
  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  };
  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;
    if (!this.expectOptionalKeyword("implements")) {
      return [];
    }
    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = [];
      this.expectOptionalToken(TokenKind.AMP);
      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
      return types;
    }
    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  };
  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();
      this._lexer.advance();
      return [];
    }
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  };
  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  };
  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  };
  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  };
  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseInputFieldsDefinition();
    return {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  };
  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    var locations = this.parseDirectiveLocations();
    return {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  };
  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();
    if (DirectiveLocation[name.value] !== void 0) {
      return name;
    }
    throw this.unexpected(start);
  };
  _proto.loc = function loc(startToken) {
    var _this$_options4;
    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  };
  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  };
  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  };
  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    return void 0;
  };
  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
    }
  };
  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
      return true;
    }
    return false;
  };
  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  };
  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  };
  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  };
  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  };
  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  };
  return Parser2;
}();
function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? '"'.concat(kind, '"') : kind;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/visitor.mjs
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
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind, false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind, true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0 && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
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
var objectValues = Object.values || function(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};
var objectValues_default = objectValues;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/objectEntries.mjs
var objectEntries = Object.entries || function(obj) {
  return Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
};
var objectEntries_default = objectEntries;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/keyMap.mjs
function keyMap(list, keyFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = item;
    return map;
  }, Object.create(null));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/mapValue.mjs
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
function keyValMap(list, keyFn, valFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = valFn(item);
    return map;
  }, Object.create(null));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/didYouMean.mjs
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
function identityFunc(x) {
  return x;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/naturalCompare.mjs
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
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
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
  function GraphQLScalarType3(config) {
    var _config$parseValue, _config$serialize, _config$parseLiteral;
    var parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
    this.name = config.name;
    this.description = config.description;
    this.specifiedByUrl = config.specifiedByUrl;
    this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
    this.parseValue = parseValue2;
    this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : function(node, variables) {
      return parseValue2(valueFromASTUntyped(node, variables));
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
  var _proto = GraphQLScalarType3.prototype;
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
  _createClass3(GraphQLScalarType3, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLScalarType";
    }
  }]);
  return GraphQLScalarType3;
}();
defineInspect(GraphQLScalarType);
var GraphQLObjectType = /* @__PURE__ */ function() {
  function GraphQLObjectType7(config) {
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
  var _proto2 = GraphQLObjectType7.prototype;
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
  _createClass3(GraphQLObjectType7, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLObjectType";
    }
  }]);
  return GraphQLObjectType7;
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
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
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
  _createClass3(GraphQLInterfaceType2, [{
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
  _createClass3(GraphQLUnionType2, [{
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
  _proto5.parseValue = function parseValue2(inputValue) {
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
  _proto5.parseLiteral = function parseLiteral7(valueNode, _variables) {
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
  _createClass3(GraphQLEnumType2, [{
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
  function GraphQLInputObjectType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineInputFieldMap.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
  }
  var _proto6 = GraphQLInputObjectType2.prototype;
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
  _createClass3(GraphQLInputObjectType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLInputObjectType";
    }
  }]);
  return GraphQLInputObjectType2;
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
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/typeComparators.mjs
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some(function(type) {
        return schema.isSubType(typeB, type);
      });
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/arrayFrom.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/isFinite.mjs
var isFinitePolyfill = Number.isFinite || function(value) {
  return typeof value === "number" && isFinite(value);
};
var isFinite_default = isFinitePolyfill;

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/jsutils/safeArrayFrom.mjs
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/polyfills/isInteger.mjs
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
        resolve: function resolve4(schema) {
          return schema.description;
        }
      },
      types: {
        description: "A list of all types supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
        resolve: function resolve4(schema) {
          return objectValues_default(schema.getTypeMap());
        }
      },
      queryType: {
        description: "The type that query operations will be rooted at.",
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(schema) {
          return schema.getQueryType();
        }
      },
      mutationType: {
        description: "If this server supports mutation, the type that mutation operations will be rooted at.",
        type: __Type,
        resolve: function resolve4(schema) {
          return schema.getMutationType();
        }
      },
      subscriptionType: {
        description: "If this server support subscription, the type that subscription operations will be rooted at.",
        type: __Type,
        resolve: function resolve4(schema) {
          return schema.getSubscriptionType();
        }
      },
      directives: {
        description: "A list of all directives supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Directive))),
        resolve: function resolve4(schema) {
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
        resolve: function resolve4(directive) {
          return directive.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(directive) {
          return directive.description;
        }
      },
      isRepeatable: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(directive) {
          return directive.isRepeatable;
        }
      },
      locations: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__DirectiveLocation))),
        resolve: function resolve4(directive) {
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
        resolve: function resolve4(field, _ref) {
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
        resolve: function resolve4(type) {
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
        resolve: function resolve4(type) {
          return type.name !== void 0 ? type.name : void 0;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(type) {
          return type.description !== void 0 ? type.description : void 0;
        }
      },
      specifiedByUrl: {
        type: GraphQLString,
        resolve: function resolve4(obj) {
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
        resolve: function resolve4(type, _ref2) {
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
        resolve: function resolve4(type) {
          if (isObjectType(type) || isInterfaceType(type)) {
            return type.getInterfaces();
          }
        }
      },
      possibleTypes: {
        type: new GraphQLList(new GraphQLNonNull(__Type)),
        resolve: function resolve4(type, _args, _context, _ref3) {
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
        resolve: function resolve4(type, _ref4) {
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
        resolve: function resolve4(type, _ref5) {
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
        resolve: function resolve4(type) {
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
        resolve: function resolve4(field) {
          return field.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(field) {
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
        resolve: function resolve4(field, _ref6) {
          var includeDeprecated = _ref6.includeDeprecated;
          return includeDeprecated ? field.args : field.args.filter(function(arg) {
            return arg.deprecationReason == null;
          });
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(field) {
          return field.type;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(field) {
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
        resolve: function resolve4(inputValue) {
          return inputValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(inputValue) {
          return inputValue.description;
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(inputValue) {
          return inputValue.type;
        }
      },
      defaultValue: {
        type: GraphQLString,
        description: "A GraphQL-formatted string representing the default value for this input value.",
        resolve: function resolve4(inputValue) {
          var type = inputValue.type, defaultValue = inputValue.defaultValue;
          var valueAST = astFromValue(defaultValue, type);
          return valueAST ? print(valueAST) : null;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(obj) {
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
        resolve: function resolve4(enumValue) {
          return enumValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(enumValue) {
          return enumValue.description;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(enumValue) {
          return enumValue.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(enumValue) {
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
function isIntrospectionType(type) {
  return introspectionTypes.some(function(_ref11) {
    var name = _ref11.name;
    return type.name === name;
  });
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/type/directives.mjs
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
  _createClass4(GraphQLDirective2, [{
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
function _defineProperties5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties5(Constructor, staticProps);
  return Constructor;
}
var GraphQLSchema = /* @__PURE__ */ function() {
  function GraphQLSchema5(config) {
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
  var _proto = GraphQLSchema5.prototype;
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
  _createClass5(GraphQLSchema5, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLSchema";
    }
  }]);
  return GraphQLSchema5;
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

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/typeFromAST.mjs
function typeFromAST(schema, typeNode) {
  var innerType;
  if (typeNode.kind === Kind.LIST_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && new GraphQLList(innerType);
  }
  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && new GraphQLNonNull(innerType);
  }
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return schema.getType(typeNode.name.value);
  }
  invariant(0, "Unexpected type node: " + inspect(typeNode));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/language/predicates.mjs
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
function ExecutableDefinitionsRule(context) {
  return {
    Document: function Document2(node) {
      for (var _i2 = 0, _node$definitions2 = node.definitions; _i2 < _node$definitions2.length; _i2++) {
        var definition = _node$definitions2[_i2];
        if (!isExecutableDefinitionNode(definition)) {
          var defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context.reportError(new GraphQLError("The ".concat(defName, " definition is not executable."), definition));
        }
      }
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
function UniqueOperationNamesRule(context) {
  var knownOperationNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2(node) {
      var operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(new GraphQLError('There can be only one operation named "'.concat(operationName.value, '".'), [knownOperationNames[operationName.value], operationName]));
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: function FragmentDefinition2() {
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
function LoneAnonymousOperationRule(context) {
  var operationCount = 0;
  return {
    Document: function Document2(node) {
      operationCount = node.definitions.filter(function(definition) {
        return definition.kind === Kind.OPERATION_DEFINITION;
      }).length;
    },
    OperationDefinition: function OperationDefinition2(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(new GraphQLError("This anonymous operation must be the only defined operation.", node));
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition: function OperationDefinition2(node) {
      if (node.operation === "subscription") {
        if (node.selectionSet.selections.length !== 1) {
          context.reportError(new GraphQLError(node.name ? 'Subscription "'.concat(node.name.value, '" must select only one top level field.') : "Anonymous Subscription must select only one top level field.", node.selectionSet.selections.slice(1)));
        }
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
function KnownTypeNamesRule(context) {
  var schema = context.getSchema();
  var existingTypesMap = schema ? schema.getTypeMap() : Object.create(null);
  var definedTypes = Object.create(null);
  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
    var def = _context$getDocument$2[_i2];
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  var typeNames = Object.keys(existingTypesMap).concat(Object.keys(definedTypes));
  return {
    NamedType: function NamedType2(node, _1, parent, _2, ancestors) {
      var typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        var definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        var isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && isStandardTypeName(typeName)) {
          return;
        }
        var suggestedTypes = suggestionList(typeName, isSDL ? standardTypeNames.concat(typeNames) : typeNames);
        context.reportError(new GraphQLError('Unknown type "'.concat(typeName, '".') + didYouMean(suggestedTypes), node));
      }
    }
  };
}
var standardTypeNames = [].concat(specifiedScalarTypes, introspectionTypes).map(function(type) {
  return type.name;
});
function isStandardTypeName(typeName) {
  return standardTypeNames.indexOf(typeName) !== -1;
}
function isSDLNode(value) {
  return !Array.isArray(value) && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment: function InlineFragment2(node) {
      var typeCondition = node.typeCondition;
      if (typeCondition) {
        var type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          var typeStr = print(typeCondition);
          context.reportError(new GraphQLError('Fragment cannot condition on non composite type "'.concat(typeStr, '".'), typeCondition));
        }
      }
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      var type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        var typeStr = print(node.typeCondition);
        context.reportError(new GraphQLError('Fragment "'.concat(node.name.value, '" cannot condition on non composite type "').concat(typeStr, '".'), node.typeCondition));
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition: function VariableDefinition2(node) {
      var type = typeFromAST(context.getSchema(), node.type);
      if (type && !isInputType(type)) {
        var variableName = node.variable.name.value;
        var typeName = print(node.type);
        context.reportError(new GraphQLError('Variable "$'.concat(variableName, '" cannot be non-input type "').concat(typeName, '".'), node.type));
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
function ScalarLeafsRule(context) {
  return {
    Field: function Field2(node) {
      var type = context.getType();
      var selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            var fieldName = node.name.value;
            var typeStr = inspect(type);
            context.reportError(new GraphQLError('Field "'.concat(fieldName, '" must not have a selection since type "').concat(typeStr, '" has no subfields.'), selectionSet));
          }
        } else if (!selectionSet) {
          var _fieldName = node.name.value;
          var _typeStr = inspect(type);
          context.reportError(new GraphQLError('Field "'.concat(_fieldName, '" of type "').concat(_typeStr, '" must have a selection of subfields. Did you mean "').concat(_fieldName, ' { ... }"?'), node));
        }
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
function FieldsOnCorrectTypeRule(context) {
  return {
    Field: function Field2(node) {
      var type = context.getParentType();
      if (type) {
        var fieldDef = context.getFieldDef();
        if (!fieldDef) {
          var schema = context.getSchema();
          var fieldName = node.name.value;
          var suggestion = didYouMean("to use an inline fragment on", getSuggestedTypeNames(schema, type, fieldName));
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context.reportError(new GraphQLError('Cannot query field "'.concat(fieldName, '" on type "').concat(type.name, '".') + suggestion, node));
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  var suggestedTypes = /* @__PURE__ */ new Set();
  var usageCount = Object.create(null);
  for (var _i2 = 0, _schema$getPossibleTy2 = schema.getPossibleTypes(type); _i2 < _schema$getPossibleTy2.length; _i2++) {
    var possibleType = _schema$getPossibleTy2[_i2];
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (var _i4 = 0, _possibleType$getInte2 = possibleType.getInterfaces(); _i4 < _possibleType$getInte2.length; _i4++) {
      var _usageCount$possibleI;
      var possibleInterface = _possibleType$getInte2[_i4];
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return arrayFrom_default(suggestedTypes).sort(function(typeA, typeB) {
    var usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map(function(x) {
    return x.name;
  });
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    var possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
function UniqueFragmentNamesRule(context) {
  var knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      var fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(new GraphQLError('There can be only one fragment named "'.concat(fragmentName, '".'), [knownFragmentNames[fragmentName], node.name]));
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread: function FragmentSpread2(node) {
      var fragmentName = node.name.value;
      var fragment = context.getFragment(fragmentName);
      if (!fragment) {
        context.reportError(new GraphQLError('Unknown fragment "'.concat(fragmentName, '".'), node.name));
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
function NoUnusedFragmentsRule(context) {
  var operationDefs = [];
  var fragmentDefs = [];
  return {
    OperationDefinition: function OperationDefinition2(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave: function leave() {
        var fragmentNameUsed = Object.create(null);
        for (var _i2 = 0; _i2 < operationDefs.length; _i2++) {
          var operation = operationDefs[_i2];
          for (var _i4 = 0, _context$getRecursive2 = context.getRecursivelyReferencedFragments(operation); _i4 < _context$getRecursive2.length; _i4++) {
            var fragment = _context$getRecursive2[_i4];
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (var _i6 = 0; _i6 < fragmentDefs.length; _i6++) {
          var fragmentDef = fragmentDefs[_i6];
          var fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(new GraphQLError('Fragment "'.concat(fragName, '" is never used.'), fragmentDef));
          }
        }
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment: function InlineFragment2(node) {
      var fragType = context.getType();
      var parentType = context.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        var parentTypeStr = inspect(parentType);
        var fragTypeStr = inspect(fragType);
        context.reportError(new GraphQLError('Fragment cannot be spread here as objects of type "'.concat(parentTypeStr, '" can never be of type "').concat(fragTypeStr, '".'), node));
      }
    },
    FragmentSpread: function FragmentSpread2(node) {
      var fragName = node.name.value;
      var fragType = getFragmentType(context, fragName);
      var parentType = context.getParentType();
      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        var parentTypeStr = inspect(parentType);
        var fragTypeStr = inspect(fragType);
        context.reportError(new GraphQLError('Fragment "'.concat(fragName, '" cannot be spread here as objects of type "').concat(parentTypeStr, '" can never be of type "').concat(fragTypeStr, '".'), node));
      }
    }
  };
}
function getFragmentType(context, name) {
  var frag = context.getFragment(name);
  if (frag) {
    var type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
function NoFragmentCyclesRule(context) {
  var visitedFrags = Object.create(null);
  var spreadPath = [];
  var spreadPathIndexByName = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    var fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    var spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (var _i2 = 0; _i2 < spreadNodes.length; _i2++) {
      var spreadNode = spreadNodes[_i2];
      var spreadName = spreadNode.name.value;
      var cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        var spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        var cyclePath = spreadPath.slice(cycleIndex);
        var viaPath = cyclePath.slice(0, -1).map(function(s) {
          return '"' + s.name.value + '"';
        }).join(", ");
        context.reportError(new GraphQLError('Cannot spread fragment "'.concat(spreadName, '" within itself') + (viaPath !== "" ? " via ".concat(viaPath, ".") : "."), cyclePath));
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
function UniqueVariableNamesRule(context) {
  var knownVariableNames = Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      knownVariableNames = Object.create(null);
    },
    VariableDefinition: function VariableDefinition2(node) {
      var variableName = node.variable.name.value;
      if (knownVariableNames[variableName]) {
        context.reportError(new GraphQLError('There can be only one variable named "$'.concat(variableName, '".'), [knownVariableNames[variableName], node.variable.name]));
      } else {
        knownVariableNames[variableName] = node.variable.name;
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
function NoUndefinedVariablesRule(context) {
  var variableNameDefined = Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        variableNameDefined = Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          var varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context.reportError(new GraphQLError(operation.name ? 'Variable "$'.concat(varName, '" is not defined by operation "').concat(operation.name.value, '".') : 'Variable "$'.concat(varName, '" is not defined.'), [node, operation]));
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
function NoUnusedVariablesRule(context) {
  var variableDefs = [];
  return {
    OperationDefinition: {
      enter: function enter() {
        variableDefs = [];
      },
      leave: function leave(operation) {
        var variableNameUsed = Object.create(null);
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          variableNameUsed[node.name.value] = true;
        }
        for (var _i4 = 0, _variableDefs2 = variableDefs; _i4 < _variableDefs2.length; _i4++) {
          var variableDef = _variableDefs2[_i4];
          var variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(new GraphQLError(operation.name ? 'Variable "$'.concat(variableName, '" is never used in operation "').concat(operation.name.value, '".') : 'Variable "$'.concat(variableName, '" is never used.'), variableDef));
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(def) {
      variableDefs.push(def);
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
function KnownDirectivesRule(context) {
  var locationsMap = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    locationsMap[directive.name] = directive.locations;
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map(function(name) {
        return name.value;
      });
    }
  }
  return {
    Directive: function Directive2(node, _key, _parent, _path, ancestors) {
      var name = node.name.value;
      var locations = locationsMap[name];
      if (!locations) {
        context.reportError(new GraphQLError('Unknown directive "@'.concat(name, '".'), node));
        return;
      }
      var candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && locations.indexOf(candidateLocation) === -1) {
        context.reportError(new GraphQLError('Directive "@'.concat(name, '" may not be used on ').concat(candidateLocation, "."), node));
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  var appliedTo = ancestors[ancestors.length - 1];
  !Array.isArray(appliedTo) || invariant(0);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      var parentNode = ancestors[ancestors.length - 3];
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case "query":
      return DirectiveLocation.QUERY;
    case "mutation":
      return DirectiveLocation.MUTATION;
    case "subscription":
      return DirectiveLocation.SUBSCRIPTION;
  }
  invariant(0, "Unexpected operation: " + inspect(operation));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
function UniqueDirectivesPerLocationRule(context) {
  var uniqueDirectiveMap = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  var schemaDirectives = Object.create(null);
  var typeDirectivesMap = Object.create(null);
  return {
    enter: function enter(node) {
      if (node.directives == null) {
        return;
      }
      var seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        var typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = Object.create(null);
        }
      } else {
        seenDirectives = Object.create(null);
      }
      for (var _i6 = 0, _node$directives2 = node.directives; _i6 < _node$directives2.length; _i6++) {
        var _directive = _node$directives2[_i6];
        var directiveName = _directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(new GraphQLError('The directive "@'.concat(directiveName, '" can only be used once at this location.'), [seenDirectives[directiveName], _directive]));
          } else {
            seenDirectives[directiveName] = _directive;
          }
        }
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
function ownKeys2(object, enumerableOnly) {
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
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function KnownArgumentNamesRule(context) {
  return _objectSpread2(_objectSpread2({}, KnownArgumentNamesOnDirectivesRule(context)), {}, {
    Argument: function Argument2(argNode) {
      var argDef = context.getArgument();
      var fieldDef = context.getFieldDef();
      var parentType = context.getParentType();
      if (!argDef && fieldDef && parentType) {
        var argName = argNode.name.value;
        var knownArgsNames = fieldDef.args.map(function(arg) {
          return arg.name;
        });
        var suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(new GraphQLError('Unknown argument "'.concat(argName, '" on field "').concat(parentType.name, ".").concat(fieldDef.name, '".') + didYouMean(suggestions), argNode));
      }
    }
  });
}
function KnownArgumentNamesOnDirectivesRule(context) {
  var directiveArgs = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    directiveArgs[directive.name] = directive.args.map(function(arg) {
      return arg.name;
    });
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      var argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map(function(arg) {
        return arg.name.value;
      });
    }
  }
  return {
    Directive: function Directive2(directiveNode) {
      var directiveName = directiveNode.name.value;
      var knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (var _i6 = 0, _directiveNode$argume2 = directiveNode.arguments; _i6 < _directiveNode$argume2.length; _i6++) {
          var argNode = _directiveNode$argume2[_i6];
          var argName = argNode.name.value;
          if (knownArgs.indexOf(argName) === -1) {
            var suggestions = suggestionList(argName, knownArgs);
            context.reportError(new GraphQLError('Unknown argument "'.concat(argName, '" on directive "@').concat(directiveName, '".') + didYouMean(suggestions), argNode));
          }
        }
      }
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
function UniqueArgumentNamesRule(context) {
  var knownArgNames = Object.create(null);
  return {
    Field: function Field2() {
      knownArgNames = Object.create(null);
    },
    Directive: function Directive2() {
      knownArgNames = Object.create(null);
    },
    Argument: function Argument2(node) {
      var argName = node.name.value;
      if (knownArgNames[argName]) {
        context.reportError(new GraphQLError('There can be only one argument named "'.concat(argName, '".'), [knownArgNames[argName], node.name]));
      } else {
        knownArgNames[argName] = node.name;
      }
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
function ValuesOfCorrectTypeRule(context) {
  return {
    ListValue: function ListValue2(node) {
      var type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false;
      }
    },
    ObjectValue: function ObjectValue2(node) {
      var type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false;
      }
      var fieldNodeMap = keyMap(node.fields, function(field) {
        return field.name.value;
      });
      for (var _i2 = 0, _objectValues2 = objectValues_default(type.getFields()); _i2 < _objectValues2.length; _i2++) {
        var fieldDef = _objectValues2[_i2];
        var fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          var typeStr = inspect(fieldDef.type);
          context.reportError(new GraphQLError('Field "'.concat(type.name, ".").concat(fieldDef.name, '" of required type "').concat(typeStr, '" was not provided.'), node));
        }
      }
    },
    ObjectField: function ObjectField2(node) {
      var parentType = getNamedType(context.getParentInputType());
      var fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        var suggestions = suggestionList(node.name.value, Object.keys(parentType.getFields()));
        context.reportError(new GraphQLError('Field "'.concat(node.name.value, '" is not defined by type "').concat(parentType.name, '".') + didYouMean(suggestions), node));
      }
    },
    NullValue: function NullValue2(node) {
      var type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(new GraphQLError('Expected value of type "'.concat(inspect(type), '", found ').concat(print(node), "."), node));
      }
    },
    EnumValue: function EnumValue2(node) {
      return isValidValueNode(context, node);
    },
    IntValue: function IntValue2(node) {
      return isValidValueNode(context, node);
    },
    FloatValue: function FloatValue2(node) {
      return isValidValueNode(context, node);
    },
    StringValue: function StringValue2(node) {
      return isValidValueNode(context, node);
    },
    BooleanValue: function BooleanValue2(node) {
      return isValidValueNode(context, node);
    }
  };
}
function isValidValueNode(context, node) {
  var locationType = context.getInputType();
  if (!locationType) {
    return;
  }
  var type = getNamedType(locationType);
  if (!isLeafType(type)) {
    var typeStr = inspect(locationType);
    context.reportError(new GraphQLError('Expected value of type "'.concat(typeStr, '", found ').concat(print(node), "."), node));
    return;
  }
  try {
    var parseResult = type.parseLiteral(node, void 0);
    if (parseResult === void 0) {
      var _typeStr = inspect(locationType);
      context.reportError(new GraphQLError('Expected value of type "'.concat(_typeStr, '", found ').concat(print(node), "."), node));
    }
  } catch (error) {
    var _typeStr2 = inspect(locationType);
    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(new GraphQLError('Expected value of type "'.concat(_typeStr2, '", found ').concat(print(node), "; ") + error.message, node, void 0, void 0, void 0, error));
    }
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
function ownKeys3(object, enumerableOnly) {
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
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys3(Object(source), true).forEach(function(key) {
        _defineProperty3(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys3(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ProvidedRequiredArgumentsRule(context) {
  return _objectSpread3(_objectSpread3({}, ProvidedRequiredArgumentsOnDirectivesRule(context)), {}, {
    Field: {
      leave: function leave(fieldNode) {
        var _fieldNode$arguments;
        var fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        var argNodes = (_fieldNode$arguments = fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : [];
        var argNodeMap = keyMap(argNodes, function(arg) {
          return arg.name.value;
        });
        for (var _i2 = 0, _fieldDef$args2 = fieldDef.args; _i2 < _fieldDef$args2.length; _i2++) {
          var argDef = _fieldDef$args2[_i2];
          var argNode = argNodeMap[argDef.name];
          if (!argNode && isRequiredArgument(argDef)) {
            var argTypeStr = inspect(argDef.type);
            context.reportError(new GraphQLError('Field "'.concat(fieldDef.name, '" argument "').concat(argDef.name, '" of type "').concat(argTypeStr, '" is required, but it was not provided.'), fieldNode));
          }
        }
      }
    }
  });
}
function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var requiredArgsMap = Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i4 = 0; _i4 < definedDirectives.length; _i4++) {
    var directive = definedDirectives[_i4];
    requiredArgsMap[directive.name] = keyMap(directive.args.filter(isRequiredArgument), function(arg) {
      return arg.name;
    });
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i6 = 0; _i6 < astDefinitions.length; _i6++) {
    var def = astDefinitions[_i6];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      var argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(argNodes.filter(isRequiredArgumentNode), function(arg) {
        return arg.name.value;
      });
    }
  }
  return {
    Directive: {
      leave: function leave(directiveNode) {
        var directiveName = directiveNode.name.value;
        var requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          var _argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          var argNodeMap = keyMap(_argNodes, function(arg) {
            return arg.name.value;
          });
          for (var _i8 = 0, _Object$keys2 = Object.keys(requiredArgs); _i8 < _Object$keys2.length; _i8++) {
            var argName = _Object$keys2[_i8];
            if (!argNodeMap[argName]) {
              var argType = requiredArgs[argName].type;
              var argTypeStr = isType(argType) ? inspect(argType) : print(argType);
              context.reportError(new GraphQLError('Directive "@'.concat(directiveName, '" argument "').concat(argName, '" of type "').concat(argTypeStr, '" is required, but it was not provided.'), directiveNode));
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
function VariablesInAllowedPositionRule(context) {
  var varDefMap = Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        varDefMap = Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          var type = _ref2.type;
          var defaultValue = _ref2.defaultValue;
          var varName = node.name.value;
          var varDef = varDefMap[varName];
          if (varDef && type) {
            var schema = context.getSchema();
            var varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(schema, varType, varDef.defaultValue, type, defaultValue)) {
              var varTypeStr = inspect(varType);
              var typeStr = inspect(type);
              context.reportError(new GraphQLError('Variable "$'.concat(varName, '" of type "').concat(varTypeStr, '" used in position expecting type "').concat(typeStr, '".'), [varDef, node]));
            }
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    var hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    var hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    var nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(function(_ref) {
      var responseName = _ref[0], subReason = _ref[1];
      return 'subfields "'.concat(responseName, '" conflict because ') + reasonMessage(subReason);
    }).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context) {
  var comparedFragmentPairs = new PairSet();
  var cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet: function SelectionSet2(selectionSet) {
      var conflicts = findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, context.getParentType(), selectionSet);
      for (var _i2 = 0; _i2 < conflicts.length; _i2++) {
        var _ref3 = conflicts[_i2];
        var _ref2$ = _ref3[0];
        var responseName = _ref2$[0];
        var reason = _ref2$[1];
        var fields1 = _ref3[1];
        var fields22 = _ref3[2];
        var reasonMsg = reasonMessage(reason);
        context.reportError(new GraphQLError('Fields "'.concat(responseName, '" conflict because ').concat(reasonMsg, ". Use different aliases on the fields to fetch both if this was intentional."), fields1.concat(fields22)));
      }
    }
  };
}
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
  var conflicts = [];
  var _getFieldsAndFragment = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet), fieldMap = _getFieldsAndFragment[0], fragmentNames = _getFieldsAndFragment[1];
  collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap);
  if (fragmentNames.length !== 0) {
    for (var i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fieldMap, fragmentNames[i]);
      for (var j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fragmentNames[i], fragmentNames[j]);
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  var fragment = context.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  var _getReferencedFieldsA = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment), fieldMap2 = _getReferencedFieldsA[0], fragmentNames2 = _getReferencedFieldsA[1];
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fieldMap2);
  for (var i = 0; i < fragmentNames2.length; i++) {
    collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentNames2[i]);
  }
}
function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(fragmentName1, fragmentName2, areMutuallyExclusive)) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  var fragment1 = context.getFragment(fragmentName1);
  var fragment2 = context.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  var _getReferencedFieldsA2 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment1), fieldMap1 = _getReferencedFieldsA2[0], fragmentNames1 = _getReferencedFieldsA2[1];
  var _getReferencedFieldsA3 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment2), fieldMap2 = _getReferencedFieldsA3[0], fragmentNames2 = _getReferencedFieldsA3[1];
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
  for (var j = 0; j < fragmentNames2.length; j++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentNames2[j]);
  }
  for (var i = 0; i < fragmentNames1.length; i++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[i], fragmentName2);
  }
}
function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  var conflicts = [];
  var _getFieldsAndFragment2 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType1, selectionSet1), fieldMap1 = _getFieldsAndFragment2[0], fragmentNames1 = _getFieldsAndFragment2[1];
  var _getFieldsAndFragment3 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType2, selectionSet2), fieldMap2 = _getFieldsAndFragment3[0], fragmentNames2 = _getFieldsAndFragment3[1];
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
  if (fragmentNames2.length !== 0) {
    for (var j = 0; j < fragmentNames2.length; j++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fragmentNames2[j]);
    }
  }
  if (fragmentNames1.length !== 0) {
    for (var i = 0; i < fragmentNames1.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap2, fragmentNames1[i]);
    }
  }
  for (var _i3 = 0; _i3 < fragmentNames1.length; _i3++) {
    for (var _j = 0; _j < fragmentNames2.length; _j++) {
      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[_i3], fragmentNames2[_j]);
    }
  }
  return conflicts;
}
function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
  for (var _i5 = 0, _objectEntries2 = objectEntries_default(fieldMap); _i5 < _objectEntries2.length; _i5++) {
    var _ref5 = _objectEntries2[_i5];
    var responseName = _ref5[0];
    var fields7 = _ref5[1];
    if (fields7.length > 1) {
      for (var i = 0; i < fields7.length; i++) {
        for (var j = i + 1; j < fields7.length; j++) {
          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, responseName, fields7[i], fields7[j]);
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (var _i7 = 0, _Object$keys2 = Object.keys(fieldMap1); _i7 < _Object$keys2.length; _i7++) {
    var responseName = _Object$keys2[_i7];
    var fields22 = fieldMap2[responseName];
    if (fields22) {
      var fields1 = fieldMap1[responseName];
      for (var i = 0; i < fields1.length; i++) {
        for (var j = 0; j < fields22.length; j++) {
          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, fields1[i], fields22[j]);
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  var parentType1 = field1[0], node1 = field1[1], def1 = field1[2];
  var parentType2 = field2[0], node2 = field2[1], def2 = field2[2];
  var areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    var _node1$arguments, _node2$arguments;
    var name1 = node1.name.value;
    var name2 = node2.name.value;
    if (name1 !== name2) {
      return [[responseName, '"'.concat(name1, '" and "').concat(name2, '" are different fields')], [node1], [node2]];
    }
    var args1 = (_node1$arguments = node1.arguments) !== null && _node1$arguments !== void 0 ? _node1$arguments : [];
    var args2 = (_node2$arguments = node2.arguments) !== null && _node2$arguments !== void 0 ? _node2$arguments : [];
    if (!sameArguments(args1, args2)) {
      return [[responseName, "they have differing arguments"], [node1], [node2]];
    }
  }
  var type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  var type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [[responseName, 'they return conflicting types "'.concat(inspect(type1), '" and "').concat(inspect(type2), '"')], [node1], [node2]];
  }
  var selectionSet1 = node1.selectionSet;
  var selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    var conflicts = findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, getNamedType(type1), selectionSet1, getNamedType(type2), selectionSet2);
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function sameArguments(arguments1, arguments2) {
  if (arguments1.length !== arguments2.length) {
    return false;
  }
  return arguments1.every(function(argument1) {
    var argument2 = find_default(arguments2, function(argument) {
      return argument.name.value === argument1.name.value;
    });
    if (!argument2) {
      return false;
    }
    return sameValue(argument1.value, argument2.value);
  });
}
function sameValue(value1, value2) {
  return print(value1) === print(value2);
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  var cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (!cached) {
    var nodeAndDefs = Object.create(null);
    var fragmentNames = Object.create(null);
    _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames);
    cached = [nodeAndDefs, Object.keys(fragmentNames)];
    cachedFieldsAndFragmentNames.set(selectionSet, cached);
  }
  return cached;
}
function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  var cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  var fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragmentType, fragment.selectionSet);
}
function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (var _i9 = 0, _selectionSet$selecti2 = selectionSet.selections; _i9 < _selectionSet$selecti2.length; _i9++) {
    var selection = _selectionSet$selecti2[_i9];
    switch (selection.kind) {
      case Kind.FIELD: {
        var fieldName = selection.name.value;
        var fieldDef = void 0;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        var responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        var typeCondition = selection.typeCondition;
        var inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(context, inlineFragmentType, selection.selectionSet, nodeAndDefs, fragmentNames);
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [[responseName, conflicts.map(function(_ref6) {
      var reason = _ref6[0];
      return reason;
    })], conflicts.reduce(function(allFields, _ref7) {
      var fields1 = _ref7[1];
      return allFields.concat(fields1);
    }, [node1]), conflicts.reduce(function(allFields, _ref8) {
      var fields22 = _ref8[2];
      return allFields.concat(fields22);
    }, [node2])];
  }
}
var PairSet = /* @__PURE__ */ function() {
  function PairSet2() {
    this._data = Object.create(null);
  }
  var _proto = PairSet2.prototype;
  _proto.has = function has(a, b, areMutuallyExclusive) {
    var first = this._data[a];
    var result = first && first[b];
    if (result === void 0) {
      return false;
    }
    if (areMutuallyExclusive === false) {
      return result === false;
    }
    return true;
  };
  _proto.add = function add(a, b, areMutuallyExclusive) {
    this._pairSetAdd(a, b, areMutuallyExclusive);
    this._pairSetAdd(b, a, areMutuallyExclusive);
  };
  _proto._pairSetAdd = function _pairSetAdd(a, b, areMutuallyExclusive) {
    var map = this._data[a];
    if (!map) {
      map = Object.create(null);
      this._data[a] = map;
    }
    map[b] = areMutuallyExclusive;
  };
  return PairSet2;
}();

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
function UniqueInputFieldNamesRule(context) {
  var knownNameStack = [];
  var knownNames = Object.create(null);
  return {
    ObjectValue: {
      enter: function enter() {
        knownNameStack.push(knownNames);
        knownNames = Object.create(null);
      },
      leave: function leave() {
        knownNames = knownNameStack.pop();
      }
    },
    ObjectField: function ObjectField2(node) {
      var fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(new GraphQLError('There can be only one input field named "'.concat(fieldName, '".'), [knownNames[fieldName], node.name]));
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;
  var oldSchema = context.getSchema();
  var alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  var schemaDefinitionsCount = 0;
  return {
    SchemaDefinition: function SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(new GraphQLError("Cannot define a new schema within a schema extension.", node));
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context.reportError(new GraphQLError("Must provide only one schema definition.", node));
      }
      ++schemaDefinitionsCount;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
function UniqueOperationTypesRule(context) {
  var schema = context.getSchema();
  var definedOperationTypes = Object.create(null);
  var existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (var _i2 = 0; _i2 < operationTypesNodes.length; _i2++) {
      var operationType = operationTypesNodes[_i2];
      var operation = operationType.operation;
      var alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context.reportError(new GraphQLError("Type for ".concat(operation, " already defined in the schema. It cannot be redefined."), operationType));
      } else if (alreadyDefinedOperationType) {
        context.reportError(new GraphQLError("There can be only one ".concat(operation, " type in schema."), [alreadyDefinedOperationType, operationType]));
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
function UniqueTypeNamesRule(context) {
  var knownTypeNames = Object.create(null);
  var schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    var typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(new GraphQLError('Type "'.concat(typeName, '" already exists in the schema. It cannot also be defined in this type definition.'), node.name));
      return;
    }
    if (knownTypeNames[typeName]) {
      context.reportError(new GraphQLError('There can be only one type named "'.concat(typeName, '".'), [knownTypeNames[typeName], node.name]));
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
function UniqueEnumValueNamesRule(context) {
  var schema = context.getSchema();
  var existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  var knownValueNames = Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    var typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = Object.create(null);
    }
    var valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    var valueNames = knownValueNames[typeName];
    for (var _i2 = 0; _i2 < valueNodes.length; _i2++) {
      var valueDef = valueNodes[_i2];
      var valueName = valueDef.name.value;
      var existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(new GraphQLError('Enum value "'.concat(typeName, ".").concat(valueName, '" already exists in the schema. It cannot also be defined in this type extension.'), valueDef.name));
      } else if (valueNames[valueName]) {
        context.reportError(new GraphQLError('Enum value "'.concat(typeName, ".").concat(valueName, '" can only be defined once.'), [valueNames[valueName], valueDef.name]));
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
function UniqueFieldDefinitionNamesRule(context) {
  var schema = context.getSchema();
  var existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  var knownFieldNames = Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    var typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = Object.create(null);
    }
    var fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    var fieldNames = knownFieldNames[typeName];
    for (var _i2 = 0; _i2 < fieldNodes.length; _i2++) {
      var fieldDef = fieldNodes[_i2];
      var fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(new GraphQLError('Field "'.concat(typeName, ".").concat(fieldName, '" already exists in the schema. It cannot also be defined in this type extension.'), fieldDef.name));
      } else if (fieldNames[fieldName]) {
        context.reportError(new GraphQLError('Field "'.concat(typeName, ".").concat(fieldName, '" can only be defined once.'), [fieldNames[fieldName], fieldDef.name]));
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
function UniqueDirectiveNamesRule(context) {
  var knownDirectiveNames = Object.create(null);
  var schema = context.getSchema();
  return {
    DirectiveDefinition: function DirectiveDefinition(node) {
      var directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context.reportError(new GraphQLError('Directive "@'.concat(directiveName, '" already exists in the schema. It cannot be redefined.'), node.name));
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context.reportError(new GraphQLError('There can be only one directive named "@'.concat(directiveName, '".'), [knownDirectiveNames[directiveName], node.name]));
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
var _defKindToExtKind;
function _defineProperty4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function PossibleTypeExtensionsRule(context) {
  var schema = context.getSchema();
  var definedTypes = Object.create(null);
  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
    var def = _context$getDocument$2[_i2];
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    var typeName = node.name.value;
    var defNode = definedTypes[typeName];
    var existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    var expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        var kindStr = extensionKindToTypeName(node.kind);
        context.reportError(new GraphQLError("Cannot extend non-".concat(kindStr, ' type "').concat(typeName, '".'), defNode ? [defNode, node] : node));
      }
    } else {
      var allTypeNames = Object.keys(definedTypes);
      if (schema) {
        allTypeNames = allTypeNames.concat(Object.keys(schema.getTypeMap()));
      }
      var suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(new GraphQLError('Cannot extend type "'.concat(typeName, '" because it is not defined.') + didYouMean(suggestedTypes), node.name));
    }
  }
}
var defKindToExtKind = (_defKindToExtKind = {}, _defineProperty4(_defKindToExtKind, Kind.SCALAR_TYPE_DEFINITION, Kind.SCALAR_TYPE_EXTENSION), _defineProperty4(_defKindToExtKind, Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION), _defineProperty4(_defKindToExtKind, Kind.INTERFACE_TYPE_DEFINITION, Kind.INTERFACE_TYPE_EXTENSION), _defineProperty4(_defKindToExtKind, Kind.UNION_TYPE_DEFINITION, Kind.UNION_TYPE_EXTENSION), _defineProperty4(_defKindToExtKind, Kind.ENUM_TYPE_DEFINITION, Kind.ENUM_TYPE_EXTENSION), _defineProperty4(_defKindToExtKind, Kind.INPUT_OBJECT_TYPE_DEFINITION, Kind.INPUT_OBJECT_TYPE_EXTENSION), _defKindToExtKind);
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant(0, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
  }
  invariant(0, "Unexpected kind: " + inspect(kind));
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/specifiedRules.mjs
var specifiedRules = Object.freeze([ExecutableDefinitionsRule, UniqueOperationNamesRule, LoneAnonymousOperationRule, SingleFieldSubscriptionsRule, KnownTypeNamesRule, FragmentsOnCompositeTypesRule, VariablesAreInputTypesRule, ScalarLeafsRule, FieldsOnCorrectTypeRule, UniqueFragmentNamesRule, KnownFragmentNamesRule, NoUnusedFragmentsRule, PossibleFragmentSpreadsRule, NoFragmentCyclesRule, UniqueVariableNamesRule, NoUndefinedVariablesRule, NoUnusedVariablesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, KnownArgumentNamesRule, UniqueArgumentNamesRule, ValuesOfCorrectTypeRule, ProvidedRequiredArgumentsRule, VariablesInAllowedPositionRule, OverlappingFieldsCanBeMergedRule, UniqueInputFieldNamesRule]);
var specifiedSDLRules = Object.freeze([LoneSchemaDefinitionRule, UniqueOperationTypesRule, UniqueTypeNamesRule, UniqueEnumValueNamesRule, UniqueFieldDefinitionNamesRule, UniqueDirectiveNamesRule, KnownTypeNamesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, PossibleTypeExtensionsRule, KnownArgumentNamesOnDirectivesRule, UniqueArgumentNamesRule, UniqueInputFieldNamesRule, ProvidedRequiredArgumentsOnDirectivesRule]);

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/ValidationContext.mjs
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var ASTValidationContext = /* @__PURE__ */ function() {
  function ASTValidationContext2(ast, onError) {
    this._ast = ast;
    this._fragments = void 0;
    this._fragmentSpreads = /* @__PURE__ */ new Map();
    this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
    this._onError = onError;
  }
  var _proto = ASTValidationContext2.prototype;
  _proto.reportError = function reportError(error) {
    this._onError(error);
  };
  _proto.getDocument = function getDocument() {
    return this._ast;
  };
  _proto.getFragment = function getFragment(name) {
    var fragments = this._fragments;
    if (!fragments) {
      this._fragments = fragments = this.getDocument().definitions.reduce(function(frags, statement) {
        if (statement.kind === Kind.FRAGMENT_DEFINITION) {
          frags[statement.name.value] = statement;
        }
        return frags;
      }, Object.create(null));
    }
    return fragments[name];
  };
  _proto.getFragmentSpreads = function getFragmentSpreads(node) {
    var spreads = this._fragmentSpreads.get(node);
    if (!spreads) {
      spreads = [];
      var setsToVisit = [node];
      while (setsToVisit.length !== 0) {
        var set = setsToVisit.pop();
        for (var _i2 = 0, _set$selections2 = set.selections; _i2 < _set$selections2.length; _i2++) {
          var selection = _set$selections2[_i2];
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }
      this._fragmentSpreads.set(node, spreads);
    }
    return spreads;
  };
  _proto.getRecursivelyReferencedFragments = function getRecursivelyReferencedFragments(operation) {
    var fragments = this._recursivelyReferencedFragments.get(operation);
    if (!fragments) {
      fragments = [];
      var collectedNames = Object.create(null);
      var nodesToVisit = [operation.selectionSet];
      while (nodesToVisit.length !== 0) {
        var node = nodesToVisit.pop();
        for (var _i4 = 0, _this$getFragmentSpre2 = this.getFragmentSpreads(node); _i4 < _this$getFragmentSpre2.length; _i4++) {
          var spread = _this$getFragmentSpre2[_i4];
          var fragName = spread.name.value;
          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            var fragment = this.getFragment(fragName);
            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }
      this._recursivelyReferencedFragments.set(operation, fragments);
    }
    return fragments;
  };
  return ASTValidationContext2;
}();
var SDLValidationContext = /* @__PURE__ */ function(_ASTValidationContext) {
  _inheritsLoose(SDLValidationContext2, _ASTValidationContext);
  function SDLValidationContext2(ast, schema, onError) {
    var _this;
    _this = _ASTValidationContext.call(this, ast, onError) || this;
    _this._schema = schema;
    return _this;
  }
  var _proto2 = SDLValidationContext2.prototype;
  _proto2.getSchema = function getSchema() {
    return this._schema;
  };
  return SDLValidationContext2;
}(ASTValidationContext);

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/validation/validate.mjs
function validateSDL(documentAST, schemaToExtend) {
  var rules = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : specifiedSDLRules;
  var errors = [];
  var context = new SDLValidationContext(documentAST, schemaToExtend, function(error) {
    errors.push(error);
  });
  var visitors = rules.map(function(rule) {
    return rule(context);
  });
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
function assertValidSDL(documentAST) {
  var errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map(function(error) {
      return error.message;
    }).join("\n\n"));
  }
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/valueFromAST.mjs
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    var variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    var variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    var itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      var coercedValues = [];
      for (var _i2 = 0, _valueNode$values2 = valueNode.values; _i2 < _valueNode$values2.length; _i2++) {
        var itemNode = _valueNode$values2[_i2];
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          var itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    var coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    var coercedObj = Object.create(null);
    var fieldNodes = keyMap(valueNode.fields, function(field2) {
      return field2.name.value;
    });
    for (var _i4 = 0, _objectValues2 = objectValues_default(type.getFields()); _i4 < _objectValues2.length; _i4++) {
      var field = _objectValues2[_i4];
      var fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      var fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    var result;
    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result === void 0) {
      return;
    }
    return result;
  }
  invariant(0, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/execution/values.mjs
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  var coercedValues = {};
  var argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  var argNodeMap = keyMap(argumentNodes, function(arg) {
    return arg.name.value;
  });
  for (var _i4 = 0, _def$args2 = def.args; _i4 < _def$args2.length; _i4++) {
    var argDef = _def$args2[_i4];
    var name = argDef.name;
    var argType = argDef.type;
    var argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError('Argument "'.concat(name, '" of required type "').concat(inspect(argType), '" ') + "was not provided.", node);
      }
      continue;
    }
    var valueNode = argumentNode.value;
    var isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      var variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError('Argument "'.concat(name, '" of required type "').concat(inspect(argType), '" ') + 'was provided the variable "$'.concat(variableName, '" which was not provided a runtime value.'), valueNode);
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError('Argument "'.concat(name, '" of non-null type "').concat(inspect(argType), '" ') + "must not be null.", valueNode);
    }
    var coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError('Argument "'.concat(name, '" has invalid value ').concat(print(valueNode), "."), valueNode);
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var directiveNode = node.directives && find_default(node.directives, function(directive) {
    return directive.name.value === directiveDef.name;
  });
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/extendSchema.mjs
function ownKeys4(object, enumerableOnly) {
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
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys4(Object(source), true).forEach(function(key) {
        _defineProperty5(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys4(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
  var typeDefs = [];
  var typeExtensionsMap = Object.create(null);
  var directiveDefs = [];
  var schemaDef;
  var schemaExtensions = [];
  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var def = _documentAST$definiti2[_i2];
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      var extendedTypeName = def.name.value;
      var existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }
  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
    return schemaConfig;
  }
  var typeMap = Object.create(null);
  for (var _i4 = 0, _schemaConfig$types2 = schemaConfig.types; _i4 < _schemaConfig$types2.length; _i4++) {
    var existingType = _schemaConfig$types2[_i4];
    typeMap[existingType.name] = extendNamedType(existingType);
  }
  for (var _i6 = 0; _i6 < typeDefs.length; _i6++) {
    var _stdTypeMap$name;
    var typeNode = typeDefs[_i6];
    var name = typeNode.name.value;
    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
  }
  var operationTypes = _objectSpread4(_objectSpread4({
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription)
  }, schemaDef && getOperationTypes([schemaDef])), getOperationTypes(schemaExtensions));
  return _objectSpread4(_objectSpread4({
    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value
  }, operationTypes), {}, {
    types: objectValues_default(typeMap),
    directives: [].concat(schemaConfig.directives.map(replaceDirective), directiveDefs.map(buildDirective)),
    extensions: void 0,
    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
  });
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    }
    if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceDirective(directive) {
    var config = directive.toConfig();
    return new GraphQLDirective(_objectSpread4(_objectSpread4({}, config), {}, {
      args: mapValue(config.args, extendArg)
    }));
  }
  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      return type;
    }
    if (isScalarType(type)) {
      return extendScalarType(type);
    }
    if (isObjectType(type)) {
      return extendObjectType(type);
    }
    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }
    if (isUnionType(type)) {
      return extendUnionType(type);
    }
    if (isEnumType(type)) {
      return extendEnumType(type);
    }
    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    invariant(0, "Unexpected type: " + inspect(type));
  }
  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
    return new GraphQLInputObjectType(_objectSpread4(_objectSpread4({}, config), {}, {
      fields: function fields7() {
        return _objectSpread4(_objectSpread4({}, mapValue(config.fields, function(field) {
          return _objectSpread4(_objectSpread4({}, field), {}, {
            type: replaceType(field.type)
          });
        })), buildInputFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendEnumType(type) {
    var _typeExtensionsMap$ty;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
    return new GraphQLEnumType(_objectSpread4(_objectSpread4({}, config), {}, {
      values: _objectSpread4(_objectSpread4({}, config.values), buildEnumValueMap(extensions)),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendScalarType(type) {
    var _typeExtensionsMap$co2;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
    var specifiedByUrl = config.specifiedByUrl;
    for (var _i8 = 0; _i8 < extensions.length; _i8++) {
      var _getSpecifiedByUrl;
      var extensionNode = extensions[_i8];
      specifiedByUrl = (_getSpecifiedByUrl = getSpecifiedByUrl(extensionNode)) !== null && _getSpecifiedByUrl !== void 0 ? _getSpecifiedByUrl : specifiedByUrl;
    }
    return new GraphQLScalarType(_objectSpread4(_objectSpread4({}, config), {}, {
      specifiedByUrl,
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendObjectType(type) {
    var _typeExtensionsMap$co3;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
    return new GraphQLObjectType(_objectSpread4(_objectSpread4({}, config), {}, {
      interfaces: function interfaces() {
        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
      },
      fields: function fields7() {
        return _objectSpread4(_objectSpread4({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
    return new GraphQLInterfaceType(_objectSpread4(_objectSpread4({}, config), {}, {
      interfaces: function interfaces() {
        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
      },
      fields: function fields7() {
        return _objectSpread4(_objectSpread4({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendUnionType(type) {
    var _typeExtensionsMap$co5;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
    return new GraphQLUnionType(_objectSpread4(_objectSpread4({}, config), {}, {
      types: function types() {
        return [].concat(type.getTypes().map(replaceNamedType), buildUnionTypes(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendField(field) {
    return _objectSpread4(_objectSpread4({}, field), {}, {
      type: replaceType(field.type),
      args: mapValue(field.args, extendArg)
    });
  }
  function extendArg(arg) {
    return _objectSpread4(_objectSpread4({}, arg), {}, {
      type: replaceType(arg.type)
    });
  }
  function getOperationTypes(nodes) {
    var opTypes = {};
    for (var _i10 = 0; _i10 < nodes.length; _i10++) {
      var _node$operationTypes;
      var node = nodes[_i10];
      var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
      for (var _i12 = 0; _i12 < operationTypesNodes.length; _i12++) {
        var operationType = operationTypesNodes[_i12];
        opTypes[operationType.operation] = getNamedType2(operationType.type);
      }
    }
    return opTypes;
  }
  function getNamedType2(node) {
    var _stdTypeMap$name2;
    var name2 = node.name.value;
    var type = (_stdTypeMap$name2 = stdTypeMap[name2]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name2];
    if (type === void 0) {
      throw new Error('Unknown type: "'.concat(name2, '".'));
    }
    return type;
  }
  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }
    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }
    return getNamedType2(node);
  }
  function buildDirective(node) {
    var locations = node.locations.map(function(_ref) {
      var value = _ref.value;
      return value;
    });
    return new GraphQLDirective({
      name: node.name.value,
      description: getDescription(node, options),
      locations,
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node
    });
  }
  function buildFieldMap(nodes) {
    var fieldConfigMap = Object.create(null);
    for (var _i14 = 0; _i14 < nodes.length; _i14++) {
      var _node$fields;
      var node = nodes[_i14];
      var nodeFields = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
      for (var _i16 = 0; _i16 < nodeFields.length; _i16++) {
        var field = nodeFields[_i16];
        fieldConfigMap[field.name.value] = {
          type: getWrappedType(field.type),
          description: getDescription(field, options),
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return fieldConfigMap;
  }
  function buildArgumentMap(args) {
    var argsNodes = args !== null && args !== void 0 ? args : [];
    var argConfigMap = Object.create(null);
    for (var _i18 = 0; _i18 < argsNodes.length; _i18++) {
      var arg = argsNodes[_i18];
      var type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description: getDescription(arg, options),
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg
      };
    }
    return argConfigMap;
  }
  function buildInputFieldMap(nodes) {
    var inputFieldMap = Object.create(null);
    for (var _i20 = 0; _i20 < nodes.length; _i20++) {
      var _node$fields2;
      var node = nodes[_i20];
      var fieldsNodes = (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : [];
      for (var _i22 = 0; _i22 < fieldsNodes.length; _i22++) {
        var field = fieldsNodes[_i22];
        var type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description: getDescription(field, options),
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return inputFieldMap;
  }
  function buildEnumValueMap(nodes) {
    var enumValueMap = Object.create(null);
    for (var _i24 = 0; _i24 < nodes.length; _i24++) {
      var _node$values;
      var node = nodes[_i24];
      var valuesNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
      for (var _i26 = 0; _i26 < valuesNodes.length; _i26++) {
        var value = valuesNodes[_i26];
        enumValueMap[value.name.value] = {
          description: getDescription(value, options),
          deprecationReason: getDeprecationReason(value),
          astNode: value
        };
      }
    }
    return enumValueMap;
  }
  function buildInterfaces(nodes) {
    var interfaces = [];
    for (var _i28 = 0; _i28 < nodes.length; _i28++) {
      var _node$interfaces;
      var node = nodes[_i28];
      var interfacesNodes = (_node$interfaces = node.interfaces) !== null && _node$interfaces !== void 0 ? _node$interfaces : [];
      for (var _i30 = 0; _i30 < interfacesNodes.length; _i30++) {
        var type = interfacesNodes[_i30];
        interfaces.push(getNamedType2(type));
      }
    }
    return interfaces;
  }
  function buildUnionTypes(nodes) {
    var types = [];
    for (var _i32 = 0; _i32 < nodes.length; _i32++) {
      var _node$types;
      var node = nodes[_i32];
      var typeNodes = (_node$types = node.types) !== null && _node$types !== void 0 ? _node$types : [];
      for (var _i34 = 0; _i34 < typeNodes.length; _i34++) {
        var type = typeNodes[_i34];
        types.push(getNamedType2(type));
      }
    }
    return types;
  }
  function buildType(astNode) {
    var _typeExtensionsMap$na;
    var name2 = astNode.name.value;
    var description = getDescription(astNode, options);
    var extensionNodes = (_typeExtensionsMap$na = typeExtensionsMap[name2]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];
    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var extensionASTNodes = extensionNodes;
        var allNodes = [astNode].concat(extensionASTNodes);
        return new GraphQLObjectType({
          name: name2,
          description,
          interfaces: function interfaces() {
            return buildInterfaces(allNodes);
          },
          fields: function fields7() {
            return buildFieldMap(allNodes);
          },
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _extensionASTNodes = extensionNodes;
        var _allNodes = [astNode].concat(_extensionASTNodes);
        return new GraphQLInterfaceType({
          name: name2,
          description,
          interfaces: function interfaces() {
            return buildInterfaces(_allNodes);
          },
          fields: function fields7() {
            return buildFieldMap(_allNodes);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes
        });
      }
      case Kind.ENUM_TYPE_DEFINITION: {
        var _extensionASTNodes2 = extensionNodes;
        var _allNodes2 = [astNode].concat(_extensionASTNodes2);
        return new GraphQLEnumType({
          name: name2,
          description,
          values: buildEnumValueMap(_allNodes2),
          astNode,
          extensionASTNodes: _extensionASTNodes2
        });
      }
      case Kind.UNION_TYPE_DEFINITION: {
        var _extensionASTNodes3 = extensionNodes;
        var _allNodes3 = [astNode].concat(_extensionASTNodes3);
        return new GraphQLUnionType({
          name: name2,
          description,
          types: function types() {
            return buildUnionTypes(_allNodes3);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes3
        });
      }
      case Kind.SCALAR_TYPE_DEFINITION: {
        var _extensionASTNodes4 = extensionNodes;
        return new GraphQLScalarType({
          name: name2,
          description,
          specifiedByUrl: getSpecifiedByUrl(astNode),
          astNode,
          extensionASTNodes: _extensionASTNodes4
        });
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _extensionASTNodes5 = extensionNodes;
        var _allNodes4 = [astNode].concat(_extensionASTNodes5);
        return new GraphQLInputObjectType({
          name: name2,
          description,
          fields: function fields7() {
            return buildInputFieldMap(_allNodes4);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes5
        });
      }
    }
    invariant(0, "Unexpected type definition node: " + inspect(astNode));
  }
}
var stdTypeMap = keyMap(specifiedScalarTypes.concat(introspectionTypes), function(type) {
  return type.name;
});
function getDeprecationReason(node) {
  var deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
}
function getSpecifiedByUrl(node) {
  var specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
}
function getDescription(node, options) {
  if (node.description) {
    return node.description.value;
  }
  if ((options === null || options === void 0 ? void 0 : options.commentDescriptions) === true) {
    var rawValue = getLeadingCommentBlock(node);
    if (rawValue !== void 0) {
      return dedentBlockStringValue("\n" + rawValue);
    }
  }
}
function getLeadingCommentBlock(node) {
  var loc = node.loc;
  if (!loc) {
    return;
  }
  var comments = [];
  var token = loc.startToken.prev;
  while (token != null && token.kind === TokenKind.COMMENT && token.next && token.prev && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    var value = String(token.value);
    comments.push(value);
    token = token.prev;
  }
  return comments.length > 0 ? comments.reverse().join("\n") : void 0;
}

// ../../node_modules/.pnpm/graphql@15.8.0/node_modules/graphql/utilities/buildASTSchema.mjs
function buildASTSchema(documentAST, options) {
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(0, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDL(documentAST);
  }
  var emptySchemaConfig = {
    description: void 0,
    types: [],
    directives: [],
    extensions: void 0,
    extensionASTNodes: [],
    assumeValid: false
  };
  var config = extendSchemaImpl(emptySchemaConfig, documentAST, options);
  if (config.astNode == null) {
    for (var _i2 = 0, _config$types2 = config.types; _i2 < _config$types2.length; _i2++) {
      var type = _config$types2[_i2];
      switch (type.name) {
        case "Query":
          config.query = type;
          break;
        case "Mutation":
          config.mutation = type;
          break;
        case "Subscription":
          config.subscription = type;
          break;
      }
    }
  }
  var directives = config.directives;
  var _loop = function _loop2(_i42) {
    var stdDirective = specifiedDirectives[_i42];
    if (directives.every(function(directive) {
      return directive.name !== stdDirective.name;
    })) {
      directives.push(stdDirective);
    }
  };
  for (var _i4 = 0; _i4 < specifiedDirectives.length; _i4++) {
    _loop(_i4);
  }
  return new GraphQLSchema(config);
}
function buildSchema(source, options) {
  var document = parse(source, {
    noLocation: options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacySDLEmptyFields: options === null || options === void 0 ? void 0 : options.allowLegacySDLEmptyFields,
    allowLegacySDLImplementsInterfaces: options === null || options === void 0 ? void 0 : options.allowLegacySDLImplementsInterfaces,
    experimentalFragmentVariables: options === null || options === void 0 ? void 0 : options.experimentalFragmentVariables
  });
  return buildASTSchema(document, {
    commentDescriptions: options === null || options === void 0 ? void 0 : options.commentDescriptions,
    assumeValidSDL: options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
}

// src/crud/mappingHelpers.ts
var import_graphql_metadata = require("graphql-metadata");
var import_pluralize = __toESM(require("pluralize"));
var import_utils = require("@graphql-tools/utils");

// src/crud/GraphbackOperationType.ts
var GraphbackOperationType = /* @__PURE__ */ ((GraphbackOperationType2) => {
  GraphbackOperationType2["CREATE"] = "create";
  GraphbackOperationType2["UPDATE"] = "update";
  GraphbackOperationType2["UPDATE_BY"] = "updateBy";
  GraphbackOperationType2["FIND"] = "find";
  GraphbackOperationType2["FIND_ONE"] = "findOne";
  GraphbackOperationType2["DELETE"] = "delete";
  GraphbackOperationType2["DELETE_BY"] = "deleteBy";
  GraphbackOperationType2["SUBSCRIPTION_CREATE"] = "subCreate";
  GraphbackOperationType2["SUBSCRIPTION_UPDATE"] = "subUpdate";
  GraphbackOperationType2["SUBSCRIPTION_DELETE"] = "subDelete";
  return GraphbackOperationType2;
})(GraphbackOperationType || {});

// src/crud/mappingHelpers.ts
function lowerCaseFirstChar(text) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
function upperCaseFirstChar(text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
var getFieldName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  switch (action) {
    case "findOne" /* FIND_ONE */:
      return `get${finalName}`;
    case "find" /* FIND */:
      return `find${(0, import_pluralize.default)(finalName)}`;
    case "deleteBy" /* DELETE_BY */:
      return `delete${(0, import_pluralize.default)(finalName)}`;
    case "updateBy" /* UPDATE_BY */:
      return `update${(0, import_pluralize.default)(finalName)}`;
    default:
      return `${action}${finalName}`;
  }
};
var getInputTypeName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  switch (action) {
    case "find" /* FIND */:
      return `${finalName}Filter`;
    case "create" /* CREATE */:
      return `Create${finalName}Input`;
    case "update" /* UPDATE */:
    case "delete" /* DELETE */:
    case "updateBy" /* UPDATE_BY */:
    case "deleteBy" /* DELETE_BY */:
      return `Mutate${finalName}Input`;
    case "subCreate" /* SUBSCRIPTION_CREATE */:
    case "subUpdate" /* SUBSCRIPTION_UPDATE */:
    case "subDelete" /* SUBSCRIPTION_DELETE */:
      return `${finalName}SubscriptionFilter`;
    default:
      return "";
  }
};
var getSubscriptionName = (typeName, action) => {
  const finalName = upperCaseFirstChar(typeName);
  if (action === "create" /* CREATE */) {
    return `new${finalName}`;
  }
  if (action === "update" /* UPDATE */) {
    return `updated${finalName}`;
  }
  if (action === "delete" /* DELETE */) {
    return `deleted${finalName}`;
  }
  return "";
};
function isModelType(graphqlType) {
  return !!(0, import_graphql_metadata.parseMetadata)("model", graphqlType.description);
}
function filterModelTypes(schema) {
  return (0, import_utils.getUserTypesFromSchema)(schema).filter(isModelType);
}
function filterNonModelTypes(schema) {
  return (0, import_utils.getUserTypesFromSchema)(schema).filter((t) => !isModelType(t));
}
function getUserModels(modelTypes) {
  return modelTypes.filter(isModelType);
}
function isInputField(field) {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);
  return !relationshipAnnotation || relationshipAnnotation.kind !== "oneToMany";
}
function getRelationFieldName(field, type) {
  let fieldName;
  if (field.annotations.OneToOne) {
    fieldName = field.annotations.OneToOne.field;
  } else if (field.annotations.ManyToOne) {
    fieldName = field.annotations.ManyToOne.field;
  } else if (field.annotations.OneToMany) {
    fieldName = field.annotations.OneToMany.field;
  } else {
    fieldName = type.name;
  }
  return fieldName;
}
function getInputFieldName(field) {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);
  if (!relationshipAnnotation) {
    return field.name;
  }
  if (relationshipAnnotation.kind === "oneToMany") {
    throw new Error("Not inputtable field!");
  }
  return relationshipAnnotation.key || transformForeignKeyName(field.name);
}
function getInputFieldTypeName(modelName, field, operation) {
  const fieldType = getNamedType(field.type);
  if (isObjectType(fieldType) && isModelType(fieldType)) {
    const relationshipAnnotation = parseRelationshipAnnotation(field.description);
    if (!relationshipAnnotation) {
      throw new Error(`Missing relationship definition on: "${modelName}.${field.name}". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
    }
    const idField = getPrimaryKey(fieldType);
    return getNamedType(idField.type).name;
  }
  if (isScalarType(fieldType) || isEnumType(fieldType)) {
    return fieldType.name;
  }
  if (isObjectType(fieldType) && !isModelType(fieldType)) {
    if (operation === "find" /* FIND */) {
      return void 0;
    }
    return getInputTypeName(fieldType.name, operation);
  }
  return void 0;
}

// src/plugin/GraphbackPlugin.ts
var GraphbackPlugin = class {
  transformSchema(metadata) {
    return metadata.getSchema();
  }
  createResources(metadata) {
    return void 0;
  }
  createResolvers(metadata) {
    return void 0;
  }
  logWarning(message) {
    console.log(`Warning - ${this.getPluginName()}: ${message}`);
  }
  logError(message) {
    console.error(`Error - ${this.getPluginName()}: ${message}`);
  }
};

// src/plugin/GraphbackCoreMetadata.ts
var import_graphql_metadata7 = require("graphql-metadata");
var import_merge = require("@graphql-tools/merge");
var import_utils2 = require("@graphql-tools/utils");

// src/db/defaultNameTransforms.ts
function defaultTableNameTransform(name, direction) {
  if (direction === "to-db") {
    return name.toLowerCase();
  }
  return name;
}
function transformForeignKeyName(name, direction = "to-db") {
  if (direction === "to-db") {
    return `${name}Id`;
  }
  return name;
}

// src/db/buildModelTableMap.ts
var import_graphql_metadata3 = require("graphql-metadata");

// src/db/getPrimaryKey.ts
var import_graphql_metadata2 = require("graphql-metadata");
function getPrimaryKey(graphqlType) {
  const fields7 = Object.values(graphqlType.getFields());
  const autoPrimaryKeyFromScalar = [];
  let primaryKey;
  let primariesCount = 0;
  for (const field of fields7) {
    const hasIdMarker = (0, import_graphql_metadata2.parseMetadata)("id", field);
    if (hasIdMarker) {
      primaryKey = field;
      primariesCount += 1;
    } else if (isAutoPrimaryKey(field)) {
      autoPrimaryKeyFromScalar.push(field);
    }
  }
  if (primariesCount > 1) {
    throw new Error(`${graphqlType.name} type should not have multiple '@id' annotations.`);
  }
  if (primaryKey) {
    return primaryKey;
  }
  if (autoPrimaryKeyFromScalar.length > 1) {
    throw new Error(`${graphqlType.name} type should not have two potential primary keys: "_id" and "id". Use '@id' annotations to indicate which one is to be used.`);
  }
  primaryKey = autoPrimaryKeyFromScalar.shift();
  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`);
  }
  return primaryKey;
}
function isAutoPrimaryKey(field) {
  const { type, name: fieldName } = field;
  const baseType = getNamedType(type);
  const name = baseType.name;
  return (fieldName === "id" && name === "ID" || fieldName === "_id" && name === "GraphbackObjectID") && isScalarType(baseType);
}

// src/db/buildModelTableMap.ts
function getTableName(model) {
  let tableName = defaultTableNameTransform(model.name, "to-db");
  const dbAnnotations = (0, import_graphql_metadata3.parseMetadata)("db", model);
  if (dbAnnotations && dbAnnotations.name) {
    tableName = dbAnnotations.name;
  }
  return tableName;
}
function getColumnName(field) {
  let columnName = field.name;
  const dbAnnotations = (0, import_graphql_metadata3.parseMetadata)("db", field);
  if (dbAnnotations && dbAnnotations.name) {
    columnName = dbAnnotations.name;
  }
  return columnName;
}
function mapFieldsToColumns(fieldMap) {
  return Object.values(fieldMap).reduce((obj, field) => {
    const columnName = getColumnName(field);
    if (field.name !== columnName) {
      obj[field.name] = columnName;
    }
    return obj;
  }, {});
}
var buildModelTableMap = (model) => {
  const primaryKeyField = getPrimaryKey(model);
  const tableName = getTableName(model);
  const fieldMap = mapFieldsToColumns(model.getFields());
  return {
    idField: getColumnName(primaryKeyField),
    typeName: model.name,
    tableName,
    fieldMap
  };
};

// src/db/dataMapper.ts
function getTableId(idField, data) {
  if (!idField) {
    return void 0;
  }
  ;
  let value;
  if (data && data[idField]) {
    value = data[idField];
  }
  return {
    name: idField,
    value
  };
}
var getDatabaseArguments = (modelMap, data) => {
  const idField = modelMap.idField;
  let transFormedData;
  if (data) {
    const keys = Object.keys(data);
    transFormedData = {};
    for (const key of keys) {
      const value = data[key];
      transFormedData[key] = value && typeof value === "object" ? JSON.stringify(value) : value;
    }
  }
  ;
  return {
    idField: getTableId(idField, data),
    data: transFormedData
  };
};

// src/relationships/RelationshipMetadataBuilder.ts
var import_graphql_metadata5 = require("graphql-metadata");

// src/utils/hasListType.ts
function hasListType(outputType) {
  if (isListType(outputType)) {
    return true;
  } else if (isWrappingType(outputType)) {
    return hasListType(outputType.ofType);
  }
  return false;
}

// src/relationships/relationshipHelpers.ts
var import_graphql_metadata4 = require("graphql-metadata");
function parseRelationshipAnnotation(description = "") {
  const relationshipKinds = ["oneToMany", "oneToOne", "manyToOne"];
  for (const kind of relationshipKinds) {
    const annotation = (0, import_graphql_metadata4.parseMetadata)(kind, description);
    if (!annotation) {
      continue;
    }
    if (!annotation.field && kind !== "oneToOne") {
      throw new Error(`'field' is required on "${kind}" relationship annotations`);
    }
    return __spreadValues({
      kind
    }, annotation);
  }
  return void 0;
}
function isOneToManyField(field) {
  const oneToManyAnnotation = (0, import_graphql_metadata4.parseMetadata)("oneToMany", field.description);
  return !!oneToManyAnnotation;
}
var relationshipFieldDescriptionTemplate = (relationshipKind, fieldName, columnKey) => {
  return `@${relationshipKind}(field: '${fieldName}', key: '${columnKey}')`;
};
var relationshipOneToOneFieldDescriptionTemplate = (relationshipKind, columnKey) => {
  return `@${relationshipKind}(key: '${columnKey}')`;
};
function addRelationshipFields(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  const fieldsObj = {};
  for (const current of model.relationships) {
    if (!modelFields[current.ownerField.name]) {
      fieldsObj[current.ownerField.name] = {
        type: current.ownerField.type,
        description: current.ownerField.description
      };
    }
  }
  typeComposer.addFields(fieldsObj);
}
function extendRelationshipFields(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  for (const fieldRelationship of model.relationships) {
    if (modelFields[fieldRelationship.ownerField.name]) {
      const modelField = modelFields[fieldRelationship.ownerField.name];
      const partialConfig = {
        type: modelField.type,
        description: fieldRelationship.ownerField.description
      };
      typeComposer.extendField(fieldRelationship.ownerField.name, partialConfig);
    }
  }
}
function extendOneToManyFieldArguments(model, typeComposer) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();
  for (const current of model.relationships) {
    if (modelFields[current.ownerField.name]) {
      const fieldNamedType = getNamedType(current.ownerField.type);
      if (current.kind !== "oneToMany") {
        continue;
      }
      const partialConfig = {
        args: {
          filter: getInputTypeName(fieldNamedType.name, "find" /* FIND */)
        }
      };
      typeComposer.extendField(current.ownerField.name, partialConfig);
    }
  }
}

// src/relationships/RelationshipMetadataBuilder.ts
var RelationshipMetadataBuilder = class {
  modelTypes;
  relationships;
  constructor(modelTypes) {
    this.relationships = [];
    this.modelTypes = modelTypes;
  }
  build() {
    for (const modelType of this.modelTypes) {
      this.buildModelRelationshipContext(modelType);
    }
  }
  getRelationships() {
    return this.relationships;
  }
  getModelRelationships(modelName) {
    return this.relationships.filter((relationship) => relationship.owner.name === modelName);
  }
  buildModelRelationshipContext(modelType) {
    const fields7 = Object.values(modelType.getFields());
    for (let field of fields7) {
      const annotation = parseRelationshipAnnotation(field.description);
      if (!annotation) {
        continue;
      }
      this.validateRelationshipField(modelType.name, field, annotation);
      const relationType = getNamedType(field.type);
      let relationField = relationType.getFields()[annotation.field];
      if (annotation.kind === "oneToMany") {
        field = this.updateOneToManyField(field, annotation.field, annotation.key);
        if (!relationField) {
          relationField = this.createManyToOneField(annotation.field, modelType, field.name, annotation.key);
        } else {
          relationField = this.updateManyToOneField(relationField, field.name, annotation.key);
        }
        const oneToManyAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description);
        const manyToOneAnnotation = parseRelationshipAnnotation(relationField.description);
        this.addOneToMany(modelType, field, oneToManyAnnotation, manyToOneAnnotation);
        this.addManyToOne(relationType, relationField, manyToOneAnnotation);
      } else if (annotation.kind === "manyToOne") {
        if (!relationField) {
          relationField = this.createOneToManyField(annotation.field, modelType, field.name, annotation.key);
        }
        const oneToManyAnnotation = parseRelationshipAnnotation(relationField.description);
        this.addManyToOne(modelType, field, annotation);
        this.addOneToMany(relationType, relationField, oneToManyAnnotation, annotation);
      } else if (annotation.kind === "oneToOne") {
        field = this.updateOneToOneField(field, annotation.key);
        const oneToOneAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description);
        this.addOneToOne(modelType, field, oneToOneAnnotation);
      }
    }
  }
  createOneToManyField(fieldName, baseType, relationFieldName, columnName) {
    const columnField = columnName || transformForeignKeyName(relationFieldName);
    const fieldDescription = relationshipFieldDescriptionTemplate("oneToMany", relationFieldName, columnField);
    const fieldType = GraphQLNonNull(GraphQLList(baseType));
    return {
      name: fieldName,
      description: fieldDescription,
      type: fieldType,
      args: [],
      extensions: [],
      isDeprecated: false,
      deprecationReason: void 0
    };
  }
  createManyToOneField(fieldName, baseType, relationFieldName, columnName) {
    const columnField = columnName || transformForeignKeyName(fieldName);
    const fieldDescription = relationshipFieldDescriptionTemplate("manyToOne", relationFieldName, columnField);
    return {
      name: fieldName,
      description: fieldDescription,
      type: baseType,
      args: [],
      extensions: [],
      isDeprecated: false,
      deprecationReason: void 0
    };
  }
  updateOneToManyField(field, relationFieldName, columnName) {
    if (!columnName) {
      const columnField = transformForeignKeyName(relationFieldName);
      const fieldDescription = relationshipFieldDescriptionTemplate("oneToMany", relationFieldName, columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  updateManyToOneField(field, relationFieldName, columnName) {
    const manyToOneMetadata = (0, import_graphql_metadata5.parseMetadata)("manyToOne", field.description);
    if (!manyToOneMetadata || !manyToOneMetadata.key) {
      const columnField = columnName || transformForeignKeyName(field.name);
      const fieldDescription = relationshipFieldDescriptionTemplate("manyToOne", relationFieldName, columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  updateOneToOneField(field, columnName) {
    if (!columnName) {
      const columnField = transformForeignKeyName(field.name);
      const fieldDescription = relationshipOneToOneFieldDescriptionTemplate("oneToOne", columnField);
      const oldDescription = field.description ? `
${field.description}` : "";
      return __spreadProps(__spreadValues({}, field), {
        description: `${fieldDescription}${oldDescription}`
      });
    }
    return field;
  }
  addOneToMany(ownerType, field, oneToManyAnnotation, corresspondingManyToOneMetadata) {
    this.validateOneToManyRelationship(ownerType.name, field, oneToManyAnnotation, corresspondingManyToOneMetadata);
    if (!oneToManyAnnotation.key) {
      return;
    }
    const relationType = getNamedType(field.type);
    const oneToMany = {
      kind: "oneToMany",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToManyAnnotation.field,
      relationForeignKey: oneToManyAnnotation.key
    };
    this.relationships.push(oneToMany);
  }
  addManyToOne(ownerType, field, manyToOneAnnotation) {
    this.validateManyToOneField(ownerType.name, field, manyToOneAnnotation);
    if (!manyToOneAnnotation.key) {
      return;
    }
    const relationType = getNamedType(field.type);
    const manyToOne = {
      kind: "manyToOne",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: manyToOneAnnotation.field,
      relationForeignKey: manyToOneAnnotation.key
    };
    this.relationships.push(manyToOne);
  }
  addOneToOne(ownerType, field, oneToOneAnnotation) {
    this.validateOneToOneRelationship(ownerType.name, field, oneToOneAnnotation);
    if (!oneToOneAnnotation.key) {
      return;
    }
    const relationType = getNamedType(field.type);
    const oneToOne = {
      kind: "oneToOne",
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToOneAnnotation.field,
      relationForeignKey: oneToOneAnnotation.key
    };
    this.relationships.push(oneToOne);
  }
  validateOneToManyRelationship(modelName, field, oneToManyMetadata, corresspondingManyToOneMetadata) {
    this.validateRelationshipField(modelName, field, oneToManyMetadata);
    if (oneToManyMetadata.kind !== "oneToMany") {
      throw new Error(`${modelName}.${field.name} should be a @oneToMany field, but has a @${oneToManyMetadata.kind} annotation`);
    }
    const relationModelType = getNamedType(field.type);
    const relationField = relationModelType.getFields()[oneToManyMetadata.field];
    if (!relationField) {
      return;
    }
    if (hasListType(relationField.type)) {
      throw new Error(`${relationModelType.name}.${relationField.name} is a list type, but should be '${relationField.name}: ${modelName}'.`);
    }
    const relationFieldBaseType = getNamedType(relationField.type);
    if (!isObjectType(relationFieldBaseType) || relationFieldBaseType.name !== modelName) {
      throw new Error(`${modelName}.${field.name} relationship field maps to ${relationModelType.name}.${relationField.name} (${relationFieldBaseType.name} type) which should be ${modelName} type.`);
    }
    if ((oneToManyMetadata == null ? void 0 : oneToManyMetadata.key) !== (corresspondingManyToOneMetadata == null ? void 0 : corresspondingManyToOneMetadata.key)) {
      throw new Error(`${modelName}.${field.name} and ${relationModelType.name}.${relationField.name} 'key' annotations are different. Ensure both are the same, or remove one so that it can be generated.`);
    }
  }
  validateManyToOneField(modelName, field, manyToOneAnnotation) {
    this.validateRelationshipField(modelName, field, manyToOneAnnotation);
    if (manyToOneAnnotation.kind !== "manyToOne") {
      throw new Error(`${modelName}.${field.name} should be a @manyToOne field, but has a @${manyToOneAnnotation.kind} annotation`);
    }
  }
  validateOneToOneRelationship(modelName, field, oneToOneAnnotation) {
    this.validateRelationshipField(modelName, field, oneToOneAnnotation);
    if (oneToOneAnnotation.kind !== "oneToOne") {
      throw new Error(`${modelName}.${field.name} should be a @oneToOne field, but has a ${oneToOneAnnotation.kind} annotation`);
    }
    if (hasListType(field.type)) {
      throw new Error(`${modelName}.${field.name} is a list type, but should be an object.`);
    }
  }
  validateRelationshipField(modelName, field, relationshipAnnotation) {
    if (!relationshipAnnotation) {
      throw new Error(`${modelName}.${field.name} is missing a relationship annotation.`);
    }
    const fieldBaseType = getNamedType(field.type);
    if (!isObjectType(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but has type ${fieldBaseType.name}. Relationship fields must be object types.`);
    }
    if (!isModelType(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but type ${fieldBaseType.name} is missing the @model annotation.`);
    }
  }
};

// src/utils/isTransientField.ts
var import_graphql_metadata6 = require("graphql-metadata");
function isTransientField(field) {
  return (0, import_graphql_metadata6.parseMetadata)("transient", field);
}

// src/plugin/GraphbackCoreMetadata.ts
var defaultCRUDGeneratorConfig = {
  "create": true,
  "update": true,
  "updateBy": true,
  "findOne": true,
  "find": true,
  "delete": true,
  "deleteBy": true,
  "subCreate": true,
  "subUpdate": true,
  "subDelete": true
};
var GraphbackCoreMetadata = class {
  supportedCrudMethods;
  schema;
  resolvers;
  models;
  constructor(globalConfig, schema) {
    this.schema = schema;
    this.supportedCrudMethods = Object.assign({}, defaultCRUDGeneratorConfig, globalConfig == null ? void 0 : globalConfig.crudMethods);
  }
  getSchema() {
    return this.schema;
  }
  setSchema(newSchema) {
    this.schema = newSchema;
  }
  addResolvers(resolvers) {
    if (resolvers) {
      const mergedResolvers = [
        this.resolvers,
        resolvers
      ];
      this.resolvers = (0, import_merge.mergeResolvers)(mergedResolvers);
    }
  }
  getResolvers() {
    return this.resolvers;
  }
  getModelDefinitions() {
    this.models = [];
    const modelTypes = this.getGraphQLTypesWithModel();
    const relationshipBuilder = new RelationshipMetadataBuilder(modelTypes);
    relationshipBuilder.build();
    for (const modelType of modelTypes) {
      const model = this.buildModel(modelType, relationshipBuilder.getModelRelationships(modelType.name));
      this.models.push(model);
    }
    return this.models;
  }
  getGraphQLTypesWithModel() {
    const types = (0, import_utils2.getUserTypesFromSchema)(this.schema);
    return types.filter((modelType) => (0, import_graphql_metadata7.parseMetadata)("model", modelType));
  }
  buildModel(modelType, relationships) {
    let crudOptions = (0, import_graphql_metadata7.parseMetadata)("model", modelType);
    crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions);
    const { type: primaryKeyType, name } = getPrimaryKey(modelType);
    const primaryKey = {
      name,
      type: getNamedType(primaryKeyType).name
    };
    const modelFields = modelType.getFields();
    const fields7 = {};
    for (const field of Object.keys(modelFields)) {
      let fieldName = field;
      let type = "";
      const graphqlField = modelFields[field];
      if (isTransientField(graphqlField)) {
        fields7[field] = {
          name: field,
          transient: true,
          type: getNamedType(graphqlField.type).name
        };
        continue;
      }
      const foundRelationship = relationships.find((relationship) => relationship.ownerField.name === field);
      if (foundRelationship) {
        if (foundRelationship.kind !== "oneToMany") {
          fieldName = foundRelationship.relationForeignKey;
          type = getNamedType(foundRelationship.relationType).name;
        } else {
          fieldName = primaryKey.name;
          type = primaryKey.type;
        }
      } else {
        type = getNamedType(modelFields[field].type).name;
      }
      fields7[field] = {
        name: fieldName,
        type,
        transient: false
      };
    }
    return {
      fields: fields7,
      primaryKey,
      crudOptions,
      relationships,
      graphqlType: modelType
    };
  }
};

// src/plugin/GraphbackPluginEngine.ts
var GraphbackPluginEngine = class {
  plugins;
  metadata;
  constructor({ schema, config, plugins }) {
    this.plugins = plugins || [];
    if (!schema) {
      throw new Error("Plugin engine requires schema");
    }
    let graphQLSchema;
    if (typeof schema === "string") {
      graphQLSchema = buildSchema(schema);
    } else {
      graphQLSchema = schema;
    }
    this.metadata = new GraphbackCoreMetadata(config, graphQLSchema);
  }
  registerPlugin(...plugins) {
    this.plugins.push(...plugins);
  }
  createResources() {
    if (this.plugins.length === 0) {
      console.warn("GraphbackEngine: No Graphback plugins registered");
    }
    this.createSchema();
    this.createResolvers();
    for (const plugin of this.plugins) {
      plugin.createResources(this.metadata);
    }
    return this.metadata;
  }
  createSchema() {
    for (const plugin of this.plugins) {
      const newSchema = plugin.transformSchema(this.metadata);
      this.metadata.setSchema(newSchema);
    }
  }
  createResolvers() {
    for (const plugin of this.plugins) {
      const resolvers = plugin.createResolvers(this.metadata);
      this.metadata.addResolvers(resolvers);
    }
  }
};

// src/plugin/ModelDefinition.ts
function getModelByName(name, models) {
  if (!models) {
    return void 0;
  }
  return models.find((m) => m.graphqlType.name === name);
}

// src/plugin/getSelectedFieldsFromResolverInfo.ts
var import_graphql_fields_list = require("graphql-fields-list");
var getSelectedFieldsFromResolverInfo = (info, model, path) => {
  const resolverFields = Object.keys((0, import_graphql_fields_list.fieldsMap)(info, { path }));
  return getModelFieldsFromResolverFields(resolverFields, model);
};
var getModelFieldsFromResolverFields = (resolverFields, model) => {
  const selectedFields = /* @__PURE__ */ new Set();
  for (const key of resolverFields) {
    const correspondingFieldInDatabase = model.fields[key];
    if (correspondingFieldInDatabase && !correspondingFieldInDatabase.transient) {
      selectedFields.add(correspondingFieldInDatabase.name);
    }
  }
  return [...selectedFields];
};
var getResolverInfoFieldsList = (info, path) => (0, import_graphql_fields_list.fieldsList)(info, { path });

// src/utils/printSchemaWithDirectives.ts
var import_graphql_compose = require("graphql-compose");
function printSchemaWithDirectives(schemaOrSDL) {
  const schemaComposer = new import_graphql_compose.SchemaComposer(schemaOrSDL);
  return schemaComposer.toSDL({ exclude: ["String", "ID", "Boolean", "Float", "Int"] });
}

// src/utils/metadataAnnotations.ts
var metadataMap = {
  markers: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    versioned: "versioned"
  },
  fieldNames: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
};

// src/utils/fieldTransformHelpers.ts
var import_graphql_metadata8 = require("graphql-metadata");
var TransformType = /* @__PURE__ */ ((TransformType2) => {
  TransformType2["UPDATE"] = "onUpdateFieldTransform";
  TransformType2["CREATE"] = "onCreateFieldTransform";
  return TransformType2;
})(TransformType || {});
function getFieldTransformations(baseType) {
  const fieldMap = baseType.getFields();
  const fieldTransformMap = {
    ["onCreateFieldTransform" /* CREATE */]: [],
    ["onUpdateFieldTransform" /* UPDATE */]: []
  };
  for (const field of Object.values(fieldMap)) {
    if ((0, import_graphql_metadata8.parseMetadata)("updatedAt", field.description)) {
      fieldTransformMap["onUpdateFieldTransform" /* UPDATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
      fieldTransformMap["onCreateFieldTransform" /* CREATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
    if ((0, import_graphql_metadata8.parseMetadata)("createdAt", field.description)) {
      fieldTransformMap["onCreateFieldTransform" /* CREATE */].push({
        fieldName: field.name,
        transform: () => {
          return new Date().getTime();
        }
      });
    }
  }
  return fieldTransformMap;
}

// src/runtime/CRUDService.ts
var import_dataloader = __toESM(require("dataloader"));
var import_graphql_subscriptions = require("graphql-subscriptions");

// src/utils/convertType.ts
var import_bson = require("bson");
function convertType(value, toType) {
  if (!value) {
    return void 0;
  }
  if (toType instanceof import_bson.ObjectID || value instanceof import_bson.ObjectID) {
    return new import_bson.ObjectID(value);
  }
  switch (typeof toType) {
    case "string":
      return String(value);
    case "number":
      return Number(value);
    case "bigint":
      return BigInt(value);
    case "boolean":
      return Boolean(value);
    case "object":
      if (isDateObject(value)) {
        return new Date(value).getTime();
      }
      return value;
    default:
      return String(value);
  }
}
var isDateObject = (value) => Object.prototype.toString.call(value) === "[object Date]";

// src/scalars/objectId.ts
var import_bson2 = require("bson");
function isObjectID(value) {
  if (value instanceof import_bson2.ObjectID) {
    return true;
  }
  try {
    const BsonExtObjectID = require("bson-ext").ObjectID;
    return value instanceof BsonExtObjectID;
  } catch {
  }
  return false;
}
function parseObjectID(value) {
  let ObjectID2 = import_bson2.ObjectID;
  try {
    ObjectID2 = require("bson-ext").ObjectID;
  } catch {
  }
  return new ObjectID2(value);
}
function getObjectIDTimestamp(value) {
  return value.getTimestamp();
}

// src/runtime/createInMemoryFilterPredicate.ts
var predicateMap = {
  eq: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return (parsedFieldValue == null ? void 0 : parsedFieldValue.toString()) === (parsedFilterValue == null ? void 0 : parsedFilterValue.toString());
  },
  ne: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return (parsedFilterValue == null ? void 0 : parsedFilterValue.toString()) !== (parsedFieldValue == null ? void 0 : parsedFieldValue.toString());
  },
  gt: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    return parsedFieldValue > parsedFilterValue;
  },
  ge: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
      return getObjectIDTimestamp(parsedFieldValue) >= getObjectIDTimestamp(parsedFilterValue);
    }
    return parsedFieldValue >= parsedFilterValue;
  },
  le: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
      return getObjectIDTimestamp(parsedFieldValue) <= getObjectIDTimestamp(parsedFilterValue);
    }
    return parsedFieldValue <= parsedFilterValue;
  },
  lt: (filterValue) => (fieldValue) => {
    const parsedFieldValue = convertType(fieldValue, filterValue);
    const parsedFilterValue = convertType(filterValue, parsedFieldValue);
    if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
      return getObjectIDTimestamp(parsedFieldValue) < getObjectIDTimestamp(parsedFilterValue);
    }
    return parsedFieldValue < parsedFilterValue;
  },
  in: (filterValue) => (fieldValue) => {
    return filterValue.map((f) => f == null ? void 0 : f.toString()).includes(fieldValue == null ? void 0 : fieldValue.toString());
  },
  between: ([fromVal, toVal]) => (fieldValue) => {
    if (isDateObject(fieldValue)) {
      const fieldValDate = convertType(fieldValue, fieldValue);
      const fromValDate = convertType(fromVal, fieldValue);
      const toValDate = convertType(toVal, fieldValue);
      return fieldValDate >= fromValDate && fieldValDate <= toValDate;
    }
    if (isObjectID(fromVal) || isObjectID(toVal) || isObjectID(fieldValue)) {
      const toValTimestamp = getObjectIDTimestamp(parseObjectID(toVal.toString()));
      const fromValTimestamp = getObjectIDTimestamp(parseObjectID(fromVal.toString()));
      const fieldValTimestamp = getObjectIDTimestamp(parseObjectID(fieldValue.toString()));
      return fieldValTimestamp >= fromValTimestamp && fieldValTimestamp <= toValTimestamp;
    }
    const parsedFieldValue = Number(fieldValue);
    return parsedFieldValue >= Number(fromVal) && parsedFieldValue <= Number(toVal);
  },
  contains: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().includes(filterValue == null ? void 0 : filterValue.toString());
  },
  startsWith: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().startsWith(filterValue == null ? void 0 : filterValue.toString());
  },
  endsWith: (filterValue = "") => (fieldValue = "") => {
    return fieldValue == null ? void 0 : fieldValue.toString().endsWith(filterValue == null ? void 0 : filterValue.toString());
  }
};
function createInMemoryFilterPredicate(filter) {
  filter = filter || {};
  const andFilter = filter.and;
  const orFilter = filter.or;
  const notFilter = filter.not;
  const filterFields = Object.keys(filter).filter((key) => !["and", "or", "not"].includes(key));
  return (payload) => {
    let predicateResult = true;
    for (const fieldName of filterFields) {
      if (["and", "or", "not"].includes(fieldName)) {
        continue;
      }
      const fieldFilter = filter[fieldName];
      for (const [expr, exprVal] of Object.entries(fieldFilter)) {
        const predicateFn = predicateMap[expr](exprVal);
        if (!predicateFn(payload[fieldName])) {
          predicateResult = false;
          break;
        }
      }
    }
    if (orFilter) {
      const orPredicateResult = getOrPredicateResult(orFilter, payload);
      predicateResult = predicateResult && orPredicateResult;
      if (!predicateResult) {
        return false;
      }
    }
    if (andFilter) {
      const andPredicateResult = getAndPredicateResult(andFilter, payload);
      predicateResult = predicateResult && andPredicateResult;
    }
    if (notFilter) {
      const notPredicateResult = createInMemoryFilterPredicate(notFilter)(payload);
      predicateResult = predicateResult && !notPredicateResult;
    }
    return predicateResult;
  };
}
function getAndPredicateResult(and, payload) {
  let andResult = true;
  for (const andItem of and) {
    andResult = createInMemoryFilterPredicate(andItem)(payload);
    if (!andResult) {
      break;
    }
  }
  return andResult;
}
function getOrPredicateResult(or, payload) {
  let orResult = true;
  for (const orItem of or) {
    orResult = createInMemoryFilterPredicate(orItem)(payload);
    if (orResult) {
      break;
    }
  }
  return orResult;
}

// src/runtime/CRUDService.ts
var CRUDService = class {
  db;
  model;
  pubSub;
  crudOptions;
  constructor(model, db, config) {
    this.model = model;
    this.crudOptions = config.crudOptions;
    this.db = db;
    this.pubSub = config.pubSub;
  }
  async create(data, context, info) {
    let selectedFields;
    if (info && !this.crudOptions.subCreate) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }
    const result = await this.db.create(data, selectedFields);
    if (this.pubSub && this.crudOptions.subCreate) {
      const topic = this.subscriptionTopicMapping("create" /* CREATE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("new", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async update(data, context, info) {
    const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    const result = await this.db.update(data, selectedFields);
    if (this.pubSub && this.crudOptions.subUpdate) {
      const topic = this.subscriptionTopicMapping("update" /* UPDATE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("updated", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async updateBy(args, context, info) {
    const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    const result = await this.db.updateBy(args, selectedFields);
    return {
      items: result
    };
  }
  async delete(data, context, info) {
    const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    const result = await this.db.delete(data, selectedFields);
    if (this.pubSub && this.crudOptions.subDelete) {
      const topic = this.subscriptionTopicMapping("delete" /* DELETE */, this.model.graphqlType.name);
      const payload = this.buildEventPayload("deleted", result);
      this.pubSub.publish(topic, payload).catch((error) => {
        console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
      });
    }
    return result;
  }
  async deleteBy(args, context, info) {
    const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    const result = await this.db.deleteBy(args, selectedFields);
    return {
      items: result
    };
  }
  findOne(args, context, info) {
    let selectedFields;
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
    }
    return this.db.findOne(args, selectedFields);
  }
  async findBy(args, context, info, path) {
    let selectedFields;
    let requestedCount = false;
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model, path);
      requestedCount = path === "items" && getResolverInfoFieldsList(info).some((field) => field === "count");
    }
    const items = await this.db.findBy(args, selectedFields);
    const resultPageInfo = __spreadValues({
      offset: 0
    }, args == null ? void 0 : args.page);
    let count;
    if (requestedCount) {
      count = await this.db.count(args.filter);
    }
    return __spreadValues({
      items,
      count,
      offset: 0
    }, resultPageInfo);
  }
  subscribeToCreate(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "create" /* CREATE */;
    const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(createSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return (0, import_graphql_subscriptions.withFilter)(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  subscribeToUpdate(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "update" /* UPDATE */;
    const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(updateSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return (0, import_graphql_subscriptions.withFilter)(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  subscribeToDelete(filter) {
    if (!this.pubSub) {
      throw Error("Missing PubSub implementation in CRUDService");
    }
    const operationType = "delete" /* DELETE */;
    const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
    const asyncIterator = this.pubSub.asyncIterator(deleteSubKey);
    const subscriptionFilter = createInMemoryFilterPredicate(filter);
    return (0, import_graphql_subscriptions.withFilter)(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
  }
  batchLoadData(relationField, id, filter, context, info) {
    const selectedFields = [];
    if (info) {
      const selectedFieldsFromInfo = getSelectedFieldsFromResolverInfo(info, this.model);
      selectedFields.push(...selectedFieldsFromInfo);
      if (selectedFields.length) {
        selectedFields.push(relationField);
      }
    }
    const fetchedKeys = selectedFields.join("-");
    const keyName = `${this.model.graphqlType.name}-${upperCaseFirstChar(relationField)}-${fetchedKeys}-${JSON.stringify(filter)}-DataLoader`;
    if (!context[keyName]) {
      context[keyName] = new import_dataloader.default((keys) => {
        return this.db.batchRead(relationField, keys, filter, selectedFields);
      });
    }
    if (id === void 0 || id === null) {
      return [];
    }
    return context[keyName].load(id);
  }
  subscriptionTopicMapping(triggerType, objectName) {
    return `${triggerType}_${objectName}`.toUpperCase();
  }
  buildEventPayload(action, result) {
    const payload = {};
    payload[`${action}${this.model.graphqlType.name}`] = result;
    return payload;
  }
};

// src/runtime/createCRUDService.ts
var import_graphql_subscriptions2 = require("graphql-subscriptions");
function createCRUDService(config) {
  return (model, dataProvider) => {
    const serviceConfig = __spreadProps(__spreadValues({
      pubSub: new import_graphql_subscriptions2.PubSub()
    }, config), {
      crudOptions: model.crudOptions
    });
    return new CRUDService(model, dataProvider, serviceConfig);
  };
}

// src/runtime/NoDataError.ts
var NoDataError = class extends Error {
  constructor(message) {
    super(`No result from database: ${message}`);
  }
};

// src/runtime/GraphbackProxyService.ts
var GraphbackProxyService = class {
  proxiedService;
  constructor(service) {
    this.proxiedService = service;
  }
  create(data, context, info) {
    return this.proxiedService.create(data, context, info);
  }
  update(data, context, info) {
    return this.proxiedService.update(data, context, info);
  }
  delete(data, context, info) {
    return this.proxiedService.delete(data, context, info);
  }
  findOne(args, context, info) {
    return this.proxiedService.findOne(args, context, info);
  }
  findBy(args, context, info, path) {
    return this.proxiedService.findBy(args, context, info, path);
  }
  updateBy(args, context, info) {
    return this.proxiedService.updateBy(args, context, info);
  }
  deleteBy(args, context, info) {
    return this.proxiedService.deleteBy(args, context, info);
  }
  subscribeToCreate(filter, context) {
    return this.proxiedService.subscribeToCreate(filter, context);
  }
  subscribeToUpdate(filter, context) {
    return this.proxiedService.subscribeToUpdate(filter, context);
  }
  subscribeToDelete(filter, context) {
    return this.proxiedService.subscribeToDelete(filter, context);
  }
  batchLoadData(relationField, id, filter, context, info) {
    return this.proxiedService.batchLoadData(relationField, id, filter, context, info);
  }
};

// src/runtime/QueryFilter.ts
var FILTER_SUPPORTED_SCALARS = [
  "ID",
  "String",
  "Boolean",
  "Int",
  "Float",
  "GraphbackObjectID",
  "Timestamp",
  "Time",
  "Date",
  "DateTime",
  "BigInt",
  "Byte",
  "Currency",
  "DID",
  "Duration",
  "EmailAddress",
  "GUID",
  "HSL",
  "HSLA",
  "HexColorCode",
  "Hexadecimal",
  "IBAN",
  "IPv4",
  "IPv6",
  "ISBN",
  "ISO8601Duration",
  "Latitude",
  "LocalDate",
  "LocalEndTime",
  "LocalTime",
  "Longitude",
  "MAC",
  "NegativeFloat",
  "NegativeInt",
  "NonEmptyString",
  "NonNegativeFloat",
  "NonNegativeInt",
  "NonPositiveFloat",
  "NonPositiveInt",
  "PhoneNumber",
  "Port",
  "PositiveFloat",
  "PositiveInt",
  "PostalCode",
  "RGB",
  "RGBA",
  "URL",
  "USCurrency",
  "UUID",
  "UtcOffset"
];

// src/scalars/index.ts
var import_graphql_scalars = require("graphql-scalars");
var BigInt_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.BigIntResolver)), {
  name: "BigInt"
}));
var Byte = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.ByteResolver)), {
  name: "Byte"
}));
var Currency = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.CurrencyResolver)), {
  name: "Currency"
}));
var Duration = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.DurationResolver)), {
  name: "Duration"
}));
var EmailAddress = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.EmailAddressResolver)), {
  name: "Email"
}));
var GUID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.GUIDResolver)), {
  name: "GUID"
}));
var HSLA = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.HSLAResolver)), {
  name: "HSLA"
}));
var HSL = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.HSLResolver)), {
  name: "HSL"
}));
var HexColorCode = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.HexColorCodeResolver)), {
  name: "HexColorCode"
}));
var Hexadecimal = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.HexadecimalResolver)), {
  name: "Hexadecimal"
}));
var IBAN = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.IBANResolver)), {
  name: "IBAN"
}));
var IPv4 = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.IPv4Resolver)), {
  name: "IPv4"
}));
var IPv6 = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.IPv6Resolver)), {
  name: "IPv6"
}));
var ISBN = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.ISBNResolver)), {
  name: "ISBN"
}));
var ISO8601Duration = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.ISO8601DurationResolver)), {
  name: "ISO8601Duration"
}));
var LocalDate = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.LocalDateResolver)), {
  name: "LocalDate"
}));
var LocalTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.LocalTimeResolver)), {
  name: "LocalTime"
}));
var MAC = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.MACResolver)), {
  name: "MAC"
}));
var NegativeFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NegativeFloatResolver)), {
  name: "NegativeFloat"
}));
var NegativeInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NegativeIntResolver)), {
  name: "NegativeInt"
}));
var NonEmptyString = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NonEmptyStringResolver)), {
  name: "NonEmptyString"
}));
var NonNegativeFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NonNegativeFloatResolver)), {
  name: "NonNegativeFloat"
}));
var NonNegativeInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NonNegativeIntResolver)), {
  name: "NonNegativeInt"
}));
var PhoneNumber = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.PhoneNumberResolver)), {
  name: "PhoneNumber"
}));
var Port = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.PortResolver)), {
  name: "Port"
}));
var PositiveFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.PositiveFloatResolver)), {
  name: "PositiveFloat"
}));
var PositiveInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.PositiveIntResolver)), {
  name: "PositiveInt"
}));
var PostalCode = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.PostalCodeResolver)), {
  name: "PostalCode"
}));
var RGBA = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.RGBAResolver)), {
  name: "RGBA"
}));
var RGB = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.RGBResolver)), {
  name: "RGB"
}));
var URL = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.URLResolver)), {
  name: "URL"
}));
var USCurrency = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.USCurrencyResolver)), {
  name: "USCurrency"
}));
var UUID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.UUIDResolver)), {
  name: "UUID"
}));
var UtcOffset = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.UtcOffsetResolver)), {
  name: "UtcOffset"
}));
var DID = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.DIDResolver)), {
  name: "DID"
}));
var Latitude = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.LatitudeResolver)), {
  name: "Latitude"
}));
var Longitude = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.LongitudeResolver)), {
  name: "Longitude"
}));
var JWT = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.JWTResolver)), {
  name: "JWT"
}));
var LocalEndTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.LocalEndTimeResolver)), {
  name: "LocalEndTime"
}));
var NonPositiveFloat = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NonPositiveFloatResolver)), {
  name: "NonPositiveFloat"
}));
var NonPositiveInt = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.NonPositiveIntResolver)), {
  name: "NonPositiveInt"
}));
var Time = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.TimeResolver)), {
  name: "Time"
}));
var Timestamp = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.TimestampResolver)), {
  name: "Timestamp"
}));
var Date_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.DateResolver)), {
  name: "Date"
}));
var DateTime = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.DateTimeResolver)), {
  name: "DateTime"
}));
var _a = extractConfig(import_graphql_scalars.ObjectIDResolver), { parseLiteral: parseLiteral6, parseValue } = _a, objectIDConfig = __objRest(_a, ["parseLiteral", "parseValue"]);
var GraphbackObjectID = new GraphQLScalarType(__spreadProps(__spreadValues({}, objectIDConfig), {
  name: "GraphbackObjectID",
  parseValue: (value) => parseObjectID(parseValue(value)),
  parseLiteral: (ast, variables) => parseObjectID(parseLiteral6(ast, variables))
}));
var JSON_ = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.JSONResolver)), {
  name: "JSON"
}));
var JSONObject = new GraphQLScalarType(__spreadProps(__spreadValues({}, extractConfig(import_graphql_scalars.JSONObjectResolver)), {
  name: "JSONObject"
}));
var graphbackScalarsTypes = [
  BigInt_,
  Byte,
  Currency,
  DID,
  Duration,
  EmailAddress,
  GUID,
  HSL,
  HSLA,
  HexColorCode,
  Hexadecimal,
  IBAN,
  IPv4,
  IPv6,
  ISBN,
  ISO8601Duration,
  JWT,
  Latitude,
  LocalDate,
  LocalEndTime,
  LocalTime,
  Longitude,
  MAC,
  NegativeFloat,
  NegativeInt,
  NonEmptyString,
  NonNegativeFloat,
  NonNegativeInt,
  NonPositiveFloat,
  NonPositiveInt,
  PhoneNumber,
  Port,
  PositiveFloat,
  PositiveInt,
  PostalCode,
  RGB,
  RGBA,
  URL,
  USCurrency,
  UUID,
  UtcOffset,
  Time,
  Date_,
  JSON_,
  GraphbackObjectID,
  DateTime,
  Timestamp,
  JSONObject
];
function isSpecifiedGraphbackScalarType(type) {
  return graphbackScalarsTypes.some(({ name }) => type.name === name);
}
function isSpecifiedGraphbackJSONScalarType(type) {
  const name = type.name;
  return name === JSONObject.name || name === JSON_.name;
}
function extractConfig(wrappedScalar) {
  const _a = wrappedScalar.toConfig(), { name } = _a, config = __objRest(_a, ["name"]);
  return config;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BigInt_,
  Byte,
  CRUDService,
  Currency,
  DID,
  DateTime,
  Date_,
  Duration,
  EmailAddress,
  FILTER_SUPPORTED_SCALARS,
  GUID,
  GraphbackCoreMetadata,
  GraphbackObjectID,
  GraphbackOperationType,
  GraphbackPlugin,
  GraphbackPluginEngine,
  GraphbackProxyService,
  HSL,
  HSLA,
  HexColorCode,
  Hexadecimal,
  IBAN,
  IPv4,
  IPv6,
  ISBN,
  ISO8601Duration,
  JSONObject,
  JSON_,
  JWT,
  Latitude,
  LocalDate,
  LocalEndTime,
  LocalTime,
  Longitude,
  MAC,
  NegativeFloat,
  NegativeInt,
  NoDataError,
  NonEmptyString,
  NonNegativeFloat,
  NonNegativeInt,
  NonPositiveFloat,
  NonPositiveInt,
  PhoneNumber,
  Port,
  PositiveFloat,
  PositiveInt,
  PostalCode,
  RGB,
  RGBA,
  RelationshipMetadataBuilder,
  Time,
  Timestamp,
  TransformType,
  URL,
  USCurrency,
  UUID,
  UtcOffset,
  addRelationshipFields,
  buildModelTableMap,
  createCRUDService,
  createInMemoryFilterPredicate,
  defaultTableNameTransform,
  extendOneToManyFieldArguments,
  extendRelationshipFields,
  filterModelTypes,
  filterNonModelTypes,
  getColumnName,
  getDatabaseArguments,
  getFieldName,
  getFieldTransformations,
  getInputFieldName,
  getInputFieldTypeName,
  getInputTypeName,
  getModelByName,
  getModelFieldsFromResolverFields,
  getPrimaryKey,
  getRelationFieldName,
  getResolverInfoFieldsList,
  getSelectedFieldsFromResolverInfo,
  getSubscriptionName,
  getTableName,
  getUserModels,
  graphbackScalarsTypes,
  isAutoPrimaryKey,
  isInputField,
  isModelType,
  isOneToManyField,
  isSpecifiedGraphbackJSONScalarType,
  isSpecifiedGraphbackScalarType,
  isTransientField,
  lowerCaseFirstChar,
  metadataMap,
  parseRelationshipAnnotation,
  printSchemaWithDirectives,
  relationshipFieldDescriptionTemplate,
  relationshipOneToOneFieldDescriptionTemplate,
  transformForeignKeyName,
  upperCaseFirstChar
});
