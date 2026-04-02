import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Kohinoor Elite Living",
  description: "Shipping and delivery policies for Kohinoor Elite Living products.",
};

export default function ShippingDeliveryPage() {
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
        
        <h1 className="legal-title serif">Shipping & Delivery Policy</h1>
        <p className="legal-subtitle">Shri Lakshmi Kohinoor Enterprises Private Limited</p>
        <span className="legal-date">Last Updated: November 20, 2025</span>

        <div className="legal-content">
          <h3>1. Shipping Locations</h3>
          <p>
            Shri Lakshmi Kohinoor Enterprises Private Limited currently ships exclusively to addresses within Hyderabad, Telangana. We utilize reliable local delivery partners to ensure your products reach you safely and freshly.
          </p>

          <h3>2. Processing Time</h3>
          <ul>
            <li>Orders are typically processed within 1–2 business days (excluding Sundays and Public Holidays).</li>
            <li>Orders for fresh fruits may have specific dispatch schedules to ensure freshness.</li>
          </ul>

          <h3>3. Delivery Timeline</h3>
          <p>
            <strong>Standard Delivery:</strong> Delivered within 1–2 working days across Hyderabad.
          </p>

          <h3>4. Shipping Charges</h3>
          <ul>
            <li>Shipping charges are calculated based on the weight of the order and the delivery location within Hyderabad.</li>
            <li>The final shipping cost will be displayed at the checkout page before you proceed to payment.</li>
          </ul>

          <h3>5. Tracking</h3>
          <p>
            Once your order is dispatched, you will receive a tracking number via email/SMS to track the status of your shipment.
          </p>

          <h3>6. Contact Us</h3>
          <p>If you have any issues with your delivery, please contact our logistics support at:</p>
          <p>Email: <a href="mailto:service@kohinoorelite.com" style={{ textDecoration: 'underline' }}>service@kohinoorelite.com</a></p>
          <p>Phone: <strong>81793 37052</strong></p>
        </div>
      </div>
    </main>
  );
}
