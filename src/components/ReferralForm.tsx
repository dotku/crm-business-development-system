import React from 'react';
import type { Company } from '../lib/storage';

type ReferralFormProps = {
  company: Company;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  t: (key: string) => string;
};

export function ReferralForm({ company, onSubmit, onCancel, t }: ReferralFormProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-6">
          {t('newReferral')} <span className="text-blue-600">{company.name}</span>
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="referrer-name">{t('referrerName')}</label>
            <input
              type="text"
              id="referrer-name"
              name="referrer_name"
              required
              placeholder={t('referrerName')}
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="referrer-email">{t('referrerEmail')}</label>
            <input
              type="email"
              id="referrer-email"
              name="referrer_email"
              required
              placeholder={t('referrerEmail')}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">{t('notes')}</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder={t('notes')}
              className="resize-none"
            ></textarea>
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