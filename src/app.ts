import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import usersRouter from './features/users/usersRouter'
import errorHandler from './lib/errorHandler'
import todosRouter from './features/todos/todosRouter'
import cors from 'cors'

export const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use('/api/users', usersRouter)
app.use('/api/todos', todosRouter)

app.use(errorHandler)
