interface RelatedResourcesSectionProps {
	title: string;
	description: string;
	resources: Array<{
		title: string;
		url: string;
		icon?: React.ReactNode;
	}>;
}

export function RelatedResourcesSection({ title, description, resources }: RelatedResourcesSectionProps) {
	return (
		<section>
			<div className='mb-6'>
				<h2 className='text-foreground text-xl font-semibold'>{title}</h2>
				<p className='text-muted-foreground mt-2 text-base'>{description}</p>
			</div>
			<div className='space-y-4'>
				{resources.map((resource) => (
					<a
						key={resource.title}
						href={resource.url}
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors'
					>
						{resource.icon}
						<span>{resource.title}</span>
					</a>
				))}
			</div>
		</section>
	);
}
