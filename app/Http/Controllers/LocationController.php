<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $name = $request->input('name');
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');

        DB::statement('INSERT INTO location (name, meanLatitude, meanLongitude) VALUES (?, ?, ?)', [
            $name,
            $latitude,
            $longitude
        ]);
        return redirect()->route("users.index");
    }
}
