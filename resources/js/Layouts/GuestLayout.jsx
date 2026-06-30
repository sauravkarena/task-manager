import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 flex flex-col justify-center px-16">
                    <Link href="/" className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl text-white tracking-tight">TaskFlow</span>
                    </Link>
                    <h1 className="font-display font-bold text-4xl text-white leading-tight mb-4">
                        Organize your work,<br />achieve your goals.
                    </h1>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-md">
                        Manage projects, track tasks, and collaborate with your team using our intuitive kanban board.
                    </p>
                    <div className="mt-12 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {['S', 'A', 'M'].map((letter, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold backdrop-blur-sm">
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <p className="text-indigo-200 text-sm">Join 1,000+ teams already using TaskFlow</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl text-[#0f172a] tracking-tight">TaskFlow</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
