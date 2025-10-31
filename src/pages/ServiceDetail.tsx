import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Code,
    Server,
    Smartphone,
    Brain,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Sparkles,
    Zap,
    Rocket,
    Shield,
    Users,
    TrendingUp,
    Globe
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import {
    ShinyText,
    AnimatedContainer,
    InteractiveButton,
    InteractiveCard,
    HolographicCard,
    WaveText,
    RevealText
} from '@/components/animations';
import { Button } from '@/components/ui/button';

interface ServiceDetail {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    icon: any;
    technologies: string[];
    features: string[];
    useCases: string[];
    benefits: string[];
    process: {
        step: number;
        title: string;
        description: string;
    }[];
    color: string;
    gradient: string;
}

const serviceDetails: ServiceDetail[] = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        shortDescription: 'Create stunning, responsive user interfaces with modern frameworks and cutting-edge design patterns.',
        longDescription: 'Our frontend development services combine the latest technologies with best practices to create exceptional user experiences. We specialize in building responsive, performant, and accessible web applications that engage users and drive business results. From single-page applications to complex enterprise solutions, we deliver frontends that are both beautiful and functional.',
        icon: Code,
        technologies: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Sass', 'Webpack', 'Vite'],
        features: [
            'Responsive Design',
            'Performance Optimization',
            'Modern UI/UX',
            'Cross-browser Compatibility',
            'Progressive Web Apps (PWA)',
            'Component-Based Architecture',
            'State Management',
            'Accessibility (WCAG)'
        ],
        useCases: [
            'E-commerce platforms with seamless shopping experiences',
            'Admin dashboards and analytics interfaces',
            'Real-time collaboration tools and applications',
            'Marketing websites and landing pages',
            'Interactive data visualization dashboards',
            'Customer-facing portals and self-service platforms'
        ],
        benefits: [
            'Improved user engagement and conversion rates',
            'Faster page load times and better performance',
            'Mobile-first approach for all devices',
            'Scalable architecture for future growth',
            'Better SEO and search rankings',
            'Enhanced accessibility for all users'
        ],
        process: [
            {
                step: 1,
                title: 'Discovery & Planning',
                description: 'We analyze your requirements, user personas, and business goals to create a comprehensive frontend strategy.'
            },
            {
                step: 2,
                title: 'Design & Prototyping',
                description: 'Our team creates wireframes and interactive prototypes to visualize the user experience before development.'
            },
            {
                step: 3,
                title: 'Development',
                description: 'We build your frontend using modern frameworks, following best practices and coding standards.'
            },
            {
                step: 4,
                title: 'Testing & Optimization',
                description: 'Thorough testing across devices and browsers, plus performance optimization for the best user experience.'
            },
            {
                step: 5,
                title: 'Deployment & Support',
                description: 'We deploy your application and provide ongoing support, maintenance, and updates.'
            }
        ],
        color: 'from-primary to-accent',
        gradient: 'from-gray-700 to-gray-800'
    },
    {
        id: 'backend',
        title: 'Backend Development',
        shortDescription: 'Build robust, scalable server-side applications with enterprise-grade architecture and security.',
        longDescription: 'Our backend development expertise enables you to build powerful, secure, and scalable server-side applications. We design and implement robust APIs, manage complex databases, and ensure your application can handle growth. From microservices to monolithic architectures, we choose the right approach for your specific needs, always prioritizing security, performance, and maintainability.',
        icon: Server,
        technologies: ['Node.js', 'Express', 'Django', 'Spring Boot', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
        features: [
            'RESTful APIs',
            'Database Design',
            'Authentication & Security',
            'Microservices Architecture',
            'API Documentation',
            'Caching Strategies',
            'Queue Management',
            'Error Handling & Logging'
        ],
        useCases: [
            'E-commerce platforms with inventory and payment systems',
            'SaaS applications with multi-tenancy support',
            'Real-time applications with WebSocket connections',
            'Data processing and analytics platforms',
            'Content management systems',
            'Integration services connecting multiple platforms'
        ],
        benefits: [
            'Scalable architecture that grows with your business',
            'Enhanced security with industry best practices',
            'Optimized performance for fast response times',
            'Reliable APIs with comprehensive documentation',
            'Cost-effective cloud infrastructure',
            'Seamless third-party integrations'
        ],
        process: [
            {
                step: 1,
                title: 'Architecture Design',
                description: 'We design a scalable backend architecture that meets your current and future requirements.'
            },
            {
                step: 2,
                title: 'Database Design',
                description: 'Efficient database schema design ensuring data integrity and optimal performance.'
            },
            {
                step: 3,
                title: 'API Development',
                description: 'We build robust APIs with proper authentication, validation, and error handling.'
            },
            {
                step: 4,
                title: 'Security & Testing',
                description: 'Comprehensive security measures and thorough testing to ensure reliability and safety.'
            },
            {
                step: 5,
                title: 'Deployment & Monitoring',
                description: 'Cloud deployment with monitoring, logging, and continuous optimization.'
            }
        ],
        color: 'from-accent to-secondary',
        gradient: 'from-gray-600 to-gray-700'
    },
    {
        id: 'mobile',
        title: 'Mobile App Development',
        shortDescription: 'Develop native and cross-platform mobile applications that deliver exceptional user experiences.',
        longDescription: 'Transform your ideas into powerful mobile applications that users love. We specialize in both native and cross-platform development, choosing the best approach based on your requirements. Whether you need an iOS app, Android app, or both, we deliver high-performance applications with beautiful interfaces and seamless user experiences. Our mobile apps are optimized for performance, battery life, and user engagement.',
        icon: Smartphone,
        technologies: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Dart', 'Java', 'SwiftUI', 'Firebase', 'App Store Connect'],
        features: [
            'Cross-platform Development',
            'Native Performance',
            'App Store Optimization',
            'Push Notifications',
            'Offline Capabilities',
            'Biometric Authentication',
            'In-App Purchases',
            'Analytics Integration'
        ],
        useCases: [
            'Consumer mobile apps with engaging user experiences',
            'Enterprise mobile solutions for internal use',
            'E-commerce mobile applications',
            'Social networking and community apps',
            'Health and fitness tracking applications',
            'On-demand service platforms'
        ],
        benefits: [
            'Reach users on both iOS and Android platforms',
            'Native-like performance with faster development',
            'Reduced development and maintenance costs',
            'Consistent user experience across devices',
            'Faster time to market',
            'Access to native device features'
        ],
        process: [
            {
                step: 1,
                title: 'Requirements & Strategy',
                description: 'We analyze your target audience and define app requirements, features, and platform strategy.'
            },
            {
                step: 2,
                title: 'UI/UX Design',
                description: 'Mobile-first design that creates intuitive and engaging user experiences.'
            },
            {
                step: 3,
                title: 'Development',
                description: 'We build your app using the best mobile frameworks, ensuring optimal performance.'
            },
            {
                step: 4,
                title: 'Testing & QA',
                description: 'Comprehensive testing across devices, OS versions, and use cases to ensure quality.'
            },
            {
                step: 5,
                title: 'Launch & Maintenance',
                description: 'App store submission, launch support, and ongoing updates and improvements.'
            }
        ],
        color: 'from-secondary to-primary',
        gradient: 'from-gray-800 to-gray-900'
    },
    {
        id: 'ai',
        title: 'Artificial Intelligence',
        shortDescription: 'Leverage AI and machine learning to create intelligent solutions that transform your business.',
        longDescription: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent applications. Our AI solutions range from machine learning models to natural language processing, computer vision, and predictive analytics. We help businesses leverage AI to improve efficiency, make data-driven decisions, and create innovative products. Whether you need chatbots, recommendation systems, or custom AI models, we have the expertise to deliver.',
        icon: Brain,
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Scikit-learn', 'Pandas'],
        features: [
            'Machine Learning Models',
            'Natural Language Processing',
            'Computer Vision',
            'Predictive Analytics',
            'Chatbots & Virtual Assistants',
            'Recommendation Systems',
            'Data Analysis & Insights',
            'Automation & Optimization'
        ],
        useCases: [
            'Intelligent chatbots for customer support',
            'Predictive analytics for business forecasting',
            'Image recognition and classification systems',
            'Personalized recommendation engines',
            'Automated content generation',
            'Fraud detection and security systems'
        ],
        benefits: [
            'Automated processes reducing manual work',
            'Data-driven insights for better decisions',
            'Improved customer experiences',
            'Cost reduction through efficiency',
            'Competitive advantage with innovation',
            'Scalable AI solutions for growth'
        ],
        process: [
            {
                step: 1,
                title: 'Problem Analysis',
                description: 'We identify AI opportunities in your business and define clear objectives.'
            },
            {
                step: 2,
                title: 'Data Collection & Preparation',
                description: 'Gathering and preparing high-quality data for model training and validation.'
            },
            {
                step: 3,
                title: 'Model Development',
                description: 'Building and training AI/ML models tailored to your specific use case.'
            },
            {
                step: 4,
                title: 'Integration & Testing',
                description: 'Integrating AI solutions into your systems with thorough testing and validation.'
            },
            {
                step: 5,
                title: 'Deployment & Monitoring',
                description: 'Deploying models to production with continuous monitoring and improvement.'
            }
        ],
        color: 'from-primary to-secondary',
        gradient: 'from-gray-500 to-gray-600'
    }
];

const ServiceDetailPage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = serviceDetails.find(s => s.id === serviceId);

    if (!service) {
        return (
            <div className="min-h-screen bg-background relative">
                <AnimatedBackground />
                <div className="relative z-10">
                    <Header />
                    <main className="flex items-center justify-center min-h-[80vh]">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                            <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
                            <Link to="/#services">
                                <Button className="glass-button">Back to Services</Button>
                            </Link>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative">
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <main>
                    {/* Hero Section */}
                    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <Link to="/#services">
                                    <InteractiveButton
                                        variant="outline"
                                        className="mb-8 glass-button"
                                        glowEffect={true}
                                    >
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back to Services
                                    </InteractiveButton>
                                </Link>
                            </AnimatedContainer>

                            <div className="max-w-5xl mx-auto">
                                {/* Title and Icon Section */}
                                <AnimatedContainer delay={0.2} direction="up" distance={50}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                                        <motion.div
                                            whileHover={{ 
                                                rotate: 360, 
                                                scale: 1.1,
                                                boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className={`relative p-6 rounded-2xl bg-gradient-to-br ${service.color} shadow-2xl flex-shrink-0`}
                                        >
                                            <service.icon size={56} className="text-white relative z-10" />
                                            {/* Animated glow behind icon */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.5, 0.8, 0.5]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl`}
                                            />
                                        </motion.div>
                                        <div className="flex-1">
                                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight" style={{ wordBreak: 'normal', overflowWrap: 'normal', whiteSpace: 'normal', hyphens: 'none' }}>
                                                <WaveText delay={0.3} color="primary" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                                                    {service.title}
                                                </WaveText>
                                            </h1>
                                            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                                        </div>
                                    </div>
                                </AnimatedContainer>

                                {/* Description Card */}
                                <AnimatedContainer delay={0.4} direction="up" distance={30}>
                                    <HolographicCard
                                        delay={0.5}
                                        direction="scale"
                                        className="p-8 sm:p-10 md:p-12 relative overflow-hidden"
                                    >
                                        {/* Background gradient effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-lg`} />
                                        
                                        {/* Decorative corner elements */}
                                        <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-full blur-2xl" />
                                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-accent/10 rounded-tl-full blur-2xl" />
                                        
                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6 px-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    className="w-2 h-2 rounded-full bg-primary"
                                                />
                                                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                                                    Overview
                                                </span>
                                            </div>
                                            <p 
                                                className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed px-2"
                                                style={{ 
                                                    wordBreak: 'normal', 
                                                    overflowWrap: 'break-word',
                                                    wordSpacing: 'normal',
                                                    hyphens: 'none',
                                                    WebkitHyphens: 'none',
                                                    MozHyphens: 'none',
                                                    whiteSpace: 'normal'
                                                }}
                                            >
                                                <RevealText delay={0.6} direction="up" color="white">
                                                    {service.longDescription}
                                                </RevealText>
                                            </p>
                                            
                                            {/* Bottom accent line */}
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1, duration: 0.8 }}
                                                className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-8 rounded-full"
                                            />
                                        </div>
                                    </HolographicCard>
                                </AnimatedContainer>
                            </div>
                        </div>
                    </section>

                    {/* Technologies Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                                    <ShinyText color="primary" speed={2.5} delay={0.3}>
                                        Technologies We Use
                                    </ShinyText>
                                </h2>
                            </AnimatedContainer>

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {service.technologies.map((tech, index) => (
                                        <AnimatedContainer
                                            key={tech}
                                            delay={0.3 + index * 0.05}
                                            direction="scale"
                                        >
                                            <motion.div
                                                whileHover={{ 
                                                    scale: 1.1, 
                                                    y: -5,
                                                    rotate: [0, -2, 2, 0]
                                                }}
                                                transition={{ 
                                                    duration: 0.3,
                                                    rotate: { duration: 0.5 }
                                                }}
                                                className="relative group"
                                            >
                                                {/* Glow effect */}
                                                <motion.div
                                                    className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                                                    animate={{
                                                        opacity: [0, 0.3, 0],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                
                                                {/* Main badge */}
                                                <div className={`relative px-5 py-3 text-sm font-semibold bg-gradient-to-br from-card to-card/80 text-foreground rounded-xl border border-primary/30 group-hover:border-primary/60 transition-all duration-300 shadow-lg group-hover:shadow-primary/25 backdrop-blur-sm`}>
                                                    {/* Gradient overlay on hover */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`} />
                                                    
                                                    {/* Content */}
                                                    <span className="relative z-10 text-foreground group-hover:text-primary transition-colors duration-300">
                                                        {tech}
                                                    </span>
                                                    
                                                    {/* Corner accent */}
                                                    <div className="absolute top-0 right-0 w-2 h-2 bg-primary/40 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>
                                            </motion.div>
                                        </AnimatedContainer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features & Benefits Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                {/* Features */}
                                <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                    <HolographicCard
                                        delay={0.3}
                                        direction="scale"
                                        className="p-8 h-full"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <Zap size={24} className="text-primary" />
                                            <h2 className="text-2xl font-bold">Key Features</h2>
                                        </div>
                                        <ul className="space-y-4">
                                            {service.features.map((feature, index) => (
                                                <motion.li
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </HolographicCard>
                                </AnimatedContainer>

                                {/* Benefits */}
                                <AnimatedContainer delay={0.4} direction="up" distance={30}>
                                    <HolographicCard
                                        delay={0.5}
                                        direction="scale"
                                        className="p-8 h-full"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <TrendingUp size={24} className="text-accent" />
                                            <h2 className="text-2xl font-bold">Benefits</h2>
                                        </div>
                                        <ul className="space-y-4">
                                            {service.benefits.map((benefit, index) => (
                                                <motion.li
                                                    key={benefit}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Rocket size={20} className="text-accent mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>{benefit}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </HolographicCard>
                                </AnimatedContainer>
                            </div>
                        </div>
                    </section>

                    {/* Use Cases Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                                    <ShinyText color="accent" speed={2.5} delay={0.3}>
                                        Use Cases
                                    </ShinyText>
                                </h2>
                            </AnimatedContainer>

                            <div className="max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {service.useCases.map((useCase, index) => (
                                        <AnimatedContainer
                                            key={useCase}
                                            delay={0.3 + index * 0.1}
                                            direction="up"
                                            distance={30}
                                        >
                                            <HolographicCard
                                                delay={0.3 + index * 0.1}
                                                direction="scale"
                                                className="p-6 sm:p-8 h-full group relative overflow-hidden"
                                            >
                                                {/* Background Gradient Effect */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
                                                
                                                {/* Icon Container */}
                                                <motion.div
                                                    whileHover={{ 
                                                        rotate: 360,
                                                        scale: 1.2
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                                                >
                                                    <Globe size={24} className="text-white" />
                                                    <motion.div
                                                        animate={{ 
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.5, 0.8, 0.5]
                                                        }}
                                                        transition={{ 
                                                            duration: 2, 
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} blur-xl`}
                                                    />
                                                </motion.div>

                                                {/* Content */}
                                                <div className="relative z-10">
                                                    <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors duration-300" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>
                                                        {useCase}
                                                    </p>
                                                </div>

                                                {/* Decorative Elements */}
                                                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary/60 transition-colors duration-300" />
                                                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-accent/30 rounded-full group-hover:bg-accent/60 transition-colors duration-300" />
                                            </HolographicCard>
                                        </AnimatedContainer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                                    <ShinyText color="primary" speed={2.5} delay={0.3}>
                                        Our Process
                                    </ShinyText>
                                </h2>
                            </AnimatedContainer>

                            <div className="max-w-5xl mx-auto">
                                <div className="space-y-8">
                                    {service.process.map((step, index) => (
                                        <AnimatedContainer
                                            key={step.step}
                                            delay={0.3 + index * 0.1}
                                            direction="up"
                                            distance={30}
                                        >
                                            <HolographicCard
                                                delay={0.3 + index * 0.1}
                                                direction="scale"
                                                className="p-6 sm:p-8"
                                            >
                                                <div className="flex items-start gap-6">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                        className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                                                    >
                                                        {step.step}
                                                    </motion.div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold mb-2 text-foreground" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>{step.title}</h3>
                                                        <p className="text-muted-foreground" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}>{step.description}</p>
                                                    </div>
                                                </div>
                                            </HolographicCard>
                                        </AnimatedContainer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <HolographicCard
                                    delay={0.3}
                                    direction="scale"
                                    className="max-w-4xl mx-auto text-center p-8 sm:p-12"
                                >
                                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                        <ShinyText color="primary" speed={2.5} delay={0.4}>
                                            Ready to Get Started?
                                        </ShinyText>
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                        Let's discuss how we can help you achieve your goals with {service.title}.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link to="/#contact">
                                            <InteractiveButton
                                                size="lg"
                                                className="glass-button w-full sm:w-auto"
                                                glowEffect={true}
                                                rippleEffect={true}
                                            >
                                                Get in Touch
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </InteractiveButton>
                                        </Link>
                                        <Link to="/#services">
                                            <InteractiveButton
                                                variant="outline"
                                                size="lg"
                                                className="border-primary/30 text-primary hover:text-white hover:bg-primary/10 w-full sm:w-auto"
                                                glowEffect={true}
                                                rippleEffect={true}
                                            >
                                                View All Services
                                            </InteractiveButton>
                                        </Link>
                                    </div>
                                </HolographicCard>
                            </AnimatedContainer>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default ServiceDetailPage;

