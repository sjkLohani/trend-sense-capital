
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for portfolio stocks
const mockStocks = [
  { id: 3, name: 'Amazon.com Inc.', ticker: 'AMZN', currentPrice: 142.56, change: -0.85, sentiment: 'Neutral', sentimentScore: 0.08 },
  { id: 7, name: 'NVIDIA Corporation', ticker: 'NVDA', currentPrice: 875.28, change: 12.56, sentiment: 'Positive', sentimentScore: 0.78 },
  { id: 2, name: 'Microsoft Corporation', ticker: 'MSFT', currentPrice: 328.79, change: 2.84, sentiment: 'Positive', sentimentScore: 0.65 },
  { id: 5, name: 'Meta Platforms Inc.', ticker: 'META', currentPrice: 398.45, change: 3.75, sentiment: 'Positive', sentimentScore: 0.54 },
];

const Portfolio = () => {
  const [portfolioStocks, setPortfolioStocks] = useState(mockStocks);
  const { toast } = useToast();

  const removeFromPortfolio = (stockId: number) => {
    const stockToRemove = portfolioStocks.find(s => s.id === stockId);
    if (!stockToRemove) return;
    
    setPortfolioStocks(portfolioStocks.filter(stock => stock.id !== stockId));
    
    toast({
      title: "Stock Removed",
      description: `${stockToRemove.ticker} has been removed from your portfolio.`,
    });
  };

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

  // Calculate portfolio stats
  const totalValue = portfolioStocks.reduce((sum, stock) => sum + stock.currentPrice, 0);
  const totalChange = portfolioStocks.reduce((sum, stock) => sum + stock.change, 0) / portfolioStocks.length;
  const averageSentiment = portfolioStocks.reduce((sum, stock) => sum + stock.sentimentScore, 0) / portfolioStocks.length;
  
  const getSentimentLabel = (score: number) => {
    if (score > 0.5) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Portfolio</h1>
        <p className="text-muted-foreground mt-1">Track performance and sentiment of your stocks</p>
      </div>
      
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className={`text-xs ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getSentimentLabel(averageSentiment)}</div>
            <p className="text-xs text-muted-foreground">
              Score: {averageSentiment.toFixed(2)} from -1 to 1
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stocks Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStocks.length}</div>
            <p className="text-xs text-muted-foreground">
              Add more from the S&P 500 list
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Portfolio Stocks */}
      <Card>
        <CardHeader>
          <CardTitle>Your Stocks</CardTitle>
          <CardDescription>Manage your stocks and track their performance</CardDescription>
        </CardHeader>
        <CardContent>
          {portfolioStocks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Ticker</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">{stock.name}</TableCell>
                    <TableCell>{stock.ticker}</TableCell>
                    <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                    <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSentimentBadgeVariant(stock.sentiment)}>
                        {stock.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFromPortfolio(stock.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                You haven't added any stocks to your portfolio yet.
              </p>
              <Button className="mt-4">Browse S&P 500</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
