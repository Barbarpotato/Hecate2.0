import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import { Providers } from "./provider";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hecate",
  description: "Backend API for https://barbarpotato.github.io/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/next.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className} style={{ backgroundColor: "#292b37", color: "#faf9ff" }}>
        <Providers>
          <>
            <Navigation />
            {children}
          </>
        </Providers>

      </body>
    </html>
  );
}
