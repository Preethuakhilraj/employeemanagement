import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Form from './Pages/Form';
import Main from './Pages/Main';
import Privateroutes from './Pages/Privateroutes';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Privateroutes />}>
            <Route path="/userdashboard" element={<Main child={<UserDashboard />} />} />
            <Route path="/admindashboard" element={<Main child={<AdminDashboard />} />} />
            <Route path="/form" element={<Main child={<Form />} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
