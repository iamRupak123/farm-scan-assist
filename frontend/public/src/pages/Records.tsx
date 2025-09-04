import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  BarChart3
} from 'lucide-react';

interface AnimalRecord {
  id: string;
  species: 'cattle' | 'buffalo';
  breed: string;
  date: string;
  overallScore: number;
  status: 'completed' | 'processing' | 'failed';
  confidence: number;
  imageUrl?: string;
}

const mockRecords: AnimalRecord[] = [
  {
    id: 'ATC-001',
    species: 'cattle',
    breed: 'Holstein',
    date: '2024-01-15',
    overallScore: 82,
    status: 'completed',
    confidence: 94.2
  },
  {
    id: 'ATC-002',
    species: 'buffalo',
    breed: 'Murrah',
    date: '2024-01-14',
    overallScore: 76,
    status: 'completed',
    confidence: 89.1
  },
  {
    id: 'ATC-003',
    species: 'cattle',
    breed: 'Jersey',
    date: '2024-01-13',
    overallScore: 88,
    status: 'completed',
    confidence: 96.8
  },
  {
    id: 'ATC-004',
    species: 'cattle',
    breed: 'Angus',
    date: '2024-01-12',
    overallScore: 79,
    status: 'completed',
    confidence: 91.5
  },
  {
    id: 'ATC-005',
    species: 'buffalo',
    breed: 'Nili-Ravi',
    date: '2024-01-11',
    overallScore: 85,
    status: 'completed',
    confidence: 93.2
  },
  {
    id: 'ATC-006',
    species: 'cattle',
    breed: 'Holstein',
    date: '2024-01-10',
    overallScore: 0,
    status: 'processing',
    confidence: 0
  },
];

const Records = () => {
  const [records] = useState<AnimalRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || record.species === speciesFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-warning/10 text-warning">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success font-semibold';
    if (score >= 60) return 'text-warning font-semibold';
    return 'text-destructive font-semibold';
  };

  const stats = {
    total: records.length,
    completed: records.filter(r => r.status === 'completed').length,
    avgScore: Math.round(records.filter(r => r.status === 'completed').reduce((acc, r) => acc + r.overallScore, 0) / records.filter(r => r.status === 'completed').length),
    cattle: records.filter(r => r.species === 'cattle').length,
    buffalo: records.filter(r => r.species === 'buffalo').length
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Analysis Records</h1>
          <p className="text-lg text-muted-foreground">
            View and manage all your animal analysis records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Records</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">{stats.avgScore}</p>
              <p className="text-sm text-muted-foreground">Avg. Score</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.cattle}</p>
              <p className="text-sm text-muted-foreground">Cattle</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.buffalo}</p>
              <p className="text-sm text-muted-foreground">Buffalo</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by ID or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="cattle">Cattle</SelectItem>
                  <SelectItem value="buffalo">Buffalo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="shadow-soft">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Records ({filteredRecords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Animal ID</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Date
                    </TableHead>
                    <TableHead>ATC Score</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell className="capitalize">{record.species}</TableCell>
                      <TableCell>{record.breed}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {record.status === 'completed' ? (
                          <span className={getScoreColor(record.overallScore)}>
                            {record.overallScore}/100
                          </span>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.status === 'completed' ? (
                          <span className="text-foreground">{record.confidence}%</span>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled={record.status !== 'completed'}
                          className="shadow-soft"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No records found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Records;