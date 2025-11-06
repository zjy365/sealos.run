'use client';

export function ShareButtons() {
	const handleShareWeibo = () => {
		window.open(
			`http://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`,
			'_blank',
		);
	};

	const handleShareWechat = () => {
		alert('请使用微信扫码分享');
	};

	const handleShareQQ = () => {
		window.open(
			`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`,
			'_blank',
		);
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert('链接已复制');
		});
	};

	return (
		<div className='space-y-4'>
			<button
				type='button'
				onClick={handleShareWeibo}
				className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-base transition-colors'
			>
				<svg
					className='size-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<title>微博</title>
					<path d='M8.5 15c-2.5 0-4.5-1.5-4.5-3.5S6 8 8.5 8s4.5 1.5 4.5 3.5-2 3.5-4.5 3.5zm0-5.5c-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5-.9 2.5-2-1.1-2-2.5-2z' />
				</svg>
				<span>分享到微博</span>
			</button>
			<button
				type='button'
				onClick={handleShareWechat}
				className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-base transition-colors'
			>
				<svg
					className='size-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<title>微信</title>
					<path d='M7 8c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm6 0c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z' />
				</svg>
				<span>分享到微信</span>
			</button>
			<button
				type='button'
				onClick={handleShareQQ}
				className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-base transition-colors'
			>
				<svg
					className='size-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<title>QQ</title>
					<path d='M10 2c-1.7 0-3 1.3-3 3v3c-1.1.6-2 1.7-2 3 0 .6.2 1.1.5 1.5-.3.4-.5.9-.5 1.5 0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2 0-.6-.2-1.1-.5-1.5.3-.4.5-.9.5-1.5 0-1.3-.9-2.4-2-3V5c0-1.7-1.3-3-3-3z' />
				</svg>
				<span>分享到 QQ</span>
			</button>
			<button
				type='button'
				onClick={handleCopyLink}
				className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-base transition-colors'
			>
				<svg
					className='size-5'
					viewBox='0 0 20 20'
					fill='none'
					stroke='currentColor'
				>
					<title>复制链接</title>
					<path
						d='M10 13a3 3 0 0 0 0-6M7 9.5l-2.5 2.5a3.5 3.5 0 1 0 5 5l2.5-2.5M13 10.5l2.5-2.5a3.5 3.5 0 1 0-5-5L8 5.5'
						strokeWidth='2'
						strokeLinecap='round'
					/>
				</svg>
				<span>复制链接</span>
			</button>
		</div>
	);
}
