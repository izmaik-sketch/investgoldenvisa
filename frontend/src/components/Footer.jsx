import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [companyInfo, setCompanyInfo] = useState(null);

  // Fetch company info from API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${API}/company-info`);
        setCompanyInfo(response.data);
      } catch (err) {
        console.error('Error fetching company info:', err);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Merhaba, Yunanistan Golden Visa hakkında bilgi almak istiyorum.");
    window.open(`https://wa.me/905332853031?text=${message}`, '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-12 w-auto">
                <img 
                  src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/qzpcuakc_logo%20son.jpeg"
                  alt="Golden Citizen - Residency & Citizenship Solutions"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-blue-200 leading-relaxed">
              İzmir merkezli boutique danışmanlık firması olarak, 
              Türk ailelerinin Avrupa'daki yeni hayatlarında güvenilir rehber.
            </p>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-blue-200">Başarılı Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-blue-200">Başarı Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-xs text-blue-200">Yıl Deneyim</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Hızlı Linkler</h4>
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block text-blue-200 hover:text-white transition-colors"
              >
                Ana Sayfa
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="block text-blue-200 hover:text-white transition-colors"
              >
                Neden Yunanistan Golden Visa?
              </button>
              <button 
                onClick={() => scrollToSection('investment')}
                className="block text-blue-200 hover:text-white transition-colors"
              >
                250.000 € Yatırım Seçenekleri
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-blue-200 hover:text-white transition-colors"
              >
                Hakkımızda
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-blue-200 hover:text-white transition-colors"
              >
                İletişim
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Hizmetlerimiz</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Golden Visa Danışmanlığı</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Emlak Yatırım Rehberliği</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Yasal Süreç Yönetimi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Belge Hazırlama</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>Süreç Takibi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <span>After-Sales Destek</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">WhatsApp</div>
                  <div className="text-blue-200 text-sm">{companyInfo?.contact?.whatsapp || '+90 533 285 30 31'}</div>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1 mt-1"
                  >
                    <span>Hemen yazın</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">E-posta</div>
                  <div className="text-blue-200 text-sm">{companyInfo?.contact?.email || 'info@goldencitizen.com.tr'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Lokasyon</div>
                  <div className="text-blue-200 text-sm">{companyInfo?.contact?.address || 'İzmir, Türkiye'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Çalışma Saatleri</div>
                  <div className="text-blue-200 text-sm">{companyInfo?.contact?.officeHours || 'Pazartesi - Cuma: 09:00 - 18:00'}</div>
                  <div className="text-green-400 text-xs">WhatsApp 7/24</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-200 text-sm">
              © {currentYear} Golden Citizen. Tüm hakları saklıdır. 
              <span className="text-amber-400 font-medium"> Ali İrfan Kaynak</span> tarafından kurulmuştur.
            </div>
            
            <div className="text-blue-200 text-sm text-center md:text-right">
              <div>🇬🇷 Yunanistan Golden Visa Uzmanı</div>
              <div className="text-xs mt-1">İzmir merkezli boutique danışmanlık</div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-amber-500/20 to-red-500/20 px-6 py-3 rounded-full border border-amber-400/30">
              <span className="text-white font-medium">🎯 Avrupa'da yeni hayatınız bir tık uzakta!</span>
              <button 
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <Phone className="w-3 h-3" />
                <span>Başlayın</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;