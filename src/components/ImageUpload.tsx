import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  uploadProgress: number;
  selectedFile: File | null;
}

const ImageUpload = ({ onImageSelect, onAnalyze, isAnalyzing, uploadProgress, selectedFile }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageSelect(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null as any);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (preview && selectedFile) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative">
              <img
                src={preview}
                alt="Selected animal"
                className="w-full h-80 object-cover rounded-lg shadow-medium"
              />
              <Button
                onClick={clearImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 shadow-soft"
                disabled={isAnalyzing}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready
              </Badge>
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Analyzing image...</p>
                  <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Processing animal measurements and traits
                </p>
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full h-12 shadow-medium"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-smooth",
            isDragActive && !isDragReject && "border-accent bg-accent-lighter/20",
            isDragReject && "border-destructive bg-destructive/5",
            !isDragActive && "border-border hover:border-accent/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className={cn(
              "flex items-center justify-center w-16 h-16 mx-auto rounded-full transition-smooth",
              isDragActive && !isDragReject ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
            )}>
              {isDragReject ? (
                <AlertCircle className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            {isDragReject ? (
              <div>
                <p className="text-destructive font-medium">Invalid file type</p>
                <p className="text-sm text-muted-foreground">
                  Please upload a valid image file (JPEG, PNG, WebP)
                </p>
              </div>
            ) : isDragActive ? (
              <div>
                <p className="text-accent font-medium">Drop your image here</p>
                <p className="text-sm text-muted-foreground">
                  Upload cattle or buffalo image for analysis
                </p>
              </div>
            ) : (
              <div>
                <p className="text-foreground font-medium">
                  Drag & drop an animal image here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">JPEG</Badge>
              <Badge variant="secondary">PNG</Badge>
              <Badge variant="secondary">WebP</Badge>
              <Badge variant="secondary">Max 10MB</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Upload Guidelines:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use clear, well-lit images of cattle or buffalo</li>
            <li>• Ensure the full animal profile is visible</li>
            <li>• Avoid blurry or heavily cropped images</li>
            <li>• Best results with side-view poses</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;