'use client';

import React from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { cn } from '@/libs/utils/styling';
import { Button } from './button';
import { Input } from './input';

export interface NumberInputProps extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
	stepper?: number;
	thousandSeparator?: string;
	placeholder?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	value?: number;
	suffix?: string;
	prefix?: string;
	onValueChange?: (value: number | undefined) => void;
	fixedDecimalScale?: boolean;
	decimalScale?: number;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			stepper,
			thousandSeparator,
			placeholder,
			defaultValue,
			min = -Infinity,
			max = Infinity,
			onValueChange,
			fixedDecimalScale = false,
			decimalScale = 0,
			suffix,
			prefix,
			value: controlledValue,
			className,
			...props
		},
		ref,
	) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		const [value, setValue] = React.useState<number | undefined>(controlledValue ?? defaultValue);

		const commitValue = React.useCallback(
			(next: number | undefined) => {
				setValue(next);
				onValueChange?.(next);
			},
			[onValueChange],
		);

		const handleIncrement = React.useCallback(() => {
			const step = stepper ?? 1;
			const next = value === undefined ? step : Math.min(value + step, max);
			commitValue(next);
		}, [commitValue, max, stepper, value]);

		const handleDecrement = React.useCallback(() => {
			const step = stepper ?? 1;
			const next = value === undefined ? -step : Math.max(value - step, min);
			commitValue(next);
		}, [commitValue, min, stepper, value]);

		React.useEffect(() => {
			const onKeyDown = (e: KeyboardEvent) => {
				if (document.activeElement !== inputRef.current) return;
				if (e.key === 'ArrowUp') handleIncrement();
				if (e.key === 'ArrowDown') handleDecrement();
			};

			window.addEventListener('keydown', onKeyDown);
			return () => window.removeEventListener('keydown', onKeyDown);
		}, [handleDecrement, handleIncrement]);

		React.useEffect(() => {
			if (controlledValue !== undefined) setValue(controlledValue);
		}, [controlledValue]);

		const handleChange = (values: { value: string; floatValue: number | undefined }) => {
			const next = values.floatValue === undefined ? undefined : values.floatValue;
			commitValue(next);
		};

		const handleBlur = () => {
			if (value === undefined) return;

			if (value < min) {
				commitValue(min);
				return;
			}

			if (value > max) {
				commitValue(max);
			}
		};

		return (
			<div className='border-input has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:border-ring flex items-center overflow-hidden rounded-lg border shadow-xs transition-shadow has-[input:focus-visible]:ring-[3px]'>
				<Button
					type='button'
					aria-label='Decrease value'
					className='border-input size-10 rounded-none border-0 border-r bg-transparent px-0 text-base leading-none focus-visible:relative'
					variant='outline'
					onClick={handleDecrement}
					disabled={value === min}
				>
					<span aria-hidden>-</span>
				</Button>
				<NumericFormat
					value={value}
					onValueChange={handleChange}
					thousandSeparator={thousandSeparator}
					decimalScale={decimalScale}
					fixedDecimalScale={fixedDecimalScale}
					allowNegative={min < 0}
					valueIsNumericString
					onBlur={handleBlur}
					max={max}
					min={min}
					suffix={suffix}
					prefix={prefix}
					customInput={Input}
					placeholder={placeholder}
					className={cn(
						'border-input relative h-10 [appearance:textfield] rounded-none border-x border-none shadow-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
						className,
					)}
					getInputRef={inputRef}
					{...props}
				/>
				<Button
					type='button'
					aria-label='Increase value'
					className='border-input size-10 rounded-none border-0 border-l bg-transparent px-0 text-base leading-none focus-visible:relative'
					variant='outline'
					onClick={handleIncrement}
					disabled={value === max}
				>
					<span aria-hidden>+</span>
				</Button>
			</div>
		);
	},
);

NumberInput.displayName = 'NumberInput';
