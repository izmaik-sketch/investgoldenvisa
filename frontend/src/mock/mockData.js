// Mock data for Golden Citizen website

export const properties = [
  {
    id: 1,
    title: "Atina Merkez Luxury Daire",
    location: "Kolonaki, Atina",
    price: 280000,
    type: "Daire",
    size: "120 m²",
    bedrooms: 3,
    bathrooms: 2,
    features: ["Şehir Manzarası", "Merkezi Konum", "Yüksek Kira Potansiyeli"],
    description: "Atina'nın en prestijli semti Kolonaki'de, metro ve alışveriş merkezlerine yürüme mesafesinde luxury daire.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  },
  {
    id: 2,
    title: "Santorini Villa Projesi",
    location: "Oia, Santorini",
    price: 450000,
    type: "Villa",
    size: "180 m²",
    bedrooms: 4,
    bathrooms: 3,
    features: ["Deniz Manzarası", "Turizm Potansiyeli", "Premium Lokasyon"],
    description: "Santorini'nin ünlü Oia kasabasında, Ege Denizi manzaralı villa. Yüksek turizm geliri potansiyeli.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  },
  {
    id: 3,
    title: "Selanik Modern Residans",
    location: "Selanik Merkez",
    price: 250000,
    type: "Daire",
    size: "95 m²",
    bedrooms: 2,
    bathrooms: 2,
    features: ["Yeni Proje", "Garantili Kira", "İnvestment Grade"],
    description: "Selanik'in gelişen bölgesinde, garantili kira geliri ile modern residans projesi.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  },
  {
    id: 4,
    title: "Mykonos Beach House",
    location: "Platys Gialos, Mykonos",
    price: 380000,
    type: "Villa",
    size: "150 m²",
    bedrooms: 3,
    bathrooms: 2,
    features: ["Plaj Erişimi", "Lux Tatil Evi", "Airbnb Uygun"],
    description: "Mykonos'un ünlü plajlarından Platys Gialos'a sadece 50 metre mesafede beach house.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  },
  {
    id: 5,
    title: "Rodos Antik Kent Yakını",
    location: "Rodos Eski Şehir",
    price: 320000,
    type: "Townhouse",
    size: "140 m²",
    bedrooms: 3,
    bathrooms: 2,
    features: ["Tarihi Konum", "Restorasyon Edilmiş", "Turist Cazibesi"],
    description: "UNESCO Dünya Mirası Rodos Eski Şehri'nde, restore edilmiş geleneksel townhouse.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  },
  {
    id: 6,
    title: "Krete Luxury Resort Daire",
    location: "Chania, Krete",
    price: 275000,
    type: "Resort Daire",
    size: "110 m²",
    bedrooms: 2,
    bathrooms: 2,
    features: ["Resort İçinde", "Havuz", "Spa Erişimi"],
    description: "Krete'nin en güzel sahil şeridi Chania'da, 5 yıldızlı resort içinde luxury daire.",
    imageUrl: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    location: "İzmir",
    rating: 5,
    comment: "Golden Citizen ile çalışmak harika bir deneyimdi. Ali Bey'in profesyonel yaklaşımı ve süreçteki rehberliği sayesinde Golden Visa başvurumuz sorunsuz tamamlandı.",
    date: "2024-01-15",
    property: "Atina Merkez Luxury Daire"
  },
  {
    id: 2,
    name: "Ayşe Demir",
    location: "İstanbul",
    rating: 5,
    comment: "Çocuklarımızın eğitimi için Golden Visa aldık. Süreç boyunca her adımda bilgilendirildik. Şimdi Yunanistan'da mutlu bir yaşam sürüyoruz.",
    date: "2023-11-22",
    property: "Selanik Modern Residans"
  },
  {
    id: 3,
    name: "Canan Özkan",
    location: "Antalya",
    rating: 5,
    comment: "Emlak yatırımı olarak aldığımız Santorini villa'mız hem Golden Visa hakkımızı verdi hem de mükemmel kira geliri sağlıyor.",
    date: "2023-09-10",
    property: "Santorini Villa Projesi"
  }
];

export const processSteps = [
  {
    step: 1,
    title: "Ücretsiz Danışmanlık",
    description: "İhtiyaçlarınızı belirleyip size en uygun yatırım seçeneklerini sunuyoruz.",
    duration: "1 gün"
  },
  {
    step: 2,
    title: "Emlak Seçimi",
    description: "Bütçenize ve tercihlerinize uygun emlak seçeneklerini inceliyoruz.",
    duration: "1-2 hafta"
  },
  {
    step: 3,
    title: "Yasal Süreç",
    description: "Satın alma sözleşmesi ve tüm yasal işlemleri tamamlıyoruz.",
    duration: "2-4 hafta"
  },
  {
    step: 4,
    title: "Başvuru Hazırlığı",
    description: "Golden Visa başvurunuz için gerekli tüm belgeleri hazırlıyoruz.",
    duration: "1-2 hafta"
  },
  {
    step: 5,
    title: "Başvuru Takibi",
    description: "Başvurunuzu takip ediyor, gerekli desteği sağlıyoruz.",
    duration: "2-4 ay"
  },
  {
    step: 6,
    title: "Teslim",
    description: "Golden Visa kartınızı teslim alıyor, yeni hayatınıza başlıyorsunuz.",
    duration: "1 gün"
  }
];

export const companyInfo = {
  founder: {
    name: "Ali İrfan Kaynak",
    title: "Kurucu & Golden Visa Uzmanı",
    experience: "5+ yıl Yunanistan Golden Visa deneyimi",
    credentials: "Gayrimenkul Yatırım Danışmanı, AB Göçmenlik Uzmanı",
    description: "İzmir merkezli boutique danışmanlık firması Golden Citizen'in kurucusu Ali İrfan Kaynak, 5 yılı aşkın süredir Türk yatırımcılara Yunanistan Golden Visa sürecinde rehberlik etmektedir.",
    achievements: [
      "50+ başarılı Golden Visa başvurusu",
      "100% başarı oranı",
      "İzmir'in en güvenilir Golden Visa uzmanı",
      "Şeffaf ve dürüst danışmanlık yaklaşımı"
    ]
  },
  contact: {
    whatsapp: "+90 554 234 44 00",
    email: "info@goldencitizen.com.tr",
    address: "İzmir, Türkiye",
    officeHours: "Pazartesi - Cuma: 09:00 - 18:00"
  },
  stats: {
    successfulApplications: 50,
    successRate: 100,
    experienceYears: 5,
    averageProcessTime: "3-6 ay"
  }
};