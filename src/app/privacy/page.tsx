import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Emergence Digital collects, uses and shares personal information on this website, including cookies, Google Analytics and the Meta Pixel.",
  path: "/privacy",
});

/*
 * What this page describes, and where it lives in the code. Keep them in step: a new form field, cookie, tracker or
 * embed means a change here.
 *   Lead forms ............ src/lib/lead-forms.ts, src/app/api/lead/route.ts (to GHL)
 *   EmailJS copy .......... src/lib/email-copy.ts (forms with emailCopy: the Contact page)
 *   ed_attribution ........ src/lib/attribution.ts
 *   Google Analytics ...... src/components/layout/GoogleAnalytics.tsx
 *   Meta Pixel + CAPI ..... SETUP.md, "Meta Pixel and Conversions API"
 *   Embeds ................ src/components/sections/CalendarEmbed.tsx (GHL), src/components/ui/VimeoEmbed.tsx
 *
 * TODO(Shane): every <ToConfirm> below shows on the page as a highlighted note. Replace each with the confirmed
 * wording (or delete it) before this goes live, and update LAST_UPDATED.
 */

const LAST_UPDATED = "11 November 2026";
const EMAIL = "contact@emergencedigital.com.au";

/** A point that needs Shane's legal or business confirmation. Shown on the page so it can't slip through. */
function ToConfirm({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-amber-100 text-amber-950 border border-amber-300 rounded px-1.5 py-0.5 text-[0.9em] [box-decoration-break:clone]">
      <strong className="font-semibold">To confirm:</strong> {children}
    </mark>
  );
}

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect" },
  { id: "how-we-use-it", title: "How we use it" },
  { id: "who-we-share-it-with", title: "Who we share it with" },
  { id: "cookies", title: "Cookies and tracking" },
  { id: "overseas", title: "Information stored overseas" },
  { id: "security-and-retention", title: "Keeping it safe, and for how long" },
  { id: "access-and-correction", title: "Seeing and correcting your information" },
  { id: "complaints", title: "Complaints" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

interface Provider {
  name: string;
  role: string;
  receives: string;
  policy: string;
}

const providers: Provider[] = [
  {
    name: "HighLevel (also called GoHighLevel or LeadConnector)",
    role: "Our CRM. It stores enquiries and bookings, runs our booking calendar and sends our follow-up emails and messages.",
    receives:
      "Everything you enter in our forms and booking calendar, plus how you first found our site (see the ed_attribution cookie below) and the page you sent the form from.",
    policy: "https://www.gohighlevel.com/privacy-policy",
  },
  {
    name: "EmailJS",
    role: "Emails us a copy of each Contact page enquiry, so none is missed.",
    receives: "Your name, email, phone number, company and message from the Contact page form.",
    policy: "https://www.emailjs.com/legal/privacy-policy/",
  },
  {
    name: "Google (Google Analytics)",
    role: "Shows us how many people visit, which pages they read and which marketing brought them.",
    receives:
      "The pages you visit, your device and browser, your approximate location, the site that referred you, and that a form was sent (not what was in it).",
    policy: "https://policies.google.com/privacy",
  },
  {
    name: "Meta (Facebook and Instagram)",
    role: "Measures our ads on Facebook and Instagram and helps decide who sees them.",
    receives:
      "From the Meta Pixel in your browser: the pages you visit and actions such as sending a form or booking a call, with your IP address, browser details and Meta's cookie IDs. From our server when you send a form: your email, phone number, first and last name and our CRM's ID for you, each scrambled with a one-way hash (SHA-256) first, plus your IP address, browser details, Meta's cookie IDs and the page you were on.",
    policy: "https://www.facebook.com/privacy/policy/",
  },
  {
    name: "Vimeo",
    role: "Hosts the videos on our site.",
    receives: "When a video loads: your IP address and browser details, and how you watch the video.",
    policy: "https://vimeo.com/legal/privacy/policy",
  },
  {
    name: "Vercel",
    role: "Hosts this website.",
    receives:
      "Like any web host, technical details of each visit, such as your IP address, browser and the address of each page, in its server logs.",
    policy: "https://vercel.com/legal/privacy-notice",
  },
];

interface Cookie {
  name: string;
  setBy: string;
  purpose: string;
  lasts: string;
}

const cookies: Cookie[] = [
  {
    name: "ed_attribution",
    setBy: "Us (Emergence Digital)",
    purpose:
      "Remembers how you first reached our site: campaign tags in the link (UTMs), Google and Meta ad click IDs, the site that referred you and the first page you landed on. If you send us a form, these go with it to our CRM, so we can see which marketing works.",
    lasts: "30 days",
  },
  {
    name: "_ga, _ga_<ID>",
    setBy: "Google Analytics",
    purpose: "Tells one visitor's visits apart from another's, so visits and visitors can be counted.",
    lasts: "Up to 2 years",
  },
  {
    name: "_fbp",
    setBy: "Meta Pixel",
    purpose: "Identifies your browser to Meta, so it can measure our ads and decide who sees them.",
    lasts: "90 days",
  },
  {
    name: "_fbc",
    setBy: "Meta Pixel",
    purpose: "Stores Meta's click ID when you arrive from a link on Facebook or Instagram, such as one of our ads.",
    lasts: "90 days",
  },
  {
    name: "Vimeo and HighLevel cookies",
    setBy: "Vimeo, HighLevel",
    purpose: "Set by the embedded video player and booking calendar for their own use, under their own policies.",
    lasts: "Set by each provider",
  },
];

const linkClass = "text-mid-green underline underline-offset-2 hover:text-dark-green transition-colors duration-200";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const title = sections.find((s) => s.id === id)?.title;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28 pt-12 first:pt-0">
      <h2 id={`${id}-heading`} className="font-serif text-3xl font-bold text-dark-green mb-5">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-xl font-bold text-dark-green pt-2">{children}</h3>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 marker:text-mid-green">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Privacy</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green mt-2 mb-6">Privacy Policy</h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed">
            What personal information this website collects, what we do with it, who else receives it and how to
            reach us about it.
          </p>
          <p className="text-sm text-muted mt-6">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-cream pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          {/* Contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 bg-white rounded-2xl shadow-sm p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">On this page</p>
            <ol className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-dark-green/80 hover:text-mid-green transition-colors duration-200">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-body leading-relaxed max-w-[820px]">
            <Section id="who-we-are">
              <p>
                Emergence Digital (<ToConfirm>the legal entity name and ABN</ToConfirm>) is a marketing agency based in
                Melbourne, Australia. In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean
                Emergence Digital, and &ldquo;the site&rdquo; means emergencedigital.com.au.
              </p>
              <p>
                We handle personal information in line with the <em>Privacy Act 1988</em> (Cth) and the Australian
                Privacy Principles. This policy covers the site. If we work together, your contract may say more about
                how we handle information for that work.
              </p>
            </Section>

            <Section id="what-we-collect">
              <SubHeading>What you give us</SubHeading>
              <p>When you send one of our forms or book a call, we collect:</p>
              <Bullets
                items={[
                  "your first name and email address (always), and your last name, phone number and company if you give them",
                  "your message, and your answers to any other questions on the form",
                  "the time you book, and anything you add in the booking calendar",
                ]}
              />
              <p>
                We also keep what you tell us when you email, call or meet with us. You can browse the site without
                telling us who you are, but we need at least your name and email address to reply to an enquiry.
              </p>

              <SubHeading>How you found us</SubHeading>
              <p>
                The first time you visit, the site saves a small file in your browser (the{" "}
                <code className="text-[0.9em]">ed_attribution</code> cookie) recording how you arrived: any campaign
                tags in the link, an ad click ID from Google or Meta, the site that referred you and the first page you
                landed on. If you later send a form, these details go with it, along with the page you sent it from.
              </p>

              <SubHeading>How you use the site</SubHeading>
              <p>
                Google Analytics and the Meta Pixel record the pages you visit, your device and browser, your IP address
                or approximate location, and actions such as sending a form or booking a call. Our host keeps technical
                logs of each visit. The Cookies and tracking section below has the details.
              </p>

              <p>
                We don&apos;t ask for sensitive information, such as health details or political views. Please
                don&apos;t include it in a message.
              </p>
            </Section>

            <Section id="how-we-use-it">
              <p>We use personal information to:</p>
              <Bullets
                items={[
                  "reply to your enquiry, and arrange and hold any call you book",
                  "follow up by email, phone or text message about what you asked us",
                  "work out which of our marketing brings people to the site, and improve the site",
                  "measure our ads on Facebook and Instagram, and show them to people more likely to be interested",
                  <>
                    send you occasional emails about our services and events, which you can unsubscribe from at any
                    time. <ToConfirm>whether people who send a form or book a call get marketing emails or messages, and if
                    so which ones</ToConfirm>
                  </>,
                ]}
              />
              <p>
                If we send you marketing emails or text messages, each one tells you how to unsubscribe. We don&apos;t
                sell personal information.
              </p>
            </Section>

            <Section id="who-we-share-it-with">
              <p>
                We use the service providers below to run the site and our sales process. Each receives only what it
                needs for its job. Meta and Google also use what they receive under their own privacy policies.
              </p>
              <ul className="divide-y divide-dark-green/10 border-y border-dark-green/10">
                {providers.map((p) => (
                  <li key={p.name} className="py-5">
                    <p className="font-semibold text-dark-green">{p.name}</p>
                    <p className="mt-1">{p.role}</p>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-body">Receives:</span> {p.receives}
                    </p>
                    <p className="mt-2 text-sm">
                      <ExternalLink href={p.policy}>Privacy policy</ExternalLink>
                    </p>
                  </li>
                ))}
              </ul>
              <p>
                <strong className="font-semibold text-dark-green">About the details we send Meta.</strong> Hashing turns
                your email, phone number and name into a code that can&apos;t be read back, but Meta can match it to the
                same details on a Facebook or Instagram account. That&apos;s how it tells us which ads led to
                enquiries, without us sending your details in readable form.
              </p>
              <p>
                We may also share personal information with our professional advisers, or when the law requires or
                allows it.
              </p>
            </Section>

            <Section id="cookies">
              <p>
                Cookies are small files a website saves in your browser. The site and the services on it set these:
              </p>
              <ul className="divide-y divide-dark-green/10 border-y border-dark-green/10">
                {cookies.map((c) => (
                  <li key={c.name} className="py-5 grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-x-6 gap-y-1">
                    <div>
                      <p className="font-semibold text-dark-green break-words">
                        <code className="text-[0.95em]">{c.name}</code>
                      </p>
                      <p className="text-sm text-muted">{c.setBy}</p>
                      <p className="text-sm text-muted">{c.lasts}</p>
                    </div>
                    <p>{c.purpose}</p>
                  </li>
                ))}
              </ul>

              <SubHeading>Meta and other advertisers</SubHeading>
              <p>
                Meta and other third parties may use cookies, web beacons and similar technologies to collect or receive
                information from this site and elsewhere on the internet, and use it to measure ads and decide which
                ads people see.
              </p>

              <SubHeading>Your choices</SubHeading>
              <Bullets
                items={[
                  "Your browser's settings let you block or delete cookies, or browse privately. The site still works without them.",
                  <>
                    Google&apos;s{" "}
                    <ExternalLink href="https://tools.google.com/dlpage/gaoptout">opt-out browser add-on</ExternalLink>{" "}
                    stops Google Analytics recording your visits.
                  </>,
                  <>
                    On Facebook or Instagram, go to Accounts Centre, then <em>Your information and permissions</em>, then{" "}
                    <em>Your activity off Meta technologies</em>, to see and disconnect what businesses like us have
                    shared with Meta, including the server-side details above. <em>Ad preferences</em> in Accounts
                    Centre control the ads you see.
                  </>,
                  <>
                    To opt out of interest-based ads from many advertising companies at once, use{" "}
                    <ExternalLink href="https://youronlinechoices.com.au/">Your Online Choices</ExternalLink> (Australia)
                    or the <ExternalLink href="https://optout.aboutads.info/">Digital Advertising Alliance</ExternalLink>{" "}
                    (United States).
                  </>,
                ]}
              />
              <p>
                Blocking cookies or using an ad blocker limits what the Meta Pixel can record in your browser, but if
                you send a form, our server still sends Meta the hashed details described above. The Meta setting above
                covers those too.
              </p>
            </Section>

            <Section id="overseas">
              <p>
                Most of the providers above are based outside Australia, so your information is likely to be stored or
                processed overseas, mainly in the United States.{" "}
                <ToConfirm>
                  the countries each provider stores data in (HighLevel, EmailJS, Google, Meta, Vimeo, Vercel), and the
                  wording of this section, including what steps we take to make sure overseas providers protect it
                </ToConfirm>
              </p>
            </Section>

            <Section id="security-and-retention">
              <p>
                We take reasonable steps to protect personal information from misuse, loss and unauthorised access. The
                site is served over an encrypted connection, and access to enquiries in our CRM is limited to the
                people who need it.
              </p>
              <p>
                If a data breach is likely to cause you serious harm, we&apos;ll tell you and the Office of the
                Australian Information Commissioner, as the law requires.
              </p>
              <p>
                We keep personal information only for as long as we need it for the reasons above or the law requires,
                then delete it or remove what identifies you.{" "}
                <ToConfirm>
                  how long we keep enquiries and contacts in the CRM, client records, and Google Analytics data (its
                  retention setting is 2 or 14 months)
                </ToConfirm>
              </p>
            </Section>

            <Section id="access-and-correction">
              <p>
                You can ask for a copy of the personal information we hold about you, or ask us to correct it. Email{" "}
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>
                . We&apos;ll confirm who you are before we share anything and reply within 30 days. There&apos;s no
                charge to ask.
              </p>
              <p>
                If we can&apos;t give you access or make a correction, we&apos;ll explain why in writing and tell you
                how to complain. You can also ask us to delete your details, and we will unless the law requires us to
                keep them.
              </p>
            </Section>

            <Section id="complaints">
              <p>
                If you think we&apos;ve mishandled your personal information, email us at{" "}
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>{" "}
                with what happened. We&apos;ll look into it and reply within 30 days.
              </p>
              <p>
                If you&apos;re not happy with our response, you can complain to the Office of the Australian Information
                Commissioner (OAIC) at <ExternalLink href="https://www.oaic.gov.au/">oaic.gov.au</ExternalLink> or on
                1300 363 992.
              </p>
            </Section>

            <Section id="changes">
              <p>
                We&apos;ll update this policy when what the site collects or who we share it with changes. The date at
                the top shows when it last changed.
              </p>
            </Section>

            <Section id="contact">
              <p>For anything about your privacy or this policy:</p>
              <address className="not-italic">
                Emergence Digital
                <br />
                Suite 4, 184 Main Street
                <br />
                Lilydale, VIC Australia
                <br />
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>
              </address>
              <p>
                Or use our <Link href="/contact" className={linkClass}>contact form</Link>.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
