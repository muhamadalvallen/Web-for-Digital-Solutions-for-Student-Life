import Link from "next/link";
import { AppNav } from "./app-nav";
import { NotificationReminderWatcher } from "@/components/notifications/notification-reminder-watcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 bg-background text-foreground">
      <AppNav />
      <NotificationReminderWatcher />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-border bg-surface px-4 md:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-lg"
              role="img"
              aria-label="Logo Stududu"
            >
              📚
            </span>
            <span className="text-base font-bold text-foreground">Stududu</span>
          </Link>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-24 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
