import express from 'express'
import * as userController from './controllers/userController.js'

const router = express.Router()

router.get('/', (req, res) => res.status(200).send('O router tá funcionando'))
router.get('/user', userController.getAll)
router.get('/user/:employee_id', userController.getOne)
router.post('/user', userController.employeeAdded)
router.put('/user/:employee_id', userController.deleteEmployee)
router.put('/user/update/:employee_id', userController.updateEmployee)

export default router
