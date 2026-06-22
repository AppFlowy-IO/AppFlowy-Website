import Link from 'next/link';

export default function SelfHostLink() {
    return (
        <Link
            href="https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production"
            target="_blank"
            rel="noopener noreferrer"
            className={'main-button download-btn'}
        >
            <span>Self-host AppFlowy</span>
        </Link>
    );
}
