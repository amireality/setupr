import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useDbServices } from "@/hooks/useServices";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, CheckCircle } from "lucide-react";

interface ServiceDeliverable {
  id: string;
  service_id: string;
  label: string;
  sort_order: number;
}

const useAllServiceDeliverables = () => {
  return useQuery({
    queryKey: ["all-service-deliverables"],
    queryFn: async (): Promise<ServiceDeliverable[]> => {
      const { data, error } = await supabase
        .from("service_deliverables")
        .select("*")
        .order("service_id")
        .order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });
};

export const ServiceDeliverableManagement = () => {
  const { data: deliverables = [], isLoading } = useAllServiceDeliverables();
  const { data: services = [] } = useDbServices();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [filterService, setFilterService] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceDeliverable | null>(null);

  const createMutation = useMutation({
    mutationFn: async (d: Omit<ServiceDeliverable, "id">) => {
      const { error } = await supabase.from("service_deliverables").insert(d);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-service-deliverables"] });
      queryClient.invalidateQueries({ queryKey: ["service-deliverables"] });
      toast({ title: "Deliverable created" });
      setDialogOpen(false);
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: ServiceDeliverable) => {
      const { error } = await supabase.from("service_deliverables").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-service-deliverables"] });
      queryClient.invalidateQueries({ queryKey: ["service-deliverables"] });
      toast({ title: "Deliverable updated" });
      setDialogOpen(false);
      setEditing(null);
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("service_deliverables").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-service-deliverables"] });
      queryClient.invalidateQueries({ queryKey: ["service-deliverables"] });
      toast({ title: "Deliverable deleted" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const filtered = filterService === "all" ? deliverables : deliverables.filter(d => d.service_id === filterService);
  const serviceNames = Object.fromEntries(services.map(s => [s.service_id, s.service_name]));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      service_id: fd.get("service_id") as string,
      label: fd.get("label") as string,
      sort_order: parseInt(fd.get("sort_order") as string) || 0,
    };
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading deliverables...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold">Service Deliverables ({filtered.length})</h3>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map(s => (
                <SelectItem key={s.service_id} value={s.service_id}>{s.service_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}>
            <DialogTrigger asChild>
              <Button size="sm" className="gradient-accent" onClick={() => setEditing(null)}>
                <Plus className="w-4 h-4 mr-2" />Add Deliverable
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Deliverable" : "Add Deliverable"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Service</Label>
                  <Select name="service_id" defaultValue={editing?.service_id || ""}>
                    <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      {services.map(s => (
                        <SelectItem key={s.service_id} value={s.service_id}>{s.service_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input name="label" defaultValue={editing?.label || ""} required />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input name="sort_order" type="number" defaultValue={editing?.sort_order || 0} />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{editing ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-2">
        {filtered.map(d => (
          <div key={d.id} className="glass-card rounded-xl p-3 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {serviceNames[d.service_id] || d.service_id}
                </span>
                <span className="text-xs text-muted-foreground">#{d.sort_order}</span>
              </div>
              <p className="text-sm mt-1">{d.label}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => { setEditing(d); setDialogOpen(true); }}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {
                if (confirm("Delete this deliverable?")) deleteMutation.mutate(d.id);
              }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No deliverables found.</p>
        )}
      </div>
    </div>
  );
};
