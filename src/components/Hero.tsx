import { Button } from './Button';
import { MessageCircle, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

export function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    
    updateHeight();
    
    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 overflow-hidden">
      {/* 网格斜向滚动背景 */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            backgroundColor: 'transparent',
            width: '200%',
            height: '200%',
          }}
          animate={{
            x: [0, -24, -48],
            y: [0, -24, -48],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* 小鱼元素 - 模拟真实游动 */}
        {Array.from({ length: 20 }).map((_, i) => {
          const startX = Math.random() * 90 + 5;
          const delay = Math.random() * 4;
          const duration = 3 + Math.random() * 2;
          const fishSize = 1.5 + Math.random() * 1;
          const xOffset = -20 - Math.random() * 30;
          const swimDistance = (containerHeight || 500) + 50;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${startX}%`,
                bottom: '-10%',
                fontSize: `${fishSize}rem`,
              }}
              animate={{
                y: [0, -swimDistance],
                x: [0, xOffset],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              🐟
            </motion.div>
          );
        })}
      </div>
      
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <a href="http://dc.lingkuma.org/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                {t('hero.community.discord')}
              </Button>
            </a>
            <a href="http://tg.lingkuma.org/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="gap-2">
                <Send className="w-4 h-4" />
                {t('hero.community.telegram')}
              </Button>
            </a>
            <a href="https://pd.qq.com/s/hbotsiacz" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('hero.community.qq')}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
