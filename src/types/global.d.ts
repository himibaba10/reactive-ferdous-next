export {};

declare global {
  interface Window {
    __loadAnalytics?: () => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
