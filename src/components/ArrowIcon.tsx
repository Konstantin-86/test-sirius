import React from 'react';

interface ArrowIconProps {
    color?: string;
    direction?: 'left' | 'right';
    size?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
    color = '#FFFFFF',
    direction = 'right',
    size = 15.5,
}) => {
    const rotation = direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)';
    const aspectRatio = 15.5 / 11.505859;
    const height = size / aspectRatio;

    return (
        <svg
            width={size}
            height={height}
            viewBox="0 0 15.5 11.5059"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: rotation }}
        >
            <path
                d="M14.75 5.75L0.75 5.75M9.75 10.75L14.75 5.75L9.75 0.75"
                stroke={color}
                strokeOpacity="1"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default ArrowIcon;