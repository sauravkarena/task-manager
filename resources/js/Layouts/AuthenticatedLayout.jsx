import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FolderKanban, 
    Menu, 
    Search, 
    Bell, 
    Sun, 
    Moon, 
    ChevronDown, 
    User, 
    Settings, 
    LifeBuoy, 
    LogOut,
    CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    // Mobile sidebar state
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    // Desktop sidebar collapse state
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    };

    const isActive = (routeName) => route().current(routeName);

    // Sidebar classes logic
    const sidebarClasses = cn(
        "sidebar-bg border-r fixed lg:relative inset-y-0 left-0 z-30 flex flex-col transition-all duration-300",
        mobileSidebarOpen ? "translate-x-0 w-[85vw] max-w-[320px] sm:w-72" : "-translate-x-full lg:translate-x-0",
        desktopSidebarCollapsed ? "lg:w-[72px]" : "lg:w-64"
    );

    const labelClasses = cn(
        "sidebar-label whitespace-nowrap overflow-hidden transition-all duration-300",
        desktopSidebarCollapsed ? "lg:opacity-0 lg:w-0" : "lg:opacity-100 lg:w-auto"
    );

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a]">
            
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside id="sidebar" className={sidebarClasses}>
                {/* Logo */}
                <Link href={route('dashboard')} className="flex items-center gap-3 px-5 h-16 border-b divider shrink-0 overflow-hidden cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className={cn("font-display font-bold text-lg text-primary tracking-tight", labelClasses)}>TaskFlow</span>
                    <span className={cn("ml-auto text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400", labelClasses)}>v2.0</span>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-0.5">
                    <p className={cn("text-muted text-[10px] font-semibold uppercase tracking-widest px-3 pb-2 pt-1", labelClasses)}>Main</p>

                    <Link 
                        href={route('dashboard')} 
                        className={cn(
                            "nav-item group flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer",
                            isActive('dashboard') ? "active" : "tooltip"
                        )}
                    >
                        <div className={cn(
                            "nav-icon-wrap w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            isActive('dashboard') 
                                ? "text-indigo-600" 
                                : "text-secondary group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-900/30 transition-colors"
                        )}>
                            <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span className={cn(
                            "text-sm font-medium",
                            isActive('dashboard') ? "text-primary" : "text-secondary group-hover:text-primary",
                            labelClasses
                        )}>Dashboard</span>
                        {!isActive('dashboard') && <span className="tooltip-text">Dashboard</span>}
                    </Link>

                    <Link 
                        href={route('projects.index')} 
                        className={cn(
                            "nav-item group flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-pointer",
                            isActive('projects.*') ? "active" : "tooltip"
                        )}
                    >
                        <div className={cn(
                            "nav-icon-wrap w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            isActive('projects.*') 
                                ? "text-indigo-600" 
                                : "text-secondary group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-900/30 transition-colors"
                        )}>
                            <FolderKanban className="w-4 h-4" />
                        </div>
                        <span className={cn(
                            "text-sm font-medium",
                            isActive('projects.*') ? "text-primary" : "text-secondary group-hover:text-primary",
                            labelClasses
                        )}>Projects</span>
                        {!isActive('projects.*') && <span className="tooltip-text">Projects</span>}
                    </Link>

                </nav>

                {/* Sidebar Footer */}
                <div className="px-3 py-4 border-t divider shrink-0 overflow-hidden">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg surface-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-indigo-600 font-bold">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className={cn("overflow-hidden min-w-0 flex-1", labelClasses)}>
                            <p className="text-sm font-semibold text-primary truncate">{auth.user.name}</p>
                            <p className="text-xs text-muted truncate">User</p>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className={cn("icon-btn p-1 rounded-md shrink-0 transition-colors", labelClasses)} title="Logout">
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div id="main-wrapper" className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                {/* Header */}
                <header className="header-bg border-b backdrop-blur-sm sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-16">
                        
                        {/* Mobile Toggle */}
                        <button 
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            className="icon-btn p-2 rounded-lg lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        
                        {/* Desktop Toggle */}
                        <button 
                            onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
                            className="icon-btn p-2 rounded-lg hidden lg:block"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="hidden sm:block ml-2">
                            {header || <h1 className="font-display font-bold text-lg text-primary">Dashboard</h1>}
                        </div>

                        <div className="flex-1"></div>

                        <div className="flex items-center gap-1">
                            {/* Theme Toggle */}
                            <button onClick={toggleTheme} className="icon-btn p-2 rounded-lg transition-colors">
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>

                            {/* Notifications */}
                            <div className="relative">
                                <button onClick={() => setNotifOpen(!notifOpen)} className="icon-btn p-2 rounded-lg relative transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="badge-pulse absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
                                </button>
                                {notifOpen && (
                                    <div className="absolute right-0 mt-2 w-[90vw] max-w-80 surface border rounded-2xl shadow-xl overflow-hidden z-50">
                                        <div className="flex items-center justify-between px-4 py-3 border-b divider">
                                            <span className="font-display font-semibold text-sm text-primary">Notifications</span>
                                        </div>
                                        <div className="p-4 text-center text-sm text-muted">
                                            No new notifications
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover-row cursor-pointer transition-colors ml-1"
                                >
                                    <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-xs">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-primary">{auth.user.name.split(' ')[0]}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-muted" />
                                </button>
                                
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-[80vw] max-w-52 surface border rounded-2xl shadow-xl overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b divider">
                                            <p className="font-semibold text-sm text-primary truncate">{auth.user.name}</p>
                                            <p className="text-xs text-muted truncate">{auth.user.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link href={route('profile.edit')} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary hover-row hover:text-primary transition-colors">
                                                <User className="w-4 h-4" />
                                                Profile
                                            </Link>
                                        </div>
                                        <div className="border-t divider py-1">
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto surface-2">
                    {children}
                </main>
            </div>
        </div>
    );
}
