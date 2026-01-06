import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ayu-bg border-t border-ayu-line pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Lingkuma Logo" className="w-6 h-6 rounded shadow-sm" />
              <span className="font-bold text-lg text-ayu-fg">Lingkuma</span>
            </div>
            <p className="text-ayu-fg/60 text-sm max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
        </div>
        
        <div className="border-t border-ayu-line mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ayu-fg/40">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <p className="text-sm text-ayu-fg/40">
             {t('footer.designed')}
          </p>
        </div>
      </div>
    </footer>
  );
}
