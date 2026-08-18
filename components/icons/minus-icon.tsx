import { motion } from 'framer-motion';

// 展开时的减号图标
// Defaults match the pricing FAQ (small, static). The compare FAQ opts into the
// larger size and the purple hover tint.
export default function MinusIcon({
    isHovered = false,
    className = 'h-4 w-4 sm:h-[18px] sm:w-[18px]',
    strokeWidth = 2,
}: {
    isHovered?: boolean;
    className?: string;
    strokeWidth?: number;
}) {
    return (
        <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            viewBox='0 0 32 32'
            fill='none'
        >
            <motion.path
                d='M5.33203 16H26.6654'
                stroke={isHovered ? '#9327FF' : '#101012'}
                strokeWidth={strokeWidth}
                strokeLinecap='round'
                animate={{ stroke: isHovered ? '#9327FF' : '#101012' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
            />
        </motion.svg>
    );
}
