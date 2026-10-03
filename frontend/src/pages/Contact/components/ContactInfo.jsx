import {
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  Camera,
  Code,
  MessageCircle,
  MessageSquare,
} from "lucide-react";

import { contactChannels, contactCopy } from "../data/contactData";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";
import { useSingleton } from "../../../hooks/useContent";

/**
 * The editable document served by `GET /api/content/contact`.
 * It only ever holds static details — the enquiry form has its
 * own endpoint and its own storage, so nothing here can affect
 * how a message is submitted or saved.
 */
const contactFallback = {};

/*
  lucide-react v1 dropped brand glyphs, so each network gets a
  neutral icon that stands in for it. The card label always shows
  the real network name, so the icon only has to hint at it.
*/
const socialIcons = {
  linkedin: BriefcaseBusiness,
  x: AtSign,
  twitter: MessageCircle,
  instagram: Camera,
  facebook: MessageCircle,
  github: Code,
  default: ArrowUpRight,
};

const socialOrder = [
  "linkedin",
  "x",
  "twitter",
  "instagram",
  "facebook",
  "github",
];

const socialLink = (href) => {
  const url = href?.trim();

  if (!url) return null;

  // Bare domains are common in a CMS field, so accept them
  // rather than silently dropping the link.
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

/* `+91 (22) 1234 5678` → `tel:+912212345678` */
const telHref = (phone) => {
  const digits = phone?.replace(/[^\d+]/g, "");

  return digits && digits.length > 6 ? `tel:${digits}` : null;
};

const mapsHref = (address) => {
  if (!address?.trim()) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address.trim()
  )}`;
};

/**
 * Merge the CMS document over the hardcoded channel list.
 *
 * The hardcoded entries keep their icons and supporting notes,
 * because those are presentation rather than content. Only the
 * values an admin owns — email, phone, location, hours — are
 * replaced, and only when the CMS actually has a value. That
 * way an empty admin field falls back to something readable
 * instead of blanking the card.
 */
function buildChannels(cms) {
  const byId = Object.fromEntries(
    contactChannels.map((channel) => [channel.id, channel])
  );

  const email = cms.email?.trim() || byId.email.value;
  const phone = cms.phone?.trim() || byId.phone.value;
  const location = cms.location?.trim() || byId.location.value;
  const address = cms.address?.trim() || "";
  const hours = cms.hours?.trim() || byId.hours.detail;

  const channels = [
    {
      ...byId.email,
      value: email,
      href: `mailto:${email}`,
    },
    {
      ...byId.phone,
      value: phone,
      href: telHref(phone),
    },
    {
      ...byId.location,
      value: location,
      // Prefer the full street address once an admin fills one in.
      detail: address || byId.location.detail,
      href: mapsHref(address),
    },
    {
      ...byId.hours,
      title: cms.hoursLabel?.trim() || byId.hours.title,
      detail: hours,
    },
  ];

  // Social profiles become extra cards, ordered by the list above
  // and then alphabetically, so the admin can reorder freely
  // without the layout jumping around.
  const socials = (Array.isArray(cms.socials) ? cms.socials : [])
    .map((social) => ({
      id: `social-${social.network || social.label}`,
      icon:
        socialIcons[social.network?.toLowerCase()] || socialIcons.default,
      title: social.label || social.network || "Social",
      value: social.url?.trim() || "",
      href: socialLink(social.url),
      external: true,
      note: "Say hello on our social channels.",
    }))
    .filter((social) => social.value)
    .sort((a, b) => {
      const rank = (item) => {
        const index = socialOrder.indexOf(item.id.replace("social-", ""));

        return index === -1 ? socialOrder.length : index;
      };

      return rank(a) - rank(b) || a.title.localeCompare(b.title);
    });

  return [...channels, ...socials];
}

/**
 * Direct contact channels. A channel becomes a link only when it has an
 * `href` (placeholder values stay plain text so nobody taps a dead
 * `tel:` link before the real details are filled in).
 */
function ContactInfo() {
  const [sectionRef] = useRevealOnScroll();
  const { info } = contactCopy;

  const { data: contact } = useSingleton(
    "/api/content/contact",
    contactFallback
  );

  const channels = buildChannels(contact);

  return (
    <section
      ref={sectionRef}
      className="contact-info"
      aria-labelledby="contact-info-title"
    >
      <div className="contact-inner">
        <header className="contact-section__head" data-reveal>
          <span className="contact-eyebrow">
            <MessageSquare size={14} strokeWidth={2} aria-hidden="true" />
            {info.eyebrow}
          </span>

          <h2 className="contact-section__title" id="contact-info-title">
            {info.title}
          </h2>

          <p className="contact-section__subtitle">{info.subtitle}</p>
        </header>

        <ul className="contact-info__grid">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const Wrapper = channel.href ? "a" : "div";

            // Show the domain, not the full URL, and strip the
            // protocol so the card stays readable.
            const displayValue = channel.external
              ? channel.value
                  .replace(/^https?:\/\//i, "")
                  .replace(/\/+$/, "")
              : channel.value;

            return (
              <li
                key={channel.id}
                className="contact-info__item"
                data-reveal
                style={{ "--ct-reveal-delay": `${index * 90}ms` }}
              >
                <Wrapper
                  className="contact-info__card"
                  {...(channel.href
                    ? channel.external
                      ? {
                          href: channel.href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : { href: channel.href }
                    : {})}
                >
                  <span
                    className="contact-info__glow"
                    aria-hidden="true"
                  />

                  <span
                    className="contact-info__icon"
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={1.7} />
                  </span>

                  <span className="contact-info__label">{channel.title}</span>
                  <span className="contact-info__value">{displayValue}</span>

                  {channel.detail && (
                    <span className="contact-info__detail">
                      {channel.detail}
                    </span>
                  )}

                  <span className="contact-info__note">{channel.note}</span>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ContactInfo;