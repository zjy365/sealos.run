'use client';

import { AIShareButton, SocialShareButton } from '@/libs/legacy/components/ui/share-buttons';
import type { languagesType } from '@/libs/legacy/utils/i18n';
import { Sparkles } from 'lucide-react';

interface AIShareButtonsProps {
	lang: languagesType;
	className?: string;
}

export default function AIShareButtons({ lang, className = '' }: AIShareButtonsProps) {
	// Translations with descriptions
	const translations = {
		en: {
			title: 'Explore with AI',
			subtitle: 'Get AI insights on this article',
			chatgpt: 'ChatGPT Summary',
			perplexity: 'Perplexity Analysis',
			claude: 'Claude Insights',
			gemini: 'Google AI',
			grok: 'Grok',
			shareTitle: '📤 Share this article',
			tip: 'AI will help you summarize key points and analyze technical details.',
			descriptions: {
				chatgpt: 'Smart Summary',
				perplexity: 'Deep Analysis',
				claude: 'Professional Insights',
				gemini: 'Quick Insights',
				grok: 'X AI Analysis',
			},
		},
		'zh-cn': {
			title: '用AI探索',
			subtitle: '获取这篇文章的AI见解',
			chatgpt: 'ChatGPT 总结',
			perplexity: 'Perplexity 分析',
			claude: 'Claude 洞察',
			gemini: 'Google AI',
			grok: 'Grok',
			shareTitle: '📤 分享这篇文章',
			tip: 'AI将帮助您总结要点并分析技术细节。',
			descriptions: {
				chatgpt: '智能总结',
				perplexity: '深度分析',
				claude: '专业洞察',
				gemini: '快速见解',
				grok: 'X AI 分析',
			},
		},
	};

	const t = translations[lang];

	return (
		<div className={`mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
			<div className='mb-6'>
				<div className='flex items-center gap-2 mb-2'>
					<div className='text-blue-500'>
						<Sparkles
							className='h-5 w-5'
							fill='currentColor'
						/>
					</div>
					<h3 className='text-lg font-semibold text-gray-900'>{t.title}</h3>
				</div>
				<p className='text-sm text-gray-600'>{t.subtitle}</p>
			</div>

			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
				<AIShareButton
					platform='chatgpt'
					label={t.chatgpt}
					description={t.descriptions.chatgpt}
					variant='full'
					lang={lang}
				/>
				<AIShareButton
					platform='perplexity'
					label={t.perplexity}
					description={t.descriptions.perplexity}
					variant='full'
					lang={lang}
				/>
				<AIShareButton
					platform='claude'
					label={t.claude}
					description={t.descriptions.claude}
					variant='full'
					lang={lang}
				/>
				<AIShareButton
					platform='gemini'
					label={t.gemini}
					description={t.descriptions.gemini}
					variant='full'
					lang={lang}
				/>
				<AIShareButton
					platform='grok'
					label={t.grok}
					description={t.descriptions.grok}
					variant='full'
					lang={lang}
				/>
			</div>

			<div className='mt-6 pt-4 border-t border-gray-200'>
				<h4 className='text-sm font-medium text-gray-700 mb-3'>{t.shareTitle}</h4>
				<div className='flex flex-wrap gap-2'>
					<SocialShareButton
						platform='linkedin'
						variant='full'
					/>
					<SocialShareButton
						platform='x'
						variant='full'
					/>
					<SocialShareButton
						platform='whatsapp'
						variant='full'
					/>
				</div>
			</div>

			<div className='mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3'>
				<div className='text-blue-500 mt-0.5'>
					<Sparkles
						className='h-4 w-4'
						fill='currentColor'
					/>
				</div>
				<div className='text-sm text-blue-700'>
					<span className='font-medium'>Tip:</span> {t.tip}
				</div>
			</div>
		</div>
	);
}
