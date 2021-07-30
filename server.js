const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table")

const db = mysql.createConnection(
    {
        host: "localhost",
        // MySQL username,
        user: "root",
        // MySQL password
        password: "Lovelace21?",
        database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);

const seeDepartments = () => {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log(err);
            db.end;
        } else {
            console.table(data);
            main();
        }
    })
};


const seeRoles = () => {
    db.query('SELECT * FROM roles JOIN departments WHERE roles.department_id = departments.id',
        (err, data) => {
            if (err) {
                console.log(err);
                db.end;
            } else {
                console.table(data);
                main();
            }
        })
};

const seeEmployees = () => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title, roles.salary, employees.manager_id FROM departments INNER JOIN roles ON roles.department_id = departments.id INNER JOIN employees ON employees.role_id = roles.id', (err, data) => {
        if (err) {
            console.log(err);
            db.end;
        } else {
            console.table(data);
            main();
        }
    })
};

const addDeparment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]).then(answers => {
        db.query(
            `INSERT INTO departments(name) VALUES(?)`, answers.departmentName, (err, data) => {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    console.log("department added!");
                    seeDepartments();
                }
            })
    })
}

const addRole = () => {
    db.query('SELECT * FROM departments', (err, data) => {
        if (err) {
            console.log(err);
            db.end();
        } else {
            const depsArr = data.map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of the role?",
                    name: "title"
                },
                {
                    type: "input",
                    message: "What is the salary of the role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department does the role belong to?",
                    choices: depsArr,
                    name: "department"
                },
            ]).then(answers => {
                db.query(
                    `INSERT INTO roles(title,salary,department_id) VALUES(?,?,?)`, [answers.title, answers.salary, answers.department], (err, data) => {
                        if (err) {
                            console.log(err);
                            db.end();
                        } else {
                            console.log("role added!");
                            seeRoles();
                        }
                    }
                )
            })
        }
    })
}

const addEmployee = () => {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            console.log(err);
            db.end();
        } else {
            const rolesArr = data.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            db.query('SELECT * FROM employees', (err, data) => {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    const empsArr = data.map(emp => {
                        return {
                            name: emp.first_name + ' ' + emp.last_name,
                            value: emp.id
                        }
                    })
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What is the first name of the employee?",
                            name: "first"
                        },
                        {
                            type: "input",
                            message: "What is the last name of the employee?",
                            name: "last"
                        },
                        {
                            type: "list",
                            message: "What is the employees role?",
                            choices: rolesArr,
                            name: "role"
                        },
                        {
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices: empsArr,
                            name: "manager"
                }
                    ]).then(answers => {
                        db.query(
                            `INSERT INTO employees (first_name,last_name) VALUES(?,?)`, [answers.first, answers.last], (err, data) => {
                                if (err) {
                                    console.log(err);
                                    db.end();
                                } else {
                                    console.log("Employee added!");
                                    seeEmployees();
                                }
                            })
                    })
                }
            });
        }
    })
}

        const updateRole = () => {
            db.query('SELECT * FROM employees', (err, data) => {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    const empsArr = data.map(emp => {
                        return {
                            name: emp.first_name + ' ' + emp.last_name,
                            value: emp.id
                        }
                    })
                    db.query('SELECT * FROM roles', (err, data) => {
                        if (err) {
                            console.log(err);
                            db.end();
                        } else {
                            const rolesArr = data.map(role => {
                                return {
                                    name: role.title,
                                    value: role.id
                                }
                            })
                            inquirer.prompt([
                                {
                                    type: "list",
                                    message: "Which employee's role do you want to update?",
                                    choices: empsArr,
                                    name: "name"
                                },
                                {
                                    type: "list",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: rolesArr,
                                    name: "newRole"
                                }
                            ]).then(answers => {
                                db.query(
                                    `UPDATE roles, employees JOIN roles ON roles.id = employees.role_id SET title =? WHERE first_name =?`, [answers.newRole, answers.name], (err, data) => {
                                        if (err) {
                                            console.log(err);
                                            db.end();
                                        } else {
                                            console.log("Employee updated!");
                                            seeEmployees();
                                        }
                                    }
                                )
                            })
                        }
                    })
                }
            })
        }
        const main = () => {
            inquirer.prompt({
                type: "list",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update Employee Role", "QUIT"],
                message: "What do you want to do?",
                name: "choice"
            }).then(({ choice }) => {
                switch (choice) {
                    case "View All Departments":
                        seeDepartments();
                        break;
                    case "View All Roles":
                        seeRoles();
                        break;
                    case "View All Employees":
                        seeEmployees();
                        break;
                    case "Add A Department":
                        addDeparment();
                        break;
                    case "Add A Role":
                        addRole();
                        break;
                    case "Add An Employee":
                        addEmployee();
                        break;
                    case "Update Employee Role":
                        updateRole();
                        break;
                    default:
                        console.log("Bye!")
                        db.end();
                        break;
                }
            });
        };

        main();
