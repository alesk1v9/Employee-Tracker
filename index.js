const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//db connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'mortadela1',
        database: 'employee_db'
    },

    console.log('connected to employee_db'));

//questions
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices:
            [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'exit'
            ]

    }
];

// view all departments function
function viewAllDepartments() {
    db.query('SELECT * FROM departments', (error, results)=> {
        console.table('view all employees', results);
    init();
    });
  };

// view all roles function
  function viewAllRoles() {
    db.query('SELECT * FROM roles', (error, results)=> {
        console.table('view all roles', results);
    init();
    });
  };

// view all employees
  function viewAllEmployees() {
    db.query('SELECT * FROM employees', (error, results)=> {
        console.table('view all employees', results);
    init();
    });
  };


  //add department function
  function addDepartment() {
    inquirer.prompt(
        {
            name: 'name',
            type: 'input',
            message: 'Enter the name of the new department'
        }
    )
    .then((response)=> {
        db.query('INSERT INTO departments SET ?', response, (error, results)=> {
            console.table('New department inserted', results);
            init();
        });
    });
};

// add role function
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the new role'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary of role'
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department id which the role belongs'
        }
    ])
    .then((response)=> {
        db.query('INSERT INTO roles SET ?', {title:response.title,
                                            salary:response.salary,
                                            department_id:response.department},
         (error, results)=> {
            console.table('New role inserted', results);
            init();
        });
    });
};

// add employee function
function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name'
        },
        {
            name: 'role',
            type: 'input',
            message: 'Enter the role id which the employee belongs'
        },
        {
            name: 'has_manager',
            type: 'confirm',
            message: 'Has manager?',
            default: false,
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Enter the manager id',
            when: (answers)=> answers.has_manager
        }
    ])
    .then((response)=> {
        db.query('INSERT INTO employees SET ?', {first_name: response.firstName,
                                                 last_name: response.lastName,
                                                 role_id: response.role,
                                                 manager_id: response.manager},
        (error, results)=> {
            if (error) {
                console.log(error)
            } else {
                console.table('New employee inserted', results);
            }
            init();
        });
    });
};

// update employee function
function updateEmployee() {
    // Function to get employees
    const getEmployeesPromise = new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employees', (error, results) => {
            if (error) {
                reject(error);
            } else {
                const employeesChoices = results.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }));
                resolve(employeesChoices);
            }
        });
    });

    // Function to get roles
    const getRolesPromise = new Promise((resolve, reject) => {
        db.query('SELECT id, title FROM roles', (error, results) => {
            if (error) {
                reject(error);
            } else {
                const roleChoices = results.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                resolve(roleChoices);
            }
        });
    });

    // Promise.all to wait for both queries to finish
    Promise.all([getEmployeesPromise, getRolesPromise])
        .then(([employeesChoices, roleChoices]) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee',
                    choices: employeesChoices
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role',
                    choices: roleChoices
                }
            ])
                .then((answers) => {
                    const employeeId = answers.employee;
                    const roleId = answers.role;
                    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId], (error, results) => {

                        console.log('Employee role updated successfully.', console.table(results));
                        init();
                    });
                });
        })

};

// init function
function init(){
    inquirer.prompt(questions)
    .then((response) => {
        switch(response.choice){
            case 'view all departments':
            viewAllDepartments();
            break;
            case 'view all roles':
            viewAllRoles();
            break;
            case 'view all employees':
            viewAllEmployees();
            break;
            case 'add a department':
            addDepartment();
            break;
            case 'add a role':
            addRole();
            break;
            case 'add an employee':
            addEmployee();
            break;
            case 'update an employee role':
            updateEmployee();
            break;
            case 'exit':
            console.log('You ended the app, bye!');
            process.exit();
        };
      });
  };

  init();
