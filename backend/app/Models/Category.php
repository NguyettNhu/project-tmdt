<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Category extends Model
{
    public $table = 'categories';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'slug',
        'status',
        'content',
        'image',
        'type',
        'parent_id',
        'created_by',
        'updated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }
}

