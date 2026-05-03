export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-sky-700">Inventis Inventory</p>
            <p className="text-xs text-slate-500">Sistem inventaris modern ala WordPress untuk bisnis Anda</p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-700 md:flex">
            <a href="#fitur" className="hover:text-slate-900">Fitur</a>
            <a href="#manfaat" className="hover:text-slate-900">Manfaat</a>
            <a href="#mulai" className="hover:text-slate-900">Mulai</a>
          </nav>
          <a
            href="#mulai"
            className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-slate-900/5 transition hover:bg-slate-800"
          >
            Coba Gratis
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">Inventory untuk semua jenis usaha</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Kelola stok, pesanan, dan aset dengan mudah — seperti dashboard WordPress.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Inventis membantu tim memonitor barang secara real-time, membuat laporan cepat, dan menjaga persediaan tetap rapi tanpa perlu belajar sistem yang rumit.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#mulai"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/5 transition hover:bg-slate-800"
              >
                Mulai Sekarang
              </a>
              <a
                href="#fitur"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Lihat Fitur
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-6 flex items-center justify-between rounded-2xl bg-slate-900 p-4 text-white">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Ringkasan Stok</p>
                <p className="mt-2 text-3xl font-semibold">Sistem Inventory</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">Dashboard</span>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Produk Aktif</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">1.245</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Pesanan Terbaru</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">73</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Nilai Persediaan</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">Rp 152M</p>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="mt-20 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Pelaporan</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Laporan otomatis</h2>
            <p className="mt-3 text-slate-600">Dapatkan ringkasan stok, penjualan, dan kebutuhan pembelian dalam satu klik.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Akses Tim</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Multi pengguna</h2>
            <p className="mt-3 text-slate-600">Atur izin staf, kelola gudang, dan bagikan laporan tanpa repot.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Integrasi</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Mudah terhubung</h2>
            <p className="mt-3 text-slate-600">Siap dipakai bersama toko online, akuntansi, dan sistem penjualan Anda.</p>
          </div>
        </section>

        <section id="manfaat" className="mt-20 rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-14 text-white shadow-xl shadow-slate-900/30">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Manfaat Utama</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Bekerja lebih cepat dengan data inventaris yang jelas.</h2>
              <p className="mt-5 max-w-xl leading-8 text-slate-300">Kurangi kelebihan stok, optimalkan pembelian, dan pastikan setiap barang tercatat dengan baik pada satu platform yang mudah digunakan.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 p-5">
                <p className="text-sm font-semibold text-sky-300">100% Responsif</p>
                <p className="mt-3 text-sm text-slate-300">Tampilan cepat di desktop dan mobile.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-5">
                <p className="text-sm font-semibold text-sky-300">Aman & Terpercaya</p>
                <p className="mt-3 text-sm text-slate-300">Data inventaris aman dalam satu tempat.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="mulai" className="mt-20 rounded-3xl bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Siap untuk memulai?</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Mulai otomatisasi inventaris Anda hari ini.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="#">
                Daftar Sekarang
              </a>
              <a className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50" href="#">
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
