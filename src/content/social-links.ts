import { profile } from "./profile";
import type { SocialLink } from "./types";

/** Profiles shown in About and Contact; the e-mail entry opens the mail client. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    network: "github",
    url: "https://github.com/naiandersonb",
    icon: "github",
    label: { "pt-BR": "GitHub: naiandersonb", en: "GitHub: naiandersonb" },
  },
  {
    network: "linkedin",
    url: "https://www.linkedin.com/in/naianderson-bruno",
    icon: "linkedin",
    label: { "pt-BR": "LinkedIn: naianderson-bruno", en: "LinkedIn: naianderson-bruno" },
  },
  {
    network: "email",
    url: `mailto:${profile.email}`,
    icon: "mail",
    label: { "pt-BR": `E-mail: ${profile.email}`, en: `Email: ${profile.email}` },
  },
];
