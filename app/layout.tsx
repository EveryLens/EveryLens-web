import "./globals.css";

export const metadata = {
  title: "EveryLens",
  description: "Post on lens anonymously",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
