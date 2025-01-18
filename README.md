# Mission 5 Phase 2 - Frontend

## Quick Setup Guide

### Required Setup Steps
1. **Install Prerequisites**
   - Node.js and npm
   - Git
   - Backend server (see backend repository)

2. **Clone and Install**
   ```bash
   git clone [repository-url]
   cd M5-Phase2-frontend
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory with:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_URL=http://localhost:3000  # or your backend URL
   ```
   Note: You'll need to obtain a Google Maps API key from the Google Cloud Console

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

### Troubleshooting
- If the map doesn't load, verify your Google Maps API key
- If API calls fail, ensure the backend server is running
- For port conflicts, Vite will automatically suggest an alternative port

## Project Overview
This is Version 1 of our application based on the prototype design from UX Designers in Phase 1. The application is built as part of a team project where each developer is responsible for implementing at least one screen with both frontend and backend functionality.

## Features
- MongoDB integration for data persistence
- React-based frontend with modern UI components
- Shared common components across developers
- Screen-based development approach

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Backend server running (see backend README)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with necessary environment variables
4. Start the development server:
```bash
npm run dev
```

## Development Guidelines
- Each developer works on at least one complete screen
- Screens include both frontend UI and backend integration
- Use shared components for consistency
- Follow the established Git workflow for collaboration

## Project Structure
- `src/` - Source code directory
- `components/` - Reusable UI components
- `pages/` - Screen-specific components
- `services/` - API integration services

## Contributing
1. Create a feature branch
2. Implement your screen/feature
3. Submit a pull request
4. Collaborate with team members for review

## Team Collaboration
- Use Github for version control
- Share common components
- Regular team communication
- UX Designer consultation as needed
