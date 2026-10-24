# Rencana Dinamisasi Porto: UI Pixel tetap, gerak ala Apple

> Disusun 24 Oktober 2026, branch `feat/dynamic-motion`.
> **Yang tidak berubah:** warna tonal gelap Pixel, kartu bento, layout zona, isi, Firebase, routing hash.
> **Yang dirombak:** cara semua itu bergerak, berpindah, dan merespons sentuhan.
> **Status (24 Okt 2026):** M0–M8 selesai di branch ini (belum di-commit). Yang belum: preview gambar mengikuti kursor di daftar arsip (bagian E).

---

## 0. Ringkasan

Porto kamu sudah punya fondasi gerak yang benar. Spring `stiffness 380 / damping 30 / mass 0.8` yang dipakai di mana-mana itu hampir sama dengan token *default spatial* Material 3 Expressive. Rasanya kaku karena tiga hal:

1. **Beberapa animasi tidak jalan sama sekali.** Contohnya, modal tidak punya animasi tutup.
2. **Tidak ada kesinambungan.** Kartu, modal, dan zona tidak saling terhubung secara visual. Setiap perpindahan terasa seperti "loncat".
3. **Semuanya bergerak dengan satu rasa yang sama.** Tidak ada bedanya gerak kecil (tekan tombol) dengan gerak besar (buka detail), dan tidak ada momentum atau gestur.

Rencana ini memakai dua sumber yang memang sesuai dengan tema kamu:

- **Pola transisi Material Motion** (bahasanya Pixel), untuk kesinambungan antar halaman atau zona.
- **Prinsip Fluid Interfaces Apple**: bisa diinterupsi, ikut momentum, dan langsung merespons. Ini untuk rasa interaksinya.

---

## 1. Kenapa sekarang terasa kaku (temuan di kode)

| # | Temuan | Lokasi | Akibatnya |
| --- | --- | --- | --- |
| 1 | `if (!project) return null` dipanggil **sebelum** `<AnimatePresence>`, jadi animasi `exit` tidak pernah jalan | [ProjectModal.tsx:37](../components/ProjectModal.tsx), [CertificateModal.tsx:29](../components/CertificateModal.tsx) | Modal muncul dengan animasi, tapi hilang mendadak saat ditutup. Ini sumber terbesar kesan "patah" |
| 2 | Kartu proyek dan modal tidak terhubung. Modal muncul di tengah layar dari "entah mana" | [Work/index.tsx:384](../sections/Work/index.tsx) | Tidak ada rasa "kartu ini yang membuka diri" |
| 3 | Tidak ada satu pun `whileInView` atau animasi masuk per zona | semua `sections/*` | Saat di-scroll, zona hanya "ada", tidak "datang" |
| 4 | Pindah zona lewat `window.scrollTo({behavior:'smooth'})` bawaan browser | [page.tsx:77](../app/page.tsx) | Kecepatan dan kurvanya ditentukan browser, kasar dan tidak bisa diinterupsi. `lenis` sudah terpasang tapi belum dipakai |
| 5 | Ganti filter (All / Web App / Desktop / tech) membuat kartu muncul dan hilang tanpa animasi layout | [Work/index.tsx:96-111](../sections/Work/index.tsx) | Grid "berkedip" dan posisi kartu meloncat |
| 6 | Klik chip teknologi di Capabilities hanya mengeset filter lalu `scrollIntoView` | [Capabilities/index.tsx:95-102](../sections/Capabilities/index.tsx) | Tidak ada jejak visual bahwa klik itu yang memfilter Work |
| 7 | Deck foto dan galeri Velco hanya bisa diganti lewat tombol, tidak bisa di-swipe | [Dashboard/index.tsx:435](../sections/Dashboard/index.tsx), [Work/index.tsx:271](../sections/Work/index.tsx) | Di HP terasa kaku, tidak ada momentum |
| 8 | Satu spring untuk semua hal, termasuk perubahan warna dan opacity | banyak file | Gerak kecil dan besar terasa sama, tidak ada hierarki |
| 9 | Angka telemetri (119h, 455) langsung muncul jadi, bar bahasa statis | [Dashboard/index.tsx](../sections/Dashboard/index.tsx) | Widget "live" terasa seperti gambar mati |

---

## 2. Hasil riset

### A. Material Motion: 4 pola transisi (bahasa geraknya Pixel)

Sumber: [Material — The motion system](https://material.io/design/motion/the-motion-system.html), [codelab Material Motion](https://codelabs.developers.google.cn/codelabs/material-motion-flutter)

| Pola | Kapan dipakai | Dipakai di porto untuk |
| --- | --- | --- |
| **Container transform** | Satu wadah "berubah bentuk" jadi tampilan berikutnya | Kartu proyek → modal detail, thumbnail sertifikat → modal sertifikat |
| **Shared axis** | Elemen yang punya hubungan urutan atau ruang | Deck foto (geser X), tab Velco (geser X), masuk antar zona saat scroll (sumbu Y) |
| **Fade through** | Elemen tanpa hubungan langsung | Ganti kategori filter, ganti tab timeline About |
| **Fade** | Elemen masuk/keluar layar | Backdrop modal, menu HP, toast |

### B. Material 3 Expressive: spring berlapis

Sumber pihak ketiga yang menyalin token resmi: [motor](https://pub.dev/packages/motor), [material_expressive](https://pub.dev/documentation/material_expressive/0.8.0/). Nilai damping-nya sedikit berbeda antar paket, jadi anggap sebagai titik awal yang disetel lewat mata.

- **Spatial** (posisi, ukuran, layout): boleh sedikit memantul. fast `800 / ζ0.6`, default `380 / ζ0.8`, slow `200 / ζ0.8`
- **Effects** (opacity, warna): tanpa pantulan. fast `3800 / ζ1`, default `1600 / ζ1`, slow `800 / ζ1`
- Ciri khas Expressive: **bentuk berubah saat disentuh**. Tombol pill sedikit "mengotak" saat ditekan, lalu kembali bulat.

### C. Apple: Designing Fluid Interfaces (WWDC 2018)

Ringkasan sekunder: [panduan apple-design (Emil Kowalski)](https://mcpservers.org/vi/agent-skills/emilkowalski/apple-design). Untuk detail, cek video sesi aslinya di developer.apple.com.

1. **Response.** Respons pertama muncul dalam satu frame (tekan langsung mengecil).
2. **Interruptible & redirectable.** Animasi bisa dibatalkan atau dibalik di tengah jalan, mulai dari posisi saat itu. Spring framer-motion sudah bisa ini; kuncinya jangan memakai `duration` tetap untuk gerak spasial.
3. **Momentum.** Kecepatan saat jari dilepas menentukan ke mana elemen berhenti (swipe deck foto, tarik modal untuk menutup).
4. **Spatial consistency.** Sesuatu yang dibuka dari sebuah titik ditutup kembali ke titik yang sama. Ini sama dengan prinsip container transform.

### D. Porto rujukan (fokus ke interaksinya, bukan gayanya)

| Porto | Interaksi yang patut dicontoh |
| --- | --- |
| **Dennis Snellenberg** | Tombol "magnetic" yang sedikit ikut kursor; preview gambar yang mengikuti kursor di daftar proyek; perpindahan halaman berupa tirai yang mulus |
| **Emil Kowalski** (pembuat Vaul & Sonner) | Drawer yang bisa ditarik dengan momentum; toast bertumpuk yang elegan |
| **Rauno Freiberg** | Detail kecil: hover dengan sorotan halus, angka yang "menggulung" |
| **Brittany Chiang** | Sorotan cahaya lembut mengikuti kursor di permukaan gelap |
| **Apple TV / tvOS** | Kartu sedikit miring (tilt) dan mengangkat saat difokus/di-hover |

---

## 3. Sistem gerak baru: `lib/motion.ts`

Satu file token, dipakai di semua komponen. Spring diubah ke parameter framer-motion (`damping = ζ × 2√(stiffness × mass)`):

```ts
export const spring = {
  // spatial: posisi, ukuran, layout (boleh sedikit memantul)
  fast:    { type: 'spring', stiffness: 800, damping: 34, mass: 1 },   // ζ≈0.6: press, chip, toggle
  default: { type: 'spring', stiffness: 380, damping: 31, mass: 1 },   // ζ≈0.8: kartu, layout, pill nav
  slow:    { type: 'spring', stiffness: 200, damping: 23, mass: 1 },   // ζ≈0.8: modal/container transform
} as const;

export const effect = {
  // effects: opacity & warna (tanpa pantulan)
  fast:    { type: 'spring', stiffness: 3800, damping: 123, mass: 1 },
  default: { type: 'spring', stiffness: 1600, damping: 80,  mass: 1 },
  slow:    { type: 'spring', stiffness: 800,  damping: 57,  mass: 1 },
} as const;

export const stagger = 0.06; // jeda antar anak saat zona masuk
```

Aturannya:
- Hanya `transform` dan `opacity`. Satu-satunya pengecualian adalah `borderRadius` untuk shape morph.
- Root dibungkus `<MotionConfig reducedMotion="user">`, jadi gerak pindah posisi otomatis dimatikan bagi yang memilih "kurangi gerakan".
- Pakai `LazyMotion` + `domAnimation` supaya bundle framer-motion tidak membengkak.

---

## 4. Rencana per area

### A. Perpindahan antar zona (kesinambungan "antar halaman")

| Sekarang | Jadi |
| --- | --- |
| `window.scrollTo` bawaan, kasar | **Lenis** sebagai scroll global (sudah ada di `package.json`). Klik nav memanggil `lenis.scrollTo('#work', { offset: -84, duration: 1.1, easing: expoOut })`. Bisa diinterupsi: scroll manual langsung mengambil alih |
| Zona muncul begitu saja | **Shared axis Y** per zona: judul → subjudul → kartu-kartu masuk berurutan (naik 24px + fade, jeda 60ms), sekali saja saat 20% zona terlihat |
| Pill nav pindah hanya saat zona aktif berganti | Pill tetap memakai `layoutId`. Ditambah: label zona di HP "menggulung" (roll) saat berganti, dan pill punya garis progres tipis yang terisi sesuai posisi scroll di zona itu |
| Pindah zona dari klik terasa "teleport" | Saat Lenis membawa ke zona tujuan, zona yang dituju menjalankan entrance-nya, sehingga terasa seperti "tiba" di halaman baru |

### B. Kartu proyek → detail (signature move)

- **Container transform** lewat `layoutId`: wadah kartu (`project-card-${id}`) dan gambarnya (`project-image-${id}`) dipakai bersama oleh `ProjectModal`. Saat diklik, kartu membesar jadi modal. Saat ditutup, modal menyusut kembali ke posisi kartu (spatial consistency ala Apple).
- Isi modal (judul, metrik, highlight) masuk berurutan **setelah** wadahnya selesai membesar.
- **Perbaiki bug exit:** `AnimatePresence` dipindah ke `page.tsx` dan membungkus `{selectedProject && <ProjectModal …/>}`.
- **Di HP:** modal jadi bottom sheet yang bisa ditarik turun. `drag="y"` dengan momentum: tutup kalau ditarik > 120px **atau** dilepas dengan kecepatan > 500px/s. Backdrop memudar sesuai jarak tarikan (`useTransform`).
- Galeri di modal: thumbnail aktif ditandai pill yang bergerak (`layoutId`), dan gambar utama berganti dengan shared axis X.

### C. Sertifikat → modal sertifikat

- Container transform dari thumbnail sertifikat (sama dengan B), plus bug exit yang sama diperbaiki.
- Gambar sertifikat bisa diperbesar dengan double-tap/double-click (zoom ke titik yang diklik), lalu digeser.

### D. Filter dan hubungan antar zona

- Grid Work dibungkus `LayoutGroup`, dan kartu memakai `layout` + `AnimatePresence mode="popLayout"`. Kartu yang tersaring keluar menyusut dan memudar, kartu lain mengisi tempatnya dengan spring.
- Ganti kategori memakai **fade through**.
- **Capabilities → Work:** chip teknologi yang diklik "terbang" ke header Work dan menjadi chip filter `Tech: React` (`layoutId={`tech-${name}`}`) sementara Lenis membawa halaman turun. Hubungan sebab-akibatnya jadi terlihat.

### E. Sentuhan dan hover (setiap interaksi punya respons)

| Elemen | Interaksi |
| --- | --- |
| Semua tombol pill | **Shape morph M3 Expressive:** saat ditekan, `borderRadius` 999 → 14px dan `scale .97` (spring fast), lepas kembali bulat |
| CTA utama (Download CV, Forum, Send) | **Magnetic:** sedikit tertarik ke kursor (maks 6px), kembali dengan spring |
| Kartu proyek & sertifikat | **Tilt halus ala tvOS** (maks 3°) mengikuti kursor + naik satu tingkat tonal (`surface-2 → surface-3`). Tanpa bayangan tambahan |
| Permukaan bento besar | **Sorotan kursor:** cahaya tonal sangat lembut (opacity < 4%) mengikuti kursor di dalam kartu |
| Daftar arsip proyek (Tier 3) | Preview gambar kecil mengikuti kursor saat hover baris (ala Dennis), hanya di desktop |
| Semua hover/press | Hanya aktif di perangkat dengan hover (`@media (hover:hover)`). Di HP digantikan respons tekan |

### F. Widget Dashboard terasa "hidup"

- **Angka menggulung** (rolling digits) untuk 119h, 455, dan repo saat widget pertama terlihat atau saat data live masuk. Pakai `tabular-nums` agar lebarnya tidak bergoyang.
- **Jam WIB:** digit menit menggulung saat berganti, seperti jam at-a-glance Pixel.
- **Bar bahasa:** segmen tumbuh dari kiri secara berurutan saat terlihat. Persentase ikut menghitung naik.
- **Deck foto:** bisa di-swipe dengan momentum (`drag="x"` + snap), arah transisi mengikuti arah swipe (shared axis X), dan titik indikator berupa pill yang memanjang.
- **"Inspect Full Telemetry":** chevron berputar, isi masuk berurutan setelah tinggi panel terbuka.

### G. Zona lain

- **Timeline About:** ganti tab memakai `layout` + fade through, tinggi kontainer menyesuaikan dengan spring (tidak meloncat).
- **Tab Velco:** pill sudah pakai `layoutId`. Ditambah: screenshot berganti dengan shared axis X sesuai arah tab.
- **Forum:** komentar baru "lahir" dari kolom input (layout animation dari posisi form ke daftar). Status login/kirim memakai toast kecil bergaya Sonner.
- **Contact:** tombol kirim berubah bentuk: idle → memendek jadi lingkaran berputar (mengirim) → centang → kembali. Salin email memberi umpan balik "Copied" yang menggulung.

### H. Saat pertama dibuka

Navbar turun (sudah ada) → kartu identitas → telemetri → timeline/foto, masuk berurutan dengan jeda 60ms. Total di bawah 900ms, dan isi sudah ada di HTML sejak awal (tidak ada layar kosong menunggu JS).

---

## 5. Batasan agar tetap elegan, tidak norak

- **Satu momen besar saja:** container transform kartu → detail. Sisanya kecil dan cepat.
- Tidak ada animasi yang berulang terus-menerus (tidak ada pulse/glow loop).
- Efek kursor (tilt, magnetic, sorotan) **tidak bertumpuk** di satu elemen; maksimal satu per elemen.
- Semua bisa diinterupsi: klik cepat berulang tidak membuat animasi antre.
- Uji di HP kelas menengah: target 60fps, tanpa animasi `height`/`top` kecuali untuk panel yang memang harus berubah tinggi.

---

## 6. Fase eksekusi

| Fase | Isi | File utama | Selesai kalau… |
| --- | --- | --- | --- |
| **M0. Fondasi** | `lib/motion.ts`, `MotionConfig` + `LazyMotion` di root, Lenis global + nav memakai Lenis | `lib/motion.ts`, `app/page.tsx`, `components/Navbar.tsx` | Klik nav meluncur halus dan bisa diinterupsi |
| **M1. Perbaikan bug** | Animasi tutup kedua modal | `components/ProjectModal.tsx`, `components/CertificateModal.tsx`, `app/page.tsx` | Modal menutup dengan animasi |
| **M2. Entrance zona** | Komponen `<Reveal>` + stagger untuk semua zona & load awal | `components/Reveal.tsx`, semua `sections/*` | Setiap zona "datang" saat di-scroll |
| **M3. Container transform** | Kartu → modal (proyek & sertifikat), bottom sheet drag di HP | `sections/Work`, `sections/Recognitions`, kedua modal | Kartu membesar jadi detail lalu kembali ke tempatnya |
| **M4. Filter & layout** | LayoutGroup di Work & About, chip tech terbang | `sections/Work`, `sections/About`, `sections/Capabilities` | Grid tidak berkedip saat difilter |
| **M5. Sentuhan** | Shape morph tombol, magnetic CTA, tilt kartu, sorotan kursor | `components/ui/PressableButton.tsx`, `components/ui/TiltCard.tsx`, `globals.css` | Setiap elemen interaktif merespons |
| **M6. Widget hidup** | Rolling digits, jam, bar bahasa, deck foto swipe | `components/ui/RollingNumber.tsx`, `sections/Dashboard`, `sections/Stats` | Angka bergerak saat data masuk |
| **M7. Detail akhir** | Forum, Contact, toast, menu HP | `sections/Forum`, `sections/Contact` | — |
| **M8. Uji** | `tsc`, `vitest`, uji reduced-motion, uji HP, Lighthouse (CLS tetap 0) | — | Tidak ada regresi |

Urutan prioritas: **M0 → M1 → M3 → M2** sudah mengubah sebagian besar kesan kaku.

---

## 7. Catatan

- Perubahan split-stage yang sempat dibuat tersimpan di `git stash` (`split-stage F0-F1 (rejected direction)`), tidak dihapus. Bisa dibuang permanen kapan pun dengan `git stash drop`.
- Tidak perlu library baru: `framer-motion` dan `lenis` sudah ada di `package.json`.

---

## 8. Hasil uji akhir (M8, 24 Okt 2026)

Diukur pada build produksi, Lighthouse 13.5 (rata-rata 2 run, throttling simulasi), `main` (sebelum) vs `feat/dynamic-motion` (sesudah).

| Metrik | Mobile sebelum | Mobile sesudah | Desktop sebelum | Desktop sesudah |
| --- | --- | --- | --- | --- |
| Performance | 73 | **95** | 99 | **100** |
| Accessibility | 91 | **99** | 92 | **99** |
| Best Practices / SEO | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 |
| LCP | 3.58s | **2.78s** | 0.78s | 0.76s |
| TBT | 713ms | **101ms** | 8ms | 0ms |
| CLS | 0.001 | 0 | 0 | 0 |
| Speed Index | 2.05s | 1.94s | 0.92s | 0.52s |
| JS (transfer) | 390KB | 411KB | 256KB | 277KB |

Audit a11y yang masih gagal sudah ada sejak sebelum perubahan: `heading-order` (h3 tanpa h2 di kartu timeline) dan `label-content-name-mismatch` (tombol logo HRNT berlabel "Go to dashboard").

**Ditemukan dan diperbaiki saat uji:**
- LCP mobile sempat naik ke 7.5s: blok layar pertama disembunyikan sampai JavaScript siap, dan animasi opacity dari 0 membuat Chrome mengabaikan paint pertama foto. Sekarang blok layar pertama bergerak murni dengan CSS sejak frame pertama, tanpa memudar dari 0.
- Reduced motion: scroll wheel berhenti 106px sebelum dasar halaman (Lenis). Sekarang Lenis tidak dipasang sama sekali untuk pengunjung yang memilih kurangi gerakan.
- Wheel di atas thread Guestbook tidak menggulir halaman sama sekali. Sekarang scroll diteruskan ke halaman begitu thread mentok.
- Glide navigasi meleset 24px jika zona tujuan masih di tengah animasi masuk. Sekarang target dihitung dari posisi layout.
- Titik indikator deck foto sekarang punya area sentuh 24px (sebelumnya 6px).

**Lolos:** tidak ada error console (desktop, HP, reduced motion); tanpa overflow horizontal di 390px; swipe sentuh deck foto; `touch-action: pan-y` di deck; semua elemen fokus keyboard punya ring; Enter membuka kartu proyek dan fokus kembali ke kartu setelah Esc.

**Belum diverifikasi:** perangkat HP sungguhan (semua uji di Chrome headless dengan emulasi), dan alur kirim pesan Forum di browser (butuh login Firebase; logikanya diuji lewat tes komponen).
