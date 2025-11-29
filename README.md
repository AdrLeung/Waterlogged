## Team 93s 
## Citizen Science Application



## Running our application 
To run our application you must have node, php, composer and laravel installed.

To install node go https://nodejs.org/en/download and follow the directions.

To install php, composer, and laravel follow the documentation for installing them from this link https://laravel.com/docs/12.x/installation

Once you have those installed pull a copy of this project down from github and follow the below steps.
1. run the command "composer install" within the project 
2. run the command "cp .env.example .env" within the project
3. run the command "php artisan key:generate"
4. create a new file within the database folder named "database.sqlite"
5. run the command "php artisan database:create" within the project
6. run the command "php artisan database:run" within the project
7. run the command "npm intall" within the project
7. run the command "npm run dev" within the project
7. run the command "php artisan serve" within the project
8. go to the URL http://127.0.0.1:8000/ and you should see our project!
