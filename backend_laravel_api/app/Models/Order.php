<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\ItemOrder;
class Order extends Model
{
    protected $fillable = [
       'order_number',
        'name',
        'phonenumber',
        'delivery_type',
        'user_id',
        'total_order',
        'street',
        'housenumber',
        'status_order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function items()
    {
        return $this->hasMany(ItemOrder::class);
    }

}
