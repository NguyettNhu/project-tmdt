<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }

    public function ajax_login(Request $request)
    {
       $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            // Nếu client mong JSON (Accept: application/json hoặc AJAX)
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'success'  => true,
                    'message'  => 'Đăng nhập thành công',
                    'redirect' => route('dashboard.view.index')
                ]);
            }

            // Fallback cho form submit thường
            return redirect()->route('dashboard.view.index');
        }

        // Sai thông tin
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu không đúng'
            ], 422);
        }

        // Fallback non-AJAX
        throw ValidationException::withMessages([
            'email' => 'Email hoặc mật khẩu không đúng',
        ]);
    }

    public function ajax_logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function removeUser(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Success'
        ]);
    }
}
