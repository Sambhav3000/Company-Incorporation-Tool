import React from "react";
import "../styles/Step1Form.css";

type CompanyData = {
  name: string;
  totalCapital: number | "";
  numberOfShareholders: number | "";
};

interface Step1FormProps {
  company: CompanyData;
  setCompany: (company: CompanyData) => void;
  nextStep: () => void;
  loading: boolean;
  error: string;
}

const Step1Form = ({ company, setCompany, nextStep, loading, error }: Step1FormProps) => {
  return (
    <div className="step1-container">
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Total Capital</label>
        <input
          type="number"
          value={company.totalCapital}
          onChange={(e) => {
            const value = e.target.value;
            setCompany({ ...company, totalCapital: value === "" ? "" : parseInt(value) });
          }}
        />
      </div>

      <div className="form-group">
        <label>Number of Shareholders</label>
        <input
          type="number"
          value={company.numberOfShareholders}
          onChange={(e) => {
            const value = e.target.value;
            setCompany({ ...company, numberOfShareholders: value === "" ? "" : parseInt(value) });
          }}
        />
      </div>

      <button className="next-btn" onClick={nextStep} disabled={loading}>
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
};

export default Step1Form;