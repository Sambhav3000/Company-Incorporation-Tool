import MultiStepForm from "./pages/MultiStepForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './pages/AdminPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MultiStepForm />}/>
        <Route path="/add-company" element={<MultiStepForm />} />
        <Route path="/admin" element={<AdminPage />}/>
      </Routes>  
    </BrowserRouter>
)}

export default App;