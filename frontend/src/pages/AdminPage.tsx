import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminPage.css";

interface Shareholder {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
}

interface Company {
  id: number;
  name: string;
  totalCapital: number;
  numberOfShareholders: number;
  createdAt: string;
  shareholders: Shareholder[];
}

const AdminPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch companies from backend
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/companies");
      const data = await res.json();
      if (data.success) setCompanies(data.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to MultiStepForm Step1 for new company
  const goToAddCompany = () => {
    navigate("/company/step1");
  };

  // Navigate to MultiStepForm Step2 for adding shareholders
  const goToAddShareholders = (companyId: number) => {
    navigate(`/company/step2/${companyId}`);
  };

  useEffect(() => {
    fetchCompanies(); // automatically load companies on mount
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-actions">
        <button className="add-btn" onClick={goToAddCompany}>
          Add New Company
        </button>
        <button className="view-btn" onClick={fetchCompanies}>
          {loading ? "Loading..." : "Refresh Companies"}
        </button>
      </div>

      <div className="companies-list">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <h2>{company.name}</h2>
            <p>Total Capital: ${company.totalCapital}</p>
            <p>Shareholders: {company.numberOfShareholders}</p>
            <p>Created: {new Date(company.createdAt).toLocaleString()}</p>

            {/* Show Shareholders if any */}
            {company.shareholders.length > 0 && (
              <>
                <h3>Shareholders:</h3>
                <ul>
                  {company.shareholders.map((s) => (
                    <li key={s.id}>
                      {s.firstName} {s.lastName} ({s.nationality})
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Show "Add Shareholder Info" button if missing */}
            {company.shareholders.length === 0 &&
              company.numberOfShareholders > 0 && (
                <button
                  className="add-shareholders-btn"
                  onClick={() => goToAddShareholders(company.id)}
                >
                  Add Shareholder Info
                </button>
              )}
          </div>
        ))}

        {companies.length === 0 && !loading && (
          <p>No companies found. Click "Add New Company" to create one.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;