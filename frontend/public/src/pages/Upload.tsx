import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResults from '@/components/AnalysisResults';

// Mock analysis result for demonstration
const mockAnalysisResult = {
  species: 'cattle',
  breed: 'Holstein',
  confidence: 94.2,
  measurements: {
    bodyLength: { value: 165, unit: 'cm', confidence: 92 },
    withersHeight: { value: 142, unit: 'cm', confidence: 95 },
    hipWidth: { value: 58, unit: 'cm', confidence: 88 },
    rumpAngle: { value: 28, unit: '°', confidence: 86 },
    chestDepth: { value: 72, unit: 'cm', confidence: 91 }
  },
  traits: {
    dairyFormRatio: { value: 1.16, score: 85 },
    muscularityScore: { value: 0.78, score: 72 },
    frameScore: { value: 6.2, score: 89 }
  },
  atcScores: {
    overall: 82,
    conformation: 78,
    capacity: 85,
    functionality: 84
  },
  qcFlags: {
    imageQuality: 'pass' as const,
    animalVisibility: 'pass' as const,
    poseAccuracy: 'warning' as const
  }
};

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<typeof mockAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
    setUploadProgress(0);
  }, []);

  const simulateAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsAnalyzing(false);
    setUploadProgress(100);
    setAnalysisResult(mockAnalysisResult);

    toast({
      title: "Analysis Complete",
      description: "Your animal has been successfully analyzed.",
    });
  }, [toast]);

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    try {
      // In a real app, you would send the file to your backend
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const response = await fetch('/api/score', {
      //   method: 'POST',
      //   body: formData
      // });
      // const result = await response.json();
      // setAnalysisResult(result);

      await simulateAnalysis();
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  }, [selectedFile, simulateAnalysis, toast]);

  const handleSaveResults = useCallback(() => {
    toast({
      title: "Results Saved",
      description: "Analysis results have been saved to your records.",
    });
  }, [toast]);

  const handleNewAnalysis = useCallback(() => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setUploadProgress(0);
    setIsAnalyzing(false);
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Upload & Analyze Animal Images
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload clear images of cattle or buffalo to get detailed AI-powered analysis 
            including measurements, traits, and ATC scoring.
          </p>
        </div>

        {analysisResult ? (
          <AnalysisResults
            result={analysisResult}
            onSave={handleSaveResults}
            onNewAnalysis={handleNewAnalysis}
          />
        ) : (
          <div className="max-w-2xl mx-auto">
            <ImageUpload
              onImageSelect={handleImageSelect}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              uploadProgress={uploadProgress}
              selectedFile={selectedFile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;