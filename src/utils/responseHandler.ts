import { MetaInterface } from "./interfaces/common.interface"

// SUCCESS response
const prepareSuccessResponse = (message: string, data?: any, is_pagination?: boolean, meta_info?: MetaInterface) => {
    return {
        success: true,
        message,
        data,
        is_pagination,
        meta_info
    }
}

// ERROR response
const prepareErrorResponse = (error: string) => { return { success: false, error } }

export { prepareSuccessResponse, prepareErrorResponse }
