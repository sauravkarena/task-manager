import { memo, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FolderKanban, 
    LogOut,
    CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = memo(function Sidebar({ 
    auth, 
    mobileSidebarOpen, 
    desktopSidebarCollapsed 
}) {
    const isActive = useCallback((routeName) => route().current(routeName), []);

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
    );
});

export default Sidebar;
