import 'server-only';

import React from 'react';
import { routing } from '@/libs/i18n/routing';
import { AIPROXY_CAPABILITY_LABELS, AIPROXY_MODEL_TYPE_LABELS, AIPROXY_OWNER_LABELS } from './constants';
import { aiproxyModels } from './source';
import type { AiproxyModel, AiproxyModelMeta, AiproxyOwnerKey } from './types';

type RawAiproxyModel = (typeof aiproxyModels)[number];

function safeSlug(path: string) {
	return path.replace(/\.json$/i, '').replace(/^\/+/, '');
}

function getOwnerLabel(ownerKey: string) {
	return AIPROXY_OWNER_LABELS[ownerKey as AiproxyOwnerKey] ?? ownerKey;
}

function normalizeModel(model: RawAiproxyModel): AiproxyModel {
	const typedModel = model as AiproxyModelMeta;

	return {
		slug: safeSlug(typedModel.info.path),
		name: typedModel.name,
		ownerKey: typedModel.ownerKey,
		ownerLabel: getOwnerLabel(typedModel.ownerKey),
		type: typedModel.type,
		typeLabel: AIPROXY_MODEL_TYPE_LABELS[typedModel.type],
		contextSize: typedModel.contextSize,
		maxOutputTokens: typedModel.maxOutputTokens,
		maxInputTokens: typedModel.maxInputTokens,
		rpm: typedModel.rpm,
		inputPrice: typedModel.inputPrice,
		outputPrice: typedModel.outputPrice,
		capabilities: typedModel.capabilities,
		capabilityLabels: typedModel.capabilities.map((capability) => AIPROXY_CAPABILITY_LABELS[capability]),
	};
}

export function getAiproxyModels() {
	return getAiproxyModelsCached();
}

const getAiproxyModelsCached = React.cache((): AiproxyModel[] => {
	const collator = new Intl.Collator(routing.defaultLocale);

	return aiproxyModels
		.map(normalizeModel)
		.sort((a, b) => collator.compare(a.ownerLabel, b.ownerLabel) || collator.compare(a.name, b.name));
});
