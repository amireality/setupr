import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import { z } from "zod";

interface ContactValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
}

interface StepContactProps {
  values: ContactValues;
  onChange: (values: ContactValues) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15),
  city: z.string().trim().min(2, "City is required").max(100),
});

const StepContact = ({ values, onChange, onSubmit, onBack }: StepContactProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ContactValues, value: string) => {
    onChange({ ...values, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit();
  };

  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        Almost there! How can we reach you?
      </h1>
      <p className="text-muted-foreground mb-8">
        We'll use this to share your next steps.
      </p>

      <div className="space-y-5 mb-8">
        <div>
          <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Your full name"
            value={values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`mt-2 ${errors.fullName ? "border-destructive" : ""}`}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`mt-2 ${errors.email ? "border-destructive" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-foreground">Phone / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`mt-2 ${errors.phone ? "border-destructive" : ""}`}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city" className="text-foreground">City</Label>
          <Input
            id="city"
            type="text"
            placeholder="Your city"
            value={values.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={`mt-2 ${errors.city ? "border-destructive" : ""}`}
          />
          {errors.city && (
            <p className="text-sm text-destructive mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          variant="hero" 
          size="lg" 
          onClick={handleSubmit}
          className="flex-1 sm:flex-none"
        >
          Submit
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StepContact;