SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title, roles.salary, employees.manager_id 
FROM departments 
INNER JOIN roles 
ON roles.department_id = departments.id 
INNER JOIN employees 
ON employees.role_id = roles.id