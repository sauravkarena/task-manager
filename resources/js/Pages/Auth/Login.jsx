import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div>
                <h2 className="font-display font-bold text-2xl text-[#0f172a] mb-1">Welcome back</h2>
                <p className="text-[#64748b] text-sm">Sign in to your account to continue</p>
            </div>

            {status && (
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="input-style w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                            autoComplete="username"
                            autoFocus
                            placeholder="you@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="input-style w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded border-[#e2e8f0] text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-[#64748b]">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-600/20 disabled:opacity-50"
                >
                    <LogIn className="w-4 h-4" />
                    Sign In
                </button>

                <p className="text-center text-sm text-[#64748b]">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-indigo-600 hover:text-indigo-500 font-semibold">
                        Create one
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
