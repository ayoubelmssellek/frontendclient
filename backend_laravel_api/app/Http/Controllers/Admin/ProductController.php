<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ProductController extends Controller 
{


public function index()
{
    $now = Carbon::now();

    // استعلام المنتجات
    $products = DB::table('products')
        ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
        ->leftJoin('types', 'products.type_id', '=', 'types.id')
        ->select('products.*', 'categories.name as category_name', 'types.name as type_name')
        ->get();

    foreach ($products as $product) {
        $applicableOffers = collect();

        // عروض المنتج المباشرة
        $productOffers = DB::table('special_offers')
            ->join('special_offer_product', 'special_offers.id', '=', 'special_offer_product.special_offer_id')
            ->where('special_offer_product.product_id', $product->id)
            ->where('startDate', '<=', $now)
            ->where('endDate', '>=', $now)
            ->get();

        // عروض على الفئة
        $categoryOffers = DB::table('special_offers')
            ->join('special_offer_category', 'special_offers.id', '=', 'special_offer_category.special_offer_id')
            ->where('special_offer_category.category_id', $product->category_id)
            ->where('startDate', '<=', $now)
            ->where('endDate', '>=', $now)
            ->get();

        // عروض على النوع
        $typeOffers = DB::table('special_offers')
            ->join('special_offer_type', 'special_offers.id', '=', 'special_offer_type.special_offer_id')
            ->where('special_offer_type.type_id', $product->type_id)
            ->where('startDate', '<=', $now)
            ->where('endDate', '>=', $now)
            ->get();

        // دمج العروض
        $allOffers = $productOffers->merge($categoryOffers)->merge($typeOffers);

        // اختيار العرض الأفضل (أعلى خصم)
        $bestOffer = $allOffers->sortByDesc('discount')->first();

        $product->discount = $bestOffer->discount ?? 0;

        // عدد التقييمات
        $product->reviews_count = DB::table('reviews')
            ->where('product_id', $product->id)
            ->count();

        // عدد المفضلة
        $product->favorites_count = DB::table('favorites')
            ->where('product_id', $product->id)
            ->count();
    }

    return response()->json($products);
}



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'disponible' => 'required|boolean',
            'category_id' => 'required|exists:categories,id',
            'type_id' => 'required|exists:types,id',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('ProductsImages', 'public');
        }

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'date_add_product' => now(),
            'disponible' => $request->disponible,
            'image_path' => $imagePath,
            'category_id' => $request->category_id,
            'type_id' => $request->type_id,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'status' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'disponible' => 'required|boolean',
            'category_id' => 'required|exists:categories,id',
            'type_id' => 'required|exists:types,id',
        ]);

        $oldImage = $product->image_path;

        if ($request->hasFile('image')) {
            if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                Storage::disk('public')->delete($oldImage);
            }
            $imagePath = $request->file('image')->store('ProductsImages', 'public');
            $product->image_path = $imagePath;
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->disponible = $request->disponible;
        $product->category_id = $request->category_id;
        $product->type_id = $request->type_id;

        $product->save();

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ]);
    }

    public function UpdateProductStatus(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'status' => 'required|string|max:255',
        ]);


        $product->status = $request->status;
        
        $product->save();

        return response()->json([
            'message' => 'Product status updated successfully',
            'product' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
