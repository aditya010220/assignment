'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Users, Zap, Brain, GitBranch, MessageSquare, Github, Twitter, MessageCircle, ArrowRight, Sparkles, Star, Shield, Rocket, Play, Layers3, Box } from 'lucide-react'
import Image from 'next/image'
import EnhancedParticleBackground from './components/EnhancedParticleBackground'
import ConnectionLine from './components/ConnectionLine'
import GlowButton from './components/GlowButton'
import AnimatedGradientText from './components/AnimatedGradientText'
import FloatingCard from './components/FloatingCard'
import ShimmerEffect from './components/ShimmerEffect'
import ParallaxSection from './components/ParallaxSection'
import AnimatedCounter from './components/AnimatedCounter'
import TypewriterText from './components/TypewriterText'
import LoadingSpinner from './components/LoadingSpinner'
import FlipCard from './components/FlipCard'
import AnimatedModal from './components/AnimatedModal'
import AnimatedNavigation from './components/AnimatedNavigation'
import MicroInteraction from './components/MicroInteractions'
import PageTransition from './components/PageTransition'
import EnhancedScrollReveal from './components/EnhancedScrollReveal'

const features = [
  {
    id: 'feature-1',
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time, no matter where you are.",
    backDescription: "Advanced features include voice chat, screen sharing, and collaborative editing with conflict resolution.",
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'feature-2',
    icon: <Code2 className="w-8 h-8" />,
    title: "Code Explorer",
    description: "Navigate and understand codebases with intelligent code exploration tools.",
    backDescription: "AI-powered code analysis, dependency mapping, and smart search across your entire codebase.",
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'feature-3',
    icon: <Zap className="w-8 h-8" />,
    title: "Task Tracking",
    description: "Keep track of progress with powerful project management features.",
    backDescription: "Kanban boards, sprint planning, time tracking, and automated reporting for better productivity.",
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'feature-4',
    icon: <Brain className="w-8 h-8" />,
    title: "AI Assistant",
    description: "Get intelligent suggestions and automate repetitive tasks with AI.",
    backDescription: "Code completion, bug detection, automated testing, and intelligent refactoring suggestions.",
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'feature-5',
    icon: <GitBranch className="w-8 h-8" />,
    title: "Version Control",
    description: "Seamless integration with Git workflows and branch management.",
    backDescription: "Visual merge conflict resolution, automated deployments, and advanced branching strategies.",
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'feature-6',
    icon: <Users className="w-8 h-8" />,
    title: "Team Management",
    description: "Organize teams, assign roles, and manage permissions effortlessly.",
    backDescription: "Role-based access control, team analytics, performance tracking, and onboarding workflows.",
    color: 'from-pink-500 to-rose-500'
  }
]

const integrations = [
  { name: "GitHub", logo: "/placeholder.svg?height=40&width=40&text=GitHub" },
  { name: "Vercel", logo: "/placeholder.svg?height=40&width=40&text=Vercel" },
  { name: "Figma", logo: "/placeholder.svg?height=40&width=40&text=Figma" },
  { name: "Notion", logo: "/placeholder.svg?height=40&width=40&text=Notion" },
  { name: "Slack", logo: "/placeholder.svg?height=40&width=40&text=Slack" },
  { name: "Discord", logo: "/placeholder.svg?height=40&width=40&text=Discord" }
]

const testimonials = [
  {
    quote: "This platform has revolutionized how our team collaborates. The real-time features are incredible.",
    author: "Sarah Chen",
    role: "Lead Developer",
    avatar: "/developer.jpg?height=50&width=50&text=SC",
    rating: 5
  },
  {
    quote: "The AI assistant saves us hours every week. It's like having an extra team member.",
    author: "Marcus Rodriguez",
    role: "Product Manager",
    avatar: "/INSTAGRAM.png?height=50&width=50&text=MR",
    rating: 5
  },
  {
    quote: "Finally, a tool that brings everything together. No more switching between apps.",
    author: "Emily Watson",
    role: "Designer",
    avatar: "/designer.jpg?height=50&width=50&text=EW",
    rating: 5
  }
]

const stats = [
  { value: 50000, suffix: '+', label: 'Active Users' },
  { value: 99, suffix: '%', label: 'Uptime' },
  { value: 24, suffix: '/7', label: 'Support' },
  { value: 150, suffix: '+', label: 'Integrations' }
]

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Smooth scroll function
  const scrollToSection = (sectionId:string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbar = document.querySelector('nav')
      const navbarHeight = navbar ? navbar.offsetHeight : 80
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'features', 'integrations', 'testimonials']
    
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80px 0px',
      threshold: 0.3
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Testimonials', href: '#testimonials' }
  ]

  const logo = (
    <div className="flex items-center space-x-3">
      <MicroInteraction type="rotate" trigger="hover">
        <div className="relative">
          {/* Outer ring with gradient */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-0.5 shadow-lg">
            {/* Inner container */}
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20 animate-pulse" />
              
              {/* 3D layered icon */}
              <div className="relative z-10">
                <Layers3 className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-sm opacity-50" />
            </div>
          </div>
          
          {/* Floating particles around logo */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-ping" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse" />
        </div>
      </MicroInteraction>
      
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white tracking-tight">Dimension</span>
        <span className="text-xs text-slate-400 font-medium -mt-1">BUILD TOGETHER</span>
      </div>
    </div>
  )

  const ctaButton = (
    <MicroInteraction type="scale" trigger="hover">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500/30 to-slate-400/30 rounded-md opacity-50 animate-pulse blur-sm"></div>
        <Button 
          variant="outline" 
          className="relative border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent text-sm font-normal px-4 py-2 h-9 transition-all duration-200"
        >
          Join waitlist
        </Button>
      </div>
    </MicroInteraction>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 mt-4"
          >
            Loading amazing experience...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        {/* Enhanced Animated Navigation with Click Handlers */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
            >
              {logo}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md ${
                    activeSection === item.href 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  {activeSection === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            {ctaButton}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <div className="w-4 h-0.5 bg-current mb-1"></div>
                  <div className="w-4 h-0.5 bg-current mb-1"></div>
                  <div className="w-4 h-0.5 bg-current"></div>
                </div>
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0"
          >
            <EnhancedParticleBackground />
          </motion.div>
          
          <div className="container mx-auto px-4 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <MicroInteraction type="pulse" trigger="always">
                <ShimmerEffect trigger="always">
                  <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 mb-8">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-sm text-slate-300">Announcing our $1.4M Fundraise</span>
                  </div>
                </ShimmerEffect>
              </MicroInteraction>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <TypewriterText 
                text="Build smarter. " 
                delay={500}
                speed={100}
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
              />
              <br />
              <AnimatedGradientText className="text-4xl md:text-6xl lg:text-7xl font-bold">
                Together.
              </AnimatedGradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
            >
              Chat, code, cloud, deployments, and more. The complete platform for modern development teams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <div className="flex w-full sm:w-auto max-w-md relative">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 rounded-r-none"
                />
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-75 animate-pulse blur-sm"></div>
                  <GlowButton className="relative rounded-l-none">
                    Join Waitlist
                  </GlowButton>
                </div>
              </div>
              <MicroInteraction type="bounce" trigger="hover">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-500 to-slate-400 rounded-lg opacity-50 animate-pulse blur-sm"></div>
                  <Button
                    variant="ghost"
                    className="relative text-slate-400 hover:text-white"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              </MicroInteraction>
            </motion.div>

            {/* Floating Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <FloatingCard delay={0} className="relative">
                <MicroInteraction type="scale" trigger="hover">
                  <div id="hero-card-1" className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <Shield className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Secure</h3>
                    <p className="text-slate-400 text-sm">Enterprise-grade security</p>
                  </div>
                </MicroInteraction>
              </FloatingCard>

              <FloatingCard delay={0.5} className="relative">
                <MicroInteraction type="scale" trigger="hover">
                  <div id="hero-card-2" className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <Rocket className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Fast</h3>
                    <p className="text-slate-400 text-sm">Lightning-fast performance</p>
                  </div>
                </MicroInteraction>
              </FloatingCard>

              <FloatingCard delay={1} className="relative">
                <MicroInteraction type="scale" trigger="hover">
                  <div id="hero-card-3" className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <Star className="w-8 h-8 text-yellow-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Reliable</h3>
                    <p className="text-slate-400 text-sm">99.9% uptime guarantee</p>
                  </div>
                </MicroInteraction>
              </FloatingCard>
            </div>

            {/* Connection Lines between Hero Cards */}
            <ConnectionLine fromId="hero-card-1" toId="hero-card-2" delay={3} color="#06b6d4" />
            <ConnectionLine fromId="hero-card-2" toId="hero-card-3" delay={3.5} color="#a855f7" />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="relative max-w-6xl mx-auto"
            >
              <ParallaxSection speed={0.3}>
                <MicroInteraction type="scale" trigger="hover">
                  <div className="relative">
                    <Image
                      src="/images/dimension-mockup.png"
                      alt="Dimension Product Interface - Chat, code, and collaboration platform"
                      width={1000}
                      height={600}
                      className="rounded-2xl shadow-2xl border border-slate-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent rounded-2xl shadow-xl opacity-90 h-3/4 top-1/4" />
                  </div>
                </MicroInteraction>
              </ParallaxSection>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <EnhancedScrollReveal id="about" className="py-16 bg-slate-900/30" direction="fade">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <EnhancedScrollReveal
                  key={index}
                  delay={index * 0.1}
                  direction="up"
                  className="text-center"
                >
                  <MicroInteraction type="bounce" trigger="hover">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                        className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                      />
                    </div>
                    <p className="text-slate-400">{stat.label}</p>
                  </MicroInteraction>
                </EnhancedScrollReveal>
              ))}
            </div>
          </div>
        </EnhancedScrollReveal>

        {/* Features Section with Flip Cards */}
        <EnhancedScrollReveal id="features" className="py-24 bg-slate-900/50" direction="scale">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful features for{' '}
                <AnimatedGradientText>
                  modern teams
                </AnimatedGradientText>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Everything you need to build, collaborate, and ship faster than ever before.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {features.map((feature, index) => (
                <EnhancedScrollReveal
                  key={index}
                  delay={index * 0.1}
                  direction="up"
                  className="h-64"
                >
                  <FlipCard
                    frontContent={
                      <Card 
                        id={feature.id}
                        className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group relative overflow-hidden h-full"
                      >
                        <ShimmerEffect trigger="hover">
                          <CardContent className="p-8 h-full flex flex-col justify-center">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform w-fit`}>
                              {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">
                              {feature.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                              {feature.description}
                            </p>
                          </CardContent>
                        </ShimmerEffect>
                      </Card>
                    }
                    backContent={
                      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 h-full">
                        <CardContent className="p-8 h-full flex flex-col justify-center">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 w-fit`}>
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-white">
                            {feature.title}
                          </h3>
                          <p className="text-slate-200 leading-relaxed text-sm">
                            {feature.backDescription}
                          </p>
                        </CardContent>
                      </Card>
                    }
                  />
                </EnhancedScrollReveal>
              ))}

              {/* Feature Connection Lines */}
              <ConnectionLine fromId="feature-1" toId="feature-2" delay={4} color="#06b6d4" />
              <ConnectionLine fromId="feature-2" toId="feature-3" delay={4.5} color="#10b981" />
              <ConnectionLine fromId="feature-4" toId="feature-5" delay={5} color="#f97316" />
              <ConnectionLine fromId="feature-5" toId="feature-6" delay={5.5} color="#ec4899" />
            </div>
          </div>
        </EnhancedScrollReveal>

        {/* Integrations Section */}
        <EnhancedScrollReveal id="integrations" className="py-24" direction="fade">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Integrates with your{' '}
                <AnimatedGradientText>
                  favorite tools
                </AnimatedGradientText>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Connect with the tools you already use and love.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {integrations.map((integration, index) => (
                <EnhancedScrollReveal
                  key={index}
                  delay={index * 0.1}
                  direction="up"
                >
                  <MicroInteraction type="bounce" trigger="hover">
                    <ShimmerEffect trigger="hover" className="flex flex-col items-center group">
                      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300 hover:bg-slate-700 relative">
                        {/* Integration specific icons */}
                        {integration.name === 'GitHub' && <Github className="w-8 h-8 text-slate-300 group-hover:text-white" />}
                        {integration.name === 'Vercel' && <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center"><div className="w-4 h-4 bg-black rounded-full" /></div>}
                        {integration.name === 'Figma' && <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">F</div>}
                        {integration.name === 'Notion' && <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xs">N</div>}
                        {integration.name === 'Slack' && <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">#</div>}
                        {integration.name === 'Discord' && <MessageCircle className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300" />}
                      </div>
                      <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                        {integration.name}
                      </span>
                    </ShimmerEffect>
                  </MicroInteraction>
                </EnhancedScrollReveal>
              ))}
            </div>
          </div>
        </EnhancedScrollReveal>

        {/* Testimonials Section */}
        <EnhancedScrollReveal id="testimonials" className="py-24 bg-slate-900/50" direction="scale">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Loved by{' '}
                <AnimatedGradientText>
                  developers
                </AnimatedGradientText>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                See what teams around the world are saying about our platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <EnhancedScrollReveal
                  key={index}
                  delay={index * 0.2}
                  direction="up"
                >
                  <MicroInteraction type="scale" trigger="hover">
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                      <ShimmerEffect trigger="hover">
                        <CardContent className="p-8">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <MicroInteraction key={i} type="bounce" trigger="hover">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              </MicroInteraction>
                            ))}
                          </div>
                          <p className="text-slate-300 mb-6 leading-relaxed italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center">
                            <MicroInteraction type="scale" trigger="hover">
                              <Image
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.author}
                                width={50}
                                height={50}
                                className="rounded-full mr-4 hover:ring-2 hover:ring-purple-500 transition-all"
                              />
                            </MicroInteraction>
                            <div>
                              <div className="font-semibold text-white">
                                {testimonial.author}
                              </div>
                              <div className="text-slate-400 text-sm">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </ShimmerEffect>
                    </Card>
                  </MicroInteraction>
                </EnhancedScrollReveal>
              ))}
            </div>
          </div>
        </EnhancedScrollReveal>

        {/* Final CTA Section */}
        <EnhancedScrollReveal className="py-24" direction="scale">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-16 text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to accelerate your{' '}
                    <AnimatedGradientText>
                      workflow?
                    </AnimatedGradientText>
                  </h2>
                  <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                    Join thousands of teams already building the future with our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-75 animate-pulse blur-sm"></div>
                      <GlowButton size="lg" className="relative px-8 py-3 text-lg">
                        Join Now
                      </GlowButton>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-lg opacity-50 animate-pulse blur-sm"></div>
                      <GlowButton variant="outline" size="lg" className="relative px-8 py-3 text-lg">
                        Request Access
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </EnhancedScrollReveal>

        {/* Footer */}
        <footer className="py-16 border-t border-slate-800 relative bg-slate-950/50">
          <ParallaxSection speed={0.2}>
            <div className="container mx-auto px-4">
              <EnhancedScrollReveal direction="up">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                  {/* Logo and Description */}
                  <div className="md:col-span-2">
                    <MicroInteraction type="pulse" trigger="hover">
                      <ShimmerEffect trigger="hover">
                        <button 
                          onClick={() => scrollToSection('hero')}
                          className="flex items-center space-x-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
                        >
                          <div className="relative">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-0.5">
                              <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20" />
                                <Layers3 className="w-4 h-4 text-white relative z-10" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-lg font-bold text-white">Dimension</span>
                            <div className="text-xs text-slate-400 font-medium -mt-0.5">BUILD TOGETHER</div>
                          </div>
                        </button>
                      </ShimmerEffect>
                    </MicroInteraction>
                    <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                      Building the future of collaboration, one team at a time. Join thousands of developers who trust Dimension for their workflow.
                    </p>
                    <div className="flex space-x-4">
                      <MicroInteraction type="bounce" trigger="hover">
                        <ShimmerEffect trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                            <Github className="w-6 h-6" />
                          </a>
                        </ShimmerEffect>
                      </MicroInteraction>
                      <MicroInteraction type="bounce" trigger="hover">
                        <ShimmerEffect trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                            <Twitter className="w-6 h-6" />
                          </a>
                        </ShimmerEffect>
                      </MicroInteraction>
                      <MicroInteraction type="bounce" trigger="hover">
                        <ShimmerEffect trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white hover:scale-110 transition-all">
                            <MessageCircle className="w-6 h-6" />
                          </a>
                        </ShimmerEffect>
                      </MicroInteraction>
                    </div>
                  </div>

                  {/* Product Links */}
                  <div>
                    <h3 className="font-semibold mb-4 text-white">Product</h3>
                    <ul className="space-y-3">
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <button 
                            onClick={() => scrollToSection('features')}
                            className="text-slate-400 hover:text-white transition-colors flex items-center text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Features
                          </button>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Pricing
                          </a>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <button 
                            onClick={() => scrollToSection('integrations')}
                            className="text-slate-400 hover:text-white transition-colors flex items-center text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Integrations
                          </button>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            API Docs
                          </a>
                        </MicroInteraction>
                      </li>
                    </ul>
                  </div>

                  {/* Company Links */}
                  <div>
                    <h3 className="font-semibold mb-4 text-white">Company</h3>
                    <ul className="space-y-3">
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <button 
                            onClick={() => scrollToSection('about')}
                            className="text-slate-400 hover:text-white transition-colors flex items-center text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            About
                          </button>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Blog
                          </a>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Careers
                            <span className="ml-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
                          </a>
                        </MicroInteraction>
                      </li>
                      <li>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center">
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            Contact
                          </a>
                        </MicroInteraction>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                      <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} Dimension. All rights reserved.
                      </p>
                      <div className="flex space-x-6">
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                            Privacy Policy
                          </a>
                        </MicroInteraction>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                            Terms of Service
                          </a>
                        </MicroInteraction>
                        <MicroInteraction type="scale" trigger="hover">
                          <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                            Cookie Policy
                          </a>
                        </MicroInteraction>
                      </div>
                    </div>
                    
                    {/* Newsletter Signup */}
                    <div className="flex items-center space-x-2">
                      <Input
                        type="email"
                        placeholder="Subscribe to updates..."
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 w-48 h-9 text-sm"
                      />
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-md opacity-50 animate-pulse blur-sm"></div>
                        <Button size="sm" className="relative bg-purple-600 hover:bg-purple-700 text-white h-9">
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedScrollReveal>
            </div>
          </ParallaxSection>
        </footer>

        {/* Demo Modal */}
        <AnimatedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Product Demo"
        >
          <div className="text-center">
            <div className="w-full h-48 bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <Play className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-slate-300 mb-4">
              Watch how Dimension transforms team collaboration with real-time features and AI-powered assistance.
            </p>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-75 animate-pulse blur-sm"></div>
              <GlowButton className="relative" onClick={() => setIsModalOpen(false)}>
                Coming Soon
              </GlowButton>
            </div>
          </div>
        </AnimatedModal>
      </div>
    </PageTransition>
  )
}