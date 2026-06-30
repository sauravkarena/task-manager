import { AlertCircle } from 'lucide-react';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs text-red-500 dark:text-red-400 font-medium mt-1.5 flex items-center gap-1.5 ' + className}
        >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{message}</span>
        </p>
    ) : null;
}
