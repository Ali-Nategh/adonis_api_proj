# AdonisJS API Project

A blog project, users have tasks and a profile, they can create and edit these and delete them.
Validation and Authentication have been implemented.

## How To Use:

Clone the project and start the app with:
``` 
npm run dev 
```
Now you can open postman and test these routes (on http://localhost:3333):
### Users:
```
GET

```
### Tasks:
```
GET

```
### Auth:
```
POST
/register
(enter user information to create and login user, returns bearer token)

POST
/login
(enter email and password, returns bearer token)

POST
/logout
(enter Bearer Token, revokes the token)
```
