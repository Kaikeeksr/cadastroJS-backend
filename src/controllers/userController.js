import * as userModel from '../models/userModel.js'

export const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll()
    res.status(200).json(users)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const employeeAdded = async (req, res) => {
  try {
    const newEmployee = await userModel.employeeAdded(req.body)
    res.status(201).json(newEmployee)
  } catch (error) {
    //Tratando erro de duplicidade do banco
    if (error.code === 'ER_DUP_ENTRY') {
      const match = error.sqlMessage.match(
        /'([^']+)' for key '([^']+)\.([^']+)'/
      )
      const duplicated_db_field = match[3]
      const duplicated_db_val = match[1]
      let error_msg = ''

      switch (duplicated_db_field) {
        case 'employee_cpf':
          error_msg = `O CPF: ${duplicated_db_val} já foi cadastrado. Insira um CPF diferente`
          break
        case 'employee_email':
          error_msg = `O e-mail: ${duplicated_db_val} já foi cadastrado. Insira um e-mail diferente`
          break
        case 'employee_id':
          error_msg = `O usuário com ID: ${duplicatedDbVal} já existe`
          break
      }

      return res.status(400).json({ error: error_msg })
    }

    res.status(500).json({ error: error.message })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await userModel.updateEmployee(
      req.params.employee_id,
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

function errorHandler(res, error) {
  res.status(500).json({ error: error.message })
}
