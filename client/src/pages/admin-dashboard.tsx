import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, BookOpen, Users, ShoppingBag, BarChart2, Plus, Download, Bold, Italic, Underline, Link as LinkIcon, Code, X, Search, Edit2, Trash2 } from "lucide-react";

const INITIAL_LESSONS = {
  "1.1": { id: "1.1", title: "The Multimodal Script", duration: "12:45", video: "multimodal_script_v3.mp4", notes: "Introduction to multimodal scripting techniques using Gemini 1.5 Pro." },
  "1.2": { id: "1.2", title: "Context is King", duration: "08:30", video: "context_king_final.mp4", notes: "Understanding the importance of context window in long-form generation." },
  "1.3": { id: "1.3", title: "Visual Bible (Editing)", duration: "15:10", video: "visual_bible_v2.mp4", notes: "How to compile a visual bible from generated assets." },
  "2.1": { id: "2.1", title: "Set Design AI", duration: "10:20", video: "set_design_ai.mp4", notes: "Using AI to generate consistent set designs." },
  "2.2": { id: "2.2", title: "Lighting Consistency", duration: "14:15", video: "lighting_fix.mp4", notes: "maintaining lighting across multiple generated shots." },
  "2.3": { id: "2.3", title: "Camera Movements", duration: "09:45", video: "camera_moves.mp4", notes: "Simulating dolly and crane shots." },
  "2.4": { id: "2.4", title: "Color Grading", duration: "11:30", video: "color_grade_lut.mp4", notes: "Applying cinematic LUTs to generated video." },
  "3.1": { id: "3.1", title: "Shot Prompting", duration: "08:15", video: "shot_prompting.mp4", notes: "Specific prompting techniques for camera angles." },
  "3.2": { id: "3.2", title: "Camera Angles", duration: "07:45", video: "angles_master.mp4", notes: "Wide, medium, and close-up shot consistency." },
  "3.3": { id: "3.3", title: "Movement Control", duration: "13:20", video: "movement_ctrl.mp4", notes: "Controlling character movement within the frame." },
  "3.4": { id: "3.4", title: "Upscaling", duration: "06:50", video: "upscale_4k.mp4", notes: "Best practices for upscaling to 4K." },
  "3.5": { id: "3.5", title: "Final Export", duration: "18:00", video: "export_settings.mp4", notes: "Codecs and wrappers for final delivery." }
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courseView, setCourseView] = useState<"list" | "editor">("list");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>("course-1");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("1.1");
  const [logs, setLogs] = useState<string[]>([]);
  const [editorCourseTitle, setEditorCourseTitle] = useState("MASTER THE GOOGLE ECOSYSTEM");
  const terminalRef = useRef<HTMLDivElement>(null);

  // State for Lessons Data
  const [lessons, setLessons] = useState<Record<string, Lesson>>(INITIAL_LESSONS);

  // State for Modules Structure
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);

  const [coursesList, setCoursesList] = useState<Course[]>([
    {
      id: "course-1",
      title: "MASTER THE GOOGLE ECOSYSTEM",
      code: "L1",
      color: "blue-900",
      lastUpdated: "2h ago",
      students: "3,420",
      price: "$149",
      status: "LIVE",
      modules: INITIAL_MODULES,
      lessons: INITIAL_LESSONS
    },
    {
      id: "course-2",
      title: "ADVANCED AI CINEMATOGRAPHY",
      code: "L2",
      color: "orange-900",
      lastUpdated: "1d ago",
      students: "1,105",
      price: "$199",
      status: "DRAFT",
      modules: [],
      lessons: {}
    }
  ]);
  
  const [editorCourseId, setEditorCourseId] = useState<string | null>(null);

  const handleCreateCourse = () => {
    setActiveTab("courses");
    setLessons({});
    setModules([]);
    setEditorCourseTitle("UNTITLED COURSE");
    setSelectedLessonId("");
    setEditorCourseId(null);
    setCourseView('editor');
  };

  const handleEditCourse = (courseId: string) => {
    const course = coursesList.find(c => c.id === courseId);
    if (course) {
      setLessons(course.lessons);
      setModules(course.modules);
      setEditorCourseTitle(course.title);
      setEditorCourseId(courseId);
      // Select first lesson if available
      if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        setSelectedLessonId(course.modules[0].lessons[0]);
      } else {
        setSelectedLessonId("");
      }
      setCourseView('editor');
    }
  };
  
  const handleSaveCourse = () => {
    if (editorCourseId) {
      // Update existing course
      setCoursesList(coursesList.map(c => {
        if (c.id === editorCourseId) {
          return { ...c, title: editorCourseTitle, modules, lessons, lastUpdated: "Just now" };
        }
        return c;
      }));
    } else {
      // Create new course
      const newCourseId = `course-${coursesList.length + 1}`;
      const newCourse = {
        id: newCourseId,
        title: editorCourseTitle,
        code: `L${coursesList.length + 1}`,
        color: "purple-900",
        lastUpdated: "Just now",
        students: "0",
        price: "$0",
        status: "DRAFT",
        modules,
        lessons
      };
      setCoursesList([...coursesList, newCourse]);
    }
    setCourseView('list');
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; type: 'module' | 'lesson'; id: string; title: string; parentId?: string } | null>(null);
  
  const handleAddModule = () => {
    const newId = `module-${modules.length + 1}`;
    setModules([...modules, { id: newId, title: "NEW MODULE", status: "Draft", lessons: [] }]);
  };

  const handleAddLesson = (moduleId: string) => {
    const newLessonId = `${moduleId}.${Date.now().toString().slice(-4)}`;
    const newLesson = { id: newLessonId, title: "New Lesson", duration: "00:00", video: "placeholder.mp4", notes: "Add notes here..." };
    
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
    }
    setDeleteConfirmation(null);
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
    <div className="relative z-10 p-8 max-w-7xl mx-auto">
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
                <td className="p-4">Level 01 Certification</td>
                <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">PAID</span></td>
                <td className="p-4 text-right">$149.00</td>
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
                <td className="p-4">Level 01 Certification</td>
                <td className="p-4"><span className="bg-red-500/20 text-red-500 px-2 py-1 rounded">FAILED</span></td>
                <td className="p-4 text-right">$149.00</td>
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
      setExpandedModuleId(null); // Reset module selection when switching courses
    };

    const toggleModule = (id: string) => {
      setExpandedModuleId(expandedModuleId === id ? null : id);
    };

    return (
      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-header text-2xl text-white mb-1">COURSE MANAGEMENT</h1>
            <p className="text-xs text-gray-400 font-mono">Manage curriculum, uploads, and pricing.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleCreateCourse}
              className="bg-electricBlue text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors"
            >
              + Create New Course
            </button>
          </div>
        </div>

          {/* COURSE LIST */}
        <div className="space-y-6">
          
          {coursesList.map((course) => (
            <div key={course.id} className={`glass-panel p-0 overflow-hidden border transition-colors group ${expandedCourseId === course.id ? 'border-electricBlue/50' : 'border-white/10 hover:border-electricBlue/30'} ${course.status === 'DRAFT' ? 'opacity-90' : ''}`}>
              <div 
                className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5 cursor-pointer"
                onClick={() => toggleCourse(course.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gray-900 shrink-0 relative overflow-hidden rounded border border-white/10`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${course.color}/40 to-black`}></div>
                    <span className="absolute inset-0 flex items-center justify-center font-header text-white text-xs">{course.code}</span>
                  </div>
                  <div>
                    <h3 className="font-header text-sm text-white uppercase">{course.title}</h3>
                    <p className="text-[10px] text-gray-400 font-mono">ID: #{course.id.toUpperCase()} • Last Updated: {course.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-white font-bold">{course.students}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-400 font-bold">{course.price}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Price</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-[10px] font-bold border ${course.status === 'LIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>{course.status}</span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {expandedCourseId === course.id ? '▲' : '▼'}
                  </button>
                </div>
              </div>
              
              {/* Modules (Collapsible) */}
              {expandedCourseId === course.id && (
                <div className="bg-black/30 p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  {course.modules.length === 0 ? (
                     <div className="p-4 text-center text-gray-500 text-xs font-mono border border-dashed border-white/10 rounded">
                        No modules created yet. <button onClick={(e) => { e.stopPropagation(); handleEditCourse(course.id); }} className="text-electricBlue hover:underline">Start building curriculum</button>
                     </div>
                  ) : (
                    course.modules.map((module) => (
                      <div key={module.id} className="bg-white/5 rounded border border-white/5 overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-3 hover:bg-white/5 cursor-pointer"
                          onClick={() => toggleModule(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600 text-xs">::</span>
                            <span className="text-xs text-gray-300 font-medium">{module.title}</span>
                          </div>
                          <div className="flex gap-3 text-[10px]">
                            <span className="text-gray-500">{module.lessons.length} Lessons</span>
                            <button onClick={(e) => { e.stopPropagation(); handleEditCourse(course.id); }} className="text-electricBlue hover:underline">Edit</button>
                          </div>
                        </div>
                        
                        {/* Lessons for Module */}
                        {expandedModuleId === module.id && (
                          <div className="bg-black/20 border-t border-white/5 p-2 space-y-1">
                            {module.lessons.map((lessonId) => {
                                const lesson = course.lessons ? course.lessons[lessonId] : lessons[lessonId];
                                if (!lesson) return null;
                                return (
                                  <div 
                                    key={lessonId}
                                    className="flex items-center justify-between p-2 pl-8 text-[10px] text-gray-400 hover:text-white hover:bg-white/5 rounded cursor-pointer group/lesson"
                                    onClick={() => handleEditCourse(course.id)}
                                  >
                                    <span>{lesson.title}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-600 group-hover/lesson:hidden">{lesson.duration}</span>
                                      <div className="hidden group-hover/lesson:flex gap-1">
                                        <button className="p-1 hover:bg-white/10 rounded text-electricBlue" title="Edit">
                                          <Edit2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {course.modules.length > 0 && (
                      <button onClick={(e) => { e.stopPropagation(); handleEditCourse(course.id); }} className="w-full py-2 text-[10px] text-gray-500 hover:text-white hover:bg-white/5 border border-dashed border-white/10 rounded transition-colors">
                        + Edit Course Content
                      </button>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    );
  };

  const renderCourseEditor = () => {
    const currentLesson = lessons[selectedLessonId] || { title: "Select a Lesson", duration: "00:00", video: "placeholder.mp4", notes: "No lesson selected." };

    return (
    <div className="relative z-10 p-8 max-w-7xl mx-auto">
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
            <button className="text-gray-400 text-xs hover:text-white transition-colors underline">Preview</button>
            <button onClick={handleSaveCourse} className="bg-green-500 text-black px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: STRUCTURE TREE */}
        <div className="lg:col-span-1 glass-panel p-0 overflow-hidden border border-white/10 h-[calc(100vh-200px)] flex flex-col">
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-header text-xs text-white">CURRICULUM</h3>
            <button onClick={handleAddModule} className="text-electricBlue text-xs hover:underline">+ New Module</button>
          </div>
          
          <div className="overflow-y-auto flex-grow p-2 space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="bg-white/5 rounded border border-white/5 mb-2 group/module">
                <div className="p-3 text-xs font-bold text-gray-300 flex justify-between cursor-pointer hover:bg-white/5">
                  <span className="uppercase">{module.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 group-hover/module:hidden">{module.status}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); requestDeleteModule(module.id); }}
                      className="hidden group-hover/module:block text-red-500 hover:text-red-400"
                      title="Delete Module"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="pl-2 pr-2 pb-2 space-y-1">
                  {module.lessons.map((lessonId) => {
                    const lesson = lessons[lessonId];
                    if (!lesson) return null;
                    return (
                      <div 
                        key={lessonId}
                        className={`p-2 text-[10px] rounded cursor-pointer flex justify-between items-center group/item transition-colors ${selectedLessonId === lessonId ? 'bg-electricBlue/20 text-white border-l-2 border-electricBlue' : 'text-gray-400 hover:bg-electricBlue/10 hover:text-white border-l-2 border-transparent'}`}
                        onClick={() => setSelectedLessonId(lessonId)}
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
                    onClick={() => handleAddLesson(module.id)}
                    className="w-full mt-2 py-1.5 border border-dashed border-white/10 text-[9px] text-gray-500 hover:text-white hover:border-white/30 rounded transition-colors"
                  >
                    + Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT EDITOR */}
        <div className="lg:col-span-2 glass-panel p-8 border border-white/10 relative">
          
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
            <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">VIDEO SOURCE</label>
            <div className="h-48 bg-black/50 border-2 border-dashed border-white/10 rounded flex flex-col items-center justify-center cursor-pointer hover:border-electricBlue/50 transition-colors group relative overflow-hidden">
              {/* Placeholder for uploaded video state */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <span className="text-xs font-mono text-white">{currentLesson.video}</span>
              </div>
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button className="bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 hover:border-white">Replace</button>
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
              <p className="font-mono bg-white/5 p-2 rounded mt-2 text-xs text-electricBlue">"Analyze this image as a Director of Photography..."</p>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-mono text-gray-500 uppercase">DOWNLOADABLE RESOURCES</label>
              <button className="text-[10px] text-electricBlue hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Upload File
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">PDF</div>
                  <span className="text-xs text-white">Visual_Bible_Template.pdf</span>
                </div>
                <button className="text-gray-500 hover:text-red-500"><X className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
  };

  const renderStudents = () => (
    <div className="relative z-10 p-8 max-w-7xl mx-auto">
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
            
            {/* Student 1 */}
            <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-white font-bold text-[10px]">SJ</div>
                  <div>
                    <p className="text-white font-bold">Sarah Jenkins</p>
                    <p className="text-[10px] text-gray-500">sarah.j@example.com</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-white">Master the Ecosystem (L1)</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                  <span className="text-green-500">85%</span>
                </div>
              </td>
              <td className="p-4">2 hours ago</td>
              <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">ACTIVE</span></td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-white mr-2">Edit</button>
                <button className="text-electricBlue hover:underline">View</button>
              </td>
            </tr>

            {/* Student 2 */}
            <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-900 flex items-center justify-center text-white font-bold text-[10px]">MD</div>
                  <div>
                    <p className="text-white font-bold">Mike Davis</p>
                    <p className="text-[10px] text-gray-500">mike.dfx@studio.net</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-white">Advanced Cinematography (L2)</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-signalOrange w-[12%]"></div>
                  </div>
                  <span className="text-signalOrange">12%</span>
                </div>
              </td>
              <td className="p-4">1 day ago</td>
              <td className="p-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">ACTIVE</span></td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-white mr-2">Edit</button>
                <button className="text-electricBlue hover:underline">View</button>
              </td>
            </tr>

            {/* Student 3 */}
            <tr className="hover:bg-white/5 transition-colors group cursor-pointer opacity-60">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-[10px]">JD</div>
                  <div>
                    <p className="text-gray-300 font-bold">John Doe</p>
                    <p className="text-[10px] text-gray-500">jdoe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-gray-400">Master the Ecosystem (L1)</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 w-[0%]"></div>
                  </div>
                  <span className="text-gray-500">0%</span>
                </div>
              </td>
              <td className="p-4">Never</td>
              <td className="p-4"><span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">PENDING</span></td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-white mr-2">Resend</button>
                <button className="text-electricBlue hover:underline">View</button>
              </td>
            </tr>

          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-500">
          <span>Showing 3 of 1,204 Students</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 text-white">Previous</button>
            <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssetStore = () => (
    <div className="relative z-10 p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-header text-2xl text-white mb-1">DIGITAL ASSETS</h1>
          <p className="text-xs text-gray-400 font-mono">Manage product files, pricing, and licenses.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-neonPurple text-white px-4 py-2 text-[10px] font-header font-bold uppercase hover:bg-white hover:text-black transition-colors">
            + Add New Product
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        <button className="text-xs font-bold text-white border-b-2 border-neonPurple pb-4 -mb-4.5">ALL PRODUCTS</button>
        <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors pb-4">TEXTURES</button>
        <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors pb-4">CHARACTER SHEETS</button>
        <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors pb-4">AUDIO PACKS</button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Product Card 1 */}
        <div className="glass-panel p-0 overflow-hidden border border-white/10 hover:border-neonPurple/50 transition-colors group relative">
          <div className="h-40 bg-gray-900 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute top-2 right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded">ACTIVE</div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-header text-sm text-white">NEON NOIR TEXTURES</h3>
              <span className="font-mono text-neonPurple font-bold">$29</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4">124 Sales • $3,596 Revenue</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Edit Details</button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Update Files</button>
            </div>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="glass-panel p-0 overflow-hidden border border-white/10 hover:border-neonPurple/50 transition-colors group relative">
          <div className="h-40 bg-gray-900 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute top-2 right-2 bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded">ACTIVE</div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-header text-sm text-white">SCI-FI CHARACTERS VOL. 1</h3>
              <span className="font-mono text-neonPurple font-bold">$49</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4">89 Sales • $4,361 Revenue</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Edit Details</button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Update Files</button>
            </div>
          </div>
        </div>

        {/* Product Card 3 (Draft) */}
        <div className="glass-panel p-0 overflow-hidden border border-white/10 hover:border-white/30 transition-colors group relative opacity-70">
          <div className="h-40 bg-gray-900 relative flex items-center justify-center border-b border-white/5">
            <div className="text-white/20 text-4xl font-header">+</div>
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded">DRAFT</div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-header text-sm text-white">CINEMATIC SFX PACK</h3>
              <span className="font-mono text-gray-500 font-bold">$19</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4">0 Sales • Unreleased</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-neonPurple/20 text-neonPurple hover:bg-neonPurple/30 text-[10px] py-2 rounded border border-neonPurple/30 transition-colors">Publish</button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-2 rounded border border-white/10 transition-colors">Edit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-hidden h-screen flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black border-r border-white/10 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="font-header font-bold text-lg tracking-widest text-white flex items-center gap-2">
              <span className="text-electricBlue text-xl">∞</span> ADMIN
            </Link>
          </div>
          
          <nav className="p-4 space-y-2">
            <p className="text-[10px] font-mono text-gray-500 px-4 py-2 uppercase tracking-widest">Main Menu</p>
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "dashboard" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <LayoutDashboard className="w-4 h-4" /> DASHBOARD
            </button>
            <button 
              onClick={() => { setActiveTab("courses"); setCourseView("list"); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "courses" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <BookOpen className="w-4 h-4" /> COURSES
            </button>
            <button 
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "students" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <Users className="w-4 h-4" /> STUDENTS
            </button>
            <button 
              onClick={() => setActiveTab("store")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "store" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <ShoppingBag className="w-4 h-4" /> ASSET STORE
            </button>
            <button 
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-header font-bold rounded transition-colors ${activeTab === "analytics" ? "bg-white/10 text-white border-l-2 border-electricBlue" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <BarChart2 className="w-4 h-4" /> ANALYTICS
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"></div>
              <span className="absolute inset-0 flex items-center justify-center font-header text-white text-[10px]">AD</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">ALEX DIRECTOR</p>
              <p className="text-[10px] text-green-500 font-mono">SYSTEM ADMIN</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow overflow-y-auto relative">
        {/* GRID OVERLAY */}
        <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "courses" && (courseView === "list" ? renderCourseList() : renderCourseEditor())}
        {activeTab === "students" && renderStudents()}
        {activeTab === "store" && renderAssetStore()}
        {activeTab === "analytics" && (
          <div className="relative z-10 p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <BarChart2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-header text-gray-400">ANALYTICS MODULE COMING SOON</h2>
            </div>
          </div>
        )}
        {/* DELETE CONFIRMATION MODAL */}
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
    </div>
  );
}