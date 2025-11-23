/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF6B6B', // Soft red
                    hover: '#FF5252',
                },
                secondary: {
                    DEFAULT: '#4ECDC4', // Teal/Mint
                },
                dark: '#2D3436',
                light: '#F7F7F7',
            }
        },
    },
    plugins: [],
}
