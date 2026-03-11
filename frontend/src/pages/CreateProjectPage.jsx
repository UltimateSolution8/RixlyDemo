import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import ProjectInfoStep from "./create-project/ProjectInfoStep";
import ProjectDetailsStep from "./create-project/ProjectDetailsStep";
import KeywordSetupStep from "./create-project/KeywordSetupStep";
import PreviewProjectStep from "./create-project/PreviewProjectStep";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    try {
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [currentStep, setCurrentStep] = useState(1);
  const [projectInfo, setProjectInfo] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleStep1Next = (data) => {
    setProjectInfo(data);
    setCurrentStep(2);
  };

  const handleStep2Next = (data) => {
    setProjectDetails(data);
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Next = () => {
    setCurrentStep(4);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleStep4Next = async () => {
    if (!projectInfo || !projectDetails) {
      setError("Project information is missing. Please go back and complete all steps.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call - in real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Project created:", {
        projectName: projectInfo.projectName,
        location: projectInfo.location,
        businessType: projectInfo.businessType,
        websiteUrl: projectDetails.websiteUrl,
        description: projectDetails.description,
        targetAudience: projectDetails.targetAudience,
        valuePropositions: projectDetails.valuePropositions,
        keywords: keywords.map(k => k.text),
      });
      
      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep4Back = () => {
    setCurrentStep(3);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Create a New Project";
      case 3:
        return "Set Up Your Keywords";
      default:
        return "Create a New Project";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Start by telling us about your project. This helps our AI find the most relevant leads for you.";
      case 3:
        return "Enter keywords or phrases Rixly should monitor on Reddit. Use our AI to discover related terms.";
      default:
        return "";
    }
  };

  const getStepLabel = () => {
    switch (currentStep) {
      case 2:
        return "Project Details";
      case 3:
        return "Keyword Setup";
      case 4:
        return "Preview";
      default:
        return "";
    }
  };

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 relative pt-20">
      {/* Close Button - Fixed Position */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 z-10"
      >
        <X className="w-5 h-5" />
      </Button>

      <div className="flex flex-col w-full max-w-2xl gap-6 mx-auto">
        {/* Progress Indicator */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between">
            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2">
            <div
              className="h-2 rounded-full bg-teal-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {getStepLabel() && (
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {getStepLabel()}
            </p>
          )}
        </div>

        {/* Header - Only show for steps 1 and 3 */}
        {(currentStep === 1 || currentStep === 3) && (
          <div className="flex flex-col gap-2 px-4">
            <p className="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">
              {getStepTitle()}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              {getStepDescription()}
            </p>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 1 && (
          <ProjectInfoStep
            onNext={handleStep1Next}
            onCancel={handleCancel}
            initialData={projectInfo}
          />
        )}

        {currentStep === 2 && (
          <ProjectDetailsStep
            onNext={handleStep2Next}
            onBack={handleStep2Back}
            initialData={projectDetails}
          />
        )}

        {currentStep === 3 && (
          <KeywordSetupStep
            onNext={handleStep3Next}
            onBack={handleStep3Back}
            keywords={keywords}
            onKeywordsChange={setKeywords}
            productDescription={projectDetails?.description || ""}
          />
        )}

        {currentStep === 4 && projectInfo && projectDetails && (
          <PreviewProjectStep
            onNext={handleStep4Next}
            onBack={handleStep4Back}
            projectData={{
              projectName: projectInfo.projectName,
              location: projectInfo.location,
              businessType: projectInfo.businessType,
              websiteUrl: projectDetails.websiteUrl,
              description: projectDetails.description,
              targetAudience: projectDetails.targetAudience,
              valuePropositions: projectDetails.valuePropositions,
              keywords: keywords.map(k => k.text),
            }}
            isSubmitting={isSubmitting}
            error={error}
          />
        )}
      </div>
    </main>
    </>
  );
}
