import "./globals.css";
import { LocationProvider } from "@/contexts/location"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <LocationProvider>
          {children}
        </LocationProvider>
      </body>
    </html>
  );
}
