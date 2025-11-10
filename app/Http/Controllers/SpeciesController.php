<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SpeciesController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'scientificName' => 'required|string|max:255|unique:species,scientificName',
            'commonName'     => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'genus'          => 'required|string|exists:genus,genus',
        ]);
        DB::insert('INSERT into species (scientificName, commonName, description, genus) values (?, ?, ?, ?)', [
            $validated['scientificName'],
            $validated['commonName'] ?? null,
            $validated['description'] ?? null,
            $validated['genus']
        ]);
    }
}
