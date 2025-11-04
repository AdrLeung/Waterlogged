<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckProfessionalMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('welcome');
        }
        $email = Auth::user()->email;
        if (!DB::select('SELECT 1 from professional where email = ?', [$email])) {
            abort(403, "you are not aa pro");
        }
        // dd($email);
        return $next($request);
    }
}
