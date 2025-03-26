import { Company, Referral } from './storage';

type CSVRow = Record<string, string | number | boolean>;

// Convert array to CSV string
function arrayToCSV(data: CSVRow[], headers: string[]): string {
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma or newline
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

// Parse CSV string to array of objects
function parseCSV(csv: string): CSVRow[] {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(header => 
    header.trim().replace(/^"(.+)"$/, '$1')
  );
  
  const results: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const row: CSVRow = {};
    
    for (let j = 0; j < headers.length; j++) {
      let value = values[j] || '';
      // Remove quotes and unescape double quotes
      value = value.trim().replace(/^"(.+)"$/, '$1').replace(/""/g, '"');
      row[headers[j]] = value;
    }
    
    results.push(row);
  }
  
  return results;
}

// Export companies to CSV
export function exportCompaniesToCSV(companies: Company[]): string {
  const headers = ['id', 'name', 'contact_name', 'contact_email', 'status', 'created_at'];
  return arrayToCSV(companies, headers);
}

// Export referrals to CSV
export function exportReferralsToCSV(referrals: Referral[]): string {
  const headers = ['id', 'company_id', 'referrer_name', 'referrer_email', 'notes', 'status', 'created_at'];
  return arrayToCSV(referrals, headers);
}

// Parse companies from CSV
export function parseCompaniesCSV(csv: string): Partial<Company>[] {
  return parseCSV(csv).map(row => ({
    name: String(row.name || ''),
    contact_name: String(row.contact_name || ''),
    contact_email: String(row.contact_email || ''),
    status: String(row.status || 'new') as Company['status']
  }));
}

// Parse referrals from CSV
export function parseReferralsCSV(csv: string): Partial<Referral>[] {
  return parseCSV(csv).map(row => ({
    company_id: String(row.company_id || ''),
    referrer_name: String(row.referrer_name || ''),
    referrer_email: String(row.referrer_email || ''),
    notes: String(row.notes || ''),
    status: String(row.status || 'pending') as Referral['status']
  }));
}

// Download CSV file
export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
