<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $isProfessional = Auth::user()?->email ? true : false;
        $projectObservations = DB::select(
            'SELECT p.projectID, p.name AS projectName, p.description, o.observationID, o.notes
            FROM project p
            LEFT JOIN project_observation po ON p.projectID = po.projectID
            LEFT JOIN observation o ON o.observationID = po.observationID
        '
        );

        $projectObservationCount = DB::select(
            'SELECT p.projectID, COUNT(*) as observationCount
            FROM project p
            LEFT JOIN project_observation po ON p.projectID = po.projectID
            LEFT JOIN observation o ON o.observationID = po.observationID
            GROUP BY p.projectID
        '
        );
        $projects = [];

        foreach ($projectObservations as $projectObservation) {
            $projectID = $projectObservation->projectID;

            if (!isset($projects[$projectID])) {
                $projects[$projectID] = [
                    'projectID' => $projectID,
                    'projectName' => $projectObservation->projectName,
                    'description' => $projectObservation->description,
                    'observations' => []
                ];
            }

            if ($projectObservation->observationID) {
                $projects[$projectID]['observations'][] = [
                    'observationID' => $projectObservation->observationID,
                    'notes' => $projectObservation->notes
                ];
            }
        }

        foreach ($projectObservationCount as $idCount) {
            $projects[$idCount->projectID]["observationCount"] =
                $idCount->observationCount;
        }

        return Inertia::render("Project/IndexProjects", [
            'isProfessional' => $isProfessional,
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render("Project/CreateProject");
    }


    public function store(Request $request)
    {
        $name = $request->input("name");
        $description = $request->input("desc");
        DB::insert('INSERT INTO project (name, description) VALUES (?, ?)', [$name, $description]);
        $projectID = DB::getPdo()->lastInsertId();

        return redirect()->route("project.show", $projectID);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $projectID)
    {
        $project = DB::select('SELECT * FROM project WHERE projectID = ?', [$projectID]);
        $project = $project[0] ?? null;

        $observations = DB::select(
            'SELECT *
         FROM observation
         WHERE observationID IN (
             SELECT observationID
             FROM project_observation
             WHERE projectID = ?
         )',
            [$projectID]
        );

        return Inertia::render("Project/ShowProject", [
            'name' => $project->name,
            'description' => $project->description,
            'observations' => $observations
        ]);
    }
}
