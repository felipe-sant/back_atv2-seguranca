import express from 'express'
import cors from 'cors'
import exampleRoutes from './routes/Example.routes'
import path from 'path'
import requestLogger from './middlewares/requestLogger.middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/', exampleRoutes)

export default app