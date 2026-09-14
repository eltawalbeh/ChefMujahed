export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F2EA] text-[#1D1714] font-sans antialiased selection:bg-[#E7D9C8] selection:text-[#1D1714]">
      {/* Header */}
      <header className="w-full border-b border-[#E7D9C8] bg-[#FFFDFC]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D1714]" />
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#5B4032]">
              Dessert & Pastry
            </span>
          </div>
          <nav className="text-xs text-[#5B4032] tracking-wider uppercase font-medium">
            <span>Jordan</span>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 my-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C9A46A] font-medium">
            Minimal Luxury
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#1D1714] font-normal leading-tight">
            Chef Mujahed
          </h1>
          <p className="text-sm md:text-base text-[#5B4032] font-light max-w-md mx-auto leading-relaxed">
            Refined artisanal creations crafted with restraint, balance, and warmth.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E7D9C8] bg-[#FFFDFC]/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B4032]">
          <p className="tracking-wider">
            &copy; {new Date().getFullYear()} Chef Mujahed. All rights reserved.
          </p>
          <p className="tracking-widest uppercase text-[10px] text-[#C9A46A]">
            Amman &bull; Jordan
          </p>
        </div>
      </footer>
    </div>
  );
}

