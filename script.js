// NPM requirements
const inquirer = require('inquirer')
const mysql = require('mysql');
const table = require('console.table')

//Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
});

// function which prompts the user for what action they should take
const start = () => {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'Would you like to [ADD] to the database, [View] the database, or [Update] the database?',
        choices: ['ADD', 'VIEW', 'UPDATE','EXIT'],
      })
      .then((answer) => {
        // based on the answer, call ADD, VIEW or UPDATE functions
        if (answer.start === 'ADD') {
            addData();
        } else if (answer.start === 'VIEW') {
            viewData();
        } else if (answer.start === 'UPDATE') {
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
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on the answer, call ADD DEPT, ROLE or EMPLOYEE function
        if (answer.Add === 'DEPT') {
            addDept();
        } else if (answer.Add === 'ROLE') {
            addRole();
        } else if (answer.Add === 'EMPLOYEE') {
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
        message: 'Would you like to VIEW a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.View === 'DEPT') {
            viewDept();
        } else if (answer.View === 'ROLE') {
            viewRole();
        } else if (answer.View === 'EMPLOYEE') {
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
        message: 'Would you like to Update a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.Update === 'DEPT') {
            updateDept();
        } else if (answer.Update === 'ROLE') {
            updateRole();
        } else if (answer.Update === 'EMPLOYEE') {
            updateEmploy();
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
    // query the database for all items being auctioned
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
          Department: `${dept_name}`
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
    results.forEach(({ title, salary}) => {
    array.push({
      title: `${title}`,
      salary: `${salary}`
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
   connection.query('SELECT * FROM employees_db.employee INNER JOIN employees_db.role ON (role.id = employee.role_id);', (err, results) => {
    if (err) throw err;
   //after getting results push into array
  let array = [];
  results.forEach(({ first_name, last_name, title}) => {
  array.push({
    Name: `${first_name}`,
    Surname: `${last_name}`,
    Role: `${title}`,
    })
  });
// Print table to console 
  console.table('Employees',array);
  start();
})

};

//Update dept function
const updateDept = () =>{

};

//Update role function
const updateRole = () =>{

};

//Update employee function
const updateEmploy = () =>{

};

//connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // run the start function after the connection is made to prompt the user
  start();
});