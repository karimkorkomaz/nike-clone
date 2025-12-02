import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Men from './Pages/Men.js';
import Women from './Pages/Women.js';
import Kids from './Pages/Kids.js';
import Home from './Pages/Home.js';
import Contact from './Pages/Contact.js';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import Admin from "./Pages/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";
import SearchResults from "./Pages/SearchResults";


import './Styles/Navbar.css'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Men' element={<Men />} />
          <Route path='/Women' element={<Women />} />
          <Route path='/Kids' element={<Kids />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
