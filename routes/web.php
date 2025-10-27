<?php

use App\Http\Controllers\GroupChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MilestoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name("welcome");

Route::get('/create-group-chat', [GroupChatController::class, "create"])->name("groupChat.create");
Route::post('/store-group-chat', [GroupChatController::class, "store"])->name("groupChat.store");
Route::get('/group-chats', [GroupChatController::class, "index"])->name("groupChat.list");
Route::get('/group-chat/{id}', [GroupChatController::class, "show"])->name("groupChat.show");
Route::get('/join-group-chat/{id}', [GroupChatController::class, "join"])->name("groupChat.join");

Route::post('/send-message', [MessageController::class, "store"])->name("message.send");

Route::get('/milestone', [MilestoneController::class, "index"])->name("milestone.index");
Route::post('/milestonestore', [MilestoneController::class, "store"])->name("milestone.store");

Route::get('/test', function () {
    return "test";
})->name("test");




require __DIR__ . '/auth.php';
