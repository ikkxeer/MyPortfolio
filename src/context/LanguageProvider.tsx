import React, { useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';
import { LanguageContext, type Language } from './LanguageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('appLanguage');
    return (saved === 'ca' || saved === 'en') ? saved as Language : 'ca';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  const t = (section: string, key: string): string => {
    try {
      // @ts-ignore
      return translations[language][section][key] || key;
    } catch (e) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
