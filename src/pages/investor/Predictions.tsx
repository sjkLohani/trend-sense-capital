
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, TrendingDown, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Mock prediction data for stocks
const mockPredictions = [
  { id: 1, name: 'Apple Inc.', ticker: 'AAPL', action: 'Buy', confidence: 0.78, reasoning: 'Strong positive sentiment and upcoming product releases' },
  { id: 2, name: 'Microsoft Corporation', ticker: 'MSFT', action: 'Buy', confidence: 0.85, reasoning: 'Consistent positive sentiment and cloud services growth' },
  { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', action: 'Hold', confidence: 0.62, reasoning: 'Mixed sentiment with potential regulatory headwinds' },
  { id: 4, name: 'Alphabet Inc.', ticker: 'GOOGL', action: 'Buy', confidence: 0.72, reasoning: 'AI advancements and stable ad revenue outlook' },
  { id: 5, name: 'Meta Platforms Inc.', ticker: 'META', action: 'Buy', confidence: 0.68, reasoning: 'Metaverse investments generating positive sentiment' },
  { id: 6, name: 'Tesla Inc.', ticker: 'TSLA', action: 'Sell', confidence: 0.74, reasoning: 'Production challenges and increasing competition' },
  { id: 7, name: 'NVIDIA Corporation', ticker: 'NVDA', action: 'Buy', confidence: 0.92, reasoning: 'Strong AI chip demand and overwhelmingly positive sentiment' },
  { id: 8, name: 'JPMorgan Chase & Co.', ticker: 'JPM', action: 'Hold', confidence: 0.58, reasoning: 'Banking sector uncertainty despite strong fundamentals' },
  { id: 9, name: 'Johnson & Johnson', ticker: 'JNJ', action: 'Sell', confidence: 0.67, reasoning: 'Legal challenges affecting market sentiment' },
  { id: 10, name: 'Visa Inc.', ticker: 'V', action: 'Buy', confidence: 0.71, reasoning: 'Positive outlook on consumer spending and fintech integration' }
];

// Mock simulation data
const mockSimulationData = [
  { date: '2025-01', selectedStocks: 10500, sp500: 10000 },
  { date: '2025-02', selectedStocks: 11200, sp500: 10200 },
  { date: '2025-03', selectedStocks: 12000, sp500: 10300 },
  { date: '2025-04', selectedStocks: 11800, sp500: 10400 },
  { date: '2025-05', selectedStocks: 12500, sp500: 10600 },
];

const Predictions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions] = useState(mockPredictions);
  const [simulationData] = useState(mockSimulationData);
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [simulationResults, setSimulationResults] = useState({
    selectedStocksReturn: 25.0,
    sp500Return: 6.0,
    selectedStocksFinalValue: 12500,
    sp500FinalValue: 10600,
    outperformance: 19.0
  });
  
  const filteredPredictions = predictions.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'Buy':
        return 'default';
      case 'Hold':
        return 'secondary';
      case 'Sell':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Buy':
        return <TrendingUp className="h-4 w-4 mr-1" />;
      case 'Sell':
        return <TrendingDown className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const runSimulation = () => {
    // In a real app, this would recalculate the simulation with the new investment amount
    // For now, we'll just update the final values based on the same percentage returns
    const newSelectedStocksFinal = Math.round(investmentAmount * (1 + simulationResults.selectedStocksReturn / 100));
    const newSP500Final = Math.round(investmentAmount * (1 + simulationResults.sp500Return / 100));
    
    setSimulationResults({
      ...simulationResults,
      selectedStocksFinalValue: newSelectedStocksFinal,
      sp500FinalValue: newSP500Final
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Predictions & Simulation</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered stock predictions and portfolio simulation tools
        </p>
      </div>
      
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="simulation">Investment Simulation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Stock Predictions</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search stocks..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <CardDescription>
                AI-generated predictions based on current sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stock</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Recommendation</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Reasoning</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPredictions.length > 0 ? (
                    filteredPredictions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.ticker}</TableCell>
                        <TableCell>
                          <Badge variant={getActionBadgeVariant(item.action)} className="flex w-fit items-center">
                            {getActionIcon(item.action)}
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-muted w-24 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  item.action === 'Buy' ? 'bg-green-500' : 
                                  item.action === 'Sell' ? 'bg-red-500' : 
                                  'bg-yellow-500'
                                }`}
                                style={{ width: `${item.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{(item.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.reasoning}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No predictions matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simulation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Simulation</CardTitle>
              <CardDescription>
                Compare the performance of sentiment-based selections vs. S&P 500
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 md:items-end">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="investment-amount">Initial Investment Amount ($)</Label>
                    <Input 
                      id="investment-amount" 
                      type="number" 
                      value={investmentAmount} 
                      onChange={(e) => setInvestmentAmount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button onClick={runSimulation}>Run Simulation</Button>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={simulationData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="selectedStocks" 
                        name="Sentiment-Selected Stocks" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sp500" 
                        name="S&P 500 Index" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Sentiment-Selected Stocks</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="text-2xl font-bold text-green-600">+{simulationResults.selectedStocksReturn}%</div>
                      <div className="text-sm text-muted-foreground">
                        ${investmentAmount} → ${simulationResults.selectedStocksFinalValue}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">S&P 500 Index</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="text-2xl font-bold">+{simulationResults.sp500Return}%</div>
                      <div className="text-sm text-muted-foreground">
                        ${investmentAmount} → ${simulationResults.sp500FinalValue}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Sentiment Outperformance</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <div className="text-2xl font-bold text-green-600">+{simulationResults.outperformance}%</div>
                      <div className="text-sm text-muted-foreground">
                        ${simulationResults.selectedStocksFinalValue - simulationResults.sp500FinalValue} more profit
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Predictions;
