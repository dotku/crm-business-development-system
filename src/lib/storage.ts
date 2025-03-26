import { toast } from 'react-hot-toast';
import { translations } from './i18n';

export type Company = {
  id: string;
  name: string;
  contact_name: string;
  contact_email: string;
  status: string;
  created_at: string;
};

export type Referral = {
  id: string;
  company_id: string;
  referrer_name: string;
  referrer_email: string;
  notes: string;
  status: string;
  created_at: string;
};

const COMPANIES_KEY = 'crm_companies';
const REFERRALS_KEY = 'crm_referrals';

export const storage = {
  getCompanies(): Company[] {
    const companies = localStorage.getItem(COMPANIES_KEY);
    return companies ? JSON.parse(companies) : [];
  },

  getReferrals(): Referral[] {
    const referrals = localStorage.getItem(REFERRALS_KEY);
    return referrals ? JSON.parse(referrals) : [];
  },

  addCompany(company: Omit<Company, 'id' | 'status' | 'created_at'>): Company {
    const companies = this.getCompanies();
    const newCompany: Company = {
      id: crypto.randomUUID(),
      status: 'new',
      created_at: new Date().toISOString(),
      ...company,
    };
    
    companies.push(newCompany);
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    return newCompany;
  },

  addReferral(referral: Omit<Referral, 'id' | 'status' | 'created_at'>): Referral {
    const referrals = this.getReferrals();
    const newReferral: Referral = {
      id: crypto.randomUUID(),
      status: 'pending',
      created_at: new Date().toISOString(),
      ...referral,
    };
    
    referrals.push(newReferral);
    localStorage.setItem(REFERRALS_KEY, JSON.stringify(referrals));
    return newReferral;
  },

  updateCompanyStatus(id: string, status: string): void {
    const companies = this.getCompanies();
    const index = companies.findIndex(c => c.id === id);
    if (index !== -1) {
      companies[index].status = status;
      localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    }
  },

  updateReferralStatus(id: string, status: string): void {
    const referrals = this.getReferrals();
    const index = referrals.findIndex(r => r.id === id);
    if (index !== -1) {
      referrals[index].status = status;
      localStorage.setItem(REFERRALS_KEY, JSON.stringify(referrals));
    }
  }
};