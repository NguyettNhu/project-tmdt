<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Menu extends Model
{
    public $table = 'menu';

    protected $fillable = [
        'name',
        'path',
        'icon',
        'color',
        'parent_id', 
        'type', 
        'status', 
        'sort', 
        'created_by', 
        'updated_by'
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
