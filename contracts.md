# Golden Citizen Website - API Contracts

## Overview
This document outlines the API contracts for the Golden Citizen website backend integration. Currently, the frontend uses mock data and needs backend API endpoints to replace the mock functionality.

## Current Mock Data Structure (from /app/frontend/src/mock/mockData.js)

### 1. Properties Data
**Mock Fields:**
- id, title, location, price, type, size, bedrooms, bathrooms
- features[], description, imageUrl, gallery[]

**API Needed:** 
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property details

### 2. Company Information
**Mock Fields:**
- founder details (name, title, experience, credentials, description, achievements[])
- contact info (whatsapp, email, address, officeHours)
- stats (successfulApplications, successRate, experienceYears, averageProcessTime)

**API Needed:**
- `GET /api/company-info` - Get company and founder information

### 3. Contact Form
**Current:** Frontend only form with mock submission
**API Needed:**
- `POST /api/contact` - Submit contact form
- Fields: name, email, phone, subject, message

### 4. Newsletter/Updates (Optional Enhancement)
**API Could Include:**
- `POST /api/newsletter` - Newsletter subscription

## Database Models Required

### Property Model
```javascript
{
  _id: ObjectId,
  title: String,
  location: String,
  price: Number,
  type: String, // "Daire", "Villa", "Townhouse", "Resort Daire"
  size: String, // "120 m²"
  bedrooms: Number,
  bathrooms: Number,
  features: [String],
  description: String,
  imageUrl: String,
  gallery: [String],
  isActive: Boolean,
  createdAt: Date
}
```

### Contact Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

### CompanyInfo Model (Static/Config)
```javascript
{
  _id: ObjectId,
  founder: {
    name: String,
    title: String,
    experience: String,
    credentials: String,
    description: String,
    achievements: [String]
  },
  contact: {
    whatsapp: String,
    email: String,
    address: String,
    officeHours: String
  },
  stats: {
    successfulApplications: Number,
    successRate: Number,
    experienceYears: Number,
    averageProcessTime: String
  },
  updatedAt: Date
}
```

## Frontend Integration Points

### 1. Properties Section (/app/frontend/src/components/Investment.jsx)
**Current:** `import { properties } from '../mock/mockData';`
**Replace with:** API call to fetch properties
**Integration:** Use axios to call `GET /api/properties`

### 2. About Section (/app/frontend/src/components/About.jsx)
**Current:** `import { companyInfo } from '../mock/mockData';`
**Replace with:** API call to fetch company info
**Integration:** Use axios to call `GET /api/company-info`

### 3. Contact Form (/app/frontend/src/components/Contact.jsx)
**Current:** Mock form submission with setTimeout
**Replace with:** Real API submission
**Integration:** Use axios to call `POST /api/contact`

### 4. Footer (/app/frontend/src/components/Footer.jsx)
**Current:** Uses companyInfo from mock
**Replace with:** API call to fetch contact info

## API Endpoints to Implement

### GET /api/properties
- Returns all active properties
- Response: `{ success: true, data: Property[] }`

### GET /api/properties/:id
- Returns single property details
- Response: `{ success: true, data: Property }`

### GET /api/company-info
- Returns company information and founder details
- Response: `{ success: true, data: CompanyInfo }`

### POST /api/contact
- Accepts contact form submission
- Body: `{ name, email, phone, subject, message }`
- Response: `{ success: true, message: "Contact form submitted successfully" }`

## Environment Variables Needed
- MONGO_URL (already exists)
- DB_NAME (already exists)

## Integration Steps
1. Create MongoDB models for Property, Contact, CompanyInfo
2. Implement API endpoints in FastAPI
3. Update frontend components to use API calls instead of mock data
4. Remove mock data imports
5. Test all functionality

## Notes
- WhatsApp integration (+90 554 234 44 00) is frontend-only and doesn't need backend
- Image placeholders are intentional - actual images to be provided later
- All Turkish content should remain exactly as implemented
- Maintain existing UI/UX and styling