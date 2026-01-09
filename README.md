# 📰 DT Jazeera - Kişiselleştirilmiş Haber Akışı

Evet, ismi Al Jazeera'dan esinlendim. Ama merak etmeyin, Katar'dan değil, DT Cloud projesinden geliyoruz. 🐪➡️💻

## 🎯 Bu Proje Ne İşe Yarıyor?

DT Jazeera, kullanıcıların ilgi alanlarına göre kişiselleştirilmiş haber akışı sunan modern bir web uygulamasıdır. Teknoloji, spor, sağlık, bilim... Giriş yapmadan da haberleri okuyabilirsin ama hesap açarsan sana özel bir deneyim sunuyoruz. (Biz böyle kandırıyoruz kullanıcıları 😄)

## Özellikler

- Kullanıcı kayıt ve giriş sistemi
- Mobil uyumlu, modern tasarım
- Kategori bazlı haber filtreleme
- Misafir kullanıcılar için genel haber akışı
- Hızlı ve akıcı kullanıcı deneyimi
- 2025 tarzı minimal UI/UX

## Teknolojiler

### Frontend
- **React 19** - UI kütüphanesi
- **React Router** - Sayfa yönlendirme
- **Vite** - Hızlı geliştirme ortamı
- **Axios** - HTTP istekleri
- **Pure CSS** - Sade ve temiz stil (UI kütüphanesi yok!)

### Backend
- **Node.js + Express** - API sunucusu
- **SQLite** - Veritabanı (kurulum gerektirmez!)
- **JWT** - Kimlik doğrulama
- **bcryptjs** - Şifre hashleme
- **NewsAPI** - Gerçek haber verileri

## Kurulum


### 1. Frontend Bağımlılıklarını Yükle
```bash
npm install
```

### 2. Backend Bağımlılıklarını Yükle
```bash
cd backend
npm install
```

### 3. Backend Ortam Değişkenlerini Ayarla
`backend` klasöründe `.env` dosyası oluştur:
```env
PORT=5000
JWT_SECRET=super-gizli-jwt-anahtarin
NEWS_API_KEY=newsapi-com-dan-aldigin-api-key
```

> 💡 **NewsAPI Key Nasıl Alınır?**
> 1. [newsapi.org](https://newsapi.org) adresine git
> 2. Ücretsiz hesap oluştur
> 3. API key'ini kopyala

### 5. Uygulamayı Başlat

**Backend'i başlat** (bir terminalde):
```bash
cd backend
npm run dev
```

**Frontend'i başlat** (başka bir terminalde):
```bash
npm run dev
```

### 6. Tarayıcıda Aç
```
http://localhost:vitehangiportuaçarsa
```

## Proje Yapısı

```
dtcloud-news-web/
├── src/                    # Frontend kaynak kodları
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── Navbar.jsx      # Üst menü
│   │   ├── NewsCard.jsx    # Haber kartı
│   │   └── CategorySelector.jsx  # Kategori seçici
│   ├── pages/              # Sayfa bileşenleri
│   │   ├── NewsFeed.jsx    # Ana sayfa
│   │   ├── Login.jsx       # Giriş sayfası
│   │   └── Register.jsx    # Kayıt sayfası
│   ├── context/            # React Context
│   │   └── AuthContext.jsx # Kimlik doğrulama state'i
│   ├── services/           # API servisleri
│   │   └── api.js          # Axios instance ve API çağrıları
│   └── index.css           # Global stiller
├── backend/                # Backend API
│   ├── server.js           # Express sunucusu
│   ├── config/             # Veritabanı yapılandırması
│   ├── controllers/        # İş mantığı
│   ├── middleware/         # Auth middleware
│   ├── models/             # Veritabanı modelleri
│   └── routes/             # API rotaları
└── public/                 # Statik dosyalar
```

## Kullanılabilir Komutlar

### Frontend
| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Prodüksiyon için derler |
| `npm run preview` | Derlenen uygulamayı önizler |
| `npm run lint` | Kod kalitesi kontrolü |

### Backend
| Komut | Açıklama |
|-------|----------|
| `npm run dev` | API sunucusunu başlatır |
| `npm start` | API sunucusunu başlatır (prodüksiyon) |

## 🎨 Ekran Görüntüleri

<img width="1867" height="955" alt="image" src="https://github.com/user-attachments/assets/904239fc-dc42-4051-8043-e33e10aafdb2" />
<img width="1868" height="944" alt="image" src="https://github.com/user-attachments/assets/a5aaf443-1dee-4422-942b-cd257b5c1353" />

## 🤝 Katkıda Bulunma

Bu bir staj projesi olduğu için PR kabul etmiyoruz ama yıldız atabilirsiniz! ⭐

## 📝 Lisans

ISC License - Yani istediğinizi yapın, biz sorumlu değiliz 😅

---

<p align="center">
  <i>DT Cloud Staj Projesi 2025</i><br>
</p>
