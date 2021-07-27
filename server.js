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


const main = () => {
    inquirer.prompt({
        type: "list",
        choices: ["View All Departments", " View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update Employee Role", "QUIT"],
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
                seeEmployee();
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
