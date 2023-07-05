<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function index(Request $request)
    {
        $comments = PostComment::where('post_id', $request->post_id)
            ->whereNull('parent_id')
            ->with('user', 'replies.user')
            ->get();
        return response()->json($comments);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'parent_id' => 'exists:post_comments,id',
            'text' => 'required',
            'file' => 'nullable|file|mimes:jpeg,png,gif,mp4|max:2048',
        ]);
        if ($request->hasFile('file')) {
            $mediaPath = $request->file('file')->store('media_content');
            $validatedData['media_url'] = $mediaPath;
        }
        $validatedData['user_id'] = $request->user()->id;
        $comment = PostComment::create($validatedData);
        return response()->json($comment, 201);
    }
    public function destroy(PostComment $postComment)
    {
        $postId = $postComment->post_id;
        $postComment->delete();

    }

}
