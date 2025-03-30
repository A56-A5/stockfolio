import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/navbar";

// Extended schema for client-side validation
const loginClientSchema = loginSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerClientSchema = insertUserSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  // If user is already logged in, redirect to dashboard or onboarding
  useEffect(() => {
    if (user) {
      navigate(user.onboardingCompleted ? "/dashboard" : "/onboarding");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginClientSchema>>({
    resolver: zodResolver(loginClientSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerClientSchema>>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginClientSchema>) {
    loginMutation.mutate(values);
  }

  function onRegisterSubmit(values: z.infer<typeof registerClientSchema>) {
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Welcome to Stockfolio</h1>
            <p className="text-muted-foreground mb-6">Your journey to smarter investing starts here. Access powerful stock prediction tools and educational resources designed to help you make informed investment decisions.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Advanced Analytics</h3>
                  <p className="text-muted-foreground text-sm">Get AI-powered predictions backed by robust algorithms</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Educational Resources</h3>
                  <p className="text-muted-foreground text-sm">Learn at your own pace with our comprehensive tutorials</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Risk Management</h3>
                  <p className="text-muted-foreground text-sm">Understand and mitigate investment risks effectively</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Auth Forms */}
          <div>
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <CardHeader className="px-6 pt-6 pb-0">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="p-6">
                  <TabsContent value="login" className="mt-0">
                    <div className="mb-4">
                      <CardTitle className="text-2xl mb-2">Welcome Back</CardTitle>
                      <p className="text-muted-foreground text-sm">Sign in to your Stockfolio account</p>
                    </div>
                    
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <a href="#" className="text-sm text-primary hover:text-primary/80">
                            Forgot password?
                          </a>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging in...
                            </>
                          ) : (
                            "Log In"
                          )}
                        </Button>
                        
                        <div className="text-center text-sm text-muted-foreground">
                          Don't have an account?{" "}
                          <button 
                            type="button"
                            onClick={() => setActiveTab("register")} 
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="mt-0">
                    <div className="mb-4">
                      <CardTitle className="text-2xl mb-2">Create Your Account</CardTitle>
                      <p className="text-muted-foreground text-sm">Join Stockfolio today and start investing smarter</p>
                    </div>
                    
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Choose a username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <div className="text-xs text-muted-foreground mt-1">
                                Password must be at least 8 characters long with a number and special character.
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                        
                        <div className="text-center text-sm text-muted-foreground">
                          Already have an account?{" "}
                          <button 
                            type="button"
                            onClick={() => setActiveTab("login")} 
                            className="text-primary hover:text-primary/80 font-medium"
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
