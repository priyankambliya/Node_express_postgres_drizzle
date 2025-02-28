"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const responseHandler_1 = require("../utils/responseHandler");
const AppString_1 = require("../utils/common/AppString");
// REGISTER API
async function _18_5_7_9_19_20_5_18(req, res) {
    let { mobile, password } = req.body;
    await auth_service_1.default._18_5_7_9_19_20_5_18service(mobile, password);
    res.json((0, responseHandler_1.prepareSuccessResponse)(AppString_1.AppString.otp_sent));
}
// LOGIN API
function _12_15_7_9_14(req, res) {
    let { mobile, password } = req.body;
}
exports.default = {
    _18_5_7_9_19_20_5_18, // register
    _12_15_7_9_14, // login
};
