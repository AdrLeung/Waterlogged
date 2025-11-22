<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfessionalController extends Controller
{
    public function index()
    {

        // dd(Auth::user()->email);
        $email = Auth::user()->email;
        $professionals = DB::select(
            'SELECT u.email, username, degree, certification, specialization
            from user u
            INNER JOIN professional p
            ON u.email = p.email
            WHERE u.email <> ?
            ',
            [$email]
        );
        $users = DB::select(
            'SELECT email, username
            from user u
            where u.email
            NOT IN (
                SELECT email
                from professional p)'
        );

        $usersProfessionalInfo = DB::select('SELECT * from professional where email = ?', [$email]);

        return Inertia::render("Professional/IndexUsers", [
            "professionals" => $professionals,
            "users" => $users,
            "usersProfessionalInfo" => $usersProfessionalInfo
        ]);
    }



    public function promote(String $email)
    {
        DB::insert('INSERT into professional (email) values (?)', [$email]);
    }


    public function update(Request $request)
    {
        DB::update(
            'UPDATE professional
            set degree=?,  certification=?, specialization=?
            where email = ?',
            [$request["degree"], $request["certification"], $request["specialization"], Auth::user()->email]
        );
    }

    public function promoteSelf()
    {
        DB::insert('INSERT into professional (email) values (?)', [Auth::user()->email]);
        return redirect()->route("welcome");
    }


    public function indexGems()
    {
        $projects = DB::select(
            'SELECT p.projectID, p.name, p.description, COUNT(po.observationID) as obs_amount
            FROM project p
            LEFT JOIN project_observation po ON p.projectID = po.projectID
            GROUP BY p.projectID
            HAVING COUNT(po.observationID) <
            (
                SELECT AVG(obs_count)
                FROM
                    (
                        SELECT p.projectID, COUNT(po.observationID) AS obs_count
                        FROM project p
                        LEFT JOIN project_observation po ON p.projectID = po.projectID
                        GROUP BY p.projectID
                    ) AS x
            );
            ',
        );

        return Inertia::render("Project/HiddenGemProjects", ["projects" => $projects]);
    }
}
