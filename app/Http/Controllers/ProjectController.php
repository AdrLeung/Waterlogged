<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->input('filters', []);

        $name = $filters['name'] ?? '';
        $species = (int) ($filters['species'] ?? 0);
        $observations = (int) ($filters['observations'] ?? 0);
        $contributors = (int) ($filters['contributors'] ?? 0);

        $isProfessional = UserService::isProfessional();

        $projectIDs = DB::select(
            'SELECT p.projectID
            FROM project p
            WHERE p.name LIKE ?
            AND p.projectID IN (
                SELECT p.projectID
                FROM project p
                LEFT JOIN project_user pu ON p.projectID = pu.projectID
                GROUP BY p.projectID
                HAVING COUNT(pu.email) >= ?
            )
            AND p.projectID IN (
                SELECT p.projectID
                FROM project p
                LEFT JOIN project_observation po ON po.projectID = p.projectID
                GROUP BY p.projectID
                HAVING COUNT(po.observationID) >= ?
            )
            AND p.projectID IN (
                SELECT p.projectID
                FROM project p
                LEFT JOIN project_observation po ON po.projectID = p.projectID
                LEFT JOIN observation o ON o.observationID = po.observationID
                GROUP BY p.projectID
                HAVING COUNT(DISTINCT o.scientificName) >= ?
            )',
            ['%' . $name . '%', $contributors, $observations, $species]
        );

        $ids = array_map(fn($x) => $x->projectID, $projectIDs);

        if (count($ids) === 0) {
            return Inertia::render('Project/IndexProjects', [
                'isProfessional' => $isProfessional,
                'projects' => []
            ]);
        }

        $projectObservations = DB::select(
            'SELECT p.projectID, p.name AS projectName, p.description, o.observationID, o.notes
         FROM project p
         LEFT JOIN project_observation po ON p.projectID = po.projectID
         LEFT JOIN observation o ON o.observationID = po.observationID
         WHERE p.projectID IN (' . implode(',', $ids) . ')'
        );

        $projectObservationCount = DB::select(
            'SELECT p.projectID, COUNT(o.observationID) AS observationCount
         FROM project p
         LEFT JOIN project_observation po ON p.projectID = po.projectID
         LEFT JOIN observation o ON o.observationID = po.observationID
         WHERE p.projectID IN (' . implode(',', $ids) . ')
         GROUP BY p.projectID'
        );

        $projects = [];

        foreach ($projectObservations as $po) {
            $id = $po->projectID;
            if (!isset($projects[$id])) {
                $projects[$id] = [
                    'projectID' => $id,
                    'projectName' => $po->projectName,
                    'description' => $po->description,
                    'observations' => [],
                ];
            }

            if ($po->observationID) {
                $projects[$id]['observations'][] = [
                    'observationID' => $po->observationID,
                    'notes' => $po->notes,
                ];
            }
        }

        foreach ($projectObservationCount as $count) {
            $projects[$count->projectID]['observationCount'] = $count->observationCount;
        }

        return Inertia::render('Project/IndexProjects', [
            'isProfessional' => $isProfessional,
            'projects' => $projects,
        ]);
    }


    public function create()
    {
        return Inertia::render('Project/CreateProject');
    }

    public function store(Request $request)
    {
        $name = $request->input('name');
        $description = $request->input('desc');
        DB::insert('INSERT INTO project (name, description) VALUES (?, ?)', [$name, $description]);
        $projectID = DB::getPdo()->lastInsertId();

        return redirect()->route('project.show', $projectID);
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

        return Inertia::render('Project/ShowProject', [
            'name' => $project->name,
            'description' => $project->description,
            'observations' => $observations,
        ]);
    }
}
