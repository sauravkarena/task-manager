import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { CheckCircle, Clock, ListTodo, ArrowRight, TrendingUp, BarChart2, PieChart as PieIcon, Layers } from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip as ChartTooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function Dashboard({ 
    totalTasks = 0, 
    completedTasks = 0, 
    pendingTasks = 0, 
    priorityDistribution = [], 
    projectStats = [] 
}) {
    const { auth } = usePage().props;
    
    const stats = [
        { label: 'Total Tasks', value: totalTasks, icon: ListTodo, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
        { label: 'Completed', value: completedTasks, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
        { label: 'Pending', value: pendingTasks, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/40' },
    ];

    // Format Pie chart data
    const statusData = [
        { name: 'Completed', value: completedTasks, color: '#10b981' },
        { name: 'Pending/To Do', value: pendingTasks, color: '#6366f1' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-display font-bold text-lg text-primary">Overview</h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                
                {/* Page Header */}
                <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 justify-between">
                    <div>
                        <h2 className="font-display font-bold text-2xl text-primary">Good morning, {auth.user.name.split(' ')[0]} 👋</h2>
                        <p className="text-sm text-secondary mt-0.5">Here's what's happening with your projects today.</p>
                    </div>
                    <Link 
                        href={route('projects.create')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-600/20"
                    >
                        <ArrowRight className="w-4 h-4" />
                        New Project
                    </Link>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-card surface border rounded-2xl p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="font-display font-bold text-3xl text-primary">{stat.value}</p>
                            <p className="text-xs text-muted mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ANALYTICS CHARTS */}
                {(totalTasks > 0) && (
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Priority Distribution Chart */}
                        <div className="surface border rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[300px]">
                            <div className="mb-4">
                                <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
                                    <BarChart2 className="w-4.5 h-4.5 text-indigo-500" />
                                    Task Priority Breakdown
                                </h3>
                                <p className="text-xs text-muted mt-0.5">Distribution of tasks across low, medium, and high priorities</p>
                            </div>
                            <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={priorityDistribution} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                        <ChartTooltip 
                                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#f1f5f9', fontSize: '11px' }}
                                            cursor={{ fill: 'transparent' }}
                                        />
                                        <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={36} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Status Distribution Pie Chart */}
                        <div className="surface border rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-[300px]">
                            <div className="mb-4">
                                <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
                                    <PieIcon className="w-4.5 h-4.5 text-indigo-500" />
                                    Status Allocation
                                </h3>
                                <p className="text-xs text-muted mt-0.5">Share of completed versus pending tasks</p>
                            </div>
                            <div className="h-48 flex items-center justify-center">
                                <div className="w-full h-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={statusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={70}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {statusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip 
                                                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#f1f5f9', fontSize: '11px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Legend indicator in center */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-xl font-black text-primary">
                                            {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                                        </span>
                                        <span className="text-[10px] text-muted font-semibold uppercase">Done</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROJECT COMPLETION LIST */}
                {projectStats.length > 0 && (
                    <div className="surface border rounded-2xl p-5 shadow-sm">
                        <div className="mb-5">
                            <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
                                <Layers className="w-4.5 h-4.5 text-indigo-500" />
                                Project Progress Trackers
                            </h3>
                            <p className="text-xs text-muted mt-0.5">Task completion rates across active workspaces</p>
                        </div>
                        
                        <div className="space-y-4">
                            {projectStats.map((proj) => (
                                <Link 
                                    key={proj.id} 
                                    href={route('projects.show', proj.id)}
                                    className="block p-4 rounded-xl border divider hover-row transition-all group"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-sm text-primary group-hover:text-indigo-600 transition-colors">{proj.name}</span>
                                        <span className="text-xs text-secondary font-medium">
                                            {proj.completed_tasks}/{proj.total_tasks} Tasks ({proj.percent}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                                            style={{ width: `${proj.percent}%` }}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to action if no tasks yet */}
                {totalTasks === 0 && (
                    <div className="surface border rounded-2xl p-8 shadow-sm text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                            <TrendingUp className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <h3 className="font-display font-bold text-xl text-primary mb-2">Ready to boost your productivity?</h3>
                        <p className="text-secondary text-sm mb-6 max-w-md mx-auto">Head over to your projects to start managing your tasks with our new kanban board.</p>
                        <Link 
                            href={route('projects.index')} 
                            className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2.5 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-sm"
                        >
                            View Projects
                        </Link>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
