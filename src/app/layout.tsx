import { cookies } from "next/headers";

import "@/styles/globals.css";
import "swiper/css";

export const metadata = {
  title: "Defishards",
  description: "Defishards NFT",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookie_theme = cookieStore.get("theme");

  let theme = "light";

  if (cookie_theme) {
    theme = cookie_theme.value;
  }

  return (
    <html lang="en">
      <body className={`font-[Poppins] ${theme}`}>{children}</body>
    </html>
  );
}
