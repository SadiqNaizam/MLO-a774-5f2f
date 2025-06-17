import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AuthCard from '../../components/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Using shadcn's Form components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    console.log('Registration form submitted:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example success/error handling
    if (data.email === "test@example.com") { // Simulate a known email causing an error
      setError("This email is already registered. Please try logging in.");
      setIsLoading(false);
    } else {
      setSuccessMessage("Registration successful! You can now log in.");
      setIsLoading(false);
      // Clear form or redirect
      form.reset();
      // setTimeout(() => navigate('/'), 2000); // Optional: redirect to login page after a delay
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <AuthCard
          title="Create your Account"
          description="Enter your details below to get started."
          icon={<UserPlus className="h-10 w-10 text-primary" />}
          className="w-full max-w-lg"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {successMessage && (
                <Alert variant="default" className="border-green-500 text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 dark:border-green-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;