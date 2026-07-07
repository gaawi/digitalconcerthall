export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-ink-950/60">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-serif text-gold-400">CreArtBox</p>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">
              Exceptional classical and new music, presented with a crafted
              visual aesthetic. Long Island City, New York.
            </p>
          </div>
          <div className="text-sm text-neutral-500">
            <p>525 46th Avenue, Long Island City</p>
            <p className="mt-1">
              Supported by the New York State Council on the Arts
            </p>
          </div>
        </div>
        <p className="mt-8 text-xs text-neutral-600">
          © {new Date().getFullYear()} CreArtBox. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
