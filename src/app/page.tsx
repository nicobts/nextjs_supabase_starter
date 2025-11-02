import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Shield, Users, BarChart3, Settings } from "lucide-react"
import { AnimatedPage, AnimatedFadeIn, AnimatedScaleIn } from "@/components/ui/animated"
import { AnimatedButton, AnimatedCard } from "@/components/ui/micro-interactions"

export default function Home() {
  return (
    <AnimatedPage className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SaaS Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <AnimatedFadeIn>
          <Badge variant="secondary" className="mb-4">
            🚀 Production Ready SaaS Template
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build Amazing SaaS Applications
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A complete full-stack SaaS template with Next.js 16, Supabase, Tailwind CSS,
            and modern animations. Ready for production with authentication, dashboard,
            and scalable architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Building</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Demo</Link>
            </Button>
          </div>
        </AnimatedFadeIn>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedFadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern technologies and best practices for scalable SaaS applications.
            </p>
          </div>
        </AnimatedFadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedScaleIn delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Next.js 16</CardTitle>
                <CardDescription>
                  Latest Next.js with App Router, Server Components, and Turbopack
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Cache Components
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Server Actions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    TypeScript Support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>

          <AnimatedScaleIn delay={0.4}>
            <Card className="h-full">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Supabase Auth</CardTitle>
                <CardDescription>
                  Secure authentication with email/password and session management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Email/Password Auth
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Session Persistence
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Row Level Security
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>

          <AnimatedScaleIn delay={0.5}>
            <Card className="h-full">
              <CardHeader>
                <Settings className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Modern UI</CardTitle>
                <CardDescription>
                  Beautiful components with Tailwind CSS and Framer Motion animations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Shadcn UI Components
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Dark/Light Themes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Smooth Animations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>

          <AnimatedScaleIn delay={0.6}>
            <Card className="h-full">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Complete dashboard with data tables, charts, and interactive components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Drag & Drop Tables
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Interactive Charts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Responsive Design
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>

          <AnimatedScaleIn delay={0.7}>
            <Card className="h-full">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Complete user profiles, permissions, and role-based access control
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    User Profiles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Role Management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Secure Sessions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>

          <AnimatedScaleIn delay={0.8}>
            <Card className="h-full">
              <CardHeader>
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-2">
                  <span className="text-primary-foreground font-bold">⚡</span>
                </div>
                <CardTitle>Production Ready</CardTitle>
                <CardDescription>
                  Optimized for performance, security, and scalability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ESLint Configured
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Best Practices
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedScaleIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <AnimatedFadeIn delay={0.9}>
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-16">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start with this production-ready template and focus on building your product
                instead of setting up infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">Create Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">Explore Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">SaaS Dashboard</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with Next.js 16, Supabase, and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </AnimatedPage>
  )
}
