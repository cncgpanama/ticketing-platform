import { Linkedin, Github, Slack, Globe, Youtube, Instagram } from "lucide-react"

const SOCIAL_LINKS = [
  { label: "CNCG Panama", href: "https://community.cncf.io/cloud-native-panama", icon: Globe },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cncg-panama", icon: Linkedin },
  { label: "Youtube", href: "https://www.youtube.com/@cncfpan", icon: Youtube },
  { label: "GitHub", href: "https://github.com/cncgpananma", icon: Github },
  { label: "Instagram", href: "https://instagram.com/cncgpan", icon: Instagram },
  { label: "Slack", href: "https://communityinviter.com/apps/cloud-native/cncf", icon: Slack },
]

type FooterDictionary = {
  communityText: string;
  links: Array<{ label: string; href: string }>;
  rightsReserved: string;
};

export function Footer({ dictionary }: { dictionary: FooterDictionary }) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 lg:flex-row lg:justify-between lg:px-8">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-sm font-bold text-foreground">CNCG Panama </span>
          </div>
          <p className="text-sm text-muted-foreground text-center lg:text-left max-w-xs">
            {dictionary.communityText}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {dictionary.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="rounded-full bg-background p-2 text-muted-foreground shadow-sm ring-1 ring-border transition-all hover:bg-primary hover:text-primary-foreground hover:ring-primary"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kubernetes Community Days Panama.{" "}
          {dictionary.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
