'use client';

import React from 'react';

interface TriangleProps {
    direction?: 'up' | 'down' | 'left' | 'right';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    color?: string;
    className?: string;
    type?: 'basic' | 'advanced' | 'gradient' | 'equilateral' | 'isosceles';
    style?: React.CSSProperties;
}

export default function Triangle({
    direction = 'up',
    size = 'md',
    color,
    className = '',
    type = 'basic',
    style,
    ...props
}: TriangleProps) {
    const getTriangleClasses = () => {
        const baseClasses = [];

        switch (type) {
            case 'basic':
                baseClasses.push('triangle', `triangle-${direction}`);
                if (size !== 'md') {
                    baseClasses.push(`triangle-${size}`);
                }
                break;
            case 'advanced':
                baseClasses.push('triangle-advanced');
                break;
            case 'gradient':
                baseClasses.push('triangle-gradient');
                break;
            case 'equilateral':
                baseClasses.push('triangle-equilateral');
                break;
            case 'isosceles':
                baseClasses.push('triangle-isosceles');
                break;
        }

        return baseClasses.join(' ');
    };

    const getDataAttributes = () => {
        if (type === 'advanced' || type === 'gradient') {
            return {
                'data-direction': direction,
                'data-size': size,
            };
        }
        return {};
    };

    const getInlineStyles = (): React.CSSProperties => {
        const inlineStyles: React.CSSProperties = { ...style };

        if (color && type === 'basic') {
            inlineStyles.color = color;
        }

        if (color && type === 'advanced') {
            // inlineStyles.setProperty('--triangle-color', color);
        }

        return inlineStyles;
    };

    return (
        <div
            className={`${getTriangleClasses()} ${className}`}
            style={getInlineStyles()}
            {...getDataAttributes()}
            {...props}
        />
    );
}

// 便捷组件
export function TriangleUp(props: Omit<TriangleProps, 'direction'>) {
    return <Triangle direction="up" {...props} />;
}

export function TriangleDown(props: Omit<TriangleProps, 'direction'>) {
    return <Triangle direction="down" {...props} />;
}

export function TriangleLeft(props: Omit<TriangleProps, 'direction'>) {
    return <Triangle direction="left" {...props} />;
}

export function TriangleRight(props: Omit<TriangleProps, 'direction'>) {
    return <Triangle direction="right" {...props} />;
}

// 特殊三角形组件
export function EquilateralTriangle(props: Omit<TriangleProps, 'direction' | 'size' | 'type'>) {
    return <Triangle type="equilateral" {...props} />;
}

export function IsoscelesTriangle(props: Omit<TriangleProps, 'direction' | 'size' | 'type'>) {
    return <Triangle type="isosceles" {...props} />;
}

// 渐变三角形组件
export function GradientTriangle(props: Omit<TriangleProps, 'type'>) {
    return <Triangle type="gradient" {...props} />;
}
