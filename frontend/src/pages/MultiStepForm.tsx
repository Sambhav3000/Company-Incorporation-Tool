import { useState, useEffect } from "react";
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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<CompanyData>({
    name: "",
    totalCapital: "",
    numberOfShareholders: "",
  });
  const [shareholders, setShareholders] = useState<ShareholderData[]>([]);
  const [error, setError] = useState("");

  // Restore draft on mount
  useEffect(() => {
    const savedCompanyId = localStorage.getItem("companyId");
    if (savedCompanyId) {
      fetch(`http://localhost:5000/api/company/${savedCompanyId}`)
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

            if (comp.shareholders && comp.shareholders.length > 0) {
              setShareholders(comp.shareholders);
              setStep(2);
            }
          }
        })
        .catch(() => console.log("Failed to restore draft from backend"));
    }
  }, []);

  // Initialize empty shareholder forms when going to Step 2
  useEffect(() => {
    if (
      step === 2 &&
      typeof company.numberOfShareholders === "number" &&
      shareholders.length === 0
    ) {
      setShareholders(
        Array.from({ length: company.numberOfShareholders }).map(() => ({
          firstName: "",
          lastName: "",
          nationality: "",
        }))
      );
    }
  }, [step, company.numberOfShareholders, shareholders.length]);

  // Step 1 submit
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
    if (company.numberOfShareholders === "" || company.numberOfShareholders < 1) {
      setError("Number of shareholders must be at least 1");
      return;
    }

    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/company/step1`, {
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
      setCompany({ ...company, id: data.data.id });
      localStorage.setItem("companyId", data.data.id);
      setStep(2);
    } else {
      setError(data.message || "Error creating company");
    }
    setLoading(false);
  };

  // Step 2 submit
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
    const res = await fetch(`http://localhost:5000/api/company/step2/${company.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shareholders }),
    });
    const data = await res.json();

    if (data.success) {
      alert("Company and shareholders submitted successfully!");
      localStorage.removeItem("companyId");
      setStep(1);
      setCompany({ name: "", totalCapital: "", numberOfShareholders: "" });
      setShareholders([]);
    } else {
      setError(data.message || "Error saving shareholders");
    }
    setLoading(false);
  };

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
          prevStep={() => setStep(1)}
          onSubmit={handleStep2Submit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}