import { useState, useRef } from 'react';
import { Heart, X, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { pets } from '../data/pets';

export default function Swipe() {
    const navigate = useNavigate();
    const [cards, setCards] = useState(pets);
    const cardRef = useRef(null);

    const handleSwipe = (direction, id) => {
        console.log(`Swiped ${direction} on ${id}`);
        // Remove card from stack after animation
        setTimeout(() => {
            setCards((prev) => prev.filter((card) => card.id !== id));
        }, 200);
    };

    const triggerSwipe = (direction) => {
        if (cardRef.current) {
            cardRef.current.swipe(direction);
        }
    };

    return (
        <div className="flex flex-col h-full relative bg-gray-50">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 bg-white shadow-sm z-10">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => navigate('/profile')}>
                    <User className="text-gray-400" size={20} />
                </div>
                <h1 className="text-2xl font-bold text-primary flex items-center gap-1">
                    Pet<span className="text-secondary">Tinder</span>
                </h1>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => navigate('/matches')}>
                    <MessageCircle className="text-gray-400" size={20} />
                </div>
            </div>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="relative w-full h-full max-w-sm flex items-center justify-center">
                    {cards.length > 0 ? (
                        cards.map((pet, index) => (
                            <Card
                                key={pet.id}
                                ref={index === 0 ? cardRef : null}
                                pet={pet}
                                onSwipe={handleSwipe}
                                style={{
                                    zIndex: cards.length - index,
                                }}
                                animate={{
                                    scale: index === 0 ? 1 : 0.95,
                                    y: index === 0 ? 0 : 10 * index,
                                    opacity: index < 2 ? 1 : 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                            />
                        ))
                    ) : (
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No more pets!</h3>
                            <p className="text-gray-500 mb-6">Check back later for more cuties.</p>
                            <button
                                onClick={() => setCards(pets)}
                                className="bg-secondary text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-secondary/90 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            {cards.length > 0 && (
                <div className="h-24 flex items-center justify-center gap-8 pb-6">
                    <button
                        onClick={() => triggerSwipe('left')}
                        className="w-16 h-16 bg-white rounded-full shadow-lg text-red-500 flex items-center justify-center hover:scale-110 transition-transform border border-gray-100 cursor-pointer"
                    >
                        <X size={32} strokeWidth={3} />
                    </button>
                    <button
                        onClick={() => triggerSwipe('right')}
                        className="w-16 h-16 bg-white rounded-full shadow-lg text-green-500 flex items-center justify-center hover:scale-110 transition-transform border border-gray-100 cursor-pointer"
                    >
                        <Heart size={32} strokeWidth={3} fill="currentColor" className="text-green-500" />
                    </button>
                </div>
            )}
        </div>
    );
}
