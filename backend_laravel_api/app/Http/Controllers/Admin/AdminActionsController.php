<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminActionsController extends Controller
{
    public function GetAdminInfo(){
        $admin = User::where('role_id', 2)
        ->select('id','name', 'phone')
        ->first();
        return response()->json($admin);
    }
   
    public function UpdateAdminAccount(Request $request , $id)
{
    $user = Auth::user();

    $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:255|unique:users,phone,'.$id,
        'password' => 'nullable|string|min:4|confirmed',
        
    ]);

    $user->name = $request->name;
    $user->phone = $request->phone;

    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }

    $user->save();


}
}