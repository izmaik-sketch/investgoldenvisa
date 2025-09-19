from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Golden Citizen API", description="API for Golden Citizen Greece Golden Visa website")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def objectid_str(v):
    return str(v) if isinstance(v, ObjectId) else v

# Pydantic Models
class Property(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    location: str
    price: int
    type: str
    size: str
    bedrooms: int
    bathrooms: int
    features: List[str]
    description: str
    imageUrl: str = "/api/placeholder/400/300"
    gallery: List[str] = []
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class PropertyCreate(BaseModel):
    title: str
    location: str
    price: int
    type: str
    size: str
    bedrooms: int
    bathrooms: int
    features: List[str]
    description: str
    imageUrl: str = "/api/placeholder/400/300"
    gallery: List[str] = []

class Contact(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: str
    phone: str
    subject: str = "Golden Visa Danışmanlığı"
    message: str
    isRead: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str
    subject: str = "Golden Visa Danışmanlığı"
    message: str

class FounderInfo(BaseModel):
    name: str
    title: str
    experience: str
    credentials: str
    description: str
    achievements: List[str]

class ContactInfo(BaseModel):
    whatsapp: str
    email: str
    address: str
    officeHours: str

class Stats(BaseModel):
    successfulApplications: int
    successRate: int
    experienceYears: int
    averageProcessTime: str

class CompanyInfo(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    founder: FounderInfo
    contact: ContactInfo
    stats: Stats
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Golden Citizen API - Yunanistan Golden Visa", "status": "active"}

@api_router.get("/properties", response_model=List[Property])
async def get_properties():
    """Get all active properties for Golden Visa investment"""
    try:
        properties = await db.properties.find({"isActive": True}).to_list(100)
        for prop in properties:
            prop["_id"] = str(prop["_id"])
        return properties
    except Exception as e:
        logger.error(f"Error fetching properties: {e}")
        raise HTTPException(status_code=500, detail="Error fetching properties")

@api_router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    """Get single property details"""
    try:
        if not ObjectId.is_valid(property_id):
            raise HTTPException(status_code=400, detail="Invalid property ID")
        
        property = await db.properties.find_one({"_id": ObjectId(property_id), "isActive": True})
        if not property:
            raise HTTPException(status_code=404, detail="Property not found")
        
        property["_id"] = str(property["_id"])
        return property
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching property {property_id}: {e}")
        raise HTTPException(status_code=500, detail="Error fetching property")

@api_router.post("/properties", response_model=Property)
async def create_property(property: PropertyCreate):
    """Create a new property (admin use)"""
    try:
        property_dict = property.dict()
        property_dict["createdAt"] = datetime.utcnow()
        property_dict["isActive"] = True
        
        result = await db.properties.insert_one(property_dict)
        property_dict["_id"] = str(result.inserted_id)
        return property_dict
    except Exception as e:
        logger.error(f"Error creating property: {e}")
        raise HTTPException(status_code=500, detail="Error creating property")

@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    """Submit contact form"""
    try:
        contact_dict = contact.dict()
        contact_dict["createdAt"] = datetime.utcnow()
        contact_dict["isRead"] = False
        
        result = await db.contacts.insert_one(contact_dict)
        
        logger.info(f"New contact submission from {contact.name} ({contact.email})")
        
        return {
            "success": True, 
            "message": "İletişim formunuz başarıyla gönderildi. En kısa sürede size geri dönüş yapacağız.",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Error submitting contact form")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    """Get all contact submissions (admin use)"""
    try:
        contacts = await db.contacts.find().sort("createdAt", -1).to_list(100)
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        return contacts
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail="Error fetching contacts")

@api_router.get("/company-info", response_model=CompanyInfo)
async def get_company_info():
    """Get company and founder information"""
    try:
        company_info = await db.company_info.find_one()
        if not company_info:
            # Return default company info if none exists
            return await create_default_company_info()
        
        company_info["_id"] = str(company_info["_id"])
        return company_info
    except Exception as e:
        logger.error(f"Error fetching company info: {e}")
        raise HTTPException(status_code=500, detail="Error fetching company info")

async def create_default_company_info():
    """Create default company information"""
    default_info = {
        "founder": {
            "name": "Ali İrfan Kaynak",
            "title": "Kurucu & Golden Visa Uzmanı",
            "experience": "5+ yıl Yunanistan Golden Visa deneyimi",
            "credentials": "Gayrimenkul Yatırım Danışmanı, AB Göçmenlik Uzmanı",
            "description": "İzmir merkezli boutique danışmanlık firması Golden Citizen'in kurucusu Ali İrfan Kaynak, 5 yılı aşkın süredir Türk yatırımcılara Yunanistan Golden Visa sürecinde rehberlik etmektedir.",
            "achievements": [
                "50+ başarılı Golden Visa başvurusu",
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
    
    result = await db.company_info.insert_one(default_info)
    default_info["_id"] = str(result.inserted_id)
    return default_info

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
