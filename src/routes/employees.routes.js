import { Router } from 'express'
import { createemployee, updateemployees, deleteemployees, readallemployees, reademployee } from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', readallemployees)

router.get('/employees/:id', reademployee)

router.post('/employees', createemployee)

router.patch('/employees/:id', updateemployees)

router.delete('/employees/:id', deleteemployees)

export default router