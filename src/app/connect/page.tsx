import { Metadata } from "next";
import ConnectContent from "@/components/ConnectContent";

export const metadata: Metadata = {
  title: "Connect | Kohinoor Elite Living",
  description: "Get in touch with Kohinoor Elite Living for personalized nutrition plans and premium superfoods.",
  alternates: {
    canonical: "/connect",
  },
};

export default function ConnectPage() {
  return <ConnectContent />;
}
