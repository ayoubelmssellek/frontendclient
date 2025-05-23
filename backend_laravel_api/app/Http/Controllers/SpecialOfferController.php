<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SpecialOffer;
use Illuminate\Support\Facades\DB;


class SpecialOfferController extends Controller
{
        public function index()
        {
            $offers = DB::table('special_offers')
                ->leftJoin('special_offer_product', 'special_offers.id', '=', 'special_offer_product.special_offer_id')
                ->leftJoin('products', 'products.id', '=', 'special_offer_product.product_id')
                ->leftJoin('categories as product_category', 'product_category.id', '=', 'products.category_id')
                ->leftJoin('types as product_type', 'product_type.id', '=', 'products.type_id')

                ->leftJoin('special_offer_category', 'special_offers.id', '=', 'special_offer_category.special_offer_id')
                ->leftJoin('categories as offer_category', 'offer_category.id', '=', 'special_offer_category.category_id')

                ->leftJoin('special_offer_type', 'special_offers.id', '=', 'special_offer_type.special_offer_id')
                ->leftJoin('types as offer_type', 'offer_type.id', '=', 'special_offer_type.type_id')

                ->where('special_offers.endDate', '>', now())

                ->select(
                    'special_offers.*',
                    // product
                    'products.id as product_id',
                    'products.name as product_name',
                    'products.price as product_price',
                    'products.image_path as product_image',

                    // فئة المنتج (لو العرض خاص بمنتج)
                    'product_category.name as product_category_name',

                    // نوع المنتج (لو العرض خاص بمنتج)
                    'product_type.name as product_type_name',

                    // فئة العرض (لو العرض خاص بفئة)
                    'offer_category.name as offer_category_name',

                    // نوع العرض (لو العرض خاص بنوع)
                    'offer_type.name as offer_type_name'
                )
                ->get();


            return response()->json($offers);

        }

        public function store(Request $request)
        {
            $request->validate([
                'discount' => 'required|numeric|min:1|max:100',
                'startDate' => 'required|date',
                'endDate' => 'required|date|after:startDate',
            ]);

            $count = 0;
            if ($request->has('product_id')) $count++;
            if ($request->has('category_id')) $count++;
            if ($request->has('type_id')) $count++;

            if ($count === 0) {
                return response()->json(['error' => 'you must chose one product or type or category at less'], 422);
            }

            if ($count > 1) {
                return response()->json(['error' => 'the offre has be rolated in product or type or category'], 422);
            }

            $offer = SpecialOffer::create($request->only(['discount', 'startDate', 'endDate']));

            if ($request->has('product_id')) {
                $offer->products()->attach($request->product_id);
            } elseif ($request->has('category_id')) {
                $offer->categories()->attach($request->category_id);
            } elseif ($request->has('type_id')) {
                $offer->types()->attach($request->type_id);
            }

            return response()->json(['message' => 'offre created successfully', 'offer' => $offer], 201);
        }

        public function destroy($id)
        {
            $specialOffre = SpecialOffer::findOrFail($id);

            $specialOffre->products()->detach();
            $specialOffre->categories()->detach();
            $specialOffre->types()->detach();

            $specialOffre->delete();

            return response()->json(['message' => 'offre deleted successfully'], 200);
        }


}
