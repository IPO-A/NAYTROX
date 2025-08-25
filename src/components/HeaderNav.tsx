import logo from "@/assets/digicoin-logo.png";

const links = [
  { href: "#price", label: "السعر" },
  { href: "#news", label: "الأخبار" },
  { href: "#market", label: "السوق" },
  { href: "#mining", label: "التعدين" },
  { href: "#stats", label: "الإحصائيات" },
  { href: "#tasks", label: "المهام" },
  { href: "#achievements", label: "الإنجازات" },
  { href: "#leaderboard", label: "المتصدرون" },
  { href: "#wallet", label: "المحفظة" },
];

const HeaderNav = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img
            src={logo}
            alt="NAYTROX Logo"
            className="w-8 h-8 object-contain"
            width={32}
            height={32}
            loading="eager"
          />
          <span className="text-lg font-bold">NAYTROX</span>
        </a>

        <ul className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-2 py-1 text-sm text-foreground/90 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
