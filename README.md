# Smart Canteen Management System

### Overview
The **Smart Canteen Management System** is a web-based platform designed to streamline canteen operations, enhance user experience, and optimize the ordering and payment processes. This system includes separate modules for users, admins, and delivery staff, enabling a seamless and organized workflow.

### Features
- **User Module**:  
  - View menu, add items to cart, and place orders
  - Choose payment method (UPI, QR code, card, net banking)
  - Track order status (pending, in preparation, delivered, cancelled)
  - Access order history with options to leave feedback for delivered orders
  - Profile page with personal info, order history, and favorite items
  - Recommendation system which gives personalized recommendations for next order
  
- **Admin Module**:
  - Manage menu items, user profiles, and staff information
  - View and manage orders, including updating status and viewing queries
  - Access contact form submissions from users
  - Real-time dashboard for analytics and reporting

### Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas for cloud storage)
- **Notifications**: Nodemailer (for email notifications)

### Installation

#### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/smart-canteen-management.git
   cd smart-canteen-management
2. **npm install**
3. **MONGODB_URI=<your-mongodb-uri>**
4. **NODEMAILER_USER=<your-email>**
5. **NODEMAILER_PASS=<your-password>**
6. **npm start**

