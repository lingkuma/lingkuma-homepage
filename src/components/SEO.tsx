import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// SEO 元数据配置
const seoConfig = {
  'zh-CN': {
    title: 'Lingkuma - 🐻熊祸鱼塘 🐟语获满满',
    description: '🐻熊祸鱼塘 🐟语获满满 - 开发和分享更多开源软件，让学语言更简单，更高效。探索 Lingkuma、SyncLingua、Ohmytext 等语言学习工具。',
    keywords: 'Lingkuma, 语言学习, 日语学习, 开源软件, SyncLingua, Ohmytext, 沉浸式学习',
    ogTitle: 'Lingkuma - 🐻熊祸鱼塘 🐟语获满满',
    ogDescription: '开发和分享更多开源软件，让学语言更简单，更高效。',
  },
  'en': {
    title: 'Lingkuma - Powerful tools for language learning',
    description: 'Lingkuma - Powerful tools for language learning. Develop and share open-source software to make language learning simpler and more efficient. Explore Lingkuma, SyncLingua, Ohmytext and more.',
    keywords: 'Lingkuma, language learning, Japanese learning, open source, SyncLingua, Ohmytext, immersive learning',
    ogTitle: 'Lingkuma - Powerful tools for language learning',
    ogDescription: 'Develop and share open-source software to make language learning simpler and more efficient.',
  }
};

const defaultConfig = seoConfig['en'];

export function SEO() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // 根据当前语言获取 SEO 配置
    const currentLang = i18n.language;
    const isZhCN = currentLang === 'zh-CN' || currentLang === 'zh';
    const config = isZhCN ? seoConfig['zh-CN'] : defaultConfig;
    
    // 更新页面标题
    document.title = config.title;
    
    // 更新或创建 meta description
    updateMetaTag('description', config.description);
    
    // 更新或创建 meta keywords
    updateMetaTag('keywords', config.keywords);
    
    // 更新 Open Graph 标签
    updateMetaTag('og:title', config.ogTitle, 'property');
    updateMetaTag('og:description', config.ogDescription, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', 'https://lingkuma.org', 'property');
    updateMetaTag('og:site_name', 'Lingkuma', 'property');
    
    // 更新 Twitter 卡片标签
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', config.ogTitle, 'name');
    updateMetaTag('twitter:description', config.ogDescription, 'name');
    
    // 设置 hreflang 标签，告诉搜索引擎不同语言版本
    updateLinkTag('alternate', 'https://lingkuma.org', 'x-default');
    updateLinkTag('alternate', 'https://lingkuma.org?lang=en', 'en');
    updateLinkTag('alternate', 'https://lingkuma.org?lang=zh-CN', 'zh-CN');
    
  }, [i18n.language]);
  
  return null;
}

// 更新或创建 meta 标签
function updateMetaTag(name: string, content: string, attrName: string = 'name') {
  let meta = document.querySelector(`meta[${attrName}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

// 更新或创建 link 标签
function updateLinkTag(rel: string, href: string, hreflang: string) {
  let link = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', href);
}
