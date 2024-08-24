import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContractAccount from './pages/ContractAccount';
import HeirAccount from './pages/HeirAccount';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Define the home page route */}
        <Route path="/" element={<Home />} />
        <Route path="/contractaccount" element={<ContractAccount />} />
        <Route path="/heiraccount" element={<HeirAccount />} />
        {/* You can add more routes here for other components/pages */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  )
}

export default App
