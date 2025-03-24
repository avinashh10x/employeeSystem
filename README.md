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


