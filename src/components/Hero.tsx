import { Button } from './Button';
import { Github, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-grid-pattern [background-size:24px_24px]">
      <div className="absolute inset-0 bg-gradient-to-b from-ayu-bg/80 via-ayu-bg/50 to-ayu-bg/80 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-ayu-fg mb-8 leading-[1.1]"
          >
            {t('hero.title')} <br className="hidden md:block"/>
            <span className="text-ayu-accent relative inline-block">
              {t('hero.titleHighlight')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-ayu-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-ayu-fg/60 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
