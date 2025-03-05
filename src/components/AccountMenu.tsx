import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface AccountMenuProps {
  visible?: boolean;
}

export default function AccountMenu({ visible }: Readonly<AccountMenuProps>) {
  const { data } = useCurrentUser();

  if (!visible) {
    return <></>;
  }

  return (
    <div className="absolute top-20 right-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-3">
        <div className="group/item flex w-full flex-row items-center gap-3 px-3">
          <Image
            className="rounded-md"
            src="/images/default-blue.png"
            alt="default-blue"
            width={50}
            height={50}
          />
          <p className="text-sm text-white group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="my-4 h-px border-0 bg-gray-600" />
        <button
          className="px-3 text-center text-sm text-white hover:underline"
          onClick={(): Promise<void> => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
