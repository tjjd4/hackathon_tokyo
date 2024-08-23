import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Heir from './pages/Heir';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Define the home page route */}
        <Route path="/" element={<Home />} />
        <Route path="/heir" element={<Heir />} />
        {/* You can add more routes here for other components/pages */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  )
}

export default App
