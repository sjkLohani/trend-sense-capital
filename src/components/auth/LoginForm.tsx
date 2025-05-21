
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState<'investor' | 'admin'>('investor');
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // No need to navigate here, it's handled in the AuthContext
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to fill demo credentials
  const fillDemoCredentials = (role: 'investor' | 'admin') => {
    if (role === 'investor') {
      setEmail('investor@example.com');
      setPassword('password123');
    } else {
      setEmail('admin@example.com');
      setPassword('admin123');
    }
    setUserRole(role);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
        
        <Tabs 
          defaultValue="investor" 
          className="w-full mt-2"
          value={userRole}
          onValueChange={(value) => setUserRole(value as 'investor' | 'admin')}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="investor" onClick={() => fillDemoCredentials('investor')}>Investor</TabsTrigger>
            <TabsTrigger value="admin" onClick={() => fillDemoCredentials('admin')}>Administrator</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={userRole === 'investor' ? 'investor@example.com' : 'admin@example.com'} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password"
              placeholder={userRole === 'investor' ? 'password123' : 'admin123'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label 
              htmlFor="remember" 
              className="text-sm font-normal"
            >
              Remember me
            </Label>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              LinkedIn
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
      
      {/* Demo credentials */}
      <div className="px-6 pb-4 pt-0">
        <div className="bg-muted/50 rounded-md p-3">
          <p className="text-xs font-medium mb-1">Demo Credentials</p>
          {userRole === 'investor' ? (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Email: investor@example.com</p>
              <p>Password: password123</p>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;
