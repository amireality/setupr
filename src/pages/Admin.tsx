import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import {
  useDbServices,
  useDbCategories,
  useDbBundles,
  useUpdateService,
  useDeleteService,
  useCreateService,
  useUpdateBundle,
  useDeleteBundle,
  useCreateBundle,
  formatPrice,
  type DbService,
  type DbBundle,
} from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Package,
  Settings,
  ArrowLeft,
  FileText,
  Users,
  MessageSquare,
  Inbox,
  Settings2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BlogManagement } from "@/components/admin/BlogManagement";
import { TeamManagement } from "@/components/admin/TeamManagement";
import { TestimonialManagement } from "@/components/admin/TestimonialManagement";
import { IntakeManagement } from "@/components/admin/IntakeManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import { ServiceFaqManagement } from "@/components/admin/ServiceFaqManagement";
import { ServiceDeliverableManagement } from "@/components/admin/ServiceDeliverableManagement";

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin(user?.id);
  const { data: services, isLoading: loadingServices } = useDbServices();
  const { data: categories } = useDbCategories();
  const { data: bundles, isLoading: loadingBundles } = useDbBundles();
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const createService = useCreateService();
  const updateBundle = useUpdateBundle();
  const deleteBundle = useDeleteBundle();
  const createBundle = useCreateBundle();

  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [editingBundle, setEditingBundle] = useState<DbBundle | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isBundleDialogOpen, setIsBundleDialogOpen] = useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!checkingAdmin && user && isAdmin === false) {
      navigate("/admin/login");
    }
  }, [authLoading, user, checkingAdmin, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const handleSaveService = async (formData: FormData) => {
    const serviceData = {
      service_id: formData.get("service_id") as string,
      category: formData.get("category") as string,
      sub_category: formData.get("sub_category") as string,
      service_name: formData.get("service_name") as string,
      description_short: formData.get("description_short") as string,
      who_its_for: formData.get("who_its_for") as string,
      setupr_fee_inr: parseInt(formData.get("setupr_fee_inr") as string),
      govt_or_third_party_fee: formData.get("govt_or_third_party_fee") as string,
      delivery_type: formData.get("delivery_type") as "coordination" | "done-for-you",
      visibility: formData.get("visibility") as "public" | "add-on" | "bundle-only",
      default_selected: formData.get("default_selected") === "true",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    };

    try {
      if (editingService?.id) {
        await updateService.mutateAsync({ id: editingService.id, ...serviceData });
        toast({ title: "Service updated" });
      } else {
        await createService.mutateAsync(serviceData);
        toast({ title: "Service created" });
      }
      setIsServiceDialogOpen(false);
      setEditingService(null);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteService = async (service: DbService) => {
    if (!confirm(`Delete "${service.service_name}"?`)) return;
    try {
      await deleteService.mutateAsync(service.id);
      toast({ title: "Service deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSaveBundle = async (formData: FormData) => {
    const includedServices = formData.get("included_service_ids") as string;
    const bundleData = {
      bundle_id: formData.get("bundle_id") as string,
      bundle_name: formData.get("bundle_name") as string,
      who_its_for: formData.get("who_its_for") as string,
      included_service_ids: includedServices ? includedServices.split(",").map(s => s.trim()) : [],
      bundle_setupr_fee: parseInt(formData.get("bundle_setupr_fee") as string),
      govt_fee_note: formData.get("govt_fee_note") as string,
      icon: formData.get("icon") as string || "Package",
      gradient: formData.get("gradient") as string || "from-primary/20 via-primary/10 to-transparent",
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    };

    try {
      if (editingBundle?.id) {
        await updateBundle.mutateAsync({ id: editingBundle.id, ...bundleData });
        toast({ title: "Bundle updated" });
      } else {
        await createBundle.mutateAsync(bundleData);
        toast({ title: "Bundle created" });
      }
      setIsBundleDialogOpen(false);
      setEditingBundle(null);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteBundle = async (bundle: DbBundle) => {
    if (!confirm(`Delete "${bundle.bundle_name}"?`)) return;
    try {
      await deleteBundle.mutateAsync(bundle.id);
      toast({ title: "Bundle deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (authLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground truncate max-w-[150px] sm:max-w-none">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 md:px-6 py-8">
        <Tabs defaultValue="services">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="mb-6 w-max">
              <TabsTrigger value="services" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="bundles" className="gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Bundles</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Testimonials</span>
              </TabsTrigger>
              <TabsTrigger value="intake" className="gap-2">
                <Inbox className="w-4 h-4" />
                <span className="hidden sm:inline">Intake</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings2 className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">
                Manage Services ({services?.length || 0})
              </h2>
              <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() => setEditingService(null)}
                    className="gradient-accent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? "Edit Service" : "Add New Service"}
                    </DialogTitle>
                  </DialogHeader>
                  <ServiceForm
                    service={editingService}
                    categories={categories || []}
                    onSubmit={handleSaveService}
                    onCancel={() => setIsServiceDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {loadingServices ? (
              <div className="text-muted-foreground">Loading services...</div>
            ) : (
              <div className="grid gap-3">
                {services?.map((service) => (
                  <div
                    key={service.id}
                    className="glass-card rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{service.service_name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {service.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ₹{formatPrice(service.setupr_fee_inr)} • {service.delivery_type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingService(service);
                          setIsServiceDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Service FAQs & Deliverables CRUD */}
            <div className="mt-10 space-y-10">
              <ServiceFaqManagement />
              <ServiceDeliverableManagement />
            </div>
          </TabsContent>

          {/* Bundles Tab */}
          <TabsContent value="bundles">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">
                Manage Bundles ({bundles?.length || 0})
              </h2>
              <Dialog open={isBundleDialogOpen} onOpenChange={setIsBundleDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() => setEditingBundle(null)}
                    className="gradient-accent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bundle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBundle ? "Edit Bundle" : "Add New Bundle"}
                    </DialogTitle>
                  </DialogHeader>
                  <BundleForm
                    bundle={editingBundle}
                    services={services || []}
                    onSubmit={handleSaveBundle}
                    onCancel={() => setIsBundleDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {loadingBundles ? (
              <div className="text-muted-foreground">Loading bundles...</div>
            ) : (
              <div className="grid gap-3">
                {bundles?.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="glass-card rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{bundle.bundle_name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        ₹{formatPrice(bundle.bundle_setupr_fee)} •{" "}
                        {bundle.included_service_ids.length} services
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingBundle(bundle);
                          setIsBundleDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBundle(bundle)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <div className="mb-6">
              <h2 className="font-display text-lg font-semibold">Blog Management</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage blog posts
              </p>
            </div>
            <BlogManagement />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <TeamManagement />
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <TestimonialManagement />
          </TabsContent>

          {/* Intake Submissions Tab */}
          <TabsContent value="intake">
            <IntakeManagement />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="mb-6">
              <h2 className="font-display text-lg font-semibold">Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage legal documents, page content, and account settings
              </p>
            </div>
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Service Form Component
interface ServiceFormProps {
  service: DbService | null;
  categories: { category_id: string; title: string }[];
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

const ServiceForm = ({ service, categories, onSubmit, onCancel }: ServiceFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="service_id">Service ID</Label>
          <Input
            id="service_id"
            name="service_id"
            defaultValue={service?.service_id}
            required
            placeholder="e.g., trademark"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={service?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.category_id} value={cat.category_id}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service_name">Service Name</Label>
        <Input
          id="service_name"
          name="service_name"
          defaultValue={service?.service_name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sub_category">Sub-category</Label>
        <Input
          id="sub_category"
          name="sub_category"
          defaultValue={service?.sub_category}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_short">Short Description</Label>
        <Textarea
          id="description_short"
          name="description_short"
          defaultValue={service?.description_short}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="who_its_for">Who it's for</Label>
        <Input
          id="who_its_for"
          name="who_its_for"
          defaultValue={service?.who_its_for}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="setupr_fee_inr">Setupr Fee (₹)</Label>
          <Input
            id="setupr_fee_inr"
            name="setupr_fee_inr"
            type="number"
            defaultValue={service?.setupr_fee_inr}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="govt_or_third_party_fee">Govt/Other Fees</Label>
          <Input
            id="govt_or_third_party_fee"
            name="govt_or_third_party_fee"
            defaultValue={service?.govt_or_third_party_fee}
            placeholder="0 or description"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="delivery_type">Delivery Type</Label>
          <Select name="delivery_type" defaultValue={service?.delivery_type || "done-for-you"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="done-for-you">Done for you</SelectItem>
              <SelectItem value="coordination">Coordination</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="visibility">Visibility</Label>
          <Select name="visibility" defaultValue={service?.visibility || "public"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="add-on">Add-on</SelectItem>
              <SelectItem value="bundle-only">Bundle only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={service?.sort_order || 0}
        />
      </div>

      <input type="hidden" name="default_selected" value="false" />

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="gradient-accent">
          Save Service
        </Button>
      </div>
    </form>
  );
};

// Bundle Form Component
interface BundleFormProps {
  bundle: DbBundle | null;
  services: DbService[];
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

const BundleForm = ({ bundle, services, onSubmit, onCancel }: BundleFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bundle_id">Bundle ID</Label>
          <Input
            id="bundle_id"
            name="bundle_id"
            defaultValue={bundle?.bundle_id}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bundle_name">Bundle Name</Label>
          <Input
            id="bundle_name"
            name="bundle_name"
            defaultValue={bundle?.bundle_name}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="who_its_for">Who it's for</Label>
        <Input
          id="who_its_for"
          name="who_its_for"
          defaultValue={bundle?.who_its_for}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="included_service_ids">
          Included Services (comma-separated IDs)
        </Label>
        <Textarea
          id="included_service_ids"
          name="included_service_ids"
          defaultValue={bundle?.included_service_ids.join(", ")}
          placeholder="e.g., proprietorship, gst, website"
        />
        <p className="text-xs text-muted-foreground">
          Available: {services.map((s) => s.service_id).join(", ")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bundle_setupr_fee">Bundle Fee (₹)</Label>
          <Input
            id="bundle_setupr_fee"
            name="bundle_setupr_fee"
            type="number"
            defaultValue={bundle?.bundle_setupr_fee}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={bundle?.sort_order || 0}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="govt_fee_note">Govt Fee Note</Label>
        <Input
          id="govt_fee_note"
          name="govt_fee_note"
          defaultValue={bundle?.govt_fee_note}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            name="icon"
            defaultValue={bundle?.icon || "Package"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradient">Gradient</Label>
          <Input
            id="gradient"
            name="gradient"
            defaultValue={bundle?.gradient}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="gradient-accent">
          Save Bundle
        </Button>
      </div>
    </form>
  );
};

export default Admin;
