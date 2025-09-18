import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Award, Users, CheckCircle, Phone, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company info from API
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/company-info`);
        setCompanyInfo(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching company info:', err);
        setError('Şirket bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

const About = () => {
  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-64 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-96 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-full max-w-3xl"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">❌ {error}</div>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Yeniden Dene
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!companyInfo) {
    return null;
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Golden Citizen Hakkında</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            İzmir'in En Güvenilir 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 block">
              Golden Visa Uzmanı
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Golden Citizen olarak, Türk ailelerinin Avrupa'daki yeni hayatlarına 
            güvenilir, şeffaf ve profesyonel rehberlik ediyoruz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Founder Info */}
          <div className="space-y-6">
            {/* Founder Card */}
            <Card className="overflow-hidden border-0 shadow-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Avatar Placeholder */}
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{companyInfo.founder.name}</h3>
                      <p className="text-blue-100">{companyInfo.founder.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">{companyInfo.founder.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{companyInfo.founder.credentials}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span className="text-sm">İzmir Merkezli Boutique Danışmanlık</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {companyInfo.founder.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {companyInfo.founder.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-4">İletişim Bilgileri</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-blue-900">WhatsApp</div>
                    <div className="text-gray-600">{companyInfo.contact.whatsapp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-blue-900">Lokasyon</div>
                    <div className="text-gray-600">{companyInfo.contact.address}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-900">Çalışma Saatleri</div>
                    <div className="text-gray-600">{companyInfo.contact.officeHours}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Values */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {companyInfo.stats.successfulApplications}+
                  </div>
                  <div className="text-gray-600">Başarılı Müşteri</div>
                  <div className="text-sm text-blue-600 mt-1">Golden Visa alındı</div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {companyInfo.stats.successRate}%
                  </div>
                  <div className="text-gray-600">Başarı Oranı</div>
                  <div className="text-sm text-green-600 mt-1">Reddedilen başvuru yok</div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {companyInfo.stats.experienceYears}
                  </div>
                  <div className="text-gray-600">Yıl Deneyim</div>
                  <div className="text-sm text-amber-600 mt-1">Golden Visa uzmanı</div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {companyInfo.stats.averageProcessTime}
                  </div>
                  <div className="text-gray-600">Ortalama Süre</div>
                  <div className="text-sm text-red-600 mt-1">Hızlı işlem</div>
                </CardContent>
              </Card>
            </div>

            {/* Company Values */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Değerlerimiz</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Şeffaflık
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Tüm süreçlerde açık ve net bilgilendirme
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Güvenilirlik
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Sözümüzün arkasında durarak güven inşa ediyoruz
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Profesyonellik
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Uzman ekibimizle en kaliteli hizmeti sunuyoruz
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Samimi Yaklaşım
                    </Badge>
                    <p className="text-sm text-gray-700">
                      Ailenizin bir parçası gibi hissederek destek oluyoruz
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                Ali İrfan Kaynak ile Konuş
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Ücretsiz danışmanlık için hemen WhatsApp'tan ulaşın
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;