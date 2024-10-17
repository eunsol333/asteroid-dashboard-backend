"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testAsteriods = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ asteriods: testAsteriods });
});
exports.default = router;
