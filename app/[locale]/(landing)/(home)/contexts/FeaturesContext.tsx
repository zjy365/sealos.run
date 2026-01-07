'use client';

import React from 'react';

interface FeaturesContextValue {
	activeBoxIndex: number;
	setActiveBoxIndex: (index: number) => void;
}

const FeaturesContext = React.createContext<FeaturesContextValue | undefined>(undefined);

export function FeaturesProvider({ children }: { children: React.ReactNode }) {
	const [activeBoxIndex, setActiveBoxIndex] = React.useState<number>(0);

	const handleSetActiveBoxIndex = React.useCallback((index: number) => {
		setActiveBoxIndex(index);
	}, []);

	const contextValue = React.useMemo(
		() => ({
			activeBoxIndex,
			setActiveBoxIndex: handleSetActiveBoxIndex,
		}),
		[activeBoxIndex, handleSetActiveBoxIndex],
	);

	return <FeaturesContext.Provider value={contextValue}>{children}</FeaturesContext.Provider>;
}

export function useFeatures() {
	const context = React.useContext(FeaturesContext);
	if (context === undefined) {
		throw new Error('useFeatures must be used within FeaturesProvider');
	}
	return context;
}
