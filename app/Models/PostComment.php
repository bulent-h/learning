<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use HasFactory;

    protected $fillable=['post_id','content','user_id','media_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship to the post the comment belongs to
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
