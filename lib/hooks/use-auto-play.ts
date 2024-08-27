import { useEffect } from 'react';

const duration = 5000;

export function useAutoPlay({
  options,
  onChange,
  play,
  defaultOption,
}: {
  defaultOption?: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
  play?: boolean;
}) {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onChangeValue = () => {
      onChange((prev) => {
        const currentIndex = options.findIndex((option) => option.value === prev);
        const nextIndex = (currentIndex + 1) % options.length;

        return options[nextIndex].value;
      });

      timeout = setTimeout(onChangeValue, duration);
    };

    if (!play) {
      if (defaultOption !== undefined) {
        onChange(defaultOption);
      }

      return;
    }

    timeout = setTimeout(onChangeValue, duration);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [options, onChange, play, defaultOption]);
}
