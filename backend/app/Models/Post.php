<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;

class Post extends Model
{
    public $table = 'posts';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'image',
        'parent_id',
        'status',
        'created_by',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
