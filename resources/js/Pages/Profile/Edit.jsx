import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User, Lock, AlertTriangle } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-display font-bold text-lg text-primary">Profile</h2>
            }
        >
            <Head title="Profile" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                
                {/* Profile Info Card */}
                <div className="surface border rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b divider">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-sm text-primary">Profile Information</h3>
                            <p className="text-xs text-muted">Update your name and email address</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </div>

                {/* Password Card */}
                <div className="surface border rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b divider">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600">
                            <Lock className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-sm text-primary">Update Password</h3>
                            <p className="text-xs text-muted">Ensure your account is using a secure password</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdatePasswordForm />
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="surface border border-red-200 dark:border-red-900/40 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-red-200 dark:border-red-900/40">
                        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-sm text-red-600">Danger Zone</h3>
                            <p className="text-xs text-muted">Permanently delete your account</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
