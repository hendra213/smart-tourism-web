"use client";

import DialogFlowChat from "@/components/dashboard/dialogflow-chat";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillWechat } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for hamburger menu
import { ChartKeramaian } from "@/components/dashboard/barcharts-deteksi-keramaian";
import DestinationCard from "@/components/maps/card-destination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DialogCamera } from "@/components/dashboard/pop-up-camera";
import { DialogWisata } from "@/components/dashboard/pop-up-submit";
import { VisitorData } from "@/components/dashboard/barcharts-deteksi-keramaian";

// Data destinasi
const CardDescription = [
  {
    rank: 1,
    title: "Danau Toba",
    location: "Sumatera Utara",
    lat: 2.6845,
    lng: 98.8588,
    imageUrl: "/images/danautoba.jpg",
  },
  {
    rank: 2,
    title: "Candi Borobudur",
    location: "Jawa Tengah",
    lat: -7.6079,
    lng: 110.2038,
    imageUrl: "/images/borobudur.jpg",
  },
  {
    rank: 3,
    title: "Likupang",
    location: "Sulawesi Utara",
    lat: 1.6824,
    lng: 125.0568,
    imageUrl: "/images/likupang.jpg",
  },
  {
    rank: 4,
    title: "Mandalika",
    location: "Nusa Tenggara Barat",
    lat: -8.8955,
    lng: 116.2951,
    imageUrl: "/images/mandalika.jpg",
  },
  {
    rank: 5,
    title: "Labuan Bajo",
    location: "Nusa Tenggara Timur",
    lat: -8.4539,
    lng: 119.889,
    imageUrl: "/images/labuanbajo.jpg",
  },
];

// Data gambar destinasi
const destinations = [
  { name: "Likupang", image: "/images/likupang.jpg" },
  { name: "Mandalika", image: "/images/mandalika.jpg" },
  { name: "Borobudur", image: "/images/borobudur.jpg" },
  { name: "Labuan Bajo", image: "/images/labuanbajo.jpg" },
  { name: "Danau Toba", image: "/images/danautoba.jpg" },
];

export default function Home() {
  const [shine, setShine] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control hamburger menu

  // Mengatur transisi gambar dengan interval waktu
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 500); // Durasi fade out
    }, 3000); // Interval gambar (3 detik)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mendeteksi scroll untuk mengecilkan navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // selected place on chart

  // image preview
   // State mendukung tipe string (URL) atau null
   const [image, setImage] = useState<string | null>(null);

   // Tipe parameter eksplisit pada event
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]; // Cek jika file dipilih
     if (file) {
       setImage(URL.createObjectURL(file)); // Buat URL pratinjau
     }
   };

  return (
    <div className="font-poppins text-gray-900 relative">
      {/* Header */}
      <header
        className={`fixed w-full top-0 left-0 z-10 transition-all duration-300 ease-in-out ${
          isScrolled ? "bg-white shadow-md p-2" : "bg-white p-4 shadow-md"
        }`}
      >
        <div className="flex justify-between items-center max-w-9xl mx-auto">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo Polije" width={150} height={50} />
            <Image
              src="/logo-explorenesia.png"
              alt="Logo explorenesia"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center">
            {/* Hamburger Menu */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <FaTimes className="text-3xl text-orange-600" />
                ) : (
                  <FaBars className="text-3xl text-orange-600" />
                )}
              </button>
            </div>

            {/* Navbar Links */}
            <nav
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col md:flex md:flex-row md:items-center mr-10 space-x-5 space-y-4 md:space-y-0 md:space-x-5 transition-all duration-300 ease-in-out`}
            >
              <a
                href="#beranda"
                className="ml-5 text-gray-700 hover:text-orange-600"
              >
                Beranda
              </a>
              <a
                href="#destinasi"
                className="text-gray-700 hover:text-orange-600"
              >
                Destinasi Unggulan
              </a>
              <a href="#fitur" className="text-gray-700 hover:text-orange-600">
                Fitur Unggulan
              </a>
              <button
                onClick={() => signIn()}
                className=" md:inline-block mr-4 border-2 border-orange-200 py-1 px-4 font-bold text-[#f38e58] rounded transition-all duration-100 hover:bg-gradient-to-l hover:from-[#FE7123] hover:to-[#F6D45E] hover:text-white"
              >
                Masuk
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Rest of the content (unchanged) */}

      {/* Floating Chat Button */}
      <div
        className="fixed bottom-6 right-6 bg-white text-white rounded-full p-3 shadow-lg cursor-pointer z-50"
        onClick={() => setShowChatPopup(true)}
      >
        <AiFillWechat className="fill-[#FE7123] text-4xl" />
      </div>

      {/* Chat Popup */}
      <DialogFlowChat />

      {/* Hero Section */}
      <section
        className="text-center bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white pt-28 py-28 relative"
        id="beranda"
      >
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative mx-auto mt-32 w-full md:mt-16 md:flex md:h-1/3 md:flex-col md:items-center md:justify-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 text-white">
            <h1 className="text-center text-2xl font-black uppercase tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Your Personalized Travel Companion to Indonesia's Top Destinations
            </h1>
            <p className="mt-8 text-center text-sm sm:text-base md:text-lg lg:text-xl">
              Explore Indonesia's Hidden Gems with Explorenesia!
            </p>
          </div>
          <Link href={"/login"}>
            <div className="mt-16 flex w-full justify-center">
              <button
                className="text-[#FE7123] justify-center rounded-md text-sm ring-offset-background transition-colors 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-10 px-4 
            py-2 border-4 border-orange-200 hover:bg-orange-100 sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] 
            lg:text-lg mx-auto flex items-center gap-1 font-bold shadow-md shadow-black-400 hover:text-blue 
            mt-8 bg-white"
              >
                Coba Gratis
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* Destinasi Unggulan Section */}
      <section className="text-center bg-white py-16" id="destinasi">
        <h2 className="text-4xl uppercase font-bold mb-6 bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Destinasi Unggulan
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {/* Gambar 1 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: "url(/images/likupang.jpg)" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Likupang</p>
            </div>
          </div>

          {/* Gambar 2 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/images/mandalika.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Mandalika</p>
            </div>
          </div>

          {/* Gambar 3 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/images/borobudur.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Borobudur</p>
            </div>
          </div>

          {/* Gambar 4 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/images/labuanbajo.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Labuan Bajo</p>
            </div>
          </div>

          {/* Gambar 5 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/images/danautoba.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Danau Toba</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mengenal Kami Lebih Dekat Section */}
      <section className="py-8 bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative text-center mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            MENGENAL KAMI LEBIH DEKAT
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-justify">
            Explorenesia adalah aplikasi travel yang memberikan rekomendasi
            perjalanan terbaik ke destinasi unggulan Indonesia. Temukan
            pengalaman terbaik di Likupang, Mandalika, Borobudur, Labuan Bajo,
            dan Danau Toba — lima Destinasi Pariwisata Super Prioritas (DPSP)
            Indonesia.
          </p>
          <button
            className="text-[#FE7123] justify-center rounded-md text-sm ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
          text-secondary-foreground h-10 px-4 py-2 border-4 border-orange-200 hover:bg-orange-100 
          sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] lg:text-lg z-10 mx-auto flex items-center gap-1 
          font-bold shadow-md shadow-black-400 hover:text-blue mt-4 mb-4 bg-white"
          >
            Hubungi Kami
          </button>
        </div>
        <div className="mx-auto max-w-2xl bg-white mt-8 shadow-lg rounded-lg">
          <div
            className={`w-full lg:h-72 md:h-64 sm:h-52 shadow-lg rounded-lg overflow-hidden relative transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={destinations[currentImageIndex].image}
              alt={destinations[currentImageIndex].name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Keuntungan Menggunakan Robota Section */}
      <section className="bg-white text-center py-16" id="fitur">
        <h1 className="lg:text-4xl md:text-4xl sm:text-4xl uppercase font-bold mb-6 bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Fitur Unggulan Explorenesia
        </h1>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-auto sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-4">
          <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-auto rounded-lg p-4">
            <h1 className="uppercase text-[#FE7123] font-bold lg:text-2xl md:text-2xl sm:text-lg">
              dashboard
            </h1>
            <img
              src="/keuntungan1.png"
              alt="Keuntungan 1"
              className="lg:w-[16rem] md:w-[16rem] sm:w-[12rem]"
            />
            <p className="text-base font-medium">
              Dashboard Performa Wisata memudahkan pengguna untuk memantau
              kinerja destinasi melalui data ulasan dan grafik.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-auto rounded-lg p-4">
            <h1 className="uppercase text-[#FE7123] font-bold lg:text-xl md:text-2xl sm:text-lg">
              Similar Destination
            </h1>
            <img
              src="/keuntungan2.png"
              alt="Keuntungan 2"
              className="lg:w-[16rem] md:w-[16rem] sm:w-[12rem]"
            />
            <p className="text-base font-medium">
              Fitur Similar Destination memberikan rekomendasi destinasi serupa
              berdasarkan preferensi pengguna.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-auto rounded-lg p-4">
            <h1 className="uppercase text-[#FE7123] font-bold lg:text-xl md:text-2xl sm:text-lg">
              rate trend
            </h1>
            <img
              src="/keuntungan3.png"
              alt="Keuntungan 3"
              className="lg:w-[16rem] md:w-[16rem] sm:w-[12rem]"
            />
            <p className="text-base font-medium">
              Dengan Rate Trend, pengguna dapat melihat tren penilaian destinasi
              seiring waktu dan sentimen.
            </p>
          </div>
        </div>
      </section>

      {/* Deteksi Objek Wisata Section */}
      <section className="py-8 bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative text-center mx-auto max-w-2xl ">
          <h1 className="text-2xl font-semibold mb-6 lg:text-4xl md:text-4xl sm:text-4xl">
            DETEKSI OBJEK WISATA
          </h1>
          <div className="flex justify-cente flex-col">
            <p className="max-w-2xl mb-1 text-center">
              Temukan Objek Wisata Impian Anda
            </p>
            <p className="max-w-2xl mb-6 text-center">
              Hanya Menggunakan Foto Saja.
            </p>
          </div>

          {/* Tombol tambah destinasi */}
          <div className="flex justify-center items-center">
      {/* Kontainer untuk memposisikan div ke tengah */}
      <div className="border-2 border-dashed border-gray-600 bg-white rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-50 h-[400px] w-[300px] max-w-[300px] relative">
        <input
          id="picture"
          type="file"
          className="opacity-0 absolute inset-0 cursor-pointer"
          onChange={handleImageChange} // Ketika input berubah, tangani file
        />

        {/* Jika ada gambar, tampilkan preview */}
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="object-contain h-full w-full rounded-lg"
          />
        ) : (
          <>
            <div className="text-3xl">+</div>
            <p>Upload Image Wisata</p>
          </>
        )}
      </div>
    </div>
          <div className="flex justify-center mt-10 gap-8">
            <DialogCamera></DialogCamera>
            {/* <button
              className="text-[#FE7123] rounded-md text-xs ring-offset-background 
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
  text-secondary-foreground h-8 px-3 py-1 border-2 border-orange-200 hover:bg-orange-100 
  sm:h-10 sm:w-28 lg:h-10 lg:w-32 lg:text-sm z-10  
  font-bold shadow-md shadow-black-400 hover:text-blue bg-white"
            >
              Camera
            </button> */}

            <DialogWisata></DialogWisata>
            {/* <Link href="/deteksi-wisata">
            <button
              className="text-[#FE7123] rounded-md text-xs ring-offset-background 
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
  text-secondary-foreground h-8 px-3 py-1 border-2 border-orange-200 hover:bg-orange-100 
  sm:h-10 sm:w-28 lg:h-10 lg:w-32 lg:text-sm z-10   
  font-bold shadow-md shadow-black-400 hover:text-blue bg-white"
            >
              Submit
            </button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Deteksi Keramaian Pengunjung Section */}
      <section className="text-center bg-white py-16" id="destinasi">
        <h2 className="text-4xl uppercase font-bold mb-6  bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Deteksi Keramaian Pengunjung
        </h2>

        <div className="flex justify-center gap-8 w-full px-10 mt-10">
          <div className="flex-1 w-full lg:w-1/2">
            <ChartKeramaian />
          </div>

          <div className="flex-1 w-full lg:w-1/2">
            <ScrollArea>
              <div className="space-y-2">
                {CardDescription.map((destination) => (
                  <DestinationCard
                    key={destination.rank}
                    rank={destination.rank}
                    title={destination.title}
                    location={destination.location}
                    imageUrl={destination.imageUrl}
                    onClick={() => alert("Coming Soon")}
                  />
                ))}
              </div>
              <ScrollBar orientation="vertical" className="cursor-pointer" />
            </ScrollArea>
          </div>
        </div>
      </section>

      {/* Kata - Kata */}
      <section className="bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white text-center py-32">
        <p className="text-2xl font-bold max-w-2xl mx-auto">
          "Visi kami adalah menjadikan Explorenesia sebagai platform terdepan
          dalam memberdayakan industri pariwisata Indonesia. Kami berkomitmen
          untuk membantu wisatawan melalui pemanfaatan teknologi yang inovatif"
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="grid grid-flow-row-dense grid-cols-3">
          <div className="px-4 flex items-start">
            <img
              src="/logo.png"
              alt="Logo Polije"
              width={300}
              className="items-start"
            />
            <img
              src="/logo-explorenesia.png"
              alt="Logo ExploreNesia"
              width={80}
              height={60}
              className="items-start lg:h-20 lg:w-20 md:h-20 md:w-20 sm:h-12 sm:w-12"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-xl font-bold">
              Badan Riset dan Inovasi Nasional (BRIN)
            </p>
            <p className="text-justify">
              Jl. Babarsari, Tambak Bayan, Caturtunggal, Kec. Depok, Kabupaten
              Sleman, Daerah Istimewa Yogyakarta 55281
            </p>
          </div>

          <div className="text-end px-4">
            <p className="text-xl font-bold">PT GLOBAL DATA INSPIRASI</p>
            <p className="">
              Jl. Cik di Tiro No.34, Tarban, Kec. Gondokusuman, Kota Yogyakarta,
              Daerah Istimewa Yogyakarta 55223
            </p>
          </div>
        </div>
      </footer>

      <hr className="w-[]" />

      <div className="text-center py-2 text-black bg-white">
        <p className="">&copy;copyright 2024</p>
      </div>
    </div>
  );
}
