"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
process.on('uncaughtException', errorHandler_1.default.uncaughtExceptionHandler);
process.on('unhandledRejection', errorHandler_1.default.unhandledRejectionHandler);
exports.app.set('view engine', 'ejs');
exports.app.set('views', 'views');
exports.app.use((0, cors_1.default)(corsOptions_1.default));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/api', routes_1.default);
exports.app.use(errorHandler_1.default.unHandledRouteHandler);
exports.app.use(errorHandler_1.default.errorHandler);
exports.app.listen(() => {
    console.log('App started');
});
