"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asteroidsController_1 = require("../controllers/asteroidsController");
const router = express_1.default.Router();
router.get("/asteroids", asteroidsController_1.getAsteroids);
exports.default = router;
