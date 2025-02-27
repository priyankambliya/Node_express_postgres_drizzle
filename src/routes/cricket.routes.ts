import express, { Router } from 'express'

import cricketController from "../controllers/cricket.controller"

const router: Router = express.Router()

router.get('/live-scores', cricketController._12_9_22_5_45_3_15_18_5)
router.get('/all-matches', cricketController._1_12_12_13_1_20_3_8_5_19)

export default router