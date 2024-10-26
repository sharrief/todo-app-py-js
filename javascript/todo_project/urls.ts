import { Router } from 'express'
import { all, add, update, remove, getById } from '@/todo/routes'

const router = Router()
router.get('/all', all)
router.get('/:id', getById)
router.put('/add', add)
router.patch('/update', update)
router.delete('/delete/:id', remove)
export default router