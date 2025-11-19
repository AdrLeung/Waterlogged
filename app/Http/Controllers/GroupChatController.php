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
            'SELECT DISTINCT name, groupChat.id
             from groupChat
             join groupChat_user on groupChat_user.ID = groupChat.id
             where groupChat_user.email = ? ',
            [$email]
        );
        $groupChatsUserNotIn = DB::select(
            'SELECT *
            from groupchat
            where id not in (
                select ID
                from groupChat_user
                where email = ?
            )
            ',
            [$email]
        );

        return Inertia::render("GroupChat/IndexGroupChats", ['groupsUserIsIn' => $groupChatsUserIsIn, 'groupsUserIsNotIn' => $groupChatsUserNotIn]);
    }

    // you may or made not need this route
    public function create()
    {
        return Inertia::render("GroupChat/CreateGroupChat");
    }


    public function store(Request $request)
    {
        $validated = $request->validate(['groupChatName' => 'required|string|max:255']);
        $groupChatName = $validated['groupChatName'];
        DB::insert('INSERT INTO groupChat (name, created_at) values (?, ?)', [$groupChatName, now()]);
        $groupChatId = DB::getPdo()->lastInsertId();
        $userEmail = Auth::user()->email;
        DB::insert('INSERT INTO groupChat_user (email, ID) values (?, ?)', [$userEmail, $groupChatId]);

        return redirect()->route("groupChat.show", ['id' => $groupChatId]);
    }


    public function show(string $id)
    {
        $email = Auth::user()->email;

        $group = DB::select('SELECT * from groupChat where ID = ?', [$id]);

        $messages = DB::select(
            'SELECT user.email, user.username, message.data, message.timeSent, message.id
            from message
            join user on user.email = message.email
            where groupChatId = ?
            order by timeSent ASC',
            [$id]
        );

        $groupChatsUserIsIn = DB::select(
            'SELECT user.email, user.username, message.data, message.timeSent
            from message
            join user on user.email = message.email
            where groupChatId = ?
            order by timeSent ASC',
            [$id]
        );
        $usersInGroup = DB::select('SELECT DISTINCT user.username
                                    from user
                                    join groupChat_user as gcu on user.email = gcu.email
                                    where user.email <> ?', [$email]);
        return Inertia::render("GroupChat/ShowGroupChat", ['groupInfo' => $group, 'messages' => $messages, 'groupsUserIsIn' => $groupChatsUserIsIn, 'usersInGroup' => $usersInGroup]);
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

    public function leave(int $groupChatId)
    {
        $email = Auth::user()->email;
        DB::delete('DELETE FROM  groupChat_user where email = ? and ID = ?', [$email, $groupChatId]);
        return redirect()->route("groupChat.index");
    }
}
