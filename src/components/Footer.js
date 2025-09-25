export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        
        {/* Email Section */}
        <div>
          <h2 className="text-lg font-semibold text-amber-200 mb-2">Contact Us</h2>
          <a 
            href="mailto:support@gameoflaw.com" 
            className="block text-amber-100 hover:text-amber-300 transition-colors"
          >
            support@gameoflaw.com
          </a>
        </div>

        {/* Center Logo */}
        <div className="hidden md:flex flex-col items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">GL</span>
          </div>
          <p className="mt-1 text-sm text-amber-200 font-medium">Game of Law</p>
        </div>

       {/* Feedback Section */}
        <div className="text-right">
          <h2 className="text-lg font-semibold text-amber-200 mb-2">Feedback</h2>
          <a 
            href="/feedback" 
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Send Feedback
          </a>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-amber-800 mt-6 pt-4 text-center text-amber-200/80 text-sm">
        © {new Date().getFullYear()} Game of Law. All rights reserved.
      </div>
    </footer>
  );
}
