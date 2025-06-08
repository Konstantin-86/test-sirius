import React from 'react';

interface ArrowIconProps {
    color?: string;
    direction?: 'left' | 'right';
    size?: number;
}

const DoubleArrowIcon: React.FC<ArrowIconProps> = ({
    color = '#FFFFFF',
    direction = 'right',
    size = 15.5,
}) => {
    const rotation = direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)';
    const aspectRatio = 15.5 / 11.505859;
    const height = size / aspectRatio;

    return (
        <svg style={{ transform: rotation }} width={size} height={height} viewBox="0 0 12.5039 11.5059" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path id="Vector" d="M7.75 9.75L11.75 5.75L7.75 1.75M0.75 10.75L5.75 5.75L0.75 0.75" stroke={color} strokeOpacity="1.000000" strokeWidth="1.500000" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

    );
};

export default DoubleArrowIcon;