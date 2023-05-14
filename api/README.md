# API
How to use the API.

## Setup

### 1. Download and Install XAMPP

Download and install XAMPP from [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html).

### 2. Start XAMPP

Start XAMPP and start the Apache and MySQL services.

### 3.1. Create Database

Import the database from [`assets/database/ict4d.sql`](../assets/database/ict4d.sql) into MySQL.

### 3.2 Create User

Create a database user which can read, write and drop tables in the database. The user should have the following credentials:

```bash
username: development
password: test
```

### 4. Install Node.js

Download and install Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

### 5. Install Dependencies

Install the dependencies using the following command:

```bash
cd api
npm install
```

### 6. Create .env File

Create a .env file in the root directory of the project. The .env file should contain the following variables:

```
# JWT SECRET
JWT_SECRET=your_secret

# MYSQL DATABASE CONFIGURATION
MYSQL_HOST = 'localhost'
MYSQL_USER = 'development'
MYSQL_PASSWORD = 'test'
```

### 7. Start API

Start api using the following command:

```
npm run start
```

The API is now running on [http://localhost:3000](http://localhost:3000).

## Usage

The API can be accessed using the following endpoints:
[https://api-semencescertifiees.elch.cc](https://api-semencescertifiees.elch.cc)

### API Documentation

The API is documented using Postman. The documentation file can be found under [`assets\postman\ICT4D.postman_collection.json`](assets\postman\ICT4D.postman_collection.json).

Import the file into Postman to view the documentation.

A in depth documentation of the API can be found on: https://github.com/elianderlohr/SemencesCertifiees/wiki