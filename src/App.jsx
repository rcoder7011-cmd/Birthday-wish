
import NameEnter from "./pages/NameEnter";
import LinkGenerator from "./pages/LinkGenerator";
import { Routes, Route } from "react-router-dom";

function App() {  
  return (
    <>


      <Routes>
        <Route path="/" element={<NameEnter />} />
        <Route path="/generateLink" element={<LinkGenerator />} />
      </Routes>
    </>
  )
}

export default App
