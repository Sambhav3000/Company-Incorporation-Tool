import "../styles/Step2Form.css";

type ShareholderData = {
  firstName: string;
  lastName: string;
  nationality: string;
};

type CompanyData = {
  name: string;
  totalCapital: number | "";
  numberOfShareholders: number | "";
};

interface Step2FormProps {
  shareholders: ShareholderData[];
  setShareholders: (s: ShareholderData[]) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
  prevStep?: () => void; 
  companySummary?: CompanyData; 
}

const Step2Form = ({
  shareholders,
  setShareholders,
  prevStep,
  onSubmit,
  loading,
  error,
  companySummary,
}: Step2FormProps) => {
  return (
    <div className="step2-container">
      {companySummary && (
        <div className="company-summary">
          <h3>Company Summary</h3>
          <p><strong>Name:</strong> {companySummary.name}</p>
          <p><strong>Total Capital:</strong> {companySummary.totalCapital}</p>
          <p><strong>Number of Shareholders:</strong> {companySummary.numberOfShareholders}</p>
        </div>
      )}

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
        {prevStep && (
          <button className="prev-btn" onClick={prevStep}>
            Previous
          </button>
        )}
        <button className="submit-btn" onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : "Submit Company"}
        </button>
      </div>
    </div>
  );
};

export default Step2Form;