import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Bell,
  Thermometer,
  Droplets,
  Gauge,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Sprout,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for temperature trend
const temperatureData = [
  { time: '00:00', temp: 28 },
  { time: '04:00', temp: 26 },
  { time: '08:00', temp: 30 },
  { time: '12:00', temp: 34 },
  { time: '16:00', temp: 32 },
  { time: '20:00', temp: 29 },
  { time: '24:00', temp: 27 },
];

// Mock data for moisture trend
const moistureData = [
  { time: '00:00', moisture: 75 },
  { time: '04:00', moisture: 73 },
  { time: '08:00', moisture: 70 },
  { time: '12:00', moisture: 68 },
  { time: '16:00', moisture: 65 },
  { time: '20:00', moisture: 67 },
  { time: '24:00', moisture: 71 },
];

interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  message: string;
  time: string;
}

const alerts: Alert[] = [
  { id: 1, type: 'warning', message: 'Soil moisture dropping below optimal level in Field A3', time: '10 mins ago' },
  { id: 2, type: 'critical', message: 'High temperature detected in Field B2 - 38°C', time: '25 mins ago' },
  { id: 3, type: 'info', message: 'Irrigation scheduled for Field C1 at 6:00 PM', time: '1 hour ago' },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-green-100 p-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-green-800">Paddy Field Monitoring</h1>
          <Button className="bg-green-600 hover:bg-green-700">
            <Bell className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4 lg:p-6 space-y-6">
        {/* Crop Health Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Sprout className="w-5 h-5" />
              Crop Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-green-600 text-sm">Healthy</p>
                  <p className="text-green-800">12 Fields</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-yellow-600 text-sm">Moderate</p>
                  <p className="text-yellow-800">5 Fields</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 text-sm">Alert</p>
                  <p className="text-red-800">2 Fields</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Sensor Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 mb-2">Temperature</p>
                  <p className="text-green-800">32°C</p>
                  <p className="text-green-600 text-sm mt-1">Optimal range</p>
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 mb-2">Humidity</p>
                  <p className="text-green-800">68%</p>
                  <p className="text-green-600 text-sm mt-1">Good condition</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 mb-2">Soil Moisture</p>
                  <p className="text-green-800">72%</p>
                  <p className="text-yellow-600 text-sm mt-1">Needs attention</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Gauge className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Graphs */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Temperature Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="w-5 h-5" />
                Temperature Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="time" stroke="#16a34a" />
                  <YAxis stroke="#16a34a" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #16a34a',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: '#f97316', r: 4 }}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Moisture Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="w-5 h-5" />
                Moisture Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={moistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="time" stroke="#16a34a" />
                  <YAxis stroke="#16a34a" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #16a34a',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 4 }}
                    name="Moisture (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Bell className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    alert.type === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : alert.type === 'warning'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div>
                    {alert.type === 'critical' ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : alert.type === 'warning' ? (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={
                        alert.type === 'critical'
                          ? 'text-red-800'
                          : alert.type === 'warning'
                          ? 'text-yellow-800'
                          : 'text-blue-800'
                      }
                    >
                      {alert.message}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        alert.type === 'critical'
                          ? 'text-red-600'
                          : alert.type === 'warning'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
