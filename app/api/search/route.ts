import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/libs/docs/source';

export const { GET } = createFromSource(source, {
	// [TODO] Configure multi language search
	language: 'english',
});
