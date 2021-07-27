const inquirer = require('inquirer');
const mysql = require("mysql2");

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
    db.query('SELECT * FROM roles', (err, data) => {
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
    db.query('SELECT * FROM employees', (err, data) => {
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
    ]).then(answers => {
        db.query(
            `INSERT INTO roles(title,salary) VALUES(?,?)`, [answers.title, answers.salary], (err, data) => {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    console.log("role added!");
                    seeRoles();
                }
            })
    })
}

const addEmployee = () => {
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
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawer"],
            name: "role"
        },
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

const updateRole = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: [],
            name: "name"
        }
    ]).then(answers => {
        db.query(
            `UPDATE employee SET role_id WHERE name = ?`, answers.name, (err, data) => {
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
