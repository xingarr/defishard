import { cookies } from "next/headers";

import "../assets/styles/index.css";
import "swiper/css";

export const metadata = {
  title: "Defishards",
  description: "Defishards NFT",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}) {
  const cookieStore = cookies();
  const cookie_theme = cookieStore.get("theme");

  let theme = "light";

  if (cookie_theme) {
    theme = cookie_theme.value;
  }

  return (
    <html lang="en">
      <title>Defishard</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#03a9f4" />
      <meta name="title" content="Defishard" />
      <meta
        name="description"
        content="The first NFT Vault in NEAR Blockchain"
      />

      <meta
        name="description"
        content="The first NFT Vault in NEAR Blockchain"
      />
      <meta name="keywords" content="defishard, near, defi" />

      <meta name="twitter:title" content="Defishard" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Defishard" />
      <meta property="og:site_name" content="Defishard" />
      <meta property="og:description" content="Defishard" />
      <meta property="og:image" content="https://i.ibb.co/m5Hwn0G/logo.jpg" />
      <body className={`font-[Poppins] ${theme}`}>{children}</body>
    </html>
  );
}
