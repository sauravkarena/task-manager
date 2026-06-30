import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { CheckCircle, Clock, ListTodo, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ totalTasks = 0, completedTasks = 0, pendingTasks = 0 }) {
    const { auth } = usePage().props;
    
    const stats = [
        { label: 'Total Tasks', value: totalTasks, icon: ListTodo, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/40', change: '+12%', changeColor: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
        { label: 'Completed', value: completedTasks, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/40', change: '+8.2%', changeColor: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
        { label: 'Pending', value: pendingTasks, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/40', change: '-3.1%', changeColor: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
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
                    {stats.map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
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
                        </motion.div>
                    ))}
                </div>

                {/* Call to action */}
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

            </div>
        </AuthenticatedLayout>
    );
}
