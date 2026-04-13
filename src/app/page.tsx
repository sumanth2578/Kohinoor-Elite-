import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Kohinoor | Elite Living",
  description: "Experience the pinnacle of nutrition and wellness with Kohinoor Elite Living. Personalized nutrition plans and premium superfoods delivered in Hyderabad.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeContent />;
}
