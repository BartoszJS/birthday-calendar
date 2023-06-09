import { Routes, Route } from "react-router-dom";

import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import BirthdayForm from "./components/BirthdayForm/BirthdayForm";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/birthday-calendar' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/birthday-form' element={<BirthdayForm />} />
      </Routes>
    </div>
  );
}

export default App;
