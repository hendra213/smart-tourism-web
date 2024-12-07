# Explorenesia API Spec

## -- Public API --

## 1. Get Destination Details

Endpoint : GET /api/detail-destinasi?tempat_wisata=borobudur

Headers : -

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "averageRating": 4.3828,
    "reviewsByDate": [
      {
        "date": "1 Okt 2023",
        "count": 1
      },
      {
        "date": "6 Okt 2023",
        "count": 1
      }
    ],
    "topKeywords": [
      {
        "text": "sangat bagus",
        "count": 1164
      },
      {
        "text": "luar biasa",
        "count": 981
      },
      {
        "text": "indah sekali",
        "count": 798
      }
    ],
    "responseRate": 100
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 2. Get Destination Detail Review

Endpoint : GET /api/detail-destinasi/ulasan?tempat_wisata=borobudur

Headers : -

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "id": 10423,
      "komentar": "selamat hari raya waisak bagi umat budha yang merayakan ",
      "source": "google",
      "rating": 5,
      "date": "2024-09-04T00:00:00.000Z"
    },
    {
      "id": 12460,
      "komentar": "lebih baik setidaknya sekali",
      "source": "google",
      "rating": 5,
      "date": "2024-09-04T00:00:00.000Z"
    },
    {
      "id": 12458,
      "komentar": "berlaku terlalu mahal untuk orang asing untuk kunjungan ke atas yang hanya berlangsung 30 menituntuk keluar pengunjung harus berjalan melalui pasar jalanan di mana penjual akan mencoba yang terbaik untuk menjual sesuatu kepada andajalan jalan melalui pasar berlangsung hampir seperti ",
      "source": "google",
      "rating": 3,
      "date": "2024-09-04T00:00:00.000Z"
    }
  ]
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 3. Login

Endpoint : POST /api/login

Headers : -

Request Body :

```json
{
  "email": "admin@example.com",
  "password": "12345678"
}
```

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAyLCJlbWFpbCI6Im5hbmFuZ2hlckBnbWFpbC5jb20iLCJuYW1hIjoiTmFuYW5nIEhlcml5YW50byIsInJvbGUiOjIsImV4cCI6MTcyOTQ5MTAzNn0.fEOEPkUMFspg5TL_4Y1J90Ct3bxqQr-PGk8PXiKmKic"
  }
}
```

Response Body Error :

```json
{
  "error": "Email or password is incorrect"
}
```

## Private API

## 1. Get a Sentiment Preview for Maps

Endpoint : GET /api/maps?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "totalReview": 13000,
    "positiveReview": 11600,
    "negativeReview": 900,
    "averageRating": 4.4108
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 2. Get All Sentiments for Dashboard

Endpoint : GET /api/dashboard?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "averageRating": 4.4108,
    "totalReviews": 13007,
    "positivePercentage": 90,
    "reviewsByDate": [
      {
        "date": "6 Okt 2023",
        "count": 1
      },
      {
        "date": "30 Okt 2023",
        "count": 1
      },
      {
        "date": "12 Nov 2023",
        "count": 1
      }
    ],
    "positiveReview": 11693,
    "neutralReview": 392,
    "negativeReview": 922,
    "topKeywords": [
      {
        "text": "sangat bagus",
        "count": 1280
      },
      {
        "text": "luar biasa",
        "count": 1145
      },
      {
        "text": "indah sekali",
        "count": 953
      }
    ],
    "sortedPositiveFeedback": {
      "bagus": 1975,
      "indah": 1672,
      "murah": 770,
      "nyaman": 675,
      "keren": 438
    },
    "sortedNegativeFeedback": {
      "mahal": 392,
      "lama": 273,
      "kotor": 103,
      "bau": 38,
      "buruk": 29
    },
    "googleReview": 3016,
    "tripadvisorReview": 9445,
    "travelokaReview": 513,
    "tiketReview": 33
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 3. Get All Review

Endpoint : GET /api/dashboard/ulasan?tempat_wisata=borobudur&source=google&sentiment=positif&page=1&limit=5)

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "komentar": "tempat bagus dan nyaman",
      "source": "google",
      "rating": 5,
      "date": "2024-09-18T00:00:00.000Z"
    },
    {
      "komentar": "akses menuju ke sirkuit sangat asoooy mulus di situ jga kita bsa memanjakan mata kita dgn memandang view yg begitu istimewa mandalika is the best",
      "source": "google",
      "rating": 5,
      "date": "2024-09-18T00:00:00.000Z"
    },
    {
      "komentar": "mantap",
      "source": "google",
      "rating": 4,
      "date": "2024-09-18T00:00:00.000Z"
    },
    {
      "komentar": "meskipun cmn kerjatp alhmdllh saya bisa lihat langsung motojpjd g penasaran",
      "source": "google",
      "rating": 5,
      "date": "2024-09-18T00:00:00.000Z"
    },
    {
      "komentar": "sangt2 berkesan awalnta cuma mimpi ada sirkuit d lombok tau2 mimpi jadi nyata ",
      "source": "google",
      "rating": 3,
      "date": "2024-09-18T00:00:00.000Z"
    }
  ],
  "total": 2283
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 4. Get Average Performa by Last Ten Date

Endpoint : GET /api/dashboard/performa?tempat_wisata=borobudur&active_tab=google

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "date": "4 Feb 2023",
      "avg": 5
    },
    {
      "date": "5 Feb 2023",
      "avg": 5
    },
    {
      "date": "6 Feb 2023",
      "avg": 5
    },
    {
      "date": "4 Mei 2023",
      "avg": 5
    },
    {
      "date": "25 Sep 2023",
      "avg": 5
    },
    {
      "date": "28 Sep 2023",
      "avg": 5
    },
    {
      "date": "1 Okt 2023",
      "avg": 5
    },
    {
      "date": "6 Okt 2023",
      "avg": 5
    },
    {
      "date": "30 Okt 2023",
      "avg": 5
    },
    {
      "date": "12 Nov 2023",
      "avg": 5
    }
  ]
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 5. Get Total Positive Review by Last Ten Date

Endpoint : GET /api/dashboard/penilaian-positif?tempat_wisata=borobudur&active_tab=tripadvisor

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "date": "4 Feb 2023",
      "count": 2
    },
    {
      "date": "5 Feb 2023",
      "count": 2
    },
    {
      "date": "6 Feb 2023",
      "count": 1
    },
    {
      "date": "4 Mei 2023",
      "count": 7
    },
    {
      "date": "25 Sep 2023",
      "count": 1
    },
    {
      "date": "28 Sep 2023",
      "count": 1
    },
    {
      "date": "1 Okt 2023",
      "count": 1
    },
    {
      "date": "6 Okt 2023",
      "count": 1
    },
    {
      "date": "30 Okt 2023",
      "count": 1
    },
    {
      "date": "12 Nov 2023",
      "count": 1
    }
  ]
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 6. Get Impact Sentiment

Endpoint : GET /api/dashboard/dampak?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "source": "tripadvisor",
      "positivePercentage": 94.58973001588143,
      "neutralPercentage": 0.7411328745367919,
      "negativePercentage": 4.669137109581789
    },
    {
      "source": "traveloka",
      "positivePercentage": 87.91423001949317,
      "neutralPercentage": 2.729044834307992,
      "negativePercentage": 9.35672514619883
    },
    {
      "source": "tiket",
      "positivePercentage": 75.75757575757575,
      "neutralPercentage": 9.090909090909092,
      "negativePercentage": 15.151515151515152
    },
    {
      "source": "google",
      "positivePercentage": 75.69628647214854,
      "neutralPercentage": 10.112732095490715,
      "negativePercentage": 14.190981432360742
    }
  ]
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 7. Get All Praises Review by Positive Word

Endpoint : POST /api/dashboard/praises?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "bagus": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "saya tidak pergi ke balapan apa pun tetapi saya menerbangkan trek balap dengan dronelagu balap terlihat sangat bagus dan saya bisa membayangkan menonton balapan di sana akan luar biasa"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "ya saya mengunjunginya  jika anda ingin pemandu wisata yang bagus daripada cal pak jalal pada gambar terakhir62 81775240793 dia adalah pria yang sangat baik dan sopan dan berbicara juga bahasa inggris "
      }
    ],
    "oke": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "oke boardwalkanak anak dapat mengendarai mobil kecil dan taman bermain yang telah melihat hari hari yang lebih baik"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "pelayanan jelek loket pemalas dan tidak jujur ga mau hitung kembalian dikasih uang tapi ga dikasih tiket mau ditilep mungkin uangnya"
      }
    ],
    "nyaman": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "cermin rock cave indonesia goa batu cermin dapat dikatakan sebagai daya tarik terkenal lainnya di labuan bajo selain air terjunnamun apa yang disebut gua rock mirror sebenarnya hanya sebuah guabocah yang ditelusuri tebal telah melihatnya sebelumnyaada hutan bambu besar di sepanjang jalan dari pintu masuk tempat indah ke pintu masuk guaitu elegan dan sangat keren membuatnya lebih nyaman saat anda berjalansetelah berjalan selama sekitar 10 menit kami mencapai pintu masuk gua jingshitanpa diduga batubatu di gua memiliki bentukbentuk aneh dan datang dalam berbagai warna yang menyilaukan bocah lelaki yang ditebangdinding batu di dekat pintu masuk gua ditempati oleh akar pohon memberikan suasana mencari rahasiapemandu wisata memberi tahu kami bahwa daerah ini adalah dasar laut di zaman kunobuktinya adalah bahwa ada banyak fosil karang dan kehidupan laut lainnya di bebatuanpitch gelap di dalam gua jadi bawa senterada fosil kura kura prasejarah di gua yang sepenuhnya dipertahankan sehingga bahkan kepala dapat diidentifikasi dengan jelasdari waktu ke waktu fosil shell ditemukan di dinding batu seperti museum fosilada fosil ikan prasejarah di dekat pintu masuk gua dan sirip masih terlihat jelasmeskipun tempatnya tidak besar bentuk batu di sini sangat indah dan anda dapat melihat fosil jadi itu pasti patut dikunjungi"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "pergi dengan pemandu tidak mahal hanya 100 ribu untuk 2 orang kalau tidak saya tidak akan merasa begitu nyaman masuk ke gua tanpa pemandukami beruntung menghadapi 2 kalajengking cambuk berekor melihat beberapa jangkrik dan kelelawarrekomendasikan mengunjungi tempat ini"
      }
    ]
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 8. Get All Complaints Review by Negative Word

Endpoint : POST /api/dashboard/comaplaints?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "jelek": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "pelayanan jelek loket pemalas dan tidak jujur ga mau hitung kembalian dikasih uang tapi ga dikasih tiket mau ditilep mungkin uangnya"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "sirkuit terjelek di dunia boring kotor gak ada atap paddock mirip ruko huek"
      },
    ]
    "kotor": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "saya agak menyesal datang untuk menonton motogp di mandalikapenyelenggara acara sangat berbahayapertama tama tidak cukup informasi tentang segalanyastaf semua tidak mengertitoilet sangat kotor tanpa pembersihbagaimana anda bisa menerima toilet tanpa air dengan begitu banyak orang menggunakannyamendapatkan bus antar jemput juga sangat cunfusingorang orang juga tidak terorganisir dengan baik semua orang bergegas untuk mendapatkan pesawat ulang alikpilihan vendor makanan sangat sedikittidak perlu memberi isyarat untuk makanansemua orang hanya bergegas dan memotong garisjuga anda tidak dapat membawa payung sendiri ke acara tersebutcuaca panas lombok membunuh kegembiraan terutama ketika anda berada di daerah reguler tidak ada nuansaanda terpaksa duduk di bawah matahari"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "sirkuit terjelek di dunia boring kotor gak ada atap paddock mirip ruko huek"
      },
    ]
    "bau": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "banyak yg bisa di explore yg bikin bagus krn masih alami didalam pengap dan lembab keluar2 auto lepek hehehe batu2 di luar gua sgt beragam dan unik terutama batu payung dan yg berbentuk pilar panjang yg minus sih toilet ya sudah dibangun bagus2 tapi kurang maintanance agak bau pesing"
      },
      {
        "date": "4 September 2024",
        "ota": "google",
        "comment": "nice beach best time on sunrise pasir putih untuk pesisir pantai bersih air lautnya jernih tapi seputaran pondok kotor banyak sampah toilet bau semoga yang sering ksana jgan ngotorin pantainya yah"
      },
    ],
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 9. Get All Complaints Review by Negative Word

Endpoint : POST /api/dashboard/comaplaints?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "jelek": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "pelayanan jelek loket pemalas dan tidak jujur ga mau hitung kembalian dikasih uang tapi ga dikasih tiket mau ditilep mungkin uangnya"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "sirkuit terjelek di dunia boring kotor gak ada atap paddock mirip ruko huek"
      },
    ]
    "kotor": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "saya agak menyesal datang untuk menonton motogp di mandalikapenyelenggara acara sangat berbahayapertama tama tidak cukup informasi tentang segalanyastaf semua tidak mengertitoilet sangat kotor tanpa pembersihbagaimana anda bisa menerima toilet tanpa air dengan begitu banyak orang menggunakannyamendapatkan bus antar jemput juga sangat cunfusingorang orang juga tidak terorganisir dengan baik semua orang bergegas untuk mendapatkan pesawat ulang alikpilihan vendor makanan sangat sedikittidak perlu memberi isyarat untuk makanansemua orang hanya bergegas dan memotong garisjuga anda tidak dapat membawa payung sendiri ke acara tersebutcuaca panas lombok membunuh kegembiraan terutama ketika anda berada di daerah reguler tidak ada nuansaanda terpaksa duduk di bawah matahari"
      },
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "sirkuit terjelek di dunia boring kotor gak ada atap paddock mirip ruko huek"
      },
    ]
    "bau": [
      {
        "date": "18 September 2024",
        "ota": "google",
        "comment": "banyak yg bisa di explore yg bikin bagus krn masih alami didalam pengap dan lembab keluar2 auto lepek hehehe batu2 di luar gua sgt beragam dan unik terutama batu payung dan yg berbentuk pilar panjang yg minus sih toilet ya sudah dibangun bagus2 tapi kurang maintanance agak bau pesing"
      },
      {
        "date": "4 September 2024",
        "ota": "google",
        "comment": "nice beach best time on sunrise pasir putih untuk pesisir pantai bersih air lautnya jernih tapi seputaran pondok kotor banyak sampah toilet bau semoga yang sering ksana jgan ngotorin pantainya yah"
      },
    ],
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 10. Get Destination Detail for Similar Destination

Endpoint : GET /api/similar-destination?tempat_wisata=borobudur

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "ratePrice": "Coming Soon",
    "performa": 4.3826,
    "responseRate": "100%",
    "reviews": 10417,
    "popularity": 91,
    "overallRating": 9503,
    "location": "Jalan Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah, Indonesia."
  }
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```

## 11. Get Total Review by Last Ten Date for Rate Trend

Endpoint : GET /api/rate-trend?tempat_wisata=borobudur&active_tab=tripadvisor

Headers :

- Authorization : token

Response Body Success :

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "date": "4 Feb 2023",
      "count": 3
    },
    {
      "date": "5 Feb 2023",
      "count": 2
    },
    {
      "date": "6 Feb 2023",
      "count": 1
    },
    {
      "date": "4 Mei 2023",
      "count": 7
    },
    {
      "date": "25 Sep 2023",
      "count": 1
    },
    {
      "date": "28 Sep 2023",
      "count": 1
    },
    {
      "date": "1 Okt 2023",
      "count": 1
    },
    {
      "date": "6 Okt 2023",
      "count": 1
    },
    {
      "date": "30 Okt 2023",
      "count": 1
    },
    {
      "date": "12 Nov 2023",
      "count": 1
    }
  ]
}
```

Response Body Error :

```json
{
  "status": 500,
  "message": "Failed to fetch data."
}
```
