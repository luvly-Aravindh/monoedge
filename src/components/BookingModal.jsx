import { useEffect, useRef, useState } from 'react';
import { SCHED_URL } from '../data/content.js';
import { submitLead } from '../lib/submitLead.js';

const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const digits10 = (v) => v.replace(/[^0-9]/g, '').slice(0, 10);

// Booking modal. Collects company + mobile on the landing page, then sends
// name/email/phone into Calendly so the calendar is prefilled.
export default function BookingModal({ open, onClose, prefill }) {
  const { name: pName, email: pEmail, phone: pPhone, first, warm } = prefill;

  const [showCold, setShowCold] = useState(!warm);
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState(() => digits10(pPhone || ''));
  const [company, setCompany] = useState('');
  const [err, setErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [sending, setSending] = useState(false);
  const companyRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { if (companyRef.current) companyRef.current.focus(); }, 120);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Keep focused fields visible above the mobile keyboard.
  useEffect(() => {
    if (!open) return;
    const root = modalRef.current;
    if (!root) return;

    const onFocusIn = (e) => {
      const el = e.target;
      if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) return;
      const scroll = () => {
        el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
      };
      setTimeout(scroll, 50);
      setTimeout(scroll, 320);
    };

    const onResize = () => {
      const active = document.activeElement;
      if (!active || !root.contains(active)) return;
      if (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA') return;
      active.scrollIntoView({ block: 'center', inline: 'nearest' });
    };

    root.addEventListener('focusin', onFocusIn);
    const vv = window.visualViewport;
    if (vv) vv.addEventListener('resize', onResize);
    window.addEventListener('resize', onResize);
    return () => {
      root.removeEventListener('focusin', onFocusIn);
      if (vv) vv.removeEventListener('resize', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const onEdit = () => {
    setShowCold(true);
    setCName(pName);
    setCEmail(pEmail);
    setCPhone(digits10(pPhone || cPhone));
  };

  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const book = async () => {
    if (sending) return;

    const cold = showCold;
    const nm = cold ? cName.trim() : pName;
    const em = cold ? cEmail.trim() : pEmail;
    const ph = digits10(cPhone);
    const co = company.trim();

    if (cold && nm.length < 2) { setErr('Please enter your full name.'); return; }
    if (cold && !isEmail(em)) { setErr('Please enter a valid work email.'); return; }
    if (co.length < 2) { setErr('Please enter your company name.'); return; }
    if (ph.length !== 10) { setPhoneErr('Please enter a valid 10 digit mobile number.'); return; }
    setErr('');
    setPhoneErr('');
    setSending(true);

    const phoneE164 = '+91' + ph;

    const redirect = () => {
      window.location.href =
        SCHED_URL +
        '&name=' + encodeURIComponent(nm) +
        '&email=' + encodeURIComponent(em) +
        '&company=' + encodeURIComponent(co) +
        '&phone=' + encodeURIComponent(phoneE164);
    };

    const result = await submitLead({
      form: 'contact',
      fields: {
        name: nm,
        email: em,
        phone: phoneE164,
        company: co,
        honeypot: '',
      },
    });

    if (!result.ok && !result.skipped) {
      setSending(false);
      setErr('Something went wrong. Please try again.');
      return;
    }

    redirect();
  };

  return (
    <div className={open ? 'modal on' : 'modal'} id="m" ref={modalRef} onClick={onBackdrop}>
      <div className="mcard">
        <button aria-label="Close" className="mx" id="mx" onClick={onClose}>×</button>
        <div className="m-ey">Book your demo</div>
        <h2 id="greet">{warm ? `One last detail, ${first}.` : 'One last detail.'}</h2>
        <p className="m-sub">Tell us where you work and your mobile — we will take you to the calendar with your details filled in.</p>

        {warm && !showCold && (
          <div className="prefill" id="recap">
            <div className="row">
              <span className="k">Name</span>
              <span className="v" id="r_name">{pName}</span>
            </div>
            <div className="row">
              <span className="k">Work email</span>
              <span className="v" id="r_email">{pEmail}</span>
            </div>
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <span className="edit" id="editlink" onClick={onEdit}>Not you? Edit</span>
            </div>
          </div>
        )}

        {showCold && (
          <div id="coldfields">
            <div className="fld">
              <label htmlFor="c_name">Full name</label>
              <input
                autoComplete="name"
                id="c_name"
                placeholder="Krishna Jindal"
                type="text"
                value={cName}
                onChange={(e) => setCName(e.target.value)}
              />
            </div>
            <div className="fld">
              <label htmlFor="c_email">Work email</label>
              <input
                autoComplete="email"
                id="c_email"
                inputMode="email"
                placeholder="you@company.com"
                type="email"
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="fld">
          <label htmlFor="company">Company name</label>
          <input
            autoComplete="organization"
            id="company"
            placeholder="Your plant or company"
            type="text"
            ref={companyRef}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="fld">
          <label htmlFor="c_phone">Mobile number</label>
          <div className="phone">
            <span className="cc">
              <span className="tri"><i /><i /><i /></span>
              +91
            </span>
            <input
              id="c_phone"
              className={phoneErr ? 'input-err' : undefined}
              autoComplete="tel-national"
              inputMode="numeric"
              placeholder="98765 43210"
              type="tel"
              value={cPhone}
              onChange={(e) => {
                const v = digits10(e.target.value);
                setCPhone(v);
                if (phoneErr && (v.length === 10 || v.length === 0)) setPhoneErr('');
              }}
              onBlur={() => {
                if (cPhone.length > 0 && cPhone.length !== 10) {
                  setPhoneErr('Please enter a valid 10 digit mobile number.');
                }
              }}
            />
          </div>
          {phoneErr && <div className="fld-err">{phoneErr}</div>}
        </div>

        <div className="err" id="err">{err}</div>
        <span className="cta-wrap">
          <button className={sending ? 'btn sent' : 'btn'} id="book" disabled={sending} onClick={book}>
            {sending ? 'Taking you to the calendar...' : 'Go to the calendar'}
          </button>
        </span>
        <p className="mmicro">30 minute demo on your own data. No slides, no obligation.</p>
      </div>
    </div>
  );
}
