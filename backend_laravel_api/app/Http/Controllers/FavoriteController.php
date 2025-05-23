<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class FavoriteController extends Controller
{
 
   public function toggle($productId)
   {
       $user = Auth::user(); 
        
       $favorite = Favorite::where('user_id', $user->id)
                           ->where('product_id', $productId)
                           ->first();

       if ($favorite) {
           $favorite->delete();
           return response()->json(['status' => 'removed']);
       } else {
           Favorite::create([
               'user_id' => $user->id,
               'product_id' => $productId,
           ]);
           return response()->json(['status' => 'added'],201);
       }
   }


   public function index()
   {
       
    //   return response()->json(Auth::user()->favorites()->with('product')->get());  //Eloquent method
        
        $favorites = DB::table('favorites')
            ->join('products', 'favorites.product_id', '=', 'products.id') 
            ->join('categories', 'categories.id', '=', 'products.category_id') // التصحيح هنا
            ->where('favorites.user_id', Auth::id())
            ->select('products.*', 'categories.name as category_name')
            ->get();

        return response()->json($favorites);

   //SELECT products.*
   // FROM favorites
   // JOIN products ON favorites.product_id = products.id                            // Normal SQL
   // WHERE favorites.user_id = 5;

   }

}