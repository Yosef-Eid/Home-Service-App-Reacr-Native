# Home Service App

A React Native mobile application built with Expo that provides home service booking functionality.

## Project Overview

This is a comprehensive home service booking application that allows users to:
- Browse and book various home services
- Manage their profile and addresses
- Track notifications and offers
- Get support and assistance

## Features

### Core Features
- User Authentication (Sign In/Sign Up)
- Service Browsing and Booking
- Profile Management
- Address Management
- Notification System
- Support System
- Offers and Discounts

### Technical Features
- React Navigation with Drawer and Stack Navigation
- Custom Drawer with multiple side menu options
- Modern UI with Tailwind CSS styling
- Location Services Integration
- Image Picker Integration
- Map Integration for address selection
- State Management with AsyncStorage

## Project Structure

```
my-expo-app/
├── components/          # Reusable UI components
├── screens/            # Main screen components
├── assets/            # Static assets (images, fonts, etc.)
├── data/              # Static data files
└── App.tsx           # Root application component
```

## Key Components

### Navigation
- Drawer Navigation with custom drawer content
- Stack Navigation for screen transitions
- Custom drawer with multiple side menu options

### Screens
- Home Screen
- Profile Screen
- Address Management
- Services Browsing
- Service Details
- Notifications
- Support
- Offers
- Refer-a-Friend

## Technologies Used

- React Native 0.79.2
- Expo 53.0.6
- React Navigation 7.x
- Tailwind CSS
- NativeWind
- Expo Location
- Expo Image Picker
- React Native Maps
- AsyncStorage
- TypeScript
- ESLint & Prettier for code quality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on a specific platform:
```bash
npm run android   # For Android
npm run ios       # For iOS
npm run web       # For web
```

## Development Setup

The project uses TypeScript for type safety and includes:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type definitions
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
