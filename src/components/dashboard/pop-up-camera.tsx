import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogCamera() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-[#FE7123] rounded-md text-xs ring-offset-background 
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
  text-secondary-foreground h-8 px-3 py-1 border-2 border-orange-200 hover:bg-orange-100 
  sm:h-10 sm:w-28 lg:h-10 lg:w-32 lg:text-sm z-0 
  font-bold shadow-md shadow-black-400 hover:text-blue bg-white"
        >
          Camera
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[#FE7123] text-white rounded-lg p-6">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold">
            Real-Time Detection Camera
          </DialogTitle>

          {/* <Button variant="ghost" className="text-white text-2xl">&times;</Button> */}
        </DialogHeader>
        <div className="my-4">
          {/* Gambar deteksi */}
          <iframe
            src="http://192.168.1.7:5000/video_feed"
            allow="autoplay; picture-in-picture"
            className="w-96 h-96 object-cover rounded-md"
          />
        </div>
        {/* Informasi tambahan */}
        <div className="mt-4 text-center text-sm">
          <p>Model Inference Time: 312ms</p>
          <p>Total Pengunjung: 167 orang</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
