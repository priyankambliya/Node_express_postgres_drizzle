"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cricket_controller_1 = __importDefault(require("../controllers/cricket.controller"));
const router = express_1.default.Router();
router.get('/live-scores', cricket_controller_1.default._12_9_22_5_45_3_15_18_5);
router.get('/all-matches', cricket_controller_1.default._1_12_12_13_1_20_3_8_5_19);
exports.default = router;
