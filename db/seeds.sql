USE company_db;

INSERT INTO departments(name)
VALUES
("Sales"),
("Finance"),
("Engineering"),
("Legal");

INSERT INTO roles(title,department_id,salary)
VALUES
("Sales Lead","1", 100000),
("Salesperson","1", 90000),
("Lead Engineer","3", 150000),
("Software Engineer","3", 120000),
("Account Manager","2", 160000),
("Accountant","2", 125000),
("Legal Team Lead","4", 250000),
("Lawyer", "4", 190000);

INSERT INTO employees (first_name,last_name)
VALUES
("John", "Doe"),
("Mike", "Chan"),
("Ashley", "Rodriguez"),
("Kevin", "Tupik"),
("Kunal", "Singh"),
("Malia", "Brown"),
("Sarah", "Lourd"),
("Tom", "Allen");


