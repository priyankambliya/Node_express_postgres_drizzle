import express, { Router } from 'express'

const router: Router = express.Router()

import authRoutes from './auth.routes'
import cricketRoutes from './cricket.routes'

router.use('/auth', authRoutes)
router.use('/cricket', cricketRoutes)

export default router