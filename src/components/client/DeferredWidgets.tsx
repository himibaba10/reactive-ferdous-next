'use client';

import dynamic from 'next/dynamic';

const Popup = dynamic(() => import('@/components/Popup'), { ssr: false });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), {
  ssr: false,
});
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  ssr: false,
});

/** Client-only shell for non-critical widgets (Next forbids ssr:false in RSC). */
export default function DeferredWidgets() {
  return (
    <>
      <Popup />
      <FloatingWhatsApp />
      <CookieConsent />
    </>
  );
}
