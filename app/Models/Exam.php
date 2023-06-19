<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id' ,
        'title',
        'description',
        'is_open',
        'duretion',
        'start_time',
        'end_time'
    ];
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

}
