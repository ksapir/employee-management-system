DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE
);
