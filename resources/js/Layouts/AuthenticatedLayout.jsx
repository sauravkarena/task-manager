import { useState, useEffect, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from './Partials/Sidebar';
import Navbar from './Partials/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');

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

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
            return newTheme;
        });
    }, []);

    const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a]">
            
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            <Sidebar 
                auth={auth} 
                mobileSidebarOpen={mobileSidebarOpen} 
                desktopSidebarCollapsed={desktopSidebarCollapsed} 
            />

            {/* Main Wrapper */}
            <div id="main-wrapper" className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                <Navbar 
                    auth={auth}
                    header={header}
                    mobileSidebarOpen={mobileSidebarOpen}
                    setMobileSidebarOpen={setMobileSidebarOpen}
                    desktopSidebarCollapsed={desktopSidebarCollapsed}
                    setDesktopSidebarCollapsed={setDesktopSidebarCollapsed}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto surface-2">
                    {children}
                </main>
            </div>
        </div>
    );
}
