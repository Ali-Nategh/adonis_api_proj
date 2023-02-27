# AdonisJS API Project

A blog project, users have tasks and a profile, they can create and edit these and delete them.
Validation and Authentication have been implemented.

## How To Use:

Clone the project, go inside it and install packages with: ` npm install `

Create a `.env` file, example is in ` .env.example `

You will need a mysql server running as this project is in mysql. configure the `.env` file as it fits you.

Start the app with: ` npm node serve `

Now you can open postman and test these routes (on http://localhost:3333):

### Users:
```
GET:
/users
(returns all users)
Optional Query Strings:
- pagination: ?page=1&page_size=2


GET:
/users/:id
(returns user by id)

POST:
/users/:id
(enter user information, creates user by id)

PATCH-PUT:
/users/:id
(enter user information, edits user by id)

DELETE:
/users/:id
(deletes user by id)
```
### Tasks:
```
GET:
/users/id:/tasks
(returns all tasks from a user by user_id)
Optional Query Strings:
- pagination: ?page=1&page_size=2
- searching title: ?search=something
- sorting: ?sort=name&sort_type=asc [sort: name/created_at, sort_type: asc/desc]

GET:
/users/id:/tasks/:id
(returns a task from a user by user_id and task id)

POST:
/users/id:/tasks/:id
(enter user information, creates a task from a user by user_id and task id)

PATCH-PUT:
/users/id:/tasks/:id
(enter user information, edits a task from a user by user_id and task id)

DELETE:
/users/id:/tasks/:id
(deletes a task from a user by user_id and task id)
```
### Auth:
```
POST:
/register
(enter user information to create and login user, returns bearer token)

POST:
/login
(enter email and password, returns bearer token)

POST:
/logout
(enter Bearer Token, revokes the token)
```

<hr>

## Models:

### Users:
```
id                (database generated)
roleId            (relation)
email             (unique, 255)
password          (hashed, 180)
username          (unique, 30)
age               (optional)
name              (optional, 15)
familyName        (optional, 15)
rememberMeToken   (optional)
created_at        (database generated)
updated_at        (database generated)
```

### Profiles:
```
id                (database generated)
userId            (relation)
biography         (optional)
picture           (json, optional)
created_at        (database generated)
updated_at        (database generated)
```

### Tasks:
```
id                (database generated)
priorityId        (relation)
userId            (relation)
title             (100)
body              (optional)
thumbnail         (json, optional)
created_at        (database generated)
updated_at        (database generated)
```

<hr>

## ENUMS:

### Roles:
```
MEMBER
PROMEMBER
MODERATOR
ADMIN
```
### Priorities:
```
LOW
MEDIUM
HIGH
```
