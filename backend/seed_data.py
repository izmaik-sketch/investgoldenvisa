#!/usr/bin/env python3
"""
Golden Citizen Database Seeding Script
This script populates the database with initial property and company data
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_properties():
    """Seed the database with sample properties"""
    properties = [
        {
            "title": "Atina Merkez Luxury Daire",
            "location": "Kolonaki, Atina",
            "price": 280000,
            "type": "Daire",
            "size": "120 m²",
            "bedrooms": 3,
            "bathrooms": 2,
            "features": ["Şehir Manzarası", "Merkezi Konum", "Yüksek Kira Potansiyeli"],
            "description": "Atina'nın en prestijli semti Kolonaki'de, metro ve alışveriş merkezlerine yürüme mesafesinde luxury daire.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        },
        {
            "title": "Santorini Villa Projesi",
            "location": "Oia, Santorini",
            "price": 450000,
            "type": "Villa",
            "size": "180 m²",
            "bedrooms": 4,
            "bathrooms": 3,
            "features": ["Deniz Manzarası", "Turizm Potansiyeli", "Premium Lokasyon"],
            "description": "Santorini'nin ünlü Oia kasabasında, Ege Denizi manzaralı villa. Yüksek turizm geliri potansiyeli.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        },
        {
            "title": "Selanik Modern Residans",
            "location": "Selanik Merkez",
            "price": 250000,
            "type": "Daire",
            "size": "95 m²",
            "bedrooms": 2,
            "bathrooms": 2,
            "features": ["Yeni Proje", "Garantili Kira", "İnvestment Grade"],
            "description": "Selanik'in gelişen bölgesinde, garantili kira geliri ile modern residans projesi.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        },
        {
            "title": "Mykonos Beach House",
            "location": "Platys Gialos, Mykonos",
            "price": 380000,
            "type": "Villa",
            "size": "150 m²",
            "bedrooms": 3,
            "bathrooms": 2,
            "features": ["Plaj Erişimi", "Lux Tatil Evi", "Airbnb Uygun"],
            "description": "Mykonos'un ünlü plajlarından Platys Gialos'a sadece 50 metre mesafede beach house.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        },
        {
            "title": "Korfu Evi",
            "location": "Korfu",
            "price": 320000,
            "type": "Villa",
            "size": "140 m²",
            "bedrooms": 3,
            "bathrooms": 2,
            "features": ["İyon Denizi", "Romantik Konum", "Geleneksel Mimari"],
            "description": "Korfu İyon Denizi üzerinde yer alan Korfu, Yunanistan'ın en güzel ve romantik adalarından biridir. Korfu'da birçok farklı tipte satılık ev bulabilirsiniz.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        },
        {
            "title": "Krete Luxury Resort Daire",
            "location": "Chania, Krete",
            "price": 275000,
            "type": "Resort Daire",
            "size": "110 m²",
            "bedrooms": 2,
            "bathrooms": 2,
            "features": ["Resort İçinde", "Havuz", "Spa Erişimi"],
            "description": "Krete'nin en güzel sahil şeridi Chania'da, 5 yıldızlı resort içinde luxury daire.",
            "imageUrl": "/api/placeholder/400/300",
            "gallery": ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
            "isActive": True,
            "createdAt": datetime.utcnow()
        }
    ]
    
    # Clear existing properties
    await db.properties.delete_many({})
    
    # Insert new properties
    result = await db.properties.insert_many(properties)
    print(f"✅ Inserted {len(result.inserted_ids)} properties")

async def seed_company_info():
    """Seed the database with company information"""
    company_info = {
        "founder": {
            "name": "Ali İrfan Kaynak",
            "title": "Kurucu & Golden Visa Uzmanı",
            "experience": "5+ Yıl Gayrimenkul Sektörü deneyimi",
            "credentials": "Gayrimenkul Yatırım Danışmanı, AB Göçmenlik Uzmanı",
            "description": "İzmir merkezli boutique gayrimenkul danışmanlık firması Golden Citizen'in kurucusu Ali İrfan Kaynak, 5 yılı aşkın süredir Gayrimenkul Sektöründedir ve ayrıca Türk yatırımcılara Yunanistan Golden Visa sürecinde rehberlik etmektedir.",
            "achievements": [
                "Başarılı Golden Visa Başvuruları",
                "100% başarı oranı",
                "İzmir'in en güvenilir Golden Visa uzmanı",
                "Şeffaf ve dürüst danışmanlık yaklaşımı"
            ]
        },
        "contact": {
            "whatsapp": "+90 533 285 30 31",
            "email": "info@goldencitizen.com.tr",
            "address": "İzmir, Türkiye",
            "officeHours": "Pazartesi - Cuma: 09:00 - 18:00"
        },
        "stats": {
            "successfulApplications": 50,
            "successRate": 100,
            "experienceYears": 5,
            "averageProcessTime": "3-6 ay"
        },
        "updatedAt": datetime.utcnow()
    }
    
    # Clear existing company info
    await db.company_info.delete_many({})
    
    # Insert company info
    result = await db.company_info.insert_one(company_info)
    print(f"✅ Inserted company information with ID: {result.inserted_id}")

async def main():
    """Main seeding function"""
    print("🌱 Starting database seeding for Golden Citizen...")
    
    try:
        await seed_properties()
        await seed_company_info()
        print("✅ Database seeding completed successfully!")
        
        # Verify data
        property_count = await db.properties.count_documents({})
        company_count = await db.company_info.count_documents({})
        
        print(f"📊 Verification:")
        print(f"   - Properties: {property_count}")
        print(f"   - Company Info: {company_count}")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())