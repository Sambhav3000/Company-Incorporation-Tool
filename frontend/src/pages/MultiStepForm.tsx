import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Step1Form from "../components/Step1Form";
import Step2Form from "../components/Step2Form";
import "../styles/MultiStepForm.css";

type CompanyData = {
  id?: number;
  name: string;
  totalCapital: number | "";
  numberOfShareholders: number | "";
};

type ShareholderData = {
  firstName: string;
  lastName: string;
  nationality: string;
};

export default function MultiStepForm() {
  const { companyId } = useParams<{ companyId?: string }>();
  const navigate = useNavigate();
  const isStep2 = !!companyId;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<CompanyData>({
    name: "",
    totalCapital: "",
    numberOfShareholders: "",
  });
  const [shareholders, setShareholders] = useState<ShareholderData[]>([]);
  const [error, setError] = useState("");

  /* ===============================
     LOAD COMPANY IF STEP2
  =============================== */
  useEffect(() => {
    if (isStep2 && companyId) {
      setStep(2);
      fetch(`http://localhost:5000/api/company/${companyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            const comp = data.data;
            setCompany({
              id: comp.id,
              name: comp.name,
              totalCapital: comp.totalCapital,
              numberOfShareholders: comp.numberOfShareholders,
            });

            setShareholders(
              comp.shareholders.length > 0
                ? comp.shareholders.map((s: any) => ({
                    firstName: s.firstName,
                    lastName: s.lastName,
                    nationality: s.nationality,
                  }))
                : Array.from({ length: comp.numberOfShareholders }, () => ({
                    firstName: "",
                    lastName: "",
                    nationality: "",
                  }))
            );
          }
        })
        .catch(() => setError("Failed to load company data."));
    } else {
      setStep(1);
    }
  }, [isStep2, companyId]);

  /* ===============================
     AUTO SAVE SHAREHOLDER DRAFT
  =============================== */
  useEffect(() => {
    if (step === 2) {
      localStorage.setItem("shareholderDraft", JSON.stringify(shareholders));
    }
  }, [shareholders, step]);

  /* ===============================
     DYNAMIC SHAREHOLDER RESIZING
  =============================== */
  useEffect(() => {
    if (step !== 2) return;

    const required =
      typeof company.numberOfShareholders === "number"
        ? company.numberOfShareholders
        : 0;

    if (required <= 0) return;

    setShareholders((prev) => {
      if (prev.length === required) return prev;
      if (prev.length < required) {
        return [
          ...prev,
          ...Array.from({ length: required - prev.length }).map(() => ({
            firstName: "",
            lastName: "",
            nationality: "",
          })),
        ];
      }
      return prev.slice(0, required);
    });
  }, [step, company.numberOfShareholders]);

  /* ===============================
     STEP1 SUBMIT
  =============================== */
  const handleStep1Submit = async () => {
    setError("");
    if (!company.name.trim()) {
      setError("Company name is required");
      return;
    }
    if (company.totalCapital === "" || company.totalCapital <= 0) {
      setError("Total capital must be greater than 0");
      return;
    }
    if (
      company.numberOfShareholders === "" ||
      company.numberOfShareholders < 1
    ) {
      setError("Number of shareholders must be at least 1");
      return;
    }

    setLoading(true);
    try {
      let companyIdToUse = company.id;

      // Only create new company if no ID
      if (!company.id) {
        const res = await fetch("http://localhost:5000/api/company/step1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: company.name,
            totalCapital: company.totalCapital,
            numberOfShareholders: company.numberOfShareholders,
          }),
        });
        const data = await res.json();
        if (data.success) {
          companyIdToUse = data.data.id;
          setCompany({ ...company, id: companyIdToUse });
        } else {
          setError(data.message || "Error creating company");
          return;
        }
      }

      setStep(2);
      navigate(`/company/step2/${companyIdToUse}`);
    } catch (err) {
      console.error(err);
      setError("Error submitting Step 1");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     STEP2 SUBMIT
  =============================== */
  const handleStep2Submit = async () => {
    setError("");
    for (let i = 0; i < shareholders.length; i++) {
      const sh = shareholders[i];
      if (!sh.firstName || !sh.lastName || !sh.nationality) {
        setError(`Please fill all details for shareholder ${i + 1}`);
        return;
      }
    }
    if (!company.id) {
      setError("Company ID missing. Please submit Step 1 first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/company/step2/${company.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shareholders }),
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Company and shareholders submitted successfully!");
        localStorage.removeItem("companyId");
        localStorage.removeItem("shareholderDraft");
        navigate("/admin");
      } else {
        setError(data.message || "Error saving shareholders");
      }
    } catch (err) {
      console.error(err);
      setError("Error saving shareholders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="step-indicator">Step {step} of 2</div>
      <h2>{step === 1 ? "Company Information" : "Shareholder Details"}</h2>

      {step === 1 ? (
        <Step1Form
          company={company}
          setCompany={setCompany}
          nextStep={handleStep1Submit}
          loading={loading}
          error={error}
        />
      ) : (
        <Step2Form
          shareholders={shareholders}
          setShareholders={setShareholders}
          prevStep={() => setStep(1)} // Previous button works now
          onSubmit={handleStep2Submit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}