'use client';
import Select from '@mui/material/Select';
import langs from '@/data/lang.json';
import { MenuItem } from '@mui/material';
import { useLocale } from '@/lib/hooks/use-locale';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SwitchLang() {
  const { lang, handleChange } = useLocale();

  return (
    <Select
      variant={'standard'}
      sx={{
        '&.Mui-focused:after': {
          borderBottomColor: 'transparent',
        },
      }}
      MenuProps={{
        transformOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      }}
      IconComponent={() => <ExpandMoreIcon className={'text-white'} />}
      value={lang}
      renderValue={(value) => {
        const lang = langs.find((lang) => lang.code === value);

        return <div className={'text-white'}>{lang?.name}</div>;
      }}
      onChange={(e) => handleChange(e.target.value)}
    >
      {langs.map((lang) => (
        <MenuItem className={'text-text bg-bg hover:bg-bg-hover'} key={lang.name} value={lang.code}>
          {lang.name}
        </MenuItem>
      ))}
    </Select>
  );
}
