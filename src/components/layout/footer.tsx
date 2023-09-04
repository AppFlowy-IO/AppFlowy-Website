import Box from '@mui/material/Box';
import Logo from '@/components/shared/icons/logo';
import FooterMenu from '@/components/footer/menu';
import FooterLinks from '@/components/footer/links';
import FooterBottom from '@/components/footer/bottom';

export default function Footer() {
  return (
    <Box
      sx={{
        padding: {
          xs: '60px 20px 30px 20px',
          md: '100px 30px 30px 100px',
        },
      }}
      className={'footer bg-bg-footer min-h-[200px] w-full overflow-hidden'}
    >
      <div className={'flex w-full flex-wrap'}>
        <Box
          sx={{
            width: {
              md: '25%',
              xs: '100%',
            },
          }}
        >
          <Logo dark={true} />
        </Box>
        <FooterMenu />
        <FooterLinks />
      </div>
      <FooterBottom />
    </Box>
  );
}
