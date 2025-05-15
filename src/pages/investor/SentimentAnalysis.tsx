
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Mock sentiment data
const mockSentimentData = [
  { id: 1, name: 'Apple Inc.', ticker: 'AAPL', score: 0.62, sentiment: 'Positive', source: 'Reddit' },
  { id: 2, name: 'Microsoft Corporation', ticker: 'MSFT', score: 0.75, sentiment: 'Positive', source: 'News' },
  { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', score: 0.08, sentiment: 'Neutral', source: 'Twitter' },
  { id: 4, name: 'Alphabet Inc.', ticker: 'GOOGL', score: 0.45, sentiment: 'Positive', source: 'Reddit' },
  { id: 5, name: 'Meta Platforms Inc.', ticker: 'META', score: 0.52, sentiment: 'Positive', source: 'News' },
  { id: 6, name: 'Tesla Inc.', ticker: 'TSLA', score: -0.18, sentiment: 'Negative', source: 'Twitter' },
  { id: 7, name: 'NVIDIA Corporation', ticker: 'NVDA', score: 0.88, sentiment: 'Positive', source: 'News' },
  { id: 8, name: 'JPMorgan Chase & Co.', ticker: 'JPM', score: 0.22, sentiment: 'Neutral', source: 'News' },
  { id: 9, name: 'Johnson & Johnson', ticker: 'JNJ', score: -0.35, sentiment: 'Negative', source: 'Reddit' },
  { id: 10, name: 'Visa Inc.', ticker: 'V', score: 0.41, sentiment: 'Positive', source: 'Twitter' }
];

// Mock sentiment trend data
const mockSentimentTrendData = [
  { date: 'Apr 15', AAPL: 0.4, MSFT: 0.6, AMZN: 0.3, NVDA: 0.7, META: 0.5 },
  { date: 'Apr 22', AAPL: 0.45, MSFT: 0.65, AMZN: 0.2, NVDA: 0.75, META: 0.45 },
  { date: 'Apr 29', AAPL: 0.5, MSFT: 0.7, AMZN: 0.1, NVDA: 0.8, META: 0.5 },
  { date: 'May 06', AAPL: 0.55, MSFT: 0.68, AMZN: 0.05, NVDA: 0.85, META: 0.48 },
  { date: 'May 13', AAPL: 0.62, MSFT: 0.75, AMZN: 0.08, NVDA: 0.88, META: 0.52 },
];

const SentimentAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sentimentData] = useState(mockSentimentData);
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['MSFT', 'NVDA', 'META']);
  
  const filteredData = sentimentData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
    
    return matchesSearch && matchesSource;
  });
  
  const getSentimentBadgeVariant = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'default';
      case 'Neutral':
        return 'secondary';
      case 'Negative':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const toggleStockSelection = (ticker: string) => {
    if (selectedStocks.includes(ticker)) {
      setSelectedStocks(selectedStocks.filter(stock => stock !== ticker));
    } else {
      if (selectedStocks.length < 5) {
        setSelectedStocks([...selectedStocks, ticker]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sentiment Analysis</h1>
        <p className="text-muted-foreground mt-1">Track market sentiment from multiple sources</p>
      </div>
      
      {/* Sentiment Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Trends</CardTitle>
          <CardDescription>Track sentiment changes over time for selected stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockSentimentTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[-1, 1]} />
                <Tooltip />
                <Legend />
                {selectedStocks.includes('MSFT') && (
                  <Line type="monotone" dataKey="MSFT" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                )}
                {selectedStocks.includes('NVDA') && (
                  <Line type="monotone" dataKey="NVDA" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
                )}
                {selectedStocks.includes('AAPL') && (
                  <Line type="monotone" dataKey="AAPL" stroke="#ff7300" activeDot={{ r: 8 }} strokeWidth={2} />
                )}
                {selectedStocks.includes('AMZN') && (
                  <Line type="monotone" dataKey="AMZN" stroke="#0088fe" activeDot={{ r: 8 }} strokeWidth={2} />
                )}
                {selectedStocks.includes('META') && (
                  <Line type="monotone" dataKey="META" stroke="#00C49F" activeDot={{ r: 8 }} strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Click on a stock in the table below to add/remove it from the chart (max 5)
          </div>
        </CardContent>
      </Card>
      
      {/* Sentiment Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Sentiment Data</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search stocks..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Data Source</SelectLabel>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="Reddit">Reddit</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow 
                    key={item.id}
                    className={selectedStocks.includes(item.ticker) ? 'bg-muted/50' : ''}
                    onClick={() => toggleStockSelection(item.ticker)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.ticker}</TableCell>
                    <TableCell>{item.score.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getSentimentBadgeVariant(item.sentiment)}>
                        {item.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.source}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No stocks matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Sentiment Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Sentiment Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Sentiment Scale</Label>
              <p className="text-sm text-muted-foreground">
                Sentiment scores range from -1 to +1, where:
              </p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="border rounded-md p-3 text-center">
                  <Badge variant="destructive" className="mb-2">Negative</Badge>
                  <p className="text-sm">-1.0 to -0.1</p>
                  <p className="text-xs text-muted-foreground mt-1">Bearish market sentiment</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <Badge variant="secondary" className="mb-2">Neutral</Badge>
                  <p className="text-sm">-0.1 to +0.3</p>
                  <p className="text-xs text-muted-foreground mt-1">Balanced market outlook</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <Badge className="mb-2">Positive</Badge>
                  <p className="text-sm">+0.3 to +1.0</p>
                  <p className="text-xs text-muted-foreground mt-1">Bullish market sentiment</p>
                </div>
              </div>
            </div>
            <div>
              <Label className="font-semibold">Data Sources</Label>
              <p className="text-sm text-muted-foreground">
                Sentiment data is aggregated from multiple sources including social media platforms and financial news:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Reddit: Analysis of investment subreddits like r/wallstreetbets and r/investing</li>
                <li>Twitter: Tracking financial influencers and trending stock discussions</li>
                <li>News: Parsing financial news articles from major publications</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
