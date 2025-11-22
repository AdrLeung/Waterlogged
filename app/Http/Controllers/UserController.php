<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function indexSuper()
    {
        $email = Auth::user()->email;
        $super_users = DB::select(
            'SELECT *
            from user u
            WHERE NOT EXISTS (
                SELECT 1
                FROM project p
                WHERE p.projectID NOT IN (
                    SELECT po.projectID
                    FROM project_observation po
                    JOIN observation o ON o.observationID = po.observationID
                    WHERE o.email = u.email
                )
            ) '
        );
        dd($super_users);
    }
}
