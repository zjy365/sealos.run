import type { AIPROXY_CAPABILITY_LABELS, AIPROXY_MODEL_TYPE_LABELS, AIPROXY_OWNER_LABELS } from './constants';

export type AiproxyModelType = keyof typeof AIPROXY_MODEL_TYPE_LABELS;

export type AiproxyModelCapability = keyof typeof AIPROXY_CAPABILITY_LABELS;

export type AiproxyOwnerKey = keyof typeof AIPROXY_OWNER_LABELS;

export type AiproxyModelMeta = {
	name: string;
	ownerKey: string;
	type: AiproxyModelType;
	contextSize?: number;
	maxOutputTokens?: number;
	maxInputTokens?: number;
	rpm: number;
	inputPrice: number;
	outputPrice: number;
	capabilities: AiproxyModelCapability[];
	info: {
		path: string;
		fullPath: string;
	};
};

export type AiproxyModel = {
	slug: string;
	name: string;
	ownerKey: string;
	ownerLabel: string;
	type: AiproxyModelType;
	typeLabel: string;
	contextSize?: number;
	maxOutputTokens?: number;
	maxInputTokens?: number;
	rpm: number;
	inputPrice: number;
	outputPrice: number;
	capabilities: AiproxyModelCapability[];
	capabilityLabels: string[];
};
