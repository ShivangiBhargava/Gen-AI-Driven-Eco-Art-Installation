"use client"
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Palette, BarChart2, Users, BookOpen } from 'lucide-react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const pages = [
  { id: 'art', title: 'AI Eco-Art', icon: Palette },
  { id: 'data', title: 'Environmental Data', icon: BarChart2 },
  { id: 'community', title: 'Community Impact', icon: Users },
  { id: 'education', title: 'Learn More', icon: BookOpen },
]

const backgroundImages = [
  'https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?auto=format&fit=crop&w=1920&q=80',
]

function ArtCanvas({ environmentalData }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create gradient based on air quality
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    const airQualityColor = `hsl(${120 - environmentalData.airQuality}, 100%, 50%)`
    gradient.addColorStop(0, airQualityColor)
    gradient.addColorStop(1, 'white')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw circles based on temperature and humidity
    const circleCount = Math.floor(environmentalData.temperature)
    const maxRadius = Math.min(width, height) / 4
    const radiusStep = maxRadius / circleCount

    for (let i = 0; i < circleCount; i++) {
      ctx.beginPath()
      const radius = radiusStep * (i + 1)
      ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = `rgba(255, 255, 255, ${environmentalData.humidity / 100})`
      ctx.stroke()
    }
  }, [environmentalData])

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">AI-Generated Eco-Art</CardTitle>
        <CardDescription className="text-gray-200">
          This artwork is dynamically generated based on current environmental data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
        </div>
        <div className="mt-4 text-white">
          <p>Air Quality: {environmentalData.airQuality.toFixed(2)}</p>
          <p>Temperature: {environmentalData.temperature.toFixed(2)}°C</p>
          <p>Humidity: {environmentalData.humidity.toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DataVisualization({ environmentalData, historicalData }) {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Environmental Data</CardTitle>
        <CardDescription className="text-gray-200">
          Real-time visualization of key environmental metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(environmentalData).map(([key, value]) => (
            <Card key={key} className="bg-white bg-opacity-20">
              <CardHeader>
                <CardTitle className="text-lg text-white capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{value.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-white bg-opacity-20 p-4">
          <CardTitle className="text-lg text-white mb-4">Historical Data</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff44" />
              <XAxis dataKey="time" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff22', border: 'none' }} />
              <Line type="monotone" dataKey="airQuality" stroke="#8884d8" />
              <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
              <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </CardContent>
    </Card>
  )
}

function CommunityFeedback() {
  const feedbacks = [
    {
      name: "Alex Johnson",
      comment: "The AI-generated art really opened my eyes to the impact of air quality on our environment. It's both beautiful and informative!",
      date: "2023-06-15"
    },
    {
      name: "Samantha Lee",
      comment: "I love how this installation makes complex environmental data accessible. It's inspired me to be more mindful of my carbon footprint.",
      date: "2023-06-14"
    },
    {
      name: "Michael Chen",
      comment: "The real-time data visualization is fascinating. It's great to see technology being used to raise awareness about our environment.",
      date: "2023-06-13"
    }
  ]

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Community Impact</CardTitle>
        <CardDescription className="text-gray-200">
          See how our community is making a difference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks.map((feedback, i) => (
            <Card key={i} className="bg-white bg-opacity-20">
              <CardContent className="pt-4">
                <p className="text-white font-semibold">{feedback.name}</p>
                <p className="text-gray-300 text-sm">{feedback.date}</p>
                <p className="text-white mt-2">{feedback.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function EducationalContent() {
  const [activeTab, setActiveTab] = useState('air-quality')

  const educationalContent = [
    {
      id: 'air-quality',
      title: 'Air Quality',
      content: `Air quality is a measure of how clean or polluted the air is. It has a direct impact on our health and the environment. Poor air quality can lead to respiratory issues, while good air quality promotes overall well-being. Factors affecting air quality include industrial emissions, vehicle exhaust, and natural events like wildfires.`
    },
    {
      id: 'temperature',
      title: 'Temperature',
      content: `Temperature plays a crucial role in our ecosystem. It affects plant growth, animal behavior, and weather patterns. Rising global temperatures due to climate change can lead to more extreme weather events, altered ecosystems, and changes in agricultural productivity. Understanding temperature trends is key to addressing climate change.`
    },
    {
      id: 'humidity',
      title: 'Humidity',
      content: `Humidity is the amount of water vapor present in the air. It affects our comfort, plant health, and the water cycle. High humidity can make hot days feel even hotter and contribute to mold growth, while low humidity can cause dry skin and respiratory discomfort. Humidity levels also influence precipitation patterns and ecosystem health.`
    },
    {
      id: 'ai-in-environment',
      title: 'AI in Environmental Science',
      content: `Artificial Intelligence (AI) is revolutionizing environmental science. It helps in analyzing vast amounts of data to predict weather patterns, monitor deforestation, track wildlife, and optimize energy use. AI models can process satellite imagery, sensor data, and historical records to provide insights that aid in conservation efforts and climate change mitigation strategies.`
    }
  ]

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Learn More</CardTitle>
        <CardDescription className="text-gray-200">
          Explore key environmental concepts and the role of AI in environmental science
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {educationalContent.map((item) => (
              <TabsTrigger 
                key={item.id} 
                value={item.id}
                className="text-white data-[state=active]:bg-white data-[state=active]:bg-opacity-20"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {educationalContent.map((item) => (
            <TabsContent key={item.id} value={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ScrollArea className="h-[300px] rounded-md border border-white border-opacity-20 p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.content}</p>
                </ScrollArea>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function Copyright() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYear(new Date().getFullYear())
    }, 60000) // Update every minute, just in case the app is open during new year

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center text-white text-sm py-4">
      <p className="font-light">
        © {currentYear} Shivangi Bhargava. All rights reserved.
      </p>
      <div className="mt-2 text-xs opacity-70">
        Crafted with 💚 for a sustainable future
      </div>
    </div>
  )
}

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [environmentalData, setEnvironmentalData] = useState({
    airQuality: 50,
    temperature: 20,
    humidity: 50
  })
  const [historicalData, setHistoricalData] = useState([])
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)

  useEffect(() => {
    const fetchData = () => {
      // Simulating data fetch
      const newData = {
        airQuality: Math.random() * 100,
        temperature: Math.random() * 30 + 10,
        humidity: Math.random() * 100
      }
      setEnvironmentalData(newData)

      // Update historical data
      setHistoricalData(prevData => {
        const newHistoricalData = [
          ...prevData,
          { ...newData, time: new Date().toLocaleTimeString() }
        ].slice(-10) // Keep only the last 10 data points
        return newHistoricalData
      })
    }

    fetchData()
    const dataInterval = setInterval(fetchData, 5000) // Update every 5 seconds for demo purposes

    const backgroundInterval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 10000) // Change background every 10 seconds

    return () => {
      clearInterval(dataInterval)
      clearInterval(backgroundInterval)
    }
  }, [])

  const goToNextPage = () => {
    setDirection(1)
    setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length)
  }

  const goToPrevPage = () => {
    setDirection(-1)
    setCurrentPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length)
  }

  const pageComponents = [
    <ArtCanvas key="art" environmentalData={environmentalData} />,
    <DataVisualization key="data" environmentalData={environmentalData} historicalData={historicalData} />,
    <CommunityFeedback key="community" />,
    <EducationalContent key="education" />
  ]

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentBackgroundIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="absolute  inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <header className="p-6 text-white">
          <h1 className="text-4xl font-bold text-center">AI-Driven Eco-Art Installation</h1>
          <p className="text-xl mt-2 text-center">Explore the intersection of environment, technology, and art</p>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPageIndex}
              custom={direction}
              initial={{ opacity: 0, x: 300 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 * direction }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden"
            >
              {pageComponents[currentPageIndex]}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={goToPrevPage} variant="outline" size="icon" className="bg-white bg-opacity-20 text-white hover:bg-opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              {pages.map((page, index) => (
                <Button
                  key={page.id}
                  variant={index === currentPageIndex ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPageIndex(index)}
                  className="text-white"
                >
                  <page.icon className="h-4 w-4 mr-2" />
                  {page.title}
                </Button>
              ))}
            </div>
            <Button onClick={goToNextPage} variant="outline" size="icon" className="bg-white bg-opacity-20 text-white hover:bg-opacity-30">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
