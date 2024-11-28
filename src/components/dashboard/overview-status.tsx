import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OverviewStatus(props: any) {
  const { google, tiket, traveloka, tripadvisor } = props;
  const keywords = [
    { img: "/google-icon.png", text: "Google Maps", count: google },
    { img: "/tripadvisor-icon.png", text: "Tripadvisor", count: tripadvisor },
    { img: "/traveloka-icon.png", text: "Traveloka", count: traveloka },
    { img: "/tiket-icon.png", text: "Ticket", count: tiket },
  ];

  return (
    <ScrollArea className="flex h-[21rem] flex-col gap-3 overflow-auto">
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex h-[52px] w-full flex-grow items-center justify-between rounded-md bg-muted p-4 md:flex-grow-0"
          >
            <div className="flex items-center">
              <Image
                src={keyword.img}
                alt={keyword.text}
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-start">{keyword.text}</span>
            </div>
            <span className="ml-2 bg-white px-2 py-1 rounded-md text-sm font-bold items-end">
              {keyword.count}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
