var _a = require("./helpers"), paramsBuilder = _a.paramsBuilder, TIMESTAMPS = _a.TIMESTAMPS;
describe("paramsBuilder", function () {
    describe("id", function () {
        it("should not add ID by default", function () {
            var res = paramsBuilder({}, {});
            expect(res.id).not.toBeDefined();
        });
        it("should add both timestamps when true", function () {
            var res = paramsBuilder({}, { id: true });
            expect(res.id).toBeDefined();
        });
    });
    describe("timestamps", function () {
        it("should not add timestamps by default", function () {
            var res = paramsBuilder({}, {});
            expect(res.createdAt).not.toBeDefined();
            expect(res.updatedAt).not.toBeDefined();
        });
        it("should add both timestamps when true", function () {
            var res = paramsBuilder({}, { timestamps: true });
            expect(res.createdAt).toBeDefined();
            expect(res.updatedAt).toBeDefined();
        });
        it("should add specified created at", function () {
            var res = paramsBuilder({}, { timestamps: TIMESTAMPS.CREATED });
            expect(res.createdAt).toBeDefined();
            expect(res.updatedAt).not.toBeDefined();
        });
        it("should add specified updated at", function () {
            var res = paramsBuilder({}, { timestamps: TIMESTAMPS.UPDATED });
            expect(res.createdAt).not.toBeDefined();
            expect(res.updatedAt).toBeDefined();
        });
    });
});
//# sourceMappingURL=coercion.test.js.map