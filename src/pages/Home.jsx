import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
                <span className="text-6xl">🐾</span>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">Pet Tinder</h1>
            <p className="text-gray-500 mb-12 text-lg">Find the paw-fect match for your pet!</p>
            <button
                onClick={() => navigate('/app')}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-primary-hover hover:scale-105 transition-all w-full max-w-xs"
            >
                Start Swiping
            </button>
        </div>
    );
}
