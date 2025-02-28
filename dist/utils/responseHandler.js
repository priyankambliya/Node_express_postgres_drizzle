"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareErrorResponse = exports.prepareSuccessResponse = void 0;
// SUCCESS response
const prepareSuccessResponse = (message, data, is_pagination, meta_info) => {
    return {
        success: true,
        message,
        data,
        is_pagination,
        meta_info
    };
};
exports.prepareSuccessResponse = prepareSuccessResponse;
// ERROR response
const prepareErrorResponse = (error) => { return { success: false, error }; };
exports.prepareErrorResponse = prepareErrorResponse;
