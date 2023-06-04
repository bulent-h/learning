<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request )
     {
         $comments=PostComment::where('post_id', $request->post_id)
             ->with('user')
             ->get();
         return response()->json($comments);
     }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'content' => 'required',
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
    /**
     * Display the specified resource.
     */
    public function show(PostComment $postComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostComment $postComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostComment $postComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostComment $postComment)
    {
        $postId = $postComment->post_id;
        $postComment->delete();

        return redirect()->route('posts.show', $postId);

    }
}
