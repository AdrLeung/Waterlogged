<?php

namespace App\Http\Controllers;

use Barryvdh\Debugbar\Controllers\BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class MessageController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    // throws error code 422 (i think) on failure
    // if its good returns 201
    // also you cant hit this with inertia you gotta use normal fetch await
    // TODO make it so users not in the group cant send messages
    public function store(Request $request)
    {
        $validated = $request->validate(["groupId" => "required|int", "content" => "required|string"]);
        $userEmail = Auth::user()->email;
        DB::insert('INSERT into message (data, timeSent, groupChatId, email) values (?, ?, ?, ?)', [$validated["content"], now(), $validated["groupId"], $userEmail]);
        return response()->json([
            'status' => 'success',
            'message' => 'Message stored successfully'
        ], 201);
    }
}
