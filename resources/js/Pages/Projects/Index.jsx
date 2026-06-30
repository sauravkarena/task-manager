import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Folder, Plus } from 'lucide-react';

export default function Index({ projects }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-display font-bold text-lg text-primary">Projects</h2>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Page Header */}
                <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 justify-between">
                    <div>
                        <h2 className="font-display font-bold text-2xl text-primary">My Projects</h2>
                        <p className="text-sm text-secondary mt-0.5">Manage your workspaces and boards.</p>
                    </div>
                    <Link
                        href={route('projects.create')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-600/20"
                    >
                        <Plus className="h-4 w-4" />
                        New Project
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="surface border rounded-2xl p-12 text-center shadow-sm">
                        <Folder className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4 mx-auto" />
                        <h3 className="font-display font-bold text-lg text-primary">No projects found</h3>
                        <p className="mt-1 text-sm text-secondary">Get started by creating a new project.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={route('projects.show', project.id)}
                                className="block surface border rounded-2xl p-6 shadow-sm transition-all hover:border-indigo-500 hover:shadow-md group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center transition-colors group-hover:bg-indigo-600 group-hover:text-white text-indigo-600">
                                        <Folder className="h-5 w-5" />
                                    </div>
                                </div>
                                <h3 className="font-display font-bold text-xl text-primary mb-1 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                                <p className="text-sm text-muted line-clamp-2">
                                    {project.description || 'No description provided.'}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
