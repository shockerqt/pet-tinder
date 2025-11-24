import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { MapPin, Info, ChevronDown } from 'lucide-react';

const Card = forwardRef(({ pet, onSwipe, style, animate, transition, ...props }, ref) => {
    const [showDetails, setShowDetails] = useState(false);
    const x = useMotionValue(0);
    const controls = useAnimation();

    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const swipeOpacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    useImperativeHandle(ref, () => ({
        swipe: async (direction) => {
            if (direction === 'right') {
                await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
                onSwipe('right', pet.id);
            } else if (direction === 'left') {
                await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
                onSwipe('left', pet.id);
            }
        }
    }));

    const handleDragEnd = async (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 500) {
            await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
            onSwipe('right', pet.id);
        } else if (offset < -100 || velocity < -500) {
            await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
            onSwipe('left', pet.id);
        } else {
            controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        }
    };

    return (
        <motion.div
            style={{ ...style, zIndex: style?.zIndex }}
            animate={animate}
            transition={transition}
            className="absolute w-full h-full max-w-sm"
        >
            <motion.div
                drag={!showDetails ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{ x, rotate, opacity: swipeOpacity }}
                className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
                <div className="relative h-full">
                    <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Main Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white pt-24 transition-opacity duration-300"
                        style={{ opacity: showDetails ? 0 : 1 }}>
                        <div className="flex items-end justify-between mb-2">
                            <div>
                                <h2 className="text-3xl font-bold flex items-baseline gap-2">
                                    {pet.name} <span className="text-xl font-normal opacity-90">{pet.age}</span>
                                </h2>
                                <p className="text-sm opacity-90 flex items-center gap-1">
                                    <MapPin size={14} /> 2 miles away
                                </p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
                                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <Info size={20} className="text-white" />
                            </button>
                        </div>
                        <p className="text-sm opacity-90 line-clamp-2">{pet.bio}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                {pet.breed}
                            </span>
                        </div>
                    </div>

                    {/* Full Details Overlay */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: showDetails ? 0 : '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute inset-0 bg-white z-20 flex flex-col"
                    >
                        <div className="relative h-1/2">
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setShowDetails(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                            >
                                <ChevronDown size={24} />
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto bg-white -mt-6 rounded-t-3xl relative">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {pet.name} <span className="text-xl font-normal text-gray-500">{pet.age}</span>
                                </h2>
                            </div>

                            <p className="text-gray-500 flex items-center gap-1 mb-6">
                                <MapPin size={16} /> 2 miles away • {pet.breed}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">About</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {pet.bio}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Interests</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Walks', 'Treats', 'Naps', 'Park'].map(tag => (
                                            <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="h-20"></div> {/* Spacer for bottom controls */}
                        </div>
                    </motion.div>

                    {/* Swipe Indicators */}
                    <motion.div
                        style={{ opacity: useTransform(x, [20, 100], [0, 1]) }}
                        className="absolute top-8 left-8 -rotate-12 border-4 border-green-500 text-green-500 px-4 py-1 rounded-lg font-bold text-2xl tracking-widest uppercase bg-black/20 backdrop-blur-sm z-10"
                    >
                        LIKE
                    </motion.div>
                    <motion.div
                        style={{ opacity: useTransform(x, [-100, -20], [1, 0]) }}
                        className="absolute top-8 right-8 rotate-12 border-4 border-red-500 text-red-500 px-4 py-1 rounded-lg font-bold text-2xl tracking-widest uppercase bg-black/20 backdrop-blur-sm z-10"
                    >
                        NOPE
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
});

export default Card;
