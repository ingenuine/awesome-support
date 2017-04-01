![Awesome Support](./public/at-logo.png)

> A simple ticket management application.

## Preview
https://awesome-support.herokuapp.com

Register a new user defaults to customer. Login as admin to manage users.

    customer@example.com / password
    agent@example.com / password
    admin@example.com / password

## Prerequisites
You will need the following things properly installed on your computer.

    React     15.4.2
    Ruby      2.4.0
    Rails     5.0.2
    Mysql     5.7.17

## Installation
Setup application, create database and seed initial data to play with.

    mysql start
    bin/setup

## Running / Development

    rails s
    open localhost:3000

## Deployment instructions
Write process to deploy ie

    heroku create
    heroku addons:create cleardb:ignite
    git push heroku master
    heroku run rake db:migrate db:seed

## Running tests
Run all tests

    rake

Run frontend and backend tests separately

    rspec
    rake spec:javascripts

## Todo
Some of possible things to add in the future

__Frontend__
+ landing page
+ onboarding
+ UI/UX & design
+ notifications (app, email, desktop)
+ ...

__Backend__
+ caching
+ background jobs
+ websockets
+ more security (authorization, ssl, ...)
+ multitenancy
+ docker
+ ...


**Awesome.Support** © 2017, Ingenuine. Released under the [MIT] License.<br>



> GitHub [@ingenuine](https://github.com/ingenuine) &nbsp;&middot;&nbsp;
> Twitter [@ingenuine](https://twitter.com/ingenuine)

[![](https://img.shields.io/github/followers/ingenuine.svg?style=social&label=@ingenuine)](https://github.com/ingenuine) &nbsp;
[![](https://img.shields.io/twitter/follow/ingenuine.svg?style=social&label=@ingenuine)](https://twitter.com/ingenuine)
