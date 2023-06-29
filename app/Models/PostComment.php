<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use HasFactory;

    protected $fillable=['post_id','text','user_id','media_url','parent_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function parent()
    {
        return $this->belongsTo(PostComment::class, 'parent_id');
    }
    public function replies()
    {
        return $this->hasMany(PostComment::class, 'parent_id');
    }
}
