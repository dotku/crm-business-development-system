import React, { useState, useEffect } from "react";
import { Plus, Languages, Loader2, FileDown } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Language, LanguageContext, translations } from "./lib/i18n";
import { storage, type Company, type Referral } from "./lib/storage";
import { CompanyList } from "./components/CompanyList";
import { ReferralList } from "./components/ReferralList";
import { CompanyForm } from "./components/CompanyForm";
import { ReferralForm } from "./components/ReferralForm";
import { ImportExportModal } from "./components/ImportExportModal";

type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [showNewReferralForm, setShowNewReferralForm] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [language, setLanguage] = useState<Language>("zh");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: NestedTranslation | string = translations[language];
    for (const k of keys) {
      value = (value as NestedTranslation)[k];
    }
    return value as string || key;
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    try {
      setCompanies(storage.getCompanies());
      setReferrals(storage.getReferrals());
    } catch {
      toast.error(t("errors.fetchFailed"));
    } finally {
      setLoading(false);
    }
  }

  function handleNewCompany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      storage.addCompany({
        name: formData.get("name") as string,
        contact_name: formData.get("contact_name") as string,
        contact_email: formData.get("contact_email") as string,
      });

      toast.success(t("success.companyAdded"));
      setShowNewCompanyForm(false);
      fetchData();
      form.reset();
    } catch {
      toast.error(t("errors.addCompanyFailed"));
    }
  }

  function handleNewReferral(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      storage.addReferral({
        company_id: selectedCompany?.id as string,
        referrer_name: formData.get("referrer_name") as string,
        referrer_email: formData.get("referrer_email") as string,
        notes: formData.get("notes") as string,
      });

      toast.success(t("success.referralAdded"));
      setShowNewReferralForm(false);
      setSelectedCompany(null);
      fetchData();
      form.reset();
    } catch {
      toast.error(t("errors.addReferralFailed"));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("title")}
              </h1>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowImportExport(true)}
                  className="p-2.5 rounded-md hover:bg-gray-100 transition-colors"
                  title={t("importExport")}
                >
                  <FileDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                  className="p-2.5 rounded-md hover:bg-gray-100 transition-colors"
                  title={language === "zh" ? "Switch to English" : "切换到中文"}
                >
                  <Languages className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowNewCompanyForm(true)}
                  className="bg-blue-500 text-white px-4 py-2.5 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors flex-1 sm:flex-initial justify-center"
                >
                  <Plus className="w-5 h-5" />
                  {t("addCompany")}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <CompanyList
              companies={companies}
              onSelectCompany={(company) => {
                setSelectedCompany(company);
                setShowNewReferralForm(true);
              }}
              t={t}
            />
            <ReferralList
              referrals={referrals}
              t={t}
              onDelete={() => {
                fetchData();
              }}
            />
          </div>
        </main>

        {/* Forms */}
        {showNewCompanyForm && (
          <CompanyForm
            onSubmit={handleNewCompany}
            onCancel={() => setShowNewCompanyForm(false)}
            t={t}
          />
        )}

        {showNewReferralForm && selectedCompany && (
          <ReferralForm
            company={selectedCompany}
            onSubmit={handleNewReferral}
            onCancel={() => {
              setShowNewReferralForm(false);
              setSelectedCompany(null);
            }}
            t={t}
          />
        )}

        {showImportExport && (
          <ImportExportModal
            onClose={() => setShowImportExport(false)}
            onDataChange={fetchData}
            t={t}
          />
        )}
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
