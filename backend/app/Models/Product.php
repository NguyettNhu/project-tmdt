<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Category;

class Product extends Model
{
    public $table = 'products';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'slug',
        'avatar',
        'description',
        'content',
        'price',
        'sale_price',
        'sold',
        'status',
        'parent_id',
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

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
