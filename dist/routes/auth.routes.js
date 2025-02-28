"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router.post('/register', auth_controller_1.default._18_5_7_9_19_20_5_18);
router.post('/login', auth_controller_1.default._12_15_7_9_14);
// social login
// router.post('/social-login',)
// router.post('/logout',)
exports.default = router;
