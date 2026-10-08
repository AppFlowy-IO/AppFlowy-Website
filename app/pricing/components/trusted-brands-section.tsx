import Image from 'next/image';
import Marquee from '@/components/shared/marquee';

const brands = [
  { name: 'NVIDIA', src: '/images/pricing/logo-nvidia.svg', width: 152, height: 28 },
  { name: 'Siemens', src: '/images/pricing/logo-siemens.svg', width: 144, height: 20 },
  { name: 'Nokia', src: '/images/pricing/logo-nokia.svg', width: 102, height: 24 },
  { name: 'Qualcomm', src: '/images/pricing/logo-qualcomm.svg', width: 153, height: 28 },
  { name: 'Sony', src: '/images/pricing/logo-sony.svg', width: 136, height: 24 },
];

export function TrustedBrandsSection() {
  return (
    <section className='w-full overflow-hidden bg-white py-[60px]'>
      <p className='text-center font-inter text-base leading-6 text-[#5A5A5A]'>Trusted by teams and individuals from</p>
      <div className='relative mx-auto mt-10 h-24 max-w-[1440px] overflow-hidden'>
        <Marquee
          direction={-1}
          speed={33}
          className='h-24 w-full'
          trackClassName='flex h-24 w-max items-center gap-0'
          copyClassName='flex h-24 shrink-0 items-center gap-0'
        >
          {brands.map((brand) => (
            <div key={brand.name} className='flex h-24 w-[260px] flex-shrink-0 items-center justify-center px-7'>
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className='max-h-7 w-auto object-contain'
              />
            </div>
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-[130px] bg-gradient-to-r from-white to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-[130px] bg-gradient-to-l from-white to-transparent' />
      </div>
    </section>
  );
}
