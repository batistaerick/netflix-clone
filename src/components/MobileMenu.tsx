interface MobileMenuProps {
  visible?: boolean;
}

export default function MobileMenu({ visible }: MobileMenuProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`
        w-56 absolute top-8 left-0 py-5 flex flex-col
        bg-black border-2 border-gray-800
      `}
    >
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Films</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          My List
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  );
}
