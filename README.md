# TWINVISION 🏭🤖

**AI-Powered Machine Failure Prediction Dashboard**

TWINVISION is an intelligent industrial monitoring system that leverages artificial intelligence to predict machine failures before they occur, helping manufacturers minimize downtime and optimize maintenance schedules.

## 🌟 Features

### 🎯 Core Functionality
- **Real-time Machine Monitoring**: Live dashboard with comprehensive machine health metrics
- **AI-Powered Failure Prediction**: Advanced machine learning algorithms predict equipment failures
- **Interactive Visualizations**: Dynamic charts and graphs for data analysis
- **Alert Management**: Intelligent alerting system for proactive maintenance
- **Control Panel**: Remote machine control and parameter adjustment capabilities

### 🛠 Technical Features
- **Next.js 15** with App Router for modern web development
- **Firebase App Hosting** for scalable deployment
- **Google Gemini AI Integration** for intelligent predictions
- **Real-time Data Processing** with WebSocket support
- **Responsive Design** optimized for desktop and mobile
- **TypeScript** for type-safe development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase CLI
- Google Cloud Project with Gemini AI API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohankr1211/TWINVISION.git
   cd TWINVISION
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access the dashboard**
   Open [http://localhost:9002](http://localhost:9002) in your browser

## 🏗 Project Structure

```
TWINVISION/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/predict/        # AI prediction API endpoint
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Dashboard home page
│   ├── components/             # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── alerts-panel.tsx
│   │   │   ├── control-panel.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── failure-prediction-panel.tsx
│   │   │   ├── machine-card.tsx
│   │   │   ├── monitoring-panel.tsx
│   │   │   ├── replay-panel.tsx
│   │   │   └── visualization-panel.tsx
│   │   └── ui/                 # Reusable UI components
│   ├── ai/                     # AI/ML integration
│   │   ├── flows/              # AI workflow definitions
│   │   ├── genkit.ts           # Google Genkit configuration
│   │   └── dev.ts              # Development AI setup
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions and types
├── firebase.json               # Firebase configuration
├── apphosting.yaml             # Firebase App Hosting config
└── next.config.ts              # Next.js configuration
```

## 🤖 AI Integration

TWINVISION uses Google's Gemini AI for intelligent failure prediction:

- **Temperature Monitoring**: Analyzes temperature patterns for overheating risks
- **Load Analysis**: Evaluates machine load to predict stress-related failures
- **Speed Optimization**: Monitors operational speeds for efficiency insights
- **Predictive Maintenance**: Suggests optimal maintenance schedules

### API Endpoints

- `POST /api/predict` - Machine failure prediction endpoint
  ```json
  {
    "temperature": 75.5,
    "load": 85.2,
    "speed": 1200,
    "timestamp": "2025-01-18T13:30:00Z"
  }
  ```

## 🚀 Deployment

### Firebase App Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Enable Web Frameworks**
   ```bash
   firebase experiments:enable webframeworks
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Environment Variables

Set these in your Firebase project settings:
- `GOOGLE_GENAI_API_KEY` - Your Google Gemini AI API key

## 📊 Dashboard Components

### 🎛 Control Panel
- Real-time machine parameter adjustment
- Emergency stop controls
- Maintenance mode toggles

### 📈 Visualization Panel
- Interactive charts and graphs
- Historical data analysis
- Performance trend visualization

### 🚨 Alerts Panel
- Critical failure warnings
- Maintenance reminders
- Performance threshold alerts

### 🔮 Failure Prediction Panel
- AI-powered risk assessment
- Failure probability scores
- Recommended actions

## 🛠 Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
npm run genkit:dev       # Start Genkit development server
```

### Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI/ML**: Google Gemini AI, Genkit
- **Deployment**: Firebase App Hosting
- **Charts**: Recharts
- **Icons**: Lucide React

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email rohankr1856@gmail.com or create an issue in this repository.

## 🎯 Roadmap

- [ ] Multi-machine support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with IoT sensors
- [ ] Machine learning model training interface
- [ ] Historical data export
- [ ] Custom alert rules configuration

---

**Built with ❤️ for the future of industrial automation**
