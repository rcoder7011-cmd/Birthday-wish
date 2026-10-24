
import NameEnter from "./pages/NameEnter";
import LinkGenerator from "./pages/LinkGenerator";
import { Routes, Route } from "react-router-dom";
import WishPage1 from "./pages/WishPage1";
import BirthdayWishAll from "./pages/BirthdayWishAll";

function App() {  
  return (
    <>


      <Routes>
        <Route path="/" element={<NameEnter />} />
        <Route path="/generateLink" element={<LinkGenerator />} />
          <Route path="/wish" element={<BirthdayWishAll />} />
      </Routes>
    </>
  )
}

export default App
