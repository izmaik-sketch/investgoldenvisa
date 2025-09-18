import React from 'react';
import { Card, CardContent } from './ui/card';
import { Plane, GraduationCap, Heart, Shield, Globe, Home } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Schengen Bölgesi Özgürlüğü",
      description: "27 Avrupa ülkesinde visa gerektirmeden seyahat etme hakkı. İş ve tatil için sınırsız hareket özgürlüğü.",
      highlight: "27 Ülke"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-amber-600" />,
      title: "Çocuklarınızın Parlak Geleceği",
      description: "Avrupa'nın en prestijli üniversitelerine kolay erişim. Kaliteli eğitim sistemi ve uluslararası fırsatlar.",
      highlight: "AB Eğitimi"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Sağlık ve Yaşam Kalitesi",
      description: "Dünya standartlarında sağlık hizmetleri. Akdeniz iklimi ve sağlıklı yaşam tarzı.",
      highlight: "Kaliteli Yaşam"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Güvenli Gelecek",
      description: "Ekonomik ve politik istikrar. AB vatandaşlığı yolunda ilk adım. Emeklilik için ideal lokasyon.",
      highlight: "AB Güvencesi"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "İş Fırsatları",
      description: "Avrupa pazarında iş kurma ve çalışma hakkı. Uluslararası ticaret için stratejik konum.",
      highlight: "Kariyer"
    },
    {
      icon: <Home className="w-8 h-8 text-orange-600" />,
      title: "Emlak Yatırımı",
      description: "Değer kazanan emlak portföyü. Kira geliri potansiyeli. Turizm bölgelerinde avantajlı konumlar.",
      highlight: "Yatırım"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-blue-900">Neden Yunanistan Golden Visa?</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            Hayatınızı Dönüştüren 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 block">
              6 Büyük Avantaj
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Yunanistan Golden Visa ile sadece bir yatırım yapmıyorsunuz, 
            ailenizin geleceğine en değerli hediyeyi veriyorsunuz.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {benefit.highlight}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Bu Avantajların Hepsine Sahip Olmaya Hazır mısınız?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Golden Citizen ekibi olarak, Yunanistan Golden Visa sürecinde 
              size güvenilir, şeffaf ve profesyonel danışmanlık hizmeti sunuyoruz.
            </p>
            <button 
              onClick={() => {
                const message = encodeURIComponent("Merhaba, Yunanistan Golden Visa avantajları hakkında detaylı bilgi almak istiyorum.");
                window.open(`https://wa.me/905542344400?text=${message}`, '_blank');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Detaylı Bilgi Al</span>
              <Plane className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;