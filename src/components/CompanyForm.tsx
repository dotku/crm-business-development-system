import React from 'react';

type CompanyFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  t: (key: string) => string;
};

export function CompanyForm({ onSubmit, onCancel, t }: CompanyFormProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-6">{t('newCompany')}</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="company-name">{t('companyName')}</label>
            <input
              type="text"
              id="company-name"
              name="name"
              required
              placeholder={t('companyName')}
              autoComplete="organization"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-name">{t('contactName')}</label>
            <input
              type="text"
              id="contact-name"
              name="contact_name"
              required
              placeholder={t('contactName')}
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">{t('contactEmail')}</label>
            <input
              type="email"
              id="contact-email"
              name="contact_email"
              required
              placeholder={t('contactEmail')}
              autoComplete="email"
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {t('add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}