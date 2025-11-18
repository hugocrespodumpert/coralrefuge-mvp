import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coral Refuge - Protect Coral Refugia in Egypt',
  description: 'Sponsor marine protected areas in Egypt\'s Red Sea and receive a verified certificate of your conservation impact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center">
                <span className="text-2xl font-bold text-cyan-700">🪸</span>
                <span className="ml-2 text-xl font-bold text-cyan-900">
                  Coral Refuge
                </span>
              </a>

              <div className="flex items-center gap-6">
                <a
                  href="/sponsor"
                  className="text-gray-700 hover:text-cyan-700 font-medium transition-colors"
                >
                  Sponsor
                </a>
                <a
                  href="/dashboard"
                  className="text-gray-700 hover:text-cyan-700 font-medium transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="/sponsor"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-semibold"
                >
                  Protect Now
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl">🪸</span>
                  <span className="ml-2 text-xl font-bold">Coral Refuge</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Protecting the last coral refugia in warming oceans through direct
                  sponsorship and active conservation.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-4">Conservation</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="/sponsor" className="hover:text-white transition-colors">
                      Sponsor Areas
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="hover:text-white transition-colors">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Impact Reports
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">About</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Our Mission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Partner: HEPCA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Science
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>support@coralrefuge.org</li>
                  <li>Red Sea, Egypt</li>
                  <li className="pt-4">
                    <a href="#" className="hover:text-white transition-colors">
                      Twitter
                    </a>{' '}
                    /{' '}
                    <a href="#" className="hover:text-white transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>© 2024 Coral Refuge. All rights reserved.</p>
              <p className="mt-2">
                Managed in partnership with HEPCA (Hurghada Environmental Protection and
                Conservation Association)
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
