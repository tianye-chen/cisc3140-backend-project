# cisc3140-backend-project
## CISC3140 Lab 4
## Table Of Content
* [Description](#description)
* [Features](#features)
* [Dependencies](#dependencies)
* [Setup](#setup)
* [Contributors](#contributors)
## Description
The objective of this lab is to build a backend API using a combination of SQL and JavaScript to enable users to view data that is stored in a database as well as update data.
## Features
* Viewing data that is in the database as JSON formatted data
  * Display results of select all Cars and Judges
  * Display data that is a list of records and a single    record
* Inserting new data record(s)
  * Support query, parameter, and JSON body for inserting 1 record at a time and multiple records
* Updating data records
  * Support query, parameter, and JSON body methods for updating 1 record at a time and across multiple records
## Technology
Project is created using:
* node.js
* javascript
## Dependencies
The command to install the following in order to run the project are shown below:
* express
  ```sh
  npm install express
  ```
* sqlite3
  ```sh
  npm install sqlite3
  ```
## Setup
The commands to run this project are shown below calling from the root:
```
node script/index.js
```
## Contributors
The following people who have contributed to this project:
- [@tianye-chen](https://github.com/tianye-chen/)
- [@bohuinong](https://github.com/bohuinong)
