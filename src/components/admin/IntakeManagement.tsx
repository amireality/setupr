import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import {
  useAdminIntakeSubmissions,
  useUpdateIntakeStatus,
  useDeleteIntakeSubmission,
  type IntakeSubmission,
} from "@/hooks/useIntakeAdmin";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Inbox,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "contacted", label: "Contacted", color: "bg-blue-500/20 text-blue-400" },
  { value: "completed", label: "Completed", color: "bg-green-500/20 text-green-400" },
];

export const IntakeManagement = () => {
  const { data: submissions, isLoading } = useAdminIntakeSubmissions();
  const updateStatus = useUpdateIntakeStatus();
  const deleteSubmission = useDeleteIntakeSubmission();
  const { toast } = useToast();

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewingSubmission, setViewingSubmission] = useState<IntakeSubmission | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id, status: newStatus });
      toast({ title: `Status updated to ${newStatus}` });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (submission: IntakeSubmission) => {
    if (!confirm(`Delete submission from "${submission.full_name}"?`)) return;

    try {
      await deleteSubmission.mutateAsync(submission.id);
      toast({ title: "Submission deleted" });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredSubmissions =
    filterStatus === "all"
      ? submissions
      : submissions?.filter((s) => s.status === filterStatus);

  const getStatusBadge = (status: string) => {
    const statusOption = STATUS_OPTIONS.find((s) => s.value === status);
    return (
      <Badge className={statusOption?.color || "bg-muted"}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Inbox className="w-5 h-5 text-muted-foreground" />
            Intake Submissions ({submissions?.length || 0})
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage form submissions from potential clients
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submissions List */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading submissions...
        </div>
      ) : filteredSubmissions?.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl">
          <Inbox className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {filterStatus === "all"
              ? "No submissions yet."
              : `No ${filterStatus} submissions.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredSubmissions?.map((submission) => (
            <div
              key={submission.id}
              className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h4 className="font-medium">{submission.full_name}</h4>
                  {getStatusBadge(submission.status)}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {submission.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {submission.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(submission.created_at), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {/* Status Dropdown */}
                <Select
                  value={submission.status}
                  onValueChange={(value) => handleStatusChange(submission.id, value)}
                >
                  <SelectTrigger className="w-[120px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewingSubmission(submission)}
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(submission)}
                  title="Delete"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <SubmissionDetailsDialog
        submission={viewingSubmission}
        open={!!viewingSubmission}
        onOpenChange={(open) => !open && setViewingSubmission(null)}
      />
    </div>
  );
};

interface SubmissionDetailsDialogProps {
  submission: IntakeSubmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubmissionDetailsDialog = ({
  submission,
  open,
  onOpenChange,
}: SubmissionDetailsDialogProps) => {
  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="glass-card rounded-lg p-4">
            <h4 className="font-medium mb-3">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Name:</span>
                <span>{submission.full_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Email:</span>
                <a
                  href={`mailto:${submission.email}`}
                  className="text-primary hover:underline"
                >
                  {submission.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">Phone:</span>
                <a
                  href={`tel:${submission.phone}`}
                  className="text-primary hover:underline"
                >
                  {submission.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-20">City:</span>
                <span>{submission.city}</span>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="glass-card rounded-lg p-4">
            <h4 className="font-medium mb-3">Business Details</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Current Stage:</span>
                <p className="mt-1">{submission.current_stage}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Work Types:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {submission.work_types.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Existing Setup:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {submission.existing_setup.length > 0 ? (
                    submission.existing_setup.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">None</span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <p className="mt-1">{submission.timeline}</p>
              </div>
            </div>
          </div>

          {/* Selected Services */}
          <div className="glass-card rounded-lg p-4">
            <h4 className="font-medium mb-3">
              Selected Services ({submission.selected_services.length})
            </h4>
            <div className="flex flex-wrap gap-1">
              {submission.selected_services.map((service) => (
                <Badge key={service} variant="default" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="text-xs text-muted-foreground">
            Submitted on{" "}
            {format(new Date(submission.created_at), "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
