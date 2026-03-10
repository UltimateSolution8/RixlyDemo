import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Globe, Sparkles, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock AI generation functions
const generateDescription = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    description: "Our platform helps B2B SaaS companies automate their lead generation process on Reddit. We use AI to identify relevant posts, analyze sentiment, and generate personalized responses that convert viewers into qualified leads."
  };
};

const generateProductInsights = async (description) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    targetAudience: ["SaaS Founders", "Marketing Managers", "Growth Hackers", "Startup CEOs"],
    valuePropositions: ["Saves 10+ hours weekly", "3x more qualified leads", "Automated follow-ups", "ROI within 30 days"]
  };
};

export default function ProjectDetailsStep({ onNext, onBack, initialData }) {
  const [websiteUrl, setWebsiteUrl] = useState(initialData?.websiteUrl || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [targetAudience, setTargetAudience] = useState(initialData?.targetAudience || []);
  const [valuePropositions, setValuePropositions] = useState(initialData?.valuePropositions || []);
  
  const [targetAudienceInput, setTargetAudienceInput] = useState("");
  const [valuePropositionInput, setValuePropositionInput] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [descriptionError, setDescriptionError] = useState(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState(null);
  
  const [errors, setErrors] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isValidUrl = (url) => {
    if (!url || url.trim().length === 0) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleGenerateDescription = async () => {
    if (!websiteUrl) {
      setDescriptionError("Please enter a website URL first");
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      setDescriptionError("Please enter a valid URL");
      return;
    }

    setIsGeneratingDescription(true);
    setDescriptionError(null);

    try {
      const response = await generateDescription(websiteUrl);
      if (response.description) {
        setDescription(response.description);
      }
    } catch (error) {
      setDescriptionError("Failed to generate description");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleGenerateInsights = async () => {
    if (!description || description.trim().length < 20) {
      setInsightsError("Please enter a product description first (minimum 20 characters)");
      return;
    }

    setIsGeneratingInsights(true);
    setInsightsError(null);

    try {
      const response = await generateProductInsights(description);
      if (response.targetAudience?.length > 0) {
        setTargetAudience(response.targetAudience);
      }
      if (response.valuePropositions?.length > 0) {
        setValuePropositions(response.valuePropositions);
      }
    } catch (error) {
      setInsightsError("Failed to generate product insights");
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const handleAddTargetAudience = (e) => {
    if (e.key === "Enter" && targetAudienceInput.trim()) {
      e.preventDefault();
      setTargetAudience([...targetAudience, targetAudienceInput.trim()]);
      setTargetAudienceInput("");
    }
  };

  const handleRemoveTargetAudience = (index) => {
    setTargetAudience(targetAudience.filter((_, i) => i !== index));
  };

  const handleAddValueProposition = (e) => {
    if (e.key === "Enter" && valuePropositionInput.trim()) {
      e.preventDefault();
      setValuePropositions([...valuePropositions, valuePropositionInput.trim()]);
      setValuePropositionInput("");
    }
  };

  const handleRemoveValueProposition = (index) => {
    setValuePropositions(valuePropositions.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!websiteUrl) newErrors.websiteUrl = "Website URL is required";
    else if (!isValidUrl(websiteUrl)) newErrors.websiteUrl = "Please enter a valid URL";
    if (!description || description.length < 20) newErrors.description = "Description must be at least 20 characters";
    if (targetAudience.length === 0) newErrors.targetAudience = "Add at least one target audience";
    if (valuePropositions.length === 0) newErrors.valuePropositions = "Add at least one value proposition";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onNext({ websiteUrl, description, targetAudience, valuePropositions });
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-bold">
          Project Details
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Provide detailed information so our AI can understand your offering and target the right audience.
        </p>
      </div>

      {/* Form */}
      <div className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 sm:p-8">
          {/* Project Website URL */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="website-url" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Project Website URL
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Globe className="w-4 h-4 text-slate-400" />
              </div>
              <Input
                id="website-url"
                type="url"
                placeholder="https://www.yourproject.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="pl-10 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-visible:ring-teal-600/50 focus-visible:border-teal-600"
              />
            </div>
            {errors.websiteUrl && (
              <p className="text-sm text-red-500">{errors.websiteUrl}</p>
            )}
          </div>

          {/* Project Description */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <Label htmlFor="description" className="text-slate-800 dark:text-slate-200 text-sm font-medium">
                Project Description
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGenerateDescription}
                disabled={isGeneratingDescription || !isValidUrl(websiteUrl)}
                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-xs h-7 px-2 gap-1 disabled:opacity-50"
              >
                {isGeneratingDescription ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3" />
                    AI Generate
                  </>
                )}
              </Button>
            </div>
            <textarea
              id="description"
              placeholder="Describe your product or service, its key features, and unique value proposition..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-teal-600/50 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:border-teal-600 min-h-[120px] placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-sm"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            {descriptionError && (
              <p className="text-sm text-red-500">{descriptionError}</p>
            )}
          </div>

          {/* AI Generate Button for Target Audience and Value Propositions */}
          <div className="flex items-center justify-between gap-4 py-2 px-4 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-lg">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                AI-Powered Analysis
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Generate target audience and value propositions from your description
              </p>
            </div>
            <Button
              type="button"
              onClick={handleGenerateInsights}
              disabled={isGeneratingInsights || !description || description.trim().length < 20}
              className="text-white bg-teal-600 hover:bg-teal-700 text-xs h-8 px-3 gap-1.5 disabled:opacity-50 shadow-sm"
            >
              {isGeneratingInsights ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Generate
                </>
              )}
            </Button>
          </div>
          {insightsError && (
            <p className="text-sm text-red-500 -mt-2">{insightsError}</p>
          )}

          {/* Target Audience */}
          <div className="flex flex-col gap-2">
            <Label className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Target Audience
            </Label>
            <div className="flex flex-col gap-3 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-teal-600/50 focus-within:border-teal-600 transition-all">
              {targetAudience.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {targetAudience.map((segment, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {segment}
                      <button
                        type="button"
                        onClick={() => handleRemoveTargetAudience(index)}
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={targetAudienceInput}
                  onChange={(e) => setTargetAudienceInput(e.target.value)}
                  onKeyDown={handleAddTargetAudience}
                  placeholder="Add a segment (e.g., SaaS Founders) - Press Enter"
                  className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-sm"
                />
              </div>
            </div>
            {errors.targetAudience && (
              <p className="text-sm text-red-500">{errors.targetAudience}</p>
            )}
          </div>

          {/* Value Propositions */}
          <div className="flex flex-col gap-2">
            <Label className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Value Propositions
            </Label>
            <div className="flex flex-col gap-3 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-teal-600/50 focus-within:border-teal-600 transition-all">
              {valuePropositions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {valuePropositions.map((valueProposition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {valueProposition}
                      <button
                        type="button"
                        onClick={() => handleRemoveValueProposition(index)}
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic py-1">
                  No value propositions added yet...
                </span>
              )}
              <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-2 mt-1">
                <Input
                  type="text"
                  value={valuePropositionInput}
                  onChange={(e) => setValuePropositionInput(e.target.value)}
                  onKeyDown={handleAddValueProposition}
                  placeholder="Add a value proposition (e.g., Saves 10+ hours weekly) - Press Enter"
                  className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-sm"
                />
              </div>
            </div>
            {errors.valuePropositions && (
              <p className="text-sm text-red-500">{errors.valuePropositions}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-6 mt-2 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="min-w-[7rem] border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="min-w-[7rem] bg-teal-600 hover:bg-teal-700 text-white"
            >
              Next
            </Button>
          </div>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              Confirm Your Details
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Please review your project details before proceeding. Make sure everything is correct.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 max-h-[50vh] overflow-y-auto">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Website URL</p>
                <p className="text-sm text-slate-900 dark:text-white break-all">{websiteUrl}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Description</p>
                <p className="text-sm text-slate-900 dark:text-white line-clamp-3">{description}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Target Audience</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {targetAudience.map((segment, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                      {segment}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Value Propositions</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {valuePropositions.map((valueProp, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {valueProp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                You can edit these details later from your dashboard after creating the project.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-slate-300 dark:border-slate-600"
            >
              Edit Details
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Confirm & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
