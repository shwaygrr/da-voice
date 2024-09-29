# Da Voice
Da Voice is a web application designed to help users stay informed about their local and national elections, representatives, and key resources related to voting. It features an interactive map that displays user-specific information based on their zip code, a sidebar with election and representative details, and smooth navigation between different sections of the site. Additionally, OpenAI is integrated to provide quick summaries of representatives and their views based on available data.

# Description
Da Voice provides an easy-to-use platform where users can:

- View ongoing elections and details about candidates and voting locations based on their area.
- Get information on their local representatives, including contact details, policies, and related news articles.
- Automatically generate quick summaries about representatives' policies, views, and stances using OpenAI's API.
- Access educational resources to learn more about the importance of voting and related topics.
- Smoothly navigate between different sections of the site, such as Representatives, Elections, and Resources.

The application pulls data from various APIs (e.g., Google Civic API, OpenStreetMap, and OpenAI) based on the user’s location, allowing for real-time updates and personalized information.

# Features
- **Interactive Map:** Displays elections and representatives based on the user's location or zip code input.
- **Sidebar:** Shows a list of representatives and elections, with the ability to expand or collapse the sidebar.
- **OpenAI Summaries:** Generate concise summaries of representatives' policies and views using the OpenAI API, providing users with an easy-to-read overview.
- **Smooth Navigation:** Seamless scrolling between sections like "Representatives", "Elections", and "Resources."
- **News & Articles:** Fetches relevant news articles about representatives and elections.
- **Zip Code Input:** Users can manually input their zip code to update the map and information dynamically.

# Requirements
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Vite (build tool)
- Civic Information API Key (Google Civic API)
- OpenStreetMap API Key (optional for custom usage)
- OpenAI API Key (for generating representative summaries)
- A modern browser (Chrome, Firefox, Edge, etc.)

## API Keys Needed
- Google Civic Information API: For fetching representative and election data.
- Nominatim (OpenStreetMap): For reverse geocoding zip codes to lat/lon coordinates.
- OpenAI API: For generating representative summaries.

# Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/davoice.git
cd davoice
```

2. Install dependencies:
```bash 
npm install
```

3. Set up environment variables: Create a `.env` file in the root directory and add your API keys:
```bash
VITE_CIVIC_API_KEY=your-google-civic-api-key
VITE_NOMINATIM_API_KEY=your-nominatim-api-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

4. Start development server
```bash
npm run dev
```