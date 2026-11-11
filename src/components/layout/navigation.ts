export const navigationItems = [
  { href: "/", label: "Dashboard", description: "Ringkasan agenda" },
  { href: "/calendar", label: "Kalender", description: "Kelas, tugas, dan ujian" },
  { href: "/focus", label: "Fokus", description: "Sesi belajar" },
] as const;

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
