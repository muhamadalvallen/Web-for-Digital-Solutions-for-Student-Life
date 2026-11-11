import Link from "next/link";

export function DashboardShortcuts() {
  const shortcuts = [
    {
      href: "/calendar",
      title: "Kelola Kalender Akademik",
      description: "Catat dan kelola jadwal kuliah, batas pengumpulan tugas, dan jadwal ujian.",
      badge: "Kalender",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },
    {
      href: "/focus",
      title: "Mulai Sesi Fokus",
      description: "Jalankan timer Pomodoro atau Deep Work untuk konsentrasi belajar tanpa distraksi.",
      badge: "Mode Fokus",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="Pintasan Cepat" className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted px-1 mb-3">
        Pintasan Utama
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent block">
                  {item.badge}
                </span>
                <h3 className="mt-0.5 text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

