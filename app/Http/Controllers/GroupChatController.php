<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Routing\Controller as BaseController;

class GroupChatController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    // this route returns all of the gcs the user is in and a seperate list of the gcs the user is not in
    public function index()
    {
        $email = Auth::user()->email;
        $groupChatsUserIsIn = DB::select(
            'SELECT name
             from groupChat
             join groupChat_user on groupChat_user.ID = groupChat.id
             where groupChat_user.email = ? ',
            [$email]
        );
        $groupChatsUserNotIn = DB::select(
            'SELECT name
             from groupChat
             join groupChat_user on groupChat_user.ID = groupChat.id
             where groupChat_user.email <> ? ',
            [$email]
        );

        dd($groupChatsUserIsIn, $groupChatsUserNotIn);
        // TODO fill in this route
        return redirect()->route("YOUR ROUTE HERE");
    }

    // you may or made not need this route
    public function create()
    {
        return Inertia::render("CreateGroupChat");
    }

    // hit this route by doing something like the below code
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     router.post(route("groupChat.store"), { groupChatName: groupName });
    // };

    public function store(Request $request)
    {
        $validated = $request->validate(['groupChatName' => 'required|string|max:255']);
        $groupChatName = $validated['groupChatName'];
        DB::insert('INSERT INTO groupChat (name, created_at) values (?, ?)', [$groupChatName, now()]);
        $groupChatId = DB::getPdo()->lastInsertId();
        $userEmail = Auth::user()->email;
        DB::insert('INSERT INTO groupChat_user (email, ID) values (?, ?)', [$userEmail, $groupChatId]);

        return redirect()->route("welcome");
    }


    public function show(string $id)
    {
        $messages = DB::select(
            'SELECT *
            from message
            where groupChatId = ?
            order by timeSent ASC',
            [$id]
        );
        dd($messages);
    }

    public function join(int $groupChatId)
    {
        $email = Auth::user()->email;
        DB::insert(
            'INSERT into groupChat_user (ID, email) values (?, ?)',
            [$groupChatId, $email]
        );
        return redirect()->route('groupChat.show', ['id' => $groupChatId]);
    }
}
