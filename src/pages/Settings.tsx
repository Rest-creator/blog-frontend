
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bell, Mail, Shield, User, Globe, Moon, Sun, EyeOff, Smartphone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";

// User profile form schema
const profileFormSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  name: z.string().min(2).max(50),
  urls: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal(''))
  })
});

// Notification settings schema
const notificationFormSchema = z.object({
  marketing_emails: z.boolean(),
  social_notifications: z.boolean(),
  security_emails: z.boolean(),
  article_notifications: z.boolean()
});

// Appearance settings schema
const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  compact_view: z.boolean()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const Settings = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "robert-johnson",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      bio: "Tech enthusiast and writer. I love sharing knowledge about the latest trends in technology.",
      urls: {
        twitter: "https://twitter.com/robertjohnson",
        github: "https://github.com/robertjohnson",
        website: "https://robertjohnson.com"
      }
    },
  });

  // Notification form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      marketing_emails: true,
      social_notifications: true,
      security_emails: true,
      article_notifications: true
    },
  });

  // Appearance form
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      compact_view: false
    },
  });

  // Form submission handlers
  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    console.log(data);
  }

  function onNotificationSubmit(data: NotificationFormValues) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
    console.log(data);
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    toast({
      title: "Appearance settings updated",
      description: "Your appearance preferences have been saved.",
    });
    console.log(data);
  }

  function handleAccountDeletion() {
    if (isDeleting) {
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive"
      });
      setIsDeleting(false);
      // In a real app, we would redirect to a landing page
    } else {
      setIsDeleting(true);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className={`flex ${isMobile ? 'flex-col' : ''} gap-2`}>
          <TabsList className={`${isMobile ? 'w-full' : 'flex-col h-auto p-0 bg-transparent space-y-1'}`}>
            <TabsTrigger value="profile" className={`${isMobile ? '' : 'justify-start w-full'}`}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className={`${isMobile ? '' : 'justify-start w-full'}`}>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className={`${isMobile ? '' : 'justify-start w-full'}`}>
              {appearanceForm.getValues("theme") === "dark" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              Appearance
            </TabsTrigger>
            <TabsTrigger value="account" className={`${isMobile ? '' : 'justify-start w-full'}`}>
              <Shield className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          <div className={`space-y-6 ${isMobile ? '' : 'flex-1'}`}>
            <TabsContent value="profile" className="space-y-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>
                        This information will be displayed publicly so be careful what you share.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Robert Johnson" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Profile picture</h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">Upload new image</Button>
                            <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. 2MB max.
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your unique username. It will be used in your profile URL.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your email address is used for notifications and login.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Write a short bio about yourself. Max 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <h3 className="text-sm font-medium mb-4">Social Links</h3>
                        <div className="space-y-4">
                          <FormField
                            control={profileForm.control}
                            name="urls.twitter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://twitter.com/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="urls.github"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GitHub</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://github.com/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="urls.website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save changes</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>
                        Configure how you receive notifications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={notificationForm.control}
                        name="social_notifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Social notifications
                              </FormLabel>
                              <FormDescription>
                                Receive notifications when someone follows you or mentions you.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="article_notifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Article notifications
                              </FormLabel>
                              <FormDescription>
                                Receive notifications when articles you follow are updated.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <h3 className="text-lg font-medium">Email Notifications</h3>

                      <FormField
                        control={notificationForm.control}
                        name="marketing_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Marketing emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about new features and products.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="security_emails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Security emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about your account security.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                              Required
                            </p>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save preferences</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>
                        Customize the appearance of the application.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={appearanceForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className={`flex flex-col items-center gap-2 cursor-pointer ${field.value === 'light' ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => appearanceForm.setValue("theme", "light")}>
                                <div className="w-16 h-16 bg-card border-2 flex items-center justify-center rounded-md 
                                              shadow-sm transition-all hover:scale-105 hover:shadow-md
                                              dark:bg-white dark:text-black
                                              ${field.value === 'light' ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}">
                                  <Sun className="h-8 w-8" />
                                </div>
                                <span className="text-sm font-medium">Light</span>
                              </div>

                              <div className={`flex flex-col items-center gap-2 cursor-pointer ${field.value === 'dark' ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => appearanceForm.setValue("theme", "dark")}>
                                <div className="w-16 h-16 bg-slate-900 border-2 flex items-center justify-center rounded-md 
                                              shadow-sm transition-all hover:scale-105 hover:shadow-md
                                              text-white
                                              ${field.value === 'dark' ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}">
                                  <Moon className="h-8 w-8" />
                                </div>
                                <span className="text-sm font-medium">Dark</span>
                              </div>

                              <div className={`flex flex-col items-center gap-2 cursor-pointer ${field.value === 'system' ? 'text-primary' : 'text-muted-foreground'}`}
                                onClick={() => appearanceForm.setValue("theme", "system")}>
                                <div className="w-16 h-16 bg-gradient-to-br from-card to-slate-900 border-2 flex items-center justify-center rounded-md 
                                              shadow-sm transition-all hover:scale-105 hover:shadow-md
                                              ${field.value === 'system' ? 'border-primary ring-2 ring-primary/20' : 'border-muted'}">
                                  <div className="flex gap-1">
                                    <Sun className="h-4 w-4 text-black" />
                                    <Moon className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                                <span className="text-sm font-medium">System</span>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={appearanceForm.control}
                        name="compact_view"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Compact view
                              </FormLabel>
                              <FormDescription>
                                Use a more compact layout for the application.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save preferences</Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language</h3>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <p className="text-base">
                          Display language
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Set the language used throughout the application.
                        </p>
                      </div>
                      <Button variant="outline">
                        <Globe className="mr-2 h-4 w-4" />
                        English (US)
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <p className="text-base">
                            Profile visibility
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other users.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <p className="text-base">
                            Reading history
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Track articles you've read for personalized recommendations.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                    <div className="flex flex-row items-center justify-between rounded-lg border border-destructive p-4">
                      <div className="space-y-0.5">
                        <p className="text-base">
                          Delete account
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all of your content.
                        </p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={handleAccountDeletion}
                      >
                        {isDeleting ? "Confirm Delete" : "Delete Account"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
