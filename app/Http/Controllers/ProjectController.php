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
        $projects = DB::select(
            'SELECT p.*, o.*, count(po.observationID) as observationCount
            FROM project p
            LEFT JOIN project_observation po ON p.projectID = po.projectID
            LEFT JOIN observation o ON o.observationID = po.observationID
            GROUP BY p.projectID
            '
        );
        return Inertia::render("Project/IndexProjects", [
            'isProfessional' => $isProfessional,
            'projects' => $projects
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Project/CreateProject");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $name = $request->input("name");
        $description = $request->input("desc");
        DB::insert('INSERT into project (name, description) values (?, ?)', [$name, $description]);
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


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
