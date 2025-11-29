## Waterlogged: A Citizen Science Application
### Adrian, Gavin, Simon
<img src="public\images\waterlogged.png" alt="logo" width=300>


Our goal for this project was to create a citizen science application, specifically focusing on tracking and documenting the distribution of marine flora and fauna species. Not only will the application assist in scientific research, such as ecological surveys and documentation of rare species, but it will also provide an outlet for hobbyists to explore, record and collaborate about the dynamic aquatic landscape.

To run our application you must have node, php, composer and laravel installed.


To install node go https://nodejs.org/en/download and follow the directions.


To install php, composer, and laravel follow the documentation for installing them from this link https://laravel.com/docs/12.x/installation

In order to run the app for the first time, you will need to do the following steps:
* Clone the repository
* `cd` to the repository
* Open a new terminal
* `composer install`
* `cp .env.example .env`
* `php artisan key:generate`
* Go to the database folder and create a new file named `database.sqlite`
* `php artisan database:create`
* `php artisan database:run`
* `npm install`
* `npm run build`
* `php artisan serve`

For subsequent runs:
* `cd` to the repository
* `npm run build`
* `php artisan serve`
