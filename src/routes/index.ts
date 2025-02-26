import express, { Router } from 'express'

const router: Router = express.Router()

import authRoutes from './auth.routes'

// router.use('/',)
router.use('/auth', authRoutes)

export default router