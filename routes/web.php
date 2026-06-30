<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = request()->user();
        $totalTasks = $user->tasks()->count();
        $completedTasks = $user->tasks()->where('status', 'Done')->count();
        $pendingTasks = $user->tasks()->where('status', '!=', 'Done')->count();

        $lowPriorityCount = $user->tasks()->where('priority', 'Low')->count();
        $mediumPriorityCount = $user->tasks()->where('priority', 'Medium')->count();
        $highPriorityCount = $user->tasks()->where('priority', 'High')->count();

        $projectStats = $user->projects()
            ->withCount([
                'tasks',
                'tasks as completed_tasks_count' => function ($query) {
                    $query->where('status', 'Done');
                }
            ])
            ->latest()
            ->get()
            ->map(function($proj) {
                return [
                    'id' => $proj->id,
                    'name' => $proj->name,
                    'total_tasks' => $proj->tasks_count,
                    'completed_tasks' => $proj->completed_tasks_count,
                    'percent' => $proj->tasks_count > 0 ? round(($proj->completed_tasks_count / $proj->tasks_count) * 100) : 0
                ];
            });

        return Inertia::render('Dashboard', [
            'totalTasks' => $totalTasks,
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks,
            'priorityDistribution' => [
                ['name' => 'Low', 'count' => $lowPriorityCount],
                ['name' => 'Medium', 'count' => $mediumPriorityCount],
                ['name' => 'High', 'count' => $highPriorityCount],
            ],
            'projectStats' => $projectStats,
        ]);
    })->name('dashboard');

    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('projects.tasks', \App\Http\Controllers\TaskController::class)->shallow();

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
