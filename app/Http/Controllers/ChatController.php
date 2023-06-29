<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Message;


class ChatController extends Controller
{
    public function index(Request $request)
    {
        $user = User::find($request->selectedUser);
        return Inertia::render('Chat', [
            'selectedUser' => $user
        ]);
    }
    public function getMessages(Request $request, $id)
    {
        $user = User::find($request->user()->id);
        $messages = $user->bothMessage($user->id, $id);
        return $messages;
    }
    public function getUsers()
    {
        $users = User::all();
        return $users;
    }
    public function getLastMessage(Request $request, $id)
    {
        $user = User::find($request->user()->id);
        $messageId = $user->bothMessage($user->id, $id)->max('id');
        $lastMessage = Message::find($messageId);
        return $lastMessage;
    }
}
