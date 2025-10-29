<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MilestoneController extends Controller
{
    public function index()
    {
        return Inertia::render("Milestone", [
            "projects" => DB::select('SELECT * FROM project')
        ]);
    }

    public function update(Request $request)
    {
        $id = $request["id"];
        $name = $request["name"];
        $description = $request["description"];

        DB::update(
            'UPDATE project SET name = ?, description = ? WHERE projectID = ?',
            [$name, $description, $id]
        );

        return redirect()->route("milestone.index");
    }

    public function delete(Request $request)
    {
        $id = $request["id"];
        DB::delete('DELETE FROM project WHERE projectID = ?', [$id]);
        return redirect()->route("milestone.index");
    }
}
