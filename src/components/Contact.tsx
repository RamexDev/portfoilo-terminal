import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SvgIcon } from './ui/SvgIcon';
import { socials } from '../data/socials';
import { contactInfo } from '../data/contactInfo';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardReveal = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 70%)' }} />
      </div>

      <Container>
        <Reveal className="text-center mb-14">
          <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="text-accent-dim">$</span> ping ramex
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            <span className="text-text-dim">## </span>Let&apos;s work{' '}
            <span className="text-shimmer">together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            <span className="text-accent-dim">// </span>
            Always open to new opportunities, interesting projects, and connecting with fellow developers.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Social links */}
          <div>
            <Reveal>
              <p className="mb-4 font-mono text-[10px] tracking-widest text-text-muted uppercase">
                <span className="text-accent-dim">$</span> cat socials.txt
              </p>
            </Reveal>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  variants={cardReveal}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-card-hover spotlight-card group flex items-center gap-3 px-4 py-3.5 transition-all duration-300"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/25 bg-accent/5 text-accent group-hover:border-accent/50 group-hover:shadow-glow-sm transition-all">
                    <SvgIcon name={social.iconName} size={15} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary">{social.label}</p>
                    <p className="truncate font-mono text-[10px] text-text-muted">
                      {social.url.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                  <SvgIcon name="externalLink" size={11} className="text-text-muted group-hover:text-accent transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Contact info */}
          <div>
            <Reveal>
              <p className="mb-4 font-mono text-[10px] tracking-widest text-text-muted uppercase">
                <span className="text-accent-dim">$</span> cat contact.info
              </p>
            </Reveal>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {[
                { icon: 'mail' as const,   label: 'email',    value: contactInfo.email,   href: `mailto:${contactInfo.email}` },
                { icon: 'phone' as const,  label: 'phone',    value: contactInfo.phone,   href: `tel:${contactInfo.phone}` },
                { icon: 'mapPin' as const, label: 'location', value: contactInfo.address, href: undefined },
              ].map((item) => (
                <motion.div key={item.label} variants={cardReveal}>
                  <div className="glass-card glass-card-hover spotlight-card group flex items-center gap-3 px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/25 bg-accent/5 text-accent group-hover:border-accent/50 group-hover:shadow-glow-sm transition-all">
                      <SvgIcon name={item.icon} size={15} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-bold text-text-primary transition-colors hover:text-accent">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-text-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Availability callout */}
              <motion.div variants={cardReveal}>
                <div className="mt-2 border border-accent/25 bg-accent/5 px-4 py-4 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow shrink-0" />
                  <p className="font-mono text-xs text-accent">
                    <span className="text-accent-dim">[OK] </span>
                    Currently available for freelance &amp; full-time roles
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
