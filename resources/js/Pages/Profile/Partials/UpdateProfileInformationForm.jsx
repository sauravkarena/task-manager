import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Name</label>
                <input
                    id="name"
                    className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <label htmlFor="email" className="block text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Email</label>
                <input
                    id="email"
                    type="email"
                    className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                />
                <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="text-sm text-secondary">
                        Your email address is unverified.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mt-2 text-sm font-medium text-emerald-600">
                            A new verification link has been sent to your email address.
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4 pt-2">
                <button
                    disabled={processing}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                >
                    Save Changes
                </button>

                {recentlySuccessful && (
                    <p className="text-sm text-emerald-600 font-medium">Saved.</p>
                )}
            </div>
        </form>
    );
}
