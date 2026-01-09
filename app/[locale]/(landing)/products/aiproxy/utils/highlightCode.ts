import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

/**
 * Highlight code and return HTML string
 */
export function highlightCode(code: string, language = 'javascript'): string {
	try {
		return hljs.highlight(code, { language }).value;
	} catch (err) {
		console.error('Failed to highlight code:', err);
		return code
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}
}
