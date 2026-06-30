import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="space-y-5">
            <div>
                <label htmlFor="current_password" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Current Password</label>
                <input
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    type="password"
                    className={`input-style w-full px-3.5 py-2.5 rounded-xl border text-sm ${errors.current_password ? '!border-red-500 focus:!border-red-500' : ''}`}
                    autoComplete="current-password"
                    placeholder="••••••••"
                />
                <InputError message={errors.current_password} className="mt-2" />
            </div>

            <div>
                <label htmlFor="password" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">New Password</label>
                <input
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className={`input-style w-full px-3.5 py-2.5 rounded-xl border text-sm ${errors.password ? '!border-red-500 focus:!border-red-500' : ''}`}
                    autoComplete="new-password"
                    placeholder="••••••••"
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
                <label htmlFor="password_confirmation" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Confirm Password</label>
                <input
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    type="password"
                    className={`input-style w-full px-3.5 py-2.5 rounded-xl border text-sm ${errors.password_confirmation ? '!border-red-500 focus:!border-red-500' : ''}`}
                    autoComplete="new-password"
                    placeholder="••••••••"
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="flex items-center gap-4 pt-2">
                <button
                    disabled={processing}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                >
                    Update Password
                </button>

                {recentlySuccessful && (
                    <p className="text-sm text-emerald-600 font-medium">Saved.</p>
                )}
            </div>
        </form>
    );
}
