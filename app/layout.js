import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/cartContext";
export const metadata = {
  title: "German army trainers",
  description: "German army trainers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <CartProvider>
        <Header/>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
