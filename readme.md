 1. Install Everything through "npm install"
 2. Add "Mongo_URI" and "Token" to an .env file
 3. Use "npm start" to run

Routes - 
To register user
URL path : /api/register
Method Allowed : Post
body:{
    "name": User Name,
    "email": User Email,
    "password": User Password
}

To obtain an JWT token
URL path : /api/login
Method Allowed : Post
body: 
{
    "email" : User Email,
    "password" : User Password
}

To search for shows. You will need to use JWT token in header.
URL path : /api/search
Method Allowed : Post
Header : 
"auth-token" : JWT token obtained.
body:{
    "title" : Search Text 
}
