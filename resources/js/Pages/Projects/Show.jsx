import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Plus, Trash2, GripVertical, Calendar, Pencil, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import InputError from '@/Components/InputError';
import DatePicker from '@/Components/DatePicker';

const COLUMNS = ['To Do', 'In Progress', 'Done'];
const PRIORITIES = { 
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30', 
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30', 
    High: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900/30' 
};

// Memoized individual task card to avoid re-rendering all cards on any state change
const TaskCard = memo(function TaskCard({ task, draggingId, expanded, onToggleExpand, onDragStart, onDragEnd, isEditing, onEdit, onCancelEdit }) {
    const isDone = task.status === 'Done';
    const isDragging = draggingId === task.id;

    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const [editPriority, setEditPriority] = useState(task.priority);
    const [editDueDate, setEditDueDate] = useState(task.due_date || '');

    const handleSave = (e) => {
        e.preventDefault();
        if (!editTitle.trim()) return;
        router.put(route('tasks.update', task.id), {
            title: editTitle,
            description: editDesc,
            priority: editPriority,
            status: task.status,
            due_date: editDueDate || null
        }, {
            preserveScroll: true,
            onSuccess: () => onCancelEdit()
        });
    };

    const isPastDue = useMemo(() => {
        if (!task.due_date || isDone) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.due_date);
        return dueDate < today;
    }, [task.due_date, isDone]);

    if (isEditing) {
        return (
            <div className="surface border rounded-xl p-4 shadow-md space-y-3.5">
                <div>
                    <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Title</label>
                    <input 
                        type="text" 
                        value={editTitle} 
                        onChange={e => setEditTitle(e.target.value)} 
                        className="input-style w-full px-2.5 py-1.5 rounded-lg border text-xs" 
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Description</label>
                    <textarea 
                        value={editDesc} 
                        onChange={e => setEditDesc(e.target.value)} 
                        rows="2" 
                        className="input-style w-full px-2.5 py-1.5 rounded-lg border text-xs resize-none" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Priority</label>
                        <select 
                            value={editPriority} 
                            onChange={e => setEditPriority(e.target.value)} 
                            className="input-style w-full px-2.5 py-1.5 rounded-lg border text-xs"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Due Date</label>
                        <DatePicker 
                            value={editDueDate} 
                            onChange={setEditDueDate} 
                            placeholder="Select due date"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t divider">
                    <button 
                        type="button" 
                        onClick={onCancelEdit} 
                        className="px-3 py-1.5 border divider text-secondary hover:text-primary rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSave} 
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            draggable={!isDone}
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
            className={cn(
                "surface border rounded-xl p-4 group relative transition-shadow shadow-sm hover:shadow",
                !isDone && "cursor-grab active:cursor-grabbing hover-row",
                isDragging && "opacity-50 ring-2 ring-indigo-400"
            )}
        >
            <div className="flex items-start gap-2">
                {!isDone && (
                    <GripVertical className="h-4 w-4 text-muted mt-0.5 shrink-0 group-hover:text-secondary transition-colors" />
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <h4 className="font-medium text-primary text-sm leading-snug">{task.title}</h4>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                            <button 
                                onClick={() => onEdit(task.id)} 
                                className="text-muted hover:text-indigo-600 transition-colors p-1"
                                title="Edit task"
                            >
                                <Pencil className="h-3 w-3" />
                            </button>
                            <Link 
                                href={route('tasks.destroy', task.id)} 
                                method="delete" 
                                as="button" 
                                preserveScroll 
                                className="text-muted hover:text-red-500 transition-colors p-1"
                                title="Delete task"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                    
                    {task.description && (
                        <div className="mt-1.5">
                            <p className={cn(
                                "text-xs text-muted leading-relaxed break-words whitespace-pre-wrap",
                                !expanded && "line-clamp-2"
                            )}>
                                {task.description}
                            </p>
                            <button 
                                onClick={() => onToggleExpand(task.id)}
                                className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1 hover:underline focus:outline-none"
                            >
                                {expanded ? "Show less" : "View task"}
                            </button>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider", PRIORITIES[task.priority])}>
                            {task.priority}
                        </span>

                        {task.due_date && (
                            <div className={cn(
                                "flex items-center gap-1 text-[10px]",
                                isPastDue 
                                    ? "text-red-500 font-bold dark:text-red-400" 
                                    : "text-muted"
                            )}>
                                <Calendar className="h-3 w-3" />
                                <span>{task.due_date}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default function Show({ project }) {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [tasks, setTasks] = useState(project.tasks);
    const [draggingId, setDraggingId] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [expandedTasks, setExpandedTasks] = useState({});
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');

    // Sync state when Inertia props change
    useEffect(() => {
        setTasks(project.tasks);
    }, [project.tasks]);
    
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        due_date: '',
    });

    const showToast = useCallback((msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    }, []);

    const submitTask = useCallback((e) => {
        e.preventDefault();
        post(route('projects.tasks.store', project.id), {
            onSuccess: () => {
                reset();
                setIsAddingTask(false);
            }
        });
    }, [post, project.id, reset]);

    const handleDragStart = useCallback((e, task) => {
        if (task.status === 'Done') {
            e.preventDefault();
            showToast("Completed tasks can't be undone. Need to do more? Just create a new task.");
            return;
        }

        setDraggingId(task.id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id.toString());
        
        setTimeout(() => {
            if (e.target) e.target.style.opacity = '0.5';
        }, 0);
    }, [showToast]);

    const handleDragEnd = useCallback((e) => {
        setDraggingId(null);
        if (e.target) e.target.style.opacity = '1';
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((e, newStatus) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        
        if (!taskId) return;
        
        setTasks(prevTasks => {
            const task = prevTasks.find(t => t.id === taskId);
            if (!task || task.status === newStatus) return prevTasks;

            // Optimistic UI update
            const updatedTasks = prevTasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);

            // API Call
            router.put(route('tasks.update', taskId), {
                ...task,
                status: newStatus
            }, { preserveScroll: true, preserveState: true });

            return updatedTasks;
        });
    }, []);

    const toggleTask = useCallback((taskId) => {
        setExpandedTasks(prev => ({...prev, [taskId]: !prev[taskId]}));
    }, []);

    // Filter tasks based on Search and Priority
    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (t.description || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
            return matchesSearch && matchesPriority;
        });
    }, [tasks, searchQuery, priorityFilter]);

    // Pre-group tasks by status
    const tasksByStatus = useMemo(() => {
        const grouped = {};
        for (const col of COLUMNS) {
            grouped[col] = filteredTasks.filter(t => t.status === col);
        }
        return grouped;
    }, [filteredTasks]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-display font-bold text-lg text-primary">Project Board</h2>
                </div>
            }
        >
            <Head title={project.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                
                {/* Page Header */}
                <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 justify-between shrink-0">
                    <div>
                        <h2 className="font-display font-bold text-2xl text-primary">{project.name}</h2>
                        <p className="text-sm text-secondary mt-0.5">{project.description}</p>
                    </div>
                    <button
                        onClick={() => setIsAddingTask(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-600/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 py-1.5">
                    {/* Search */}
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search board tasks..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="input-style w-full pl-9 pr-4 py-2 rounded-xl border text-xs"
                        />
                    </div>

                    {/* Priority Pills */}
                    <div className="flex items-center gap-1.5 rounded-xl border divider p-1 bg-slate-50 dark:bg-slate-800">
                        {['All', 'Low', 'Medium', 'High'].map(priority => (
                            <button
                                key={priority}
                                onClick={() => setPriorityFilter(priority)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                                    priorityFilter === priority 
                                        ? "bg-indigo-600 text-white shadow-sm" 
                                        : "text-secondary hover:text-primary"
                                )}
                            >
                                {priority}
                            </button>
                        ))}
                    </div>
                </div>
                    
                {/* Add Task Form inline */}
                {isAddingTask && (
                    <div className="surface border rounded-2xl shadow-sm p-6 shrink-0">
                        <h3 className="font-display font-semibold text-base text-primary mb-4">New Task</h3>
                        <form onSubmit={submitTask} className="grid gap-5 md:grid-cols-3">
                            <div className="col-span-3 md:col-span-1">
                                <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Title</label>
                                <input type="text" placeholder="e.g. Design homepage" value={data.title} onChange={e => setData('title', e.target.value)} className={`input-style w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all ${errors.title ? '!border-red-500 focus:!border-red-500' : ''}`} />
                                <InputError message={errors.title} className="mt-1" />
                            </div>
                            <div className="col-span-3 md:col-span-1">
                                <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Priority</label>
                                <select value={data.priority} onChange={e => setData('priority', e.target.value)} className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all appearance-none cursor-pointer">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div className="col-span-3 md:col-span-1">
                                <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Due Date</label>
                                <DatePicker value={data.due_date} onChange={val => setData('due_date', val)} placeholder="Select due date" />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Description</label>
                                <textarea placeholder="Add task details..." value={data.description} onChange={e => setData('description', e.target.value)} rows="2" className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all resize-none" />
                            </div>
                            <div className="col-span-3 flex justify-end gap-3 mt-2 border-t divider pt-5">
                                <button type="button" onClick={() => setIsAddingTask(false)} className="px-5 py-2.5 text-secondary hover:text-primary text-sm font-medium rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
                                <button type="submit" disabled={processing} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">Save Task</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Task Board */}
                <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
                    {COLUMNS.map(status => (
                        <div 
                            key={status} 
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                            className="flex-none w-[300px] sm:w-[340px] flex flex-col surface-2 rounded-2xl p-4 border divider shadow-sm snap-start"
                        >
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h3 className="font-display font-semibold text-sm text-primary">{status}</h3>
                                <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 text-xs py-0.5 px-2 rounded-full font-semibold">
                                    {tasksByStatus[status].length}
                                </span>
                            </div>
                            
                            <div className="space-y-3 flex-1">
                                {tasksByStatus[status].map(task => (
                                    <TaskCard 
                                        key={task.id}
                                        task={task}
                                        draggingId={draggingId}
                                        expanded={!!expandedTasks[task.id]}
                                        onToggleExpand={toggleTask}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                        isEditing={editingTaskId === task.id}
                                        onEdit={(id) => setEditingTaskId(id)}
                                        onCancelEdit={() => setEditingTaskId(null)}
                                    />
                                ))}
                                
                                {tasksByStatus[status].length === 0 && (
                                    <div className="h-24 rounded-xl border-2 border-dashed divider flex items-center justify-center text-xs text-muted font-medium">
                                        Drop task here
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
                    <div className="bg-slate-900 text-white px-5 py-4 rounded-xl shadow-xl flex items-start gap-3 max-w-sm border border-slate-700">
                        <div className="text-emerald-400 mt-0.5 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1 text-sm font-medium leading-relaxed">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
