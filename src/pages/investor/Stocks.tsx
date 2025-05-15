
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search, TrendingUp } from 'lucide-react';

// Mock data for S&P 500 stocks
const mockStocks = [
  { id: 1, name: 'Apple Inc.', ticker: 'AAPL', currentPrice: 178.42, change: 1.25 },
  { id: 2, name: 'Microsoft Corporation', ticker: 'MSFT', currentPrice: 328.79, change: 2.84 },
  { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', currentPrice: 142.56, change: -0.85 },
  { id: 4, name: 'Alphabet Inc.', ticker: 'GOOGL', currentPrice: 154.83, change: 1.12 },
  { id: 5, name: 'Meta Platforms Inc.', ticker: 'META', currentPrice: 398.45, change: 3.75 },
  { id: 6, name: 'Tesla Inc.', ticker: 'TSLA', currentPrice: 192.36, change: -2.34 },
  { id: 7, name: 'NVIDIA Corporation', ticker: 'NVDA', currentPrice: 875.28, change: 12.56 },
  { id: 8, name: 'JPMorgan Chase & Co.', ticker: 'JPM', currentPrice: 176.82, change: 0.54 },
  { id: 9, name: 'Johnson & Johnson', ticker: 'JNJ', currentPrice: 155.45, change: -0.32 },
  { id: 10, name: 'Visa Inc.', ticker: 'V', currentPrice: 278.34, change: 1.86 }
];

// Mock user portfolio
const initialPortfolio: number[] = [3, 7]; // IDs of stocks in portfolio

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks] = useState(mockStocks);
  const [portfolio, setPortfolio] = useState<number[]>(initialPortfolio);
  const { toast } = useToast();

  const filteredStocks = stocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToPortfolio = (stockId: number) => {
    if (portfolio.includes(stockId)) {
      toast({
        title: "Already in Portfolio",
        description: `This stock is already in your portfolio.`,
      });
      return;
    }
    
    setPortfolio([...portfolio, stockId]);
    const stock = stocks.find(s => s.id === stockId);
    
    toast({
      title: "Stock Added",
      description: `${stock?.ticker} has been added to your portfolio.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">S&P 500 Stocks</h1>
        <p className="text-muted-foreground mt-1">Browse and add stocks to your portfolio</p>
      </div>
      
      {/* Top Performers Chart */}
      <Card>
        <CardHeader>
          <CardTitle>S&P 500 Top Performers</CardTitle>
          <CardDescription>Latest market trends for top-performing stocks</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="h-10 w-10 mx-auto mb-2" />
            <p>Interactive chart visualization would appear here</p>
            <p className="text-sm">Showing real-time performance data for top S&P 500 stocks</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Stock Listing */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>All Stocks</CardTitle>
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">{stock.name}</TableCell>
                    <TableCell>{stock.ticker}</TableCell>
                    <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant={portfolio.includes(stock.id) ? "secondary" : "default"} 
                        size="sm"
                        onClick={() => addToPortfolio(stock.id)}
                        disabled={portfolio.includes(stock.id)}
                      >
                        {portfolio.includes(stock.id) ? 'Added' : 'Add to Portfolio'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No stocks matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stocks;
