<?php

use App\Http\Controllers\GroupChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\ObservationController;
use App\Http\Controllers\ProfessionalController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SpeciesController;
use App\Http\Middleware\CheckProfessionalMiddleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name("welcome");

Route::get('/create-group-chat', [GroupChatController::class, "create"])->name("groupChat.create");
Route::post('/store-group-chat', [GroupChatController::class, "store"])->name("groupChat.store");
Route::get('/group-chats', [GroupChatController::class, "index"])->name("groupChat.index");
Route::get('/group-chat/{id}', [GroupChatController::class, "show"])->name("groupChat.show");
Route::post('/join-group-chat/{id}', [GroupChatController::class, "join"])->name("groupChat.join");
Route::post('/leave-group-chat/{id}', [GroupChatController::class, "leave"])->name("groupChat.leave");

Route::post('/send-message', [MessageController::class, "store"])->name("message.store");
Route::post('/delete-message/{id}', [MessageController::class, "delete"])->name("message.delete");

Route::get('/create-observation', [ObservationController::class, "create"])->name("observation.create")->middleware('auth');
Route::post('/store-observation', [ObservationController::class, "store"])->name("observation.store")->middleware('auth');
Route::get('/search-observations', [ObservationController::class, "search"])->name("observation.search");
Route::get('/select-observations', [ObservationController::class, "select"])->name("observation.search");

Route::post('/create-species', [SpeciesController::class, "store"])->name("species.store");

Route::get('/create-project', [ProjectController::class, 'create'])->name("project.create")->middleware(CheckProfessionalMiddleware::class);
Route::post('/store-project', [ProjectController::class, 'store'])->name("project.store")->middleware(CheckProfessionalMiddleware::class);
Route::get('/store-project', [ProjectController::class, 'index'])->name("project.index");
Route::get('/project/{id}', [ProjectController::class, 'show'])->name("project.show");


Route::get('/milestone', [MilestoneController::class, "index"])->name("milestone.index");
Route::post('/milestonestore', [MilestoneController::class, "update"])->name("milestone.update");
Route::delete('/milestonedelete', [MilestoneController::class, "delete"])->name("milestone.delete");
Route::post('/milestone/store', [MilestoneController::class, 'store'])->name('milestone.store');


Route::get('/users', [ProfessionalController::class, "index"])->name("users.index")->middleware(CheckProfessionalMiddleware::class);
Route::post('/promote-user/{email}', [ProfessionalController::class, "promote"])->name("users.promote")->middleware(CheckProfessionalMiddleware::class);
Route::delete('/demote-professional/{email}', [ProfessionalController::class, "demote"])->name("professional.demote")->middleware(CheckProfessionalMiddleware::class);
Route::post('/update-credentials', [ProfessionalController::class, "update"])->name("professional.update");



Route::get('/test', function () {
    return "test";
})->name("test")->middleware(CheckProfessionalMiddleware::class);



require __DIR__ . '/auth.php';
