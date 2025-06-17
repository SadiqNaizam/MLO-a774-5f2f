import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header'; // From custom_component_code
import Footer from '@/components/layout/Footer'; // From custom_component_code
import AuthCard from '@/components/AuthCard';   // From custom_component_code

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // As per layout_info

// Icons
import { Mail, AlertTriangle } from 'lucide-react'; // Mail for AuthCard icon, AlertTriangle for Alert

// Zod schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null); // For displaying general errors in Alert

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setServerError(null); // Clear previous errors
    console.log('Forgot password form submitted:', data);

    // Simulate API call to request password reset
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example of error handling - uncomment to test
    // if (data.email === "error@example.com") {
    //   setServerError("This email address is not registered or an error occurred.");
    //   setIsLoading(false);
    //   return;
    // }

    // Show success toast as per user journey
    toast.success("If an account exists for this email, a password reset link has been sent.");
    
    form.reset(); // Reset form fields
    setIsLoading(false);
    // The user journey states: "The user remains on the ForgotPasswordPage or is redirected to LoginPage."
    // Staying on the page with a toast confirmation is implemented.
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthCard
          title="Forgot Your Password?"
          description="No problem. Enter your email address below and we'll send you instructions to reset your password."
          icon={<Mail className="h-10 w-10 text-primary" />}
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                        disabled={isLoading}
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {serverError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Request Failed</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link 
              to="/" /* Path from App.tsx */
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/registration" /* Path from App.tsx */
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;