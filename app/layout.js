import "./globals.css";
import Header from "./components/Header";
export const metadata = {
  title: "German army trainers",
  description: "German army trainers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
