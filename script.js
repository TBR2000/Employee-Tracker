// NPM requirements
const inquirer = require('inquirer')
const mysql = require('mysql');
const table = require('console.table')
const colours = require('colors/safe')

//Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
});

//Title Screen
const firstStart = () =>{
  console.log ((colours.blue(`  
  ########:'##::::'##:'########::'##::::::::'#######::'##:::'##:'########:'########::::              
  ##.....:: ###::'###: ##.... ##: ##:::::::'##.... ##:. ##:'##:: ##.....:: ##.....:::::              
  ##::::::: ####'####: ##:::: ##: ##::::::: ##:::: ##::. ####::: ##::::::: ##::::::::::              
  ######::: ## ### ##: ########:: ##::::::: ##:::: ##:::. ##:::: ######::: ######::::::              
  ##...:::: ##. #: ##: ##.....::: ##::::::: ##:::: ##:::: ##:::: ##...:::: ##...:::::::              
  ##::::::: ##:.:: ##: ##:::::::: ##::::::: ##:::: ##:::: ##:::: ##::::::: ##::::::::::              
  ########: ##:::: ##: ##:::::::: ########:. #######::::: ##:::: ########: ########::::              
 ........::..:::::..::..:::::::::........:::.......::::::..:::::........::........:::::              
 '########:::::'###::::'########::::'###::::'########:::::'###:::::'######::'########:               
  ##.... ##:::'## ##:::... ##..::::'## ##::: ##.... ##:::'## ##:::'##... ##: ##.....::               
  ##:::: ##::'##:. ##::::: ##:::::'##:. ##:: ##:::: ##::'##:. ##:: ##:::..:: ##:::::::               
  ##:::: ##:'##:::. ##:::: ##::::'##:::. ##: ########::'##:::. ##:. ######:: ######:::               
  ##:::: ##: #########:::: ##:::: #########: ##.... ##: #########::..... ##: ##...::::               
  ##:::: ##: ##.... ##:::: ##:::: ##.... ##: ##:::: ##: ##.... ##:'##::: ##: ##:::::::               
  ########:: ##:::: ##:::: ##:::: ##:::: ##: ########:: ##:::: ##:. ######:: ########:               
 ........:::..:::::..:::::..:::::..:::::..::........:::..:::::..:::......:::........::               
 :'######::'##::::'##::'######::                                                                     
 '##... ##: ###::'###:'##... ##:                                                                     
  ##:::..:: ####'####: ##:::..::                                                                     
  ##::::::: ## ### ##:. ######::                                                                     
  ##::::::: ##. #: ##::..... ##:                                                                     
  ##::: ##: ##:.:: ##:'##::: ##:                                                                     
 . ######:: ##:::: ##:. ######::                                                                     
 :......:::..:::::..:::......:::                                                                                                                                                                     
`)))
 start();
};

// function which prompts the user for what action they should take
const start = () => {
      inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'Would you like to [ADD] to the database, [View] the database, or [Update] the database?',
        choices: [(colours.yellow('ADD')), (colours.blue('VIEW')), (colours.green('UPDATE')),(colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call ADD, VIEW or UPDATE functions
        if (answer.start === (colours.yellow('ADD'))) {
            addData();
        } else if (answer.start === (colours.blue('VIEW'))) {
            viewData();
        } else if (answer.start === (colours.green('UPDATE'))) {
            updateData();
        } else {
          connection.end();
        }
      });
};

// function that decides ADD choice
const addData = () => {
    inquirer.prompt({
        name: 'Add',
        type: 'list',
        message: 'Would you like to add a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: [(colours.yellow('DEPT')), (colours.blue('ROLE')), (colours.green('EMPLOYEE')),(colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call ADD DEPT, ROLE or EMPLOYEE function
        if (answer.Add === (colours.yellow('DEPT'))) {
            addDept();
        } else if (answer.Add === (colours.blue('ROLE'))) {
            addRole();
        } else if (answer.Add === (colours.green('EMPLOYEE'))) {
            addEmploy();
        } else {
          connection.end();
        }
      });

};

// function that decides VIEW choice
const viewData = () => {
    inquirer.prompt({
        name: 'View',
        type: 'list',
        message: 'Would you like to VIEW a [DEPT], a [ROLE], or [EMPLOYEES]?',
        choices: [(colours.yellow('DEPT')),(colours.blue('ROLE')), (colours.green('EMPLOYEES')),(colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.View === (colours.yellow('DEPT'))) {
            viewDept();
        } else if (answer.View === (colours.blue('ROLE'))) {
            viewRole();
        } else if (answer.View === (colours.green('EMPLOYEES'))) {
            viewEmploy();
        } else {
          connection.end();
        }
      });

};

// function that decides UPDATE choice
const updateData = () => {
    inquirer.prompt({
        name: 'Update',
        type: 'list',
        message: 'Would you like to Update Employee [ROLE] or [Manager]?',
        choices: [(colours.yellow('ROLE')), (colours.green('MANAGER')),(colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.Update === (colours.green('MANAGER'))) {
            updateManager();
        } else if (answer.Update === (colours.yellow('ROLE'))) {
            updateRole();
        } else {
          connection.end();
        }
      });

};

//Add dept function
const addDept = () =>{
    // prompt for name of department
  inquirer.prompt([
    {
      name: 'dept',
      type: 'input',
      message: 'What is the department you would like to add?',
    },
  ])
  .then((answer) => {
    // when finished prompting, insert a new dept into the db with that info
    connection.query(
      'INSERT INTO department SET ?',
      {
        dept_name: answer.dept,
      },
      (err) => {
        if (err) throw err;
        console.log('Your department was created successfully!');
        // begin again
        start();
      }
    );
  });

};

//Add role function
const addRole = () =>{
    // query the database for all departments
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
  // prompt for name of new role
  inquirer.prompt([
    {
      name: 'role',
      type: 'input',
      message: 'What is the title of the role you would like to add?',
    },
  //prompt for salary   
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role you would like to add?',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
    },
    // Create choice array of depts in database
    {
        name: 'choice',
        type: 'rawlist',
        choices() {
          const choiceArray = [];
          results.forEach(({ dept_name }) => {
            choiceArray.push(dept_name);
          });
          return choiceArray;
        },
        message: 'What department would you like the new role to be in?',
      },
  ])
  .then((answer) => {
    // gets the information of the chosen department
        let chosendept;
        results.forEach((department) => {
          if (department.dept_name === answer.choice) {
            chosendept = department;
          }
        }); 
    // insert a new dept into the db with that department_id
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.role,
        salary: answer.salary,
        department_id: chosendept.id
      },
      (err) => {
        if (err) throw err;
        console.log('Your new role was created successfully!');
        // begin again
        start();
      }
    );
  });
 });
};

//Add employee function
const addEmploy = () =>{
    // query the database for all Roles
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
     // prompt for name of new employee
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee you would like to add?',
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the employee you would like to add?',
    },
    // Create choice array of roles in database
    {
        name: 'choice',
        type: 'rawlist',
        choices() {
          const choiceArray = [];
          results.forEach(({ title }) => {
            choiceArray.push(title);
          });
          return choiceArray;
        },
        message: 'What role does the new employee have?',
      },
      
  ])
  
  .then((answer) => {
    // gets the information of the chosen role
        let chosenRole;
        results.forEach((role) => {
          if (role.title === answer.choice) {
            chosenRole = role;
          }
        }); 
    //console.log (chosenRole)    

  //Find and Insert Manager ID
    let query = 'SELECT * FROM department JOIN role ON (role.department_id = department.id) RIGHT JOIN employee ON (employee.role_id = role.id) WHERE (title = ?)';
    let vari = 'Manager'
    connection.query(query,vari,(err, results) => {
    if (err) throw err;
        
    let manager = results.find(result => 
      result.department_id === chosenRole.department_id);
        
    // insert the new Employee into the db 
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: chosenRole.id,
        manager_id: manager.id
      },
      (err) => {
        if (err) throw err;
        console.log('Your new Employee has been added successfully!');
        // begin again
        start();
       }
      );      
     });
    });
  });
};

//View dept function
const viewDept = () =>{
    //connect to db
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
      //after getting results push into array
        let array = [];
        results.forEach(({ dept_name }) => {
        array.push({
          Department: (colours.green(`${dept_name}`))
        });
        });
      // Print table to console 
      console.table(array);
      start();
    })    

};

//View role function
const viewRole = () =>{
    //connect to db
    connection.query('SELECT * FROM role', (err, results) => {
      if (err) throw err;
    
    //after getting results push into array
    let array = [];
    results.forEach(({ title, salary, }) => {
    array.push({
      title: (colours.green(`${title}`)),
      salary: (colours.blue(`${salary}`)),
      
    })
    });
  // Print table to console 
    console.table('Company Role',array);
    start();
  })

};

//View employee function
const viewEmploy = () =>{
   //connect to db
   connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;', (err, results) => {
    if (err) throw err;
    
   //after getting results push into array
  let array = [];
  results.forEach(({ first_name, last_name, title, department, salary, manager }) => {
                
  array.push({
    Name: (colours.green(`${first_name}`)),
    Surname: (colours.green(`${last_name}`)),
    Role: (colours.yellow(`${title}`)),
    Salary: (colours.blue(`${salary}`)),
    Department: (colours.red(`${department}`)),
    Manager: (colours.yellow(`${manager}`))
    })
  
  });
// Print table to console 
  console.table('Employees',array);
  start();
})

};

//Update role function
const updateRole = () =>{
//Query Database to get list of employees
  connection.query('SELECT role.*, employee.first_name, employee.last_name, employee.role_id, employee.id AS employeeID FROM employees_db.role LEFT JOIN employees_db.employee ON (role.id = role_id);', (err, results) => {
  if (err) throw err;
  console.log(results)
  inquirer.prompt([
    //Create choice array of Employees in database
    {
      name: 'choice',
        type: 'rawlist',
        choices() {
          const employeeArray = [];
          results.forEach(({ first_name, last_name }) => {
            employeeArray.push(`${first_name} ${last_name}`);
          });
          return employeeArray
        },
        message: 'Which Employee do you wish to Update?',
    },
   {
    name: 'newRole',
    type: 'rawlist',
    choices() {
      const roleArray = [];
      results.forEach(({ title }) => {
        roleArray.push(title);
      });
      function unique(value, index, self) {
        return self.indexOf(value) === index;
      }
      let array = roleArray.filter(unique);
      return array;
    },
    message: 'What is the employees new Role?',
    },  
  ])
  .then((answer)=>{
    //Get Selected Employee ID
    let lookupArray = answer.choice.split(" ")
    
    let updateEmployee = results.find(result => 
      (result.first_name + result.last_name) === (lookupArray[0] + lookupArray[1]));
      console.log(updateEmployee)

    //Get Selected Roles ID
    let updatedRole = results.find(result =>
      result.title === answer.newRole);
      console.log(updatedRole)

    //Update database with new role
    connection.query('UPDATE employee SET ? WHERE ?',
      [
        {
          role_id: `${updatedRole.id}`,
          
        },
        {
          id: `${updateEmployee.employeeID}`
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log('Employee has been Updated!');
        start();
      }
    );
   });
 });
};

//Update Manager function
const updateManager = () =>{

};

//connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // run the start function after the connection is made to prompt the user
  firstStart();
});