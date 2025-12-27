import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  ZoomIn,
  ZoomOut,
  Layers,
  RefreshCw,
  X,
  Thermometer,
  Droplets,
  Navigation,
  MapPin,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SensorNode {
  id: string;
  x: number; // percentage position
  y: number; // percentage position
  temperature: number;
  moisture: number;
  status: 'healthy' | 'stress' | 'disease';
  name: string;
}

const sensorNodes: SensorNode[] = [
  { id: '1', x: 25, y: 30, temperature: 28, moisture: 75, status: 'healthy', name: 'Sensor A1' },
  { id: '2', x: 45, y: 25, temperature: 32, moisture: 68, status: 'stress', name: 'Sensor A2' },
  { id: '3', x: 65, y: 35, temperature: 35, moisture: 55, status: 'disease', name: 'Sensor A3' },
  { id: '4', x: 30, y: 55, temperature: 29, moisture: 78, status: 'healthy', name: 'Sensor B1' },
  { id: '5', x: 55, y: 60, temperature: 31, moisture: 72, status: 'healthy', name: 'Sensor B2' },
  { id: '6', x: 75, y: 65, temperature: 33, moisture: 62, status: 'stress', name: 'Sensor B3' },
  { id: '7', x: 40, y: 75, temperature: 30, moisture: 76, status: 'healthy', name: 'Sensor C1' },
  { id: '8', x: 70, y: 80, temperature: 28, moisture: 80, status: 'healthy', name: 'Sensor C2' },
];

export function MapView() {
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showLayers, setShowLayers] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'stress':
        return 'bg-yellow-500';
      case 'disease':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-green-400';
      case 'stress':
        return 'border-yellow-400';
      case 'disease':
        return 'border-red-400';
      default:
        return 'border-gray-400';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleRefresh = () => {
    console.log('Refreshing sensor data...');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Map Background */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1721594489297-963f5e24abe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtJTIwZmllbGQlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NjM5MDc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Aerial view of farm field"
          className="w-full h-full object-cover"
        />
        {showHeatmap && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-red-500/20 mix-blend-multiply" />
        )}
      </div>

      {/* Sensor Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="relative w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {sensorNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className="absolute pointer-events-auto group"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulsing Ring */}
              <div
                className={`absolute inset-0 rounded-full ${getStatusColor(
                  node.status
                )} animate-ping opacity-75`}
                style={{ width: '48px', height: '48px', margin: '-12px' }}
              />
              
              {/* Node Circle */}
              <div
                className={`relative w-6 h-6 rounded-full ${getStatusColor(
                  node.status
                )} border-2 border-white shadow-lg transition-all group-hover:scale-125`}
              />

              {/* Quick Data Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-lg shadow-xl p-3 min-w-[160px] border border-gray-200">
                  <p className="text-gray-800 mb-2">{node.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span>{node.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>{node.moisture}%</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-gray-800">Field Map View</span>
          </div>
          <Button
            onClick={() => window.history.back()}
            className="bg-white text-gray-800 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          className="w-12 h-12 bg-white text-gray-800 hover:bg-gray-100 shadow-lg rounded-lg p-0"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleZoomOut}
          className="w-12 h-12 bg-white text-gray-800 hover:bg-gray-100 shadow-lg rounded-lg p-0"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setShowLayers(!showLayers)}
          className={`w-12 h-12 shadow-lg rounded-lg p-0 ${
            showLayers ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
          title="Toggle Layers"
        >
          <Layers className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleRefresh}
          className="w-12 h-12 bg-white text-gray-800 hover:bg-gray-100 shadow-lg rounded-lg p-0"
          title="Refresh Data"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setZoomLevel(100)}
          className="w-12 h-12 bg-white text-gray-800 hover:bg-gray-100 shadow-lg rounded-lg p-0"
          title="Reset View"
        >
          <Navigation className="w-5 h-5" />
        </Button>
      </div>

      {/* Heatmap Legend */}
      <div className="absolute bottom-4 left-4">
        <Card className="shadow-xl">
          <CardContent className="p-4">
            <p className="text-gray-800 mb-3">Field Health Status</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-gray-700 text-sm">Healthy - Optimal conditions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-gray-700 text-sm">Stress - Needs attention</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-gray-700 text-sm">Disease - Immediate action</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-700 text-sm">Show heatmap overlay</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layer Panel */}
      {showLayers && (
        <div className="absolute right-20 top-1/2 -translate-y-1/2">
          <Card className="shadow-xl w-64">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-800">Map Layers</span>
                <button onClick={() => setShowLayers(false)}>
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">Satellite View</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">Sensor Nodes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    defaultChecked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">Health Heatmap</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">NDVI Analysis</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">Irrigation Zones</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-white rounded-lg shadow-lg px-3 py-2">
          <span className="text-gray-700 text-sm">{zoomLevel}%</span>
        </div>
      </div>

      {/* Selected Node Detail Panel */}
      {selectedNode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
          <Card className="shadow-2xl w-80">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${getStatusColor(
                      selectedNode.status
                    )} border-2 border-white shadow-md`}
                  />
                  <span className="text-gray-800">{selectedNode.name}</span>
                </div>
                <button onClick={() => setSelectedNode(null)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Temperature</span>
                  </div>
                  <span className="text-gray-800">{selectedNode.temperature}°C</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Soil Moisture</span>
                  </div>
                  <span className="text-gray-800">{selectedNode.moisture}%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      selectedNode.status === 'healthy'
                        ? 'bg-green-500'
                        : selectedNode.status === 'stress'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {selectedNode.status.charAt(0).toUpperCase() + selectedNode.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  View Detailed History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
