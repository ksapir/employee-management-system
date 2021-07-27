USE company_db;

INSERT INTO departments(name)
VALUES
("Sales"),
("Finance"),
("Engineering"),
("Legal");

INSERT INTO roles(title,department,salary)
VALUES
("Sales Lead","Sales", 100000).
("Salesperson", "Sales", 90000),
("Lead Engineer", "Engineering", 150000),
("Software Engineer", "Engineer", 120000),
("Account Manager", "Finance", 160000),
("Accountant", "Finance", 125000),
("Legal Team Lead", "Legal", 250000),
("Lawyer", "Legal", 190000);

INSERT INTO employees (first_name,last_name,manager_id)
VALUES
("John", "Doe"),
("Mike", "Chan"),
("Ashley", "Rodriguez"),
("Kevin", "Tupik"),
("Kunal", "Singh"),
("Malia", "Brown"),
("Sarah", "Lourd"),
("Tom", "Allen"),


