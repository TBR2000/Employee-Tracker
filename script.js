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
    database: 'employeess_db',
});

// function which prompts the user for what action they should take
const start = () => {
    inquirer
      .prompt({
        name: 'Start',
        type: 'list',
        message: 'Would you like to [ADD] to the database, [View] the database, or [Update] the database?',
        choices: ['ADD', 'VIEW', 'UPDATE','EXIT'],
      })
      .then((answer) => {
        // based on answer, call ADD, VIEW or UPDATE functions
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
    inquirer
      .prompt({
        name: 'Add',
        type: 'list',
        message: 'Would you like to add a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on their answer, call ADD DEPT, ROLE or EMPLOYEE function
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
    inquirer
      .prompt({
        name: 'View',
        type: 'list',
        message: 'Would you like to VIEW a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on their answer, call view DEPT, ROLE or EMPLOYEE function
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
    inquirer
      .prompt({
        name: 'Update',
        type: 'list',
        message: 'Would you like to Update a [DEPT], a [ROLE], or an [EMPLOYEE]?',
        choices: ['DEPT', 'ROLE', 'EMPLOYEE','EXIT'],
      })
      .then((answer) => {
        // based on their answer, call view DEPT, ROLE or EMPLOYEE function
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

};

//Add role function
const addRole = () =>{

};

//Add employee function
const addEmploy = () =>{

};

//View dept function
const viewDept = () =>{

};

//View role function
const viewRole = () =>{

};

//View employee function
const viewEmploy = () =>{

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