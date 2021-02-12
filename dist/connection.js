"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = void 0;
var neo4j_driver_1 = __importDefault(require("neo4j-driver"));
var driver = neo4j_driver_1.default.driver(process.env.NEO4J_URI, neo4j_driver_1.default.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
function closeDB() {
    driver.close();
}
exports.closeDB = closeDB;
exports.default = driver;
//# sourceMappingURL=connection.js.map