import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, MapPin, Euro, Clock } from 'lucide-react';

const Hero = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Merhaba, Yunanistan Golden Visa hakkında ücretsiz danışmanlık almak istiyorum.");
    window.open(`https://wa.me/905542344400?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-50 to-amber-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">İzmir Merkezli Boutique Danışmanlık</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Yunanistan Golden Visa ile 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 block">
                  Avrupa'da Yeni Bir Hayat
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Sadece <strong className="text-red-600">250.000 €</strong> yatırım ile Avrupa'da oturma izni, 
                çocuklarınızın geleceği ve Schengen ülkelerine visa-free seyahat hakkı kazanın.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                <Euro className="w-8 h-8 text-amber-600 mb-2" />
                <div className="font-semibold text-blue-900">250.000 €</div>
                <div className="text-sm text-gray-600">Minimum Yatırım</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                <Clock className="w-8 h-8 text-red-600 mb-2" />
                <div className="font-semibold text-blue-900">3-6 Ay</div>
                <div className="text-sm text-gray-600">Süreç Süresi</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                <div className="font-semibold text-blue-900">27 Ülke</div>
                <div className="text-sm text-gray-600">Schengen Erişimi</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Hemen Ücretsiz Danışmanlık Randevusu Al</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Avantajları Keşfet
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">50+</div>
                <div className="text-sm text-gray-600">Başarılı Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">100%</div>
                <div className="text-sm text-gray-600">Başarı Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">5 Yıl</div>
                <div className="text-sm text-gray-600">Deneyim</div>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-2xl p-8 h-96 lg:h-[500px] flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-900">Mediterranean Lifestyle Image</h3>
                  <p className="text-sm text-gray-600">Greek islands, family lifestyle, or Athens cityscape</p>
                  <p className="text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full inline-block">
                    Image Placeholder - To be replaced
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-blue-100">
              <div className="text-xs text-gray-600">🇬🇷 Yunanistan</div>
              <div className="font-semibold text-blue-900">Golden Visa</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-amber-50 rounded-xl p-3 shadow-lg border border-amber-200">
              <div className="text-xs text-gray-600">🏠 Emlak Yatırımı</div>
              <div className="font-semibold text-amber-800">€250.000+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;