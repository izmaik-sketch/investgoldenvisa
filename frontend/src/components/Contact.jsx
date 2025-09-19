import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Golden Visa Danışmanlığı',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch company info from API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${API}/company-info`);
        setCompanyInfo(response.data);
      } catch (err) {
        console.error('Error fetching company info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        alert(response.data.message || 'Mesajınız alındı! En kısa sürede size geri dönüş yapacağız.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Golden Visa Danışmanlığı',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp ile iletişime geçin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Merhaba Golden Citizen,\n\nAdım: ${formData.name || '[İsim]'}\nTelefon: ${formData.phone || '[Telefon]'}\n\nYunanistan Golden Visa hakkında bilgi almak istiyorum.`
    );
    window.open(`https://wa.me/905332853031?text=${message}`, '_blank');
  };

  const quickWhatsApp = () => {
    const message = encodeURIComponent("Merhaba, Yunanistan Golden Visa hakkında bilgi almak istiyorum.");
    window.open(`https://wa.me/905332853031?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-blue-200">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">İletişim</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            Hemen Başlayalım!
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 block">
              Size Nasıl Yardımcı Olabiliriz?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Golden Visa süreciyle ilgili tüm sorularınız için bize ulaşın. 
            Ücretsiz danışmanlık randevunuzu hemen alın.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">İletişim Formu</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-900 font-medium">
                      Adınız Soyadınız *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-blue-200 focus:border-blue-500"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-900 font-medium">
                      Telefon Numaranız *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-blue-200 focus:border-blue-500"
                      placeholder="Örn: +90 555 123 45 67"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    E-posta Adresiniz *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-500"
                    placeholder="Örn: ahmet@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-blue-900 font-medium">
                    Konu
                  </Label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  >
                    <option>Golden Visa Danışmanlığı</option>
                    <option>Emlak Yatırım Seçenekleri</option>
                    <option>Süreç ve Belgeler</option>
                    <option>Fiyat Bilgisi</option>
                    <option>Diğer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-900 font-medium">
                    Mesajınız
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-500 resize-none"
                    placeholder="Golden Visa süreciyle ilgili sorularınızı buraya yazabilirsiniz..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 font-semibold transition-all"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp'tan Gönder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            {/* Quick WhatsApp CTA */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Hızlı İletişim</h3>
                <p className="mb-6 opacity-90">
                  Hemen WhatsApp'tan yazın, 5 dakika içinde yanıt alın!
                </p>
                <Button
                  onClick={quickWhatsApp}
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hemen WhatsApp'tan Yaz
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">İletişim Bilgilerimiz</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">WhatsApp & Telefon</h4>
                      <p className="text-gray-600">{companyInfo?.contact?.whatsapp || '+90 554 234 44 00'}</p>
                      <p className="text-sm text-green-600">7/24 WhatsApp desteği</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">E-posta</h4>
                      <p className="text-gray-600">{companyInfo?.contact?.email || 'info@goldencitizen.com.tr'}</p>
                      <p className="text-sm text-blue-600">24 saat içinde yanıt</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Ofis Lokasyonu</h4>
                      <p className="text-gray-600">{companyInfo?.contact?.address || 'İzmir, Türkiye'}</p>
                      <p className="text-sm text-red-600">Randevu ile görüşme</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Çalışma Saatleri</h4>
                      <p className="text-gray-600">{companyInfo?.contact?.officeHours || 'Pazartesi - Cuma: 09:00 - 18:00'}</p>
                      <p className="text-sm text-amber-600">WhatsApp 7/24 aktif</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Timeline */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Süreç Nasıl İşliyor?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-gray-700">Ücretsiz danışmanlık randevusu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-700">Emlak seçimi ve lokasyon incelemesi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-700">Yasal işlemler ve belge hazırlığı</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-gray-700">Golden Visa teslim</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;