"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_routes_1 = __importDefault(require("./auth.routes"));
const cricket_routes_1 = __importDefault(require("./cricket.routes"));
router.use('/auth', auth_routes_1.default);
router.use('/cricket', cricket_routes_1.default);
exports.default = router;
