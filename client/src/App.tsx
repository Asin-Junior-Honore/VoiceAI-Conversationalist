import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoutes from './utils/PrivateRoutes';
import Conversations from './components/Conversations';


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<VoiceRecorder />} />
            <Route path="/conversations" element={<Conversations />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
