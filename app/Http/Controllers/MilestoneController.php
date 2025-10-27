<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MilestoneController extends Controller
{
    public function index()
    {
        // dd(DB::select('SELECT * from phylum'));
        return Inertia::render("Milestone", ["phylums" => DB::select('SELECT * from phylum')]);
        // return DB::select('SELECT * from phylum');
    }

    public function store(Request $request)
    {
        $phylum = $request["phylum"];
        $kingdom = $request["kingdom"];

        DB::update('UPDATE phylum set kingdom = ? where phylum = ?', [$kingdom, $phylum]);
        return redirect()->route("milestone.index");
    }
}
