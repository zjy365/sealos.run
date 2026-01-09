'use client';

import React from 'react';

interface CopyButtonProps {
	code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<button
			type='button'
			onClick={handleCopy}
			className='flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100'
			aria-label='复制代码'
		>
			{copied ? '已复制' : '点击复制'}
		</button>
	);
}
