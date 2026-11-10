import CookieConsent from '@/components/CookieConsent';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Popup from '@/components/Popup';
import ConversionTracker from '@/components/client/ConversionTracker';
import Blob from '@/ui/Blob';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConversionTracker />
      <Popup />
      <FloatingWhatsApp />
      <Blob />
      <Navbar />
      <main id="hero">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
