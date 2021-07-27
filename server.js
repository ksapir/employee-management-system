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
            `INSERT INTO departments(name) VALUES(?)`, answers.departmentName, (err, data) =>{
            if (err){
                console.log(err);
                db.end();
            } else {
                console.log("department added!");
                seeDepartments();
            }
        })
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
