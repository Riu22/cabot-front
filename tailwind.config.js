/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': 'var(--accent)',
                'accent-bg': 'var(--accent-bg)',
                'accent-border': 'var(--accent-border)',
                'text-main': 'var(--text)',
                'text-h': 'var(--text-h)',
                'bg-main': 'var(--bg)',
                'border-main': 'var(--border)',
                'code-bg': 'var(--code-bg)',
                'error': '#ef4444',
                'success': '#10b981',
            },
            fontFamily: {
                sans: ['var(--sans)'],
                mono: ['var(--mono)'],
            },
        },
    },
    plugins: [],
}