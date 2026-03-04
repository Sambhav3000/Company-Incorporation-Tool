import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getToken } from "../utils/auth";
import LogoutButton from "../components/LogoutButton"; // Logout component
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

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/company"); 
      if (res.data.success) setCompanies(res.data.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    } finally {
      setLoading(false);
    }
  };

  const goToAddCompany = () => {
    navigate("/company/step1");
  };

  const goToAddShareholders = (companyId: number) => {
    navigate(`/company/step2/${companyId}`);
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    fetchCompanies();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <LogoutButton />
      </div>

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