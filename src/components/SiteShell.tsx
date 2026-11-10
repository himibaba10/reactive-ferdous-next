import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ConversionTracker from '@/components/client/ConversionTracker';
import DeferredWidgets from '@/components/client/DeferredWidgets';
import MotionProvider from '@/components/client/MotionProvider';
import Blob from '@/ui/Blob';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <ConversionTracker />
      <DeferredWidgets />
      <Blob />
      <Navbar />
      <main id="hero">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
