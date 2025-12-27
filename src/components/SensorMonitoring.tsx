import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Thermometer,
  Droplets,
  Gauge,
  Battery,
  BatteryLow,
  BatteryWarning,
  Wifi,
  WifiOff,
  MapPin,
  Clock,
  Activity,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Input } from './ui/input';

interface Sensor {
  id: string;
  name: string;
  location: string;
  online: boolean;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  battery: number;
  lastUpdate: string;
  signal: number;
}

const sensors: Sensor[] = [
  {
    id: 'S001',
    name: 'Field Sensor A1',
    location: 'North Field - Zone A',
    online: true,
    temperature: 28,
    humidity: 65,
    soilMoisture: 72,
    battery: 85,
    lastUpdate: '2 mins ago',
    signal: 95,
  },
  {
    id: 'S002',
    name: 'Field Sensor A2',
    location: 'North Field - Zone B',
    online: true,
    temperature: 32,
    humidity: 58,
    soilMoisture: 68,
    battery: 92,
    lastUpdate: '1 min ago',
    signal: 88,
  },
  {
    id: 'S003',
    name: 'Field Sensor B1',
    location: 'South Field - Zone A',
    online: false,
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    battery: 15,
    lastUpdate: '2 hours ago',
    signal: 0,
  },
  {
    id: 'S004',
    name: 'Field Sensor B2',
    location: 'South Field - Zone B',
    online: true,
    temperature: 30,
    humidity: 62,
    soilMoisture: 75,
    battery: 78,
    lastUpdate: '3 mins ago',
    signal: 82,
  },
  {
    id: 'S005',
    name: 'Field Sensor C1',
    location: 'East Field - Zone A',
    online: true,
    temperature: 29,
    humidity: 68,
    soilMoisture: 80,
    battery: 45,
    lastUpdate: '1 min ago',
    signal: 90,
  },
  {
    id: 'S006',
    name: 'Field Sensor C2',
    location: 'East Field - Zone B',
    online: true,
    temperature: 31,
    humidity: 60,
    soilMoisture: 70,
    battery: 88,
    lastUpdate: '4 mins ago',
    signal: 85,
  },
  {
    id: 'S007',
    name: 'Field Sensor D1',
    location: 'West Field - Zone A',
    online: false,
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    battery: 8,
    lastUpdate: '5 hours ago',
    signal: 0,
  },
  {
    id: 'S008',
    name: 'Field Sensor D2',
    location: 'West Field - Zone B',
    online: true,
    temperature: 27,
    humidity: 70,
    soilMoisture: 78,
    battery: 95,
    lastUpdate: '2 mins ago',
    signal: 92,
  },
];

export function SensorMonitoring() {
  const [selectedSensor, setSelectedSensor] = useState<Sensor>(sensors[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSensors = sensors.filter(
    (sensor) =>
      sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineSensors = sensors.filter((s) => s.online).length;
  const offlineSensors = sensors.filter((s) => !s.online).length;

  const getBatteryIcon = (battery: number) => {
    if (battery > 50) return <Battery className="w-5 h-5" />;
    if (battery > 20) return <BatteryWarning className="w-5 h-5" />;
    return <BatteryLow className="w-5 h-5" />;
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getValueStatus = (value: number, type: 'temp' | 'humidity' | 'moisture') => {
    if (type === 'temp') {
      if (value >= 25 && value <= 32) return 'optimal';
      if (value > 32 && value <= 35) return 'warning';
      return 'critical';
    }
    if (type === 'humidity') {
      if (value >= 60 && value <= 70) return 'optimal';
      if (value >= 50 && value < 60) return 'warning';
      return 'critical';
    }
    if (type === 'moisture') {
      if (value >= 70 && value <= 80) return 'optimal';
      if (value >= 60 && value < 70) return 'warning';
      return 'critical';
    }
    return 'optimal';
  };

  const getStatusColor = (status: string) => {
    if (status === 'optimal') return 'border-green-500';
    if (status === 'warning') return 'border-yellow-500';
    return 'border-red-500';
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-green-800">Sensor Monitoring</h1>
              <p className="text-green-600">Real-time field sensor data</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-2 bg-green-50 rounded-lg">
                  <Wifi className="w-4 h-4 text-green-600" />
                  <span className="text-green-800">{onlineSensors}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-2 bg-red-50 rounded-lg">
                  <WifiOff className="w-4 h-4 text-red-600" />
                  <span className="text-red-800">{offlineSensors}</span>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Panel - Sensor List */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-green-800">All Sensors ({sensors.length})</CardTitle>
                <div className="mt-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                    <Input
                      placeholder="Search sensors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredSensors.map((sensor) => (
                    <button
                      key={sensor.id}
                      onClick={() => setSelectedSensor(sensor)}
                      className={`w-full text-left p-4 border-b border-green-100 transition-colors hover:bg-green-50 ${
                        selectedSensor.id === sensor.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-green-800 mb-1">{sensor.name}</p>
                          <p className="text-green-600 text-sm">{sensor.id}</p>
                        </div>
                        {sensor.online ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            <Wifi className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <WifiOff className="w-3 h-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <MapPin className="w-3 h-3" />
                        <span>{sensor.location}</span>
                      </div>
                      {sensor.online && (
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-orange-600">
                            <Thermometer className="w-3 h-3" />
                            <span>{sensor.temperature}°C</span>
                          </div>
                          <div className="flex items-center gap-1 text-blue-600">
                            <Droplets className="w-3 h-3" />
                            <span>{sensor.soilMoisture}%</span>
                          </div>
                          <div className={`flex items-center gap-1 ${getBatteryColor(sensor.battery)}`}>
                            {getBatteryIcon(sensor.battery)}
                            <span>{sensor.battery}%</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Sensor Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="space-y-4 lg:space-y-6">
              {/* Sensor Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-green-800">{selectedSensor.name}</h2>
                        {selectedSensor.online ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            <Wifi className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <WifiOff className="w-3 h-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-green-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedSensor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated {selectedSensor.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 text-sm mb-1">Sensor ID</p>
                      <p className="text-green-800">{selectedSensor.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sensor Metrics */}
              {selectedSensor.online ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* Temperature Card */}
                    <Card className={`border-l-4 ${getStatusColor(getValueStatus(selectedSensor.temperature, 'temp'))}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Thermometer className="w-6 h-6 text-orange-600" />
                          </div>
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-green-600 mb-1">Temperature</p>
                        <p className="text-green-800 mb-2">{selectedSensor.temperature}°C</p>
                        <p className="text-green-600 text-sm">
                          {getValueStatus(selectedSensor.temperature, 'temp') === 'optimal' && 'Optimal range'}
                          {getValueStatus(selectedSensor.temperature, 'temp') === 'warning' && 'Above normal'}
                          {getValueStatus(selectedSensor.temperature, 'temp') === 'critical' && 'Critical level'}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Humidity Card */}
                    <Card className={`border-l-4 ${getStatusColor(getValueStatus(selectedSensor.humidity, 'humidity'))}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-sky-600" />
                          </div>
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-green-600 mb-1">Humidity</p>
                        <p className="text-green-800 mb-2">{selectedSensor.humidity}%</p>
                        <p className="text-green-600 text-sm">
                          {getValueStatus(selectedSensor.humidity, 'humidity') === 'optimal' && 'Optimal range'}
                          {getValueStatus(selectedSensor.humidity, 'humidity') === 'warning' && 'Below normal'}
                          {getValueStatus(selectedSensor.humidity, 'humidity') === 'critical' && 'Critical level'}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Soil Moisture Card */}
                    <Card className={`border-l-4 ${getStatusColor(getValueStatus(selectedSensor.soilMoisture, 'moisture'))}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Gauge className="w-6 h-6 text-green-600" />
                          </div>
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-green-600 mb-1">Soil Moisture</p>
                        <p className="text-green-800 mb-2">{selectedSensor.soilMoisture}%</p>
                        <p className="text-green-600 text-sm">
                          {getValueStatus(selectedSensor.soilMoisture, 'moisture') === 'optimal' && 'Optimal range'}
                          {getValueStatus(selectedSensor.soilMoisture, 'moisture') === 'warning' && 'Below normal'}
                          {getValueStatus(selectedSensor.soilMoisture, 'moisture') === 'critical' && 'Critical level'}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Battery Card */}
                    <Card className={`border-l-4 ${selectedSensor.battery > 50 ? 'border-green-500' : selectedSensor.battery > 20 ? 'border-yellow-500' : 'border-red-500'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedSensor.battery > 50 ? 'bg-green-100' : selectedSensor.battery > 20 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                            <span className={getBatteryColor(selectedSensor.battery)}>
                              {getBatteryIcon(selectedSensor.battery)}
                            </span>
                          </div>
                          <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-green-600 mb-1">Battery</p>
                        <p className="text-green-800 mb-2">{selectedSensor.battery}%</p>
                        <p className="text-green-600 text-sm">
                          {selectedSensor.battery > 50 && 'Good condition'}
                          {selectedSensor.battery <= 50 && selectedSensor.battery > 20 && 'Needs charging'}
                          {selectedSensor.battery <= 20 && 'Low battery'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-800">Connection Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <span className="text-green-700">Signal Strength</span>
                          <span className="text-green-800">{selectedSensor.signal}%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <span className="text-green-700">Last Update</span>
                          <span className="text-green-800">{selectedSensor.lastUpdate}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <span className="text-green-700">Status</span>
                          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-800">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh Data
                        </Button>
                        <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 justify-start">
                          <Activity className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                        <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 justify-start">
                          <MapPin className="w-4 h-4 mr-2" />
                          Locate on Map
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <WifiOff className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-red-800 mb-2">Sensor Offline</h3>
                    <p className="text-red-600 mb-6">
                      This sensor is currently offline. Last update was {selectedSensor.lastUpdate}.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Reconnect
                      </Button>
                      <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                        View Last Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
