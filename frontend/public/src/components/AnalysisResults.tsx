import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Ruler,
  TrendingUp,
  Star
} from 'lucide-react';

interface AnalysisResult {
  species: string;
  breed?: string;
  confidence: number;
  measurements: {
    bodyLength: { value: number; unit: string; confidence: number };
    withersHeight: { value: number; unit: string; confidence: number };
    hipWidth: { value: number; unit: string; confidence: number };
    rumpAngle: { value: number; unit: string; confidence: number };
    chestDepth: { value: number; unit: string; confidence: number };
  };
  traits: {
    dairyFormRatio: { value: number; score: number };
    muscularityScore: { value: number; score: number };
    frameScore: { value: number; score: number };
  };
  atcScores: {
    overall: number;
    conformation: number;
    capacity: number;
    functionality: number;
  };
  qcFlags: {
    imageQuality: 'pass' | 'warning' | 'fail';
    animalVisibility: 'pass' | 'warning' | 'fail';
    poseAccuracy: 'pass' | 'warning' | 'fail';
  };
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  onSave?: () => void;
  onNewAnalysis?: () => void;
}

const AnalysisResults = ({ result, onSave, onNewAnalysis }: AnalysisResultsProps) => {
  const getQCIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getQCColor = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'fail':
        return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-accent rounded-lg">
                  <Star className="w-5 h-5 text-accent-foreground" />
                </div>
                Analysis Complete
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                AI-powered livestock classification results
              </p>
            </div>
            <Badge className={`text-lg px-4 py-2 ${getScoreColor(result.atcScores.overall)}`}>
              {result.atcScores.overall}/100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Species</p>
              <p className="text-lg font-semibold text-foreground capitalize">{result.species}</p>
            </div>
            {result.breed && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Breed</p>
                <p className="text-lg font-semibold text-foreground">{result.breed}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Confidence</p>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={result.confidence} className="flex-1 h-2" />
                <span className="text-sm font-medium">{result.confidence}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Measurements */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-accent" />
              Physical Measurements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.measurements).map(([key, measurement]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={measurement.confidence} className="flex-1 h-1.5" />
                    <span className="text-xs text-muted-foreground">
                      {measurement.confidence}%
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-foreground">
                    {measurement.value} {measurement.unit}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Derived Traits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.traits).map(([key, trait]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Value: {trait.value}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-lg ${getScoreColor(trait.score)}`}>
                    {trait.score}/100
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ATC Scores */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>ATC Scoring Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Overall</p>
              <div className={`text-3xl font-bold ${getScoreColor(result.atcScores.overall)}`}>
                {result.atcScores.overall}
              </div>
              <Progress value={result.atcScores.overall} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Conformation</p>
              <div className={`text-2xl font-bold ${getScoreColor(result.atcScores.conformation)}`}>
                {result.atcScores.conformation}
              </div>
              <Progress value={result.atcScores.conformation} className="mt-2 h-1.5" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Capacity</p>
              <div className={`text-2xl font-bold ${getScoreColor(result.atcScores.capacity)}`}>
                {result.atcScores.capacity}
              </div>
              <Progress value={result.atcScores.capacity} className="mt-2 h-1.5" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Functionality</p>
              <div className={`text-2xl font-bold ${getScoreColor(result.atcScores.functionality)}`}>
                {result.atcScores.functionality}
              </div>
              <Progress value={result.atcScores.functionality} className="mt-2 h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Control */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quality Control Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(result.qcFlags).map(([key, status]) => (
              <div key={key} className={`flex items-center justify-between p-3 rounded-lg border ${getQCColor(status)}`}>
                <div>
                  <p className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm opacity-75 capitalize">{status}</p>
                </div>
                {getQCIcon(status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onSave} className="shadow-medium">
          <Download className="w-4 h-4 mr-2" />
          Save Results
        </Button>
        <Button onClick={onNewAnalysis} variant="outline" className="shadow-soft">
          Analyze Another Image
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;