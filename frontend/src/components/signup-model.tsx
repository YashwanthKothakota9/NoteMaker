import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as NotesApi from '@/network/notes_api';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useToast } from './ui/use-toast';
import { User } from '@/models/user';

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: 'Username must be a string' })
      .min(3, { message: 'Username must be at least 3 characters long' })
      .max(12, { message: 'Username must be at most 12 characters long' }),

    email: z
      .string({ invalid_type_error: 'Email must be a string' })
      .min(1, { message: 'This field has to be filled' })
      .email('This is not a valid email'),

    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),

    confirmPassword: z
      .string({ invalid_type_error: 'Confirm Password must be a string' })
      .min(8, {
        message: 'Confirm Password must be at least 8 characters long',
      })
      .max(20, {
        message: 'Confirm Password must be at most 20 characters long',
      }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Password and Confirm Password must match',
      path: ['confirmPassword'],
    }
  );

interface SignUpModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpSuccess: (user: User) => void;
}

const SignUpModel = ({
  open,
  onOpenChange,
  onSignUpSuccess,
}: SignUpModelProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newUser = await NotesApi.signUp(values);
      onSignUpSuccess(newUser);
      toast({
        description: 'Signed up successfully!!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to sign up, Please try again later',
      });
      console.error(error);
    } finally {
      form.reset();
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#fbf7c6] text-[#3f2009]">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription className="text-[#804c13">
            Sign up for amazing note taking experience
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                        placeholder="Ex: Batman"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[#a9690f]">
                      This is your username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                        placeholder="Ex: batmanknight@gotham.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[#a9690f]">
                      This is your email address
                    </FormDescription>
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
                      <Input
                        className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[#a9690f]">
                      This is your password
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
                      <Input
                        className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[#a9690f]">
                      This is your confirm password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModel;
