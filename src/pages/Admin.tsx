import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Briefcase,
  Mail,
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Github,
  Tag,
  Star,
  Code,
  Linkedin,
  Twitter,
  Award,
  Zap,
  TrendingUp,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useIsMobile } from '@/hooks/use-mobile';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to convert Tailwind gradient to inline style
const getGradientStyle = (color: string, gradient?: string): React.CSSProperties => {
  const tailwindColorMap: Record<string, string> = {
    'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937', 'gray-900': '#111827',
    'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8', 'blue-800': '#1e40af',
    'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7e22ce', 'purple-800': '#6b21a8',
    'pink-500': '#ec4899', 'pink-600': '#db2777', 'pink-700': '#be185d',
    'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
    'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c',
    'yellow-500': '#eab308', 'yellow-600': '#ca8a04',
    'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
    'teal-500': '#14b8a6', 'teal-600': '#0d9488', 'teal-700': '#0f766e',
    'cyan-500': '#06b6d4', 'cyan-600': '#0891b2', 'cyan-700': '#0e7490',
    'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
    'violet-500': '#8b5cf6', 'violet-600': '#7c3aed', 'violet-700': '#6d28d9',
  };

  const isHexColor = (c: string): boolean => /^#[0-9A-F]{6}$/i.test(c);
  
  const getColorHex = (colorName: string): string => {
    if (isHexColor(colorName)) return colorName;
    const baseColor = colorName.split('/')[0];
    return tailwindColorMap[baseColor] || '#6b7280';
  };

  const parseGradientString = (gradStr: string): { from: string; to: string } => {
    if (!gradStr) return { from: 'gray-700', to: 'gray-800' };
    
    const cleaned = gradStr.replace(/\[+/g, '[').replace(/\]+/g, ']');
    
    // Handle: from-[#ff0000] to-[#000000] or from-[purple-500/20] to-[gray-800]
    let match = cleaned.match(/from-\[([^\]]+)\]\s+to-\[([^\]]+)\]/);
    if (match) {
      return { from: match[1].trim(), to: match[2].trim() };
    }
    
    // Handle: from-gray-700 to-gray-800 or from-blue-500/20 to-purple-500/20
    match = cleaned.match(/from-(\S+)\s+to-(\S+)/);
    if (match) {
      return { 
        from: match[1].replace(/^\[+|\]+$/g, '').trim(), 
        to: match[2].replace(/^\[+|\]+$/g, '').trim() 
      };
    }
    
    // Handle mixed formats
    match = cleaned.match(/from-\[([^\]]+)\]\s+to-(\S+)/);
    if (match) {
      return { from: match[1].trim(), to: match[2].replace(/^\[+|\]+$/g, '').trim() };
    }
    
    match = cleaned.match(/from-(\S+)\s+to-\[([^\]]+)\]/);
    if (match) {
      return { from: match[1].replace(/^\[+|\]+$/g, '').trim(), to: match[2].trim() };
    }
    
    return { from: 'gray-700', to: 'gray-800' };
  };

  const gradientStr = gradient || color.replace('bg-gradient-to-br ', '');
  const { from, to } = parseGradientString(gradientStr);
  
  return {
    background: `linear-gradient(to bottom right, ${getColorHex(from)}, ${getColorHex(to)})`,
  };
};

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  link: string;
  github: string;
  category: string;
  featured: boolean;
  order: number;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  experience: string;
  projects: string;
  rating: number;
  color: string;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  order: number;
}

interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  color: string;
  gradient: string;
  bgPattern: string;
  order: number;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  read: boolean;
  responded: boolean;
  createdAt: string;
}

type ActiveTab = 'dashboard' | 'projects' | 'team' | 'services' | 'contacts';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dialog states
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedContacts, setExpandedContacts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        setToken(null);
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setToken(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin panel!',
        });
      } else {
        const error = await response.json();
        toast({
          title: 'Login Failed',
          description: error.error || 'Invalid secret key',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect to server',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const fetchData = async () => {
    try {
      const headers = getAuthHeaders();
      
      if (activeTab === 'projects' || activeTab === 'dashboard') {
        const res = await fetch(`${API_URL}/projects`, { headers });
        if (res.ok) setProjects(await res.json());
      }
      
      if (activeTab === 'team' || activeTab === 'dashboard') {
        const res = await fetch(`${API_URL}/team`, { headers });
        if (res.ok) setTeamMembers(await res.json());
      }
      
      if (activeTab === 'services' || activeTab === 'dashboard') {
        const res = await fetch(`${API_URL}/services`, { headers });
        if (res.ok) setServices(await res.json());
      }
      
      if (activeTab === 'contacts' || activeTab === 'dashboard') {
        const res = await fetch(`${API_URL}/contact`, { headers });
        if (res.ok) setContacts(await res.json());
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive',
      });
    }
  };

  // Route mapping to match backend routes
  const getRoutePath = (type: 'project' | 'team' | 'service'): string => {
    const routeMap: Record<string, string> = {
      project: 'projects',
      team: 'team', // Backend uses singular 'team'
      service: 'services'
    };
    return routeMap[type] || type;
  };

  const handleDelete = async (type: 'project' | 'team' | 'service', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const routePath = getRoutePath(type);
      const response = await fetch(`${API_URL}/${routePath}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        toast({ title: 'Success', description: 'Item deleted successfully' });
        fetchData();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const handleSave = async (type: 'project' | 'team' | 'service', data: any) => {
    try {
      const routePath = getRoutePath(type);
      const url = isEditMode
        ? `${API_URL}/${routePath}/${selectedItem._id}`
        : `${API_URL}/${routePath}`;
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: `Item ${isEditMode ? 'updated' : 'created'} successfully`,
        });
        setProjectDialogOpen(false);
        setTeamDialogOpen(false);
        setServiceDialogOpen(false);
        setSelectedItem(null);
        setIsEditMode(false);
        fetchData();
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to save',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save',
        variant: 'destructive',
      });
    }
  };

  const toggleContactExpanded = (id: string) => {
    setExpandedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 max-w-md w-full mx-4 relative z-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center gradient-text">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter admin secret key"
                required
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full glass-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Sidebar component
  const SidebarContent = () => (
    <div className="w-64 bg-background/80 backdrop-blur-lg border-r border-border p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 gradient-text">Admin Panel</h2>
      <nav className="space-y-2 flex-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'projects', label: 'Projects', icon: FolderOpen },
          { id: 'team', label: 'Team', icon: Users },
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'contacts', label: 'Contacts', icon: Mail },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id as ActiveTab);
              if (isMobile) setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full"
      >
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10 flex h-screen">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="hidden md:block"
          >
            <SidebarContent />
          </motion.div>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-64 p-0 bg-background/80 backdrop-blur-lg">
              <SidebarContent />
            </SheetContent>
            <SheetTrigger asChild>
              <button className="hidden">Trigger</button>
            </SheetTrigger>
          </Sheet>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </Button>
            </div>
          )}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {!isMobile && <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6">
                  <div className="text-3xl font-bold mb-2">{projects.length}</div>
                  <div className="text-muted-foreground">Projects</div>
                </div>
                <div className="glass-card p-6">
                  <div className="text-3xl font-bold mb-2">{teamMembers.length}</div>
                  <div className="text-muted-foreground">Team Members</div>
                </div>
                <div className="glass-card p-6">
                  <div className="text-3xl font-bold mb-2">{services.length}</div>
                  <div className="text-muted-foreground">Services</div>
                </div>
                <div className="glass-card p-6">
                  <div className="text-3xl font-bold mb-2">{contacts.length}</div>
                  <div className="text-muted-foreground">Contacts</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {!isMobile && <h1 className="text-4xl font-bold gradient-text">Projects</h1>}
                <Button
                  onClick={() => {
                    setSelectedItem(null);
                    setIsEditMode(false);
                    setProjectDialogOpen(true);
                  }}
                  className="glass-button w-full sm:w-auto"
                >
                  <Plus size={20} className="mr-2" />
                  Add Project
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="glass-card p-6 flex flex-col h-full">
                    {/* Project Image */}
                    {project.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="mb-2 flex items-center gap-1 text-sm text-primary">
                        <Star size={14} className="fill-primary" />
                        <span className="font-medium">Featured</span>
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    
                    {/* Short Description */}
                    <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{project.shortDescription}</p>
                    
                    {/* Category */}
                    <div className="mb-3 flex items-center gap-2">
                      <Tag size={14} className="text-muted-foreground" />
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Code size={14} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">Technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-muted/50 text-foreground rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Features Preview */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Features</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {project.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {project.features.length > 2 && (
                            <li className="text-muted-foreground">
                              +{project.features.length - 2} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {/* Links */}
                    {(project.link || project.github) && (
                      <div className="mb-4 flex gap-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                          >
                            <ExternalLink size={12} />
                            <span>View Project</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                          >
                            <Github size={12} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(project);
                          setIsEditMode(true);
                          setProjectDialogOpen(true);
                        }}
                        className="flex-1"
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('project', project._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {!isMobile && <h1 className="text-4xl font-bold gradient-text">Team</h1>}
                <Button
                  onClick={() => {
                    setSelectedItem(null);
                    setIsEditMode(false);
                    setTeamDialogOpen(true);
                  }}
                  className="glass-button w-full sm:w-auto"
                >
                  <Plus size={20} className="mr-2" />
                  Add Member
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member._id} className="glass-card p-6 flex flex-col h-full">
                    {/* Team Member Image */}
                    <div className="mb-4 flex items-center gap-4">
                      {member.image ? (
                        <div className="relative">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="%23999"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-weight="bold">${member.name.split(' ').map(n => n[0]).join('')}</text></svg>`)}`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-primary text-sm font-medium">{member.role}</p>
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{member.bio}</p>
                    
                    {/* Specialty */}
                    <div className="mb-3 flex items-center gap-2">
                      <Award size={14} className="text-muted-foreground" />
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {member.specialty}
                      </span>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-muted/30 rounded-lg p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp size={12} className="text-primary" />
                          <span className="text-xs text-muted-foreground">Experience</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{member.experience}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <FolderOpen size={12} className="text-primary" />
                          <span className="text-xs text-muted-foreground">Projects</span>
                        </div>
                        <p className="text-sm font-bold text-foreground">{member.projects}</p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    {member.rating && (
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Rating:</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < member.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({member.rating}/5)</span>
                      </div>
                    )}
                    
                    {/* Social Links */}
                    {member.social && (member.social.github || member.social.linkedin || member.social.twitter) && (
                      <div className="mb-4 flex gap-2">
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="GitHub"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="Twitter"
                          >
                            <Twitter size={16} />
                          </a>
                        )}
                      </div>
                    )}
                    
                    {/* Color Gradient Info */}
                    {member.color && (
                      <div className="mb-3 flex items-center gap-2">
                        <div className={`w-4 h-4 rounded bg-gradient-to-br ${member.color}`}></div>
                        <span className="text-xs text-muted-foreground font-mono">{member.color}</span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(member);
                          setIsEditMode(true);
                          setTeamDialogOpen(true);
                        }}
                        className="flex-1"
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('team', member._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {!isMobile && <h1 className="text-4xl font-bold gradient-text">Services</h1>}
                <Button
                  onClick={() => {
                    setSelectedItem(null);
                    setIsEditMode(false);
                    setServiceDialogOpen(true);
                  }}
                  className="glass-button w-full sm:w-auto"
                >
                  <Plus size={20} className="mr-2" />
                  Add Service
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="glass-card p-6 flex flex-col h-full">
                    {/* Service ID Badge */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-mono">
                          {service.id}
                        </span>
                        {service.order !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            Order: {service.order}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{service.description}</p>
                    
                    {/* Color Gradient Preview */}
                    {service.color && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-muted-foreground">Color Theme</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-full h-12 rounded-lg border border-border"
                            style={getGradientStyle(service.color, service.gradient)}
                          ></div>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded border border-border"
                            style={getGradientStyle(service.color, service.gradient)}
                          ></div>
                          <span className="text-xs text-muted-foreground font-mono truncate">
                            {service.gradient || service.color.replace('bg-gradient-to-br ', '')}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    {service.technologies && service.technologies.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Code size={14} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">Technologies</span>
                          <span className="text-xs text-muted-foreground">({service.technologies.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-muted/50 text-foreground rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 4 && (
                            <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded">
                              +{service.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={14} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">Features</span>
                          <span className="text-xs text-muted-foreground">({service.features.length})</span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-muted-foreground">
                              +{service.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {/* Background Pattern Info */}
                    {service.bgPattern && (
                      <div className="mb-3 p-2 bg-muted/20 rounded text-xs">
                        <span className="text-muted-foreground">Pattern: </span>
                        <span className="font-mono text-xs break-all">{service.bgPattern}</span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedItem(service);
                          setIsEditMode(true);
                          setServiceDialogOpen(true);
                        }}
                        className="flex-1"
                      >
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('service', service._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              {!isMobile && <h1 className="text-4xl font-bold gradient-text">Contact Submissions</h1>}
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`glass-card p-6 ${!contact.read ? 'border-l-4 border-primary' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{contact.name}</h3>
                        <p className="text-primary">{contact.email}</p>
                        {contact.company && (
                          <p className="text-muted-foreground text-sm">{contact.company}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!contact.read && (
                          <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded">
                            New
                          </span>
                        )}
                        {contact.responded && (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded">
                            Responded
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleContactExpanded(contact._id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
                    >
                      {expandedContacts.has(contact._id) ? (
                        <>
                          <ChevronUp size={16} />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          <span>Show Message</span>
                        </>
                      )}
                    </button>
                    {expandedContacts.has(contact._id) && (
                      <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{contact.message}</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      {!contact.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={async () => {
                            await fetch(`${API_URL}/contact/${contact._id}/read`, {
                              method: 'PUT',
                              headers: getAuthHeaders()
                            });
                            fetchData();
                          }}
                        >
                          Mark as Read
                        </Button>
                      )}
                      {!contact.responded && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={async () => {
                            await fetch(`${API_URL}/contact/${contact._id}/responded`, {
                              method: 'PUT',
                              headers: getAuthHeaders()
                            });
                            fetchData();
                          }}
                        >
                          Mark as Responded
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={async () => {
                          if (confirm('Delete this contact submission?')) {
                            await fetch(`${API_URL}/contact/${contact._id}`, {
                              method: 'DELETE',
                              headers: getAuthHeaders()
                            });
                            fetchData();
                          }
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Dialog */}
      <ProjectDialog
        open={projectDialogOpen}
        onClose={() => {
          setProjectDialogOpen(false);
          setSelectedItem(null);
          setIsEditMode(false);
        }}
        project={selectedItem}
        isEditMode={isEditMode}
        onSave={(data) => handleSave('project', data)}
        token={token}
      />

      {/* Team Dialog */}
      <TeamDialog
        open={teamDialogOpen}
        onClose={() => {
          setTeamDialogOpen(false);
          setSelectedItem(null);
          setIsEditMode(false);
        }}
        member={selectedItem}
        isEditMode={isEditMode}
        onSave={(data) => handleSave('team', data)}
        token={token}
      />

      {/* Service Dialog */}
      <ServiceDialog
        open={serviceDialogOpen}
        onClose={() => {
          setServiceDialogOpen(false);
          setSelectedItem(null);
          setIsEditMode(false);
        }}
        service={selectedItem}
        isEditMode={isEditMode}
        onSave={(data) => handleSave('service', data)}
      />
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ value, onChange, label = "Image", token }: { value: string; onChange: (url: string) => void; label?: string; token: string | null }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Image must be less than 10MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type - browser will set it with boundary for FormData
        },
        body: uploadFormData,
      });

      const responseData = await response.json();

      if (response.ok) {
        onChange(responseData.url);
        toast({
          title: 'Upload Successful',
          description: 'Image uploaded to Cloudinary',
        });
      } else {
        console.error('Upload failed:', responseData);
        toast({
          title: 'Upload Failed',
          description: responseData.error || responseData.message || 'Failed to upload image',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Error',
        description: error.message || 'Failed to upload image. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload file"
          className="flex-1"
        />
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading || !token}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading || !token}
            className="gap-2"
            onClick={handleUploadClick}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload size={16} />
                Upload
              </>
            )}
          </Button>
        </>
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

// Project Dialog Component
const ProjectDialog = ({ open, onClose, project, isEditMode, onSave, token }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    technologies: '',
    features: '',
    link: '',
    github: '',
    category: 'web',
    featured: false,
    order: 0
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        image: project.image || '',
        technologies: project.technologies?.join(', ') || '',
        features: project.features?.join(', ') || '',
        link: project.link || '',
        github: project.github || '',
        category: project.category || 'web',
        featured: project.featured || false,
        order: project.order || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        image: '',
        technologies: '',
        features: '',
        link: '',
        github: '',
        category: 'web',
        featured: false,
        order: 0
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
      features: formData.features.split(',').map((f: string) => f.trim()).filter(Boolean)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{isEditMode ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Short Description *</Label>
            <Input
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Project Image"
            token={token}
          />
          <div>
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div>
            <Label>Features (comma-separated)</Label>
            <Input
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Responsive, Fast, Secure"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Link</Label>
              <Input
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
            <div>
              <Label>GitHub</Label>
              <Input
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Featured
            </Label>
            <div>
              <Label>Order</Label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="glass-button w-full sm:w-auto">
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Team Dialog Component
const TeamDialog = ({ open, onClose, member, isEditMode, onSave, token }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    specialty: '',
    experience: '',
    projects: '',
    rating: 5,
    color: 'from-primary to-accent',
    image: '',
    social: { github: '', linkedin: '', twitter: '' },
    order: 0
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        bio: member.bio || '',
        specialty: member.specialty || '',
        experience: member.experience || '',
        projects: member.projects || '',
        rating: member.rating || 5,
        color: member.color || 'from-primary to-accent',
        image: member.image || '',
        social: member.social || { github: '', linkedin: '', twitter: '' },
        order: member.order || 0
      });
    } else {
      setFormData({
        name: '',
        role: '',
        bio: '',
        specialty: '',
        experience: '',
        projects: '',
        rating: 5,
        color: 'from-primary to-accent',
        image: '',
        social: { github: '', linkedin: '', twitter: '' },
        order: 0
      });
    }
  }, [member, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{isEditMode ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Role *</Label>
            <Input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Bio *</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Specialty *</Label>
              <Input
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Experience</Label>
              <Input
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>
            <div>
              <Label>Projects</Label>
              <Input
                value={formData.projects}
                onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
              />
            </div>
          </div>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Team Member Image"
            token={token}
          />
          <div>
            <Label>Color Gradient</Label>
            <Input
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="from-primary to-accent"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold mb-2 block">Social Links</Label>
            <div className="space-y-2">
              <Input
                placeholder="GitHub URL"
                value={formData.social.github}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, github: e.target.value }
                })}
              />
              <Input
                placeholder="LinkedIn URL"
                value={formData.social.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, linkedin: e.target.value }
                })}
              />
              <Input
                placeholder="Twitter URL"
                value={formData.social.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, twitter: e.target.value }
                })}
              />
            </div>
          </div>
          <div>
            <Label>Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="glass-button w-full sm:w-auto">
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Gradient Color Picker Component
const GradientColorPicker = ({ value, onChange }: { value: { color: string; gradient: string }; onChange: (color: string, gradient: string) => void }) => {
  // Tailwind color palette mapping
  const tailwindColorMap: Record<string, string> = {
    'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937', 'gray-900': '#111827',
    'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8', 'blue-800': '#1e40af',
    'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7e22ce', 'purple-800': '#6b21a8',
    'pink-500': '#ec4899', 'pink-600': '#db2777', 'pink-700': '#be185d',
    'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
    'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c',
    'yellow-500': '#eab308', 'yellow-600': '#ca8a04',
    'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
    'teal-500': '#14b8a6', 'teal-600': '#0d9488', 'teal-700': '#0f766e',
    'cyan-500': '#06b6d4', 'cyan-600': '#0891b2', 'cyan-700': '#0e7490',
    'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
    'violet-500': '#8b5cf6', 'violet-600': '#7c3aed', 'violet-700': '#6d28d9',
  };

  // Check if a string is a hex color
  const isHexColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  // Clean color string - remove any brackets if present and fix malformed input
  const cleanColor = (color: string): string => {
    if (!color) return '';
    // Remove all leading/trailing brackets
    let cleaned = color.trim().replace(/^\[+|\]+$/g, '');
    // If there are brackets in the middle (like [purple-500/20]), keep only the content
    if (cleaned.includes('[') || cleaned.includes(']')) {
      // Extract content between brackets
      const bracketMatch = cleaned.match(/\[([^\]]+)\]/);
      if (bracketMatch) {
        cleaned = bracketMatch[1];
      } else {
        // Remove all brackets if they're malformed
        cleaned = cleaned.replace(/[\[\]]+/g, '');
      }
    }
    return cleaned.trim();
  };

  // Check if color needs brackets (hex, opacity, or special characters)
  const needsBrackets = (color: string): boolean => {
    return isHexColor(color) || color.includes('/') || color.includes('[') || color.includes(']');
  };

  // Parse existing gradient to extract colors
  const parseGradient = (gradient: string): { from: string; to: string } => {
    if (!gradient) {
      return { from: 'gray-700', to: 'gray-800' };
    }

    // Clean up any malformed brackets first
    const cleaned = gradient.replace(/\[+/g, '[').replace(/\]+/g, ']');
    
    // Handle Tailwind format with brackets: from-[#ff0000] to-[#000000] or from-[purple-500/20] to-[gray-800]
    let match = cleaned.match(/from-\[([^\]]+)\]\s+to-\[([^\]]+)\]/);
    if (match) {
      return { from: match[1].trim(), to: match[2].trim() };
    }
    
    // Handle Tailwind format: from-gray-700 to-gray-800 or from-blue-500/20 to-purple-500/20
    match = cleaned.match(/from-(\S+)\s+to-(\S+)/);
    if (match) {
      // Clean brackets if present
      return { 
        from: match[1].replace(/^\[+|\]+$/g, '').trim(), 
        to: match[2].replace(/^\[+|\]+$/g, '').trim() 
      };
    }
    
    // Handle mixed format: from-[#ff0000] to-gray-800
    match = cleaned.match(/from-\[([^\]]+)\]\s+to-(\S+)/);
    if (match) {
      return { 
        from: match[1].trim(), 
        to: match[2].replace(/^\[+|\]+$/g, '').trim() 
      };
    }
    
    // Handle reverse mixed: from-gray-700 to-[#000000]
    match = cleaned.match(/from-(\S+)\s+to-\[([^\]]+)\]/);
    if (match) {
      return { 
        from: match[1].replace(/^\[+|\]+$/g, '').trim(), 
        to: match[2].trim() 
      };
    }
    
    // Default fallback
    return { from: 'gray-700', to: 'gray-800' };
  };

  const initialColors = parseGradient(value.gradient || 'from-gray-700 to-gray-800');
  const [fromColor, setFromColor] = useState(cleanColor(initialColors.from));
  const [toColor, setToColor] = useState(cleanColor(initialColors.to));

  useEffect(() => {
    if (value.gradient) {
      const parsed = parseGradient(value.gradient);
      const cleanFrom = cleanColor(parsed.from);
      const cleanTo = cleanColor(parsed.to);
      setFromColor(cleanFrom);
      setToColor(cleanTo);
    }
  }, [value.gradient, value.color]);

  const handleFromColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const newFrom = cleanColor(rawValue);
    
    // Only update if we have a valid color after cleaning
    if (newFrom && newFrom.length > 0) {
      setFromColor(newFrom);
      
      const fromNeedsBrackets = needsBrackets(newFrom);
      const toNeedsBrackets = needsBrackets(cleanColor(toColor));
      const cleanToColor = cleanColor(toColor);
      
      const fromPart = fromNeedsBrackets ? `from-[${newFrom}]` : `from-${newFrom}`;
      const toPart = toNeedsBrackets ? `to-[${cleanToColor}]` : `to-${cleanToColor}`;
      const newGradient = `${fromPart} ${toPart}`;
      const newColor = `bg-gradient-to-br ${newGradient}`;
      onChange(newColor, newGradient);
    }
  };

  const handleToColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const newTo = cleanColor(rawValue);
    
    // Only update if we have a valid color after cleaning
    if (newTo && newTo.length > 0) {
      setToColor(newTo);
      
      const fromNeedsBrackets = needsBrackets(cleanColor(fromColor));
      const toNeedsBrackets = needsBrackets(newTo);
      const cleanFromColor = cleanColor(fromColor);
      
      const fromPart = fromNeedsBrackets ? `from-[${cleanFromColor}]` : `from-${cleanFromColor}`;
      const toPart = toNeedsBrackets ? `to-[${newTo}]` : `to-${newTo}`;
      const newGradient = `${fromPart} ${toPart}`;
      const newColor = `bg-gradient-to-br ${newGradient}`;
      onChange(newColor, newGradient);
    }
  };

  // Common Tailwind color options
  const tailwindColors = [
    { label: 'Gray', values: ['gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900'] },
    { label: 'Blue', values: ['blue-500', 'blue-600', 'blue-700', 'blue-800'] },
    { label: 'Purple', values: ['purple-500', 'purple-600', 'purple-700', 'purple-800'] },
    { label: 'Pink', values: ['pink-500', 'pink-600', 'pink-700'] },
    { label: 'Red', values: ['red-500', 'red-600', 'red-700'] },
    { label: 'Orange', values: ['orange-500', 'orange-600', 'orange-700'] },
    { label: 'Yellow', values: ['yellow-500', 'yellow-600'] },
    { label: 'Green', values: ['green-500', 'green-600', 'green-700'] },
    { label: 'Teal', values: ['teal-500', 'teal-600', 'teal-700'] },
    { label: 'Cyan', values: ['cyan-500', 'cyan-600', 'cyan-700'] },
    { label: 'Indigo', values: ['indigo-500', 'indigo-600', 'indigo-700'] },
    { label: 'Violet', values: ['violet-500', 'violet-600', 'violet-700'] },
  ];

  // Get hex value from color name or hex
  const getColorHex = (color: string): string => {
    // If it's already a hex color, return it
    if (isHexColor(color)) {
      return color;
    }
    // Extract base color name if opacity is present (e.g., "blue-500/20" -> "blue-500")
    const baseColor = color.split('/')[0];
    // If it's a Tailwind color name, look it up
    if (tailwindColorMap[baseColor]) {
      return tailwindColorMap[baseColor];
    }
    // Default fallback
    return '#6b7280';
  };

  // Get display value for color picker input
  const getColorPickerValue = (color: string): string => {
    return getColorHex(color);
  };

  const currentGradientStyle = {
    background: `linear-gradient(to bottom right, ${getColorHex(fromColor)}, ${getColorHex(toColor)})`,
  };

  // Format gradient string - handle both Tailwind and hex colors
  const formatGradient = (from: string, to: string): string => {
    // If using hex colors, we need to format differently
    if (isHexColor(from) || isHexColor(to)) {
      return `from-[${from}] to-[${to}]`;
    }
    return `from-${from} to-${to}`;
  };

  const currentGradient = `bg-gradient-to-br ${formatGradient(fromColor, toColor)}`;

  return (
    <div className="space-y-4">
      <Label>Gradient Colors</Label>
      
      {/* Preview */}
      <div className="relative">
        <div 
          className="w-full h-20 rounded-lg border-2 border-border"
          style={currentGradientStyle}
        ></div>
        <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono">
          {currentGradient}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">From Color</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={fromColor}
              onChange={handleFromColorChange}
              placeholder="gray-700"
              className="flex-1"
            />
            <input
              type="color"
              value={getColorPickerValue(fromColor)}
              onChange={(e) => {
                const hex = e.target.value;
                // Try to find matching Tailwind color, otherwise use hex
                const closest = Object.entries(tailwindColorMap).find(([_, val]) => val.toLowerCase() === hex.toLowerCase());
                const newFrom = closest ? closest[0] : hex;
                const cleanFrom = cleanColor(newFrom);
                const cleanTo = cleanColor(toColor);
                setFromColor(cleanFrom);
                
                const fromNeedsBrackets = needsBrackets(cleanFrom);
                const toNeedsBrackets = needsBrackets(cleanTo);
                
                const fromPart = fromNeedsBrackets ? `from-[${cleanFrom}]` : `from-${cleanFrom}`;
                const toPart = toNeedsBrackets ? `to-[${cleanTo}]` : `to-${cleanTo}`;
                const newGradient = `${fromPart} ${toPart}`;
                onChange(`bg-gradient-to-br ${newGradient}`, newGradient);
              }}
              className="w-12 h-10 rounded border border-border cursor-pointer"
              title="Pick color"
            />
          </div>
        </div>
        <div>
          <Label className="mb-2 block">To Color</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={toColor}
              onChange={handleToColorChange}
              placeholder="gray-800"
              className="flex-1"
            />
            <input
              type="color"
              value={getColorPickerValue(toColor)}
              onChange={(e) => {
                const hex = e.target.value;
                // Try to find matching Tailwind color, otherwise use hex
                const closest = Object.entries(tailwindColorMap).find(([_, val]) => val.toLowerCase() === hex.toLowerCase());
                const newTo = closest ? closest[0] : hex;
                const cleanFrom = cleanColor(fromColor);
                const cleanTo = cleanColor(newTo);
                setToColor(cleanTo);
                
                const fromNeedsBrackets = needsBrackets(cleanFrom);
                const toNeedsBrackets = needsBrackets(cleanTo);
                
                const fromPart = fromNeedsBrackets ? `from-[${cleanFrom}]` : `from-${cleanFrom}`;
                const toPart = toNeedsBrackets ? `to-[${cleanTo}]` : `to-${cleanTo}`;
                const newGradient = `${fromPart} ${toPart}`;
                onChange(`bg-gradient-to-br ${newGradient}`, newGradient);
              }}
              className="w-12 h-10 rounded border border-border cursor-pointer"
              title="Pick color"
            />
          </div>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Quick Select Tailwind Colors</Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {tailwindColors.map((colorGroup) => (
            <div key={colorGroup.label} className="space-y-1">
              <Label className="text-xs font-medium">{colorGroup.label}</Label>
              <div className="flex flex-wrap gap-1">
                {colorGroup.values.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      const cleanFrom = cleanColor(color);
                      const cleanTo = cleanColor(toColor);
                      setFromColor(cleanFrom);
                      const fromNeedsBrackets = needsBrackets(cleanFrom);
                      const toNeedsBrackets = needsBrackets(cleanTo);
                      const fromPart = fromNeedsBrackets ? `from-[${cleanFrom}]` : `from-${cleanFrom}`;
                      const toPart = toNeedsBrackets ? `to-[${cleanTo}]` : `to-${cleanTo}`;
                      const newGradient = `${fromPart} ${toPart}`;
                      onChange(`bg-gradient-to-br ${newGradient}`, newGradient);
                    }}
                    className={`w-8 h-8 rounded border-2 ${
                      cleanColor(fromColor) === color ? 'border-primary ring-2 ring-primary/50' : 'border-border'
                    } hover:scale-110 transition-transform`}
                    style={{ backgroundColor: tailwindColorMap[color] || '#6b7280' }}
                    title={`Set from: ${color}`}
                  />
                ))}
                {colorGroup.values.map((color) => (
                  <button
                    key={`to-${color}`}
                    type="button"
                    onClick={() => {
                      const cleanFrom = cleanColor(fromColor);
                      const cleanTo = cleanColor(color);
                      setToColor(cleanTo);
                      const fromNeedsBrackets = needsBrackets(cleanFrom);
                      const toNeedsBrackets = needsBrackets(cleanTo);
                      const fromPart = fromNeedsBrackets ? `from-[${cleanFrom}]` : `from-${cleanFrom}`;
                      const toPart = toNeedsBrackets ? `to-[${cleanTo}]` : `to-${cleanTo}`;
                      const newGradient = `${fromPart} ${toPart}`;
                      onChange(`bg-gradient-to-br ${newGradient}`, newGradient);
                    }}
                    className={`w-8 h-8 rounded border-2 ${
                      cleanColor(toColor) === color ? 'border-accent ring-2 ring-accent/50' : 'border-border'
                    } hover:scale-110 transition-transform opacity-70`}
                    style={{ backgroundColor: tailwindColorMap[color] || '#6b7280' }}
                    title={`Set to: ${color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Service Dialog Component
const ServiceDialog = ({ open, onClose, service, isEditMode, onSave }: any) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    technologies: '',
    features: '',
    color: 'bg-gradient-to-br from-gray-700 to-gray-800',
    gradient: 'from-gray-700 to-gray-800',
    bgPattern: '',
    order: 0
  });

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id || '',
        title: service.title || '',
        description: service.description || '',
        technologies: service.technologies?.join(', ') || '',
        features: service.features?.join(', ') || '',
        color: service.color || 'bg-gradient-to-br from-gray-700 to-gray-800',
        gradient: service.gradient || 'from-gray-700 to-gray-800',
        bgPattern: service.bgPattern || '',
        order: service.order || 0
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        technologies: '',
        features: '',
        color: 'bg-gradient-to-br from-gray-700 to-gray-800',
        gradient: 'from-gray-700 to-gray-800',
        bgPattern: '',
        order: 0
      });
    }
  }, [service, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
      features: formData.features.split(',').map((f: string) => f.trim()).filter(Boolean)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{isEditMode ? 'Edit Service' : 'Add Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>ID (unique identifier) *</Label>
            <Input
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
              placeholder="frontend"
            />
          </div>
          <div>
            <Label>Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>
          <div>
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div>
            <Label>Features (comma-separated)</Label>
            <Input
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Responsive, Fast, Secure"
            />
          </div>
          <GradientColorPicker
            value={{ color: formData.color, gradient: formData.gradient }}
            onChange={(color, gradient) => setFormData({ ...formData, color, gradient })}
          />
          <div>
            <Label>Background Pattern</Label>
            <Input
              value={formData.bgPattern}
              onChange={(e) => setFormData({ ...formData, bgPattern: e.target.value })}
            />
          </div>
          <div>
            <Label>Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="glass-button w-full sm:w-auto">
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Admin;
