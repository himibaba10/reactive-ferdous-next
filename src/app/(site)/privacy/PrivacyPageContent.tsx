import CookieChoicePanel from '@/components/client/CookieChoicePanel';

const H2 = ({ children }) => (
  <h2 className='text-2xl sm:text-3xl font-bold text-white mt-14 mb-5'>
    {children}
  </h2>
);

const P = ({ children }) => (
  <p className='text-zinc-300 leading-relaxed mb-4'>{children}</p>
);

const Cookie = ({ name, what, who, how }) => (
  <li className='bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 mb-3'>
    <code className='text-secondary text-sm font-semibold'>{name}</code>
    <p className='text-zinc-400 text-sm mt-2 leading-relaxed'>
      {what} Set by {who}. Kept for {how}.
    </p>
  </li>
);

export default function Privacy() {
  return (
    <>

      <article className='section max-w-3xl mx-auto pt-16 pb-24'>
        <h1 className='text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight'>
          Privacy &amp; Cookies
        </h1>
        <p className='text-lg text-zinc-400 leading-relaxed mb-12'>
          Short version: this site collects as little as possible, and analytics
          only runs if you say yes.
        </p>

        <H2>Who we are</H2>
        <P>
          This website is operated by Ferdous Ahmed (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;). For anything in this policy, or
          to exercise any of the rights below, email{' '}
          <a
            href='mailto:contact@reactiveferdous.com'
            className='text-secondary underline underline-offset-2'
          >
            contact@reactiveferdous.com
          </a>
          .
        </P>

        <H2>What we collect</H2>
        <P>
          <strong className='text-white'>Information you give us.</strong> If you
          use the contact form, we receive the name, email address and message
          you enter. If you get in touch by WhatsApp, email or phone, we receive
          whatever you choose to send — and that is handled by those services as
          well as by us.
        </P>
        <P>
          <strong className='text-white'>
            Analytics, only with your consent.
          </strong>{' '}
          If you accept analytics cookies, Google Analytics records things like
          the pages you view, roughly where you are (derived from your IP
          address), your browser and device type, and how you arrived here. We
          use it to understand which pages and services people actually find
          useful. We do not use it to identify you, and we run no advertising or
          profiling.
        </P>
        <P>
          <strong className='text-white'>What we do not collect.</strong> No
          accounts, no passwords, no payment details, and no special-category
          data.
        </P>

        <H2>Cookies and local storage</H2>
        <P>
          We set no cookie at all until you accept. If you decline, none is set.
        </P>
        <ul className='list-none p-0 my-6'>
          <Cookie
            name='_ga'
            what='Recognises returning visitors and distinguishes them from one another.'
            who='Google Analytics'
            how='up to 2 years'
          />
          <Cookie
            name='_ga_&lt;container-id&gt;'
            what='Keeps session state for analytics.'
            who='Google Analytics'
            how='up to 2 years'
          />
          <Cookie
            name='cookieConsent (local storage, not a cookie)'
            what='Remembers the choice you made here.'
            who='this site'
            how='until you clear it'
          />
          <Cookie
            name='hasSeenAuditPopup (local storage, not a cookie)'
            what='Stops the same promotional message being shown twice.'
            who='this site'
            how='until you clear it'
          />
        </ul>

        <H2>Why we are allowed to use it</H2>
        <P>
          <strong className='text-white'>Contact enquiries:</strong> our
          legitimate interest in answering you, and where relevant taking steps
          towards a contract with you.
        </P>
        <P>
          <strong className='text-white'>Analytics:</strong> your consent. You
          can withdraw it at any time, and nothing is measured if you do.
        </P>

        <H2>Who processes it</H2>
        <P>
          We do not sell your data. It is handled by the providers that run parts
          of this site, each of which sees your IP address when your browser
          contacts them:
        </P>
        <ul className='list-disc pl-6 text-zinc-300 leading-relaxed space-y-2 mb-4'>
          <li>
            <strong className='text-white'>Google Analytics</strong> (Google LLC)
            — analytics, only after you accept.
          </li>
          <li>
            <strong className='text-white'>Formspree</strong> — delivers contact
            form submissions to our inbox.
          </li>
          <li>
            <strong className='text-white'>Resend</strong> — may send you a
            confirmation email after you submit the contact form.
          </li>
          <li>
            <strong className='text-white'>Google Firebase</strong> — stores the
            project and review content this site displays.
          </li>
          <li>
            <strong className='text-white'>Cloudinary</strong> — delivers images.
          </li>
          <li>
            <strong className='text-white'>Netlify</strong> — serves the site.
          </li>
          <li>
            <strong className='text-white'>WhatsApp (Meta)</strong> — only if you
            choose to message us there.
          </li>
        </ul>

        <H2>International transfers</H2>
        <P>
          Some of those providers are based in the United States, so your data
          may be transferred outside your country. They rely on approved
          safeguards such as the Standard Contractual Clauses or the EU&ndash;US
          Data Privacy Framework.
        </P>

        <H2>How long we keep it</H2>
        <ul className='list-disc pl-6 text-zinc-300 leading-relaxed space-y-2 mb-4'>
          <li>
            <strong className='text-white'>Contact enquiries</strong> — as long as
            needed to deal with your enquiry and any follow-up work, and then up
            to 24 months.
          </li>
          <li>
            <strong className='text-white'>Analytics</strong> — up to 14 months,
            in line with our Google Analytics retention setting.
          </li>
          <li>
            <strong className='text-white'>Your cookie choice</strong> — until you
            clear your browser storage.
          </li>
        </ul>

        <H2>Your rights</H2>
        <P>Depending on where you live, you may have the right to:</P>
        <ul className='list-disc pl-6 text-zinc-300 leading-relaxed space-y-2 mb-4'>
          <li>ask for a copy of the personal data we hold about you;</li>
          <li>have it corrected or deleted;</li>
          <li>restrict or object to how we use it;</li>
          <li>receive it in a portable format;</li>
          <li>withdraw your consent to analytics at any time.</li>
        </ul>
        <P>
          To exercise any of these, email{' '}
          <a
            href='mailto:contact@reactiveferdous.com'
            className='text-secondary underline underline-offset-2'
          >
            contact@reactiveferdous.com
          </a>
          . If you are in the UK or the EEA, you also have the right to complain
          to your local data protection authority.
        </P>

        <H2>Children</H2>
        <P>
          This site is aimed at businesses and is not directed at children.
        </P>

        <H2>Changes</H2>
        <P>
          If this policy changes, we will update the date below. Last updated:{' '}
          <strong className='text-white'>September 2026</strong>.
        </P>

        <H2>Your cookie choice</H2>
        <CookieChoicePanel />
      </article>
    </>
  );
}
