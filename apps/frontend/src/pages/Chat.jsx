import { useState } from 'react';
import { ArrowLeft, Send, Phone, Video } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { pets } from '../data/pets';

export default function Chat() {
    const navigate = useNavigate();
    const { id } = useParams(); // id is the name in this mock
    const [messages, setMessages] = useState([
        { id: 1, text: "Woof! Hey there!", sender: "them" },
        { id: 2, text: "Hi! Your profile is adorable.", sender: "me" },
    ]);
    const [input, setInput] = useState("");

    const pet = pets.find(p => p.name === id) || pets[0];

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now(), text: input, sender: "me" }]);
        setInput("");

        // Auto reply
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Woof woof! 🐾", sender: "them" }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b shadow-sm bg-white z-10">
                <div className="flex items-center">
                    <ArrowLeft className="text-gray-600 cursor-pointer mr-3" onClick={() => navigate('/matches')} />
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-200">
                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-800">{pet.name}</h1>
                        <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                    </div>
                </div>
                <div className="flex gap-4 text-primary">
                    <Phone size={20} />
                    <Video size={20} />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === 'me'
                                ? 'bg-primary text-white self-end rounded-br-none'
                                : 'bg-white text-gray-800 self-start rounded-bl-none shadow-sm border border-gray-100'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
