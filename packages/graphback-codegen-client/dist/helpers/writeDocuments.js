"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDocumentsToFilesystem = void 0;
const fs_1 = require("fs");
function writeDocumentsToFilesystem(outputFile, generatedClient) {
    const implementations = [];
    Object.keys(generatedClient).forEach((folder) => {
        //tslint:disable-next-line: no-any
        generatedClient[folder].forEach((c) => implementations.push(c.implementation));
    });
    fs_1.writeFileSync(outputFile, implementations.join('\n\n'));
}
exports.writeDocumentsToFilesystem = writeDocumentsToFilesystem;
//# sourceMappingURL=writeDocuments.js.map