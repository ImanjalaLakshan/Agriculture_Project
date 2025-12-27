import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Upload,
  Database,
  Users,
  FileImage,
  FileSpreadsheet,
  Trash2,
  Edit,
  UserPlus,
  Key,
  Shield,
  Download,
  Eye,
  MoreVertical,
  Search,
  Filter,
  Settings,
  LogOut,
  Sprout,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Dataset {
  id: string;
  name: string;
  type: 'image' | 'csv';
  size: string;
  records: number;
  uploadedBy: string;
  uploadedDate: string;
  status: 'active' | 'processing' | 'archived';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  fields: number;
}

const datasets: Dataset[] = [
  {
    id: 'DS001',
    name: 'Paddy Field Images - North Region',
    type: 'image',
    size: '2.4 GB',
    records: 1250,
    uploadedBy: 'Admin User',
    uploadedDate: '2025-11-20',
    status: 'active',
  },
  {
    id: 'DS002',
    name: 'Sensor Data - November 2025',
    type: 'csv',
    size: '45 MB',
    records: 50000,
    uploadedBy: 'John Manager',
    uploadedDate: '2025-11-22',
    status: 'active',
  },
  {
    id: 'DS003',
    name: 'Disease Detection Training Set',
    type: 'image',
    size: '3.8 GB',
    records: 2100,
    uploadedBy: 'Admin User',
    uploadedDate: '2025-11-18',
    status: 'processing',
  },
  {
    id: 'DS004',
    name: 'Historical Weather Data',
    type: 'csv',
    size: '120 MB',
    records: 85000,
    uploadedBy: 'Sarah Admin',
    uploadedDate: '2025-11-15',
    status: 'archived',
  },
];

const users: User[] = [
  {
    id: 'U001',
    name: 'Admin User',
    email: 'admin@agroeye.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 mins ago',
    fields: 0,
  },
  {
    id: 'U002',
    name: 'John Manager',
    email: 'john@agroeye.com',
    role: 'manager',
    status: 'active',
    lastLogin: '1 hour ago',
    fields: 12,
  },
  {
    id: 'U003',
    name: 'Sarah Farmer',
    email: 'sarah@agroeye.com',
    role: 'user',
    status: 'active',
    lastLogin: '3 hours ago',
    fields: 8,
  },
  {
    id: 'U004',
    name: 'Mike Johnson',
    email: 'mike@agroeye.com',
    role: 'user',
    status: 'active',
    lastLogin: '1 day ago',
    fields: 5,
  },
  {
    id: 'U005',
    name: 'Lisa Chen',
    email: 'lisa@agroeye.com',
    role: 'manager',
    status: 'inactive',
    lastLogin: '1 week ago',
    fields: 15,
  },
];

export function AdminPanel() {
  const [searchDataset, setSearchDataset] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
  const [isUploadCsvOpen, setIsUploadCsvOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchDataset.toLowerCase()) ||
      dataset.id.toLowerCase().includes(searchDataset.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      case 'inactive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500';
      case 'manager':
        return 'bg-blue-500';
      case 'user':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-800">AgroEye Admin Panel</h1>
                <p className="text-green-600 text-sm">Paddy Monitoring System Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm mb-1">Total Datasets</p>
                  <p className="text-green-800">{datasets.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm mb-1">Total Users</p>
                  <p className="text-blue-800">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm mb-1">Active Users</p>
                  <p className="text-purple-800">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm mb-1">Storage Used</p>
                  <p className="text-orange-800">6.3 GB</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Dataset Management Section */}
          <Card className="shadow-lg">
            <CardHeader className="border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Database className="w-5 h-5" />
                  Dataset Management
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Dialog open={isUploadImageOpen} onOpenChange={setIsUploadImageOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700" size="sm">
                        <FileImage className="w-4 h-4 mr-2" />
                        Upload Images
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Image Dataset</DialogTitle>
                        <DialogDescription>
                          Upload images for paddy field analysis and disease detection
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="dataset-name">Dataset Name</Label>
                          <Input
                            id="dataset-name"
                            placeholder="e.g., Paddy Field Images - South Region"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="image-upload">Select Images</Label>
                          <div className="mt-2 border-2 border-dashed border-green-200 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-green-700 mb-1">Click to upload or drag and drop</p>
                            <p className="text-green-600 text-sm">PNG, JPG up to 10GB</p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Input
                            id="description"
                            placeholder="Add description..."
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsUploadImageOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Upload Dataset
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isUploadCsvOpen} onOpenChange={setIsUploadCsvOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50" size="sm">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Upload CSV
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload CSV Dataset</DialogTitle>
                        <DialogDescription>
                          Upload sensor data, weather information, or other CSV files
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="csv-name">Dataset Name</Label>
                          <Input
                            id="csv-name"
                            placeholder="e.g., Sensor Data - December 2025"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="csv-upload">Select CSV File</Label>
                          <div className="mt-2 border-2 border-dashed border-green-200 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                            <FileSpreadsheet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-green-700 mb-1">Click to upload or drag and drop</p>
                            <p className="text-green-600 text-sm">CSV files up to 500MB</p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="csv-description">Description (Optional)</Label>
                          <Input
                            id="csv-description"
                            placeholder="Add description..."
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsUploadCsvOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Upload Dataset
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                  <Input
                    placeholder="Search datasets..."
                    value={searchDataset}
                    onChange={(e) => setSearchDataset(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Dataset List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredDatasets.map((dataset) => (
                  <Card key={dataset.id} className="border border-green-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            dataset.type === 'image' ? 'bg-purple-100' : 'bg-blue-100'
                          }`}>
                            {dataset.type === 'image' ? (
                              <FileImage className={`w-5 h-5 ${dataset.type === 'image' ? 'text-purple-600' : 'text-blue-600'}`} />
                            ) : (
                              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-green-800 mb-1">{dataset.name}</p>
                            <p className="text-green-600 text-sm mb-2">{dataset.id}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`${getStatusColor(dataset.status)} hover:${getStatusColor(dataset.status)}`}>
                                {dataset.status}
                              </Badge>
                              <Badge variant="outline" className="border-green-200 text-green-700">
                                {dataset.records.toLocaleString()} records
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-600 text-xs mb-1">Size</p>
                          <p className="text-green-800">{dataset.size}</p>
                        </div>
                        <div>
                          <p className="text-green-600 text-xs mb-1">Uploaded By</p>
                          <p className="text-green-800">{dataset.uploadedBy}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management Section */}
          <Card className="shadow-lg">
            <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account and assign appropriate roles
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          placeholder="Enter full name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-email">Email Address</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="user@example.com"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-role">User Role</Label>
                        <Select defaultValue="user">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin - Full Access</SelectItem>
                            <SelectItem value="manager">Manager - Manage Fields</SelectItem>
                            <SelectItem value="user">User - View Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="user-password">Initial Password</Label>
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="Set temporary password"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Create User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                  <Input
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* User List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border border-blue-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-blue-800 mb-1">{user.name}</p>
                            <p className="text-blue-600 text-sm mb-2">{user.email}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`${getRoleColor(user.role)} hover:${getRoleColor(user.role)}`}>
                                {user.role}
                              </Badge>
                              <Badge className={`${getStatusColor(user.status)} hover:${getStatusColor(user.status)}`}>
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="w-4 h-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="w-4 h-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-600 text-xs mb-1">Last Login</p>
                          <p className="text-blue-800">{user.lastLogin}</p>
                        </div>
                        <div>
                          <p className="text-blue-600 text-xs mb-1">Fields Managed</p>
                          <p className="text-blue-800">{user.fields} fields</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
