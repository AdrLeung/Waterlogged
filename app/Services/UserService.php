<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserService
{
    public static function isProfessionalEmail($email)
    {
        $result = DB::select(
            "SELECT COUNT(*) as count
             FROM professional
             WHERE email = ?",
            [$email]
        );

        return $result[0]->count > 0;
    }
    public static function isProfessional()
    {
        if (!Auth::check()) {
            return false;
        }
        $result = DB::select(
            "SELECT COUNT(*) as count
             FROM professional
             WHERE email = ?",
            [Auth::user()->email]
        );

        return $result[0]->count > 0;
    }
}
