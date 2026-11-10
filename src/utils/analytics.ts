/**
 * Analytics and cookie consent.
 *
 * The GA4 tag is not loaded until the visitor accepts analytics cookies —
 * index.html only *defines* `window.__loadAnalytics()`, it does not call it.
 * Nothing is measured, and no analytics cookie is set, before that point.
 */

const CONSENT_KEY = 'cookieConsent';

/** 'accepted' | 'declined' | null (no choice made yet) */
export const getConsent = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export const loadAnalytics = () => {
  if (typeof window === 'undefined') return;
  if (typeof window.__loadAnalytics === 'function') window.__loadAnalytics();
};

export const setConsent = (value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable — treat as no consent */
  }
  if (value === 'accepted') loadAnalytics();
};

/** Forget the stored choice, so the banner asks again. */
export const clearConsent = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
};

/**
 * Send a GA4 event. Does nothing at all without consent, so no identifiers are
 * collected from visitors who have not opted in.
 */
export const trackEvent = (name, params = {}) => {
  if (typeof window === 'undefined') return;
  if (getConsent() !== 'accepted') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }

  // Queued only if consent exists but gtag has not finished loading.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(['event', name, params]);
};

const linkLabel = (anchor) =>
  (anchor.getAttribute('aria-label') || anchor.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);

/**
 * One delegated listener for every conversion that matters, so individual
 * components never have to remember to instrument themselves.
 * Returns a cleanup function.
 */
export const initConversionTracking = () => {
  if (typeof document === 'undefined') return () => {};

  const handleClick = (event) => {
    const target = event.target;
    const anchor = target instanceof Element ? target.closest('a[href]') : null;
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const params = {
      link_text: linkLabel(anchor),
      link_url: href,
      page_path: window.location.pathname,
    };

    if (href.includes('wa.me') || href.includes('whatsapp')) {
      trackEvent('whatsapp_click', params);
    } else if (href.startsWith('mailto:')) {
      trackEvent('email_click', params);
    } else if (href.startsWith('tel:')) {
      trackEvent('phone_click', params);
    } else if ((anchor.getAttribute('aria-label') || '').includes('visit the live website')) {
      trackEvent('project_click', params);
    }
  };

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
};
