import { useRouter } from 'next/router';
import { UseI18N } from './types';

export const useI18N: UseI18N = (texts) => {
  const { locale } = useRouter();
  const lang = locale?.split('-')[0];
  return lang === 'es' || lang === 'en' ? texts[lang] : texts['pt'];
};
