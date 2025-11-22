<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class UserService
{
    public static function isProfessional($email)
    {
        $result = DB::select(
            "SELECT COUNT(*) as count
             FROM professional
             WHERE email = ?",
            [$email]
        );

        return $result[0]->count > 0;
    }
}
