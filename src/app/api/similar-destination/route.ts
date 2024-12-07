import { getDataSimilar } from "@/app/lib/mysql/similar-destination-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let tempatWisata = searchParams.get("name");
  let arrTempatWisata: string[] = [];
  let location = "none";

  if (!tempatWisata) {
    return NextResponse.json(
      { status: 400, message: "Missing 'tempat_wisata' query parameter." },
      { status: 400 }
    );
  }

  switch (tempatWisata) {
    case "Borobudur":
      location =
        "Jalan Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah, Indonesia.";
      arrTempatWisata = [
        "Borobudur Temple",
        "Watu Lumbung Hill",
        "Waduk Sempor",
        "Batik Trusmi",
        "Umbul Ponggok",
        "Alien Rocks",
        "Alien Stone",
        "Japanese Cave",
        "Monument to the Heroes of Pancasila Kentungan",
        "Taman Pelangi",
        "Jeep Wisata Merapi - Day Tours",
        "Jeep Merapi Adventure",
        "Campa Tour",
        "Morpheus Spa",
        "Hutan Pinus Bukit Becici",
        "Taman Tirta Spa & Reflexology",
        "Mount Merapi Museum",
        "Breksi Cliff",
        "Cave Tubing Goa Pindul",
        "Slili Beach",
        "UGM Campus Mosque",
        "Ramayana Ballet at Prambanan",
        "Nglanggeran Ancient Volcano",
        "Candi Gedong Songo",
        "Pagoda Avalokitesvara",
        "Yogyakarta Palace",
        "Puncak Tugu Batara Sriten",
        "Nguyahan Beach",
        "Sarangan Beach",
        "Taman Pintar Science Park",
        "Baron Beach",
        "Kalisuci Cave Tubing - Private Day Tours",
        "Cave Tubing Goa Pindul Kang Haris",
        "Pok Tunggal Beach",
        "Drini Beach",
        "Parangtritis Beach",
        "Krakal Beach",
        "Parangkusumo Sand Dunes",
        "Cemara Sewu Beach",
        "Sadranan Beach",
        "Monumen Simpanglima Gumul",
        "Museum Kereta Api Ambarawa",
        "Indrayanti Beach",
        "Jogja Travel Wisata",
        "Wisata Seribu Batu Songgo Langit",
        "Ganjuran Church",
        "Goa Cemara Beach",
        "Tembelan Gorge",
        "Masjid Agung Jami Malang",
        "Pulau Sempu",
        "Ki Ageng Giring III Tomb",
        "Nglambor Beach",
        "Waduk Gajah Mungkur",
        "Gua Maria Kerep",
        "Taman Balekambang",
        "Museum Malang Tempo Doeloe",
        "Sindu Kusuma Edupark",
        "Deret Mahoni",
        "Baron Wetan Beach",
        "Ngrenehan Beach",
        "Jogan Beach",
        "Watu Amben Pandeyan",
        "Nampu Beach",
        "Jungwok Beach",
        "Paralayang Hill, Watugupit",
        "Kalisuci Cave",
        "Sedahan Beach",
        "Baron Techno Park",
        "Umbul Manten",
        "Sri Gethuk Waterfall",
        "Ngingrong Valley",
        "Oya River",
        "Taman Sungai Mudal",
        "Embung Batara Sriten",
        "Museum Majapahit",
        "Progo Rafting",
        "Gardu Pandang Dieng",
        "Candi Sojiwan",
        "Banyu Nibo Waterfall",
        "Gardu Action",
        "Becici Peak",
        "Between Two Gates",
        "Grhatama Pustaka Library",
        "Watu Lawang",
        "Cinere Bellevue Mall",
        "Mal Cinere",
        "Batik Rengganis",
        "Bhumi Merapi Eco Tourism",
        "Blue Lagoon Sendang Tirta Budi",
        "Stonehenge",
        "Kaliurang Park View Post",
        "Klangon Hill",
        "Sisa Hartaku Mini Museum",
        "Spot Riyadi",
        "Tlogo Putri",
        "Flory Village",
        "The Lost World Castle",
        "Affandi Museum",
        "Pantai Klayar",
        "Gua Sriti",
        "Barchan Sand Dune",
        "Punthuk Setumbu",
        "Desa Wisata Nglinggo",
        "Dolandeso Boro",
        "Si Woles Bike Rental & Tours",
        "Jembatan Gantung Selopamioro",
        "Gunung Bromo",
        "Pantai Baru",
        "Yogyatourium",
        "Jungle Paintball Jogja",
        "Ari Tour & Travel",
        "Pura Mangkunegaran",
        "Museum Radya Pustaka",
        "Punthuk Sukmojoyo",
        "Batu Raden",
        "Museum Batik Danar Hadi",
        "Pelabuhan Ratu",
        "Prapanca Batik dan Kerajinan",
        "Gunung Lanang",
        "Pabrik Gula Gondang Winangoen",
        "BLOOM Massage and Reflexology",
        "Goa Tanding",
        "Omah Petroek",
        "Ratu Jogja Transport",
        "Pinus Pengger Nature Tourism",
        "Keraton Kanoman",
        "Dian Tour and Transport",
        "Grojogan Sewu",
        "Goa Jepang",
        "Taman Wisata Gunung Pancar",
        "Pantai Bajul Mati",
        "Jogja Airsoft Battlefield",
        "Cagar Alam Pananjung",
        "Taman Nasional Gunung Merapi Plawangan Turgo",
        "Museum Diponegoro",
        "Situs Keraton Surosowan",
        "Stasiun Kereta Api Bandung",
        "Gua Jatijajar",
        "Benteng Van der Wijck",
        "Stasiun Surabaya Gubeng",
        "Griya Bugar Maguwo",
        "Masjid Soko Tunggal Tamansari",
        "Pantai Kuwaru",
        "Flaurent Timoho",
        "Srigading Massage & Reflexology",
        "Pasar Legi Kota Gede",
        "Gaharu Spa and Fitness",
        "Kraton Surakarta Hadiningrat ",
        "Candi Barong",
        "Candi Bubrah",
        "Ayunan Langit",
        "Blockbuster Movie",
        "Jogja Borobudur Tour",
        "Hutan Pinus Imogiri",
        "Candi Sewu",
        "De Mata Trick Eye 3D Museum",
        "Jogja Bay Pirates Adventure Waterpark",
        "Pantai Timang",
        "Alun-Alun Selatan",
        "Bakpia Pathok 25",
        "Candi Prambanan",
        "Pasar Beringharjo",
        "Candi Borobudur",
        "Bank Indonesia",
        "Pantai Sundak",
        "Pantai Kukup",
        "Museum Geologi",
        "Djemari Reflexologi",
        "Lippo Plaza Jogja",
        "Banyunibo",
        "Makam Raja-Raja Imogiri",
        "Cinema 21",
        "Yogyakarta Monument",
        "Warung Boto",
        "Sosrowijayan Street",
        "Wediombo Beach",
        "Satriya Holiday Jogja",
        "Yogya Driver Tour",
        "Samas Beach",
        "Bukit Panguk Kediwung",
        "Grand Puri Waterpark",
        "Pandansari Beach",
        "Jembatan Sawah Sukorame",
        "Watu Goyang",
        "Bukit Lintang Sewu",
        "Mataram Kings Cemetery Kotagede",
        "Selarong Cave",
        "AJ-Transwisatajogja",
        "Bakpia Jogkem",
        "ETON || INDONESIA ESCAPE",
        "Becici Pine Peak",
        "Paragliding Hill",
        "Mangunan Fruit Farm",
        "Pendhapa Art Space",
        "Djogja Trans",
        "Java Heritage Tour - Day Tours",
        "RoundJava - Private Day Tours",
        "Java Tourism Yogyakarta",
        "AVILO Tour & Travel Yogyakarta",
        "Chauffeur Java ( Yogyakarta)",
        "Waryan Tour",
        "Moana - Yogyakarta's Authentic Bicycle Tour",
        "Jogjaspot Tour",
        "Sahid J-Walk",
        "Pantai Depok",
        "Jogjakarta Driver",
        "Trip Jogja Tour",
        "Gunung Nglanggeran",
        "Pantai Sepanjang",
        "Travellover",
        "Ledok Sambi",
        "Candi Sari",
        "Wisata Sentra Kerajinan Kulit",
        "Goa Pindul Wirawisata - Tur Harian",
        "Kedai Kopi Merapi",
        "Nurkadhatyan Spa",
        "Sandboarding Gumukpasir (Jogja Adventure Trip)",
        "Gua Maria Titris",
        "Air Terjun Grojogan Sewu",
        "Jaya Langgeng",
        "Pulau Timang",
        "D3 Transport Yogya",
        "Pantai Gesing",
        "Embung Nglanggeran",
        "Pindul Cave",
        "Ngandong Beach",
        "Goa Seplawan",
        "Monumen Jenderal Soedirman",
        "Museum Sonobudoyo",
        "Pantai Glagah Indah",
        "Candi Sambisari",
        "Candi Plaosan",
        "De Wave Spa",
        "Waduk Sermo",
        "Discover Yogyakarta",
        "Stasiun Kereta Api Kota Baru Malang",
        "Gua Pindul",
        "Batik Seno",
        "Pantai Siung",
        "Ngobaran Beach",
        "Alun Alun Selatan",
        "Dion Jogja Driver",
        "Mangrove Forest Kulon Progo",
        "Dowa Bag & Factory",
        "Pojok Benteng Wetan",
        "Kids Fun Park",
        "Museum HM Soeharto",
        "Air Terjun Kedung Pedut",
        "Fort Vredeburg Museum",
        "Taman Budaya Yogyakarta",
        "Tea Spa",
        "Bunker Kaliadem Merapi",
        "Plengkung Gading",
        "Merapi Park",
        "Raminten Cabaret Show",
        "Perjalanan Kereta Sencaka Pagi",
        "Istana Kepresidenan Jogjakarta",
        "Museum Sandi",
        "Batik Rumah",
        "Monumen Serangan Umum 1 Maret",
        "Chocolate Monggo Factory Outlet",
        "Galeria Mall",
        "De Arca Museum",
        "Museum Dirgantara Mandala",
        "The Phoenix Hotel Gym & Spa",
        "Yogyakarta Travel Agency - Affordable Tours",
        "Pantai Watu Lumbung",
        "Chocolate Monggo Tirtodipuran",
        "Tour dan Travel Satu Dunia",
        "Pasar Ngasem",
        "OBO Day Spa",
        "Pantai Drini",
        "Curug Kembang Soka",
        "Yoyokk Yogjakarta Driver",
        "Nasional Museum Jogya",
        "Pule Payung",
        "Museum Anak Kolong Tangga",
        "Tembi Rumah Budaya",
        "Bakpia Djava",
        "Batik Soenardi",
        "Goa Maria Sendangsono",
        "Grha Sabha Pramana",
        "Mirota Batik",
        "Ayaartta Family Spa",
        "Candi LumbungGua Cerme",
        "Pakej Percutian Jogja",
        "Abadi Tour Jogja",
        "Travel Mates",
        "Pasar Kranggan",
        "Sumur Gumuling",
        "Desa Wisata Kasongan",
        "Jogja Daily Tour",
        "Lepo Waterfall",
        "Taman Sari Gunongan",
        "Keraton Kasepuhan",
        "Top Selfie Pinusan",
        "Pantai Watu Kodok",
        "Stasiun Besar Purwokerto",
        "Pasar Klewer",
        "Umbul Sidomukti",
        "Alun-Alun Banjarnegara",
        "Masjid Agung Surakarta",
        "Gunung Marapi",
        "Stasiun Purworejo",
        "Taman Sari Gua Sunyaragi",
        "Jogja Tour Murah",
        "Alun-Alun Cilacap",
        "Candi Pawon",
        "Kusuma Agro Wisata",
        "Gua Gong",
        "Amazing Art World",
        "Old City 3D Trick Art Museum",
        "Cibalung Happy Land",
        "Taman Mini Indonesia Indah",
        "Hamzah Batik",
        "Wisata Alam Kalibiru",
        "Candi Ijo",
        "Museum Ullen Sentalu",
        "Puncak Suroloyo ",
        "Pantai Bekah ",
        "Embung Kleco",
        "Alvaro Transport",
        "Canting Mas Puncak Dipowono",
        "Batik Sidomukti",
        "Batik Srikawati",
        "Bukit Kosakora",
        "Ketep Pass",
        "Goa Pindul Gelaran",
        "Taman Tebing Breksi",
        "Embung Tambakboyo",
        "Candi Arjuna",
        "Kampoeng Batik Laweyan",
        "Benteng Pendem",
        "Danau Rawa Pening",
        "Pusat Perikanan Muara Angke",
        "Pia Cap Mangkok",
        "Dalem Kalitan",
        "Monumen Jalesveva Jayamahe",
        "Pantai Suwuk",
        "Pantai Parangtritis",
        "Kota Gede",
        "Monumen Jogja Kembali",
        "Jalan Malioboro",
        "Gunung Merapi",
        "Moana - Sustainable Bicycle Tour",
        "Istana Air Tamansari",
        "Tugu Yogyakarta",
        "Stasiun Yogyakarta",
        "Masjid Gede Kauman",
        "Museum Benteng Vredeburg",
        "Bukit Bintang",
        "Jogja City Mall",
        "Plaza Ambarrukmo",
        "Goa Jomblang",
        "Titik 0 Kilometer Yogyakarta",
        "Candi Ratu Boko",
        "Kebun Binatang Gembira Loka",
        "Candi Kalasan",
        "Pantai Indrayanti",
        "Alun Alun Utara",
        "Wisata Alam Pinus Pengger",
        "Kebun Buah Mangunan Yogyakarta",
        "Malioboro Mall",
        "Museum Kereta Keraton",
        "Sendratari at Candi Prambanan Tickets",
        "Jogja Bay Waterpark Tickets",
        "Jeep Wisata Merapi - Tur Harian",
        "Hartono Mall Yogyakarta",
        "Tiket Jeep Lava Tour Merapi",
        "Snack Wonderland Yogyakarta Tickets",
        "kidzooona Hartono Mall Yogyakarta Tickets",
        "kidzooona Jogja City Mall Tickets",
        "Lava Tour Merapi (Lava Tour Merapi, Candi Plaosan,",
        "Timezone Plaza Ambarrukmo ",
        "Kingsfun Hartono Mall Yogyakarta Rp70k Card Top-up",
        "Sunrise Panguk Hill, Mojo Hill, Hobbit's House, an",
        "History of Java Museum Tickets",
        "Funworld Malioboro Mall Card Top-up",
        "Sindu Kusuma Edupark Tickets",
        "Abhiseka Tour",
        "Amazone Jogja City Mall Card Top-up",
        "Kids Fun Parcs Yogyakarta Tickets",
        "Tiket Candi Ratu Boko",
        "Merapi Jeep Adventure",
        "Retreat Spa at Eastparc Hotel",
        "Woman and Woman Spa",
        "Jogja Adventure Tour",
        "SAARAH Day Spa",
        "Jogja Visit Tour",
        "Arjuna Wisata Jogja",
        "Parangtritis Geomaritime Science Park",
        "Suhune Transport Jogja",
        "Borobudur Sunrise",
        "Wit Bamboe Massage",
        "Bale Kuda Stable",
        "Jogja Java Driver",
        "Goong2000",
        "Lawang Pethuk Kotagede",
        "Alga Lova Tour",
        "Sofra Bistro",
        "Unyq Batiq",
        "Enjoy Your Holiday Jogja",
        "Mandira Baruga",
        "Paramita Tours & Travel",
        "Candi Selogriyo",
        "Purpa Fine Art Gallery",
        "Tripolished",
        "Gerai & Museum Cokelat nDalem",
        "Bar Vino",
        "TW Driver Jogja",
        "Tamansari Puspa Spa",
        "Jogja Walking Tour",
        "Kebun Teh Nglinggo",
        "Taman Sari Royal Heritage Spa Yogyakarta",
        "Monggo Relax",
        "Sakapatat Brew House & Resto",
        "Sendratari RAMAYANA",
        "Museum Batik Yogyakarta",
        "Menunggang kuda Havana",
        "Java Temple Trip",
        "Andelis Tour",
        "Master Holiday",
        "Puncak 9 Bukit Ngisis Ticket in Kulon Progo",
        "Taman Pelangi Yogyakarta Admission Ticket",
        "Trans Studio Mini Maguwo Jogja",
        "Sendratari Roro Jonggrang at Prambanan",
        "Keraton Ratu Boko",
        "Sendratari Ramayana Ballet at Prambanan",
        "Candi Borobudur Tickets",
        "Tiket Candi Prambanan",
        "Ramayana Ballet Purawisata Jogja Tickets",
        "Museum Affandi",
        "Kainnesia - Kain Tenun Indonesia",
        "Oryza Sedayu A8 Pedusan Bantul",
        "Khabil Store",
        "Gemas Batik Special Region Of Yogyakarta",
        "Adelaide Craft Rajut",
        "Rumah Jahit Salima",
        "Temoto Sprei By Ulfah Sprei Q",
        "Natural Eco Fashion",
        "Lava Tour Merapi - Empat Roda",
        "Batiktulis Bimasaktitien.",
        "Its Fun Outfit",
        "Yanto Craft",
        "Ms_13",
        "Parjono Keramik",
        "CitraGrand Mutiara Waterpark Tickets",
        "Timezone Play N' Learn Sleman City Hall Tickets",
        "Rizqie Aksesories",
        "Sewa Skuter Listrik Malioboro Jogja by SkuterAja",
        "Waterboom Jogja",
        "Vanny Snack",
        "Kopinang Indische Koffie",
        "Green Village Gedangsari",
        "HeHa Ocean View",
        "Museum Tani Imogiri",
        "Ziava Tour Travel",
        "TRIP JAVANESIA INDONESIA",
        "Sabila Farm",
        "Travel Wisata Jogja",
        "Puspita Transport",
        "Monumen Palagan Tumpak Rinjing",
        "Resoinangun Garden",
        "Studio Sinten",
        "Gomodo Technologies",
        "Jogja Tour Vacation",
        "Pantai Kesirat",
        "Situs Warungboto",
        "Mesjid Kotagede",
        "Yogyakarta Driver Anton",
        "Denggung Sleman Square",
        "Ninoq Family Spa",
        "Java Eco Tour",
        "Waduk Bening",
        "Bukit Mojo Gumelem",
        "Randu Sari Waterfall",
        "Sunflower Garden Bantul",
        "The Infinity Sky Bar",
        "Jembatan Api Api",
        "Hello Family KTV Jogja",
        "Kampung Ketandan",
        "Museum Ambarrukmo",
        "Air terjun Sidoharjo",
        "Kampoeng Cyber",
        "Bendungan Tegal",
        "Plawangan Hill",
        "Pantai Sadeng",
        "Timang Tour",
        "Sayana Salon and SPA",
        "Jogja Tour Transport",
        "History of Java Museum",
        "Pasar Burung Yogyakarta",
        "Gua Maria Sendangsono, Kulon Progo",
        "Watu Giring",
        "Pantai Ngitun",
        "Gua Maria Tritis",
        "Ngeden Beach",
        "Watulawang Beach",
        "Kedung Kandang Waterfall",
        "Nguluran Beach",
        "Cafe Herbal Jamu Godhog",
        "Senen Cave",
        "Wunung Giri Sela Kandha",
        "Ketoprak Tobong Kelana Bhakti Budaya",
        "Nakamura The Healing Touch - Ambarukmo Plaza",
        "Indies Tour",
        "Merapi Golf Yogyakarta",
        "Paseban Square Bantul",
        "Banyu Nibo Sanggrahan II Waterfall",
        "Dntrans Wisata Jogja",
        "Museum Dewantara Kirti Griya",
        "Prawoto Alat Dan Bahan Batik",
        "D&L Family Spa",
      ];
      break;
    case "Likupang":
      location =
        "Kecamatan Likupang Timur, Kabupaten Minahasa Utara, Provinsi Sulawesi Utara, Indonesia.";
      arrTempatWisata = [
        "Pantai Paal",
        "Pampang Cultural Park",
        "Plaza Mulia",
        "Istana Kesultanan Gunung Tabur",
        "Museum Kesultanan Ternate",
      ];
      break;
    case "Mandalika":
      location =
        "Kecamatan Pujut, Kabupaten Lombok Tengah, Provinsi Nusa Tenggara Barat, Indonesia.";
      arrTempatWisata = [
        "Sirkuit Internasional Pertamina Mandalika",
        "Jatiluwih Warisan Budaya Dunia",
        "Upside Down World",
        "Beachwalk XXI Cineplex Bali",
        "Pantai Petitenget",
        "Trekking Rinjani Lombok",
        "Rinjani Trekking Farm",
        "Galeri Positive Negative Visual",
      ];
      break;
    case "Labuan Bajo":
      location =
        "Desa Labuan Bajo, Kecamatan Komodo, Kabupaten Manggarai Barat, Provinsi Nusa Tenggara Timur, Indonesia.";
      arrTempatWisata = ["Gua Batu Cermin"];
      break;
    case "Danau Toba":
      location =
        "Kecamatan Haranggaol Horisan, Kabupaten Simalungun, Provinsi Sumatera Utara, Indonesia.";
      arrTempatWisata = [
        "Danau Toba",
        "Pantai Panjang",
        "Benteng Fort de Kock",
        "Istana Siak",
        "Makam Juang Mandor",
        "Jembatan Barelang",
        "Jam Gadang Bukittinggi",
        "Bukit Cendana",
        "Harry Potter: A Forbidden Forest Experience",
      ];
      break;
    case "Candi Prambanan":
      location =
        "Jalan Raya Solo - Yogyakarta, Kecamatan Prambanan, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Candi Prambanan"];
      break;
    case "Candi Ratu Boko":
      location =
        "Jalan Raya Piyungan - Prambanan, Kecamatan Bokoharjo, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Candi Ratu Boko"];
      break;
    case "Candi Gedong Songo":
      location =
        "Krajan, Kecamatan Banyukuning, Kabupaten Semarang, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Candi Gedong Songo"];
      break;
    case "Candi Ijo":
      location =
        "Jalan Candi Ijo, Kecamatan Sambirejo, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Candi Ijo"];
      break;
    case "Candi Sambisari":
      location =
        "Jalan Candi Sambisari, Kecamatan Purwomartani, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Candi Sambisari"];
      break;
    case "Candi Plaosan":
      location =
        "Jalan Candi Plaosan, Kecamatan Bugisan, Kabupaten Klaten, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Candi Plaosan"];
      break;
    case "Candi Arjuna":
      location =
        "Dieng Kulon, Kecamatan Batur, Kabupaten Banjarnegara, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Candi Arjuna"];
      break;
    case "Candi Sewu":
      location =
        "Jalan Raya Prambanan, Kecamatan Bugisan, Kabupaten Klaten, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Candi Sewu"];
      break;
    case "Candi Pawon":
      location =
        "Brojonalan, Kecamatan Wanurejo, Kabupaten Magelang, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Candi Pawon"];
      break;
    case "Candi Kalasan":
      location =
        "Kalibening, Kecamatan Tirtomartani, Kabupaten Sleman, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Candi Kalasan"];
      break;
    case "Jatiluwih Warisan Budaya Dunia":
      location =
        "Desa Jatiluwih, Kecamatan Penebel, Kabupaten Tabanan, Provinsi Bali, Indonesia.";
      arrTempatWisata = ["Jatiluwih Warisan Budaya Dunia"];
      break;
    case "Upside Down World":
      location =
        "Jalan Bypass Ngurah Rai, Kecamatan Denpasar Selatan, Kota Denpasar, Provinsi Bali, Indonesia.";
      arrTempatWisata = ["Upside Down World"];
      break;
    case "Beachwalk XXI Cineplex Bali":
      location =
        "Jalan Pantai Kuta, Kecamatan Kuta, Kabupaten Badung, Provinsi Bali, Indonesia.";
      arrTempatWisata = ["Beachwalk XXI Cineplex Bali"];
      break;
    case "Trekking Rinjani Lombok":
      location =
        "Kecamatan Sembalun, Kabupaten Lombok Timur, Provinsi Nusa Tenggara Barat, Indonesia.";
      arrTempatWisata = ["Trekking Rinjani Lombok"];
      break;
    case "Rinjani Trekking Farm":
      location =
        "Desa Senaru, Kecamatan Bayan, Kabupaten Lombok Utara, Provinsi Nusa Tenggara Barat, Indonesia.";
      arrTempatWisata = ["Rinjani Trekking Farm"];
      break;
    case "Galeri Positive Negative Visual":
      location =
        "Jalan Petitenget, Kecamatan Kuta Utara, Kabupaten Badung, Provinsi Bali, Indonesia.";
      arrTempatWisata = ["Galeri Positive Negative Visual"];
      break;
    case "Pampang Cultural Park":
      location =
        "Kecamatan Pampang, Kota Samarinda, Provinsi Kalimantan Timur, Indonesia.";
      arrTempatWisata = ["Pampang Cultural Park"];
      break;
    case "Istana Kesultanan Gunung Tabur":
      location =
        "Desa Gunung Tabur, Kecamatan Gunung Tabur, Kabupaten Berau, Provinsi Kalimantan Timur, Indonesia.";
      arrTempatWisata = ["Istana Kesultanan Gunung Tabur"];
      break;
    case "Museum Kesultanan Ternate":
      location =
        "Jalan Sultan Babullah, Kecamatan Ternate Selatan, Kota Ternate, Provinsi Maluku Utara, Indonesia.";
      arrTempatWisata = ["Museum Kesultanan Ternate"];
      break;
    case "Pantai Klayar":
      location =
        "Desa Donorojo, Kecamatan Donorojo, Kabupaten Jepara, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Pantai Klayar"];
      break;
    case "Pantai Panjang":
      location =
        "Desa Suak Ribee, Kecamatan Meureubo, Kabupaten Aceh Barat, Provinsi Aceh, Indonesia.";
      arrTempatWisata = ["Pantai Panjang"];
      break;
    case "Pantai Kukup":
      location =
        "Desa Kemadang, Kecamatan Tanjungsari, Kabupaten Gunung Kidul, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pantai Kukup"];
      break;
    case "Pantai Parangtritis":
      location =
        "Desa Parangtritis, Kecamatan Kretek, Kabupaten Bantul, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pantai Parangtritis"];
      break;
    case "Pantai Sundak":
      location =
        "Desa Sidoharjo, Kecamatan Tepus, Kabupaten Gunung Kidul, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pantai Sundak"];
      break;
    case "Pantai Timang":
      location =
        "Desa Duwet, Kecamatan Tepus, Kabupaten Gunung Kidul, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pantai Timang"];
      break;
    case "Pantai Glagah Indah":
      location =
        "Desa Glagah, Kecamatan Temon, Kabupaten Kulon Progo, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pantai Glagah Indah"];
      break;
    case "Danau Rawa Pening":
      location =
        "Desa Tuntang, Kecamatan Tuntang, Kabupaten Semarang, Provinsi Jawa Tengah, Indonesia.";
      arrTempatWisata = ["Danau Rawa Pening"];
      break;
    case "Benteng Fort de Kock":
      location =
        "Jalan Juanda, Kecamatan Bukittinggi, Kota Bukittinggi, Provinsi Sumatera Barat, Indonesia.";
      arrTempatWisata = ["Benteng Fort de Kock"];
      break;
    case "Istana Siak":
      location =
        "Jalan Sultan Syarif Kasim, Kecamatan Siak, Kabupaten Siak, Provinsi Riau, Indonesia.";
      arrTempatWisata = ["Istana Siak"];
      break;
    case "Makam Juang Mandor":
      location =
        "Desa Mandor, Kecamatan Mandor, Kabupaten Landak, Provinsi Kalimantan Barat, Indonesia.";
      arrTempatWisata = ["Makam Juang Mandor"];
      break;
    case "Jembatan Barelang":
      location =
        "Jembatan Barelang, Kecamatan Sagulung, Kota Batam, Provinsi Kepulauan Riau, Indonesia.";
      arrTempatWisata = ["Jembatan Barelang"];
      break;
    case "Jam Gadang Bukittinggi":
      location =
        "Jalan Soekarno Hatta, Kecamatan Bukittinggi, Kota Bukittinggi, Provinsi Sumatera Barat, Indonesia.";
      arrTempatWisata = ["Jam Gadang Bukittinggi"];
      break;
    case "Bukit Cendana":
      location =
        "Desa Cendana, Kecamatan Cendana, Kabupaten Aceh Tengah, Provinsi Aceh, Indonesia.";
      arrTempatWisata = ["Bukit Cendana"];
      break;
    case "Pulau Sempu":
      location =
        "Desa Tambakrejo, Kecamatan Sumbermanjing Wetan, Kabupaten Malang, Provinsi Jawa Timur, Indonesia.";
      arrTempatWisata = ["Pulau Sempu"];
      break;
    case "Pulau Timang":
      location =
        "Desa Sidoharjo, Kecamatan Tepus, Kabupaten Gunungkidul, Provinsi Daerah Istimewa Yogyakarta, Indonesia.";
      arrTempatWisata = ["Pulau Timang"];
      break;
    default:
      arrTempatWisata = [];
      break;
  }

  try {
    const data = await getDataSimilar(arrTempatWisata, location);
    return NextResponse.json(
      { status: 200, message: "Success", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to fetch average rating." },
      { status: 500 }
    );
  }
}
