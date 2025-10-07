import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Merhaba, Yunanistan Golden Visa hakkında ücretsiz danışmanlık almak istiyorum.");
    window.open(`https://wa.me/905332853031?text=${message}`, '_blank');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="h-14 w-auto">
              <img 
                src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/1wum8yh0_logo%20son.jpeg"
                alt="Golden Citizen - Residency & Citizenship Solutions"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">
                Golden Citizen Oturum İzni ve Vatandaşlık Çözümleri
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Ana Sayfa
            </button>
            <button 
              onClick={() => scrollToSection('benefits')}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Neden Yunanistan?
            </button>
            <button 
              onClick={() => scrollToSection('investment')}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Yatırım Seçenekleri
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Hakkımızda
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              İletişim
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Ücretsiz Danışmanlık</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors font-medium px-4 py-2"
              >
                Ana Sayfa
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors font-medium px-4 py-2"
              >
                Neden Yunanistan?
              </button>
              <button 
                onClick={() => scrollToSection('investment')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors font-medium px-4 py-2"
              >
                Yatırım Seçenekleri
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors font-medium px-4 py-2"
              >
                Hakkımızda
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors font-medium px-4 py-2"
              >
                İletişim
              </button>
              <div className="px-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ücretsiz Danışmanlık</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;