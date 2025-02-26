import 'dotenv/config'

import { app } from "./app"

import { createServer } from 'http'

const server = createServer(app)

const port = process.env['PORT'] ?? 7779
server.listen(port, () => {
    console.log('Server started on port ' + port)
    import('./db/connection')
    import('./utils/redisHelper')
})