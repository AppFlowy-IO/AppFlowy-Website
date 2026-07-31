import Link from 'next/link';

export default function SelfHostLink() {
    return (
        <Link
            href="https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production"
            target="_blank"
            rel="noopener noreferrer"
            className='relative z-[1] mt-9 inline-flex items-center justify-center rounded-full bg-night-blue px-8 py-4 font-inter text-base font-medium text-white transition-colors hover:bg-night-blue/90'
        >
            <span>Self-host AppFlowy</span>
        </Link>
    );
}
