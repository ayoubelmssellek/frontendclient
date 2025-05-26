<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Product;
use App\Models\Categorie;
use App\Models\Type;


class Sale extends Model
{
    protected $fillable = [
        'sale_number',
        'product_id',
        'category_id',
        'type_id',
        'quantity',
        'total_price',
        'sold_at',
    ];



    // علاقة البيع مع الطلب (Order)
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // علاقة البيع مع المنتج (Product)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // علاقة البيع مع الفئة (Category)
    public function category()
    {
        return $this->belongsTo(Categorie::class);
    }

    // علاقة البيع مع النوع (Type)
    public function type()
    {
        return $this->belongsTo(Type::class);
    }


    protected static function booted()
    {
        static::creating(function ($sale) {
            $year = now()->year;

            $count = Sale::whereYear('created_at', $year)->count() + 1;

            $number = str_pad($count, 3, '0', STR_PAD_LEFT);

            $sale->sale_number = "SAL-$year-$number";
        });
    }
}
