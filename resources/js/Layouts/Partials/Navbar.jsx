import { useState, memo, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Menu, 
    Bell, 
    Sun, 
    Moon, 
    ChevronDown, 
    User, 
    LogOut
} from 'lucide-react';

const Navbar = memo(function Navbar({ 
    auth, 
    header, 
    mobileSidebarOpen, 
    setMobileSidebarOpen, 
    desktopSidebarCollapsed, 
    setDesktopSidebarCollapsed, 
    theme, 
    toggleTheme 
}) {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const toggleMobile = useCallback(() => setMobileSidebarOpen(prev => !prev), [setMobileSidebarOpen]);
    const toggleDesktop = useCallback(() => setDesktopSidebarCollapsed(prev => !prev), [setDesktopSidebarCollapsed]);
    const toggleNotif = useCallback(() => setNotifOpen(prev => !prev), []);
    const toggleProfile = useCallback(() => setProfileOpen(prev => !prev), []);

    return (
        <header className="header-bg border-b backdrop-blur-sm sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-16">
                
                {/* Mobile Toggle */}
                <button 
                    onClick={toggleMobile}
                    className="icon-btn p-2 rounded-lg lg:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                {/* Desktop Toggle */}
                <button 
                    onClick={toggleDesktop}
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
                        <button onClick={toggleNotif} className="icon-btn p-2 rounded-lg relative transition-colors">
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
                            onClick={toggleProfile}
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
    );
});

export default Navbar;
