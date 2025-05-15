
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for demonstration
const initialModelVersions = [
  { 
    id: 1, 
    name: 'Sentiment Analysis Model', 
    version: '3.2.1', 
    accuracy: 0.86, 
    trainedDate: '2025-04-15', 
    status: 'active',
    dataPoints: 285000 
  },
  { 
    id: 2, 
    name: 'Stock Prediction Model', 
    version: '2.1.5', 
    accuracy: 0.78, 
    trainedDate: '2025-04-22', 
    status: 'active',
    dataPoints: 195000 
  },
  { 
    id: 3, 
    name: 'Market Trend Analyzer', 
    version: '1.3.7', 
    accuracy: 0.72, 
    trainedDate: '2025-05-01', 
    status: 'active',
    dataPoints: 150000 
  },
  { 
    id: 4, 
    name: 'Beta Sentiment Model', 
    version: '0.8.3', 
    accuracy: 0.68, 
    trainedDate: '2025-05-10', 
    status: 'testing',
    dataPoints: 95000 
  }
];

const MLModels = () => {
  const [modelVersions, setModelVersions] = useState(initialModelVersions);
  const [isTrainingInProgress, setIsTrainingInProgress] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingModel, setTrainingModel] = useState<number | null>(null);
  const { toast } = useToast();

  const handleRetrainModel = (modelId: number) => {
    const model = modelVersions.find(m => m.id === modelId);
    if (!model || isTrainingInProgress) return;
    
    setTrainingModel(modelId);
    setIsTrainingInProgress(true);
    setTrainingProgress(0);
    
    toast({
      title: "Training Started",
      description: `Training of ${model.name} has been initiated.`,
    });
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const next = prev + Math.random() * 10;
        if (next >= 100) {
          clearInterval(interval);
          
          // Update model version and stats after training completes
          setTimeout(() => {
            const updatedVersions = modelVersions.map(m => {
              if (m.id === modelId) {
                // Increment version and improve accuracy slightly
                const versionParts = m.version.split('.');
                const lastPart = parseInt(versionParts[2]) + 1;
                const newVersion = `${versionParts[0]}.${versionParts[1]}.${lastPart}`;
                
                return {
                  ...m,
                  version: newVersion,
                  accuracy: Math.min(0.99, m.accuracy + Math.random() * 0.05),
                  trainedDate: new Date().toISOString().split('T')[0],
                  dataPoints: m.dataPoints + Math.floor(Math.random() * 25000)
                };
              }
              return m;
            });
            
            setModelVersions(updatedVersions);
            setIsTrainingInProgress(false);
            setTrainingModel(null);
            
            toast({
              title: "Training Complete",
              description: `${model.name} has been successfully retrained with improved accuracy.`,
            });
          }, 1000);
          
          return 100;
        }
        return next;
      });
    }, 500);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ML Models</h1>
        <p className="text-muted-foreground mt-1">
          Manage and retrain machine learning models for sentiment analysis and predictions
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Models</CardTitle>
          <CardDescription>
            Review and manage ML models currently in production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Last Trained</TableHead>
                <TableHead>Data Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelVersions.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>v{model.version}</TableCell>
                  <TableCell>{(model.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell>{model.trainedDate}</TableCell>
                  <TableCell>{formatNumber(model.dataPoints)}</TableCell>
                  <TableCell>
                    <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                      {model.status === 'active' ? 'Production' : 'Testing'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trainingModel === model.id ? (
                      <div className="w-[180px]">
                        <Progress value={trainingProgress} className="h-2 mb-1" />
                        <p className="text-xs text-muted-foreground">
                          Training... {Math.round(trainingProgress)}%
                        </p>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleRetrainModel(model.id)}
                        disabled={isTrainingInProgress}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Retrain Model
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Training History</CardTitle>
          <CardDescription>
            Review past training sessions and their performance improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Training Date</TableHead>
                <TableHead>Accuracy Gain</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sentiment Analysis Model</TableCell>
                <TableCell>v3.2.0 → v3.2.1</TableCell>
                <TableCell>2025-04-15</TableCell>
                <TableCell className="text-green-600">+2.1%</TableCell>
                <TableCell>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Successful</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stock Prediction Model</TableCell>
                <TableCell>v2.1.4 → v2.1.5</TableCell>
                <TableCell>2025-04-22</TableCell>
                <TableCell className="text-green-600">+1.8%</TableCell>
                <TableCell>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Successful</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Market Trend Analyzer</TableCell>
                <TableCell>v1.3.6 → v1.3.7</TableCell>
                <TableCell>2025-05-01</TableCell>
                <TableCell className="text-green-600">+1.5%</TableCell>
                <TableCell>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Successful</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Beta Sentiment Model</TableCell>
                <TableCell>v0.8.2 → v0.8.3</TableCell>
                <TableCell>2025-05-10</TableCell>
                <TableCell className="text-amber-600">+0.8%</TableCell>
                <TableCell>
                  <div className="flex items-center text-amber-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Partial Success</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLModels;
