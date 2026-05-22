'use client';

import { useState, useRef } from 'react';

const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '22px 16px 8px',
  fontSize: 15,
  color: '#fff',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 10,
  outline: 'none',
  transition: 'border-color 200ms ease, background 200ms ease',
  fontFamily: 'inherit',
};

type Field = {
  label: string;
  id: string;
  type: string;
  required: boolean;
  span: boolean;
  textarea?: boolean;
  autoComplete: string;
};

const FIELDS: Field[] = [
  { label: 'Nom complet',       id: 'name',    type: 'text',     required: true,  span: false, autoComplete: 'name' },
  { label: 'Email',             id: 'email',   type: 'email',    required: true,  span: false, autoComplete: 'email' },
  { label: 'Sujet (optionnel)', id: 'subject', type: 'text',     required: false, span: true,  autoComplete: 'off' },
  { label: 'Votre message',     id: 'message', type: 'textarea', required: true,  span: true,  textarea: true, autoComplete: 'off' },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toast, setToast] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const data    = new FormData(e.currentTarget);
    const name    = data.get('name')    as string;
    const email   = data.get('email')   as string;
    const subject = (data.get('subject') as string) || 'Message depuis le portfolio';
    const message = data.get('message') as string;

    const body = encodeURIComponent(`Bonjour Traviss,\n\n${message}\n\n— ${name}\n${email}`);
    const sub  = encodeURIComponent(subject);
    window.location.href = `mailto:contact@traviss.dev?subject=${sub}&body=${body}`;

    setToast(true);
    formRef.current?.reset();
    setTimeout(() => { setToast(false); setSending(false); }, 3000);
  };

  const focusStyle  = { borderColor: 'rgba(34,211,238,0.40)', background: 'rgba(34,211,238,0.04)' };
  const blurStyle   = { borderColor: 'rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)' };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="cf-form-grid"
        style={{
          margin: '24px auto 0',
          padding: 28,
          maxWidth: 720,
          textAlign: 'left',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 18,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          display: 'grid',
          gap: 14,
          position: 'relative',
        }}
      >
        {FIELDS.map((field) => (
          <div
            key={field.id}
            style={{ position: 'relative', gridColumn: field.span ? 'span 2' : 'span 1' }}
            className="cf-field"
          >
            {field.textarea ? (
              <textarea
                id={field.id}
                name={field.id}
                rows={5}
                required={field.required}
                placeholder=" "
                aria-label={field.label}
                autoComplete={field.autoComplete}
                style={{ ...FIELD_STYLE, display: 'block', minHeight: 120 }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={(e)  => Object.assign(e.currentTarget.style, blurStyle)}
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required={field.required}
                placeholder=" "
                aria-label={field.label}
                autoComplete={field.autoComplete}
                style={{ ...FIELD_STYLE, display: 'block' }}
                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={(e)  => Object.assign(e.currentTarget.style, blurStyle)}
              />
            )}
            <label
              htmlFor={field.id}
              className="cf-label"
              style={{
                position: 'absolute',
                left: 16,
                top: 18,
                fontSize: 14,
                color: '#64748b',
                pointerEvents: 'none',
                transition: 'all 200ms ease',
              }}
            >
              {field.label}
            </label>
          </div>
        ))}

        {/* Submit */}
        <div className="cf-submit-wrap" style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={sending}
            style={{
              padding: '14px 26px',
              background: sending
                ? 'rgba(255,255,255,0.06)'
                : 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
              borderRadius: 999,
              color: sending ? '#64748b' : '#fff',
              fontWeight: 500,
              fontSize: 15,
              border: 'none',
              cursor: sending ? 'default' : 'pointer',
              boxShadow: sending ? 'none' : '0 10px 30px -8px rgba(34,211,238,0.35)',
              transition: 'transform 250ms ease, box-shadow 250ms ease, background 250ms ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (sending) return;
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 18px 48px -8px rgba(139,92,246,0.5)';
            }}
            onMouseLeave={(e) => {
              if (sending) return;
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 10px 30px -8px rgba(34,211,238,0.35)';
            }}
          >
            {sending ? 'Ouverture…' : 'Envoyer →'}
          </button>
        </div>
      </form>

      {/* Toast */}
      <div
        style={{
          position: 'fixed',
          bottom: 'max(30px, env(safe-area-inset-bottom, 30px))',
          left: '50%',
          transform: `translateX(-50%) translateY(${toast ? '0' : '24px'})`,
          opacity: toast ? 1 : 0,
          transition: 'opacity 400ms ease, transform 400ms ease',
          background: 'rgba(2,6,23,0.92)',
          border: '1px solid rgba(52,211,153,0.35)',
          borderRadius: 10,
          padding: '12px 20px',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          zIndex: 100,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(10px)',
        }}
      >
        ✓ Client mail ouvert avec succès
      </div>

      {/* Floating labels — nécessite pseudo-classes, ne peut pas être inline */}
      <style>{`
        .cf-field input:focus + .cf-label,
        .cf-field input:not(:placeholder-shown) + .cf-label,
        .cf-field textarea:focus + .cf-label,
        .cf-field textarea:not(:placeholder-shown) + .cf-label {
          top: 7px !important;
          font-size: 11px !important;
          color: #22d3ee !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          font-family: var(--font-geist-mono, ui-monospace) !important;
          font-weight: 500 !important;
        }
      `}</style>
    </>
  );
}
