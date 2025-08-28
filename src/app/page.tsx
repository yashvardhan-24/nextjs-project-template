"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

// TypeScript interfaces
interface FarmData {
  name: string
  location: string
  size: string
  crops: string[]
  established: string
}

interface HealthMetric {
  name: string
  value: number
  status: 'good' | 'warning' | 'critical'
  unit: string
}

interface Medicine {
  id: string
  name: string
  type: 'pesticide' | 'fertilizer' | 'herbicide'
  quality: number
  quantity: number
  expiryDate: string
  price: number
}

interface MarketItem {
  name: string
  currentPrice: number
  trend: 'up' | 'down' | 'stable'
  recommendation: string
}

export default function FarmAura() {
  // Demo Farm Data
  const [farmData] = useState<FarmData>({
    name: "Green Valley Farm",
    location: "Sacramento Valley, California",
    size: "250 acres",
    crops: ["Wheat", "Corn", "Soybeans", "Tomatoes"],
    established: "2015"
  })

  // Demo Health Metrics
  const [healthMetrics] = useState<HealthMetric[]>([
    { name: "Soil Moisture", value: 75, status: 'good', unit: '%' },
    { name: "Temperature", value: 24, status: 'good', unit: '°C' },
    { name: "Humidity", value: 60, status: 'warning', unit: '%' },
    { name: "pH Level", value: 6.8, status: 'good', unit: 'pH' },
    { name: "Nitrogen Level", value: 45, status: 'warning', unit: 'ppm' }
  ])

  // Demo Medicine Inventory
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Roundup Herbicide',
      type: 'herbicide',
      quality: 95,
      quantity: 25,
      expiryDate: '2025-06-15',
      price: 45.99
    },
    {
      id: '2', 
      name: 'NPK Fertilizer',
      type: 'fertilizer',
      quality: 88,
      quantity: 50,
      expiryDate: '2024-12-30',
      price: 32.50
    },
    {
      id: '3',
      name: 'Insect Control Spray',
      type: 'pesticide',
      quality: 92,
      quantity: 15,
      expiryDate: '2025-03-20',
      price: 28.75
    }
  ])

  // Demo Market Data
  const [marketData] = useState<MarketItem[]>([
    { name: 'Wheat Seeds', currentPrice: 125.50, trend: 'down', recommendation: 'Buy Now - Price dropping' },
    { name: 'Corn Seeds', currentPrice: 89.25, trend: 'up', recommendation: 'Wait - Price rising' },
    { name: 'Fertilizer NPK', currentPrice: 32.50, trend: 'stable', recommendation: 'Good time to buy' },
    { name: 'Pesticide Premium', currentPrice: 67.80, trend: 'down', recommendation: 'Buy Now - 15% discount expected' }
  ])

  // AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<string>('')
  const [analysisLoading, setAnalysisLoading] = useState(false)

  // New Medicine Form
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    type: 'fertilizer' as Medicine['type'],
    quality: 0,
    quantity: 0,
    expiryDate: '',
    price: 0
  })

  // Demo AI Analysis Function
  const runMarketAnalysis = async () => {
    setAnalysisLoading(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const analyses = [
      "Based on current market trends, wheat seed prices are expected to drop 12% in the next 2 weeks. Recommend purchasing 500kg now.",
      "Fertilizer prices show seasonal stability. Current NPK prices are optimal for bulk purchasing.",
      "Weather forecast indicates dry conditions ahead. Recommend stocking up on irrigation supplies and drought-resistant seeds.",
      "Market analysis suggests corn seed prices will increase 8% next month due to supply chain issues. Consider early purchase.",
      "Pesticide demand is low this season. Excellent opportunity to purchase premium products at 20% discount."
    ]
    
    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)]
    setAiAnalysis(randomAnalysis)
    setAnalysisLoading(false)
  }

  // Add new medicine
  const addMedicine = () => {
    if (newMedicine.name && newMedicine.quantity > 0) {
      const medicine: Medicine = {
        id: Date.now().toString(),
        ...newMedicine
      }
      setMedicines([...medicines, medicine])
      setNewMedicine({
        name: '',
        type: 'fertilizer',
        quality: 0,
        quantity: 0,
        expiryDate: '',
        price: 0
      })
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return '→'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Farm Aura</h1>
              <p className="text-gray-600">Smart Farm Management System</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
            <TabsTrigger value="health">Health Monitor</TabsTrigger>
            <TabsTrigger value="medicine">Medicine Inventory</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Farm Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Farm Overview</CardTitle>
                  <CardDescription>{farmData.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Location:</span> {farmData.location}</p>
                    <p><span className="font-medium">Size:</span> {farmData.size}</p>
                    <p><span className="font-medium">Crops:</span> {farmData.crops.length}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Status</CardTitle>
                  <CardDescription>Current farm conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {healthMetrics.slice(0, 3).map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{metric.name}</span>
                        <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                          {metric.value}{metric.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Summary</CardTitle>
                  <CardDescription>Medicine & supplies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><span className="font-medium">Total Items:</span> {medicines.length}</p>
                    <p><span className="font-medium">Low Stock:</span> {medicines.filter(m => m.quantity < 20).length}</p>
                    <p><span className="font-medium">Expiring Soon:</span> {medicines.filter(m => new Date(m.expiryDate) < new Date(Date.now() + 30*24*60*60*1000)).length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Farm Details Tab */}
          <TabsContent value="farm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Detailed information about your farm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium">Farm Name</Label>
                    <p className="text-gray-700">{farmData.name}</p>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Location</Label>
                    <p className="text-gray-700">{farmData.location}</p>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Total Size</Label>
                    <p className="text-gray-700">{farmData.size}</p>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Established</Label>
                    <p className="text-gray-700">{farmData.established}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-base font-medium">Crops Grown</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {farmData.crops.map((crop, index) => (
                      <Badge key={index} variant="secondary">{crop}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Monitor Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Health Metrics</CardTitle>
                <CardDescription>Real-time monitoring of farm conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">{metric.name}</Label>
                        <span className={`font-medium ${getStatusColor(metric.status)}`}>
                          {metric.value}{metric.unit}
                        </span>
                      </div>
                      <Progress 
                        value={metric.name === 'pH Level' ? (metric.value / 14) * 100 : metric.value} 
                        className="h-2"
                      />
                      <p className={`text-sm ${getStatusColor(metric.status)}`}>
                        Status: {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medicine Inventory Tab */}
          <TabsContent value="medicine" className="space-y-6">
            {/* Add New Medicine Card */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Medicine</CardTitle>
                <CardDescription>Add medicine or fertilizer to inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name">Medicine Name</Label>
                    <Input
                      id="name"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      placeholder="Enter medicine name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newMedicine.type}
                      onChange={(e) => setNewMedicine({...newMedicine, type: e.target.value as Medicine['type']})}
                    >
                      <option value="fertilizer">Fertilizer</option>
                      <option value="pesticide">Pesticide</option>
                      <option value="herbicide">Herbicide</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newMedicine.quantity || ''}
                      onChange={(e) => setNewMedicine({...newMedicine, quantity: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quality">Quality (%)</Label>
                    <Input
                      id="quality"
                      type="number"
                      value={newMedicine.quality || ''}
                      onChange={(e) => setNewMedicine({...newMedicine, quality: parseInt(e.target.value) || 0})}
                      placeholder="0-100"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newMedicine.expiryDate}
                      onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newMedicine.price || ''}
                      onChange={(e) => setNewMedicine({...newMedicine, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <Button onClick={addMedicine} className="mt-4">
                  Add Medicine
                </Button>
              </CardContent>
            </Card>

            {/* Medicine List Card */}
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory</CardTitle>
                <CardDescription>All medicines and fertilizers in stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Quality</th>
                        <th className="text-left p-2">Quantity</th>
                        <th className="text-left p-2">Expiry</th>
                        <th className="text-left p-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((medicine) => (
                        <tr key={medicine.id} className="border-b">
                          <td className="p-2 font-medium">{medicine.name}</td>
                          <td className="p-2">
                            <Badge variant="outline">{medicine.type}</Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <Progress value={medicine.quality} className="w-16 h-2" />
                              <span className="text-sm">{medicine.quality}%</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <span className={medicine.quantity < 20 ? 'text-red-600 font-medium' : ''}>
                              {medicine.quantity}
                            </span>
                          </td>
                          <td className="p-2">{medicine.expiryDate}</td>
                          <td className="p-2">${medicine.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Analysis Tab */}
          <TabsContent value="market" className="space-y-6">
            {/* AI Analysis Card */}
            <Card>
              <CardHeader>
                <CardTitle>AI Market Analysis</CardTitle>
                <CardDescription>Get intelligent recommendations for purchasing decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={runMarketAnalysis} 
                    disabled={analysisLoading}
                    className="w-full md:w-auto"
                  >
                    {analysisLoading ? 'Analyzing Market Data...' : 'Run AI Analysis'}
                  </Button>
                  {aiAnalysis && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">AI Recommendation:</h4>
                      <p className="text-blue-800">{aiAnalysis}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Market Prices Card */}
            <Card>
              <CardHeader>
                <CardTitle>Current Market Prices</CardTitle>
                <CardDescription>Live pricing data and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Item</th>
                        <th className="text-left p-2">Current Price</th>
                        <th className="text-left p-2">Trend</th>
                        <th className="text-left p-2">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{item.name}</td>
                          <td className="p-2">${item.currentPrice.toFixed(2)}</td>
                          <td className="p-2">
                            <span className="flex items-center space-x-1">
                              <span>{getTrendIcon(item.trend)}</span>
                              <span className={
                                item.trend === 'up' ? 'text-red-600' : 
                                item.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                              }>
                                {item.trend}
                              </span>
                            </span>
                          </td>
                          <td className="p-2 text-sm">{item.recommendation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
