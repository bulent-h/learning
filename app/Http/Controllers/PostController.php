<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $posts = Post::all();
        $posts = Post::with('user')->get();
        return Inertia::render('Post/IndexPosts', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file' => 'mimes:jpg,bmp,png|nullable',

        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $post = new Post();
        $post->user_id = $request->user()->id;
        $post->title = $request->input('title');
        $post->content = $request->input('content');

        // Set other post attributes as needed
        $post->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $post = Post::findOrFail($request->post_id);

        return Inertia::render('Post/ShowPost', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', ['post' => $post]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file' => 'mimes:jpg,bmp,png|nullable',

        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $post->title = $request->input('title');
        $post->content = $request->input('content');
        // Update other post attributes as needed
        $post->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('posts.index');
    }
}
