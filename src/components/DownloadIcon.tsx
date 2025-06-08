import React from 'react';

interface ArrowIconProps {
    color?: string;
    direction?: 'left' | 'right';
    size?: number;
}

const DownloadIcon: React.FC<ArrowIconProps> = ({
    color = '#FFFFFF',
    direction = 'right',
    size = 15.5,
}) => {
    const rotation = direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)';
    const aspectRatio = 15.5 / 11.505859;
    const height = size / aspectRatio;

    return (
        <svg style={{ transform: rotation }} width={size} height={height} viewBox="0 0 17.5059 17.5068" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path id="Vector" d="M12.31 7.86L8.75 11.42L5.19 7.86M8.75 0.75L8.75 11.42M16.75 13.19C16.75 15.16 15.16 16.75 13.19 16.75L4.3 16.75C2.34 16.75 0.75 15.16 0.75 13.19" stroke={color} strokeOpacity="1.000000" strokeWidth="1.500000" strokeLinejoin="round" strokeLinecap="round" />
        </svg>

    );
};

export default DownloadIcon;