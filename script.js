// NPM requirements
const inquirer = require('inquirer')
const mysql = require('mysql');
const table = require('console.table')
const colours = require('colors/safe');


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
        message: 'Would you like to [ADD] to the database, [View] the database, [Update] the database, or [Delete] from the database?',
        choices: [(colours.yellow('ADD')), (colours.blue('VIEW')), (colours.green('UPDATE')),(colours.magenta('DELETE')), (colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call ADD, VIEW or UPDATE functions
        if (answer.start === (colours.yellow('ADD'))) {
            addData();
        } else if (answer.start === (colours.blue('VIEW'))) {
            viewData();
        } else if (answer.start === (colours.green('UPDATE'))) {
            updateData();
        } else if (answer.start === (colours.magenta('DELETE'))) {
            deleteData()    
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
        choices: [(colours.yellow('DEPT')), (colours.blue('ROLE')), (colours.green('EMPLOYEE')), (colours.cyan('BACK TO START')), (colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call ADD DEPT, ROLE or EMPLOYEE function
        if (answer.Add === (colours.yellow('DEPT'))) {
            addDept();
        } else if (answer.Add === (colours.blue('ROLE'))) {
            addRole();
        } else if (answer.Add === (colours.green('EMPLOYEE'))) {
            addEmploy();
        } else if (answer.Add === (colours.cyan('BACK TO START'))) {
            start();
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
        message: 'Would you like to VIEW a [DEPT], a [ROLE], the [EMPLOYEES], Employees [BY MANAGER] or the [FINANCIALS}?',
        choices: [(colours.yellow('DEPT')),(colours.blue('ROLE')), (colours.green('EMPLOYEES')), (colours.cyan('BY MANAGER')), (colours.magenta('FINANCIALS')), (colours.cyan('BACK TO START')), (colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.View === (colours.yellow('DEPT'))) {
            viewDept();
        } else if (answer.View === (colours.blue('ROLE'))) {
            viewRole();
        } else if (answer.View === (colours.green('EMPLOYEES'))) {
            viewEmploy();
        } else if (answer.View === (colours.cyan('BY MANAGER'))) {
            viewByManager();    
        } else if (answer.View === (colours.magenta('FINANCIALS'))) {
            viewFinances();
        } else if (answer.View === (colours.cyan('BACK TO START'))) {
            start();     
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
        choices: [(colours.yellow('ROLE')), (colours.green('MANAGER')), (colours.cyan('BACK TO START')), (colours.red('EXIT'))],
      })
      .then((answer) => {
        // based on the answer, call view DEPT, ROLE or EMPLOYEE function
        if (answer.Update === (colours.green('MANAGER'))) {
            updateManager();
        } else if (answer.Update === (colours.yellow('ROLE'))) {
            updateRole();
        } else if (answer.Update === (colours.cyan('BACK TO START'))) {
            start();
        } else {
          connection.end();
        }
      });

};

// function that decides DELETE choice
const deleteData = () => {
  inquirer.prompt({
      name: 'Delete',
      type: 'list',
      message: 'Would you like to delete a [DEPT], a [ROLE], or an [EMPLOYEE]?',
      choices: [(colours.yellow('DEPT')), (colours.blue('ROLE')), (colours.green('EMPLOYEE')), (colours.cyan('BACK TO START')), (colours.red('EXIT'))],
    })
    .then((answer) => {
      // based on the answer, call Delete DEPT, ROLE or EMPLOYEE function
      if (answer.Delete === (colours.yellow('DEPT'))) {
          deleteDept();
      } else if (answer.Delete === (colours.blue('ROLE'))) {
          deleteRole();
      } else if (answer.Delete === (colours.green('EMPLOYEE'))) {
          deleteEmploy();
      } else if (answer.Delete === (colours.cyan('BACK TO START'))) {
          start();
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
        console.log(colours.cyan('Your department was created successfully!'));
        // begin again
        start();
      }
    );
  });

};

//Add role function
const addRole = () =>{
    // query the database for all departments
  connection.query('SELECT * FROM department', (err, res) => {
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
          res.forEach(({ dept_name }) => {
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
        res.forEach((department) => {
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
        console.log(colours.cyan('Your new role was created successfully!'));
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
  connection.query('SELECT role.*, department.dept_name, department.id AS dept_id FROM role LEFT JOIN department ON (department_id = department.id);', (err, res) => {
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
          res.forEach(({ title, dept_name }) => {
            choiceArray.push(`${title} ${dept_name}`);
          });
          return choiceArray;
        },
        message: 'What role does the new employee have?',
      },
      
  ])
  
  .then((answer) => {
    // gets the information of the chosen role
    const split = answer.choice.split(" ");
        let chosenRole;
        res.forEach((role) => {
          if (role.title === split[0]) {
            chosenRole = role;
          }
        }); 
       

  //Find and Insert Manager ID
    let query = 'SELECT * FROM department JOIN role ON (role.department_id = department.id) RIGHT JOIN employee ON (employee.role_id = role.id) WHERE (title = ?)';
    let vari = 'Manager'
    connection.query(query,vari,(err, res) => {
    if (err) throw err;       
    let managerId = res.find(res => 
      res.department_id === chosenRole.department_id);

  // If no manger insert 0 to manager_id field  
    let manager;
    if(!managerId){
      manager = 0
    }else{
      manager = managerId.id
    }  
     
      console.log (manager)
   // insert the new Employee into the db 
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: chosenRole.id,
        manager_id: manager
      },
      (err) => {
        if (err) throw err;
        console.log(colours.cyan('Your new Employee has been added successfully!'));
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
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
      //after getting result push into array
        let array = [];
        res.forEach(({ dept_name }) => {
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
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
    
    //after getting results push into array
    let array = [];
    res.forEach(({ title, salary, }) => {
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
   connection.query('SELECT employee.id, role.title, department.dept_name AS department, role.salary, employee.first_name AS Employee_first, employee.last_name AS Employee_last, manager.first_name AS Manager_First, manager.last_name AS Manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;', (err, res) => {
    if (err) throw err;
    
   //after getting results push into array
  let array = [];
  res.forEach(({ Employee_first, Employee_last, title, department, salary, Manager_First, Manager_last }) => {
                
  array.push({
    Employee: (colours.green(`${Employee_first} ${Employee_last} `)),
    Role: (colours.yellow(`${title}`)),
    Salary: (colours.blue(`${salary}`)),
    Department: (colours.red(`${department}`)),
    Manager: (colours.magenta(`${Manager_First} ${Manager_last}`))
    })
  
  });
// Print table to console 
  console.table((colours.cyan('EMPLOYEE ROSTER')),array);
  start();
})

};

//View By Manager Function
const viewByManager = () =>{
  //Query Database to get list of employees
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id ', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'managerchoice',
          type: 'rawlist',
          choices() {
            const managerArray = [];
            res.forEach(({ first_name, last_name, title }) => {
              if (title === 'Manager'){
                managerArray.push(`${first_name} ${last_name}`)
              }
            });
            return managerArray
          },
          message: 'Who is the Manager you want to view Employees for?',
      }
    ])
      .then((answer)=>{
      //Get Selected managers ID
      const managerlookupArray = answer.managerchoice.split(" ")
          
      const manager = res.find(res => 
        (res.first_name + res.last_name) === (managerlookupArray[0] + managerlookupArray[1])); 
        
        //after getting results push into array
      let array = [];
      res.forEach(({ first_name, last_name, manager_id }) => {
          if (manager.id === manager_id) {      
              array.push({
              Employee: (colours.green(`${first_name} ${last_name}`)),
              })
            };
      });
        // Print table to console 
        console.table((colours.cyan('EMPLOYEE BY MANAGER')),array);
        start();
    });
  });
};

//View Finances function
const viewFinances = () =>{
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      //build array of department choices
      {
        name: 'deptChoice',
          type: 'rawlist',
          choices() {
            const deptArray = [];
            res.forEach(({ dept_name }) => {
            deptArray.push(`${dept_name}`)
              
            });
            return deptArray
          },
          message: 'Which Department would you like to see total payroll for?',
      }
    ])
        .then((answer) => {
          //Take answer and pass to query
          let query = 'SELECT role.*, department.dept_name, employee.role_id, employee.id AS employeeID, SUM(salary) AS sum FROM role LEFT JOIN department ON (role.department_id = department.id) LEFT JOIN employee ON (role.id = role_id) WHERE (dept_name = ?)'
          let vari = `${answer.deptChoice}`
          //Query department and SUM salaries
          connection.query(query,vari,(err, res) => {
            if (err) throw err;
            //Push to array 
            const budget = []
            res.forEach(({ dept_name, sum }) => {
              budget.push({
                Department: (colours.blue(`${dept_name}`)),
                Budget: (colours.red(`${sum}`))
              })
            });
            //print table  
            console.table((colours.cyan('Budget By Department')),budget)
            start();
          });
        });
  });

};

//Update role function
const updateRole = () =>{
//Query Database to get list of employees
  connection.query('SELECT role.*, employee.first_name, employee.last_name, employee.role_id, employee.id AS employeeID FROM employees_db.role LEFT JOIN employees_db.employee ON (role.id = role_id);', (err, res) => {
  if (err) throw err;
  
  inquirer.prompt([
    //Create choice array of Employees in database
    {
      name: 'choice',
        type: 'rawlist',
        choices() {
          const employeeArray = [];
          res.forEach(({ first_name, last_name }) => {
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
      res.forEach(({ title }) => {
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
    
    let updateEmployee = res.find(res => 
      (res.first_name + res.last_name) === (lookupArray[0] + lookupArray[1]));

    //Get Selected Roles ID
    let updatedRole = res.find(res =>
      res.title === answer.newRole);

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
        console.log(colours.cyan('Employee has been Updated!'));
        start();
      }
    );
   });
 });
};

//Update Manager function
const updateManager = () =>{
  //Query Database to get list of employees
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id ', (err, res) => {
    if (err) throw err;
        
    inquirer.prompt([
      //Create choice array of Employees in database
      {
        name: 'choice',
          type: 'rawlist',
          choices() {
            const employeeArray = [];
            res.forEach(({ first_name, last_name }) => {
              employeeArray.push(`${first_name} ${last_name}`);
            });
            return employeeArray
          },
          message: 'Which Employee do you wish to Update?',
      },
      //Create choice array of managers
      {
        name: 'managerchoice',
          type: 'rawlist',
          choices() {
            const managerArray = [];
            res.forEach(({ first_name, last_name, title }) => {
              if (title === 'Manager'){
                managerArray.push(`${first_name} ${last_name}`)
              }
            });
            return managerArray
          },
          message: 'Who is the Employees new Manager?',
        },
      ])
      .then((answer)=>{
        //Get Selected Employee ID
        let lookupArray = answer.choice.split(" ")
        
        let updateEmployee = res.find(res => 
          (res.first_name + res.last_name) === (lookupArray[0] + lookupArray[1]));
    
        //Get Selected managers ID
        let managerlookupArray = answer.managerchoice.split(" ")
        
        let updateManager = res.find(res => 
          (res.first_name + res.last_name) === (managerlookupArray[0] + managerlookupArray[1]));
          
        //Update database with new role
        connection.query('UPDATE employee SET ? WHERE ?',
          [
            {
              manager_id: `${updateManager.id}`,
              
            },
            {
              id: `${updateEmployee.id}`
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(colours.cyan('Employee has been Updated!'));
            start();
          }
        );
     });
  });
};

//Delete Dept function
const deleteDept = () =>{
  //connect to db
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      //build array of department choices
      {
        name: 'deptChoice',
          type: 'rawlist',
          choices() {
            const deptArray = [];
            res.forEach(({ dept_name }) => {
            deptArray.push(`${dept_name}`)
              
            });
            return deptArray
          },
          message: 'Which Department would you like to Delete?',
      }
    ])
    //After getting an answer, process delete query
    .then((answer) => {
      console.log(colours.red('Deleting...\n'));
      connection.query('DELETE FROM department WHERE ?',
    {
      dept_name: `${answer.deptChoice}`,
    },
      (err, res) => {
      if (err) throw err;

      console.log(colours.red(`Department deleted!\n`));

    // back to start
      start();
      
    });
  })

});
};

//Delete Role Function
const deleteRole = () =>{
  //connect to db
  connection.query('SELECT role.*, department.dept_name, department.id AS dept_id FROM role LEFT JOIN department ON (department_id = department.id);', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      //build array of role choices
      {
        name: 'roleChoice',
          type: 'rawlist',
          choices() {
            const roleArray = [];
            res.forEach(({ title, dept_name }) => {
            roleArray.push(`${title} ${dept_name}`)
              
            });
            return roleArray
          },
          message: 'Which Role would you like to Delete?',
      }
    ])

    //After getting an answer, process delete query
    .then((answer) => {
      const split = answer.roleChoice.split(" ");
        let chosenRole;
        res.forEach((role) => {
          if (role.title === split[0]) {
            chosenRole = role;}
          });
          
      console.log(colours.red('Deleting...\n'));
      connection.query('DELETE FROM role WHERE ?',
    {
      title: `${chosenRole.title}`
    },
      (err, res) => {
      if (err) throw err;
    
      console.log(colours.red(`Role deleted!\n`));

    // back to start
      start();
      
    });
  })

});

};

//Delete Employee Function
const deleteEmploy = () =>{
  //connect to db
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      //build array of employee choices
      {
        name: 'choice',
          type: 'rawlist',
          choices() {
            const deptArray = [];
            res.forEach(({ first_name, last_name }) => {
            deptArray.push(`${first_name} ${last_name}`)
              
            });
            return deptArray
          },
          message: 'Which Department would you like to Delete?',
      }
    ])  

    //After getting an answer, process delete query
    .then((answer) => {
      //Get Selected Employee ID
    let lookupArray = answer.choice.split(" ")
        
    let deleteEmployee = res.find(res => 
      (res.first_name + res.last_name) === (lookupArray[0] + lookupArray[1]));
      
      console.log(colours.red('Deleting...\n'));
      connection.query('DELETE FROM employee WHERE ?',
    {
      id: `${deleteEmployee.id}`,
    },
      (err, res) => {
      if (err) throw err;

      console.log(colours.red(`Employee deleted!\n`));

    // back to start
      start();
      
    });
  })

});

};

//connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(colours.magenta(`connected as id ${connection.threadId}\n`));
    // run the start function after the connection is made to prompt the user
  firstStart();
});