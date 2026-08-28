// Getnos Desk — direct lead submit (no PHP proxy).
// ONE POST per visitor: only the booking step calls this (not opt-in).

const DESK_URL = 'https://deskbackend.getnos.io/v1/lead';
const API_KEY = 'lh_vH7BjtjqbrTgKAEFvZKip0OyCg80AlSsQoSxgiprPFA';
const DESK_FORM = 'contact';

let submitting = false;

/**
 * @param {object} fields — flat field map (name, email, phone, company, …)
 */
export async function submitLead(fields) {
  if (submitting) {
    return { ok: true, duplicate: true, skipped: true };
  }
  submitting = true;

  try {
    const body = {
      form: DESK_FORM,
      name: (fields.name || '').trim(),
      email: (fields.email || '').trim(),
      honeypot: (fields.honeypot || '').trim(),
      landingPage: (fields.landingPage || window.location.href || '').trim(),
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
