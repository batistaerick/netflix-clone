interface MobileMenuProps {
  visible?: boolean;
}

export default function MobileMenu({ visible }: MobileMenuProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute top-8 left-0 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
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
