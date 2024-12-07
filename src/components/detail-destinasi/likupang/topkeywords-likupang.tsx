import { ScrollArea } from "@/components/ui/scroll-area";

interface Keyword {
  text: string;
  count: number;
}

interface TopKeywordsProps {
  data: Keyword[];
}

export default function TopKeywordsLikupang({ data }: TopKeywordsProps) {
  return (
    <ScrollArea className="h-[340px] max-w-[350px] mt-2">
      <div>
        <div className="flex flex-wrap gap-2 mt-4">
          {data.map((keyword: Keyword, index: number) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
            >
              <span>{keyword.text}</span>
              <span className="ml-2 bg-white px-2 py-1 rounded-md text-sm font-bold">
                {keyword.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
