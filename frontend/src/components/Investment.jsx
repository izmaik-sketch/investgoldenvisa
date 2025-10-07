import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Home, Bed, Bath, Eye, Heart, Euro, TrendingUp } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Investment = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/properties`);
        setProperties(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Emlak bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppInquiry = (property) => {
    const message = encodeURIComponent(
      `Merhaba, ${property.title} (${formatPrice(property.price)}) hakkında detaylı bilgi almak istiyorum.`
    );
    window.open(`https://wa.me/905332853031?text=${message}`, '_blank');
  };

  return (
    <section id="investment" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-blue-200">
            <Euro className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-blue-900">250.000 € Yatırım Seçenekleri</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            Premium Emlak 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 block">
              Portföyümüz
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Golden Visa için özenle seçilmiş, yüksek getiri potansiyeli olan 
            emlak yatırım fırsatlarını keşfedin.
          </p>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">❌ {error}</div>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Yeniden Dene
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <Card key={property.id || property._id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
              <div className="relative">
                {/* Property Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
                  {property.title === "Atina Merkez Luxury Daire" ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/risrobbk_Atinada%20ymodernn%20daire.jpg"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-cover"
                    />
                  ) : property.title === "Santorini Villa Projesi" ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/fudm88p8_yunan%20santorini%20evi%20g%C3%B6rseli%20haz%C4%B1rla.jpg"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-cover"
                    />
                  ) : property.title === "Selanik Modern Residans" ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/blyo84di_selanik%20modern.jpg"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-cover"
                    />
                  ) : property.title === "Mykonos Beach House" ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/b8fb6tzh_mykonos%20beach%20.jpg"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-cover"
                    />
                  ) : property.title === "Krete Luxury Resort Daire" ? (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/aj8gq9xi_girit%20yunanistan%20ev%20g%C3%B6rseli.jpg"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4bc69a22-5958-4fd2-8ab8-e3ba9bf81887/artifacts/hb6zkecc_gorsel%201.png"
                      alt={`${property.title} - ${property.location}`}
                      className="w-full h-full object-contain bg-white"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-center space-y-1 bg-white/95 p-3 rounded-lg shadow-lg">
                      <Home className="w-6 h-6 text-blue-600 mx-auto" />
                      <p className="text-sm text-blue-900 font-semibold">{property.location}</p>
                      <p className="text-xs text-gray-600">{property.type}</p>
                    </div>
                  </div>
                  
                  {/* Property Type Badge */}
                  <Badge className="absolute top-3 left-3 bg-white/90 text-blue-900 hover:bg-white">
                    {property.type}
                  </Badge>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(property.id || property._id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(property.id || property._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-blue-900/90 text-white px-3 py-1 rounded-lg font-bold">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        {property.size}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 2}
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {property.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => setSelectedProperty(property)}
                      variant="outline"
                      className="flex-1 text-blue-900 border-blue-200 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Detaylar
                    </Button>
                    <Button
                      onClick={() => handleWhatsAppInquiry(property)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Bilgi Al
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
          </div>
        )}

        {/* Investment Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-blue-900">
                Neden Yunanistan Emlak Yatırımı?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Garantili Golden Visa</h4>
                    <p className="text-gray-600 text-sm">250.000 € ve üzeri yatırımlar Golden Visa hakkı verir</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Yüksek Kira Getirisi</h4>
                    <p className="text-gray-600 text-sm">Turizm bölgelerinde %6-8 arası yıllık getiri</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Değer Artışı</h4>
                    <p className="text-gray-600 text-sm">Stratejik lokasyonlarda sürekli değer kazanımı</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">€250K+</div>
                  <div className="text-sm text-gray-600">Min. Yatırım</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">6-8%</div>
                  <div className="text-sm text-gray-600">Yıllık Getiri</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">Visa Garantisi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3-6 Ay</div>
                  <div className="text-sm text-gray-600">Süreç</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{selectedProperty.title}</h3>
                    <p className="text-gray-600">{selectedProperty.location}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="text-3xl font-bold text-blue-900">
                  {formatPrice(selectedProperty.price)}
                </div>
                
                <p className="text-gray-700">{selectedProperty.description}</p>
                
                <div className="grid grid-cols-3 gap-4 py-4 border-y">
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <div className="font-semibold">{selectedProperty.bedrooms}</div>
                    <div className="text-sm text-gray-600">Yatak Odası</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <div className="font-semibold">{selectedProperty.bathrooms}</div>
                    <div className="text-sm text-gray-600">Banyo</div>
                  </div>
                  <div className="text-center">
                    <Home className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <div className="font-semibold">{selectedProperty.size}</div>
                    <div className="text-sm text-gray-600">Alan</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Özellikler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleWhatsAppInquiry(selectedProperty)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  Bu Emlak Hakkında Bilgi Al
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Investment;