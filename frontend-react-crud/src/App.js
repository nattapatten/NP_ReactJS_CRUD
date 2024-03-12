
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
// import Users from './components/User/User'
// import UserCreate from "./components/User/UserCreate"
import Hospital from './components/Hospital/Hospital'
import CreateHospital from './components/Hospital/CreateHospital'
import UpdateHospital from './components/Hospital/UpdateHospital'
import Login from './components/Login/Login'





export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/viewhospital' element={<Hospital />} />
        <Route path='/create' element={<CreateHospital />} />
        {/* <Route path='/update' element={<UpdateHospital />} /> */}
        <Route path='/update/:id' element={<UpdateHospital />} />
      </Routes>
    </div>
  );
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React Test
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
