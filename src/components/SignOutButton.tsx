'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="btn-ghost"
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
    >
      সাইন আউট
    </button>
  );
}