import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function ProjectInfoStep({ onNext, onCancel, initialData }) {
  const [projectName, setProjectName] = useState(initialData?.projectName || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [businessType, setBusinessType] = useState(initialData?.businessType || "");
  const [businessTypeOther, setBusinessTypeOther] = useState(initialData?.businessTypeOther || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!projectName || projectName.length < 3) {
      newErrors.projectName = "Project name must be at least 3 characters";
    }
    if (!location || location.length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }
    if (!businessType) {
      newErrors.businessType = "Please select a business type";
    }
    if (businessType === "other" && !businessTypeOther.trim()) {
      newErrors.businessTypeOther = "Please specify your business type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext({
        projectName,
        location,
        businessType,
        businessTypeOther: businessType === "other" ? businessTypeOther : "",
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 sm:p-8">
        {/* Project Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="project-name" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
            Project Name
          </Label>
          <Input
            id="project-name"
            type="text"
            placeholder="e.g., Q1 Marketing Campaign"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:ring-teal-600/50 focus-visible:border-teal-600"
          />
          {errors.projectName && (
            <p className="text-sm text-red-500">{errors.projectName}</p>
          )}
        </div>

        {/* Primary Operating Location */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="location" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
            Primary Operating Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g., San Francisco, CA or United States"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:ring-teal-600/50 focus-visible:border-teal-600"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        {/* Type of Business */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="business-type" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
            Type of Business
          </Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger
              id="business-type"
              className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-teal-600/50 focus:border-teal-600"
            >
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-sm text-red-500">{errors.businessType}</p>
          )}
        </div>

        {/* Other Business Type (Conditional) */}
        {businessType === "other" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="business-type-other" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Please specify
            </Label>
            <Input
              id="business-type-other"
              type="text"
              placeholder="Describe your business type"
              value={businessTypeOther}
              onChange={(e) => setBusinessTypeOther(e.target.value)}
              className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:ring-teal-600/50 focus-visible:border-teal-600"
            />
            {errors.businessTypeOther && (
              <p className="text-sm text-red-500">{errors.businessTypeOther}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="min-w-[8rem] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="min-w-[8rem] bg-teal-600 hover:bg-teal-700 text-white"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
