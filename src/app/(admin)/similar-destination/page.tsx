"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { string } from "zod";

// Tipe data untuk destinasi
type Destination = {
  name: string;
  image: string;
};

// Tipe untuk detail informasi destinasi
type DetailType = {
  ratePrice: string;
  performa: any;
  responseRate: string;
  reviews: number;
  popularity: number;
  overallRating: number;
  location: string;
};

// Daftar destinasi DPSP yang tersedia
const dpspDestinations: Destination[] = [
  { name: "Borobudur", image: "/borobudur.jpg" },
  { name: "Mandalika", image: "/mandalika.jpg" },
  { name: "Likupang", image: "/likupang.jpg" },
  { name: "Danau Toba", image: "/danautoba.jpg" },
  { name: "Labuan Bajo", image: "/labuanbajo.jpg" },
];

const borobudurComparison: Destination[] = [
  { name: "Candi Prambanan", image: "/prambanan.jpg" },
  { name: "Candi Ratu Boko", image: "/ratuboko.jpg" },
  { name: "Candi Gedong Songo", image: "/gedongsongo.jpg" },
  { name: "Candi Ijo", image: "/ijo.jpg" },
  { name: "Candi Sambisari", image: "/sambisari.jpg" },
  { name: "Candi Plaosan", image: "/plaosan.jpg" },
  { name: "Candi Arjuna", image: "/arjuna.jpg" },
  { name: "Candi Sewu", image: "/sewu.jpg" },
  { name: "Candi Pawon", image: "/pawon.jpg" },
  { name: "Candi Kalasan", image: "/kalasan.jpg" },
];

const borobudurNames = [
  "Borobudur",
  "Candi Prambanan",
  "Candi Ratu Boko",
  "Candi Gedong Songo",
  "Candi Ijo",
  "Candi Sambisari",
  "Candi Plaosan",
  "Candi Arjuna",
  "Candi Sewu",
  "Candi Pawon",
  "Candi Kalasan",
];

const mandalikaComparison: Destination[] = [
  { name: "Jatiluwih Warisan Budaya Dunia", image: "/jatiluwih.jpg" },
  { name: "Upside Down World", image: "/upsidedown.jpg" },
  { name: "Beachwalk XXI Cineplex Bali", image: "/beachwalk.jpg" },
  { name: "Trekking Rinjani Lombok", image: "/rinjani.jpg" },
  { name: "Rinjani Trekking Farm", image: "/farm.jpg" },
  { name: "Galeri Positive Negative Visual", image: "/galeri.jpg" },
];

const mandalikaNames = [
  "Mandalika",
  "Jatiluwih Warisan Budaya Dunia",
  "Upside Down World",
  "Beachwalk XXI Cineplex Bali",
  "Trekking Rinjani Lombok",
  "Rinjani Trekking Farm",
  "Galeri Positive Negative Visual",
];

const likupangComparison: Destination[] = [
  { name: "Pampang Cultural Park", image: "/pampang.jpg" },
  { name: "Istana Kesultanan Gunung Tabur", image: "/istana.jpg" },
  { name: "Museum Kesultanan Ternate", image: "/museum.jpg" },
  { name: "Pantai Klayar", image: "/klayar.jpg" },
  { name: "Pantai Panjang", image: "/panjang.jpg" },
  { name: "Pantai Kukup", image: "/kukup.jpg" },
  { name: "Pantai Parangtritis", image: "/parangtritis.jpg" },
  { name: "Pantai Sundak", image: "/sundak.jpg" },
  { name: "Pantai Timang", image: "/timang.jpg" },
  { name: "Pantai Glagah Indah", image: "/glagah.jpg" },
];

const likupangNames = [
  "Likupang",
  "Pampang Cultural Park",
  "Istana Kesultanan Gunung Tabur",
  "Museum Kesultanan Ternate",
  "Pantai Klayar",
  "Pantai Panjang",
  "Pantai Kukup",
  "Pantai Parangtritis",
  "Pantai Sundak",
  "Pantai Timang",
  "Pantai Glagah Indah",
];

const danautobaComparison: Destination[] = [
  { name: "Danau Rawa Pening", image: "/rawapening.jpg" },
  { name: "Pantai Panjang", image: "/panjang.jpg" },
  { name: "Benteng Fort de Kock", image: "/fort.jpg" },
  { name: "Istana Siak", image: "/siak.jpg" },
  { name: "Makam Juang Mandor", image: "/mandor.jpg" },
  { name: "Jembatan Barelang", image: "/barelang.jpg" },
  { name: "Jam Gadang Bukittinggi", image: "/gadang.jpg" },
  { name: "Bukit Cendana", image: "/cendana.jpg" },
];

const danautobaNames = [
  "Danau Toba",
  "Danau Rawa Pening",
  "Pantai Panjang",
  "Benteng Fort de Kock",
  "Istana Siak",
  "Makam Juang Mandor",
  "Jembatan Barelang",
  "Jam Gadang Bukittinggi",
  "Bukit Cendana",
];

const labuanbajoComparison: Destination[] = [
  { name: "Pulau Sempu", image: "/sempu.jpg" },
  { name: "Pulau Timang", image: "/timang.jpg" },
  { name: "Pantai Klayar", image: "/klayar.jpg" },
  { name: "Pantai Panjang", image: "/panjang.jpg" },
  { name: "Pantai Kukup", image: "/kukup.jpg" },
  { name: "Pantai Parangtritis", image: "/parangtritis.jpg" },
  { name: "Pantai Sundak", image: "/sundak.jpg" },
  { name: "Pantai Timang", image: "/timang.jpg" },
  { name: "Pantai Glagah Indah", image: "/glagah.jpg" },
];

const labuanbajoNames = [
  "Labuan Bajo",
  "Pulau Sempu",
  "Pulau Timang",
  "Pantai Klayar",
  "Pantai Panjang",
  "Pantai Kukup",
  "Pantai Parangtritis",
  "Pantai Sundak",
  "Pantai Timang",
  "Pantai Glagah Indah",
];

let options: Destination[] = dpspDestinations;

// Komponen untuk menampilkan detail destinasi
const DestinationDetails = ({
  name,
  showDetails,
  toggleDetails,
}: {
  name: string;
  showDetails: boolean;
  toggleDetails: () => void;
}) => {
  const [details, setDetails] = useState<DetailType>();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `/api/similar-destination?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();
      setDetails(data.data);
      if (borobudurNames.includes(name)) {
        options = borobudurComparison;
      } else if (mandalikaNames.includes(name)) {
        options = mandalikaComparison;
      } else if (likupangNames.includes(name)) {
        options = likupangComparison;
      } else if (danautobaNames.includes(name)) {
        options = danautobaComparison;
      } else if (labuanbajoNames.includes(name)) {
        options = labuanbajoComparison;
      } else {
        options = dpspDestinations;
      }
    };

    fetchDetails();
  }, [name]);

  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-4 text-center shadow-md bg-white h-auto w-[300px] max-w-[300px]">
      <img
        src={`/images/${name.replace(/\s+/g, "").toLowerCase()}.jpg`}
        alt={name}
        className="h-40 w-full object-cover mb-2 rounded"
      />
      <h3 className="font-bold text-lg mb-2 text-black">{name}</h3>
      <button
        className="text-blue-500 hover:underline mb-2"
        onClick={toggleDetails}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && details && (
        <div className="text-center text-sm mt-2 text-black">
          <p>
            <strong>Rate Price:</strong> {details.ratePrice}
          </p>
          <p>
            <strong>Performa:</strong> {Math.round(details.performa * 10) / 10}{" "}
            ⭐
          </p>
          <p>
            <strong>Tingkat Response:</strong> {details.responseRate}
          </p>
          <p>
            <strong>Ulasan:</strong> {details.reviews}
          </p>
          <p>
            <strong>Popularitas:</strong> {details.popularity}%
          </p>
          <p>
            <strong>Penilaian Keseluruhan:</strong> {details.overallRating}
          </p>
          <p>
            <strong>Location:</strong> {details.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default function CompetitorPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]); // Menyimpan destinasi yang dipilih
  const [showPopup, setShowPopup] = useState(false); // Mengontrol tampilan popup
  const [searchTerm, setSearchTerm] = useState(""); // Menyimpan input pencarian
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  ); // Menyimpan state show/hide untuk setiap destinasi

  // Menghapus destinasi dari daftar
  const handleRemoveDestination = (indexToRemove: number) => {
    setDestinations(destinations.filter((_, index) => index !== indexToRemove));
    if (indexToRemove === 0) {
      options = dpspDestinations;
    }
  };

  // Membuka popup pencarian
  const openPopup = () => {
    setShowPopup(true);
  };

  // Mencari destinasi yang cocok berdasarkan input pencarian
  const filteredDestinations = options.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menambahkan destinasi ke dalam daftar dan menutup popup
  const handleSelectDestination = (destination: Destination) => {
    setDestinations([...destinations, destination]);
    setShowPopup(false);
  };

  // Fungsi untuk toggle show/hide detail destinasi
  const toggleDetails = (name: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <ContentLayout title="Similar Destination">
      <div className=" flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-6">
          {/* Kotak destinasi yang dipilih */}
          {destinations.map((dest, index) => (
            <div key={index} className="relative h-auto">
              <DestinationDetails
                name={dest.name}
                showDetails={showDetails[dest.name] || false}
                toggleDetails={() => toggleDetails(dest.name)}
              />
              {/* Tombol hapus */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveDestination(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Tombol tambah destinasi */}
          {destinations.length < 3 && (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-50 h-[400px] w-[300px] max-w-[300px]"
              onClick={openPopup}
            >
              <div className="text-3xl">+</div>
              <p>Add Similar Destination</p>
            </div>
          )}
        </div>

        {/* Popup pencarian destinasi */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center text-black">
            <Command className="bg-white p-6 rounded-lg shadow-lg w-96 h-96">
              <CommandInput
                placeholder="Search destination..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                {/* Menampilkan pesan jika tidak ada hasil */}
                <CommandEmpty>No results found.</CommandEmpty>
                {/* Menampilkan hasil pencarian */}
                <CommandGroup heading="Destinations">
                  {filteredDestinations.map((dest, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelectDestination(dest)}
                      className="cursor-pointer"
                    >
                      <span>{dest.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              {/* Tombol Save & Cancel */}
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 border-2 rounded-md p-1 hover:bg-gray-50 text-gray-500 hover:text-red-500"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </Command>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
