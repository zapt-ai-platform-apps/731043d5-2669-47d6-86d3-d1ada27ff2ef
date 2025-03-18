# RFeye Deployment Planner

An application for planning and optimizing RF sensor deployments across various scenarios (border security, infrastructure protection, spectrum monitoring, etc.) for CRFS customers.

## Key Features

1. **Deployment Scenario Builder**
   - Selection of mission types (border security, drone detection, spectrum monitoring)
   - Environment specification (urban, rural, coastal, etc.)
   - Coverage objective setting (area coverage, specific site protection)

2. **Equipment Recommendation Engine**
   - AI-powered suggestions of appropriate RFeye Node models based on scenario
   - Recommended sensor quantities and configurations
   - Optional accessories and deployment kits (Stormcase, Outdoor System Kit)

3. **Deployment Visualization**
   - Map interface for placing sensors
   - Coverage estimation
   - Sensor density recommendations

4. **Requirements Documentation**
   - Generates deployment requirement documents
   - Equipment lists with specifications
   - Budget estimation tools

## Development

This project is built with:
- React
- Vite
- Tailwind CSS
- Leaflet (for maps)
- HTML2Canvas and jsPDF (for document generation)

To run the development server:

```
npm install
npm run dev
```

To build for production:

```
npm run build
```

## Deployment

This application is deployed on Vercel.