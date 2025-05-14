# Canaville Resort Web Application

## Overview
Canaville Resort is a modern web application for a luxury resort located in Juja Farm, Kenya. The application provides a seamless booking experience for guests, allowing them to book accommodations, activities, and dining services.

## Features

### Guest Features
- **Booking System**
  - Accommodation booking with check-in/out dates
  - Activity reservations
  - Food and beverage ordering
  - Ground rental for events
  - Real-time availability checking
  - Cost calculation

- **Contact System**
  - Contact form for inquiries
  - Direct messaging to resort staff
  - Location information with Google Maps integration

- **User Interface**
  - Responsive design for all devices
  - Modern and intuitive navigation
  - Interactive booking process
  - Real-time form validation

### Admin Features
- **Booking Management**
  - View all bookings
  - Update booking status
  - Manage availability
  - Process payments

- **Event Management**
  - Create and manage events
  - Upload event posters
  - Track event registrations

- **Content Management**
  - Update resort information
  - Manage activities and services
  - Update pricing

## Technical Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Firebase for backend services
- Framer Motion for animations
- CSS3 for styling
- FontAwesome for icons

### Backend
- Firebase Firestore for database
- Firebase Authentication for admin access
- Firebase Storage for media files

## Project Structure
```
Frontend/
├── src/
│   ├── admin/           # Admin panel components
│   ├── components/      # Reusable components
│   ├── pages/          # Main page components
│   ├── assets/         # Images and static files
│   ├── firebase.ts     # Firebase configuration
│   └── App.tsx         # Main application component
```

## Setup and Installation

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn
   - Firebase account

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Navigate to project directory
   cd canaville-main

   # Install dependencies
   cd Frontend
   npm install

   # Start development server
   npm run dev
   ```

3. **Environment Variables**
   Create a `.env` file in the Frontend directory with:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Usage

### Guest Access
1. Visit the homepage
2. Navigate through available services
3. Use the booking system to make reservations
4. Contact staff through the contact form

### Admin Access
1. Navigate to `/admin`
2. Log in with admin credentials
3. Access the dashboard for:
   - Booking management
   - Event management
   - Content updates

## Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic

### Testing
```bash
# Run tests
npm test

# Run linting
npm run lint
```

## Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, email canavilleresort@gmail.com or contact the development team.

## Acknowledgments
- React.js community
- Firebase team
- All contributors to the project 