import express from 'express'
import cors from 'cors'
import requestLoggerMiddleware from './middlewares/requestLogger.middleware'
import userRouter from './routes/User.routes'
import helmet from 'helmet'
import { sanitizeMiddleware } from './middlewares/sanitize.middleware'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(requestLoggerMiddleware)
app.use(sanitizeMiddleware)
app.use(cookieParser())

app.use('/', userRouter)

export default app