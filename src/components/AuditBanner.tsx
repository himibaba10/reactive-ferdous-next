import AuditBannerMotion from '@/components/client/AuditBannerMotion';

export default function AuditBanner({ serviceName = 'Project' }: { serviceName?: string }) {
  const message = `Hi Team, I'd like a free audit for ${serviceName}.`;
  const whatsappUrl = `https://wa.me/8801997722621?text=${encodeURIComponent(message)}`;
  return <AuditBannerMotion serviceName={serviceName} whatsappUrl={whatsappUrl} />;
}
