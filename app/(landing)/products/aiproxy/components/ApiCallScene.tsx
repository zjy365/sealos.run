import { highlightCode } from '../utils/highlightCode';
import { CopyButton } from './CopyButton';

const code = `async function main() {
  const apiKey = 'your-api-key';
  const apiUrl = 'https://aiproxy.hzh.sealos.run/v1/chat/completions';
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify({
      model: 'Doubao-lite-4k',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: '你好，请介绍一下你自己。' }
      ],
      max_tokens: 2048,
      temperature: 0.7
    })
  });
  
  return await response.json();
}`;

const highlightedCode = highlightCode(code, 'javascript');

export function ApiCallScene() {
	return (
		<div className='relative flex w-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white'>
			<div className='flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3'>
				<h3 className='text-base font-medium'>API 调用示例</h3>
				<CopyButton code={code} />
			</div>
			<div className='flex-1 overflow-x-auto overflow-y-auto bg-white p-4'>
				<pre className='hljs text-sm'>
					<code
						className='font-mono'
						// biome-ignore lint/security/noDangerouslySetInnerHtml: static generation code html on server
						dangerouslySetInnerHTML={{ __html: highlightedCode }}
					/>
				</pre>
			</div>
		</div>
	);
}
