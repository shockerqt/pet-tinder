import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Swipe from './pages/Swipe';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full bg-light overflow-hidden flex flex-col max-w-md mx-auto shadow-2xl relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Swipe />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
