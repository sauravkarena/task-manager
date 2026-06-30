import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div>
                <h2 className="font-display font-bold text-2xl text-[#0f172a] mb-1">Create your account</h2>
                <p className="text-[#64748b] text-sm">Start organizing your work in minutes</p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            className="input-style w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                            autoComplete="name"
                            autoFocus
                            placeholder="John Doe"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

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
                            placeholder="you@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
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
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-2">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="input-style w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-600/20 disabled:opacity-50"
                >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                </button>

                <p className="text-center text-sm text-[#64748b]">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-indigo-600 hover:text-indigo-500 font-semibold">
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
