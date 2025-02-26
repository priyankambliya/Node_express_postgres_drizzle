import Redis from "ioredis"

const port = process.env['REDIS_PORT'] ?? '6379'
const host = process.env['REDIS_HOST'] ?? 'localhost'

const redisClient = new Redis(Number(port), host)

redisClient.on('connect', () => {
    console.log('Connected to Redis')
})
redisClient.on('error', (error) => {
    console.error('Failed to connect to Redis', error)
})

export default redisClient