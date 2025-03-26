import { createContext, useContext } from 'react';

export type Language = 'en' | 'zh';

export const translations = {
  en: {
    title: 'Referral CRM',
    addCompany: 'Add Company',
    companies: 'Companies',
    recentReferrals: 'Recent Referrals',
    companyName: 'Company Name',
    contactName: 'Contact Name',
    contactEmail: 'Contact Email',
    referrerName: 'Referrer Name',
    referrerEmail: 'Referrer Email',
    notes: 'Notes',
    cancel: 'Cancel',
    add: 'Add',
    added: 'Added',
    newCompany: 'Add New Company',
    newReferral: 'Add New Referral for',
    importExport: 'Import/Export',
    import: 'Import',
    export: 'Export',
    importCompanies: 'Import Companies',
    exportCompanies: 'Export Companies',
    importReferrals: 'Import Referrals',
    exportReferrals: 'Export Referrals',
    deleteReferral: 'Delete Referral',
    confirmDeleteReferral: 'Are you sure you want to delete this referral?',
    status: {
      new: 'New',
      active: 'Active',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    errors: {
      fetchFailed: 'Failed to fetch data',
      addCompanyFailed: 'Failed to add company',
      addReferralFailed: 'Failed to add referral',
      deleteFailed: 'Delete failed',
      importFailed: 'Import failed'
    },
    success: {
      companyAdded: 'Company added successfully',
      referralAdded: 'Referral added successfully',
      referralDeleted: 'Referral deleted successfully'
    }
  },
  zh: {
    title: '推荐客户管理',
    addCompany: '添加公司',
    companies: '公司列表',
    recentReferrals: '最近推荐',
    companyName: '公司名称',
    contactName: '联系人姓名',
    contactEmail: '联系人邮箱',
    referrerName: '推荐人姓名',
    referrerEmail: '推荐人邮箱',
    notes: '备注',
    cancel: '取消',
    add: '添加',
    added: '添加于',
    newCompany: '添加新公司',
    newReferral: '为以下公司添加推荐',
    importExport: '导入/导出',
    import: '导入',
    export: '导出',
    importCompanies: '导入公司',
    exportCompanies: '导出公司',
    importReferrals: '导入推荐',
    exportReferrals: '导出推荐',
    deleteReferral: '删除推荐',
    confirmDeleteReferral: '确定要删除这条推荐吗？',
    status: {
      new: '新建',
      active: '活跃',
      pending: '待处理',
      approved: '已通过',
      rejected: '已拒绝'
    },
    errors: {
      fetchFailed: '获取数据失败',
      addCompanyFailed: '添加公司失败',
      addReferralFailed: '添加推荐失败',
      deleteFailed: '删除失败',
      importFailed: '导入失败'
    },
    success: {
      companyAdded: '公司添加成功',
      referralAdded: '推荐添加成功',
      referralDeleted: '推荐删除成功'
    }
  }
};

export type TranslationKey = keyof typeof translations.en;

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: 'zh',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);