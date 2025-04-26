import { useState } from "react";
import { Redirect } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
        });
      },
    });
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully",
        });
      },
    });
  };

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="grid w-full gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Sign in to access your admin dashboard.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        {...loginForm.register("username")}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...loginForm.register("password")}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    Create a new account to access admin features.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Username"
                        {...registerForm.register("username")}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Email"
                        {...registerForm.register("email")}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Password"
                        {...registerForm.register("password")}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        {...registerForm.register("confirmPassword")}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Registering..." : "Register"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex flex-col justify-center space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Portfolio Admin</h1>
            <p className="text-muted-foreground">
              Manage your portfolio content, case studies, and messages from visitors.
            </p>
          </div>
          
          <div className="space-y-2 p-6 bg-card rounded-lg border">
            <h3 className="text-xl font-semibold">Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Manage case studies and projects</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>View and respond to contact messages</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Customize website settings</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}