import { Inter } from "next/font/google";
import "./globals.css";
import { RootStyleRegistry } from "@/components/RootStyleRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Khuong Duy's Todo List App",
  description:
    "This is a simple Todo List application built using Next.js, Ant Design, and SCSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
