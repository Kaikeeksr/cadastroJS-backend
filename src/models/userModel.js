import connection from './connection.js'

export const getAll = async () => {
   const query = 'SELECT * FROM tbl_employees WHERE e_status = "A";'

   // Executa a consulta SQL e retorna os resultados
   const rows = await connection.execute(query)
   // Cria um array de funcionários.
   const employees = []
   // Percorre os resultados da consulta e adiciona cada registro ao array de funcionários.
   for (const row of rows) {
      employees.push(row)
   }
   return employees[0] // retornando a primeira posição do array
}

export const employeeAdded = async (employee) => {
   const {
      e_id,
      e_name,
      e_cpf,
      e_email,
      e_tel,
      e_departament,
      e_gender,
      e_wage,
   } = employee
   const dateUTC = new Date(Date.now()).toUTCString()
   const dateBR = new Date(dateUTC).toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
   })
   //A -> ATIVO | Z -> DESATIVADO
   const e_status = 'A'
   const query =
      'INSERT INTO tbl_employees (e_id, e_name, e_cpf, e_email, e_tel, e_departament, e_gender, e_wage, created_at, e_status)' +
      'VALUES(?,?,?,?,?,?,?,?,?,?)'

   const EmployeeAdded = await connection.execute(query, [
      e_id,
      e_name,
      e_cpf,
      e_email,
      e_tel,
      e_departament,
      e_gender,
      e_wage,
      dateBR,
      e_status,
   ])

   return EmployeeAdded[0]
}

export const updateEmployee = async (employee_id, employee) => {
   const {
      employee_name,
      employee_cpf,
      employee_email,
      employee_tel,
      employee_departament,
      employee_gender,
      employee_wage,
   } = employee
   const query =
      'UPDATE tbl_employees SET employee_name = ?, employee_cpf = ?, employee_email = ?, employee_tel = ?, employee_departament = ?,' +
      'employee_gender = ?, employee_wage = ? WHERE employee_id = ?'

   const updatedEmployee = await connection.execute(query, [
      employee_id,
      employee_name,
      employee_cpf,
      employee_email,
      employee_tel,
      employee_departament,
      employee_gender,
      employee_wage,
   ])

   return updatedEmployee
}

export const deleteEmployee = async (employee_id) => {
   const query = 'UPDATE tbl_employees SET e_status = "Z" WHERE e_id = ?'
   const removedEmployee = await connection.execute(query, [employee_id])

   return removedEmployee
}
