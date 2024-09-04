import * as userModel from '../models/userModel.js'
import { errorHandler } from './errorHandler.js'

export const getAll = async (req, res) => {
   try {
      const users = await userModel.getAll()
      res.status(200).json(users)
   } catch (error) {
      errorHandler(res, error)
   }
}

export const getOne = async (req, res) => {
   try {
      const id = req.params.employee_id
      const user = await userModel.getOne(id)
      res.status(200).json(user)
   } catch (error) {
      errorHandler(res, error)
   }
}

export const employeeAdded = async (req, res) => {
   try {
      const newEmployee = await userModel.employeeAdded(req.body)
      res.status(201).json(newEmployee)
   } catch (error) {
      errorHandler(res, error)
   }
}

export const updateEmployee = async (req, res) => {
   try {
      const updatedEmployee = await userModel.updateEmployee(
         req.body.e_id,
         req.body
      )
      res.status(200).json(updatedEmployee)
   } catch (error) {
      errorHandler(res, error)
   }
}

export const deleteEmployee = async (req, res) => {
   try {
      const removedEmployee = await userModel.deleteEmployee(
         req.params.employee_id
      )
      res.status(200).json(removedEmployee)
   } catch (error) {
      errorHandler(res, error)
   }
}
