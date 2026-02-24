import { Link, useSearch } from "wouter";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LayoutDashboard, BookOpen, Users, ShoppingBag, BarChart2, Plus, Download, Bold, Italic, Underline, Link as LinkIcon, Code, X, Search, Edit2, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, Move, TrendingUp, DollarSign, Activity, Workflow, Pencil, Check, ExternalLink, Archive, Upload, Palette } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import PipelineContent from "./pipeline";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, createCourse as apiCreateCourse, updateCourse as apiUpdateCourse, deleteCourse as apiDeleteCourse, getCourseTiers, createCourseTier as apiCreateCourseTier, updateCourseTier as apiUpdateCourseTier, deleteCourseTier as apiDeleteCourseTier, getCourseBySlug, saveCourseLessons } from "@/lib/api";
import { useUpload } from "@/hooks/use-upload";

const INITIAL_LESSONS = {
  "1.1": { id: "1.1", title: "The Multimodal Script", duration: "12:45", video: "multimodal_script_v3.mp4", notes: "Introduction to multimodal scripting techniques using Gemini 1.5 Pro.", keyPrompt: "Analyze this image as a Director of Photography...", resources: [{ name: "Visual_Bible_Template.pdf", size: "2.4 MB", type: "PDF" }] },
  "1.2": { id: "1.2", title: "Context is King", duration: "08:30", video: "context_king_final.mp4", notes: "Understanding the importance of context window in long-form generation.", keyPrompt: "Summarize the key themes in this context...", resources: [] },
  "1.3": { id: "1.3", title: "Visual Bible (Editing)", duration: "15:10", video: "visual_bible_v2.mp4", notes: "How to compile a visual bible from generated assets.", keyPrompt: "Generate a visual style guide based on...", resources: [{ name: "Editing_Workflow.pdf", size: "1.2 MB", type: "PDF" }] },
  "2.1": { id: "2.1", title: "Set Design AI", duration: "10:20", video: "set_design_ai.mp4", notes: "Using AI to generate consistent set designs.", keyPrompt: "Create a mood board for a sci-fi set...", resources: [] },
  "2.2": { id: "2.2", title: "Lighting Consistency", duration: "14:15", video: "lighting_fix.mp4", notes: "maintaining lighting across multiple generated shots.", keyPrompt: "Describe the lighting setup in this scene...", resources: [] },
  "2.3": { id: "2.3", title: "Camera Movements", duration: "09:45", video: "camera_moves.mp4", notes: "Simulating dolly and crane shots.", keyPrompt: "Suggest camera movements for a dynamic action sequence...", resources: [] },
  "2.4": { id: "2.4", title: "Color Grading", duration: "11:30", video: "color_grade_lut.mp4", notes: "Applying cinematic LUTs to generated video.", keyPrompt: "Create a color grading preset for a noir film...", resources: [{ name: "Cinematic_LUTs.zip", size: "15 MB", type: "ZIP" }] },
  "3.1": { id: "3.1", title: "Shot Prompting", duration: "08:15", video: "shot_prompting.mp4", notes: "Specific prompting techniques for camera angles.", keyPrompt: "Generate a prompt for a low-angle shot...", resources: [] },
  "3.2": { id: "3.2", title: "Camera Angles", duration: "07:45", video: "angles_master.mp4", notes: "Wide, medium, and close-up shot consistency.", keyPrompt: "List 5 variations of a medium shot...", resources: [] },
  "3.3": { id: "3.3", title: "Movement Control", duration: "13:20", video: "movement_ctrl.mp4", notes: "Controlling character movement within the frame.", keyPrompt: "Describe the character's movement in this scene...", resources: [] },
  "3.4": { id: "3.4", title: "Upscaling", duration: "06:50", video: "upscale_4k.mp4", notes: "Best practices for upscaling to 4K.", keyPrompt: "Explain the upscaling process for 4K video...", resources: [] },
  "3.5": { id: "3.5", title: "Final Export", duration: "18:00", video: "export_settings.mp4", notes: "Codecs and wrappers for final delivery.", keyPrompt: "Recommended export settings for YouTube...", resources: [] }
};

const INITIAL_MODULES: Module[] = [
  { id: "module-1", title: "MODULE 1: WRITER'S ROOM", status: "Draft", lessons: ["1.1", "1.2", "1.3"] },
  { id: "module-2", title: "MODULE 2: THE ART DEPT", status: "Draft", lessons: ["2.1", "2.2", "2.3", "2.4"] },
  { id: "module-3", title: "MODULE 3: PRINCIPAL PHOTOGRAPHY", status: "Draft", lessons: ["3.1", "3.2", "3.3", "3.4", "3.5"] }
];

interface Lesson {
  id: string;
  title: string;
  duration: string;
  video: string;
  notes: string;
  keyPrompt?: string;
  resources: { name: string; size: string; type: string }[];
}

interface Module {
  id: string;
  title: string;
  status: string;
  lessons: string[];
}

interface Course {
  id: string;
  title: string;
  code: string;
  color: string;
  lastUpdated: string;
  students: string;
  price: string;
  status: string;
  modules: Module[];
  lessons: Record<string, Lesson>;
}

interface Student {
  id: string;
  initials: string;
  name: string;
  email: string;
  avatarColor: string;
  enrolledCourse: string;
  progress: number;
  lastActive: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}

interface Product {
  id: string;
  title: string;
  price: string;
  sales: number;
  revenue: string;
  status: "ACTIVE" | "DRAFT";
  category: string;
  image: string;
  imagePosition: { x: number; y: number; zoom: number };
}

export default function AdminDashboard() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [courseView, setCourseView] = useState<"list" | "editor" | "preview">("list");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>("course-2");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("1.1");
  const [logs, setLogs] = useState<string[]>([]);
  const [editorCourseTitle, setEditorCourseTitle] = useState("THE GOOGLE AI FILMMAKING ECOSYSTEM");
  const terminalRef = useRef<HTMLDivElement>(null);

  // State for Lessons Data
  const [lessons, setLessons] = useState<Record<string, Lesson>>(INITIAL_LESSONS);

  // State for Modules Structure
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);

  
  const [editorCourseId, setEditorCourseId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: getCourses,
  });
  const dbCourses = coursesData?.data?.courses || [];

  const { data: tiersData } = useQuery({
    queryKey: ["courseTiers"],
    queryFn: getCourseTiers,
  });
  const dbTiers = tiersData?.data?.tiers || [];

  const createTierMutation = useMutation({
    mutationFn: (data: Record<string, any>) => apiCreateCourseTier(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["courseTiers"] }); },
  });

  const updateTierMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) => apiUpdateCourseTier(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["courseTiers"] }); },
  });

  const deleteTierMutation = useMutation({
    mutationFn: (id: string) => apiDeleteCourseTier(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["courseTiers"] }); },
  });

  const createCourseMutation = useMutation({
    mutationFn: (data: Record<string, any>) => apiCreateCourse(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["adminCourses"] }); queryClient.invalidateQueries({ queryKey: ["courses"] }); },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) => apiUpdateCourse(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["adminCourses"] }); queryClient.invalidateQueries({ queryKey: ["courses"] }); },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => apiDeleteCourse(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["adminCourses"] }); queryClient.invalidateQueries({ queryKey: ["courses"] }); },
  });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseFormPage, setCourseFormPage] = useState(1);
  const [editingDbCourse, setEditingDbCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "0",
    level: "Foundation",
    duration: "0h",
    lessonsCount: 0,
    badge: "",
    color: "#2962FF",
    status: "draft",
    imageUrl: "",
    learningOutcomes: [] as Array<{ title: string; description: string }>,
    features: [] as string[],
    prerequisiteNote: "",
    syllabus: [] as Array<{ moduleName: string; lessons: Array<{ title: string }> }>,
  });

  const [showTierManager, setShowTierManager] = useState(false);
  const [newTierName, setNewTierName] = useState("");
  const [newTierColor, setNewTierColor] = useState("#2962FF");
  const [editingTier, setEditingTier] = useState<any>(null);

  const { uploadFile, isUploading: isImageUploading, progress: uploadProgress } = useUpload({
    onSuccess: (response) => {
      setCourseForm(prev => ({ ...prev, imageUrl: response.objectPath }));
    },
  });

  const [studentsList, setStudentsList] = useState<Student[]>([
    { id: "s1", initials: "SJ", name: "Sarah Jenkins", email: "sarah.j@example.com", avatarColor: "purple-900", enrolledCourse: "AI Filmmaking Ecosystem", progress: 85, lastActive: "2 hours ago", status: "ACTIVE" },
    { id: "s2", initials: "MD", name: "Mike Davis", email: "mike.dfx@studio.net", avatarColor: "orange-900", enrolledCourse: "Advanced Cinematography", progress: 12, lastActive: "1 day ago", status: "ACTIVE" },
    { id: "s3", initials: "JD", name: "John Doe", email: "jdoe@gmail.com", avatarColor: "gray-700", enrolledCourse: "Nano Banana Mastery", progress: 0, lastActive: "Never", status: "PENDING" },
  ]);

  // Mock Data for Analytics
  const salesData = [
    { name: 'Jan', revenue: 4000, sales: 24 },
    { name: 'Feb', revenue: 3000, sales: 18 },
    { name: 'Mar', revenue: 2000, sales: 12 },
    { name: 'Apr', revenue: 2780, sales: 20 },
    { name: 'May', revenue: 1890, sales: 15 },
    { name: 'Jun', revenue: 2390, sales: 28 },
    { name: 'Jul', revenue: 3490, sales: 32 },
  ];

  const categoryData = [
    { name: 'Textures', value: 3596, color: '#0088FE' },
    { name: 'Characters', value: 4361, color: '#00C49F' },
    { name: 'Audio', value: 1200, color: '#FFBB28' },
    { name: 'Courses', value: 8500, color: '#FF8042' },
  ];

  const recentTransactions = [
    { id: 1, user: "Jane Doe", item: "Neon Noir Textures", amount: "$29.00", date: "2 mins ago", type: "Asset" },
    { id: 2, user: "John Smith", item: "AI Filmmaking Ecosystem", amount: "$249.00", date: "15 mins ago", type: "Course" },
    { id: 3, user: "Alice Lee", item: "Sci-Fi Characters Vol 1", amount: "$49.00", date: "1 hour ago", type: "Asset" },
    { id: 4, user: "Robert Johnson", item: "Advanced AI Cinematography", amount: "$199.00", date: "3 hours ago", type: "Course" },
    { id: 5, user: "Mike Brown", item: "Cinematic SFX Pack", amount: "$19.00", date: "5 hours ago", type: "Asset" },
  ];

  const renderAnalytics = () => (
    <div className="relative z-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-header font-bold text-white tracking-widest">ANALYTICS OVERVIEW</h1>
        <div className="flex gap-2">
          <select className="bg-black/50 border border-white/10 text-white text-xs px-3 py-2 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-neonPurple text-white px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
            <Download className="w-3 h-3" /> EXPORT REPORT
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-6 border border-white/10 relative overflow-hidden group hover:border-neonPurple/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-16 h-16 text-neonPurple" />
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Total Revenue</p>
          <h3 className="text-2xl font-header text-white">$17,657</h3>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-green-500 font-mono">
            <ArrowUp className="w-3 h-3" /> +12.5% <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-panel p-6 border border-white/10 relative overflow-hidden group hover:border-electricBlue/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShoppingBag className="w-16 h-16 text-electricBlue" />
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Total Sales</p>
          <h3 className="text-2xl font-header text-white">482</h3>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-green-500 font-mono">
            <ArrowUp className="w-3 h-3" /> +8.2% <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-panel p-6 border border-white/10 relative overflow-hidden group hover:border-green-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-green-500" />
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Active Students</p>
          <h3 className="text-2xl font-header text-white">4,525</h3>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-green-500 font-mono">
            <ArrowUp className="w-3 h-3" /> +24% <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-panel p-6 border border-white/10 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-orange-500" />
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Conversion Rate</p>
          <h3 className="text-2xl font-header text-white">3.2%</h3>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-red-500 font-mono">
            <ArrowDown className="w-3 h-3" /> -0.4% <span className="text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-panel p-6 border border-white/10">
          <h3 className="font-header text-sm text-white mb-6">REVENUE OVERVIEW</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                  labelStyle={{ color: '#888', fontSize: '10px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="glass-panel p-6 border border-white/10 flex flex-col">
          <h3 className="font-header text-sm text-white mb-6">REVENUE BY SOURCE</h3>
          <div className="h-48 w-full flex-grow relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : index === 1 ? '#00f0ff' : index === 2 ? '#10b981' : '#f97316'} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px' }}
                   itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">45%</span>
                <span className="text-[9px] text-gray-500 uppercase">Courses</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-neonPurple' : index === 1 ? 'bg-electricBlue' : index === 2 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="font-mono text-white">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-panel p-6 border border-white/10">
        <h3 className="font-header text-sm text-white mb-6">RECENT TRANSACTIONS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] text-gray-500 font-mono uppercase">
                <th className="py-3 px-4 font-normal">Transaction ID</th>
                <th className="py-3 px-4 font-normal">Customer</th>
                <th className="py-3 px-4 font-normal">Item</th>
                <th className="py-3 px-4 font-normal">Type</th>
                <th className="py-3 px-4 font-normal text-right">Amount</th>
                <th className="py-3 px-4 font-normal text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono text-gray-400">#TRX-{29384 + tx.id}</td>
                  <td className="py-3 px-4 text-xs font-bold text-white">{tx.user}</td>
                  <td className="py-3 px-4 text-xs text-gray-300">{tx.item}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-1 rounded ${tx.type === 'Course' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono font-bold text-white text-right">{tx.amount}</td>
                  <td className="py-3 px-4 text-[10px] text-gray-500 text-right">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentModalMode, setStudentModalMode] = useState<"edit" | "view">("edit");

  const handleEditStudent = (student: Student) => {
    setEditingStudent({ ...student });
    setStudentModalMode("edit");
    setIsStudentModalOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    setEditingStudent({ ...student });
    setStudentModalMode("view");
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = () => {
    if (!editingStudent) return;
    setStudentsList(studentsList.map(s => s.id === editingStudent.id ? editingStudent : s));
    setIsStudentModalOpen(false);
    setEditingStudent(null);
  };

  const handleStudentFormChange = (field: keyof Student, value: any) => {
    if (!editingStudent) return;
    setEditingStudent({ ...editingStudent, [field]: value });
  };

  const [productsList, setProductsList] = useState<Product[]>([
    {
      id: "p1",
      title: "NEON NOIR TEXTURES",
      price: "$29",
      sales: 124,
      revenue: "$3,596",
      status: "ACTIVE",
      category: "TEXTURES",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
      imagePosition: { x: 50, y: 50, zoom: 1 }
    },
    {
      id: "p2",
      title: "SCI-FI CHARACTERS VOL. 1",
      price: "$49",
      sales: 89,
      revenue: "$4,361",
      status: "ACTIVE",
      category: "CHARACTER SHEETS",
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop",
      imagePosition: { x: 50, y: 50, zoom: 1 }
    },
    {
      id: "p3",
      title: "CINEMATIC SFX PACK",
      price: "$19",
      sales: 0,
      revenue: "Unreleased",
      status: "DRAFT",
      category: "AUDIO PACKS",
      image: "",
      imagePosition: { x: 50, y: 50, zoom: 1 }
    }
  ]);

  const [categories, setCategories] = useState<string[]>(["TEXTURES", "CHARACTER SHEETS", "AUDIO PACKS", "MISC"]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("ALL");
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (index: number) => {
    const categoryToDelete = categories[index];
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    
    // Update products that were in this category to MISC
    setProductsList(productsList.map(p => 
      p.category === categoryToDelete ? { ...p, category: "MISC" } : p
    ));
  };

  const handleEditCategoryStart = (index: number) => {
    setEditingCategoryIndex(index);
    setEditingCategoryName(categories[index]);
  };

  const handleEditCategorySave = (index: number) => {
    if (editingCategoryName && !categories.includes(editingCategoryName)) {
      const oldCategoryName = categories[index];
      const newCategories = [...categories];
      newCategories[index] = editingCategoryName;
      setCategories(newCategories);
      
      // Update products to new category name
      setProductsList(productsList.map(p => 
        p.category === oldCategoryName ? { ...p, category: editingCategoryName } : p
      ));
    }
    setEditingCategoryIndex(null);
    setEditingCategoryName("");
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `p${productsList.length + 1}`,
      title: "NEW PRODUCT",
      price: "$0",
      sales: 0,
      revenue: "$0",
      status: "DRAFT",
      category: "MISC",
      image: "",
      imagePosition: { x: 50, y: 50, zoom: 1 }
    };
    setEditingProduct(newProduct);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;
    
    const existingIndex = productsList.findIndex(p => p.id === editingProduct.id);
    if (existingIndex >= 0) {
      setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      setProductsList([...productsList, editingProduct]);
    }
    
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductFormChange = (field: keyof Product, value: any) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const handleOpenCreateCourseModal = () => {
    setEditingDbCourse(null);
    setCourseForm({
      title: "",
      shortDescription: "",
      description: "",
      price: "0",
      level: "Foundation",
      duration: "0h",
      lessonsCount: 0,
      badge: "",
      color: "#2962FF",
      status: "draft",
      imageUrl: "",
      learningOutcomes: [],
      features: [],
      prerequisiteNote: "",
      syllabus: [],
    });
    setCourseFormPage(1);
    setIsCourseModalOpen(true);
  };

  const parseJsonField = (val: any, fallback: any) => {
    if (!val) return fallback;
    if (typeof val === 'object') return val;
    try { return JSON.parse(val); } catch { return fallback; }
  };

  const handleOpenEditCourseModal = async (course: any) => {
    setEditingDbCourse(course);
    let syllabus: Array<{ moduleName: string; lessons: Array<{ title: string }> }> = [];
    try {
      const res = await getCourseBySlug(course.slug);
      const lessons = res?.data?.lessons || [];
      const moduleMap: Record<number, { moduleName: string; lessons: Array<{ title: string }> }> = {};
      lessons.forEach((l: any) => {
        if (!moduleMap[l.moduleNumber]) {
          moduleMap[l.moduleNumber] = { moduleName: l.moduleName, lessons: [] };
        }
        moduleMap[l.moduleNumber].lessons.push({ title: l.title });
      });
      syllabus = Object.keys(moduleMap).sort((a, b) => Number(a) - Number(b)).map(k => moduleMap[Number(k)]);
    } catch {}
    setCourseForm({
      title: course.title || "",
      shortDescription: course.shortDescription || "",
      description: course.description || "",
      price: course.price || "0",
      level: course.level || "Foundation",
      duration: course.duration || "0h",
      lessonsCount: course.lessonsCount || 0,
      badge: course.badge || "",
      color: course.color || "#2962FF",
      status: course.status || "draft",
      imageUrl: course.imageUrl || "",
      learningOutcomes: parseJsonField(course.learningOutcomes, []),
      features: parseJsonField(course.features, []),
      prerequisiteNote: course.prerequisiteNote || "",
      syllabus,
    });
    setCourseFormPage(1);
    setIsCourseModalOpen(true);
  };

  const handleSaveCourseForm = async () => {
    const filteredOutcomes = courseForm.learningOutcomes.filter(o => o.title.trim() || o.description.trim());
    const filteredFeatures = courseForm.features.filter(f => f.trim());
    const { syllabus, ...rest } = courseForm;
    const payload = {
      ...rest,
      learningOutcomes: filteredOutcomes.length > 0 ? JSON.stringify(filteredOutcomes) : null,
      features: filteredFeatures.length > 0 ? JSON.stringify(filteredFeatures) : null,
      prerequisiteNote: courseForm.prerequisiteNote || null,
    };
    let courseId: string;
    if (editingDbCourse) {
      await updateCourseMutation.mutateAsync({ id: editingDbCourse.id, data: payload });
      courseId = editingDbCourse.id;
    } else {
      const res = await createCourseMutation.mutateAsync(payload);
      courseId = (res as any)?.data?.course?.id || (res as any)?.course?.id;
    }
    if (courseId) {
      const lessonsPayload: any[] = [];
      syllabus.forEach((mod, modIdx) => {
        if (!mod.moduleName.trim()) return;
        mod.lessons.forEach((lesson, lesIdx) => {
          if (!lesson.title.trim()) return;
          lessonsPayload.push({
            moduleNumber: modIdx + 1,
            moduleName: mod.moduleName,
            lessonNumber: lesIdx + 1,
            title: lesson.title,
          });
        });
      });
      await saveCourseLessons(courseId, lessonsPayload);
    }
    setIsCourseModalOpen(false);
  };

  const handleTogglePublish = async (course: any) => {
    const statusCycle: Record<string, string> = { draft: "published", published: "draft", archived: "draft" };
    const newStatus = statusCycle[course.status] || "draft";
    await updateCourseMutation.mutateAsync({ id: course.id, data: { status: newStatus } });
  };

  const handleDeleteDbCourse = async (courseId: string) => {
    await deleteCourseMutation.mutateAsync(courseId);
    setDeleteConfirmation(null);
  };

  const handleCreateCourse = () => {
    handleOpenCreateCourseModal();
  };

  const handleEditCourse = (courseId: string) => {
    setEditorCourseId(courseId);
    setLessons(INITIAL_LESSONS);
    setModules(INITIAL_MODULES);
    setEditorCourseTitle("COURSE CURRICULUM");
    if (INITIAL_MODULES.length > 0 && INITIAL_MODULES[0].lessons.length > 0) {
      setSelectedLessonId(INITIAL_MODULES[0].lessons[0]);
    } else {
      setSelectedLessonId("");
    }
    setCourseView('editor');
  };
  
  const handleSaveCourse = () => {
    setCourseView('list');
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; type: 'module' | 'lesson' | 'course'; id: string; title: string; parentId?: string } | null>(null);
  
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const handleModuleTitleUpdate = (moduleId: string, newTitle: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, title: newTitle };
      }
      return m;
    }));
  };

  const handleAddModule = () => {
    const newId = `module-${modules.length + 1}`;
    setModules([...modules, { id: newId, title: "NEW MODULE", status: "Draft", lessons: [] }]);
  };

  const handleAddLesson = (moduleId: string) => {
    const newLessonId = `${moduleId}.${Date.now().toString().slice(-4)}`;
    const newLesson = { id: newLessonId, title: "New Lesson", duration: "00:00", video: "placeholder.mp4", notes: "Add notes here...", keyPrompt: "Enter AI prompt here...", resources: [] };
    
    setLessons({ ...lessons, [newLessonId]: newLesson });
    
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: [...m.lessons, newLessonId] };
      }
      return m;
    }));
    
    setSelectedLessonId(newLessonId);
  };

  const requestDeleteLesson = (moduleId: string, lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lesson = lessons[lessonId];
    setDeleteConfirmation({ 
      isOpen: true, 
      type: 'lesson', 
      id: lessonId, 
      title: lesson ? lesson.title : 'Lesson',
      parentId: moduleId 
    });
  };

  const requestDeleteModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    setDeleteConfirmation({ 
      isOpen: true, 
      type: 'module', 
      id: moduleId,
      title: module ? module.title : 'Module'
    });
  };

  const requestDeleteCourse = (courseId: string) => {
    const course = dbCourses.find((c: any) => c.id === courseId);
    setDeleteConfirmation({
      isOpen: true,
      type: 'course',
      id: courseId,
      title: course ? course.title : 'Course'
    });
  };

  const confirmDelete = () => {
    if (!deleteConfirmation) return;

    if (deleteConfirmation.type === 'lesson' && deleteConfirmation.parentId) {
       const moduleId = deleteConfirmation.parentId;
       const lessonId = deleteConfirmation.id;
       
        const newLessons = { ...lessons };
        delete newLessons[lessonId];
        setLessons(newLessons);

        setModules(modules.map(m => {
          if (m.id === moduleId) {
            return { ...m, lessons: m.lessons.filter(id => id !== lessonId) };
          }
          return m;
        }));

        if (selectedLessonId === lessonId) {
          const module = modules.find(m => m.id === moduleId);
          const remainingLessons = module?.lessons.filter(id => id !== lessonId) || [];
          setSelectedLessonId(remainingLessons[0] || "");
        }
    } else if (deleteConfirmation.type === 'module') {
        const moduleId = deleteConfirmation.id;
        const moduleToDelete = modules.find(m => m.id === moduleId);
        if (moduleToDelete) {
            const newLessons = { ...lessons };
            moduleToDelete.lessons.forEach(lessonId => delete newLessons[lessonId]);
            setLessons(newLessons);

            setModules(modules.filter(m => m.id !== moduleId));
            
            if (moduleToDelete.lessons.includes(selectedLessonId)) {
                setSelectedLessonId("");
            }
        }
    } else if (deleteConfirmation.type === 'course') {
      handleDeleteDbCourse(deleteConfirmation.id);
      return;
    }
    setDeleteConfirmation(null);
  };

  const handleAddResource = () => {
    // This function will be triggered by the file input
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLessonId || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    // In a real app, this would upload to server. Here we just mock the file data
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const fileType = file.name.split('.').pop()?.toUpperCase() || "FILE";
    
    const newResource = { name: file.name, size: fileSize, type: fileType };
    
    const updatedLesson = { 
        ...lessons[selectedLessonId], 
        resources: [...(lessons[selectedLessonId].resources || []), newResource] 
    };
    setLessons({ ...lessons, [selectedLessonId]: updatedLesson });
    
    // Reset input
    e.target.value = '';
  };

  const handleRemoveResource = (index: number) => {
    if (!selectedLessonId) return;
    const updatedResources = [...(lessons[selectedLessonId].resources || [])];
    updatedResources.splice(index, 1);
    const updatedLesson = { 
        ...lessons[selectedLessonId], 
        resources: updatedResources
    };
    setLessons({ ...lessons, [selectedLessonId]: updatedLesson });
  };
  
  const handleLessonUpdate = (field: string, value: string) => {
    if (!selectedLessonId) return;
    setLessons({
      ...lessons,
      [selectedLessonId]: { ...lessons[selectedLessonId], [field]: value }
    });
  };

  useEffect(() => {
    const adminLogs = [
      "[SYS] New user registration: ID #9942",
      "[PAYMENT] Stripe Webhook received: success",
      "[EMAIL] Welcome sequence triggered for user #9942",
      "[VEO] Rendering preview for Asset Store item #04",
      "[SYS] Database backup complete (145ms)",
      "[SEC] Failed login attempt from IP 192.168.x.x",
      "[CMS] Course content updated: Module 3.2",
      "[ANALYTICS] Daily traffic report generated"
    ];

    const addLog = () => {
      const log = adminLogs[Math.floor(Math.random() * adminLogs.length)];
      const time = new Date().toLocaleTimeString([], { hour12: false });
      const formattedLog = `<span class="text-gray-600">[${time}]</span> <span class="text-green-400">></span> ${log}`;
      
      setLogs(prev => {
        const newLogs = [...prev, formattedLog];
        if (newLogs.length > 15) return newLogs.slice(newLogs.length - 15);
        return newLogs;
      });
    };

    // Fill initial
    for(let i=0; i<8; i++) addLog();

    const interval = setInterval(addLog, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const renderDashboard = () => (
    <div className="relative z-10">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-header text-2xl text-white mb-1">SYSTEM OVERVIEW</h1>
          <p className="text-xs text-gray-400 font-mono">Last Sync: Just now</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCreateCourse}
            className="flex items-center gap-2 bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors"
          >
            <Plus className="w-3 h-3" /> New Course
          </button>
          <button className="flex items-center gap-2 border border-white/20 text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white/10 transition-colors">
            <Download className="w-3 h-3" /> Export Report
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Stat 1 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Total Revenue</span>
            <span className="text-green-500 text-xs font-mono">+12%</span>
          </div>
          <h2 className="font-header text-3xl text-white">$124,500</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[75%]"></div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Active Students</span>
            <span className="text-electricBlue text-xs font-mono">+54</span>
          </div>
          <h2 className="font-header text-3xl text-white">5,204</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-electricBlue w-[60%]"></div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Asset Downloads</span>
            <span className="text-neonPurple text-xs font-mono">NEW</span>
          </div>
          <h2 className="font-header text-3xl text-white">12.5K</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-neonPurple w-[85%]"></div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel p-6 stat-card cursor-pointer hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">Server Load</span>
            <span className="text-signalOrange text-xs font-mono">STABLE</span>
          </div>
          <h2 className="font-header text-3xl text-white">24%</h2>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-signalOrange w-[24%]"></div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Sales (Table) */}
        <div className="lg:col-span-2 glass-panel p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-header text-sm text-white">RECENT TRANSACTIONS</h3>
            <a href="#" className="text-[10px] font-mono text-electricBlue hover:underline">VIEW ALL</a>
          </div>
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="bg-white/5 text-gray-200 font-header border-b border-white/10">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">sarah_j_films</td>
                <td className="p-4">AI Filmmaking Ecosystem</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$249.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">mike_vfx_pro</td>
                <td className="p-4">Advanced Cinematography</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$199.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">studio_asset_bot</td>
                <td className="p-4">Nano Texture Pack</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$29.00</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">guest_user_22</td>
                <td className="p-4">Nano Banana Mastery</td>
                <td className="p-4"><span className="bg-red-500/20 text-red-500 px-2 py-1 rounded">FAILED</span></td>
                <td className="p-4 text-right">$129.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* System Logs (Live Terminal Feed) */}
        <div className="glass-panel p-0 overflow-hidden flex flex-col h-full bg-black/50 border border-white/10 min-h-[300px]">
          <div className="p-4 border-b border-white/10 bg-[#050505]">
            <h3 className="font-header text-xs text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              LIVE SYSTEM LOGS
            </h3>
          </div>
          <div 
            className="p-4 font-mono text-[10px] space-y-2 text-gray-400 overflow-y-auto flex-grow" 
            ref={terminalRef}
          >
            {logs.map((log, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  const renderCourseList = () => {
    const toggleCourse = (id: string) => {
      setExpandedCourseId(expandedCourseId === id ? null : id);
    };

    return (
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-header text-2xl text-white mb-1">COURSE MANAGEMENT</h1>
            <p className="text-xs text-gray-400 font-mono">Manage curriculum, uploads, and pricing.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleOpenCreateCourseModal}
              data-testid="button-create-course"
              className="bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors"
            >
              + Create New Course
            </button>
          </div>
        </div>
        {coursesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-2 border-electricBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-gray-500 font-mono">Loading courses...</p>
            </div>
          </div>
        ) : dbCourses.length === 0 ? (
          <div className="glass-panel p-12 border border-white/10 text-center">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="font-header text-lg text-white mb-2">NO COURSES YET</h3>
            <p className="text-xs text-gray-500 font-mono mb-6">Create your first course to get started.</p>
            <button 
              onClick={handleOpenCreateCourseModal}
              className="bg-electricBlue text-white px-6 py-3 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors"
            >
              + Create First Course
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {dbCourses.map((course: any) => (
              <div key={course.id} data-testid={`card-course-${course.id}`} className={`glass-panel p-0 overflow-hidden border transition-colors group ${expandedCourseId === course.id ? 'border-electricBlue/50' : 'border-white/10 hover:border-electricBlue/30'} ${course.status === 'draft' ? 'opacity-90' : ''}`}>
                <div 
                  className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5 cursor-pointer"
                  onClick={() => toggleCourse(course.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 relative overflow-hidden rounded border border-white/10" style={{ backgroundColor: course.color || '#2962FF' }}>
                      <span className="absolute inset-0 flex items-center justify-center font-header text-white text-xs font-bold">{course.title?.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-header text-sm text-white uppercase" data-testid={`text-course-title-${course.id}`}>{course.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400 font-mono">/{course.slug}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${(dbTiers.find((t: any) => t.name === course.level)?.color || '#2962FF')}20`, color: dbTiers.find((t: any) => t.name === course.level)?.color || '#2962FF' }}>{course.level}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[10px] text-gray-500 font-mono">{course.lessonsCount} lessons</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-[10px] text-gray-500 font-mono">{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-green-400 font-bold font-mono">${Number(course.price || 0).toFixed(0)}</p>
                      <p className="text-[10px] text-gray-500 uppercase">Price</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePublish(course);
                      }}
                      data-testid={`button-toggle-publish-${course.id}`}
                      className={`px-3 py-1 rounded text-[10px] font-bold border hover:opacity-80 transition-opacity ${
                        course.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        course.status === 'archived' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}
                    >
                      {course.status === 'published' ? 'PUBLISHED' : course.status === 'archived' ? 'ARCHIVED' : 'DRAFT'}
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenEditCourseModal(course); }}
                        className="text-gray-400 hover:text-electricBlue transition-colors p-1"
                        title="Edit Course"
                        data-testid={`button-edit-course-${course.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); requestDeleteCourse(course.id); }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Delete Course"
                        data-testid={`button-delete-course-${course.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          const newStatus = course.status === 'archived' ? 'draft' : 'archived';
                          updateCourseMutation.mutate({ id: course.id, data: { status: newStatus } });
                        }}
                        className={`transition-colors p-1 ${course.status === 'archived' ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-yellow-500'}`}
                        title={course.status === 'archived' ? "Unarchive Course" : "Archive Course"}
                        data-testid={`button-archive-course-${course.id}`}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors p-1">
                        {expandedCourseId === course.id ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedCourseId === course.id && (
                  <div className="bg-black/30 p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {course.description && (
                      <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase mb-2">Description</p>
                        <p className="text-xs text-gray-300 leading-relaxed">{course.description}</p>
                      </div>
                    )}
                    {course.shortDescription && (
                      <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase mb-2">Short Description</p>
                        <p className="text-xs text-gray-400">{course.shortDescription}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-2">
                      <Link href={`/academy/${(dbTiers.find((t: any) => t.name === course.level)?.slug || course.level?.toLowerCase() || 'foundation')}/${course.slug}`} className="text-[10px] text-electricBlue hover:underline font-mono flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> View Course Page
                      </Link>
                      <button 
                        onClick={() => handleOpenEditCourseModal(course)} 
                        className="text-[10px] text-electricBlue hover:underline font-mono flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> Edit Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {isCourseModalOpen && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="glass-panel p-8 max-w-lg w-full border border-white/10 relative max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsCourseModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h2 className="font-header text-xl text-white mb-1">
                {editingDbCourse ? "EDIT COURSE" : "CREATE NEW COURSE"}
              </h2>
              {editingDbCourse && (
                <p className="text-[11px] font-mono mb-3 truncate" style={{ color: dbTiers.find((t: any) => t.name === courseForm.level)?.color || '#2962FF' }} data-testid="text-editing-course-name">{courseForm.title}</p>
              )}
              <div className="flex items-center gap-3 mb-6 border-b border-white/10">
                {[
                  { page: 1, label: 'HERO & SETUP', testId: 'button-form-page-1' },
                  { page: 2, label: 'COURSE CONTENT', testId: 'button-form-page-2' },
                  { page: 3, label: 'SIDEBAR & PRICING', testId: 'button-form-page-3' },
                ].map(({ page, label, testId }) => {
                  const isActive = courseFormPage === page;
                  const tierColor = dbTiers.find((t: any) => t.name === courseForm.level)?.color || '#2962FF';
                  return (
                    <button
                      key={page}
                      onClick={() => setCourseFormPage(page)}
                      className={`text-[10px] font-mono tracking-wider pb-2 -mb-px border-b-2 transition-colors ${isActive ? 'text-white' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                      style={isActive ? { borderBottomColor: tierColor } : undefined}
                      data-testid={testId}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              
              <div className="space-y-4">
                {courseFormPage === 1 && (
                  <>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Title</label>
                  <input 
                    type="text" 
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none font-bold"
                    data-testid="input-course-title"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Short Description</label>
                  <textarea 
                    value={courseForm.shortDescription}
                    onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    rows={2}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none resize-none"
                    data-testid="input-course-short-description"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Description</label>
                  <textarea 
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    rows={4}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none resize-none"
                    data-testid="input-course-description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Level / Tier</label>
                    <select 
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none appearance-none"
                      data-testid="select-course-level"
                    >
                      {dbTiers.length > 0 ? (
                        dbTiers.map((tier: any) => (
                          <option key={tier.id} value={tier.name}>{tier.name}</option>
                        ))
                      ) : (
                        <>
                          <option value="Foundation">Foundation</option>
                          <option value="Specialist">Specialist</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Status</label>
                    <select 
                      value={courseForm.status}
                      onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none appearance-none"
                      data-testid="select-course-status"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Duration</label>
                    <input 
                      type="text" 
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      placeholder="e.g. 6h 30m"
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none font-mono"
                      data-testid="input-course-duration"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Lessons Count</label>
                    <input 
                      type="number" 
                      value={courseForm.lessonsCount}
                      onChange={(e) => setCourseForm({ ...courseForm, lessonsCount: parseInt(e.target.value) || 0 })}
                      placeholder="e.g. 11"
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none font-mono"
                      data-testid="input-course-lessons-count"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Badge</label>
                    <input 
                      type="text" 
                      value={courseForm.badge}
                      onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                      placeholder="e.g. NEW"
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none font-mono"
                      data-testid="input-course-badge"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Color</label>
                  <div className="flex gap-2 items-center flex-wrap">
                    {(() => {
                      const tierColors = dbTiers.map((t: any) => t.color?.toUpperCase()).filter(Boolean);
                      const presetColors = tierColors.length > 0 ? tierColors.slice(0, 5) : ['#2962FF', '#FF3D00', '#D500F9'];
                      const isCustom = !presetColors.includes(courseForm.color?.toUpperCase());
                      return (
                        <>
                          {presetColors.map((color: string) => (
                            <button
                              key={color}
                              onClick={() => setCourseForm({ ...courseForm, color })}
                              className={`w-8 h-8 rounded border-2 transition-all ${courseForm.color?.toUpperCase() === color ? 'border-white scale-110' : 'border-white/10 hover:border-white/30'}`}
                              style={{ backgroundColor: color }}
                              data-testid={`button-color-${color}`}
                            />
                          ))}
                          <div className="w-px h-6 bg-white/10 mx-1" />
                          <label className={`relative w-8 h-8 rounded-full border-2 cursor-pointer overflow-hidden transition-all flex items-center justify-center ${isCustom ? 'border-white scale-110' : 'border-dashed border-white/20 hover:border-white/40'}`} style={{ backgroundColor: isCustom ? courseForm.color : 'transparent' }}>
                            {!isCustom && <Plus className="w-3 h-3 text-gray-500" />}
                            <input
                              type="color"
                              value={courseForm.color || '#2962FF'}
                              onChange={(e) => setCourseForm({ ...courseForm, color: e.target.value.toUpperCase() })}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              data-testid="input-course-color-picker"
                            />
                          </label>
                          <input
                            type="text"
                            value={courseForm.color || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCourseForm({ ...courseForm, color: val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}` });
                            }}
                            placeholder="#HEX"
                            className="bg-black/50 border border-white/10 text-white text-[10px] px-2 py-1.5 w-20 focus:border-electricBlue outline-none font-mono"
                            data-testid="input-course-color-hex"
                          />
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Course Image</label>
                  {courseForm.imageUrl && (
                    <div className="mb-2 relative group">
                      <img 
                        src={courseForm.imageUrl.startsWith('/objects/') ? courseForm.imageUrl : courseForm.imageUrl}
                        alt="Course preview"
                        className="w-full h-32 object-cover rounded border border-white/10"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <button
                        onClick={() => setCourseForm({ ...courseForm, imageUrl: "" })}
                        className="absolute top-1 right-1 bg-black/80 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="flex-1 cursor-pointer">
                      <div className={`border border-dashed border-white/20 hover:border-electricBlue/50 transition-colors px-4 py-3 text-center ${isImageUploading ? 'opacity-50' : ''}`}>
                        <Upload className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                        <p className="text-[10px] font-mono text-gray-400">
                          {isImageUploading ? `Uploading... ${uploadProgress}%` : 'Click to upload image (JPG, PNG, GIF)'}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await uploadFile(file);
                          }
                          e.target.value = '';
                        }}
                        disabled={isImageUploading}
                        data-testid="input-course-image-upload"
                      />
                    </label>
                  </div>
                  <div className="mt-2">
                    <input 
                      type="text" 
                      value={courseForm.imageUrl}
                      onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })}
                      placeholder="Or paste image URL..."
                      className="bg-black/50 border border-white/10 text-white text-[10px] px-3 py-2 w-full focus:border-electricBlue outline-none font-mono"
                      data-testid="input-course-image-url"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setIsCourseModalOpen(false)}
                    className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={() => setCourseFormPage(2)}
                    className="flex-1 py-3 text-xs font-header font-bold text-white bg-electricBlue/80 hover:bg-electricBlue transition-colors"
                    data-testid="button-next-page"
                  >COURSE CONTENT →</button>
                </div>
                  </>
                )}

                {courseFormPage === 2 && (
                  <>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Learning Outcomes (What You Will Learn)</label>
                  <div className="space-y-3">
                    {courseForm.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-electricBlue font-mono text-xs mt-2 min-w-[24px]">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            value={outcome.title}
                            onChange={(e) => {
                              const updated = [...courseForm.learningOutcomes];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCourseForm({ ...courseForm, learningOutcomes: updated });
                            }}
                            placeholder="Title"
                            className="bg-black/50 border border-white/10 text-white text-xs px-3 py-2 w-full focus:border-electricBlue outline-none font-bold"
                            data-testid={`input-outcome-title-${idx}`}
                          />
                          <textarea
                            value={outcome.description}
                            onChange={(e) => {
                              const updated = [...courseForm.learningOutcomes];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setCourseForm({ ...courseForm, learningOutcomes: updated });
                            }}
                            placeholder="Description"
                            rows={2}
                            className="bg-black/50 border border-white/10 text-white text-[11px] px-3 py-2 w-full focus:border-electricBlue outline-none resize-none"
                            data-testid={`input-outcome-desc-${idx}`}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = courseForm.learningOutcomes.filter((_, i) => i !== idx);
                            setCourseForm({ ...courseForm, learningOutcomes: updated });
                          }}
                          className="text-gray-500 hover:text-signalOrange mt-2"
                          data-testid={`button-remove-outcome-${idx}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setCourseForm({ ...courseForm, learningOutcomes: [...courseForm.learningOutcomes, { title: "", description: "" }] })}
                      className="text-[10px] font-mono text-electricBlue hover:text-white transition-colors"
                      data-testid="button-add-outcome"
                    >
                      + ADD OUTCOME
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Class Syllabus (Modules & Lessons)</label>
                  <div className="space-y-4">
                    {courseForm.syllabus.map((mod, modIdx) => (
                      <div key={modIdx} className="border border-white/10 bg-white/5 p-3 space-y-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-electricBlue font-mono text-xs min-w-[60px]">MODULE {modIdx + 1}</span>
                          <input
                            type="text"
                            value={mod.moduleName}
                            onChange={(e) => {
                              const updated = [...courseForm.syllabus];
                              updated[modIdx] = { ...updated[modIdx], moduleName: e.target.value };
                              setCourseForm({ ...courseForm, syllabus: updated });
                            }}
                            placeholder="Module Name"
                            className="bg-black/50 border border-white/10 text-white text-xs px-3 py-2 flex-1 focus:border-electricBlue outline-none font-bold"
                            data-testid={`input-module-name-${modIdx}`}
                          />
                          <button
                            onClick={() => {
                              const updated = courseForm.syllabus.filter((_, i) => i !== modIdx);
                              setCourseForm({ ...courseForm, syllabus: updated });
                            }}
                            className="text-gray-500 hover:text-signalOrange"
                            data-testid={`button-remove-module-${modIdx}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="pl-8 space-y-1">
                          {mod.lessons.map((lesson, lesIdx) => (
                            <div key={lesIdx} className="flex gap-2 items-center">
                              <span className="text-gray-500 font-mono text-[10px] min-w-[28px]">{modIdx + 1}.{lesIdx + 1}</span>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => {
                                  const updated = [...courseForm.syllabus];
                                  const updatedLessons = [...updated[modIdx].lessons];
                                  updatedLessons[lesIdx] = { title: e.target.value };
                                  updated[modIdx] = { ...updated[modIdx], lessons: updatedLessons };
                                  setCourseForm({ ...courseForm, syllabus: updated });
                                }}
                                placeholder="Lesson title"
                                className="bg-black/50 border border-white/10 text-white text-[11px] px-3 py-1.5 flex-1 focus:border-electricBlue outline-none"
                                data-testid={`input-lesson-title-${modIdx}-${lesIdx}`}
                              />
                              <button
                                onClick={() => {
                                  const updated = [...courseForm.syllabus];
                                  const updatedLessons = updated[modIdx].lessons.filter((_, i) => i !== lesIdx);
                                  updated[modIdx] = { ...updated[modIdx], lessons: updatedLessons };
                                  setCourseForm({ ...courseForm, syllabus: updated });
                                }}
                                className="text-gray-500 hover:text-signalOrange"
                                data-testid={`button-remove-lesson-${modIdx}-${lesIdx}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = [...courseForm.syllabus];
                              updated[modIdx] = { ...updated[modIdx], lessons: [...updated[modIdx].lessons, { title: "" }] };
                              setCourseForm({ ...courseForm, syllabus: updated });
                            }}
                            className="text-[10px] font-mono text-electricBlue hover:text-white transition-colors pl-8"
                            data-testid={`button-add-lesson-${modIdx}`}
                          >
                            + ADD LESSON
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setCourseForm({ ...courseForm, syllabus: [...courseForm.syllabus, { moduleName: "", lessons: [{ title: "" }] }] })}
                      className="text-[10px] font-mono text-electricBlue hover:text-white transition-colors"
                      data-testid="button-add-module"
                    >
                      + ADD MODULE
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setCourseFormPage(1)}
                    className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                    data-testid="button-back-page"
                  >
                    ← HERO & SETUP
                  </button>
                  <button 
                    onClick={() => setCourseFormPage(3)}
                    className="flex-1 py-3 text-xs font-header font-bold text-white bg-electricBlue/80 hover:bg-electricBlue transition-colors"
                    data-testid="button-next-page-3"
                  >
                    SIDEBAR & PRICING →
                  </button>
                </div>
                  </>
                )}

                {courseFormPage === 3 && (
                  <>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Price</label>
                  <input 
                    type="text" 
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none font-mono"
                    data-testid="input-course-price"
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Sidebar Features (Checklist Items)</label>
                  <div className="space-y-2">
                    {courseForm.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Check className="w-3 h-3 text-electricBlue shrink-0" />
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const updated = [...courseForm.features];
                            updated[idx] = e.target.value;
                            setCourseForm({ ...courseForm, features: updated });
                          }}
                          placeholder="e.g. Lifetime Access"
                          className="bg-black/50 border border-white/10 text-white text-xs px-3 py-2 flex-1 focus:border-electricBlue outline-none"
                          data-testid={`input-feature-${idx}`}
                        />
                        <button
                          onClick={() => {
                            const updated = courseForm.features.filter((_, i) => i !== idx);
                            setCourseForm({ ...courseForm, features: updated });
                          }}
                          className="text-gray-500 hover:text-signalOrange"
                          data-testid={`button-remove-feature-${idx}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setCourseForm({ ...courseForm, features: [...courseForm.features, ""] })}
                      className="text-[10px] font-mono text-electricBlue hover:text-white transition-colors"
                      data-testid="button-add-feature"
                    >
                      + ADD FEATURE
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Prerequisite Note (optional)</label>
                  <input
                    type="text"
                    value={courseForm.prerequisiteNote}
                    onChange={(e) => setCourseForm({ ...courseForm, prerequisiteNote: e.target.value })}
                    placeholder="e.g. RECOMMENDED: FOUNDATION TRACK COMPLETION"
                    className="bg-black/50 border border-white/10 text-white text-[11px] px-4 py-3 w-full focus:border-electricBlue outline-none font-mono"
                    data-testid="input-prerequisite-note"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setCourseFormPage(2)}
                    className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                    data-testid="button-back-page"
                  >
                    ← COURSE CONTENT
                  </button>
                  <button 
                    onClick={handleSaveCourseForm}
                    disabled={createCourseMutation.isPending || updateCourseMutation.isPending}
                    className="flex-1 py-3 text-xs font-header font-bold text-black bg-electricBlue hover:bg-white transition-colors disabled:opacity-50"
                    data-testid="button-save-course"
                  >
                    {createCourseMutation.isPending || updateCourseMutation.isPending ? 'SAVING...' : 'SAVE COURSE'}
                  </button>
                </div>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-header text-lg text-white">TIER MANAGEMENT</h2>
              <p className="text-[10px] text-gray-500 font-mono">Create and manage course categories</p>
            </div>
            <button
              onClick={() => setShowTierManager(!showTierManager)}
              className="text-[10px] font-mono text-electricBlue hover:text-white transition-colors"
              data-testid="button-toggle-tier-manager"
            >
              {showTierManager ? 'COLLAPSE' : 'EXPAND'}
            </button>
          </div>
          
          {showTierManager && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTierName}
                  onChange={(e) => setNewTierName(e.target.value)}
                  placeholder="New tier name (e.g. Flagship)"
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-2 flex-1 focus:border-electricBlue outline-none"
                  data-testid="input-new-tier-name"
                />
                <div className="flex gap-1 items-center">
                  {['#2962FF', '#FF3D00', '#D500F9', '#FFD700', '#00E676', '#FF6D00'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setNewTierColor(c)}
                      className={`w-8 h-8 rounded border-2 transition-all ${newTierColor === c ? 'border-white scale-110' : 'border-white/10'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <label className="relative w-8 h-8 rounded border-2 border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all" style={{ backgroundColor: newTierColor }}>
                    <input
                      type="color"
                      value={newTierColor}
                      onChange={(e) => setNewTierColor(e.target.value.toUpperCase())}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      data-testid="input-new-tier-color-picker"
                    />
                  </label>
                  <input
                    type="text"
                    value={newTierColor}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewTierColor(val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}`);
                    }}
                    placeholder="#HEX"
                    className="bg-black/50 border border-white/10 text-white text-[10px] px-2 py-1.5 w-20 focus:border-electricBlue outline-none font-mono"
                    data-testid="input-new-tier-color-hex"
                  />
                </div>
                <button
                  onClick={async () => {
                    if (!newTierName.trim()) return;
                    await createTierMutation.mutateAsync({ name: newTierName.trim(), color: newTierColor });
                    setNewTierName("");
                  }}
                  disabled={createTierMutation.isPending || !newTierName.trim()}
                  className="bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                  data-testid="button-create-tier"
                >
                  {createTierMutation.isPending ? '...' : '+ ADD'}
                </button>
              </div>
              
              <div className="space-y-2">
                {dbTiers.map((tier: any) => (
                  <div key={tier.id} className="glass-panel p-4 flex items-center justify-between border border-white/10" data-testid={`tier-card-${tier.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: tier.color }}></div>
                      {editingTier?.id === tier.id ? (
                        <input
                          type="text"
                          value={editingTier.name}
                          onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                          className="bg-black/50 border border-electricBlue text-white text-xs px-2 py-1 outline-none"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm text-white font-header">{tier.name}</span>
                      )}
                      <span className="text-[10px] text-gray-500 font-mono">/{tier.slug}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingTier?.id === tier.id ? (
                        <>
                          <div className="flex gap-1 items-center">
                            {['#2962FF', '#FF3D00', '#D500F9', '#FFD700', '#00E676', '#FF6D00'].map((c) => (
                              <button
                                key={c}
                                onClick={() => setEditingTier({ ...editingTier, color: c })}
                                className={`w-5 h-5 rounded border ${editingTier.color === c ? 'border-white' : 'border-white/10'}`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                            <label className="relative w-5 h-5 rounded border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all" style={{ backgroundColor: editingTier.color }}>
                              <input
                                type="color"
                                value={editingTier.color}
                                onChange={(e) => setEditingTier({ ...editingTier, color: e.target.value.toUpperCase() })}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </label>
                            <input
                              type="text"
                              value={editingTier.color}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingTier({ ...editingTier, color: val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}` });
                              }}
                              placeholder="#HEX"
                              className="bg-black/50 border border-white/10 text-white text-[10px] px-1.5 py-1 w-[4.5rem] focus:border-electricBlue outline-none font-mono"
                            />
                          </div>
                          <button
                            onClick={async () => {
                              await updateTierMutation.mutateAsync({ id: tier.id, data: { name: editingTier.name, color: editingTier.color } });
                              setEditingTier(null);
                            }}
                            className="text-green-400 hover:text-green-300 p-1"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingTier(null)} className="text-gray-400 hover:text-white p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setEditingTier({ id: tier.id, name: tier.name, color: tier.color })} className="text-gray-400 hover:text-electricBlue p-1">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Delete this tier? Courses using it will keep their current level value.')) {
                                await deleteTierMutation.mutateAsync(tier.id);
                              }
                            }}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {dbTiers.length === 0 && (
                  <p className="text-[10px] text-gray-500 font-mono text-center py-4">No tiers defined yet. Add one above.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCourseEditor = () => {
    const currentLesson = lessons[selectedLessonId] || { title: "Select a Lesson", duration: "00:00", video: "placeholder.mp4", notes: "No lesson selected." };

    return (
    <div className="relative z-10">
      {/* BREADCRUMBS & HEADER */}
      <div className="mb-8">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mb-2">
          <button onClick={() => setCourseView('list')} className="hover:text-white">COURSES</button>
          <span>/</span>
          <input 
            type="text" 
            value={editorCourseTitle}
            onChange={(e) => setEditorCourseTitle(e.target.value)}
            className="bg-transparent border-b border-transparent focus:border-electricBlue outline-none hover:border-white/20 text-white font-bold px-1 -mx-1"
          />
          <span>/</span>
          <span className="text-electricBlue">EDIT CONTENT</span>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="font-header text-2xl text-white">COURSE EDITOR</h1>
          <div className="flex gap-4">
            <button onClick={() => setCourseView('list')} className="text-gray-400 text-xs hover:text-white transition-colors underline">Cancel</button>
            <button onClick={() => setCourseView('preview')} className="text-gray-400 text-xs hover:text-white transition-colors underline">Preview</button>
            <button onClick={handleSaveCourse} className="bg-green-500 text-black px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: STRUCTURE TREE */}
        <div className="lg:col-span-1 glass-panel p-0 overflow-hidden border border-white/10 h-[600px] flex flex-col">
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-header text-xs text-white">CURRICULUM</h3>
            <button onClick={handleAddModule} className="text-electricBlue text-xs hover:underline">+ New Module</button>
          </div>
          
          <div className="overflow-y-auto flex-grow p-2 space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="bg-white/5 rounded border border-white/5 mb-2 group/module">
                <div 
                  className="p-3 text-xs font-bold text-gray-300 flex justify-between cursor-pointer hover:bg-white/5 items-center"
                  onClick={() => setExpandedModuleId(expandedModuleId === module.id ? null : module.id)}
                >
                  <div className="flex items-center gap-2 flex-grow">
                    <span className="text-gray-500 text-[10px]">{expandedModuleId === module.id ? '▼' : '▶'}</span>
                    {editingModuleId === module.id ? (
                      <input 
                        autoFocus
                        type="text"
                        value={module.title}
                        onChange={(e) => handleModuleTitleUpdate(module.id, e.target.value)}
                        onBlur={() => setEditingModuleId(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingModuleId(null)}
                        className="bg-black/50 text-white border border-electricBlue/50 rounded px-2 py-1 w-full outline-none uppercase font-bold text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="uppercase py-1" onDoubleClick={(e) => { e.stopPropagation(); setEditingModuleId(module.id); }}>{module.title}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <span className="text-[10px] text-gray-500 group-hover/module:hidden">{module.lessons.length} Lessons</span>
                    
                    <div className="hidden group-hover/module:flex gap-1 items-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setEditingModuleId(module.id); }}
                        className="text-electricBlue hover:text-white p-1 hover:bg-white/10 rounded"
                        title="Edit Module Name"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); requestDeleteModule(module.id); }}
                        className="text-red-500 hover:text-red-400 p-1 hover:bg-white/10 rounded"
                        title="Delete Module"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedModuleId === module.id && (
                  <div className="pl-2 pr-2 pb-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
                    {module.lessons.map((lessonId) => {
                      const lesson = lessons[lessonId];
                      if (!lesson) return null;
                      return (
                        <div 
                          key={lessonId}
                          className={`p-2 text-[10px] rounded cursor-pointer flex justify-between items-center group/item transition-colors ${selectedLessonId === lessonId ? 'bg-electricBlue/20 text-white border-l-2 border-electricBlue' : 'text-gray-400 hover:bg-electricBlue/10 hover:text-white border-l-2 border-transparent'}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedLessonId(lessonId); }}
                        >
                          <span className="truncate pr-2">{lesson.title}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 shrink-0 rounded-full group-hover/item:hidden ${selectedLessonId === lessonId ? 'bg-electricBlue animate-pulse' : 'bg-green-500'}`}></div>
                            <button 
                              onClick={(e) => requestDeleteLesson(module.id, lessonId, e)}
                              className="hidden group-hover/item:block text-red-500 hover:text-red-400"
                              title="Delete Lesson"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {/* Add Lesson Button per Module */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddLesson(module.id); }}
                      className="w-full mt-2 py-1.5 border border-dashed border-white/10 text-[9px] text-gray-500 hover:text-white hover:border-white/30 rounded transition-colors"
                    >
                      + Add Lesson
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT EDITOR */}
        <div className="lg:col-span-2 glass-panel p-8 border border-white/10 relative min-h-[600px]">
          {!selectedLessonId ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Edit2 className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest">Select a lesson from the curriculum to edit</p>
            </div>
          ) : (
            <>
              {/* Lesson Metadata */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">LESSON TITLE</label>
                  <input 
                    value={currentLesson.title} 
                    onChange={(e) => handleLessonUpdate("title", e.target.value)}
                    type="text" 
                    className="bg-black/50 border border-white/10 text-white text-sm px-4 py-3 w-full focus:border-electricBlue outline-none font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">DURATION (MIN)</label>
                  <input 
                    value={currentLesson.duration} 
                    onChange={(e) => handleLessonUpdate("duration", e.target.value)}
                    type="text" 
                    className="bg-black/50 border border-white/10 text-white text-sm px-4 py-3 w-full focus:border-electricBlue outline-none font-mono" 
                  />
                </div>
              </div>

              {/* Video Upload */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">VIDEO SOURCE</label>
                    <span className="text-[10px] text-gray-500">Supports MP4, MOV or URL</span>
                </div>
                
                <div className="space-y-3">
                    <div className="h-48 bg-black/50 border-2 border-dashed border-white/10 rounded flex flex-col items-center justify-center cursor-pointer hover:border-electricBlue/50 transition-colors group relative overflow-hidden">
                    {/* Placeholder for uploaded video state */}
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        {currentLesson.video.startsWith('http') ? (
                             <div className="text-center">
                                <LinkIcon className="w-8 h-8 text-electricBlue mx-auto mb-2" />
                                <span className="text-xs font-mono text-white block max-w-xs truncate px-4">{currentLesson.video}</span>
                                <span className="text-[10px] text-gray-500 mt-1 block">External Link Linked</span>
                             </div>
                        ) : (
                            <div className="text-center">
                                 <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-xs font-bold text-white">MP4</span>
                                 </div>
                                 <span className="text-xs font-mono text-white">{currentLesson.video}</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-2 right-2 flex gap-2">
                        <button className="bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 hover:border-white">Replace File</button>
                    </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon className="h-3.5 w-3.5 text-gray-500 group-focus-within:text-electricBlue transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Or paste video URL (YouTube, Vimeo, etc.)" 
                            value={currentLesson.video.startsWith('http') ? currentLesson.video : ''}
                            onChange={(e) => handleLessonUpdate("video", e.target.value)}
                            className="bg-black/50 border border-white/10 text-white text-xs px-4 py-2.5 pl-9 w-full focus:border-electricBlue outline-none font-mono rounded transition-colors placeholder:text-gray-600"
                        />
                    </div>
                </div>
              </div>

              {/* Description Editor (Rich Text Mockup) */}
              <div className="mb-8">
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">LESSON NOTES</label>
                <div className="bg-black/50 border border-white/10 min-h-[200px] p-4 text-sm text-gray-300 font-sans">
                  <div className="flex gap-2 border-b border-white/10 pb-2 mb-4 text-gray-500">
                    <button className="hover:text-white"><Bold className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Italic className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Underline className="w-4 h-4" /></button>
                    <span className="w-px bg-white/10 h-4"></span>
                    <button className="hover:text-white"><LinkIcon className="w-4 h-4" /></button>
                    <button className="hover:text-white"><Code className="w-4 h-4" /></button>
                  </div>
                  <textarea 
                    value={currentLesson.notes}
                    onChange={(e) => handleLessonUpdate("notes", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-300 min-h-[120px] resize-none"
                  />
                  <br />
                  <p className="mt-4"><b>Key Prompts:</b></p>
                  <textarea 
                    value={currentLesson.keyPrompt || ""}
                    onChange={(e) => handleLessonUpdate("keyPrompt", e.target.value)}
                    className="font-mono bg-white/5 p-2 rounded mt-2 text-xs text-electricBlue w-full border border-transparent focus:border-electricBlue outline-none resize-none"
                    placeholder="Enter AI prompt for students to use..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-mono text-gray-500 uppercase">DOWNLOADABLE RESOURCES</label>
                  <div className="relative">
                    <input 
                        type="file" 
                        id="resource-upload" 
                        className="hidden" 
                        onChange={handleFileUpload}
                    />
                    <label 
                        htmlFor="resource-upload"
                        className="text-[10px] text-electricBlue hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <Plus className="w-3 h-3" /> Upload File
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  {(currentLesson.resources || []).length === 0 && (
                      <p className="text-[10px] text-gray-600 font-mono italic p-2 border border-dashed border-white/5 rounded">No resources attached.</p>
                  )}
                  {(currentLesson.resources || []).map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded group">
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">{resource.type}</div>
                        <span className="text-xs text-white">{resource.name}</span>
                        <span className="text-[10px] text-gray-500">({resource.size})</span>
                        </div>
                        <button 
                            onClick={() => handleRemoveResource(idx)}
                            className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  };

  const renderCoursePreview = () => {
    const currentLesson = lessons[selectedLessonId];
    
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
        {/* Preview Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCourseView('editor')}
              className="flex items-center gap-2 text-xs font-header font-bold text-gray-400 hover:text-white transition-colors"
            >
              ← BACK TO EDITOR
            </button>
            <div className="h-4 w-px bg-white/10"></div>
            <h2 className="text-sm font-header text-white tracking-widest">{editorCourseTitle}</h2>
            <span className="text-[10px] bg-electricBlue/20 text-electricBlue px-2 py-0.5 rounded border border-electricBlue/30 font-mono">PREVIEW MODE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-gray-500 uppercase">Progress</p>
              <div className="w-32 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 w-[0%]"></div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electricBlue to-purple-600 border border-white/20"></div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r border-white/10 bg-black/50 overflow-y-auto hidden lg:block">
            <div className="p-6">
              <h3 className="font-header text-lg text-white mb-2">COURSE CONTENT</h3>
              <p className="text-xs text-gray-500 font-mono mb-6">0% COMPLETED</p>
              
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={module.id} className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-[9px] font-mono">{index + 1}</span>
                      {module.title}
                    </h4>
                    <div className="space-y-1 pl-2 border-l border-white/5 ml-2.5">
                      {module.lessons.map((lessonId) => {
                        const lesson = lessons[lessonId];
                        if (!lesson) return null;
                        const isSelected = selectedLessonId === lessonId;
                        
                        return (
                          <div 
                            key={lessonId}
                            onClick={() => setSelectedLessonId(lessonId)}
                            className={`p-3 rounded text-[11px] cursor-pointer flex items-center gap-3 transition-colors ${isSelected ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-electricBlue animate-pulse' : 'bg-gray-700'}`}></div>
                            <span className="truncate">{lesson.title}</span>
                            <span className="ml-auto font-mono text-[9px] opacity-50">{lesson.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Stage */}
          <div className="flex-grow overflow-y-auto bg-[#050505]">
            <div className="max-w-5xl mx-auto p-8 lg:p-12">
              {currentLesson ? (
                <div className="space-y-8">
                  {/* Video Player */}
                  <div className="aspect-video bg-black rounded-lg border border-white/10 overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-6">
                      <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer">
                        <div className="bg-electricBlue h-full w-[30%] relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-4 text-white">
                          <button>Play</button>
                          <button>Rewind</button>
                          <span className="text-xs font-mono">04:20 / {currentLesson.duration}</span>
                        </div>
                        <div className="flex gap-4 text-white">
                          <button>Settings</button>
                          <button>Fullscreen</button>
                        </div>
                      </div>
                    </div>
                    
                    {currentLesson.video.startsWith('http') ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                            <div className="text-center">
                                <LinkIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-500 font-mono text-xs">External Content Linked</p>
                                <a href={currentLesson.video} target="_blank" rel="noopener noreferrer" className="text-electricBlue hover:underline text-xs mt-2 block">{currentLesson.video}</a>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                            <p className="text-gray-600 font-mono text-xs">VIDEO PREVIEW: {currentLesson.video}</p>
                        </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-header text-white mb-2">{currentLesson.title}</h1>
                        <p className="text-sm text-gray-400 font-mono">Lesson {Object.keys(lessons).indexOf(selectedLessonId) + 1} • {currentLesson.duration}</p>
                      </div>
                      <button className="bg-green-500 text-black px-6 py-3 text-xs font-header font-bold uppercase hover:bg-white transition-colors">
                        Mark Complete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="prose prose-invert max-w-none">
                          <h3 className="font-header text-lg text-white mb-4">LESSON NOTES</h3>
                          <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                            {currentLesson.notes}
                          </div>
                        </div>

                        {currentLesson.keyPrompt && (
                            <div className="bg-electricBlue/10 border border-electricBlue/20 p-6 rounded-lg mt-8">
                                <h3 className="font-header text-sm text-electricBlue mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-electricBlue animate-pulse"></div>
                                    AI PROMPT
                                </h3>
                                <div className="font-mono text-xs text-white bg-black/50 p-4 rounded border border-white/10 select-all">
                                    {currentLesson.keyPrompt}
                                </div>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(currentLesson.keyPrompt || "")}
                                  className="mt-3 text-[10px] text-electricBlue hover:text-white transition-colors flex items-center gap-1 uppercase font-bold tracking-wider"
                                >
                                    Copy to Clipboard
                                </button>
                            </div>
                        )}
                        
                        <div className="bg-white/5 border border-white/5 p-6 rounded-lg">
                          <h3 className="font-header text-sm text-white mb-4">DISCUSSION</h3>
                          <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                            <input 
                              type="text" 
                              placeholder="Ask a question or share your thoughts..." 
                              className="bg-black/50 border border-white/10 text-white text-xs px-4 py-2 w-full rounded focus:border-electricBlue outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-header text-xs text-gray-500 mb-4 uppercase">Resources</h3>
                          <div className="space-y-2">
                            {(currentLesson.resources || []).length > 0 ? (
                                (currentLesson.resources || []).map((resource, idx) => (
                                    <button key={idx} className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 hover:border-white/20 transition-colors rounded group text-left">
                                    <div className="w-8 h-8 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:text-white">{resource.type}</div>
                                    <div>
                                        <p className="text-xs text-white font-bold">{resource.name}</p>
                                        <p className="text-[10px] text-gray-500">{resource.size}</p>
                                    </div>
                                    <Download className="w-4 h-4 text-gray-500 ml-auto group-hover:text-white" />
                                    </button>
                                ))
                            ) : (
                                <p className="text-[10px] text-gray-600 font-mono italic">No resources available for this lesson.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 font-mono text-xs">
                  Select a lesson to preview content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStudents = () => (
    <div className="relative z-10">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-header text-2xl text-white mb-1">STUDENT MANAGEMENT</h1>
          <p className="text-xs text-gray-400 font-mono">Manage enrollments, progress, and support.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input type="text" placeholder="Search Students..." className="bg-black/50 border border-white/10 text-white text-xs px-4 py-2 w-64 rounded-full focus:border-electricBlue outline-none pl-10" />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors">
            Invite Student
          </button>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="glass-panel p-0 overflow-hidden border border-white/10">
        <table className="w-full text-left text-xs text-gray-400">
          <thead className="bg-white/5 text-gray-200 font-header border-b border-white/10">
            <tr>
              <th className="p-4">Name / Email</th>
              <th className="p-4">Enrolled Course</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Last Active</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {studentsList.map((student) => (
              <tr key={student.id} className={`hover:bg-white/5 transition-colors group cursor-pointer ${student.status === 'PENDING' ? 'opacity-60' : ''}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-${student.avatarColor} flex items-center justify-center text-white font-bold text-[10px]`}>{student.initials}</div>
                    <div>
                      <p className={`text-${student.status === 'PENDING' ? 'gray-300' : 'white'} font-bold`}>{student.name}</p>
                      <p className="text-[10px] text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className={`p-4 ${student.status === 'PENDING' ? 'text-gray-400' : 'text-white'}`}>{student.enrolledCourse}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full w-[${student.progress}%] ${student.progress > 50 ? 'bg-green-500' : student.progress > 0 ? 'bg-signalOrange' : 'bg-gray-500'}`} style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <span className={`${student.progress > 50 ? 'text-green-500' : student.progress > 0 ? 'text-signalOrange' : 'text-gray-500'}`}>{student.progress}%</span>
                  </div>
                </td>
                <td className="p-4">{student.lastActive}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded ${student.status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' : student.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEditStudent(student)} className="text-gray-500 hover:text-white mr-2">Edit</button>
                  <button onClick={() => handleViewStudent(student)} className="text-electricBlue hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-500">
          <span>Showing {studentsList.length} of 1,204 Students</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 text-white">Previous</button>
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 text-white">Next</button>
          </div>
        </div>
      </div>
      
      {/* Edit Student Modal */}
      {isStudentModalOpen && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-8 max-w-md w-full border border-white/10 relative">
            <button 
              onClick={() => setIsStudentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="font-header text-xl text-white mb-6">
              {studentModalMode === "edit" ? "EDIT STUDENT" : "STUDENT PROFILE"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={editingStudent.name}
                  disabled={studentModalMode === "view"}
                  onChange={(e) => handleStudentFormChange("name", e.target.value)}
                  className={`bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none ${studentModalMode === "view" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={editingStudent.email}
                  disabled={studentModalMode === "view"}
                  onChange={(e) => handleStudentFormChange("email", e.target.value)}
                  className={`bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-electricBlue outline-none ${studentModalMode === "view" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Status</label>
                <div className="flex gap-2">
                  {(["ACTIVE", "PENDING", "INACTIVE"] as const).map(status => (
                    <button
                      key={status}
                      disabled={studentModalMode === "view"}
                      onClick={() => handleStudentFormChange("status", status)}
                      className={`flex-1 py-2 text-[10px] font-bold border ${editingStudent.status === status ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'} ${studentModalMode === "view" ? "cursor-not-allowed opacity-80" : ""}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsStudentModalOpen(false)}
                  className={`flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors ${studentModalMode === "view" ? "w-full" : ""}`}
                >
                  {studentModalMode === "view" ? "CLOSE" : "CANCEL"}
                </button>
                {studentModalMode === "edit" && (
                  <button 
                    onClick={handleSaveStudent}
                    className="flex-1 py-3 text-xs font-header font-bold text-black bg-electricBlue hover:bg-white transition-colors"
                  >
                    SAVE CHANGES
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    
    setEditingProduct({ ...editingProduct, image: imageUrl });
    
    // Reset the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const handleImagePositionChange = (direction: 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut') => {
    if (!editingProduct) return;
    
    const currentPos = editingProduct.imagePosition || { x: 50, y: 50, zoom: 1 };
    let { x, y, zoom } = currentPos;
    
    // Ensure zoom is defined if coming from older data
    if (zoom === undefined) zoom = 1;
    
    const STEP = 5;
    const ZOOM_STEP = 0.1;
    
    switch (direction) {
      case 'up': y = Math.max(0, y - STEP); break;
      case 'down': y = Math.min(100, y + STEP); break;
      case 'left': x = Math.max(0, x - STEP); break;
      case 'right': x = Math.min(100, x + STEP); break;
      case 'zoomIn': zoom = Math.min(3, zoom + ZOOM_STEP); break;
      case 'zoomOut': zoom = Math.max(1, zoom - ZOOM_STEP); break;
    }
    
    setEditingProduct({ ...editingProduct, imagePosition: { x, y, zoom } });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !editingProduct || !dragStartRef.current) return;
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Reset drag start to current position for next frame
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    
    const currentPos = editingProduct.imagePosition || { x: 50, y: 50, zoom: 1 };
    
    // Inverse logic: dragging mouse right moves background left (so x increases in bg position logic usually, but let's test)
    // Actually background-position percentage: 0% is left, 100% is right.
    // To move the image "right" within the container, we decrease the percentage? No, 0% aligns left edge of image to left edge of container.
    // Let's just create a sensitivity factor
    const sensitivity = 0.5;
    
    let newX = Math.max(0, Math.min(100, currentPos.x - (deltaX * sensitivity)));
    let newY = Math.max(0, Math.min(100, currentPos.y - (deltaY * sensitivity)));
    
    setEditingProduct({ 
      ...editingProduct, 
      imagePosition: { ...currentPos, x: newX, y: newY } 
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const renderAssetStore = () => (
    <div className="relative z-10">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-header text-2xl text-white mb-1">DIGITAL ASSETS</h1>
          <p className="text-xs text-gray-400 font-mono">Manage product files, pricing, and licenses.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleAddProduct}
            className="bg-neonPurple text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors"
          >
            + Add New Product
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 items-center">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setSelectedProductCategory("ALL")}
            className={`text-xs font-bold transition-colors pb-4 -mb-4.5 border-b-2 whitespace-nowrap ${
              selectedProductCategory === "ALL" 
                ? "text-white border-neonPurple" 
                : "text-gray-500 hover:text-white border-transparent"
            }`}
          >
            ALL PRODUCTS
          </button>
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setSelectedProductCategory(category)}
              className={`text-xs font-bold transition-colors pb-4 -mb-4.5 border-b-2 whitespace-nowrap ${
                selectedProductCategory === category 
                  ? "text-white border-neonPurple" 
                  : "text-gray-500 hover:text-white border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="ml-auto pl-4 border-l border-white/10">
           <button 
             onClick={() => setIsCategoryManagerOpen(true)}
             className="text-[10px] font-mono text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
           >
             <Edit2 className="w-3 h-3" /> MANAGE CATEGORIES
           </button>
        </div>
      </div>

      {/* Category Manager Modal */}
      {isCategoryManagerOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-6 max-w-sm w-full border border-white/10 relative">
            <button 
              onClick={() => setIsCategoryManagerOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="font-header text-lg text-white mb-6">MANAGE CATEGORIES</h2>
            
            <div className="space-y-4 mb-6">
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={newCategoryName}
                   onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
                   placeholder="NEW CATEGORY NAME"
                   className="flex-grow bg-black/50 border border-white/10 text-white text-xs px-3 py-2 focus:border-neonPurple outline-none font-bold placeholder:font-normal"
                 />
                 <button 
                   onClick={handleAddCategory}
                   disabled={!newCategoryName}
                   className="bg-white/10 hover:bg-white/20 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
               
               <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                 {categories.map((category, index) => (
                   <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 group">
                     {editingCategoryIndex === index ? (
                       <div className="flex items-center gap-2 w-full">
                         <input 
                           type="text" 
                           value={editingCategoryName}
                           onChange={(e) => setEditingCategoryName(e.target.value.toUpperCase())}
                           className="flex-grow bg-black border border-neonPurple text-white text-[10px] px-2 py-1 outline-none font-bold"
                           autoFocus
                         />
                         <button onClick={() => handleEditCategorySave(index)} className="text-green-500 hover:text-green-400"><Code className="w-3 h-3" /></button> {/* Using Code icon as Check replacement temporarily */}
                       </div>
                     ) : (
                       <>
                         <span className="text-[10px] font-bold text-gray-300">{category}</span>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => handleEditCategoryStart(index)} className="text-gray-500 hover:text-white"><Edit2 className="w-3 h-3" /></button>
                           <button onClick={() => handleDeleteCategory(index)} className="text-gray-500 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                         </div>
                       </>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsList
          .filter(p => selectedProductCategory === "ALL" || p.category === selectedProductCategory)
          .map((product) => (
          <div key={product.id} className={`glass-panel p-0 overflow-hidden border border-white/10 ${product.status === 'ACTIVE' ? 'hover:border-neonPurple/50' : 'hover:border-white/30 opacity-70'} transition-colors group relative`}>
            <div className="h-40 bg-gray-900 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
              {product.image ? (
                <div 
                  className="absolute inset-0 bg-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                  style={{ 
                    backgroundImage: `url('${product.image}')`,
                    backgroundPosition: `${product.imagePosition?.x || 50}% ${product.imagePosition?.y || 50}%`,
                    transform: `scale(${product.imagePosition?.zoom || 1})`,
                    transformOrigin: `${product.imagePosition?.x || 50}% ${product.imagePosition?.y || 50}%` // This ensures zoom happens around the focal point
                  }}
                ></div>
              ) : (
                <div className="text-white/20 text-4xl font-header">+</div>
              )}
              <div className={`absolute top-2 right-2 ${product.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'} text-black text-[10px] font-bold px-2 py-1 rounded`}>
                {product.status}
              </div>
            </div>
            <div className="p-6">
              <p className="text-[9px] font-bold text-neonPurple mb-2 tracking-widest">{product.category}</p>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-header text-sm text-white">{product.title}</h3>
                <span className={`font-mono font-bold ${product.status === 'ACTIVE' ? 'text-neonPurple' : 'text-gray-500'}`}>{product.price}</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-4">{product.sales} Sales • {product.revenue}</p>
              
              <div className="flex gap-2">
                {product.status === 'DRAFT' && (
                   <button className="flex-1 bg-neonPurple/20 text-neonPurple hover:bg-neonPurple/30 text-[10px] py-2 rounded border border-neonPurple/30 transition-colors">Publish</button>
                )}
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors"
                >
                  Edit Details
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Update Files</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-8 max-w-md w-full border border-white/10 relative">
            <button 
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="font-header text-xl text-white mb-6">
              {productsList.find(p => p.id === editingProduct.id) ? "EDIT PRODUCT" : "NEW PRODUCT"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Product Title</label>
                <input 
                  type="text" 
                  value={editingProduct.title}
                  onChange={(e) => handleProductFormChange("title", e.target.value)}
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none uppercase font-bold"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Price</label>
                  <input 
                    type="text" 
                    value={editingProduct.price}
                    onChange={(e) => handleProductFormChange("price", e.target.value)}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Status</label>
                  <select 
                    value={editingProduct.status}
                    onChange={(e) => handleProductFormChange("status", e.target.value)}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none appearance-none"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="ACTIVE">ACTIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Category</label>
                <div className="flex gap-2">
                  <select 
                    value={editingProduct.category}
                    onChange={(e) => handleProductFormChange("category", e.target.value)}
                    className="flex-grow bg-black/50 border border-white/10 text-white text-xs px-4 py-3 focus:border-neonPurple outline-none appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setIsCategoryManagerOpen(true)}
                    className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-3 flex items-center justify-center transition-colors"
                    title="Manage Categories"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Cover Image</label>
                
                <div className="flex gap-2 items-stretch">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      value={editingProduct.image}
                      onChange={(e) => handleProductFormChange("image", e.target.value)}
                      placeholder="https://..."
                      className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                    />
                  </div>
                  <div className="relative">
                    <input 
                        type="file" 
                        id="product-image-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleProductImageUpload}
                    />
                    <label 
                        htmlFor="product-image-upload"
                        className="h-full bg-white/5 border border-white/10 text-white hover:bg-white/10 px-4 flex items-center justify-center cursor-pointer transition-colors"
                        title="Upload Image"
                    >
                        <Plus className="w-4 h-4" />
                    </label>
                  </div>
                </div>
                {editingProduct.image && (
                  <div 
                    className={`mt-2 h-40 w-full bg-gray-900 border border-white/5 rounded overflow-hidden relative group cursor-move ${isDragging ? 'border-neonPurple' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-no-repeat"
                      style={{ 
                        backgroundImage: `url('${editingProduct.image}')`,
                        backgroundPosition: `${editingProduct.imagePosition?.x || 50}% ${editingProduct.imagePosition?.y || 50}%`,
                        transform: `scale(${editingProduct.imagePosition?.zoom || 1})`,
                        transformOrigin: `${editingProduct.imagePosition?.x || 50}% ${editingProduct.imagePosition?.y || 50}%`, // Focus zoom on the position
                        opacity: 0.6
                      }}
                    />
                    
                    {/* Position Controls Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                      <div className="flex justify-end gap-2 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={(e) => { e.preventDefault(); handleImagePositionChange('zoomIn'); }} className="p-2 bg-black/80 text-white hover:bg-neonPurple rounded shadow-lg border border-white/10" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
                         <button onClick={(e) => { e.preventDefault(); handleImagePositionChange('zoomOut'); }} className="p-2 bg-black/80 text-white hover:bg-neonPurple rounded shadow-lg border border-white/10" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-black/50 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                            <Move className="w-6 h-6 text-white/80" />
                         </div>
                      </div>

                      <div className="flex justify-end pointer-events-none">
                        <span className="text-[10px] bg-black/50 px-2 py-1 rounded text-white font-mono backdrop-blur-sm border border-white/5">
                          POS: {Math.round(editingProduct.imagePosition?.x || 50)}% {Math.round(editingProduct.imagePosition?.y || 50)}% • ZOOM: {((editingProduct.imagePosition?.zoom || 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleSaveProduct}
                  className="flex-1 py-3 text-xs font-header font-bold text-white bg-neonPurple hover:bg-white hover:text-black transition-colors"
                >
                  SAVE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: "dashboard", label: "OVERVIEW", icon: LayoutDashboard },
    { id: "courses", label: "COURSES", icon: BookOpen },
    { id: "students", label: "STUDENTS", icon: Users },
    { id: "store", label: "ASSETS", icon: ShoppingBag },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
    { id: "pipeline", label: "PIPELINE", icon: Workflow },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden flex flex-col">
      
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-electricBlue text-xl font-header">∞</span>
              <h1 className="font-header text-3xl md:text-4xl text-white">ADMIN PANEL</h1>
            </div>
            <p className="text-sm text-gray-400 font-mono">System management and content control.</p>
          </div>
        </div>

        <div className="flex gap-1 mb-8 border-b border-white/10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "courses") setCourseView("list");
                }}
                data-testid={`tab-${tab.id}`}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-header font-bold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-white border-electricBlue"
                    : "text-gray-500 hover:text-white border-transparent hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className={`${activeTab === "pipeline" ? "flex flex-col" : ""}`}>
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "courses" && (
            courseView === "list" ? renderCourseList() : 
            courseView === "preview" ? renderCoursePreview() : 
            renderCourseEditor()
          )}
          {activeTab === "students" && renderStudents()}
          {activeTab === "store" && renderAssetStore()}
          {activeTab === "analytics" && renderAnalytics()}
          {activeTab === "pipeline" && <PipelineContent />}
        </div>

        {deleteConfirmation?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0a0a0a] border border-white/10 p-6 max-w-sm w-full shadow-2xl relative">
              <button 
                onClick={() => setDeleteConfirmation(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500 border border-red-500/20">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="font-header text-lg text-white mb-2">CONFIRM DELETION</h3>
                <p className="text-xs font-mono text-gray-400">
                  Are you sure you want to delete <span className="text-white font-bold">"{deleteConfirmation.title}"</span>? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 text-xs font-header font-bold text-black bg-red-500 hover:bg-white transition-colors"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}