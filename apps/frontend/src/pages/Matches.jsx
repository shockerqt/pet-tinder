import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pets } from '../data/pets';

export default function Matches() {
    const navigate = useNavigate();
    // Mock matches - just take the first 3 pets
    const matches = pets.slice(0, 3);

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="h-16 flex items-center px-4 border-b shadow-sm">
                <ArrowLeft className="text-gray-600 cursor-pointer mr-4" onClick={() => navigate('/app')} />
                <h1 className="text-xl font-bold text-primary">Matches</h1>
            </div>
            <div className="p-4">
                <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">New Matches</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {matches.map(pet => (
                        <div key={pet.id} className="flex-shrink-0 flex flex-col items-center cursor-pointer" onClick={() => navigate(`/chat/${pet.name}`)}>
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary p-0.5">
                                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <span className="text-xs font-semibold mt-1">{pet.name}</span>
                        </div>
                    ))}
                </div>

                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 mt-4">Messages</h2>
                <div className="flex flex-col gap-2">
                    {matches.map(pet => (
                        <div key={pet.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors" onClick={() => navigate(`/chat/${pet.name}`)}>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full overflow-hidden">
                                    <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800">{pet.name}</h3>
                                <p className="text-sm text-gray-500 truncate">Woof! Do you want to go to the park?</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
