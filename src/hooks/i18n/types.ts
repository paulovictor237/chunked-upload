import { I18N, Lang } from 'infra/interfaces/i18n';

export type UseI18N = <T = Lang>(texts: I18N<T>) => T;
