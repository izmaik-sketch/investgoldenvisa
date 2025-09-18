#!/usr/bin/env python3
"""
Backend API Testing for Golden Citizen Website
Tests all backend endpoints for the Greece Golden Visa program
"""

import requests
import json
import sys
from datetime import datetime
import time

# Configuration
BASE_URL = "https://invest-golden-visa.preview.emergentagent.com/api"
TIMEOUT = 30

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        self.test_data = {}
    
    def log(self, message, level="INFO"):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {level}: {message}")
    
    def test_api_endpoint(self, method, endpoint, data=None, expected_status=200, test_name=""):
        """Generic API testing method"""
        self.results["total_tests"] += 1
        url = f"{BASE_URL}{endpoint}"
        
        try:
            self.log(f"Testing {test_name}: {method} {url}")
            
            if method.upper() == "GET":
                response = requests.get(url, timeout=TIMEOUT)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, timeout=TIMEOUT, 
                                       headers={"Content-Type": "application/json"})
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            # Check status code
            if response.status_code != expected_status:
                error_msg = f"{test_name} FAILED: Expected status {expected_status}, got {response.status_code}"
                self.log(error_msg, "ERROR")
                self.log(f"Response: {response.text}", "ERROR")
                self.results["failed"] += 1
                self.results["errors"].append(error_msg)
                return None
            
            # Try to parse JSON response
            try:
                json_response = response.json()
                self.log(f"{test_name} PASSED: Status {response.status_code}", "SUCCESS")
                self.results["passed"] += 1
                return json_response
            except json.JSONDecodeError:
                error_msg = f"{test_name} FAILED: Invalid JSON response"
                self.log(error_msg, "ERROR")
                self.log(f"Response text: {response.text}", "ERROR")
                self.results["failed"] += 1
                self.results["errors"].append(error_msg)
                return None
                
        except requests.exceptions.RequestException as e:
            error_msg = f"{test_name} FAILED: Request error - {str(e)}"
            self.log(error_msg, "ERROR")
            self.results["failed"] += 1
            self.results["errors"].append(error_msg)
            return None
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        self.log("=== Testing Root Endpoint ===")
        response = self.test_api_endpoint("GET", "/", test_name="Root API")
        
        if response:
            # Verify response structure
            if "message" in response and "status" in response:
                self.log("Root endpoint structure validation PASSED", "SUCCESS")
                if "Golden" in response["message"] and response["status"] == "active":
                    self.log("Root endpoint content validation PASSED", "SUCCESS")
                else:
                    self.log("Root endpoint content validation FAILED", "ERROR")
                    self.results["errors"].append("Root endpoint content validation failed")
            else:
                self.log("Root endpoint structure validation FAILED", "ERROR")
                self.results["errors"].append("Root endpoint missing required fields")
    
    def test_properties_api(self):
        """Test Property Management API endpoints"""
        self.log("=== Testing Property Management API ===")
        
        # Test GET /api/properties
        properties = self.test_api_endpoint("GET", "/properties", test_name="Get All Properties")
        
        if properties is not None:
            # Validate properties structure
            if isinstance(properties, list):
                self.log(f"Properties list validation PASSED: Found {len(properties)} properties", "SUCCESS")
                
                if len(properties) > 0:
                    # Test first property structure
                    first_property = properties[0]
                    required_fields = ["title", "location", "price", "type", "size", "bedrooms", "bathrooms", "features", "description"]
                    
                    missing_fields = [field for field in required_fields if field not in first_property]
                    if not missing_fields:
                        self.log("Property structure validation PASSED", "SUCCESS")
                        
                        # Check for Turkish content
                        turkish_content = any(
                            any(char in str(first_property.get(field, "")) for char in "çğıöşüÇĞIÖŞÜ")
                            for field in ["title", "location", "description"]
                        )
                        if turkish_content:
                            self.log("Turkish content validation PASSED", "SUCCESS")
                        else:
                            self.log("Turkish content validation WARNING: No Turkish characters found", "WARNING")
                        
                        # Store property ID for individual property test
                        if "_id" in first_property or "id" in first_property:
                            property_id = first_property.get("_id") or first_property.get("id")
                            self.test_data["property_id"] = property_id
                            
                            # Test GET /api/properties/{id}
                            single_property = self.test_api_endpoint("GET", f"/properties/{property_id}", 
                                                                   test_name="Get Single Property")
                            
                            if single_property:
                                if single_property.get("_id") == property_id or single_property.get("id") == property_id:
                                    self.log("Single property ID validation PASSED", "SUCCESS")
                                else:
                                    self.log("Single property ID validation FAILED", "ERROR")
                                    self.results["errors"].append("Single property returned wrong ID")
                        else:
                            self.log("Property ID field missing", "ERROR")
                            self.results["errors"].append("Property missing ID field")
                    else:
                        error_msg = f"Property structure validation FAILED: Missing fields {missing_fields}"
                        self.log(error_msg, "ERROR")
                        self.results["errors"].append(error_msg)
                else:
                    self.log("No properties found in database", "WARNING")
            else:
                error_msg = "Properties endpoint should return a list"
                self.log(error_msg, "ERROR")
                self.results["errors"].append(error_msg)
        
        # Test invalid property ID
        self.test_api_endpoint("GET", "/properties/invalid_id", expected_status=400, 
                             test_name="Invalid Property ID")
        
        # Test non-existent property ID
        self.test_api_endpoint("GET", "/properties/507f1f77bcf86cd799439011", expected_status=404,
                             test_name="Non-existent Property ID")
    
    def test_contact_api(self):
        """Test Contact Form API endpoints"""
        self.log("=== Testing Contact Form API ===")
        
        # Test POST /api/contact with valid data
        contact_data = {
            "name": "Ahmet Yılmaz",
            "email": "ahmet.yilmaz@example.com",
            "phone": "+90 532 123 45 67",
            "subject": "Golden Visa Danışmanlığı",
            "message": "Yunanistan Golden Visa programı hakkında detaylı bilgi almak istiyorum. 250.000 Euro yatırım için uygun gayrimenkul seçeneklerini öğrenmek istiyorum."
        }
        
        contact_response = self.test_api_endpoint("POST", "/contact", data=contact_data, 
                                                test_name="Submit Contact Form")
        
        if contact_response:
            # Validate response structure
            required_fields = ["success", "message"]
            missing_fields = [field for field in required_fields if field not in contact_response]
            
            if not missing_fields:
                if contact_response["success"] is True:
                    self.log("Contact form submission validation PASSED", "SUCCESS")
                    
                    # Check for Turkish response message
                    if "başarıyla" in contact_response["message"] or "gönderildi" in contact_response["message"]:
                        self.log("Turkish response message validation PASSED", "SUCCESS")
                    else:
                        self.log("Turkish response message validation WARNING", "WARNING")
                    
                    # Store contact ID if provided
                    if "id" in contact_response:
                        self.test_data["contact_id"] = contact_response["id"]
                else:
                    error_msg = "Contact form submission failed: success field is False"
                    self.log(error_msg, "ERROR")
                    self.results["errors"].append(error_msg)
            else:
                error_msg = f"Contact response missing fields: {missing_fields}"
                self.log(error_msg, "ERROR")
                self.results["errors"].append(error_msg)
        
        # Test GET /api/contacts (admin endpoint)
        contacts = self.test_api_endpoint("GET", "/contacts", test_name="Get All Contacts")
        
        if contacts is not None:
            if isinstance(contacts, list):
                self.log(f"Contacts list validation PASSED: Found {len(contacts)} contacts", "SUCCESS")
                
                if len(contacts) > 0:
                    # Verify our submitted contact is in the list
                    recent_contact = contacts[0]  # Should be most recent due to sorting
                    if recent_contact.get("name") == contact_data["name"]:
                        self.log("Contact persistence validation PASSED", "SUCCESS")
                    else:
                        self.log("Contact persistence validation WARNING: Recent contact not found", "WARNING")
            else:
                error_msg = "Contacts endpoint should return a list"
                self.log(error_msg, "ERROR")
                self.results["errors"].append(error_msg)
        
        # Test POST /api/contact with invalid data
        invalid_contact_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email format
            "phone": "",  # Empty phone
            "message": ""  # Empty message
        }
        
        # This should still work as backend doesn't validate, but let's test
        self.test_api_endpoint("POST", "/contact", data=invalid_contact_data, 
                             test_name="Submit Invalid Contact Form")
    
    def test_company_info_api(self):
        """Test Company Info API endpoint"""
        self.log("=== Testing Company Info API ===")
        
        company_info = self.test_api_endpoint("GET", "/company-info", test_name="Get Company Info")
        
        if company_info:
            # Validate company info structure
            required_sections = ["founder", "contact", "stats"]
            missing_sections = [section for section in required_sections if section not in company_info]
            
            if not missing_sections:
                self.log("Company info structure validation PASSED", "SUCCESS")
                
                # Validate founder section
                founder = company_info["founder"]
                founder_fields = ["name", "title", "experience", "credentials", "description", "achievements"]
                missing_founder_fields = [field for field in founder_fields if field not in founder]
                
                if not missing_founder_fields:
                    self.log("Founder info structure validation PASSED", "SUCCESS")
                    
                    # Check for Turkish content in founder info
                    turkish_content = any(
                        any(char in str(founder.get(field, "")) for char in "çğıöşüÇĞIÖŞÜ")
                        for field in ["title", "experience", "description"]
                    )
                    if turkish_content:
                        self.log("Founder Turkish content validation PASSED", "SUCCESS")
                    else:
                        self.log("Founder Turkish content validation WARNING", "WARNING")
                    
                    # Check for expected founder name
                    if "Ali İrfan Kaynak" in founder.get("name", ""):
                        self.log("Founder name validation PASSED", "SUCCESS")
                    else:
                        self.log("Founder name validation WARNING: Expected name not found", "WARNING")
                else:
                    error_msg = f"Founder info missing fields: {missing_founder_fields}"
                    self.log(error_msg, "ERROR")
                    self.results["errors"].append(error_msg)
                
                # Validate contact section
                contact = company_info["contact"]
                contact_fields = ["whatsapp", "email", "address", "officeHours"]
                missing_contact_fields = [field for field in contact_fields if field not in contact]
                
                if not missing_contact_fields:
                    self.log("Contact info structure validation PASSED", "SUCCESS")
                    
                    # Validate WhatsApp number format
                    whatsapp = contact.get("whatsapp", "")
                    if whatsapp.startswith("+90") and len(whatsapp.replace(" ", "")) >= 13:
                        self.log("WhatsApp number format validation PASSED", "SUCCESS")
                    else:
                        self.log("WhatsApp number format validation WARNING", "WARNING")
                else:
                    error_msg = f"Contact info missing fields: {missing_contact_fields}"
                    self.log(error_msg, "ERROR")
                    self.results["errors"].append(error_msg)
                
                # Validate stats section
                stats = company_info["stats"]
                stats_fields = ["successfulApplications", "successRate", "experienceYears", "averageProcessTime"]
                missing_stats_fields = [field for field in stats_fields if field not in stats]
                
                if not missing_stats_fields:
                    self.log("Stats info structure validation PASSED", "SUCCESS")
                    
                    # Validate stats values
                    if (isinstance(stats.get("successfulApplications"), int) and 
                        isinstance(stats.get("successRate"), int) and
                        isinstance(stats.get("experienceYears"), int)):
                        self.log("Stats data types validation PASSED", "SUCCESS")
                    else:
                        self.log("Stats data types validation WARNING", "WARNING")
                else:
                    error_msg = f"Stats info missing fields: {missing_stats_fields}"
                    self.log(error_msg, "ERROR")
                    self.results["errors"].append(error_msg)
            else:
                error_msg = f"Company info missing sections: {missing_sections}"
                self.log(error_msg, "ERROR")
                self.results["errors"].append(error_msg)
    
    def test_error_handling(self):
        """Test API error handling"""
        self.log("=== Testing Error Handling ===")
        
        # Test non-existent endpoint
        self.test_api_endpoint("GET", "/non-existent", expected_status=404, 
                             test_name="Non-existent Endpoint")
        
        # Test malformed JSON in POST request
        try:
            url = f"{BASE_URL}/contact"
            response = requests.post(url, data="invalid json", 
                                   headers={"Content-Type": "application/json"}, 
                                   timeout=TIMEOUT)
            if response.status_code in [400, 422]:
                self.log("Malformed JSON handling PASSED", "SUCCESS")
                self.results["passed"] += 1
            else:
                self.log(f"Malformed JSON handling FAILED: Expected 400/422, got {response.status_code}", "ERROR")
                self.results["failed"] += 1
                self.results["errors"].append("Malformed JSON not handled properly")
            self.results["total_tests"] += 1
        except Exception as e:
            self.log(f"Malformed JSON test error: {e}", "ERROR")
            self.results["failed"] += 1
            self.results["errors"].append(f"Malformed JSON test error: {e}")
            self.results["total_tests"] += 1
    
    def run_all_tests(self):
        """Run all backend tests"""
        self.log("Starting Golden Citizen Backend API Tests")
        self.log(f"Testing against: {BASE_URL}")
        
        start_time = time.time()
        
        # Run all test suites
        self.test_root_endpoint()
        self.test_properties_api()
        self.test_contact_api()
        self.test_company_info_api()
        self.test_error_handling()
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Print summary
        self.log("=" * 60)
        self.log("BACKEND API TEST SUMMARY")
        self.log("=" * 60)
        self.log(f"Total Tests: {self.results['total_tests']}")
        self.log(f"Passed: {self.results['passed']}")
        self.log(f"Failed: {self.results['failed']}")
        self.log(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        self.log(f"Duration: {duration:.2f} seconds")
        
        if self.results["errors"]:
            self.log("\nERRORS ENCOUNTERED:")
            for i, error in enumerate(self.results["errors"], 1):
                self.log(f"{i}. {error}")
        
        return self.results["failed"] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n✅ All backend tests passed!")
        sys.exit(0)
    else:
        print(f"\n❌ {tester.results['failed']} backend tests failed!")
        sys.exit(1)