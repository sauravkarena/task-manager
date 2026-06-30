import { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DatePicker({ value, onChange, placeholder = "Select date" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const containerRef = useRef(null);

    // Parse existing date value
    const selectedDate = value ? new Date(value) : null;

    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
        }
    }, [value]);

    // Handle outside clicks to close calendar
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // First day of the month offset (0 = Monday, 6 = Sunday)
    const rawFirstDay = new Date(year, month, 1).getDay();
    const firstDayIndex = rawFirstDay === 0 ? 6 : rawFirstDay - 1;

    const selectDay = (day) => {
        // Format date as YYYY-MM-DD local date
        const yyyy = year;
        const mm = String(month + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        
        onChange(formattedDate);
        setIsOpen(false);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const clearDate = (e) => {
        e.stopPropagation();
        onChange('');
        setIsOpen(false);
    };

    const formatDateString = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Generate days array
    const days = [];
    // Pad first week with empty spaces
    for (let i = 0; i < firstDayIndex; i++) {
        days.push(null);
    }
    // Add calendar days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <div className="relative w-full" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="input-style w-full px-3.5 py-2.5 rounded-xl border text-sm flex items-center justify-between text-left hover-row transition-all"
            >
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4.5 h-4.5 text-secondary shrink-0" />
                    <span className={cn(selectedDate ? "text-primary font-medium" : "text-muted")}>
                        {selectedDate ? formatDateString(selectedDate) : placeholder}
                    </span>
                </div>
                {value && (
                    <button
                        type="button"
                        onClick={clearDate}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-muted hover:text-primary transition-colors shrink-0"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-72 surface border rounded-2xl shadow-xl p-4 z-50 animate-slide-up">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="button"
                            onClick={prevMonth}
                            className="icon-btn p-1.5 rounded-lg border divider transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-display font-semibold text-sm text-primary">
                            {monthNames[month]} {year}
                        </span>
                        <button
                            type="button"
                            onClick={nextMonth}
                            className="icon-btn p-1.5 rounded-lg border divider transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {daysOfWeek.map((day) => (
                            <span key={day} className="text-[10px] font-bold text-muted uppercase tracking-wider">
                                {day}
                            </span>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {days.map((day, idx) => {
                            if (day === null) {
                                return <div key={`empty-${idx}`} />;
                            }

                            const isSelected = selectedDate && 
                                selectedDate.getDate() === day && 
                                selectedDate.getMonth() === month && 
                                selectedDate.getFullYear() === year;

                            const isToday = new Date().getDate() === day && 
                                new Date().getMonth() === month && 
                                new Date().getFullYear() === year;

                            return (
                                <button
                                    key={`day-${day}`}
                                    type="button"
                                    onClick={() => selectDay(day)}
                                    className={cn(
                                        "w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all",
                                        isSelected 
                                            ? "bg-indigo-600 text-white shadow-sm" 
                                            : isToday 
                                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/30" 
                                                : "text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
                                    )}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
