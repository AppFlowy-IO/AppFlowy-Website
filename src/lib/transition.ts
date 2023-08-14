export const opacity = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      type: 'smooth',
      duration: 0.5,
    },
  },
};

export const opacityDelay = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

export const scaleContainer = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'smooth',
      duration: 0.5,
    },
  },
};

export const toDown = {
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

export const toUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

export const toLeft = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

export const toRight = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

export const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
