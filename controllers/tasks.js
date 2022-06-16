import { find, create, findOne, findOneAndDelete, findOneAndUpdate } from '../models/Task'
import asyncWrapper from '../middleware/async'
import { createCustomError } from '../errors/custom-error'
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

export default {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
