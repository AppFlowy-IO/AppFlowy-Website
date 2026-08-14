import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SelfHostLink() {
    return (
        <Button
            asChild
            size={'xl'}
            className='relative z-[1] mt-9 min-w-[180px] rounded-lg bg-night-blue font-inter text-base text-white transition-colors hover:bg-night-blue/90'
        >
            <Link
                href="https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production"
                target="_blank"
                rel="noopener noreferrer"
            >
                Self-host AppFlowy
            </Link>
        </Button>
    );
}
