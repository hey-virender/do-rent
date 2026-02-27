import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Content */}
        <section className="space-y-12 leading-relaxed text-base md:text-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our platform, you agree to be bound by these
              Terms of Service. If you do not agree, you must not use the
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              2. Platform Overview
            </h2>
            <p>
              Our platform enables landlords to list properties and tenants to
              discover rental opportunities. We act solely as a technology
              provider and are not a party to rental agreements between users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information.</li>
              <li>You are responsible for maintaining account security.</li>
              <li>You must not share login credentials.</li>
              <li>We reserve the right to suspend accounts for violations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              4. Property Listings
            </h2>
            <p>
              Landlords are responsible for ensuring listing accuracy, legality,
              and compliance with local housing regulations. We do not verify
              every listing and disclaim liability for inaccuracies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              5. Payments & Transactions
            </h2>
            <p>
              If payment features are provided, transactions are processed via
              third-party payment providers. We are not responsible for
              transaction disputes between users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              6. Prohibited Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fraudulent listings or impersonation</li>
              <li>Uploading harmful or malicious content</li>
              <li>Violating local rental laws</li>
              <li>Attempting to disrupt platform services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All platform content, branding, and software are protected by
              intellectual property laws. Users retain ownership of their
              submitted content but grant us a license to display it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              We are not liable for disputes, damages, losses, or agreements
              arising between landlords and tenants. Use of the platform is at
              your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes
              shall fall under the jurisdiction of courts located in Himachal
              Pradesh.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              11. Contact Information
            </h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a
                href="mailto:your-email@example.com"
                className="text-primary underline" 
                aria-label="contact us"
              >
                bikuchauhan786@gmail.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="mt-20 border-t pt-10">
          <p className="text-sm text-muted-foreground">
            By continuing to use our services, you acknowledge that you have
            read and agree to these Terms.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            aria-label="back to home"
          >
            Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
