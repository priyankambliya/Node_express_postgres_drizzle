import express, { Router } from 'express'

import authController from "../controllers/auth.controller"

const router: Router = express.Router()

router.post('/register', authController._18_5_7_9_19_20_5_18)
router.post('/login', authController._12_15_7_9_14)

// social login
// router.post('/social-login',)

// router.post('/logout',)

export default router