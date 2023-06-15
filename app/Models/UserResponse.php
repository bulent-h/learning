<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'exam_id',
        'question_id',
        'option_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    // public function selectedOption()
    // {
    //     return $this->belongsTo(Option::class, 'selected_option_id');
    // }

    public function option()
    {
        return $this->belongsTo(Option::class, 'selected_option_id');
    }
}
