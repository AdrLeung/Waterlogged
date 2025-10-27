<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RunDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'database:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::statement('PRAGMA foreign_keys = OFF;');
        DB::statement("DROP TABLE IF EXISTS user;");

        DB::statement("CREATE TABLE user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR(255) NOT NULL UNIQUE,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL

            );
        ");
        DB::statement("INSERT INTO user (email, username, password)
            VALUES ('johnSmith@gmail.com', 'jsmithy', '1234'),
                   ('johnDoe@gmail.com', 'johnDoe', '12j3h1k2h3'),
                   ('gavinKrebbers@gmail.com', 'GBoy', 'ilovepasswords'),
                   ('janeDoe@gmail.com', 'jDoe', '1234'),
                   ('randomUser@gmail.com', 'jsmithy', '123N*!(2342d)'),
                   ('Simon@gmail.com', 'Simon', 'IlikeResearch'),
                   ('rachelResearch@gmail.com', 'rachelResearch', 'IlikeResearch'),
                   ('robertResearch@gmail.com', 'robertResearch', 'IlikeResearch'),
                   ('raoulResearch@gmail.com', 'raoulResearch', 'IlikeResearch'),
                   ('rdanielResearch@gmail.com', 'rdanielResearch', 'IlikeResearch'),
                   ('rowanResearch@gmail.com', 'rowanResearch', 'kjdssp');");
        DB::statement("CREATE INDEX idx_user_email ON user(email);");
        DB::statement('PRAGMA foreign_keys = ON;');
    }
}
