INSERT INTO department (dept_name)
VALUES ('Sales'), ('Engineering'), ('Projects');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 2), ('Consulatant', 75000, 1), ('Administration', 50000, 1), ('Administration', 50000, 3), ('Manager', 150000, 3), ('Manager', 150000, 2), ('Manager', 150000, 1) ;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, 8), ('Tim', 'Smit', 1, 8), ('Kim', 'John', 2, 9),('Rad','Jones', 3, 8), ('Brad','Smithy', 3, 8), ('Fred','Harden', 4, 7), ('Jane','Doe', 5,0), ('John','Doe', 6,0), ('Fred','Doe', 7,0);