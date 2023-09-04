import { motion } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selected: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, selected, index, ...other } = props;

  return (
    <div role='tabpanel' {...other}>
      {selected === index && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, easings: ['easeInOut'] }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
