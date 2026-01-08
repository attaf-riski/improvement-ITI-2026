# 🏁 KPI Race Tracker - Improvement Tracker

> **Visualisasi KPI dalam bentuk balapan isometric yang interaktif dan menarik!**

Sebuah aplikasi web statis untuk tracking progress tim dalam submission Improvement (SS, QCP, QCC) dengan tampilan balapan karakter yang lucu dan engaging.

---

## ✨ Fitur Utama

- 🎨 **Desain Premium** - Glassmorphism, gradient modern, dan animasi smooth
- 🏃 **10 Karakter Unik** - Setiap anggota tim memiliki karakter berbeda (Robot, Bear, Fox, Penguin, Cat, Elephant, Rabbit, Turtle, Panda, Koala)
- 📊 **Isometric Race Track** - Positioning diagonal yang sempurna dengan 3 level (Start, Progress, Finish)
- 🎯 **Data-Driven** - Update mudah via `data.json`, auto-refresh saat deploy
- 💬 **Interactive Popup** - Klik karakter untuk melihat detail submissions
- 📱 **Fully Responsive** - Tampilan optimal di desktop, tablet, dan mobile
- 🎉 **Winner Animation** - Karakter yang finish akan celebrate otomatis!

---

## 🚀 Quick Start

### 1. Clone atau Download Repository

```bash
git clone <repository-url>
cd Improvement-Tracker
```

### 2. Langsung Buka di Browser

Cukup double-click file `index.html` atau buka via browser:

```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

**Atau** jalankan local server:

```bash
# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (dengan npx)
npx serve
```

Buka browser dan akses: `http://localhost:8000`

---

## 📂 Struktur Project

```
Improvement-Tracker/
│
├── index.html          # Main HTML file
├── styles.css          # Premium CSS dengan isometric system
├── script.js           # JavaScript logic untuk positioning & interactions
├── data.json           # Data tim dan submissions (EDIT INI untuk update!)
├── README.md           # Dokumentasi ini
│
└── assets/             # Folder karakter
    ├── char1.png       # Robot
    ├── char2.png       # Bear
    ├── char3.png       # Fox
    ├── char4.png       # Penguin
    ├── char5.png       # Cat
    ├── char6.png       # Elephant
    ├── char7.png       # Rabbit
    ├── char8.png       # Turtle
    ├── char9.png       # Panda
    └── char10.png      # Koala
```

---

## 🎮 Cara Update Data

### Edit `data.json`

Setiap kali ada submission baru, edit file `data.json`:

```json
{
  "id": 1,
  "nama": "Andi Wijaya",
  "avatar": "assets/char1.png",
  "points": 2,                      // 0-2 (max 2 untuk finish!)
  "submissions": [
    {
      "judul": "Optimasi Fuel Truck Loading Time",
      "jenis": "QCP"                // SS, QCP, atau QCC
    },
    {
      "judul": "Digitalisasi Logsheet Harian",
      "jenis": "SS"
    }
  ]
}
```

### Rules:
- **`points`**: Jumlah submission (0, 1, atau 2)
  - `0` = Start line (bottom-left)
  - `1` = Middle track
  - `2` = Finish line (top-right) 🏆
- **`jenis`**: Harus `SS`, `QCP`, atau `QCC`
- **`avatar`**: Path ke gambar karakter di folder `assets/`

---

## 🌐 Deploy ke GitHub Pages

### Step 1: Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit - KPI Race Tracker"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### Step 2: Aktifkan GitHub Pages

1. Buka repository di GitHub
2. **Settings** → **Pages**
3. **Source**: Pilih `main` branch
4. **Folder**: Pilih `/ (root)`
5. Klik **Save**

### Step 3: Akses Website Live

Setelah beberapa menit, website akan live di:

```
https://USERNAME.github.io/REPO-NAME/
```

### Update Data Setelah Deploy

1. Edit `data.json` di local
2. Commit & Push:
   ```bash
   git add data.json
   git commit -m "Update: Tambah submission dari [Nama]"
   git push
   ```
3. Website akan auto-update dalam 1-2 menit! 🎉

---

## 🎨 Customize Karakter

Jika ingin ganti karakter:

1. **Generate gambar baru** dengan AI (DALL-E, Midjourney, dll)
   - **Prompt template**:
     ```
     A [animal/character] wearing an orange safety vest and yellow mining helmet,
     running pose, isometric view, orthogonal angle, 3D claymation style,
     vibrant colors, clean white background, high quality, sharp edges
     ```

2. **Hapus background** (buat PNG transparan)
   - Tool: [remove.bg](https://remove.bg), Photoshop, GIMP

3. **Rename file** menjadi `char1.png` - `char10.png`

4. **Simpan di folder `assets/`**

5. **Update `data.json`** dengan nama & avatar path yang sesuai

---

## 🐛 Troubleshooting

### Karakter tidak muncul?
- Pastikan file PNG ada di folder `assets/`
- Cek nama file sesuai dengan `data.json` (case-sensitive!)
- Cek console browser (F12) untuk error

### Posisi karakter tidak sesuai?
- Pastikan `points` di `data.json` bernilai 0, 1, atau 2
- Refresh browser dengan **Ctrl+F5** (hard reload)

### Modal tidak muncul saat klik?
- Pastikan JavaScript enabled di browser
- Cek console (F12) untuk error
- Pastikan `script.js` ter-load dengan benar

---

## 🎯 Positioning System

Aplikasi ini menggunakan **formula isometric** untuk positioning:

```javascript
// Progress: 0.0 (start) → 1.0 (finish)
progress = points / 2

// Diagonal positioning
left = 10 + (progress × 70)%
top = 75 - (progress × 60)%
```

Hasil:
- **0 submissions**: `left: 10%, top: 75%` (Start)
- **1 submission**: `left: 45%, top: 45%` (Middle)
- **2 submissions**: `left: 80%, top: 15%` (Finish) 🏆

---

## 📊 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, animations, responsive
- **Vanilla JavaScript** - No framework, ultra-lightweight!
- **Google Fonts** - Outfit font family
- **JSON** - Data storage

**Zero dependencies!** 🎉 Aplikasi ini 100% static dan bisa jalan offline!

---

## 🤝 Kontribusi

Punya ide untuk improvement? Silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

Project ini dibuat untuk internal PT Saptaindra Sejati - Mining Team

---

## 💡 Tips & Best Practices

1. **Update reguler** - Semakin sering update, semakin engaged tim!
2. **Apresiasi winners** - Rayakan yang sudah finish dengan announcement
3. **Gamifikasi** - Bisa tambah leaderboard, badges, dll di masa depan
4. **Mobile-friendly** - Tim bisa cek progress dari HP kapan saja
5. **Screenshot & Share** - Bagikan screenshot di grup WhatsApp untuk motivasi!

---

## 🙏 Credits

- **Character Design**: AI-generated (DALL-E 3)
- **Developed by**: PT Saptaindra Sejati Mining Team
- **Inspiration**: Gamification untuk improvement culture

---

**Selamat berlomba-lomba improve! 🏁💨**

*"Slow and steady wins the race, but fast and consistent wins the game!"* 🚀
