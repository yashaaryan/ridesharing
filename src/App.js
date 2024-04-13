import './App.css';
import UserComponent from './components/UserComponent';
import DonorComponent from './components/DonorComponent';
import AdminComponent from './components/AdminComponent';
import AdminLoginComponent from './components/AdminLoginComponent';
import DonorLoginComponent from './components/DonorLoginComponent';
import UserLoginComponent from './components/UserLoginComponent';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Uncomment to render UserComponent directly */}
      {/* <UserComponent /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<UserComponent />} />
          <Route path="/donor" element={<DonorComponent />} />
          <Route path="/admin" element={<AdminComponent />} />
          <Route path="/adminLogin" element={<AdminLoginComponent />} />
          <Route path="/donorLogin" element={<DonorLoginComponent />} />
          <Route path="/userLogin" element={<UserLoginComponent />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} />

        </Routes>
      </Router>
    </div>
  );
}


export default App;
