import { BrowserRouter, Routes, Route } from "react-router-dom";

import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import BirthdayForm from "./components/BirthdayForm/BirthdayForm";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/birthday-form' element={<BirthdayForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
