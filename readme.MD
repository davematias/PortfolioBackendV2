[![CircleCI](https://circleci.com/gh/davematias/PortfolioV2/tree/master.svg?style=svg)](https://circleci.com/gh/davematias/PortfolioV2/tree/master)

[![Coverage Status](https://coveralls.io/repos/github/davematias/PortfolioV2/badge.svg?branch=master)](https://coveralls.io/github/davematias/PortfolioV2?branch=master)

# Intro

This is an example of a portfolio site running on aws. 
The backend, written in python is using aws lambda for the endpoints and dynamodb for the database.
The frontend is written in react and is using aws s3 with a public bucket.

# Prerequisites

* AWS account
* Node
* AWS SDK
* Serverless
* Python >= 3.7
* Pip
* GatsbyJS
  
# How to run locally

## Backend

* Install python dependencies using the requirements.txt on the Backend folder
* Open a command prompt on the Backend folder
* Start the db with: serverless dynamodb start
* Open another command prompt on the Backend folder
* Start the web server with: serverless wsgi serve

## Frontend

* Open a command prompt on the Frontend folder
* Run npm install
* Run gatsby develop

# How to deploy

* serverless deploy

# Live Examples here

## Backend
    https://kmzliedm21.execute-api.eu-west-1.amazonaws.com/dev


## Frontend
    http://portfolio-frontend-davematias.s3-website-eu-west-1.amazonaws.com