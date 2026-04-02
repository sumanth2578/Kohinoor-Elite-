import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Kohinoor Elite Living",
  description: "Refund and cancellation policy for Kohinoor Elite Living products.",
};

export default function RefundCancellationPage() {
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
        
        <h1 className="legal-title serif">Refund & Cancellation Policy</h1>
        <p className="legal-subtitle">Shri Lakshmi Kohinoor Enterprises Private Limited</p>
        <span className="legal-date">Last Updated: November 20, 2025</span>

        <div className="legal-content">
          <p>
            At Kohinoor Elite Living, we take pride in delivering premium quality dry fruits, nuts, and fresh produce. Due to the perishable nature of our products, we have a specific policy regarding refunds and cancellations.
          </p>

          <h3>1. Cancellation Policy</h3>
          <ul>
            <li><strong>Before Shipment:</strong> You may cancel your order within 2 hours of placing it, or before the order has been dispatched/shipped, whichever is earlier.</li>
            <li><strong>After Shipment:</strong> Once the order has been dispatched from our warehouse, it cannot be cancelled.</li>
          </ul>

          <h3>2. Return Policy</h3>
          <h4>• Perishable Goods (Fresh Fruits)</h4>
          <p>
            Due to health and hygiene reasons, we do not accept returns on fresh fruits unless the product was delivered in a damaged or spoiled condition.
          </p>

          <h4>• Non-Perishable Goods (Dry Fruits/Nuts)</h4>
          <p>We do not accept returns for change of mind. Returns are only accepted if:</p>
          <ul>
            <li>The package is physically damaged upon delivery.</li>
            <li>The product received is incorrect (wrong item delivered).</li>
            <li>The product is expired or spoiled upon opening.</li>
          </ul>

          <h3>3. Refund Process</h3>
          <p>
            If you receive a damaged or incorrect item, please notify us within 24 hours of delivery by emailing <a href="mailto:service@kohinoorelite.com" style={{ textDecoration: 'underline' }}>service@kohinoorelite.com</a>, or by Calling / WhatsApp at <strong>81793 37052</strong> with photos of the damaged product.
          </p>
          <p>
            Upon verification, we will initiate a refund or a replacement.
          </p>
          <p>
            <strong>Refund Timeline:</strong> Approved refunds will be processed within 5–7 working days. The amount will be credited back to your original method of payment (Credit Card / Debit Card / UPI / Bank Account).
          </p>
        </div>
      </div>
    </main>
  );
}
