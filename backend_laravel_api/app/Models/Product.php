<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Categorie;
use App\Models\Type;
use App\Models\ItemOrder;
class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'date_add_product',
        'disponible',
        'image_path',
        'category_id',
        'type_id',
        'status'
    ];

    public function category()
    {
        return $this->belongsTo(Categorie::class,'category_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class,'type_id');
    }

    public function orderItems()
    {
        return $this->hasMany(ItemOrder::class);
    }

    public function specialOffers() {
    return $this->belongsToMany(SpecialOffer::class, 'special_offer_product');
    }

}
