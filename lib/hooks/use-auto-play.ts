import { useCallback, useRef } from 'react';

const defaultDuration = 8000;

export function useAutoPlay({
  options,
  onChange,
  duration = defaultDuration,
}: {
  options: { value: string }[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
  duration?: number;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onChangeValue = useCallback(() => {
    onChange((prev) => {
      const currentIndex = options.findIndex((option) => option.value === prev);
      const nextIndex = (currentIndex + 1) % options.length;

      return options[nextIndex].value;
    });

    timeoutRef.current = setTimeout(onChangeValue, duration);
  }, [options, onChange, duration]);

  const stop = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const start = useCallback(() => {
    stop();
    timeoutRef.current = setTimeout(onChangeValue, duration);
  }, [stop, onChangeValue, duration]);

  return {
    start,
    stop,
  };
}
