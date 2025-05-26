<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ItemOrder;



class OrderController extends Controller
{

    public function GetAllOrders(Request $request) {
        $orders = DB::table('orders')->orderBy('created_at', 'desc')->get();

        $ordersWithItems = $orders->map(function ($order) {
            $items = DB::table('item_orders')
                ->join('products', 'item_orders.product_id', '=', 'products.id')
                ->select('item_orders.*', 'products.name as product_name')
                ->where('item_orders.order_id', $order->id)
                ->get();

            $order->items = $items;
            return $order;
        });

        return response()->json([
            'message' => '✅ تم جلب الطلبات بنجاح',
            'orders' => $ordersWithItems,
        ], 200);
    }


    // public function GetOrderById($id){
    //     $order = DB::table('orders')
    //         ->join('item_orders', 'orders.id', '=', 'item_orders.order_id')
    //         ->join('products', 'item_orders.product_id', '=', 'products.id')
    //         ->select('orders.', 'item_orders.','products.name as product_name')
    //         ->where('orders.id', $id)
    //         ->get();
    //     return response()->json([
    //         'message' => '✅ تم جلب الطلب بنجاح',
    //         'order' => $order,
    //     ], 200);
    // }

    public function GetUserOrders(Request $request)
    {
        $user_id = auth('sanctum')->user()->id;

        // جلب الطلبات ديال المستخدم فقط
        $orders = DB::table('orders')
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        // دمج العناصر مع كل طلب
        $ordersWithItems = $orders->map(function ($order) {
            $items = DB::table('item_orders')
                ->join('products', 'item_orders.product_id', '=', 'products.id')
                ->select('item_orders.*', 'products.name as product_name', 'products.image_path as product_image')
                ->where('item_orders.order_id', $order->id)
                ->get();

            $order->items = $items;
            return $order;
        });

        return response()->json([
            'message' => '✅ تم جلب الطلبات بنجاح',
            'orders' => $ordersWithItems,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phonenumber' => 'required|digits:10',
            'delivery_type' => 'required|string|in:delivery,pickup',
            'status' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.total_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'street' => 'required_if:delivery_type,delivery|string|max:255',
            'housenumber' => 'max:100',
        ]);
        DB::beginTransaction();

        try {
            $order = Order::create([
                'order_number' => '#ORD-' . str_pad(Order::max('id') + 1, 5, '0', STR_PAD_LEFT),
                'user_id' => auth('sanctum')->check() ? auth('sanctum')->user()->id : null,
                'total_order' => array_sum(array_column($validated['items'], 'total_price')),
                'name' => $validated['name'],
                'phonenumber' => $validated['phonenumber'],
                'delivery_type' => $validated['delivery_type'],
                'street' => $validated['delivery_type'] === 'delivery' ? $validated['street'] : null,
                'housenumber' => $validated['delivery_type'] === 'delivery' ? $validated['housenumber'] : null,
                'status' => $validated['status'],
            ]);

            foreach ($validated['items'] as $item) {
                ItemOrder::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'total_price' => $item['total_price'],
                    'quantity' => $item['quantity'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => '✅ تم إنشاء الطلب بنجاح',
                'order' => $order,
                'items' => $order->items,
                'order_id' => $order->id,
                'order_number' => $order->order_number
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => '❌ وقع خطأ أثناء إنشاء الطلب',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function UpdateOrderStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => '❌ الطلب غير موجود',
            ], 404);
        }

        $order->status = $validated['status'];
        $order->save();

        if($validated['status'] === 'delivered') {
            return response()->json([
                'message' => '✅ تم تحديث حالة الطلب إلى "تم التوصيل" بنجاح',
                'order' => $order,
            ], 200);
        }

        return response()->json([
            'message' => '✅ aaaaaaaaaaaaaa تم تحديث حالة الطلب بنجاح',
            'order' => $order,
        ], 200);
    }
}