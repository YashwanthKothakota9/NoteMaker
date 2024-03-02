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
import { Textarea } from '@/components/ui/textarea';

import * as NotesApi from '@/network/notes_api';
import { useToast } from './ui/use-toast';
import { formatDate } from '@/lib/utils';

const formSchema = z.object({
  title: z
    .string({ invalid_type_error: 'Title must be a string' })
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(12, { message: 'Title must be at most 12 characters long' }),

  text: z
    .string({ invalid_type_error: 'Text must be a string' })
    .min(10, { message: 'Text must be at least 10 characters long' })
    .max(200, { message: 'Text must be at most 200 characters long' }),
});

export function NoteForm({
  closeForm,
  onFormSubmit,
}: {
  closeForm: (open: boolean) => void;
  onFormSubmit: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      text: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newNote = await NotesApi.createNote(values);
    if (newNote) {
      toast({
        title: 'Your note created successfully!!',
        description: 'Created At: ' + formatDate(newNote.createdAt),
      });
      onFormSubmit();
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Please try again later.',
      });
    }
    closeForm(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                  placeholder="Ex: My Note title"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[#a9690f]">
                This is your new note title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-[#f9eb8f] text-[#3f2009] border-[#804c13] ring-offset-[#3f2009] ring-1"
                  placeholder="Ex: This is my personal note and I can write anything here."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[#a9690f]">
                This is your new note content and you can add upto 200
                characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
        >
          {/* Save Note */}
          {form.formState.isSubmitting ? 'Saving...' : 'Save Note'}
        </Button>
      </form>
    </Form>
  );
}
