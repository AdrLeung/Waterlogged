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
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");
        DB::statement("CREATE INDEX idx_user_email ON user(email);");
        DB::statement('PRAGMA foreign_keys = ON;');
    }
}
