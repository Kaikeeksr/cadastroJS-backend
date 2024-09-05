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

export const getOne = async (employee_id) => {
   const query = 'SELECT * FROM tbl_employees WHERE e_id = ?'
   const editEmployee = await connection.execute(query, [employee_id])

   return editEmployee[0][0] //melhorar essa bomba de retorno (mas lembre-se que tá funfando)
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
   //Sun, 23 July 12:58:00
   const dateBR = new Date(dateUTC).toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
   })
   //A -> ATIVO | Z -> DESATIVADO
   const e_status = 'A'
   const query =
      //p_ins_add_empl employee
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
   const query = `
      UPDATE tbl_employees
      SET
         e_name = :e_name,
         e_cpf = :e_cpf,
         e_email = :e_email,
         e_tel = :e_tel,
         e_departament = :e_departament,
         e_gender = :e_gender,
         e_wage = :e_wage
      WHERE e_id = :e_id
   `

   const [updatedEmployee] = await connection.execute(query, employee, {
      namedPlaceholders: true,
   })

   return updatedEmployee
}

export const deleteEmployee = async (employee_id) => {
   const query = 'UPDATE tbl_employees SET e_status = "Z" WHERE e_id = ?'
   const removedEmployee = await connection.execute(query, [employee_id])

   return removedEmployee
}
