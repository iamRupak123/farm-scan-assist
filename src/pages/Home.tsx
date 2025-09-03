import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, BarChart3, Database, Zap, Shield, Cpu } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms for accurate animal classification and trait measurement."
    },
    {
      icon: BarChart3,
      title: "Comprehensive Scoring",
      description: "Detailed ATC scores with measurements for body length, withers height, hip width, and more."
    },
    {
      icon: Shield,
      title: "Quality Control",
      description: "Built-in QC flags and confidence scoring to ensure reliable and trustworthy results."
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick image analysis with immediate results and detailed trait breakdowns."
    }
  ];

  const stats = [
    { label: "Animals Analyzed", value: "10,000+", color: "success" },
    { label: "Accuracy Rate", value: "94.2%", color: "accent" },
    { label: "Traits Measured", value: "15+", color: "warning" },
    { label: "Processing Time", value: "<30s", color: "success" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              AI-Powered Animal
              <span className="block text-accent-light">Type Classification</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Revolutionary livestock analysis system providing accurate measurements, trait assessment, 
              and ATC scoring for cattle and buffalo using advanced computer vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-medium">
                <Link to="/upload">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload & Analyze
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/records">
                  <Database className="w-5 h-5 mr-2" />
                  View Records
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
                <Badge 
                  variant="secondary" 
                  className={`mt-2 ${
                    stat.color === 'success' ? 'bg-success/10 text-success' :
                    stat.color === 'accent' ? 'bg-accent/10 text-accent' :
                    stat.color === 'warning' ? 'bg-warning/10 text-warning' : ''
                  }`}
                >
                  Live Data
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Advanced Livestock Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI system provides comprehensive analysis of cattle and buffalo, 
              delivering precise measurements and professional-grade scoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="h-full hover:shadow-medium transition-smooth border-border/50">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Analyze Your Livestock?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Upload your cattle or buffalo images and get detailed analysis results in seconds.
          </p>
          <Button asChild size="lg" className="shadow-medium">
            <Link to="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Start Analysis
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;