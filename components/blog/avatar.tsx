import Image from 'next/image';

interface Props {
  caption: string;
  img: string;
}

export default function Avatar(props: Props) {
  const { caption, img } = props;

  return (
    <div className='align-center m-0 flex h-8 items-center gap-3'>
      <Image
        src={'/images/blog/avatars/' + img}
        className='m-0 h-8 w-8 overflow-hidden rounded-full object-cover text-center'
        alt={`${caption} avatar`}
        width={32}
        height={32}
      />
      <figcaption
        style={{ marginTop: 0 }}
        className='not-prose text-sm font-medium font-normal not-italic text-gray-500'
      >
        <p>{caption}</p>
      </figcaption>
    </div>
  );
}
