export function errorHandler(res, error) {
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
}
