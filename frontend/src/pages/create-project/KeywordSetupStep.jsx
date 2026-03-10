import { useState } from "react";
import { Sparkles, X, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

// Mock AI keyword generation
const generateKeywords = async (description) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    keywords: [
      "lead generation", "B2B SaaS", "startup growth", "reddit marketing",
      "cold outreach", "sales pipeline", "marketing automation", "growth hacking"
    ]
  };
};

export default function KeywordSetupStep({ onNext, onBack, keywords, onKeywordsChange, productDescription }) {
  const [keywordInput, setKeywordInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeyword = {
        id: Date.now().toString(),
        text: keywordInput.trim(),
        isAIGenerated: false,
      };
      onKeywordsChange([...keywords, newKeyword]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (id) => {
    onKeywordsChange(keywords.filter((k) => k.id !== id));
  };

  const handleAIGenerate = async () => {
    if (!productDescription) {
      setGenerationError("Product description is required to generate keywords");
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await generateKeywords(productDescription);

      if (response.keywords?.length > 0) {
        const aiKeywords = response.keywords.map((keyword, index) => ({
          id: Date.now().toString() + `-${index}`,
          text: keyword,
          isAIGenerated: true,
        }));
        onKeywordsChange([...keywords, ...aiKeywords]);
      }
    } catch (error) {
      setGenerationError("Failed to generate keywords");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="flex w-full grow flex-col items-stretch justify-center gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-950 dark:text-white text-lg font-bold">
            Keywords to Track
          </p>

          {/* Keyword Input */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter a keyword..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 focus-visible:ring-teal-600/50 focus-visible:border-teal-600"
            />
            <Button
              type="button"
              onClick={handleAddKeyword}
              className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 text-white px-6"
            >
              Add
            </Button>
          </div>

          {/* AI Generator Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleAIGenerate}
            disabled={isGenerating || !productDescription}
            className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                <span>Generating Keywords...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>AI Keyword Generator</span>
              </>
            )}
          </Button>
          {generationError && (
            <p className="text-sm text-red-500">{generationError}</p>
          )}
        </div>

        {/* Keywords Display */}
        <div className="flex flex-col gap-3 rounded-lg bg-slate-100 dark:bg-slate-900/50 p-4 min-h-[12rem]">
          <div className="flex flex-wrap gap-3">
            {keywords.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No keywords added yet. Add keywords manually or use the AI generator.
              </p>
            ) : (
              keywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm ${
                    keyword.isAIGenerated
                      ? "bg-teal-500/10 dark:bg-teal-400/20 border border-teal-500/20 dark:border-teal-400/30 text-teal-700 dark:text-teal-300"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <span>{keyword.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(keyword.id)}
                    className={`cursor-pointer transition-colors ${
                      keyword.isAIGenerated
                        ? "text-teal-600/70 dark:text-teal-300/80 hover:text-teal-600 dark:hover:text-teal-300"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center gap-4 p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="min-w-[84px] border-slate-300 dark:border-slate-600"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="min-w-[84px] bg-teal-600 hover:bg-teal-700 text-white gap-2"
        >
          <span>Next</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
