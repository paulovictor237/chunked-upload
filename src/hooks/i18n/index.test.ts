import { renderHook } from '@testing-library/react';
import { RouterWrapper } from 'app/tests/wrappers';
import { I18N } from 'infra/interfaces/i18n';
import { useI18N } from '.';

describe('useI18N', () => {
  it('should render Portuguese as default language', () => {
    const textsI18N: I18N = {
      pt: { hello: 'Olá mundo' },
      en: { hello: 'Hello world' },
      es: { hello: 'Hola mundo' },
    };

    const { result } = renderHook(() => useI18N(textsI18N), {
      wrapper: RouterWrapper,
    });
    const texts = result.current;
    expect(texts.hello).toBe('Olá mundo');
  });
});
