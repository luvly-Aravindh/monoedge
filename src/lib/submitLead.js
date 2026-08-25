// Getnos Desk — direct lead submit (no PHP proxy).
// Call ONCE per form submit. Each answer is its own JSON field.

const DESK_URL = 'https://deskbackend.getnos.io/v1/lead';
const API_KEY = 'lh_vH7BjtjqbrTgKAEFvZKip0OyCg80AlSsQoSxgiprPFA';

let submitting = false;

/**
 * @param {object} opts
 * @param {string} opts.form — Desk form id (e.g. "contact", "optin")
 * @param {object} opts.fields — flat field map
 * @returns {Promise<{ ok: boolean, duplicate?: boolean, leadId?: string, skipped?: boolean, error?: boolean }>}
 */
export async function submitLead({ form, fields }) {
  if (submitting) {
    return { ok: true, duplicate: true, skipped: true };
  }
  submitting = true;

  try {
    const body = {
      form,
      name: (fields.name || '').trim(),
      email: (fields.email || '').trim(),
      honeypot: (fields.honeypot || '').trim(),
    };

    const optional = ['phone', 'company', 'business', 'revenue', 'budget', 'solution', 'bottleneck'];
    for (const key of optional) {
      const val = fields[key];
      if (val != null && String(val).trim() !== '') {
        body[key] = String(val).trim();
      }
    }

    const res = await fetch(DESK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (data.duplicate) {
      return { ok: true, duplicate: true, leadId: data.leadId };
    }

    if (!res.ok) {
      return { ok: false, error: true, message: data.message || null };
    }

    return { ok: true, leadId: data.leadId, message: data.message };
  } catch {
    return { ok: false, error: true };
  } finally {
    submitting = false;
  }
}
