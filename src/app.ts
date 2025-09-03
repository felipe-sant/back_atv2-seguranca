import express from 'express'
import cors from 'cors'
import requestLogger from './middlewares/requestLogger.middleware'
import userRouter from './routes/User.routes'
import helmet from 'helmet'

const app = express()

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(requestLogger)

app.use('/', userRouter)

export default app