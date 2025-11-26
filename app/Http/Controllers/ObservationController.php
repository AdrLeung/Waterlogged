<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Date;
use Inertia\Inertia;

use function PHPUnit\Framework\isArray;

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
            'scientificName' => ['required', 'string'],
            'media' => ['nullable', 'array'],
            'media.*.url' => ['nullable', 'string'],
            'media.*.type' => ['nullable', 'string'],
            'projectIds' => ['nullable', 'array'],
            'projectIds.*' => ['integer', 'nullable'],
        ]);

        $email = Auth::user()->email;

        DB::insert(
            'INSERT into observation
        (longitude, latitude, quantity, notes, meanLongitude, meanLatitude, scientificName, email, date )
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $validated['longitude'],
                $validated['latitude'],
                $validated['quantity'],
                $validated['notes'] ?? null,
                $validated['meanLongitude'],
                $validated['meanLatitude'],
                $validated['scientificName'],
                $email,
                Carbon::now(),
            ]
        );

        $observationID = DB::getPdo()->lastInsertId();

        $projectIDs = $validated['projectIds'] ?? [];
        foreach ($projectIDs as $projectId) {
            DB::insert(
                'INSERT into project_observation (projectID, observationID)
            values (?, ?)',
                [
                    $projectId,
                    $observationID
                ]
            );
        }

        $mediaID = 1;

        foreach ($validated['media'] ?? [] as $media) {
            if (!$media['url']) continue;

            DB::insert(
                'INSERT into media (mediaID, observationID, url, mediaType)
            values (?, ?, ?, ?)',
                [
                    $mediaID,
                    $observationID,
                    $media['url'],
                    $media['type'] ?: null
                ]
            );

            $mediaID++;
        }

        return redirect()->route("project.index");
    }


    public function search(Request $request)
    {
        $allowedFields = [
            "scientificName",
            "quantity",
            "date",
            "dateConfirmed",
            "email",
            "professionalEmail",
            "latitude",
            "longitude",
            "meanLatitude",
            "meanLongitude",
            "notes"
        ];

        $alias_to_feild_map  = [
            "scientificName"    => "scientificName",
            "quantity"          => "quantity",
            "date"              => "date",
            "dateConfirmed"     => "dateConfirmed",
            "email"             => "email",
            "verifiedBy"        => "professionalEmail",
            "preciseLocation"   => ["latitude", "longitude"],
            "location"          => ["meanLatitude", "meanLongitude"],
            "notes"             => "notes",
        ];

        $projection = $request->input('projection', []);
        $wanted_feilds = [];





        foreach ($projection as $feild) {
            $value = $alias_to_feild_map[$feild];
            if (is_array($value)) {
                foreach ($value as $label) {
                    $wanted_feilds[] = $label;
                }
            } else {
                $wanted_feilds[] = $alias_to_feild_map[$feild];
            }
        }


        if (empty($wanted_feilds)) {
            $wanted_feilds = $allowedFields;
        }

        $wanted_feilds[] = "observationID";

        $need_location_name = in_array("meanLongitude", $wanted_feilds);

        if ($need_location_name) {

            foreach ($wanted_feilds as &$feild) {
                $feild = "o." . $feild;
            }
            $fieldsString = implode(", ", $wanted_feilds);

            $observations = DB::select(
                "SELECT $fieldsString, l.name
                    FROM observation o
                    JOIN location l ON l.meanLatitude = o.meanLatitude AND l.meanLongitude = o.meanLongitude"
            );
        } else {
            $fieldsString = implode(", ", $wanted_feilds);

            $observations = DB::select("SELECT $fieldsString FROM observation");
        }

        return Inertia::render("Observation/IndexObservations", [
            "results" => $observations
        ]);
    }

    public function select() {}

    public function show(int $id)
    {
        $observation = DB::select(
            'SELECT o.*, u.username
            FROM observation o
            JOIN user u ON u.email = o.email
            WHERE o.observationID=?',
            [$id]
        );

        $media = DB::select(
            'SELECT *
            FROM media
            WHERE observationID=?',
            [$id]
        );

        $output = [];
        $output = $observation[0];
        $output->media = $media;

        return Inertia::render("Observation/ShowObservation", ["observation" => $output, "isProfessional" => UserService::isProfessional()]);
    }

    public function verify(int $id)
    {
        DB::update('UPDATE observation set professionalEmail=? where observationID=?', [Auth::user()->email, $id]);
    }

    public function edit(int $id)
    {

        $observation = DB::select('SELECT * FROM observation o WHERE o.observationID=?', [$id]);
        $locations = DB::select('SELECT * from location');
        $species = DB::select('SELECT * from species');
        $projects =  DB::select('SELECT * from project');
        $genusList =  DB::select('SELECT * from genus');
        $media = DB::select("SELECT * from media m WHERE observationID=?", [$id]);

        return Inertia::render("Observation/UpdateObservation", [
            "observation" => $observation,
            'genusList' => $genusList,
            'locations' => $locations,
            'species' => $species,
            'projects' => $projects,
            "media" => $media
        ]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'meanLatitude' => ['required', 'numeric', 'between:-90,90'],
            'meanLongitude' => ['required', 'numeric', 'between:-180,180'],
            'quantity' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
            'scientificName' => ['required', 'string'],
            'media' => ['nullable', 'array'],
            'media.*.url' => ['nullable', 'string'],
            'media.*.type' => ['nullable', 'string'],
            'projectIds' => ['nullable', 'array'],
            'projectIds.*' => ['integer', 'nullable'],
        ]);

        DB::update(
            'UPDATE observation SET
            longitude = ?,
            latitude = ?,
            meanLongitude = ?,
            meanLatitude = ?,
            quantity = ?,
            notes = ?,
            scientificName = ?
        WHERE observationID = ?',
            [
                $validated['longitude'],
                $validated['latitude'],
                $validated['meanLongitude'],
                $validated['meanLatitude'],
                $validated['quantity'],
                $validated['notes'] ?? null,
                $validated['scientificName'],
                $id
            ]
        );

        DB::delete('DELETE FROM project_observation WHERE observationID = ?', [$id]);
        $projectIDs = $validated['projectIds'] ?? [];
        foreach ($projectIDs as $projectId) {
            DB::insert(
                'INSERT INTO project_observation (projectID, observationID) VALUES (?, ?)',
                [$projectId, $id]
            );
        }

        DB::delete('DELETE FROM media WHERE observationID = ?', [$id]);
        $mediaID = 1;
        foreach ($validated['media'] ?? [] as $media) {
            if (!$media['url']) continue;

            DB::insert(
                'INSERT INTO media (mediaID, observationID, url, mediaType) VALUES (?, ?, ?, ?)',
                [
                    $mediaID,
                    $id,
                    $media['url'],
                    $media['type'] ?? null
                ]
            );
            $mediaID++;
        }

        return redirect()->route('observation.show', ['id' => $id]);
    }
}
