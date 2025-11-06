import { useTranslations } from 'next-intl';
import type React from 'react';
import { renderRich } from './rich';

type RichMapper = Record<string, (chunks: React.ReactNode) => React.ReactNode>;

type HasRich = {
	rich: (key: string, mapper: RichMapper) => React.ReactNode;
};

export type TRich<T> = T & { plain: T };

export function withRich<T extends HasRich & ((key: string, ...args: unknown[]) => unknown)>(t: T): TRich<T> {
	const proxy = new Proxy(t as unknown as (...args: unknown[]) => unknown, {
		apply(_target, _thisArg, argArray) {
			const [key, values] = argArray as [
				string,
				Record<string, string | number | Date> | undefined,
				...unknown[],
			];
			return renderRich(
				t as unknown as {
					rich: (k: string, v?: Record<string, string | number | Date>, m?: RichMapper) => React.ReactNode;
				},
				key,
				undefined,
				values,
			);
		},
		get(_target, p, receiver) {
			if (p === 'plain') return t;
			return Reflect.get(t as object, p, receiver);
		},
	}) as unknown as TRich<T>;
	Reflect.set(proxy as object, 'plain', t);
	return proxy;
}

export function useTRich(...args: Parameters<typeof useTranslations>): TRich<ReturnType<typeof useTranslations>> {
	const t = useTranslations(...args);
	const rich = withRich(t as unknown as HasRich & ((key: string, ...args: unknown[]) => unknown));
	return rich as TRich<ReturnType<typeof useTranslations>>;
}
