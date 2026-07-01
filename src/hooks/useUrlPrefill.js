import { useMemo } from 'react';

// Reads name/email/phone from the query string once, the same way the
// original page did, and derives whether this is a "warm" (pre-identified)
// visitor so the hero and modal can greet them by name.
export function useUrlPrefill() {
  return useMemo(() => {
    const P = new URLSearchParams(window.location.search);
    const name = (P.get('name') || '').trim();
    const email = (P.get('email') || '').trim();
    const phone = (P.get('phone') || '').trim();
    let first = name ? name.split(' ')[0] : '';
    if (first) first = first.slice(0, 18);
    if (first) first = first.charAt(0).toUpperCase() + first.slice(1);
    return { name, email, phone, first, warm: Boolean(name && email) };
  }, []);
}
