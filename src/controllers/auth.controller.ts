import { Request, Response } from "express"
import { LoginBodyPayload, RegisterBodyPayload } from "../utils/interfaces/auth.interface"
import authService from "../services/auth.service"
import { prepareSuccessResponse } from "../utils/responseHandler"
import { AppString } from "../utils/common/AppString"

// REGISTER API
async function _18_5_7_9_19_20_5_18(req: Request, res: Response) {
    let { mobile, password } = <RegisterBodyPayload>req.body
    await authService._18_5_7_9_19_20_5_18service(mobile, password)
    res.json(prepareSuccessResponse(AppString.otp_sent))
}

// LOGIN API
function _12_15_7_9_14(req: Request, res: Response) {
    let { mobile, password } = <LoginBodyPayload>req.body

}

export default {
    _18_5_7_9_19_20_5_18,           // register
    _12_15_7_9_14,                  // login
}