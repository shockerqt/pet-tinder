import { ArrowLeft, Camera, Settings, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="h-16 flex items-center justify-between px-4 border-b shadow-sm">
                <ArrowLeft className="text-gray-600 cursor-pointer" onClick={() => navigate('/app')} />
                <h1 className="text-xl font-bold text-primary">My Profile</h1>
                <Settings className="text-gray-400 cursor-pointer" />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col items-center mb-8 relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                        <img
                            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
                            alt="My Pet"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 bg-secondary text-white p-2 rounded-full shadow-md hover:bg-secondary/90">
                        <Camera size={18} />
                    </button>
                    <h2 className="text-2xl font-bold mt-4 flex items-center gap-2">
                        Buddy, 3 <Edit2 size={16} className="text-gray-400 cursor-pointer" />
                    </h2>
                    <p className="text-gray-500">Golden Retriever</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">About Buddy</label>
                        <textarea
                            className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 resize-none text-gray-600"
                            rows="4"
                            defaultValue="I'm a good boy who loves treats and chasing squirrels. Looking for a friend to run around the park with!"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Interests</label>
                        <div className="flex flex-wrap gap-2">
                            {['Walks', 'Treats', 'Naps', 'Park', 'Ball'].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                            <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-full text-gray-400 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary-hover transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
