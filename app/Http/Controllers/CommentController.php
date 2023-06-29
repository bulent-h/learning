<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'text' => 'required',
            'media_url' => 'nullable|file|mimes:jpeg,png,gif,mp4|max:2048',
        ]);
        if ($request->hasFile('media_url')) {
            $mediaPath = $request->file('media_url')->store('media_url');
            $validatedData['media_url'] = $mediaPath;
        }
        $validatedData['user_id'] = $request->user()->id;
        $comment = Comment::create($validatedData);
        return response()->json($comment, 201);
    }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'text' => 'required',
            'media_url' => 'nullable|file|mimes:jpeg,png,gif,mp4|max:2048',
        ]);
        $comment = Comment::findOrFail($id);
        if ($request->hasFile('media_url')) {
            $mediaPath = $request->file('media_url')->store('media_url');
            $validatedData['media_url'] = $mediaPath;
        }
        $comment->update($validatedData);
        return response()->json($comment);
    }
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
    public function storeReply(Request $request, $parentId)
    {
        $validatedData = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'text' => 'required',
            'media_url' => 'nullable|file|mimes:jpeg,png,gif,mp4|max:2048',
        ]);
        if ($request->hasFile('media_url')) {
            $mediaPath = $request->file('media_url')->store('media_url');
            $validatedData['media_url'] = $mediaPath;
        }
        $reply = Comment::create($validatedData);
        $reply->parent_id = $parentId;
        $reply->save();
        return response()->json(['message' => 'Reply comment created successfully']);
    }
    public function index(Request $request)
    {
        $comments = Comment::where('lesson_id', $request->lesson_id)
            ->with('user')
            ->get();
        return response()->json($comments);
    }
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }
}
