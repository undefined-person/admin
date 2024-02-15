import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useAddUserForm } from '../model/use-add-user-form'

export function AddUser() {
  const { form, isLoading, onSubmit } = useAddUserForm()

  return (
    <section className="flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full max-w-lg space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Add user
          </Button>
        </form>
      </Form>
    </section>
  )
}
