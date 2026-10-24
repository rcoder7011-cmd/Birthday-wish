
import NameEnter from "./pages/NameEnter";
import LinkGenerator from "./pages/LinkGenerator";
import { Routes, Route } from "react-router-dom";

import BirthdayWishAll from "./pages/BirthdayWishAll";
import BirthdayGift from "./pages/BirthdayWish2";
import "./App.css"
import BirthdayWish3 from "./pages/BirthdayWish3";
import PurposePage1 from "./pages/PurposePage1";

function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<NameEnter />} />
        <Route path="/generateLink" element={<LinkGenerator />} />
          <Route path="/wish" element={<BirthdayWishAll />} />
        <Route path="/BirthdayWish3" element={<BirthdayWish3 />} />
        <Route path="/purposePage" element={<PurposePage1 />} />

      </Routes>
    </>
  )
}

export default App
