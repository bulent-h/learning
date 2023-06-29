<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Events\NewMessage;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'text' => ['required', 'string'],
            'file' => ['nullable', 'mimes:jpg,jpeg,png,gif,mp4,webm', 'max:4096'],
        ]);
        $message = new Message;
        $message->sender_id = $request->user()->id;
        $message->receiver_id = (int) $request->receiver_id;
        $message->text_content = $request->text;
        $message->parent_id = $request->parent_id;
        if ($request->hasFile('file')) {
            $message->media_content_path = $request->file('file')->store('media', 'public');
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $mimeType = $file->getMimeType();
                if (str_contains($mimeType, 'video')) {
                    $message->media_type = 'video';
                } elseif (str_contains($mimeType, 'image')) {
                    $message->media_type = 'image';
                }
            }
        }
        $message->save();
        broadcast(new NewMessage($message));
        return $message;
    }
    public function reply(Request $request, Message $message)
    {
        $validatedData = $request->validate([
            'text' => ['required', 'string'],
            'file' => ['nullable', 'mimes:jpg,jpeg,png,gif', 'max:4096'],
        ]);
        $reply = new Message();
        $reply->sender_id = $request->user()->id;
        $reply->receiver_id = (int) $request->receiver_id;
        $reply->text_content = $validatedData['text'];
        $reply->parent_id = $message->id;
        $reply->save();
        return response()->json(['message' => 'Reply sent successfully']);
    }
    public function destroy(Request $request, Message $message)
    {
        if ($request->user()->id == $message['sender_id']) {
            $message->delete();
            return $message;

        }
    }
}
