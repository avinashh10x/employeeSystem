**Employee Management System API Documentation**

### **Base URL**
`https://employeesystem-4wri.onrender.com/api/`

---

### **1. Welcome Endpoint**
- **Method:** GET  
- **Endpoint:** `/`
- **Description:** A simple test endpoint to check if the server is running.  
- **Response:**  
  ```json
  "Hello, World! from employee server"
  ```

---

### **2. Register a New Employee**
- **Method:** POST  
- **Endpoint:** `/api/register/`
- **Description:** Registers a new employee in the system.
- **Request Body:**  
  ```json
  {
    "employeeId": "string",
    "name": "string",
    "phone": "string",
    "role": "string",
    "bloodGroup": "string",
    "password": "string",
    "gender": "male" | "female",
    "email": "string",
    "dob":"date"
  }
  ```
- **Response:**  
  ```json
  {
    "success": true,
    "token": "JWT Token",
    "employee": {
      "employeeId": "string",
      "name": "string",
      "phone": "string",
      "bloodGroup": "string",
      "role": "string",
      "gender": "string",
      "email": "string",
       "dob": "date"
    },
    "message": "Employee registered successfully"
  }
  ```

---

### **3. Employee Login**
- **Method:** POST  
- **Endpoint:** `/api/login/`
- **Description:** Authenticates an employee and returns a JWT token.
- **Request Body:**  
  ```json
  {
    "employeeId": "string",
    "password": "string"
  }
  ```
- **Response:**  
  ```json
  {
    "success": true,
    "message": "Logged in successfully",
    "token": "JWT Token",
    "employee": {
      "employeeId": "string",
      "name": "string",
      "phone": "string",
      "bloodGroup": "string"
    }
  }
  ```

---

### **4. Fetch All Employees**
- **Method:** GET  
- **Endpoint:** `/api/getemployees/`
- **Description:** Retrieves a list of all employees excluding passwords.
- **Response:**  
  ```json
  [
    {
      "employeeId": "string",
      "name": "string",
      "phone": "string",
      "role": "string",
      "bloodGroup": "string",
      "gender": "string"
    }
  ]
  ```

### **5. Fetch single Employees**
- **Method:** GET  
- **Endpoint:** `/api/getsingleemployee/`
- **Authtoken:** `token`
- **Description:** Retrieves a employees excluding passwords.
- **Response:**  
  ```json
  {
    
     "success": true,
    "message": "Fetched data successfully",
    {
      "employeeId": "string",
      "name": "string",
      "phone": "string",
      "role": "string",
      "bloodGroup": "string",
      "gender": "string",
      "email": "string",
    }
  }
  
  ```


---

### **6. Update Employee Details**
- **Method:** PATCH  
- **Endpoint:** `/api/updateemployee/`
- **Description:** Updates an existing employee's details.
- **Request Body:**  
  ```json
  {
    "employeeId": "string",
    "name": "string",
    "phone": "string",
    "role": "string",
    "bloodGroup": "string",
    "password": "string",
  }
  ```
- **Response:**  
  ```json
  {
    "success": true,
    "message": "Employee updated successfully"
  }
  ```

---

### **7. Remove an Employee**
- **Method:** DELETE  
- **Endpoint:** `/api/removeEmployee/`
- **Description:** Deletes an employee using their employee ID.
- **Request Body:**  
  ```json
  {
    "employeeId": "string"
  }
  ```
- **Response:**  
  ```json
  {
    "success": true,
    "message": "Employee deleted successfully"
  }
  ```

---


### **8. Upload Media**
- **Method:** POST  
- **Endpoint:** `/api/uploadimg/`
- **Description:** Uploads an image to Cloudinary.
- **Request Body:** Form-data with key "image" and the file to be uploaded.

- **Response:**  
  ```json
  {
  "message": "File uploaded successfully",
  "status": true,
  "cloudinaryUrl": "string"
  }
  ```

---

### **9. Employee Logout**
- **Method:** GET  
- **Endpoint:** `/api/logout/`  
- **Description:** Logs out the employee by invalidating the session on the backend.  

#### **Frontend Implementation (Before Calling Logout API)**
Before making a request to the logout API, ensure the JWT token is removed from storage:

---


### **6. create Employee **
- **Method:** PATCH  
- **Endpoint:** `/api/createemployee/`
- **Description:** create an employee.
- **Request Body:**  
  ```json
  {
     "avatar":"string url of avatar image"
  }
  ```
- **Response:**  
  ```json
  {
    "success": true,
    "message": "Employee created successfully",
     "employeeObj": {
      "employeeId": "string",
      "name": "string",
      "phone": "string",
      "role": "string",
      "bloodGroup": "string",
      "gender": "string",
      "email": "string",
      "dob": "date",
      "avatar": "string",
      }
  }

  ```



  ---

### **10. Employee Check-In**
- **Method:** POST  
- **Endpoint:** `/api/attendence/checkIn`  
- **Description:** Allows an employee to check in for the day. If the employee has already checked in for the day, it will return an error message.  
- **Headers:**  
  - `Authorization`: `Bearer <JWT Token>`  
- **Request Body:**  
  ```json
  {
    "location": "string",
    "url": "string"
  }

  - **Response:**  
  ```json

    {
         "message": "Check-in added successfully",
         "attendance": {
        "_id": "string",
        "employeeId": "string",
        "location": "string",
        "url": "string",
        "checkIn": "date",
        "createdAt": "date",
        "updatedAt": "date"
    }
  }
  - **Response: if its already checkin** 
  {
  "message": "Employee has already checked in for today"
  }



---

### **11. Employee Check-Out**
- **Method:** PATCH  
- **Endpoint:** `/api/attendence/checkout`  
- **Description:** Allows an employee to check out for the day. If the employee has not checked in yet, it will return an error message. If the employee has already checked out, it will also return an error message.  
- **Headers:**  
  - `Authorization`: `Bearer <JWT Token>`  
- **Response (Success):**  
  ```json
  {
    "message": "Check-out added successfully",
    "attendance": {
      "_id": "string",
      "employeeId": "string",
      "location": "string",
      "url": "string",
      "checkIn": "date",
      "checkOut": "date",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }

  **Response: if checkout api is called without checked in**  

  {
  "message": "Employee has not checked in yet"
  }

 **Response: if checkout api is called with already checked out**  

  {
  "message": "Employee has already checked out for today"
  }