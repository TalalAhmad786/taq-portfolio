import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LogOut, Settings, MessageSquare, FileEdit, User } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define types based on schema
interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  coverImage: string;
  clientName: string;
  clientIndustry: string;
  duration?: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  images?: string[];
  technologies: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  featured: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface SiteSetting {
  key: string;
  value: string;
  category: string;
  type: string;
  description: string;
}

// Form schemas
const caseStudySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().min(5, "Cover image URL must be at least 5 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientIndustry: z.string().min(2, "Client industry must be at least 2 characters"),
  duration: z.string().optional(),
  services: z.string().array().min(1, "At least one service is required"),
  challenge: z.string().min(10, "Challenge must be at least 10 characters"),
  solution: z.string().min(10, "Solution must be at least 10 characters"),
  result: z.string().min(10, "Result must be at least 10 characters"),
  images: z.string().array().optional(),
  technologies: z.string().array().min(1, "At least one technology is required"),
  testimonial: z.string().optional(),
  testimonialAuthor: z.string().optional(),
  testimonialRole: z.string().optional(),
  featured: z.boolean().default(false)
});

type CaseStudyFormValues = z.infer<typeof caseStudySchema>;

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("case-studies");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  // Case studies query
  const {
    data: caseStudies,
    isLoading: loadingCaseStudies,
    error: caseStudiesError,
  } = useQuery<CaseStudy[]>({
    queryKey: ["/api/admin/case-studies"],
  });

  // Messages query
  const {
    data: messages,
    isLoading: loadingMessages,
    error: messagesError,
  } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/messages"],
  });

  // Settings query
  const {
    data: settings,
    isLoading: loadingSettings,
    error: settingsError,
  } = useQuery<SiteSetting[]>({
    queryKey: ["/api/admin/settings"],
  });

  // Case study form
  const caseStudyForm = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      description: "",
      coverImage: "",
      clientName: "",
      clientIndustry: "",
      duration: "",
      services: [],
      challenge: "",
      solution: "",
      result: "",
      images: [],
      technologies: [],
      testimonial: "",
      testimonialAuthor: "",
      testimonialRole: "",
      featured: false
    },
  });

  // Reset form when editing case study changes
  useEffect(() => {
    if (editingCaseStudy) {
      caseStudyForm.reset({
        title: editingCaseStudy.title,
        slug: editingCaseStudy.slug,
        excerpt: editingCaseStudy.excerpt || "",
        description: editingCaseStudy.description,
        coverImage: editingCaseStudy.coverImage || "",
        clientName: editingCaseStudy.clientName,
        clientIndustry: editingCaseStudy.clientIndustry || "",
        duration: editingCaseStudy.duration || "",
        services: editingCaseStudy.services || [],
        challenge: editingCaseStudy.challenge || "",
        solution: editingCaseStudy.solution || "",
        result: editingCaseStudy.result || "",
        images: editingCaseStudy.images || [],
        technologies: editingCaseStudy.technologies || [],
        testimonial: editingCaseStudy.testimonial || "",
        testimonialAuthor: editingCaseStudy.testimonialAuthor || "",
        testimonialRole: editingCaseStudy.testimonialRole || "",
        featured: editingCaseStudy.featured || false
      });
    } else {
      caseStudyForm.reset({
        title: "",
        slug: "",
        excerpt: "",
        description: "",
        coverImage: "",
        clientName: "",
        clientIndustry: "",
        duration: "",
        services: [],
        challenge: "",
        solution: "",
        result: "",
        images: [],
        technologies: [],
        testimonial: "",
        testimonialAuthor: "",
        testimonialRole: "",
        featured: false
      });
    }
  }, [editingCaseStudy, caseStudyForm]);

  // Create case study mutation
  const createCaseStudyMutation = useMutation({
    mutationFn: async (data: CaseStudyFormValues) => {
      const res = await apiRequest("POST", "/api/admin/case-studies", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Case study created successfully",
      });
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/case-studies"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update case study mutation
  const updateCaseStudyMutation = useMutation({
    mutationFn: async (data: { id: number; caseStudy: CaseStudyFormValues }) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/case-studies/${data.id}`,
        data.caseStudy
      );
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Case study updated successfully",
      });
      setModalOpen(false);
      setEditingCaseStudy(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/case-studies"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete case study mutation
  const deleteCaseStudyMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/case-studies/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/case-studies"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mark message as read mutation
  const markMessageAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("PUT", `/api/admin/messages/${id}/read`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/messages/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
      setViewingMessage(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; category: string; type: string; description: string }) => {
      const res = await apiRequest("PUT", `/api/admin/settings/${data.key}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmitCaseStudy = (data: CaseStudyFormValues) => {
    if (editingCaseStudy) {
      updateCaseStudyMutation.mutate({ id: editingCaseStudy.id, caseStudy: data });
    } else {
      createCaseStudyMutation.mutate(data);
    }
  };

  const handleOpenMessage = (message: ContactMessage) => {
    setViewingMessage(message);
    if (!message.read) {
      markMessageAsReadMutation.mutate(message.id);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (!user) {
    return <div></div>; // Return empty div instead of null
  }

  return (
    <div className="container py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.username}!
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            Case Studies
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
            {messages && messages.filter(msg => !msg.read).length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {messages.filter(msg => !msg.read).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Case Studies Tab */}
        <TabsContent value="case-studies">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Case Studies</h2>
            <Button onClick={() => {
              setEditingCaseStudy(null);
              setModalOpen(true);
            }}>
              Add New Case Study
            </Button>
          </div>

          {loadingCaseStudies ? (
            <div className="text-center py-8">Loading case studies...</div>
          ) : caseStudiesError ? (
            <div className="text-center py-8 text-destructive">
              Error loading case studies
            </div>
          ) : (
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {caseStudies && caseStudies.length > 0 ? (
                        caseStudies.map((study) => (
                          <TableRow key={study.id}>
                            <TableCell className="font-medium">
                              {study.title}
                            </TableCell>
                            <TableCell>{study.clientName}</TableCell>
                            <TableCell>{study.clientIndustry}</TableCell>
                            <TableCell>
                              {study.featured ? (
                                <Badge variant="default">Featured</Badge>
                              ) : (
                                <Badge variant="outline">No</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingCaseStudy(study);
                                    setModalOpen(true);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive"
                                  onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this case study?")) {
                                      deleteCaseStudyMutation.mutate(study.id);
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No case studies found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
          </div>

          {loadingMessages ? (
            <div className="text-center py-8">Loading messages...</div>
          ) : messagesError ? (
            <div className="text-center py-8 text-destructive">
              Error loading messages
            </div>
          ) : (
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages && messages.length > 0 ? (
                        messages.map((message) => (
                          <TableRow 
                            key={message.id} 
                            className={!message.read ? "font-medium bg-muted/30" : ""}
                            onClick={() => handleOpenMessage(message)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>{message.name}</TableCell>
                            <TableCell>{message.email}</TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell>
                              {new Date(message.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {message.read ? (
                                <Badge variant="outline">Read</Badge>
                              ) : (
                                <Badge>New</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No messages found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Site Settings</h2>
            <p className="text-muted-foreground">
              Configure your portfolio settings
            </p>
          </div>

          {loadingSettings ? (
            <div className="text-center py-8">Loading settings...</div>
          ) : settingsError ? (
            <div className="text-center py-8 text-destructive">
              Error loading settings
            </div>
          ) : (
            <div className="grid gap-6">
              {settings && settings.length > 0 ? (
                // Group settings by category
                Object.entries(
                  settings.reduce((acc, setting) => {
                    if (!acc[setting.category]) {
                      acc[setting.category] = [];
                    }
                    acc[setting.category].push(setting);
                    return acc;
                  }, {} as Record<string, SiteSetting[]>)
                ).map(([category, categorySettings]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="capitalize">
                        {category} Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {categorySettings.map((setting) => (
                          <div
                            key={setting.key}
                            className="grid gap-2"
                          >
                            <Label htmlFor={setting.key}>{setting.description || setting.key}</Label>
                            {setting.type === 'boolean' ? (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={setting.key}
                                  checked={setting.value === 'true'}
                                  onCheckedChange={(checked) => {
                                    updateSettingMutation.mutate({
                                      ...setting,
                                      value: checked ? 'true' : 'false',
                                    });
                                  }}
                                />
                                <Label htmlFor={setting.key}>Enabled</Label>
                              </div>
                            ) : setting.type === 'textarea' ? (
                              <Textarea
                                id={setting.key}
                                defaultValue={setting.value}
                                onBlur={(e) => {
                                  if (e.target.value !== setting.value) {
                                    updateSettingMutation.mutate({
                                      ...setting,
                                      value: e.target.value,
                                    });
                                  }
                                }}
                              />
                            ) : (
                              <Input
                                id={setting.key}
                                defaultValue={setting.value}
                                onBlur={(e) => {
                                  if (e.target.value !== setting.value) {
                                    updateSettingMutation.mutate({
                                      ...setting,
                                      value: e.target.value,
                                    });
                                  }
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No settings found. Add some in the database.</p>
              )}
            </div>
          )}
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Account</h2>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={user.username} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={user.isAdmin ? "Administrator" : "User"} readOnly />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Change Password</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Case Study Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCaseStudy ? "Edit Case Study" : "Add New Case Study"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the case study
            </DialogDescription>
          </DialogHeader>

          <Form {...caseStudyForm}>
            <form 
              onSubmit={caseStudyForm.handleSubmit(onSubmitCaseStudy)} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={caseStudyForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="project-title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used for the URL, lowercase with hyphens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, PostgreSQL"
                          value={field.value.join(", ")}
                          onChange={(e) => field.onChange(e.target.value.split(',').map(t => t.trim()))}
                        />
                      </FormControl>
                      <FormDescription>Comma separated list</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          Display this case study prominently
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={caseStudyForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A brief excerpt for previews"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A detailed description of the project"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="clientIndustry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Technology, Healthcare, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="3 months, 1 year, etc." {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services Provided</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Web Development, UI/UX Design"
                          value={field.value.join(", ")}
                          onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                        />
                      </FormControl>
                      <FormDescription>Comma separated list</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What challenges did the client face?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="solution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solution</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How did you solve the challenges?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={caseStudyForm.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Results</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What were the outcomes of the project?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={caseStudyForm.control}
                    name="testimonial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonial</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What did the client say about the project?"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-6">
                    <FormField
                      control={caseStudyForm.control}
                      name="testimonialAuthor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Testimonial Author</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={caseStudyForm.control}
                      name="testimonialRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Testimonial Author Role</FormLabel>
                          <FormControl>
                            <Input placeholder="CEO, Project Manager" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createCaseStudyMutation.isPending || updateCaseStudyMutation.isPending}
                >
                  {createCaseStudyMutation.isPending || updateCaseStudyMutation.isPending
                    ? "Saving..."
                    : editingCaseStudy
                      ? "Update Case Study"
                      : "Create Case Study"
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Message Viewing Modal */}
      {viewingMessage && (
        <Dialog open={!!viewingMessage} onOpenChange={(open) => !open && setViewingMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewingMessage.subject}</DialogTitle>
              <DialogDescription>
                From: {viewingMessage.name} ({viewingMessage.email})
                <br />
                Date: {new Date(viewingMessage.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 p-4 bg-muted rounded-md whitespace-pre-wrap">
              {viewingMessage.message}
            </div>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this message?")) {
                    deleteMessageMutation.mutate(viewingMessage.id);
                  }
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Send a reply email
                  window.location.href = `mailto:${viewingMessage.email}?subject=RE: ${viewingMessage.subject}`;
                }}
              >
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}