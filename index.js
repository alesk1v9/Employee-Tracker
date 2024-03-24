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
