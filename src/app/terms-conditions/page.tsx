import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kohinoor Elite Living",
  description: "Terms and conditions of use for Kohinoor Elite Living.",
};

export default function TermsConditionsPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <Link href="/" className="legal-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
        
        <h1 className="legal-title serif">Terms & Conditions</h1>
        <p className="legal-subtitle">Shri Lakshmi Kohinoor Enterprises Private Limited</p>
        <span className="legal-date">Last Updated: November 20, 2025</span>

        <div className="legal-content">
          <h2>Welcome to Kohinoor Elite Living</h2>
          <p>
            These Terms and Conditions outline the rules and regulations for the use of Shri Lakshmi Kohinoor Enterprises Private Limited’s website, located at <a href="https://kohinooreliteliving.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>https://kohinooreliteliving.com</a>.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Kohinoor Elite Living if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h3>1. Terminology</h3>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person logged on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company, Shri Lakshmi Kohinoor Enterprises Private Limited.
          </p>

          <h3>2. Product Information</h3>
          <p>
            We strive to ensure that the details of our products (Dry Fruits, Nuts, Fresh Fruits, and Nutrition Plans) are accurate. However, given the natural origin of our products, slight variations in color, size, or texture may occur.
          </p>

          <h3>3. Ordering & Payment</h3>
          <ul>
            <li>All orders are subject to acceptance and availability.</li>
            <li>Prices for our products are subject to change without notice.</li>
            <li>We reserve the right to refuse any order you place with us.</li>
          </ul>

          <h3>4. Limitation of Liability</h3>
          <p>
            Shri Lakshmi Kohinoor Enterprises Private Limited shall not be held liable for any indirect, special, or consequential damages arising out of the use of this site or the purchase of products.
          </p>

          <h3>5. Governing Law</h3>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>

          <h3>6. Contact Information</h3>
          <p><strong>Shri Lakshmi Kohinoor Enterprises Private Limited</strong></p>
          <p>Address: G1, Crystal Classic Apts, Veera Reddy Nagar, I.E. Nacharam, Hyderabad, Telangana, 500076</p>
          <p>Email: <a href="mailto:service@kohinoorelite.com" style={{ textDecoration: 'underline' }}>service@kohinoorelite.com</a></p>
        </div>
      </div>
    </main>
  );
}
