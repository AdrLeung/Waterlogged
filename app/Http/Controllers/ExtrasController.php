<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ExtrasController extends Controller
{
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
                    )
            );
            ',
        );

        $superUsers = DB::select(
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

        $great_users = DB::select(
            'SELECT u.email, u.username, COUNT(DISTINCT o.scientificName) AS speciesCount
            FROM user u
            JOIN observation o ON o.email = u.email
            GROUP BY u.email
            HAVING COUNT(DISTINCT o.scientificName) >= 2
            '
        );


        return Inertia::render("Project/ExtrasDashboard", [
            "projects" => $projects,
            "superUsers" => $superUsers,
            "greatUsers" => $great_users
        ]);
    }


    public function welcome()
    {
        $isProfessional = UserService::isProfessional();
        return Inertia::render("Welcome", ["isProfessional" => $isProfessional]);
    }
}
