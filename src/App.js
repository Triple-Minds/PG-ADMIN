
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home/Home';
import Login from './Screens/Login/Login';
import { User } from './Screens/User/User';
import { Rooms } from './Screens/Rooms/Rooms';
import { Ticket } from './Screens/Tickets/Ticket';
import { Payment } from './Screens/Payment/Payment';
import { Food } from './Screens/Food/Food';
import ParticularTicket from './Screens/ParticularTicket/ParticularTicket';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
             <Route path='/'element={<Home />} />
             <Route path='/login'element={<Login />} />
             <Route path='/user'element={<User />} />
             <Route path='/rooms'element={<Rooms />} />
             <Route path='/ticket'element={<Ticket />} />
             <Route path='/payment'element={<Payment />} />
             <Route path='/food'element={<Food />} />
             <Route path="/ticket/:id" element={<ParticularTicket />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
