"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArtCanvas } from './ArtCanvas'
import { DataVisualization } from './DataVisualization'
import { CommunityFeedback } from './CommunityFeedback'
import { EducationalContent } from './EducationalContent'
import { ChevronLeft, ChevronRight, Palette, BarChart2, Users, BookOpen } from 'lucide-react'

const pages = [
  { id: 'art', component: ArtCanvas, title: 'AI Eco-Art', icon: Palette },
  { id: 'data', component: DataVisualization, title: 'Environmental Data', icon: BarChart2 },
  { id: 'community', component: CommunityFeedback, title: 'Community Impact', icon: Users },
  { id: 'education', component: EducationalContent, title: 'Learn More', icon: BookOpen },
]

const backgroundImages = [
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920',
]

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

export default function EcoArtInstallation() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [environmentalData, setEnvironmentalData] = useState({
    airQuality: 50,
    temperature: 20,
    humidity: 50
  })
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      // Simulating data fetch
      const newData = {
        airQuality: Math.random() * 100,
        temperature: Math.random() * 30 + 10,
        humidity: Math.random() * 100
      }
      setEnvironmentalData(newData)
    }

    fetchData()
    const dataInterval = setInterval(fetchData, 60000) // Update every minute

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

  const CurrentPage = pages[currentPageIndex].component

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
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
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
              <CurrentPage environmentalData={environmentalData} />
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
