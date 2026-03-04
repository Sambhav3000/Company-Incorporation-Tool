import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiStepForm from "./pages/MultiStepForm";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/company/step1" element={<MultiStepForm />} />           {/* New company */}
        <Route path="/company/step2/:companyId" element={<MultiStepForm />} /> {/* Add shareholders */}
        <Route path="/" element={<AdminPage />} />  {/* Optional: default to admin dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;