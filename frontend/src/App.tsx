import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiStepForm from "./pages/MultiStepForm";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/company/step1" element={<MultiStepForm />} />           
        <Route path="/company/step2/:companyId" element={<MultiStepForm />} /> 
        <Route path="/" element={<AdminPage />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;