INSERT INTO departments (name)
VALUES  ('Sales'),
        ('Finance'),
        ('Legal'),
        ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 1),
        ('Sales Person', 80000, 1),
        ('Lead Engineer', 150000, 4),
        ('Software Engineer', 120000, 4),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 3),
        ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('JOHN', 'DOE', 1, NULL),
        ('Mike', 'Chan', 1, 1),
        ('Ashley', 'Rodriguez', 4, NULL),
        ('Kevin', 'Tupik', 4, 3),
        ('Kunal', 'Singh', 2, NULL),
        ('Malia', 'Brown', 2, 5),
        ('Sarah', 'Lourd', 3, NULL),
        ('Tom', 'Allen', 3, 7);