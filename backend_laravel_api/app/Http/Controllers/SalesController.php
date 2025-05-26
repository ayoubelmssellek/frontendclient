<?php


namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesController extends Controller
{
    public function index()
    {
        $sales = DB::table('sales')
            ->join('products', 'sales.product_id', '=', 'products.id')
            ->join('categories', 'sales.category_id', '=', 'categories.id')
            ->join('types', 'sales.type_id', '=', 'types.id')
            ->select(
                'sales.id',
                'sales.sale_number',
                'sales.quantity',
                'sales.total_price',
                'sales.sold_at',

                // منجدبين من العلاقات
                'products.name as product_name',
                'products.price as product_price',
                'categories.name as category_name',
                'types.name as type_name'
            )
            ->get();
        return response()->json($sales);
    }
    public function topCategories()
    {
        $topCategories = Sale::select('category_id', DB::raw('SUM(total_price) as total_sales'))
            ->groupBy('category_id')
            ->orderByDesc('total_sales')
            ->take(10)
            ->with('category:name,id')
            ->get();

        return response()->json($topCategories);
    }

    public function topTypes()
    {
        $topTypes = Sale::select('type_id', DB::raw('SUM(total_price) as total_sales'))
            ->groupBy('type_id')
            ->orderByDesc('total_sales')
            ->take(10)
            ->with('type:name,id')
            ->get();

        return response()->json($topTypes);
    }

    public function salesByProduct()
    {
        $sales = Sale::select('product_id', DB::raw('SUM(quantity) as total_quantity'), DB::raw('SUM(total_price) as total_sales'))
            ->groupBy('product_id')
            ->orderByDesc('total_sales')
            ->with('product:name,id')
            ->get();

        return response()->json($sales);
    }
}
