export default function ColorfulButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                ` bg-gradient-to-br from-purple-600 to-cyan-200 dark:from-indigo-800 dark:to-teal-900   inline-flex items-center px-4 py-2  hover:scale-110 rounded-2xl font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
