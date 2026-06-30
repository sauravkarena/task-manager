import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, LayoutDashboard, ListTodo, LogIn, UserPlus } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Navbar */}
                <header className="border-b bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <ListTodo className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                                Manage your tasks with <span className="text-blue-600">ease</span>.
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-gray-500 mb-10">
                                TaskFlow helps you organize projects, prioritize tasks, and stay on top of your deadlines—all in one beautifully designed workspace.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Start for free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-full border border-gray-300 bg-white px-8 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        {/* Features Grid */}
                        <div className="mt-24 grid gap-8 md:grid-cols-3">
                            {[
                                { title: 'Project Organization', desc: 'Keep your work categorized into neat projects.' },
                                { title: 'Kanban Boards', desc: 'Visually track your progress from To-Do to Done.' },
                                { title: 'Priority Levels', desc: 'Highlight what matters most with color-coded priorities.' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-left"
                                >
                                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                        <CheckCircle className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-500">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
