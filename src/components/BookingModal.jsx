import { useEffect, useRef, useState } from 'react';
import { SCHED_URL, LEAD_ENDPOINT, LEAD_MAGNET } from '../data/content.js';

const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const digits10 = (v) => v.replace(/[^0-9]/g, '').slice(0, 10);

// Booking modal. Shows a recap for warm (pre-identified) visitors and a full
// form for cold ones. Validates, fires the lead to the PHP endpoint, then
// redirects to the scheduler, exactly as the original page did.
export default function BookingModal({ open, onClose, prefill }) {
  const { name: pName, email: pEmail, phone: pPhone, first, warm } = prefill;

  const [showCold, setShowCold] = useState(!warm);
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [company, setCompany] = useState('');
  const [wa, setWa] = useState('');
  const [err, setErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [sending, setSending] = useState(false);
  const companyRef = useRef(null);

  // Body scroll lock, focus and Escape handling while the modal is open.
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

  const onEdit = () => {
    setShowCold(true);
    setCName(pName);
    setCEmail(pEmail);
    setCPhone(pPhone);
  };

  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const book = () => {
    const cold = showCold;
    const nm = cold ? cName.trim() : pName;
    const em = cold ? cEmail.trim() : pEmail;
    const ph = cold ? cPhone.trim() : pPhone;
    const co = company.trim();
    const waVal = wa.trim();

    if (cold && nm.length < 2) { setErr('Please enter your full name.'); return; }
    if (cold && !isEmail(em)) { setErr('Please enter a valid work email.'); return; }
    if (cold && ph.replace(/[^0-9]/g, '').length !== 10) { setPhoneErr('Please enter a valid 10 digit mobile number.'); return; }
    if (co.length < 2) { setErr('Please enter your company name.'); return; }
    if (waVal.length > 0 && waVal.length < 10) { setErr('Please enter a valid 10 digit WhatsApp number.'); return; }
    setErr('');
    setPhoneErr('');
    setSending(true);

    // Redirect only after the endpoint confirms the lead is stored,
    // with a 2.5s cap so a slow server never strands the visitor.
    // keepalive stays on as a safety net if the cap fires first.
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.href =
        SCHED_URL +
        '&name=' + encodeURIComponent(nm) +
        '&email=' + encodeURIComponent(em) +
        '&company=' + encodeURIComponent(co) +
        '&phone=' + encodeURIComponent(ph) +
        '&wa=' + encodeURIComponent(waVal ? '+91' + waVal : '');
    };

    try {
      fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          name: nm,
          email: em,
          phone: ph ? '+91' + ph : '',
          whatsapp: waVal ? '+91' + waVal : '',
          company: co,
          lead_magnet: LEAD_MAGNET,
          source: 'landing-booking',
          page: window.location.href,
          ts: new Date().toISOString(),
        }),
      }).then(go, go);
    } catch (e) { go(); }

    setTimeout(go, 2500);
  };

  return (
    <div className={open ? 'modal on' : 'modal'} id="m" onClick={onBackdrop}>
      <div className="mcard">
        <button aria-label="Close" className="mx" id="mx" onClick={onClose}>×</button>
        <div className="m-ey">Book your demo</div>
        <h2 id="greet">{warm ? `One last detail, ${first}.` : 'One last detail.'}</h2>
        <p className="m-sub">Tell us where you work and we will take you straight to the calendar.</p>

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
                  inputMode="numeric"
                  placeholder="98765 43210"
                  type="tel"
                  value={cPhone}
                  onChange={(e) => { const v = digits10(e.target.value); setCPhone(v); if (phoneErr && (v.length === 10 || v.length === 0)) setPhoneErr(''); }}
                  onBlur={() => { if (cPhone.length > 0 && cPhone.length !== 10) setPhoneErr('Please enter a valid 10 digit mobile number.'); }}
                />
              </div>
              {phoneErr && <div className="fld-err">{phoneErr}</div>}
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
          <label htmlFor="wa">WhatsApp number</label>
          <div className="phone">
            <span className="cc">
              <span className="tri"><i /><i /><i /></span>
              +91
            </span>
            <input
              id="wa"
              inputMode="numeric"
              placeholder="98765 43210"
              type="tel"
              value={wa}
              onChange={(e) => setWa(digits10(e.target.value))}
            />
          </div>
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
