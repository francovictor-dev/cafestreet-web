import LandingLayout from "@/components/layouts/landing";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LandingLayout>{children}</LandingLayout>;
}
