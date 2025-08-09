export type Topic = {
  id: string
  title: string
  description: string
  imageUrl: string
  chartCount: number
  articles: number
}

export type Article = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: number
  imageUrl: string
  topicId: string
  isNew?: boolean
  isFeatured?: boolean
}

export type VisualizationType = "chart" | "map" | "table"

export type ChartType = "line" | "bar" | "area" | "pie" | "scatter"

export type VisualizationData = {
  id: string
  title: string
  description: string
  type: VisualizationType
  chartType?: ChartType
  data: any[]
  topicId: string
  countries?: string[]
}

export type ChartData = VisualizationData // Added ChartData type alias

// Update the topics to focus on African climate data
export const topics: Topic[] = [
  {
    id: "temperature-trends",
    title: "Temperature Trends",
    description: "Data and research on temperature changes across African regions and their impacts.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 245,
    articles: 32,
  },
  {
    id: "rainfall-patterns",
    title: "Rainfall Patterns",
    description: "Research on changing precipitation patterns, droughts, and flooding across Africa.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 178,
    articles: 24,
  },
  {
    id: "desertification",
    title: "Desertification",
    description: "Data on land degradation, desert expansion, and mitigation strategies in Africa.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 156,
    articles: 28,
  },
  {
    id: "agriculture-impact",
    title: "Agriculture Impact",
    description: "Research on how climate change affects agricultural productivity across African regions.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 203,
    articles: 35,
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    description: "Data on renewable energy adoption, potential, and transitions across Africa.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 189,
    articles: 27,
  },
  {
    id: "water-resources",
    title: "Water Resources",
    description: "Research on water availability, quality, and management across African countries.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 134,
    articles: 19,
  },
  {
    id: "coastal-impacts",
    title: "Coastal Impacts",
    description: "Data on sea level rise, coastal erosion, and impacts on African coastal communities.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 167,
    articles: 22,
  },
  {
    id: "biodiversity-loss",
    title: "Biodiversity Loss",
    description: "Research on how climate change affects African ecosystems and biodiversity.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 142,
    articles: 18,
  },
  {
    id: "climate-policy",
    title: "Climate Policy",
    description: "Data on climate policies, commitments, and actions by African nations and organizations.",
    imageUrl: "/placeholder.svg?height=300&width=500",
    chartCount: 215,
    articles: 41,
  },
]

// Update the articles to focus on African climate issues
export const articles: Article[] = [
  {
    id: "sahel-drought-crisis",
    title: "The Sahel Drought Crisis: Trends and Responses",
    excerpt:
      "The Sahel region has experienced increasingly severe droughts. How are communities adapting, and what do the data tell us about future trends?",
    author: "Amara Okonkwo",
    date: "2023-05-15",
    readTime: 10,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "rainfall-patterns",
    isFeatured: true,
  },
  {
    id: "renewable-energy-africa",
    title: "Africa's Renewable Energy Revolution: Progress and Potential",
    excerpt:
      "African nations are increasingly investing in solar, wind, and hydroelectric power. What does this mean for climate resilience and economic development?",
    author: "Kwame Nkrumah",
    date: "2023-06-22",
    readTime: 14,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "renewable-energy",
    isNew: true,
  },
  {
    id: "measuring-climate-progress",
    title: "How African Nations Are Measuring Climate Progress",
    excerpt:
      "Tracking climate action requires robust metrics and data. This article explores how African countries are monitoring their climate commitments.",
    author: "Fatima El-Bashir",
    date: "2023-04-10",
    readTime: 10,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "climate-policy",
  },
  {
    id: "lake-chad-crisis",
    title: "The Lake Chad Crisis: Climate Change and Security",
    excerpt:
      "Lake Chad has shrunk by 90% since the 1960s. This article examines the climate data behind this crisis and its implications for regional security.",
    author: "Ibrahim Diallo",
    date: "2023-07-05",
    readTime: 12,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "water-resources",
    isNew: true,
  },
  {
    id: "solar-potential-sahara",
    title: "Harnessing the Sahara: Africa's Solar Energy Potential",
    excerpt:
      "The Sahara Desert receives more solar energy than any other place on Earth. How can this resource be sustainably developed?",
    author: "Nadia Turay",
    date: "2023-06-18",
    readTime: 8,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "renewable-energy",
  },
  {
    id: "climate-health-africa",
    title: "Climate Change and Public Health in Africa",
    excerpt:
      "Rising temperatures are affecting disease patterns across Africa. This article examines the data on climate-sensitive health risks.",
    author: "Dr. Tendai Mwangi",
    date: "2023-05-30",
    readTime: 11,
    imageUrl: "/placeholder.svg?height=300&width=500",
    topicId: "temperature-trends",
  },
]

// Update the visualizations to include charts, maps, and tables
export const visualizations: VisualizationData[] = [
  // Charts
  {
    id: "africa-temperature-anomalies",
    title: "Temperature Anomalies Across African Regions",
    description: "Annual temperature anomalies by African region, measured in °C relative to 1951-1980 average",
    type: "chart",
    chartType: "line",
    topicId: "temperature-trends",
    data: [
      { year: 1950, NorthAfrica: 0.1, WestAfrica: 0.0, EastAfrica: 0.1, CentralAfrica: 0.0, SouthernAfrica: 0.1 },
      { year: 1960, NorthAfrica: 0.2, WestAfrica: 0.1, EastAfrica: 0.1, CentralAfrica: 0.1, SouthernAfrica: 0.2 },
      { year: 1970, NorthAfrica: 0.3, WestAfrica: 0.2, EastAfrica: 0.2, CentralAfrica: 0.2, SouthernAfrica: 0.3 },
      { year: 1980, NorthAfrica: 0.5, WestAfrica: 0.3, EastAfrica: 0.4, CentralAfrica: 0.3, SouthernAfrica: 0.4 },
      { year: 1990, NorthAfrica: 0.7, WestAfrica: 0.5, EastAfrica: 0.6, CentralAfrica: 0.5, SouthernAfrica: 0.6 },
      { year: 2000, NorthAfrica: 0.9, WestAfrica: 0.7, EastAfrica: 0.8, CentralAfrica: 0.7, SouthernAfrica: 0.8 },
      { year: 2010, NorthAfrica: 1.2, WestAfrica: 1.0, EastAfrica: 1.1, CentralAfrica: 0.9, SouthernAfrica: 1.0 },
      { year: 2020, NorthAfrica: 1.5, WestAfrica: 1.3, EastAfrica: 1.4, CentralAfrica: 1.2, SouthernAfrica: 1.3 },
    ],
  },
  {
    id: "africa-rainfall-trends",
    title: "Rainfall Trends in African Regions",
    description: "Annual rainfall anomalies by region, measured as percentage change from 1951-1980 average",
    type: "chart",
    chartType: "line",
    topicId: "rainfall-patterns",
    data: [
      { year: 1950, Sahel: 5, EastAfrica: 2, WestAfrica: 3, CentralAfrica: 1, SouthernAfrica: 0 },
      { year: 1960, Sahel: 3, EastAfrica: 1, WestAfrica: 2, CentralAfrica: 0, SouthernAfrica: -1 },
      { year: 1970, Sahel: -10, EastAfrica: -5, WestAfrica: -3, CentralAfrica: -2, SouthernAfrica: -4 },
      { year: 1980, Sahel: -15, EastAfrica: -7, WestAfrica: -5, CentralAfrica: -3, SouthernAfrica: -6 },
      { year: 1990, Sahel: -12, EastAfrica: -4, WestAfrica: -4, CentralAfrica: -2, SouthernAfrica: -5 },
      { year: 2000, Sahel: -8, EastAfrica: -2, WestAfrica: -3, CentralAfrica: -1, SouthernAfrica: -3 },
      { year: 2010, Sahel: -5, EastAfrica: 0, WestAfrica: -2, CentralAfrica: 0, SouthernAfrica: -2 },
      { year: 2020, Sahel: -7, EastAfrica: -3, WestAfrica: -4, CentralAfrica: -2, SouthernAfrica: -4 },
    ],
  },
  {
    id: "africa-renewable-capacity",
    title: "Renewable Energy Capacity in Africa",
    description: "Installed renewable energy capacity by type (GW)",
    type: "chart",
    chartType: "bar",
    topicId: "renewable-energy",
    data: [
      { year: 2000, Solar: 0.1, Wind: 0.2, Hydro: 20.5, Geothermal: 0.8, Biomass: 0.5 },
      { year: 2005, Solar: 0.2, Wind: 0.5, Hydro: 22.3, Geothermal: 1.0, Biomass: 0.7 },
      { year: 2010, Solar: 0.5, Wind: 1.0, Hydro: 25.1, Geothermal: 1.5, Biomass: 1.0 },
      { year: 2015, Solar: 2.2, Wind: 3.5, Hydro: 28.3, Geothermal: 2.0, Biomass: 1.3 },
      { year: 2020, Solar: 8.5, Wind: 6.8, Hydro: 33.7, Geothermal: 2.8, Biomass: 1.7 },
    ],
  },
  {
    id: "africa-water-stress",
    title: "Water Stress Levels in African Countries",
    description: "Water withdrawal as percentage of available renewable water resources",
    type: "chart",
    chartType: "bar",
    topicId: "water-resources",
    data: [
      { country: "Egypt", value: 137 },
      { country: "Libya", value: 822 },
      { country: "Tunisia", value: 94 },
      { country: "Algeria", value: 88 },
      { country: "Morocco", value: 51 },
      { country: "South Africa", value: 41 },
      { country: "Sudan", value: 93 },
      { country: "Kenya", value: 33 },
      { country: "Ghana", value: 19 },
      { country: "Nigeria", value: 9 },
      { country: "DR Congo", value: 0.5 },
    ],
  },
  {
    id: "africa-deforestation",
    title: "Deforestation Rates in Key African Regions",
    description: "Annual forest loss in thousands of hectares",
    type: "chart",
    chartType: "line",
    topicId: "biodiversity-loss",
    data: [
      { year: 2001, CentralAfrica: 545, WestAfrica: 395, EastAfrica: 287, SouthernAfrica: 248 },
      { year: 2005, CentralAfrica: 612, WestAfrica: 423, EastAfrica: 312, SouthernAfrica: 276 },
      { year: 2010, CentralAfrica: 687, WestAfrica: 456, EastAfrica: 342, SouthernAfrica: 298 },
      { year: 2015, CentralAfrica: 723, WestAfrica: 478, EastAfrica: 367, SouthernAfrica: 312 },
      { year: 2020, CentralAfrica: 698, WestAfrica: 465, EastAfrica: 352, SouthernAfrica: 305 },
    ],
  },

  // Maps
  {
    id: "africa-temperature-map",
    title: "Temperature Change Across Africa (2000-2020)",
    description: "Map showing temperature change in degrees Celsius across African countries",
    type: "map",
    topicId: "temperature-trends",
    data: [
      { id: "DZA", name: "Algeria", value: 1.8 },
      { id: "AGO", name: "Angola", value: 1.2 },
      { id: "BEN", name: "Benin", value: 1.1 },
      { id: "BWA", name: "Botswana", value: 1.5 },
      { id: "BFA", name: "Burkina Faso", value: 1.7 },
      { id: "BDI", name: "Burundi", value: 1.0 },
      { id: "CMR", name: "Cameroon", value: 1.1 },
      { id: "CPV", name: "Cape Verde", value: 0.9 },
      { id: "CAF", name: "Central African Republic", value: 1.3 },
      { id: "TCD", name: "Chad", value: 1.9 },
      { id: "COM", name: "Comoros", value: 0.8 },
      { id: "COD", name: "Democratic Republic of the Congo", value: 1.2 },
      { id: "DJI", name: "Djibouti", value: 1.6 },
      { id: "EGY", name: "Egypt", value: 1.7 },
      { id: "GNQ", name: "Equatorial Guinea", value: 1.0 },
      { id: "ERI", name: "Eritrea", value: 1.5 },
      { id: "ETH", name: "Ethiopia", value: 1.4 },
      { id: "GAB", name: "Gabon", value: 0.9 },
      { id: "GMB", name: "Gambia", value: 1.3 },
      { id: "GHA", name: "Ghana", value: 1.2 },
      { id: "GIN", name: "Guinea", value: 1.1 },
      { id: "GNB", name: "Guinea-Bissau", value: 1.2 },
      { id: "CIV", name: "Ivory Coast", value: 1.1 },
      { id: "KEN", name: "Kenya", value: 1.3 },
      { id: "LSO", name: "Lesotho", value: 1.4 },
      { id: "LBR", name: "Liberia", value: 1.0 },
      { id: "LBY", name: "Libya", value: 1.8 },
      { id: "MDG", name: "Madagascar", value: 1.1 },
      { id: "MWI", name: "Malawi", value: 1.3 },
      { id: "MLI", name: "Mali", value: 1.9 },
      { id: "MRT", name: "Mauritania", value: 1.7 },
      { id: "MAR", name: "Morocco", value: 1.6 },
      { id: "MOZ", name: "Mozambique", value: 1.2 },
      { id: "NAM", name: "Namibia", value: 1.5 },
      { id: "NER", name: "Niger", value: 1.8 },
      { id: "NGA", name: "Nigeria", value: 1.3 },
      { id: "RWA", name: "Rwanda", value: 1.1 },
      { id: "SEN", name: "Senegal", value: 1.4 },
      { id: "SLE", name: "Sierra Leone", value: 1.0 },
      { id: "SOM", name: "Somalia", value: 1.6 },
      { id: "ZAF", name: "South Africa", value: 1.4 },
      { id: "SSD", name: "South Sudan", value: 1.5 },
      { id: "SDN", name: "Sudan", value: 1.7 },
      { id: "TZA", name: "Tanzania", value: 1.2 },
      { id: "TGO", name: "Togo", value: 1.1 },
      { id: "TUN", name: "Tunisia", value: 1.6 },
      { id: "UGA", name: "Uganda", value: 1.2 },
      { id: "ZMB", name: "Zambia", value: 1.3 },
      { id: "ZWE", name: "Zimbabwe", value: 1.4 },
    ],
  },
  {
    id: "africa-rainfall-map",
    title: "Annual Rainfall Change (2000-2020)",
    description: "Map showing changes in annual rainfall across African countries (% change)",
    type: "map",
    topicId: "rainfall-patterns",
    data: [
      { id: "DZA", name: "Algeria", value: -12 },
      { id: "AGO", name: "Angola", value: -5 },
      { id: "BEN", name: "Benin", value: -8 },
      { id: "BWA", name: "Botswana", value: -10 },
      { id: "BFA", name: "Burkina Faso", value: -15 },
      { id: "BDI", name: "Burundi", value: -3 },
      { id: "CMR", name: "Cameroon", value: -4 },
      { id: "CPV", name: "Cape Verde", value: -18 },
      { id: "CAF", name: "Central African Republic", value: -6 },
      { id: "TCD", name: "Chad", value: -17 },
      { id: "COM", name: "Comoros", value: 2 },
      { id: "COD", name: "Democratic Republic of the Congo", value: -3 },
      { id: "DJI", name: "Djibouti", value: -14 },
      { id: "EGY", name: "Egypt", value: -20 },
      { id: "GNQ", name: "Equatorial Guinea", value: -2 },
      { id: "ERI", name: "Eritrea", value: -16 },
      { id: "ETH", name: "Ethiopia", value: -12 },
      { id: "GAB", name: "Gabon", value: -1 },
      { id: "GMB", name: "Gambia", value: -13 },
      { id: "GHA", name: "Ghana", value: -7 },
      { id: "GIN", name: "Guinea", value: -6 },
      { id: "GNB", name: "Guinea-Bissau", value: -9 },
      { id: "CIV", name: "Ivory Coast", value: -5 },
      { id: "KEN", name: "Kenya", value: -8 },
      { id: "LSO", name: "Lesotho", value: -7 },
      { id: "LBR", name: "Liberia", value: -4 },
      { id: "LBY", name: "Libya", value: -22 },
      { id: "MDG", name: "Madagascar", value: 3 },
      { id: "MWI", name: "Malawi", value: -6 },
      { id: "MLI", name: "Mali", value: -18 },
      { id: "MRT", name: "Mauritania", value: -19 },
      { id: "MAR", name: "Morocco", value: -15 },
      { id: "MOZ", name: "Mozambique", value: -4 },
      { id: "NAM", name: "Namibia", value: -11 },
      { id: "NER", name: "Niger", value: -16 },
      { id: "NGA", name: "Nigeria", value: -9 },
      { id: "RWA", name: "Rwanda", value: -2 },
      { id: "SEN", name: "Senegal", value: -14 },
      { id: "SLE", name: "Sierra Leone", value: -5 },
      { id: "SOM", name: "Somalia", value: -13 },
      { id: "ZAF", name: "South Africa", value: -8 },
      { id: "SSD", name: "South Sudan", value: -10 },
      { id: "SDN", name: "Sudan", value: -15 },
      { id: "TZA", name: "Tanzania", value: -5 },
      { id: "TGO", name: "Togo", value: -7 },
      { id: "TUN", name: "Tunisia", value: -14 },
      { id: "UGA", name: "Uganda", value: -4 },
      { id: "ZMB", name: "Zambia", value: -6 },
      { id: "ZWE", name: "Zimbabwe", value: -9 },
    ],
  },
  {
    id: "africa-renewable-potential-map",
    title: "Renewable Energy Potential",
    description: "Map showing renewable energy potential across African countries (TWh/year)",
    type: "map",
    topicId: "renewable-energy",
    data: [
      { id: "DZA", name: "Algeria", value: 13500 },
      { id: "AGO", name: "Angola", value: 8200 },
      { id: "BEN", name: "Benin", value: 2100 },
      { id: "BWA", name: "Botswana", value: 9800 },
      { id: "BFA", name: "Burkina Faso", value: 5600 },
      { id: "BDI", name: "Burundi", value: 1200 },
      { id: "CMR", name: "Cameroon", value: 4300 },
      { id: "CPV", name: "Cape Verde", value: 800 },
      { id: "CAF", name: "Central African Republic", value: 3200 },
      { id: "TCD", name: "Chad", value: 7800 },
      { id: "COM", name: "Comoros", value: 300 },
      { id: "COD", name: "Democratic Republic of the Congo", value: 6700 },
      { id: "DJI", name: "Djibouti", value: 1900 },
      { id: "EGY", name: "Egypt", value: 12400 },
      { id: "GNQ", name: "Equatorial Guinea", value: 1100 },
      { id: "ERI", name: "Eritrea", value: 2800 },
      { id: "ETH", name: "Ethiopia", value: 9200 },
      { id: "GAB", name: "Gabon", value: 2300 },
      { id: "GMB", name: "Gambia", value: 1500 },
      { id: "GHA", name: "Ghana", value: 3800 },
      { id: "GIN", name: "Guinea", value: 2900 },
      { id: "GNB", name: "Guinea-Bissau", value: 1300 },
      { id: "CIV", name: "Ivory Coast", value: 3600 },
      { id: "KEN", name: "Kenya", value: 7500 },
      { id: "LSO", name: "Lesotho", value: 1800 },
      { id: "LBR", name: "Liberia", value: 2000 },
      { id: "LBY", name: "Libya", value: 14200 },
      { id: "MDG", name: "Madagascar", value: 5400 },
      { id: "MWI", name: "Malawi", value: 2700 },
      { id: "MLI", name: "Mali", value: 8900 },
      { id: "MRT", name: "Mauritania", value: 10300 },
      { id: "MAR", name: "Morocco", value: 9600 },
      { id: "MOZ", name: "Mozambique", value: 6100 },
      { id: "NAM", name: "Namibia", value: 11200 },
      { id: "NER", name: "Niger", value: 9800 },
      { id: "NGA", name: "Nigeria", value: 7300 },
      { id: "RWA", name: "Rwanda", value: 1600 },
      { id: "SEN", name: "Senegal", value: 4800 },
      { id: "SLE", name: "Sierra Leone", value: 2200 },
      { id: "SOM", name: "Somalia", value: 8700 },
      { id: "ZAF", name: "South Africa", value: 10800 },
      { id: "SSD", name: "South Sudan", value: 6300 },
      { id: "SDN", name: "Sudan", value: 9500 },
      { id: "TZA", name: "Tanzania", value: 6800 },
      { id: "TGO", name: "Togo", value: 2400 },
      { id: "TUN", name: "Tunisia", value: 7900 },
      { id: "UGA", name: "Uganda", value: 3900 },
      { id: "ZMB", name: "Zambia", value: 5200 },
      { id: "ZWE", name: "Zimbabwe", value: 6400 },
    ],
  },

  // Tables
  {
    id: "africa-climate-vulnerability-index",
    title: "Climate Vulnerability Index by Country",
    description: "Ranking of African countries by climate vulnerability index (higher = more vulnerable)",
    type: "table",
    topicId: "climate-policy",
    data: [
      { rank: 1, country: "Niger", score: 0.684, riskFactors: "Drought, Desertification, Food Insecurity" },
      { rank: 2, country: "Somalia", score: 0.677, riskFactors: "Drought, Flooding, Conflict" },
      { rank: 3, country: "Chad", score: 0.669, riskFactors: "Drought, Desertification, Water Scarcity" },
      { rank: 4, country: "Sudan", score: 0.654, riskFactors: "Drought, Flooding, Conflict" },
      { rank: 5, country: "Eritrea", score: 0.643, riskFactors: "Drought, Water Scarcity, Food Insecurity" },
      { rank: 6, country: "Mali", score: 0.639, riskFactors: "Drought, Desertification, Conflict" },
      { rank: 7, country: "Burundi", score: 0.631, riskFactors: "Flooding, Landslides, Food Insecurity" },
      { rank: 8, country: "DR Congo", score: 0.617, riskFactors: "Flooding, Deforestation, Conflict" },
      { rank: 9, country: "Central African Republic", score: 0.61, riskFactors: "Flooding, Deforestation, Conflict" },
      { rank: 10, country: "Ethiopia", score: 0.607, riskFactors: "Drought, Flooding, Food Insecurity" },
      { rank: 11, country: "Mozambique", score: 0.598, riskFactors: "Cyclones, Flooding, Coastal Erosion" },
      { rank: 12, country: "Madagascar", score: 0.592, riskFactors: "Cyclones, Drought, Food Insecurity" },
      { rank: 13, country: "South Sudan", score: 0.585, riskFactors: "Flooding, Drought, Conflict" },
      { rank: 14, country: "Nigeria", score: 0.573, riskFactors: "Flooding, Coastal Erosion, Desertification" },
      { rank: 15, country: "Mauritania", score: 0.568, riskFactors: "Drought, Desertification, Coastal Erosion" },
    ],
  },
  {
    id: "africa-water-scarcity-table",
    title: "Water Scarcity by Country",
    description: "Water availability and stress levels across African countries",
    type: "table",
    topicId: "water-resources",
    data: [
      {
        country: "Egypt",
        waterPerCapita: 570,
        stressLevel: "Extreme",
        majorChallenges: "Nile dependency, Population growth",
      },
      {
        country: "Libya",
        waterPerCapita: 113,
        stressLevel: "Extreme",
        majorChallenges: "Groundwater depletion, Desertification",
      },
      {
        country: "Algeria",
        waterPerCapita: 297,
        stressLevel: "High",
        majorChallenges: "Desertification, Urbanization",
      },
      {
        country: "Tunisia",
        waterPerCapita: 411,
        stressLevel: "High",
        majorChallenges: "Drought, Agricultural demands",
      },
      {
        country: "Morocco",
        waterPerCapita: 844,
        stressLevel: "High",
        majorChallenges: "Drought, Agricultural demands",
      },
      { country: "Kenya", waterPerCapita: 792, stressLevel: "High", majorChallenges: "Drought, Population growth" },
      { country: "South Africa", waterPerCapita: 843, stressLevel: "High", majorChallenges: "Drought, Infrastructure" },
      { country: "Ethiopia", waterPerCapita: 1258, stressLevel: "Medium", majorChallenges: "Drought, Access issues" },
      { country: "Nigeria", waterPerCapita: 1893, stressLevel: "Medium", majorChallenges: "Pollution, Infrastructure" },
      { country: "Ghana", waterPerCapita: 2131, stressLevel: "Medium", majorChallenges: "Pollution, Access issues" },
      {
        country: "Tanzania",
        waterPerCapita: 2266,
        stressLevel: "Low",
        majorChallenges: "Infrastructure, Access issues",
      },
      { country: "Uganda", waterPerCapita: 2941, stressLevel: "Low", majorChallenges: "Pollution, Infrastructure" },
      {
        country: "DR Congo",
        waterPerCapita: 19967,
        stressLevel: "Very Low",
        majorChallenges: "Access issues, Pollution",
      },
    ],
  },
  {
    id: "africa-climate-policy-table",
    title: "Climate Policy Implementation by Country",
    description: "Status of climate policies and commitments across African nations",
    type: "table",
    topicId: "climate-policy",
    data: [
      {
        country: "South Africa",
        ndc: "Yes",
        carbonTarget: "398-614 MtCO2e by 2030",
        renewableTarget: "17.8 GW by 2030",
        implementation: "Medium",
      },
      {
        country: "Morocco",
        ndc: "Yes",
        carbonTarget: "45.5% reduction by 2030",
        renewableTarget: "52% of energy mix by 2030",
        implementation: "High",
      },
      {
        country: "Egypt",
        ndc: "Yes",
        carbonTarget: "No specific target",
        renewableTarget: "42% of electricity by 2035",
        implementation: "Medium",
      },
      {
        country: "Kenya",
        ndc: "Yes",
        carbonTarget: "32% reduction by 2030",
        renewableTarget: "100% renewable electricity by 2030",
        implementation: "Medium-High",
      },
      {
        country: "Ethiopia",
        ndc: "Yes",
        carbonTarget: "64% reduction by 2030",
        renewableTarget: "No specific target",
        implementation: "Medium",
      },
      {
        country: "Nigeria",
        ndc: "Yes",
        carbonTarget: "47% reduction by 2030",
        renewableTarget: "30% renewable energy by 2030",
        implementation: "Low-Medium",
      },
      {
        country: "Ghana",
        ndc: "Yes",
        carbonTarget: "45% reduction by 2030",
        renewableTarget: "10% renewable energy by 2030",
        implementation: "Medium",
      },
      {
        country: "Rwanda",
        ndc: "Yes",
        carbonTarget: "38% reduction by 2030",
        renewableTarget: "60% renewable electricity by 2030",
        implementation: "High",
      },
      {
        country: "Namibia",
        ndc: "Yes",
        carbonTarget: "91% reduction by 2030",
        renewableTarget: "70% renewable electricity by 2030",
        implementation: "Medium",
      },
      {
        country: "Senegal",
        ndc: "Yes",
        carbonTarget: "29.5% reduction by 2030",
        renewableTarget: "30% renewable energy by 2025",
        implementation: "Medium",
      },
    ],
  },
]

// Let's ensure we have sample data for all visualizations
// Add or update sample data for maps and tables if needed

// For the africa-temperature-map visualization, let's ensure it has proper data
// This should already be in the file, but let's verify it has data for all countries

// For the africa-rainfall-map visualization, let's ensure it has proper data
// This should already be in the file, but let's verify it has data for all countries

// For the africa-renewable-potential-map visualization, let's ensure it has proper data
// This should already be in the file, but let's verify it has data for all countries

// For the africa-climate-vulnerability-index table, let's ensure it has proper data
// This should already be in the file, but let's verify it has comprehensive data

// For the africa-water-scarcity-table, let's ensure it has proper data
// This should already be in the file, but let's verify it has comprehensive data

// For the africa-climate-policy-table, let's ensure it has proper data
// This should already be in the file, but let's verify it has comprehensive data

// The data appears to be comprehensive, so no changes needed to the data.ts file

// Search function
export async function searchContent(query: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) return { topics: [], articles: [], visualizations: [] }

  const lowerQuery = query.toLowerCase()

  const filteredTopics = topics.filter(
    (topic) => topic.title.toLowerCase().includes(lowerQuery) || topic.description.toLowerCase().includes(lowerQuery),
  )

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.author.toLowerCase().includes(lowerQuery),
  )

  const filteredVisualizations = visualizations.filter(
    (viz) => viz.title.toLowerCase().includes(lowerQuery) || viz.description.toLowerCase().includes(lowerQuery),
  )

  return {
    topics: filteredTopics,
    articles: filteredArticles,
    visualizations: filteredVisualizations,
  }
}

// Get topic by ID
export async function getTopicById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return topics.find((topic) => topic.id === id)
}

// Get articles by topic ID
export async function getArticlesByTopic(topicId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return articles.filter((article) => article.topicId === topicId)
}

// Get visualizations by topic ID
export async function getVisualizationsByTopic(topicId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return visualizations.filter((viz) => viz.topicId === topicId)
}

// Get visualizations by type
export async function getVisualizationsByType(type: VisualizationType) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return visualizations.filter((viz) => viz.type === type)
}

// Get featured articles
export async function getFeaturedArticles() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return articles.filter((article) => article.isFeatured)
}

// Get new articles
export async function getNewArticles() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return articles.filter((article) => article.isNew)
}

// Get article by ID
export async function getArticleById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return articles.find((article) => article.id === id)
}

// Get visualization by ID
export async function getVisualizationById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return visualizations.find((viz) => viz.id === id)
}

// Legacy function for backward compatibility
export const charts = visualizations.filter((viz) => viz.type === "chart")
export async function getChartById(id: string) {
  return getVisualizationById(id)
}
export async function getChartsByTopic(topicId: string) {
  const vizs = await getVisualizationsByTopic(topicId)
  return vizs.filter((viz) => viz.type === "chart")
}
