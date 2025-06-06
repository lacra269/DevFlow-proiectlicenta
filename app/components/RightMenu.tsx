import Challange from "./Challange";
import Discuss from "./Discuss";

interface RightMenuProps {
  userId?: string;
}

export default function RightMenu({ userId }: RightMenuProps) {
  return (
    <div className="flex flex-col gap-6 bg-gray-50 p-4 rounded-lg shadow-md">
      <Challange />
      <Discuss />
    </div>
  );
}
