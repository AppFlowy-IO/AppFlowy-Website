import Link from 'next/link';

interface ImportLinkProps {
    importBaseURL: string;
}

export default function ImportLink({ importBaseURL }: ImportLinkProps) {
    return (
        <div className={'flex items-center justify-center gap-4'}>
            <Link
                href="https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production"
                target="_blank"
                rel="noopener noreferrer"
                className={'rounded-full border border-primary bg-primary px-6 py-3 text-white transition-all hover:bg-opacity-90'}
            >
                <div className={'flex items-center gap-2'}>
                    <span>Self-host AppFlowy</span>
                </div>
            </Link>
        </div>
    );
}
