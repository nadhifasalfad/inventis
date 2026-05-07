Sistem Pendukung Keputusan Inventaris Toko dengan Metode TOPSIS

---

### Purpose

1. Memudahkan pemilik toko dalam mengambil keputusan untuk restocking barang
2. Mengoptimalkan alokasi pengeluaran untuk restocking barang
3. Mendapatkan gelar sarjana komedi

### Most Viable Product (MVP)

| No  | Feature               | Description                                                                                                                                   |
| --- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Kalkulasi TOPSIS      | Menyajikan hasil perhitungan topsis berdasarkan kriteria yang ditentukan dalam persentase                                                     |
| 2   | Informative Result    | Mendeskripsikan kesimpulan keputusan hasil kalkulasi TOPSIS pada barang tertentu                                                              |
| 3   | Adaptive Safety Stock | Fitur penyesuaian stock aman (safety stock) yang adaptif berdasarkan tingkat penjualan dan anggaran pada toko                                 |
| 4   | Priority Ranking      | Penentuan prioritas produk berdasarkan kalkulasi TOPSIS untuk mendapatkan urutan restock yang paling optimal                                  |
| 5   | Restock Calculator    | Perhitungan jumlah kuantitas restocking berdasarkan kalkulasi TOPSIS untuk mencapai distribusi pengadaan ulang barang inventaris yang efisien |
| 6   | Authentication        | Manajemen user yang terdaftar pada sistem                                                                                                     |
| 7   | Notification          | Informasi real-time lewat popup notifikasi dari browser                                                                                       |

### Scope

1. Metode yang digunakan untuk melakukan perhitungan SPK adalah TOPSIS
2. Akumulasi persentase dari kalkulasi TOPSIS harus sesuai (100%)
3. Sistem hanya memberikan rekomendasi untuk pengadaan stok barang, tidak mencakup transaksi atau perhitungan keuangan toko
4. Kriteria yang digunakan: Tingkat penjualan, Harga barang, Margin, Kriteria Barang (_Slow-moving/fast-moving_)
5. Sistem hanya digunakan untuk toko Banten Jaya Sport Fashion saja, toko lain harus JOKI.

### Role Access

- All User
  - Akses ke hasil perhitungan TOPSIS
- Owner
  - Cetak laporan rekomendasi restock
  - Manajemen pengguna
- Kepala Toko
  - Akses ke database barang
  - Akses parameter perhitungan TOPSIS
- Kepala Gudang
  - Akses paremeter perhitungan TOPSIS
  - Melakukan kalkulasi TOPSIS
  - Akses ke database sub-kriteria
  - Akses ke database barang (_Read-only_)

### Tech Stack

| No  | Tech                | Product               |
| --- | ------------------- | --------------------- |
| `1` | Platform            | Website               |
| `2` | Front-end           | NextJs (Typescript)   |
| `3` | Back-end            | Supabase (PostgreSQL) |
| `4` | Hosting (Prototype) | Vercel Hosting        |

### Objectives

- [x] Menyusun BRD
- [x] Setup Supabase
- [x] Setup NextJs
- [x] Setup Vercel
- [x] Membuat model database
- [ ] Hapus tabel supplier dan fitur manajemen supplier
- [ ] Membuat sistem autentikasi (#6)
- [ ] SEPAKATTTT SAYA SAKIT PANTAT
