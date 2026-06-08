import { motion } from "framer-motion";

// 收起时的加号图标
export default function PlusIcon({ isHovered }: { isHovered: boolean }) {
    return (
        <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8'
            viewBox='0 0 32 32'
            fill='none'
        >
            <motion.path
                d='M5.33398 16.0026H26.6673M16.0007 26.6693V16.0026L16.0007 5.33594'
                stroke={isHovered ? '#9327FF' : '#101012'}
                strokeWidth='1.5'
                strokeLinecap='round'
                animate={{ stroke: isHovered ? '#9327FF' : '#101012' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
            />
        </motion.svg>
    );
}