# Parm-Johal-IS24-full-stack-competition-req97073

## Features

- View a list of products fetched from the backend in a data table
- Display/Add/Edit/Delete a product
- Search filtering above the table for each column

## Tech
- **React** - JS library to build the interactive user interface on the Frontend
- **Express** - Fast Node.js network app framework used for the Backend
- **Docker** - Paas used for containerization of the full-stack app
- **Node.js** - JS Environment used for the application
- **Swagger** - API documentation tool used for backend API endpoint specs

## Installation
- Make sure to have Git and Docker installed and be able to run ```docker compose``` from the command line
- Clone this repository onto your desktop using the following command:
```sh
git clone https://github.com/ParmbeerJohal/Parm-Johal-IS24-full-stack-competition-req97073.git
```
- After cloning, run the following commands in the command line in the same order as listed, making sure the previous command completes before running the next one:
```sh
cd Parm-Johal-IS24-full-stack-competition-req97073/
docker compose build
docker compose up
```
- Once the  last command has finished running, the application can be run at
```sh
http://localhost:2000/
```
- All backend API endpoints will originate from
```sh
http://localhost:3000/api
```
- The health endpoint can be found at
```sh
http://localhost:3000/api/health
```
- The Swagger documentation can be found at
```sh
http://localhost:3000/api/api-docs
```
