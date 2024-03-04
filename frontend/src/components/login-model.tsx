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
import { UnauthorizedError } from '@/errors/http-errors';

const formSchema = z.object({
  username: z
    .string({ invalid_type_error: 'Username must be a string' })
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(12, { message: 'Username must be at most 12 characters long' }),

  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' }),
});

interface LoginModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModel = ({
  open,
  onOpenChange,
  onLoginSuccess,
}: LoginModelProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await NotesApi.logIn(values);
      onLoginSuccess(user);
      toast({
        description: 'Logged in successfully!!',
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        toast({
          variant: 'destructive',
          title: 'Failed to log in, Please try again later',
          description: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to log in, Please try again later',
          description: 'Something went wrong',
        });
      }

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
          <DialogTitle>Log In</DialogTitle>
          <DialogDescription className="text-[#804c13">
            Log In for amazing note taking experience
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                        placeholder="Ex: ********"
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

              <Button
                type="submit"
                className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
              >
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModel;
