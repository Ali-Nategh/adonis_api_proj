# AdonisJS API Project

Users have:
  - A Profile
  - Tasks
  - A Role

Routes:
```
Method	      Path	                      Handler	                  Name	   
GET,HEAD	    /users	                    UsersController.index	    users.index	
POST	        /users	                    UsersController.store 	  users.store	
GET,HEAD	    /users/:id	                UsersController.show	    users.show	
PUT,PATCH	    /users/:id	                UsersController.update	  users.update	
DELETE	      /users/:id	                UsersController.destroy	  users.destroy	
GET,HEAD	    /users/:user_id/tasks	      TasksController.index 	  users.tasks.index	
POST	        /users/:user_id/tasks	      TasksController.store	    users.tasks.store	
GET,HEAD	    /users/:user_id/tasks/:id	  TasksController.show	    users.tasks.show	
PUT,PATCH	    /users/:user_id/tasks/:id	  TasksController.update	  users.tasks.update	
DELETE	      /users/:user_id/tasks/:id	  TasksController.destroy 	users.tasks.destroy	
POST	        /register	                  AuthController.register		
POST	        /verify	                    AuthController.verify		
POST	        /login	                    AuthController.login
```
