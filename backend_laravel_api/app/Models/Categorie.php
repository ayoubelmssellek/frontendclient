<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
 use App\Models\Product;   
use App\Models\SpecialOffer;
class Categorie extends Model
{
    protected $fillable = [
        'name',
        'image',
        'status',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function specialOffers()
    {
        return $this->belongsToMany(SpecialOffer::class, 'special_offer_category', 'category_id', 'special_offer_id');
    }
}
