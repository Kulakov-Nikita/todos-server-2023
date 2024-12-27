import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/auth'
import { todoCreateSchema, todoUpdateSchema } from './todosValidators'

const todosRouter = Router()

todosRouter.get('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const { limit, offset } = await querySchema.parseAsync(req.query)
  const todos = await db.todo.findMany({
    take: limit,
    skip: offset,
    where: {
      userId,
    },
  })
  res.json(todos)
})

todosRouter.post('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const { desc, title, completed } = await todoCreateSchema.parseAsync(req.body)
  const todo = await db.todo.create({
    data: {
      desc,
      title,
      completed,
      userId,
    },
  })
  res.json(todo)
})

todosRouter.put('/:id', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const todoId = req.params.id
  const updates = await todoUpdateSchema.parseAsync(req.body)

  const existingTodo = await db.todo.findUnique({
    where: {
      id: todoId,
      userId,
    },
  })

  if (!existingTodo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  const todo = await db.todo.update({
    where: {
      id: todoId,
      userId,
    },
    data: updates,
  })

  res.json(todo)
})



export default todosRouter
