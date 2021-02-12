"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
function string() {
    function String() {
        var _this = this;
        this.typeName = "String";
        this.isRequired = false;
        this.required = function () {
            _this.isRequired = true;
            return _this;
        };
    }
    return new String();
}
exports.string = string;
//# sourceMappingURL=string.js.map