import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LayoutProfile from './components/Layout/LayoutProfile';
import Home from './pages/home';
import Story from "./pages/Story";
import Products from './pages/Products';
import AnimePage from "./pages/animePage";
import Register from "./pages/Register";
import Login from "./pages/Auth/Login/index";
import SearchPage from "./pages/searchPage";
import UserProfile from "./pages/Auth/Profile";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>} />
                <Route path="/anime/:id"  element={<Layout><AnimePage/></Layout>}/>
                <Route path="/registration" element={<Layout><Register/></Layout>}/>
                <Route path="/profile" element={<LayoutProfile><UserProfile/></LayoutProfile>}/>
                <Route path="/login" element={<Layout><Login/></Layout>}/>
                <Route path="/search" element={<Layout><SearchPage/></Layout>} />
                <Route path="/about" element={<Layout><Story/></Layout>} />
                <Route path="/products" element={<Layout><Products/></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;