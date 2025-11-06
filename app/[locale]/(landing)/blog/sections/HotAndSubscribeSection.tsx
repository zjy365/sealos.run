import { getAllPosts } from '@/libs/blog/utils';
import LandingOutlineButton from '@/libs/components/LandingOutlineButton';
import { Input } from '@/libs/components/ui/input';
import { BoxIcon, HotIcon } from '@/libs/components/ui/sealos-icons';
import { Link } from '@/libs/i18n/navigation';

export default function HotAndSubscribeSection({ locale }: { locale: string }) {
	const recentPosts = getAllPosts(locale).slice(0, 3);

	return (
		<section className='container'>
			<div className='flex items-start'>
				{/* 本周热门更新 */}
				<div className='w-[60%]'>
					<div className='mb-8 flex items-center gap-2'>
						<HotIcon className='text-brand size-11' />
						<h2 className='text-3xl font-semibold'>本周热门更新</h2>
					</div>
					<ul className='space-y-3'>
						{recentPosts.map((post) => (
							<li
								key={post.url}
								className='text-muted-foreground hover:text-foreground line-clamp-1 text-xl transition-colors hover:underline'
							>
								<Link href={post.url}>{post.title}</Link>
							</li>
						))}
					</ul>
				</div>

				{/* 分隔线 */}
				<div className='border-brand mx-19 h-48 w-px self-center border-l border-dashed' />

				{/* 技术周刊订阅 */}
				<div className='w-[100%]'>
					<div className='mb-8 flex items-center gap-2'>
						<BoxIcon className='text-brand size-11' />
						<h2 className='text-3xl font-semibold'>技术周刊订阅</h2>
					</div>
					<p className='text-muted-foreground mb-5 text-lg'>每周精选云原生技术文章，获取最新行业动态</p>
					<div className='flex gap-5'>
						<Input
							placeholder='请输入邮箱地址'
							className='bg-muted h-14 flex-1 rounded-none border-none'
						/>

						<LandingOutlineButton href='/'>立即订阅</LandingOutlineButton>
					</div>
				</div>
			</div>
		</section>
	);
}
