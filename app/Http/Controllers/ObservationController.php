<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Date;
use Inertia\Inertia;

class ObservationController extends Controller
{
    public function create()
    {
        $locations = DB::select('SELECT * from location');
        $species = DB::select('SELECT * from species');
        $projects =  DB::select('SELECT * from project');
        $genusList =  DB::select('SELECT * from genus');
        return Inertia::render("Observation/CreateObservation", ['genusList' => $genusList, 'locations' => $locations, 'species' => $species, 'projects' => $projects]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'meanLatitude' => ['required', 'numeric', 'between:-90,90'],
            'meanLongitude' => ['required', 'numeric', 'between:-180,180'],
            'quantity' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
            'scientificName' => [
                'required',
                'string',
            ],
            'media' => ['nullable', 'array'],
            'projectIds' => ['nullable', 'array'],
            'projectIds.*' => ['integer', 'nullable'],
        ]);


        $email = Auth::user()->email;

        DB::insert('INSERT into observation
        (longitude, latitude, quantity, notes, meanLongitude, meanLatitude, scientificName, email, date )
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            $validated['longitude'],
            $validated['latitude'],
            $validated['quantity'],
            $validated['notes'] ?? null,
            $validated['meanLongitude'],
            $validated['meanLatitude'],
            $validated['scientificName'],
            $email,
            Carbon::now(),
        ]);

        $observationID = DB::getPdo()->lastInsertId();
        $projectIDs = $validated['projectIds'];
        foreach ($projectIDs as $projectId) {
            DB::insert('INSERT into project_observation (projectID, observationID) values (?, ?)', [$projectId, $observationID]);
        }
        $mediaID = 1;
        foreach ($validated["media"] as $url) {
            DB::insert('INSERT into media (mediaID, observationID, url) values (?, ?, ?)', [$mediaID, $observationID, $url]);
            $mediaID++;
        }
        return redirect()->route("project.index");
    }

    public function search()
    {
        $observations = DB::select("SELECT * FROM observation");
        $species = DB::select('SELECT * from species');

        return Inertia::render("Observation/IndexObservations", ["results" => $observations, "species" => $species]);
    }

    public function select() {}
}
