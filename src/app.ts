import express, { Express } from 'express'

import cors from 'cors'
import morgan from 'morgan'

import corsOptions from "./utils/corsOptions"
import errorHandler from "./utils/errorHandler"
import appRoutes from './routes'

export const app: Express = express()

process.on('uncaughtException', errorHandler.uncaughtExceptionHandler)
process.on('unhandledRejection', errorHandler.unhandledRejectionHandler)

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(cors(corsOptions))
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('Welcome to the app') })
app.use('/api', appRoutes)

app.use(errorHandler.unHandledRouteHandler)
app.use(errorHandler.errorHandler)

app.listen(() => {
    console.log('App started')
})