<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function index(Request $request)
    {
        $comments = PostComment::where('post_id', $request->post_id)
            ->with('user')
            ->get();
        return response()->json($comments);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'text' => 'required',
            'file' => 'nullable|file|mimes:jpeg,png,gif,mp4|max:2048',
        ]);
        if ($request->hasFile('file')) {
            $mediaPath = $request->file('file')->store('media_content');
            $validatedData['file'] = $mediaPath;
        }
        $validatedData['user_id'] = $request->user()->id;
        $comment = PostComment::create($validatedData);
        return response()->json($comment, 201);
    }
    public function destroy(PostComment $postComment)
    {
        $postId = $postComment->post_id;
        $postComment->delete();

        // return redirect()->route('posts.show', $postId);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $comment = new PostComment();
    //     $comment->content = $request->input('content');
    //     $comment->user_id = auth()->user()->id; // Assuming you have authentication set up
    //     $comment->post_id = $request->input('post_id');
    //     $comment->save();

    //     return redirect()->back();
    // }
}
