import LeadBannerMotion from '@/components/client/LeadBannerMotion';

type LeadBannerProps = {
  text: string;
  buttonText: string;
  message: string;
};

export default function LeadBanner({ text, buttonText, message }: LeadBannerProps) {
  const whatsappUrl = `https://wa.me/8801997722621?text=${encodeURIComponent(message)}`;
  return <LeadBannerMotion text={text} buttonText={buttonText} whatsappUrl={whatsappUrl} />;
}
