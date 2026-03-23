import { stopwords as englishStopwords } from '@orama/stopwords/english';
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/libs/docs/source';

const combinedStopwords = [...mandarinStopwords, ...englishStopwords];
const tokenizer = await createTokenizer({
	language: 'mandarin',
	stopWords: combinedStopwords,
});

export const { GET } = createFromSource(source, {
	tokenizer,
});
