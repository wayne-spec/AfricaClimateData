import Link from "next/link"

// Define the structure for our topics data
type SubTopic = {
  title: string
  href: string
  isHeader?: boolean
}

type Topic = {
  title: string
  subtopics: SubTopic[]
}

// Update the climateTopics array to include 10 subtopics for Temperature Trends
const climateTopics: Topic[] = [
  {
    title: "Temperature Trends",
    subtopics: [
      { title: "Global Temperature Rise", href: "/topics/global-temperature-rise" },
      { title: "African Temperature Anomalies", href: "/topics/african-temperature-anomalies" },
      { title: "Urban Heat Islands", href: "/topics/urban-heat-islands" },
      { title: "Heat Waves", href: "/topics/heat-waves" },
      { title: "Temperature Extremes", href: "/topics/temperature-extremes" },
      { title: "Seasonal Temperature Changes", href: "/topics/seasonal-temperature-changes" },
      { title: "Night-time Temperatures", href: "/topics/night-time-temperatures" },
      { title: "Temperature and Health", href: "/topics/temperature-health-impacts" },
      { title: "Temperature Projections", href: "/topics/temperature-projections" },
      { title: "Historical Temperature Records", href: "/topics/historical-temperature-records" },
    ],
  },
  {
    title: "CO2 Emissions and Carbon Markets",
    subtopics: [
      { title: "Emissions Trends:", isHeader: true },
      { title: "African Carbon Footprint", href: "/topics/african-carbon-footprint" },
      { title: "Sectoral Emissions", href: "/topics/emissions-by-sector" },
      { title: "Urban Emissions", href: "/topics/urban-emissions" },
      { title: "Industrial Emissions", href: "/topics/industrial-emissions" },
      { title: "Carbon Markets:", isHeader: true },
      { title: "Carbon Credit Projects", href: "/topics/carbon-credits" },
      { title: "REDD+ Initiatives", href: "/topics/redd-plus" },
      { title: "Clean Development Mechanism", href: "/topics/clean-development-mechanism" },
      { title: "Voluntary Carbon Markets", href: "/topics/voluntary-carbon-markets" },
      { title: "Policy & Governance:", isHeader: true },
      { title: "National Climate Policies", href: "/topics/national-climate-policies" },
      { title: "Carbon Tax Approaches", href: "/topics/carbon-tax" },
      { title: "Climate Finance", href: "/topics/climate-finance" },
      { title: "Just Transition", href: "/topics/just-transition" },
    ],
  },
  {
    title: "African Climate Change Impacts",
    subtopics: [
      { title: "Temperature Changes:", isHeader: true },
      { title: "Regional Warming Patterns", href: "/topics/regional-warming" },
      { title: "Heat Waves", href: "/topics/heat-waves" },
      { title: "Urban Heat Islands", href: "/topics/urban-heat-islands" },
      { title: "Weather Extremes:", isHeader: true },
      { title: "Drought Patterns", href: "/topics/drought-patterns" },
      { title: "Flooding Events", href: "/topics/flooding-events" },
      { title: "Cyclones & Storms", href: "/topics/cyclones-storms" },
      { title: "Rainfall Variability", href: "/topics/rainfall-variability" },
      { title: "Human Impacts:", isHeader: true },
      { title: "Climate Migration", href: "/topics/climate-migration" },
      { title: "Health Effects", href: "/topics/climate-health-effects" },
      { title: "Conflict & Security", href: "/topics/climate-security" },
      { title: "Economic Losses", href: "/topics/climate-economic-losses" },
      { title: "Vulnerable Communities", href: "/topics/vulnerable-communities" },
    ],
  },
  {
    title: "African Renewable Energy",
    subtopics: [
      { title: "Solar Energy:", isHeader: true },
      { title: "Solar Potential", href: "/topics/solar-potential" },
      { title: "Solar Mini-Grids", href: "/topics/solar-mini-grids" },
      { title: "Solar Home Systems", href: "/topics/solar-home-systems" },
      { title: "Wind Energy:", isHeader: true },
      { title: "Wind Resources", href: "/topics/wind-resources" },
      { title: "Wind Farm Development", href: "/topics/wind-farms" },
      { title: "Other Renewables:", isHeader: true },
      { title: "Hydropower", href: "/topics/hydropower" },
      { title: "Geothermal Energy", href: "/topics/geothermal" },
      { title: "Biomass Energy", href: "/topics/biomass" },
      { title: "Energy Access:", isHeader: true },
      { title: "Rural Electrification", href: "/topics/rural-electrification" },
      { title: "Energy Poverty", href: "/topics/energy-poverty" },
      { title: "Clean Cooking", href: "/topics/clean-cooking" },
      { title: "Energy Storage", href: "/topics/energy-storage" },
    ],
  },
  {
    title: "Water Resources in Africa",
    subtopics: [
      { title: "Water Availability:", isHeader: true },
      { title: "Freshwater Resources", href: "/topics/freshwater-resources" },
      { title: "Groundwater Depletion", href: "/topics/groundwater-depletion" },
      { title: "Transboundary Waters", href: "/topics/transboundary-waters" },
      { title: "Water Bodies:", isHeader: true },
      { title: "Lake Chad Basin", href: "/topics/lake-chad" },
      { title: "Nile River System", href: "/topics/nile-river" },
      { title: "Congo River Basin", href: "/topics/congo-basin" },
      { title: "Great Lakes Region", href: "/topics/great-lakes" },
      { title: "Water Stress:", isHeader: true },
      { title: "Water Scarcity", href: "/topics/water-scarcity" },
      { title: "Drought Vulnerability", href: "/topics/drought-vulnerability" },
      { title: "Agricultural Water Use", href: "/topics/agricultural-water" },
      { title: "Water Management:", isHeader: true },
      { title: "Water Governance", href: "/topics/water-governance" },
      { title: "Water Harvesting", href: "/topics/water-harvesting" },
    ],
  },
  {
    title: "African Climate Adaptation",
    subtopics: [
      { title: "Vulnerability Assessment:", isHeader: true },
      { title: "Climate Vulnerability Index", href: "/topics/climate-vulnerability" },
      { title: "Adaptive Capacity", href: "/topics/adaptive-capacity" },
      { title: "Sectoral Adaptation:", isHeader: true },
      { title: "Agricultural Adaptation", href: "/topics/agricultural-adaptation" },
      { title: "Urban Resilience", href: "/topics/urban-resilience" },
      { title: "Coastal Protection", href: "/topics/coastal-protection" },
      { title: "Health Systems", href: "/topics/health-adaptation" },
      { title: "Traditional Knowledge:", isHeader: true },
      { title: "Indigenous Adaptation", href: "/topics/indigenous-adaptation" },
      { title: "Local Coping Strategies", href: "/topics/local-coping-strategies" },
      { title: "Adaptation Finance:", isHeader: true },
      { title: "Adaptation Funding", href: "/topics/adaptation-funding" },
      { title: "Loss and Damage", href: "/topics/loss-and-damage" },
      { title: "Climate Insurance", href: "/topics/climate-insurance" },
    ],
  },
  {
    title: "African Climate Governance",
    subtopics: [
      { title: "Continental Frameworks:", isHeader: true },
      { title: "African Union Climate Strategy", href: "/topics/au-climate-strategy" },
      { title: "African Climate Policy Centre", href: "/topics/acpc" },
      { title: "Regional Initiatives", href: "/topics/regional-climate-initiatives" },
      { title: "National Policies:", isHeader: true },
      { title: "National Adaptation Plans", href: "/topics/national-adaptation-plans" },
      { title: "Nationally Determined Contributions", href: "/topics/african-ndcs" },
      { title: "Climate Legislation", href: "/topics/climate-legislation" },
      { title: "International Engagement:", isHeader: true },
      { title: "Africa in UNFCCC", href: "/topics/africa-unfccc" },
      { title: "African Group of Negotiators", href: "/topics/african-negotiators" },
      { title: "Climate Finance Access", href: "/topics/climate-finance-access" },
      { title: "Non-State Actors:", isHeader: true },
      { title: "Civil Society Movements", href: "/topics/climate-civil-society" },
      { title: "Youth Climate Activism", href: "/topics/youth-climate-activism" },
      { title: "Private Sector Engagement", href: "/topics/private-sector-climate" },
    ],
  },
  {
    title: "African Forests & Land Use",
    subtopics: [
      { title: "Forest Resources:", isHeader: true },
      { title: "Congo Basin Forests", href: "/topics/congo-basin-forests" },
      { title: "East African Forests", href: "/topics/east-african-forests" },
      { title: "West African Forests", href: "/topics/west-african-forests" },
      { title: "Deforestation:", isHeader: true },
      { title: "Deforestation Drivers", href: "/topics/deforestation-drivers" },
      { title: "Forest Monitoring", href: "/topics/forest-monitoring" },
      { title: "Forest Carbon", href: "/topics/forest-carbon" },
      { title: "Land Degradation:", isHeader: true },
      { title: "Desertification", href: "/topics/desertification" },
      { title: "Soil Erosion", href: "/topics/soil-erosion" },
      { title: "Land Restoration", href: "/topics/land-restoration" },
      { title: "Conservation:", isHeader: true },
      { title: "Protected Areas", href: "/topics/protected-areas" },
      { title: "Community Forestry", href: "/topics/community-forestry" },
      { title: "Agroforestry", href: "/topics/agroforestry" },
    ],
  },
  {
    title: "African Agriculture & Food Security",
    subtopics: [
      { title: "Climate Impacts:", isHeader: true },
      { title: "Crop Yield Changes", href: "/topics/crop-yields-climate" },
      { title: "Livestock Vulnerability", href: "/topics/livestock-vulnerability" },
      { title: "Fisheries Impacts", href: "/topics/fisheries-climate" },
      { title: "Food Systems:", isHeader: true },
      { title: "Food Production", href: "/topics/food-production" },
      { title: "Food Distribution", href: "/topics/food-distribution" },
      { title: "Food Access", href: "/topics/food-access" },
      { title: "Climate-Smart Agriculture:", isHeader: true },
      { title: "Drought-Resistant Crops", href: "/topics/drought-resistant-crops" },
      { title: "Conservation Agriculture", href: "/topics/conservation-agriculture" },
      { title: "Irrigation Systems", href: "/topics/irrigation-systems" },
      { title: "Food Security:", isHeader: true },
      { title: "Hunger & Malnutrition", href: "/topics/hunger-malnutrition" },
      { title: "Early Warning Systems", href: "/topics/food-early-warning" },
      { title: "Food Sovereignty", href: "/topics/food-sovereignty" },
    ],
  },
  {
    title: "African Coastal Zones",
    subtopics: [
      { title: "Sea Level Rise:", isHeader: true },
      { title: "Coastal Flooding", href: "/topics/coastal-flooding" },
      { title: "Coastal Erosion", href: "/topics/coastal-erosion" },
      { title: "Saltwater Intrusion", href: "/topics/saltwater-intrusion" },
      { title: "Coastal Ecosystems:", isHeader: true },
      { title: "Mangrove Forests", href: "/topics/mangroves" },
      { title: "Coral Reefs", href: "/topics/coral-reefs" },
      { title: "Coastal Wetlands", href: "/topics/coastal-wetlands" },
      { title: "Seagrass Beds", href: "/topics/seagrass" },
      { title: "Coastal Communities:", isHeader: true },
      { title: "Fishing Communities", href: "/topics/fishing-communities" },
      { title: "Coastal Cities", href: "/topics/coastal-cities" },
      { title: "Tourism Impacts", href: "/topics/coastal-tourism" },
      { title: "Coastal Management:", isHeader: true },
      { title: "Integrated Coastal Management", href: "/topics/integrated-coastal-management" },
      { title: "Marine Protected Areas", href: "/topics/marine-protected-areas" },
    ],
  },
  {
    title: "Climate Justice in Africa",
    subtopics: [
      { title: "Climate Inequality:", isHeader: true },
      { title: "Historical Responsibility", href: "/topics/historical-responsibility" },
      { title: "Climate Finance Equity", href: "/topics/climate-finance-equity" },
      { title: "Loss & Damage", href: "/topics/loss-and-damage-africa" },
      { title: "Vulnerable Groups:", isHeader: true },
      { title: "Indigenous Communities", href: "/topics/indigenous-climate" },
      { title: "Women & Climate", href: "/topics/women-climate" },
      { title: "Youth & Future Generations", href: "/topics/youth-climate" },
      { title: "Pastoralist Communities", href: "/topics/pastoralist-climate" },
      { title: "Just Transition:", isHeader: true },
      { title: "Fossil Fuel Dependence", href: "/topics/fossil-dependence" },
      { title: "Green Jobs", href: "/topics/green-jobs-africa" },
      { title: "Energy Justice", href: "/topics/energy-justice" },
      { title: "Climate Rights:", isHeader: true },
      { title: "Climate Litigation", href: "/topics/climate-litigation-africa" },
      { title: "Climate Activism", href: "/topics/climate-activism-africa" },
    ],
  },
]

export default function AllTopics() {
  // Update the return statement to remove descriptions
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1d3d63] mb-2">Browse by topic</h2>
        <p className="text-gray-600 mb-8">All our data, research, and visualizations organized by topic</p>

        <div className="space-y-12">
          {climateTopics.map((topic, index) => (
            <section key={index} className="border-t pt-6">
              <h2 className="text-2xl font-bold text-[#1d3d63] mb-4">{topic.title}</h2>
              <div className="flex flex-wrap">
                {topic.subtopics.map((subtopic, subIndex) => {
                  if (subtopic.isHeader) {
                    return (
                      <span key={subIndex} className="font-medium text-gray-700 mr-2">
                        {subtopic.title}
                      </span>
                    )
                  }

                  // Find the next header to determine if we need a separator
                  const nextItem = topic.subtopics[subIndex + 1]
                  const isLastInSection = nextItem && nextItem.isHeader
                  const isVeryLast = subIndex === topic.subtopics.length - 1

                  return (
                    <span key={subIndex}>
                      <Link href={subtopic.href} className="text-[#1d3d63] hover:underline">
                        {subtopic.title}
                      </Link>
                      {!isLastInSection && !isVeryLast && <span className="mx-2 text-gray-400">•</span>}
                      {isLastInSection && !isVeryLast && <span className="mx-2 text-gray-500">|</span>}
                    </span>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
