
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Investor', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Investor', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Investor', status: 'Inactive' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Investor', status: 'Active' },
];

const deactivationRequests = [
  { id: 101, userId: 2, name: 'Jane Smith', email: 'jane@example.com', reason: 'No longer using the service', requestDate: '2025-05-10' },
  { id: 102, userId: 5, name: 'David Brown', email: 'david@example.com', reason: 'Taking a break', requestDate: '2025-05-14' },
];

const resetRequests = [
  { id: 201, userId: 3, name: 'Mike Johnson', email: 'mike@example.com', requestDate: '2025-05-13' },
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [deactivations, setDeactivations] = useState(deactivationRequests);
  const [resets, setResets] = useState(resetRequests);
  const { toast } = useToast();

  const handleApproveDeactivation = (requestId: number) => {
    // In a real app, you would call an API to deactivate the user
    setDeactivations(deactivations.filter(req => req.id !== requestId));
    setUsers(users.map(user => 
      deactivations.find(req => req.userId === user.id && req.id === requestId)
        ? { ...user, status: 'Inactive' }
        : user
    ));
    
    toast({
      title: "User deactivated",
      description: "The user account has been successfully deactivated.",
    });
  };

  const handleRejectDeactivation = (requestId: number) => {
    // In a real app, you would call an API to reject the deactivation request
    setDeactivations(deactivations.filter(req => req.id !== requestId));
    
    toast({
      title: "Request rejected",
      description: "The deactivation request has been rejected.",
    });
  };

  const handleSendResetEmail = (requestId: number) => {
    // In a real app, you would call an API to send a reset email
    setResets(resets.filter(req => req.id !== requestId));
    
    toast({
      title: "Reset email sent",
      description: "A password reset email has been sent to the user.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage user accounts, deactivation requests, and password resets
        </p>
      </div>
      
      <Tabs defaultValue="deactivation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deactivation">Deactivation Requests</TabsTrigger>
          <TabsTrigger value="reset">Password Reset Requests</TabsTrigger>
          <TabsTrigger value="all">All Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deactivation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deactivation Requests</CardTitle>
              <CardDescription>
                Review and process account deactivation requests from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {deactivations.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No pending deactivation requests</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deactivations.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApproveDeactivation(request.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectDeactivation(request.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reset" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password Reset Requests</CardTitle>
              <CardDescription>
                Send password reset emails to users who have requested them
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resets.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No pending reset requests</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resets.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleSendResetEmail(request.id)}
                          >
                            Send Reset Email
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Complete list of all registered users on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
