import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogWisata() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null); 
  const [activeTab, setActiveTab] = useState("Ulasan");

  return (
    <>
      {/* Pop Up hasil deteksi */}
      <Dialog open={activeDialog === "main"} onOpenChange={(open) => setActiveDialog(open ? "main" : null)}>
        <DialogTrigger asChild>
          <Button
            className="text-[#FE7123] rounded-md text-xs ring-offset-background 
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
              focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
              text-secondary-foreground h-8 px-3 py-1 border-2 border-orange-200 hover:bg-orange-100 
              sm:h-10 sm:w-28 lg:h-10 lg:w-32 lg:text-sm z-0 
              font-bold shadow-md shadow-black-400 hover:text-blue bg-white"
          >
            Submit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl h-[400px] bg-white text-black rounded-lg p-6 shadow-lg overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-4 p-2">
            <div className="flex flex-col justify-between items-center w-full lg:w-1/2 space-y-4 relative">
              <div className="relative w-full">
                <img
                  src="/images/borobudur.jpg" 
                  alt="Borobudur"
                  className="w-full h-64 object-cover rounded-md"
                />
                <div className="absolute flex left-4 bottom-10">
                  <p className="text-white font-bold text-lg">Borobudur</p>
                </div>
                <div className="absolute flex right-1 top-1 bg-white items-center rounded-lg py-0.5 px-1">
                  <img
                    src="/star.png" 
                    alt="Borobudur"
                    className="w-auto h-4"
                  />
                  <p className="text-black font-normal text-sm">4.0</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  onClick={() => setActiveDialog("keramaian")}
                  className="bg-[#4D4DC8] text-white hover:bg-white hover:text-[#4D4DC8]"
                >
                    Keramaian Pengunjung
                </Button>
                <Button
                  onClick={() => setActiveDialog("wisataSekitar")}
                  className="bg-[#4D4DC8] text-white hover:bg-white hover:text-[#4D4DC8]"
                >
                    Lihat Wisata Sekitar
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-4">
              <div className="text-sm text-justify space-y-3">
                <p className="font-semibold">Detail Wisata:</p>
                <p>
                  Sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. 
                  Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, 
                  dan 40 km di sebelah barat laut Yogyakarta. Candi dengan banyak stupa ini didirikan oleh para penganut agama
                  Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra. Borobudur adalah candi 
                  atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Buddha terbesar di dunia.
                </p>
              </div>
              <Button
                onClick={() => setActiveDialog("ulasan")}
                className="bg-transparent text-[#4D4DC8] border hover:text-white border-[#4D4DC8] hover:bg-[#4D4DC8] w-full"
              >
                  Lihat Seluruh Ulasan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* Pop Up Keramaian */}
      <Dialog
        open={activeDialog === "keramaian"}
        onOpenChange={(open) => setActiveDialog(open ? "wisataSekitar" : "main")}
      >
        <DialogContent className="max-w-md bg-white text-black rounded-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Keramaian Pengunjung
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm">
            Informasi tentang keramaian pengunjung di lokasi wisata Candi Borobudur
          </p>
        </DialogContent>
      </Dialog>

      {/* Pop Up Wisata Sekitar */}
      <Dialog
        open={activeDialog === "wisataSekitar"}
        onOpenChange={(open) => setActiveDialog(open ? "wisataSekitar" : "main")}
      >
        <DialogContent className="max-w-md bg-white text-black rounded-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Wisata Sekitar
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm">
            Informasi tentang wisata-wisata menarik di sekitar Borobudur.
          </p>
        </DialogContent>
      </Dialog>

      {/* Pop up seluruh ulasan */}
      <Dialog
        open={activeDialog === "ulasan"}
        onOpenChange={(open) => setActiveDialog(open ? "keramaian" : "main")}
      >
        <DialogContent className="max-w-4xl h-[450px] bg-white text-black rounded-lg p-6 shadow-lg overflow-y-auto">
          <div className="flex gap-4 border-b h-[50px] pb-2">
            {["Ulasan", "Tanya Jawab", "Wisata Serupa"].map((tab) => (
              <button
                key={tab}
                className={`text-lg font-semibold ${
                  activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Ulasan" && (
            <div className="">
              <div className="flex-col space-y-2 mb-4">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Cari Ulasan"
                    className="w-full border rounded-full px-4 py-2"
                  />
                  <span className="absolute right-4 top-2.5 text-gray-400">🔍</span>
                </div>
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex-row">
                    <select className="border px-4 py-2 rounded-full">
                      <option>Terbaru</option>
                      <option>Terlama</option>
                    </select>
                    <select className="border px-4 py-2 rounded-full">
                      <option>Indonesia</option>
                      <option>English</option>
                    </select>
                  </div>
                  <p className="font-semibold text-md">2 Total Ulasan</p>
                </div>
              </div>

              <div className="flex-col space-y-6">
                {/* Ulasan 1 */}
                <div className="flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <div className="flex-col">
                        <p className="font-bold text-black">Anasui</p>
                        <p className="text-sm text-gray-500">Bondowoso, Indonesia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        <img
                          src="/like.svg" 
                          alt="Like"
                          className="w-auto h-5"
                        />
                        <p className="text-sm">120</p>
                      </div>
                      <img
                        src="/more.png" 
                        alt="More"
                        className="w-auto h-5"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-2xl">★★★★☆</span>
                    </div>
                    <p className="text-sm text-gray-500">November 2024</p>
                    <p className="mt-2 text-sm">
                      Ini pertama kalinya aku datang, aku tidak menyangka bisa merealisasikannya dan
                      melihat candi tersebut secara langsung, tapi aku terkendala pada saat ingin masuk
                      dikarenakan karena membludaknya para pengunjung.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <img
                        src="/images/ulasan1.png"
                        alt="Review 1"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <img
                        src="/images/ulasan2.png"
                        alt="Review 2"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <img
                        src="/images/ulasan3.png"
                        alt="Review 3"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-200 flex-shrink-0"></div>

                {/* Ulasan 2 */}
                <div className="flex-col gap-4">
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <div className="flex-col">
                        <p className="font-bold text-black">Anasui</p>
                        <p className="text-sm text-gray-500">Bondowoso, Indonesia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        <img
                          src="/like.svg" 
                          alt="Like"
                          className="w-auto h-5"
                        />
                        <p className="text-sm">120</p>
                      </div>
                      <img
                        src="/more.png" 
                        alt="More"
                        className="w-auto h-5"
                      />
                    </div>
                  </div>
                
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-2xl">★★★★☆</span>
                    </div>
                    <p className="text-sm text-gray-500">November 2024</p>
                    <p className="mt-2 text-sm">
                      Ini pertama kalinya aku datang, aku tidak menyangka bisa merealisasikannya dan
                      melihat candi tersebut secara langsung, tapi aku terkendala pada saat ingin masuk
                      dikarenakan karena membludaknya para pengunjung.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <img
                        src="/images/ulasan1.png"
                        alt="Review 1"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <img
                        src="/images/ulasan2.png"
                        alt="Review 2"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <img
                        src="/images/ulasan3.png"
                        alt="Review 3"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          )}

          {activeTab === "Tanya Jawab" && (
            <div className="mt-4 items-start">
              <p>Konten Tanya Jawab akan ditampilkan di sini.</p>
            </div>
          )}

          {activeTab === "Wisata Serupa" && (
            <div className="mt-4">
              <p>Konten Wisata Serupa akan ditampilkan di sini.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </>
  );
}
