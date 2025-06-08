import React from 'react';

interface ArrowIconProps {
    color?: string;
    direction?: 'left' | 'right';
    size?: number;
}

const ShareIcon: React.FC<ArrowIconProps> = ({
    color = '#FFFFFF',
    direction = 'right',
    size = 15.5,
}) => {
    const rotation = direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)';
    const aspectRatio = 15.5 / 11.505859;
    const height = size / aspectRatio;

    return (
        <svg style={{ transform: rotation }} width={size} height={height} viewBox="0 0 18.7793 18.7803" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path id="Vector" d="M5.55 5.54L2.46 5.54C1.51 5.54 0.75 6.31 0.75 7.26C0.75 7.83 1.03 8.36 1.5 8.68L7.22 12.56C8.53 13.45 10.25 13.45 11.55 12.56L17.27 8.69C17.74 8.37 18.02 7.83 18.02 7.26C18.02 6.32 17.26 5.54 16.31 5.54L13.23 5.54M0.75 7.28L0.75 16.11C0.75 17.17 1.6 18.03 2.66 18.03L16.1 18.03C17.16 18.03 18.02 17.17 18.02 16.11L18.02 7.28M1.28 17.44L6.58 12.13M12.18 12.13L17.49 17.44M9.38 0.75L9.38 7.41M11.3 2.66L9.38 0.75L7.46 2.66" stroke={color} strokeOpacity="1.000000" strokeWidth="1.500000" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

    );
};

export default ShareIcon;