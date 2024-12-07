import Image from "next/image";

interface DestinationCardProps {
  rank: number;
  title: string;
  location: string;
  imageUrl: string;
  onClick: () => void; // onClick event handler
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  rank,
  title,
  location,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className="p-4 min-w-[250px] sm:min-w-[300px] mx-auto sm:mx-2 bg-white rounded-xl shadow-md flex justify-between items-center space-x-4 hover:bg-gray-200 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full">
            <span className="text-lg font-bold">{rank}</span>
          </div>
        </div>
        <div>
          <div className="text-xl font-medium text-black">{title}</div>
          <p className="text-slate-500">{location}</p>
        </div>
      </div>
      <div className="w-16 h-16 relative rounded-md overflow-hidden">
        <Image src={imageUrl} alt={title} fill objectFit="cover" />
      </div>
    </div>
  );
};

export default DestinationCard;
