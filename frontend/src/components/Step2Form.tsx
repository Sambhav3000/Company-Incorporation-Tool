import React from "react";
import "../styles/Step2Form.css";

type ShareholderData = {
  firstName: string;
  lastName: string;
  nationality: string;
};

interface Step2FormProps {
  shareholders: ShareholderData[];
  setShareholders: (s: ShareholderData[]) => void;
  prevStep: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

const Step2Form = ({ shareholders, setShareholders, prevStep, onSubmit, loading, error }: Step2FormProps) => {
  return (
    <div className="step2-container">
      {error && <div className="error">{error}</div>}

      {shareholders.map((sh, idx) => (
        <div key={idx} className="shareholder-card">
          <h4>Shareholder {idx + 1}</h4>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={sh.firstName}
              onChange={(e) => {
                const updated = [...shareholders];
                updated[idx].firstName = e.target.value;
                setShareholders(updated);
              }}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={sh.lastName}
              onChange={(e) => {
                const updated = [...shareholders];
                updated[idx].lastName = e.target.value;
                setShareholders(updated);
              }}
            />
          </div>

          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              value={sh.nationality}
              onChange={(e) => {
                const updated = [...shareholders];
                updated[idx].nationality = e.target.value;
                setShareholders(updated);
              }}
            />
          </div>
        </div>
      ))}

      <div className="step2-buttons">
        <button className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button className="submit-btn" onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : "Submit Company"}
        </button>
      </div>
    </div>
  );
};

export default Step2Form;