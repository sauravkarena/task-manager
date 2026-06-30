import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ project }) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name || '',
        description: project.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <h2 className="font-display font-bold text-lg text-primary">Edit Project</h2>
                </div>
            }
        >
            <Head title="Edit Project" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                <div className="surface border rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b divider">
                        <div>
                            <h3 className="font-display font-semibold text-base text-primary">Update Project Details</h3>
                            <p className="text-xs text-muted mt-0.5">Modify the workspace details</p>
                        </div>
                    </div>
                    
                    <div className="p-5 sm:p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Project Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="e.g. Website Redesign"
                                    className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Description (Optional)</label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    placeholder="What is this project about?"
                                    className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all resize-none"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                            </div>

                            <div className="flex items-center gap-3 mt-6 pt-5 border-t divider">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                                >
                                    Update Project
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-5 py-2.5 text-secondary hover:text-primary text-sm font-medium rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
