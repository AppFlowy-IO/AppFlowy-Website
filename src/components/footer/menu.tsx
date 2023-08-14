import data from '@/data/footer.json';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Badge from '@mui/material-next/Badge';

const menu = data.menu;

export default function FooterMenu() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: {
          md: '75%',
          xs: '100%',
        },
        marginTop: {
          xs: 5,
          md: 0,
        },
      }}
      className={'min-h-[200px]'}
    >
      <div className={'flex flex-wrap'}>
        {menu.map((item, index) => {
          return (
            <Box
              sx={{
                width: {
                  md: '20%',
                  xs: '50%',
                },
                marginTop: {
                  xs: 5,
                  md: 0,
                },
              }}
              className={'mb-6'}
              key={index}
            >
              <div className={'mb-6 mr-4 font-semibold text-white'}>{t(item.key)}</div>
              <div className={'text-white'}>
                {item.children.map((child) => {
                  return (
                    <div key={child.key} className={' py-2'}>
                      <Link href={child.link} className={'relative pr-2 hover:underline'}>
                        {t(child.key)}
                        {'badge' in child && (
                          <Badge
                            badgeContent={child.badge}
                            color={'primary'}
                            slotProps={{
                              badge: {
                                className: 'bg-primary text-white',
                              },
                            }}
                            className={'absolute -right-2 top-[35%] -translate-y-1/2'}
                          />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}
