import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Briefcase,
    DollarSign,
    ArrowRight,
    CheckCircle,
    Sparkles,
    Users,
    Code,
    Zap,
    Brain,
    Globe,
    Server,
    Upload,
    FileText
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface JobPosition {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
    icon: any;
    color: string;
}

const positions: JobPosition[] = [
    {
        id: '1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote / On-site',
        type: 'Full-time',
        salary: '$90k - $130k',
        description: 'We are looking for an experienced Full Stack Developer to join our innovative team. You will work on cutting-edge projects using modern technologies and contribute to our mission of transforming digital experiences.',
        requirements: [
            '5+ years of experience in full-stack development',
            'Proficiency in React, Node.js, and TypeScript',
            'Experience with cloud platforms (AWS, Azure)',
            'Strong problem-solving and communication skills',
            'Portfolio of impressive projects'
        ],
        benefits: [
            'Health Insurance',
            'Flexible Working Hours',
            'Remote Work Options',
            'Professional Development',
            'Stock Options'
        ],
        icon: Code,
        color: 'from-primary to-accent'
    },
    {
        id: '2',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote / On-site',
        type: 'Full-time',
        salary: '$70k - $100k',
        description: 'Join our creative team as a UI/UX Designer and help shape the future of user experiences. You will work on exciting projects, creating beautiful and intuitive interfaces that delight users.',
        requirements: [
            '3+ years of UI/UX design experience',
            'Proficiency in Figma, Adobe Creative Suite',
            'Strong portfolio demonstrating design skills',
            'Understanding of user research and testing',
            'Knowledge of design systems'
        ],
        benefits: [
            'Health Insurance',
            'Design Tools Subscription',
            'Flexible Schedule',
            'Creative Freedom',
            'Team Events'
        ],
        icon: Sparkles,
        color: 'from-secondary to-primary'
    },
    {
        id: '3',
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        salary: '$85k - $120k',
        description: 'We need a talented DevOps Engineer to optimize our infrastructure and deployment processes. You will work with cutting-edge cloud technologies and help scale our platform.',
        requirements: [
            '4+ years of DevOps experience',
            'Expertise in Kubernetes, Docker',
            'Experience with CI/CD pipelines',
            'Knowledge of AWS, Azure, or GCP',
            'Scripting skills (Bash, Python)'
        ],
        benefits: [
            'Health Insurance',
            'Remote Work',
            'Learning Budget',
            'Equipment Provided',
            'Flexible Hours'
        ],
        icon: Zap,
        color: 'from-accent to-secondary'
    },
    {
        id: '4',
        title: 'Product Manager',
        department: 'Product',
        location: 'Hybrid',
        type: 'Full-time',
        salary: '$100k - $140k',
        description: 'Lead product strategy and development as our Product Manager. You will collaborate with cross-functional teams to deliver innovative solutions that drive business growth.',
        requirements: [
            '5+ years of product management experience',
            'Strong analytical and strategic thinking',
            'Experience with Agile methodologies',
            'Excellent communication skills',
            'Technical background preferred'
        ],
        benefits: [
            'Health Insurance',
            'Stock Options',
            'Conference Budget',
            'Team Leadership',
            'Career Growth'
        ],
        icon: Brain,
        color: 'from-primary to-secondary'
    },
    {
        id: '5',
        title: 'Marketing Specialist',
        department: 'Marketing',
        location: 'Remote / On-site',
        type: 'Full-time',
        salary: '$60k - $85k',
        description: 'Join our marketing team and help build our brand presence. You will create engaging campaigns, manage digital marketing channels, and drive customer acquisition.',
        requirements: [
            '3+ years of marketing experience',
            'Experience with digital marketing tools',
            'Strong content creation skills',
            'Analytical mindset',
            'Creative thinking'
        ],
        benefits: [
            'Health Insurance',
            'Marketing Budget',
            'Remote Options',
            'Professional Development',
            'Team Collaboration'
        ],
        icon: Globe,
        color: 'from-secondary to-accent'
    },
    {
        id: '6',
        title: 'Backend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        salary: '$80k - $115k',
        description: 'We are seeking a Backend Developer to build scalable and robust server-side applications. Work with modern technologies and contribute to our platform architecture.',
        requirements: [
            '4+ years of backend development experience',
            'Proficiency in Node.js, Python, or Go',
            'Experience with databases (PostgreSQL, MongoDB)',
            'Knowledge of REST and GraphQL APIs',
            'Understanding of microservices architecture'
        ],
        benefits: [
            'Health Insurance',
            'Remote Work',
            'Code Reviews',
            'Tech Stack Freedom',
            'Learning Resources'
        ],
        icon: Server,
        color: 'from-accent to-primary'
    }
];

const JobCard = ({ position, index, onApply }: { position: JobPosition; index: number; onApply: (position: JobPosition) => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ height: '100%' }}
        >

            <HolographicCard
                delay={index * 0.1}
                direction="up"
                distance={30}
                className="h-full flex flex-col"
            >
                <div className="px-6 pt-6 pb-0 sm:px-8 sm:pt-8 flex flex-col h-full justify-between  h-full">
                    {/* Content Area - grows to fill space */}
                    <div className="flex-1 flex flex-col pb-6 ">
                        {/* Header with Icon */}
                        <div className="flex items-start justify-between mb-6">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className={`p-4 rounded-xl bg-gradient-to-br ${position.color} shadow-lg`}
                            >
                                <position.icon size={28} className="text-white" />
                            </motion.div>
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                                {position.type}
                            </span>
                        </div>

                        {/* Title */}
                        <AnimatedContainer delay={index * 0.1 + 0.2} direction="up" distance={20}>
                            <h3 className="text-2xl font-bold mb-2 text-foreground">
                                <RevealText delay={index * 0.1 + 0.3} direction="up" color="primary">
                                    {position.title}
                                </RevealText>
                            </h3>
                        </AnimatedContainer>

                        {/* Department */}
                        <AnimatedContainer delay={index * 0.1 + 0.3} direction="up" distance={20}>
                            <p className="text-primary font-medium mb-4">{position.department}</p>
                        </AnimatedContainer>

                        {/* Info Icons */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin size={16} className="text-primary" />
                                <span className="text-sm">{position.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <DollarSign size={16} className="text-accent" />
                                <span className="text-sm">{position.salary}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                            {position.description}
                        </p>

                        {/* Requirements Preview */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Key Requirements:</h4>
                            <ul className="space-y-2">
                                {position.requirements.slice(0, 3).map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits Preview */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-foreground mb-3">Benefits:</h4>
                            <div className="flex flex-wrap gap-2">
                                {position.benefits.slice(0, 3).map((benefit, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                                    >
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button - Fixed at bottom end */}
                    <div className="mt-auto w-full 8 ">
                        <div className="w-full [&>div]:!w-full [&>div]:!block [&>div>button]:!w-full [&>div>button]:!flex">
                            <InteractiveButton
                                variant="default"
                                className="w-full glass-button group justify-center"
                                glowEffect={true}
                                rippleEffect={true}
                                onClick={() => onApply(position)}
                            >
                                <span>Apply Now</span>
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </InteractiveButton>
                        </div>
                    </div>
                </div>
            </HolographicCard>
        </motion.div>
    );
};

const Careers = () => {
    const { toast } = useToast();
    const positionsRef = useRef<HTMLDivElement>(null);
    const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
    const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null as File | null,
        coverLetter: '',
        position: ''
    });

    const scrollToPositions = () => {
        positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleApply = (position: JobPosition) => {
        setSelectedPosition(position);
        setFormData(prev => ({ ...prev, position: position.title }));
        setApplicationDialogOpen(true);
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would normally send the data to your backend
        // For now, we'll simulate an API call

        // Validate form
        if (!formData.name || !formData.email || !formData.resume) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields and upload your resume.",
                variant: "destructive",
            });
            return;
        }

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Application Submitted! 🎉",
                description: `Your application for ${selectedPosition?.title} has been submitted successfully. We'll review it and get back to you soon.`,
            });
            setApplicationDialogOpen(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                resume: null,
                coverLetter: '',
                position: ''
            });
            setSelectedPosition(null);
        }, 1000);
    };

    const handleResumeUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.resume) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields and upload your resume.",
                variant: "destructive",
            });
            return;
        }

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Resume Submitted! 📄",
                description: "Thank you for your interest! We've received your resume and will keep it on file for future opportunities.",
            });
            setResumeDialogOpen(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                resume: null,
                coverLetter: '',
                position: ''
            });
        }, 1000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                toast({
                    title: "Invalid File Type",
                    description: "Please upload a PDF, DOC, or DOCX file.",
                    variant: "destructive",
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File Too Large",
                    description: "Please upload a file smaller than 5MB.",
                    variant: "destructive",
                });
                return;
            }

            setFormData(prev => ({ ...prev, resume: file }));
        }
    };

    return (
        <div className="min-h-screen bg-background relative">
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <main>
                    {/* Hero Section */}
                    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
                        <div className="container mx-auto px-4 sm:px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <AnimatedContainer delay={0.2} direction="up" distance={50}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8 }}
                                        className="mb-6"
                                    >
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                                            <WaveText delay={0.3} color="primary" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                                                Join Our Team
                                            </WaveText>
                                        </h1>
                                    </motion.div>
                                </AnimatedContainer>

                                <AnimatedContainer delay={0.4} direction="up" distance={30}>
                                    <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                        <RevealText delay={0.6} direction="up" color="primary">
                                            Build the future with us. We're looking for passionate individuals to join our mission of innovation and excellence.
                                        </RevealText>
                                    </p>
                                </AnimatedContainer>

                                <AnimatedContainer delay={0.6} direction="up" distance={20}>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <InteractiveButton
                                            size="lg"
                                            className="glass-button"
                                            glowEffect={true}
                                            rippleEffect={true}
                                            onClick={scrollToPositions}
                                        >
                                            <Users className="mr-2 w-5 h-5" />
                                            Explore Open Positions
                                        </InteractiveButton>
                                    </div>
                                </AnimatedContainer>
                            </div>
                        </div>
                    </section>

                    {/* Why Join Us Section */}
                    <section className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                        <ShinyText color="primary" speed={2.5} delay={0.3}>
                                            Why Join Quantabytes?
                                        </ShinyText>
                                    </h2>
                                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                        We offer more than just a job. We offer a career path filled with growth, innovation, and meaningful work.
                                    </p>
                                </div>
                            </AnimatedContainer>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {[
                                    {
                                        title: 'Innovative Projects',
                                        description: 'Work on cutting-edge technology and challenging problems',
                                        icon: Sparkles,
                                        color: 'from-primary to-accent'
                                    },
                                    {
                                        title: 'Growth Opportunities',
                                        description: 'Continuous learning and professional development',
                                        icon: Zap,
                                        color: 'from-secondary to-primary'
                                    },
                                    {
                                        title: 'Great Culture',
                                        description: 'Collaborative team environment and work-life balance',
                                        icon: Users,
                                        color: 'from-accent to-secondary'
                                    }
                                ].map((benefit, index) => (
                                    <AnimatedContainer
                                        key={index}
                                        delay={0.4 + index * 0.1}
                                        direction="up"
                                        distance={30}
                                    >
                                        <InteractiveCard
                                            delay={0.4 + index * 0.1}
                                            direction="scale"
                                            interactive={true}
                                            glowOnHover={true}
                                            className="text-center p-6"
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.color} mb-4 shadow-lg`}
                                            >
                                                <benefit.icon size={24} className="text-white" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </InteractiveCard>
                                    </AnimatedContainer>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Open Positions Section */}
                    <section ref={positionsRef} id="open-positions" className="py-16 sm:py-20 relative">
                        <div className="container mx-auto px-4 sm:px-6">
                            <AnimatedContainer delay={0.2} direction="up" distance={30}>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                        <ShinyText color="accent" speed={2.5} delay={0.3}>
                                            Open Positions
                                        </ShinyText>
                                    </h2>
                                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                        Explore our current job openings and find the perfect role for you
                                    </p>
                                </div>
                            </AnimatedContainer>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {positions.map((position, index) => (
                                    <JobCard key={position.id} position={position} index={index} onApply={handleApply} />
                                ))}
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
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                        <ShinyText color="primary" speed={2.5} delay={0.4}>
                                            Don't See Your Role?
                                        </ShinyText>
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                        We're always looking for talented individuals. Send us your resume and we'll reach out when a relevant position opens.
                                    </p>
                                    <InteractiveButton
                                        size="lg"
                                        className="glass-button"
                                        glowEffect={true}
                                        rippleEffect={true}
                                        onClick={() => setResumeDialogOpen(true)}
                                    >
                                        <Briefcase className="mr-2 w-5 h-5" />
                                        Send Your Resume
                                    </InteractiveButton>
                                </HolographicCard>
                            </AnimatedContainer>
                        </div>
                    </section>
                </main>
                <Footer />

                {/* Application Dialog */}
                <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-glass-border">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                Apply for {selectedPosition?.title}
                            </DialogTitle>
                            <DialogDescription>
                                Fill out the form below to submit your application. We'll review it and get back to you soon.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmitApplication} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resume" className="block">
                                    Resume/CV * (PDF, DOC, DOCX - Max 5MB)
                                </Label>

                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="resume"
                                        className="w-fit rounded-md border border-input bg-muted px-4 py-2 text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground transition"
                                    >
                                        Choose file
                                    </label>

                                    <Input
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />

                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        {formData.resume ? (
                                            <>
                                                <FileText size={16} />
                                                <span>{formData.resume.name}</span>
                                            </>
                                        ) : (
                                            <span>No file chosen</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverLetter">Cover Letter</Label>
                                <Textarea
                                    id="coverLetter"
                                    placeholder="Tell us why you're interested in this position..."
                                    value={formData.coverLetter}
                                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                    rows={5}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setApplicationDialogOpen(false);
                                        setFormData({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            resume: null,
                                            coverLetter: '',
                                            position: ''
                                        });
                                    }}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 glass-button">
                                    <Briefcase className="mr-2 w-4 h-4" />
                                    Submit Application
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Resume Upload Dialog */}
                <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
                    <DialogContent className="max-w-2xl glass-card border-glass-border">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                Send Your Resume
                            </DialogTitle>
                            <DialogDescription>
                                Don't see a position that matches your skills? Send us your resume and we'll keep you in mind for future opportunities.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleResumeUpload} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="resume-name">Full Name *</Label>
                                <Input
                                    id="resume-name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resume-email">Email *</Label>
                                <Input
                                    id="resume-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resume-phone">Phone Number</Label>
                                <Input
                                    id="resume-phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resume-file" className="block">
                                    Resume/CV * (PDF, DOC, DOCX - Max 5MB)
                                </Label>

                                <div className="flex flex-col gap-2">
                                    {/* Custom Button Trigger */}
                                    <label
                                        htmlFor="resume-file"
                                        className="w-fit rounded-md border border-input bg-muted px-4 py-3 text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground transition"
                                        style={{ minHeight: "24px" }}
                                    >
                                        Choose file
                                    </label>

                                    {/* Hidden File Input */}
                                    <Input
                                        id="resume-file"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />

                                    {/* File Name Display */}
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        {formData.resume ? (
                                            <>
                                                <FileText size={16} />
                                                <span>{formData.resume.name}</span>
                                            </>
                                        ) : (
                                            <span>No file chosen</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setResumeDialogOpen(false);
                                        setFormData({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            resume: null,
                                            coverLetter: '',
                                            position: ''
                                        });
                                    }}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 glass-button">
                                    <Upload className="mr-2 w-4 h-4" />
                                    Upload Resume
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Careers;

