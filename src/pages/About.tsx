import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  Award, 
  Cpu,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Cpu,
      title: "Advanced AI Technology",
      description: "State-of-the-art computer vision algorithms trained on thousands of animal images for accurate classification and measurement."
    },
    {
      icon: BarChart3,
      title: "Comprehensive Analysis",
      description: "Detailed measurements including body length, withers height, hip width, and derived traits like dairy form ratio."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Built-in quality control flags and confidence scoring to ensure reliable and consistent results."
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Get detailed analysis results in under 30 seconds with professional-grade accuracy and detailed scoring."
    }
  ];

  const benefits = [
    "Objective and standardized animal evaluation",
    "Reduced time and labor for livestock assessment",
    "Improved breeding decisions through data-driven insights",
    "Enhanced record keeping and tracking capabilities",
    "Professional-grade accuracy for research and commercial use"
  ];

  const stats = [
    { label: "Accuracy Rate", value: "94.2%", icon: Award },
    { label: "Animals Processed", value: "10,000+", icon: BarChart3 },
    { label: "Traits Measured", value: "15+", icon: CheckCircle },
    { label: "Processing Time", value: "<30s", icon: Zap }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About Animal Type Classification
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered Animal Type Classification (ATC) system revolutionizes livestock evaluation 
            through advanced computer vision technology, providing accurate measurements and professional 
            scoring for cattle and buffalo.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="shadow-medium">
              <Link to="/upload">
                Try the System
              </Link>
            </Button>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 shadow-medium bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg flex-shrink-0 mt-1">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  To democratize professional livestock evaluation through cutting-edge AI technology, 
                  making accurate animal assessment accessible to farmers, researchers, and agricultural 
                  professionals worldwide. We aim to improve breeding decisions, enhance productivity, 
                  and support sustainable livestock management practices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Key Features & Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-accent rounded-lg">
                        <Icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-12 shadow-medium">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Users className="w-7 h-7 text-accent" />
              Benefits for Agricultural Professionals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Key Advantages</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Breeding Programs</Badge>
                  <Badge variant="secondary">Research Studies</Badge>
                  <Badge variant="secondary">Farm Management</Badge>
                  <Badge variant="secondary">Livestock Trading</Badge>
                  <Badge variant="secondary">Insurance Assessment</Badge>
                  <Badge variant="secondary">Genetic Evaluation</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Background */}
        <Card className="mb-12 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl">Technology & Research</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The ATC system is built on advanced deep learning models trained on extensive datasets 
              of cattle and buffalo images. Our computer vision algorithms can accurately identify and 
              measure key anatomical features, providing measurements that correlate strongly with 
              traditional manual assessment methods.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Deep Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced neural networks trained on thousands of annotated animal images
                </p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Computer Vision</h4>
                <p className="text-sm text-muted-foreground">
                  Precise anatomical landmark detection and measurement algorithms
                </p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Quality Control</h4>
                <p className="text-sm text-muted-foreground">
                  Multi-layer validation ensuring consistent and reliable results
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-earth p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Livestock Evaluation?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of agricultural professionals who trust our AI-powered ATC system 
            for accurate, fast, and reliable animal assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-medium">
              <Link to="/upload">
                Start Analysis
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-soft">
              <Link to="/records">
                View Records
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;