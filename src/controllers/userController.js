const userModel = require('../models/userModel')

const getAll = async (req, res) => {
  const employees = await userModel.getAll()
  return res.status(200).json(employees)
}

const employeeAdded = async (req, res) => {
  try {
    const employeeAdded = await userModel.employeeAdded(req.body)
    return res.status(201).json(employeeAdded)
  } catch (error) {
    //TRATANDO VALOR DUPLICADO
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

    console.log(error)
    return res
      .status(400)
      .json({ error: 'An error occurred while processing your request.' })
  }
}

const deleteEmployee = async (req, res) => {
  const { employee_id } = req.params

  await userModel.deleteEmployee(employee_id)
  return res.status(204).json({ message: 'o usuário foi deletado' })
}

const updateEmployee = async (req, res) => {
  const { employee_id } = req.params

  await userModel.updateEmployee(employee_id, req.body)
  return res.status(204).json({ message: 'o usuário foi atualizado' })
}

module.exports = {
  getAll,
  employeeAdded,
  deleteEmployee,
  updateEmployee,
}
