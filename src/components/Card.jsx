import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';

export default function Card({ pet, onSwipe, style }) {
    const x = useMotionValue(0);
    const controls = useAnimation();

    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x, rotate, opacity, ...style }}
            className="absolute w-full h-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
        >
            <div className="relative h-full">
                <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white pt-20">
                    <div className="flex items-end justify-between mb-2">
                        <div>
                            <h2 className="text-3xl font-bold flex items-baseline gap-2">
                                {pet.name} <span className="text-xl font-normal opacity-90">{pet.age}</span>
                            </h2>
                            <p className="text-sm opacity-90 flex items-center gap-1">
                                <MapPin size={14} /> 2 miles away
                            </p>
                        </div>
                        <Info className="text-white/80 hover:text-white cursor-pointer" />
                    </div>
                    <p className="text-sm opacity-90 line-clamp-2">{pet.bio}</p>

                    {/* Tags/Breed */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                            {pet.breed}
                        </span>
                    </div>
                </div>

                {/* Swipe Indicators */}
                <motion.div
                    style={{ opacity: useTransform(x, [20, 100], [0, 1]) }}
                    className="absolute top-8 left-8 -rotate-12 border-4 border-green-500 text-green-500 px-4 py-1 rounded-lg font-bold text-2xl tracking-widest uppercase bg-black/20 backdrop-blur-sm"
                >
                    LIKE
                </motion.div>
                <motion.div
                    style={{ opacity: useTransform(x, [-100, -20], [1, 0]) }}
                    className="absolute top-8 right-8 rotate-12 border-4 border-red-500 text-red-500 px-4 py-1 rounded-lg font-bold text-2xl tracking-widest uppercase bg-black/20 backdrop-blur-sm"
                >
                    NOPE
                </motion.div>
            </div>
        </motion.div>
    );
}
