import type React from 'react';

type RichChunks = React.ReactNode;
type RichMapper = Record<string, (chunks: RichChunks) => React.ReactNode>;

/**
 * 返回一组统一的颜色标签映射，可在服务端/客户端通用。
 * 可根据主题系统替换 classNames。
 */
export function getColorRichMapper(overrides?: Partial<RichMapper>): RichMapper {
	const base: RichMapper = {
		brand: (chunks) => <span className='text-brand'>{chunks}</span>,
		danger: (chunks) => <span className='text-red-600 dark:text-red-500'>{chunks}</span>,
		accent: (chunks) => <span className='text-primary'>{chunks}</span>,
		strong: (chunks) => <strong className='text-foreground'>{chunks}</strong>,
	};
	return { ...base, ...(overrides || {}) } as RichMapper;
}

/**
 * 在 t.rich 上封装统一的标签映射，避免每处重复定义。
 * 使用方式：renderRich(t, 'key') 或 renderRich(t, 'key', customMap, values)
 */
export function renderRich(
	t: { rich: (key: string, values?: Record<string, string | number | Date>, mapper?: RichMapper) => React.ReactNode },
	key: string,
	mapperOverrides?: Partial<RichMapper>,
	values?: Record<string, string | number | Date>,
): React.ReactNode {
	const mapper = getColorRichMapper(mapperOverrides);
	// next-intl's t.rich supports two signatures:
	// 1. t.rich(key, mapper) - when no values
	// 2. t.rich(key, values, mapper) - when values exist
	// We need to always provide mapper to handle rich text tags like <brand>
	const richFn = t.rich as (
		key: string,
		...args: [Record<string, string | number | Date>, RichMapper] | [RichMapper]
	) => React.ReactNode;
	
	if (values) {
		return richFn(key, values, mapper);
	} else {
		return richFn(key, mapper);
	}
}

/**
 * Alias for `renderRich`
 */
export const r = renderRich;

