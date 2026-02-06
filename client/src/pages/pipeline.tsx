import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Circle, 
  CheckCircle2, 
  Brain, 
  Clapperboard, 
  Film, 
  PanelRightOpen, 
  PanelRightClose,
  Sparkles,
  Send,
  RotateCcw
} from "lucide-react";

type StepStatus = "locked" | "active" | "complete";

interface PipelineStep {
  id: number;
  label: string;
  title: string;
  status: StepStatus;
}

const COLOR_MAP: Record<string, { text: string; border: string; bg: string; borderHalf: string }> = {
  electricBlue: { text: "text-electricBlue", border: "border-electricBlue/50", bg: "bg-electricBlue/5", borderHalf: "border-electricBlue/50" },
  signalOrange: { text: "text-signalOrange", border: "border-signalOrange/50", bg: "bg-signalOrange/5", borderHalf: "border-signalOrange/50" },
  "purple-500": { text: "text-purple-500", border: "border-purple-500/50", bg: "bg-purple-500/5", borderHalf: "border-purple-500/50" },
};

const PHASE_COLORS = {
  1: { accent: "electricBlue", label: "THE WRITER'S ROOM", icon: Brain },
  2: { accent: "signalOrange", label: "THE ART DEPARTMENT", icon: Clapperboard },
  3: { accent: "purple-500", label: "THE SHOOTING", icon: Film },
};

const INTERVIEW_QUESTIONS = [
  {
    id: 0,
    label: "ATMOSPHERE & FORMAT",
    question: "If the audience could only feel one complex emotion, what would it be? Also, is this a Short Film, Feature Teaser, or Music Video?",
  },
  {
    id: 1,
    label: "VISUALS",
    question: "What is the 'math equation' of the look? (e.g., Blade Runner + Pixar). Please reference specific artists, films, or styles.",
  },
  {
    id: 2,
    label: "IRONY / TACTIC",
    question: "Who is the hero and what is their UNEXPECTED way of solving problems?",
  },
  {
    id: 3,
    label: "THE SPARK",
    question: "What is the specific 'Uh-oh' event that forces the hero to act?",
  },
];

const SAMPLE_SEED = {
  projectName: "The Last Spark",
  format: "Short Film",
  genre: "Sci-Fi Fantasy / Adventure",
  tone: "Bittersweet wonder with escalating tension",
  visualAnchor: "Pixar (Soul) + Studio Ghibli (Totoro) + Roger Deakins (Blade Runner 2049)",
  visualElements: ["Macro photography", "Clay/tactile textures", "Bioluminescence", "Tilt-shift miniature world"],
  protagonistName: "Flicker",
  archetype: "The Reluctant Light-Bearer",
  tactic: "Uses empathy and self-sacrifice to illuminate others, literally burning brighter when scared",
  spark: "Flicker's colony goes dark one by one. A mysterious cold wave is extinguishing every firefly's light. Flicker must journey to the source before the last spark dies.",
};

const LOGLINE_OPTIONS = [
  {
    id: "A",
    angle: "The External Angle",
    color: "electricBlue",
    logline: "A tiny firefly must cross a deadly forest to reach the source of a mysterious cold wave before it extinguishes every light in the colony.",
    pitch: "In a world where fireflies are the only source of warmth, Flicker — a small, dim firefly — watches helplessly as a creeping darkness snuffs out colony members one by one. Armed with nothing but a flicker of determination and a pair of cracked aviator goggles, Flicker must cross the Thornwall, survive the Storm Ravine, and reach the ancient Coldstone before the last light dies.",
    litmus: "Flicker wants to save the colony, BUT they are the weakest firefly, EXCEPT their empathy allows them to absorb and redistribute dying light.",
  },
  {
    id: "B",
    angle: "The Internal Angle",
    color: "signalOrange",
    logline: "A firefly who has always felt too dim must confront the fear that they were never meant to shine — only to discover that the smallest light can hold back the deepest dark.",
    pitch: "Flicker has always been the dimmest firefly in the colony. When the cold wave arrives and the brightest fireflies fall first, Flicker's survival feels like proof of insignificance. The journey to stop the Coldstone becomes an inward reckoning — can someone who has never believed in their own light find the courage to burn brighter than ever?",
    litmus: "Flicker wants to prove they matter, BUT they believe dimness equals worthlessness, EXCEPT their willingness to sacrifice everything reveals that courage, not brightness, is what truly illuminates.",
  },
  {
    id: "C",
    angle: "The Wildcard",
    color: "purple-500",
    logline: "The cold wave isn't a natural disaster — it's a cry for help from a creature made of pure darkness who has never seen light and is terrified of being alone.",
    pitch: "What if the villain isn't evil? Flicker discovers the Coldstone is actually a massive creature called Umbra — a being of shadow who absorbs light not out of malice, but out of desperate loneliness. The final act isn't a battle, it's an act of radical empathy: Flicker must choose to give their light away permanently to show Umbra they're not alone.",
    litmus: "Flicker wants to destroy the darkness, BUT the darkness is actually alive and afraid, EXCEPT Flicker's tactic of empathy transforms the conflict from a fight into a communion.",
  },
];

const FRAMEWORKS = [
  { id: "3act", name: "3-Act Structure", subtitle: "8-Point Arc", desc: "Best for balanced pacing and clear tension. The Default.", color: "electricBlue" },
  { id: "stc", name: "Save the Cat", subtitle: "15 Beats", desc: "Best for 'Hollywood-style' beats and emotional resonance.", color: "signalOrange" },
  { id: "kish", name: "Kishōtenketsu", subtitle: "4 Movements", desc: "Best for twist-based or atmospheric narratives.", color: "purple-500" },
];

const SAMPLE_CHARACTER = {
  name: "Flicker",
  archetype: "The Reluctant Light-Bearer",
  tactic: "Empathy & Self-Sacrifice",
  soul: "Believes dimness equals worthlessness; arc moves toward discovering that courage, not brightness, defines value",
  coreBody: "Young firefly, small stature, glowing amber abdomen, delicate translucent wings with slight tears, large expressive compound eyes (warm amber), stylistic clay texture with visible thumbprints, subsurface scattering on wing membranes",
  outfitA: "wearing weathered miniature aviator goggles pushed up on forehead, a tiny woven leaf-fiber vest with copper wire clasps, no footwear (six articulated insect legs)",
  outfitB: "wearing cracked aviator goggles over eyes, tattered vest missing one clasp, soot-covered wings",
  sonicAnchor: "Warm, slightly trembling voice — like a child trying to sound brave. Breaks into whisper when scared.",
  voiceRef: "Young Simba (JTT) meets Wall-E's emotional range",
};

const SAMPLE_BEATS = [
  { time: "0:00–0:45", section: "THE HOOK", external: "Colony at peace. Fireflies dance in warm meadow. Flicker watches from the edge, dim.", internal: "Flicker feels like an outsider — too dim to join the dance.", act: "ACT I" },
  { time: "0:45–1:15", section: "THE SETUP", external: "Elder firefly summons colony. Warns of the cold wave approaching from the North.", internal: "Flicker notices they're the only one who doesn't look scared — because they have nothing to lose.", act: "ACT I" },
  { time: "1:15–1:45", section: "THE TRIGGER", external: "First firefly goes dark. Colony panics. Elders call for the strongest to make the journey.", internal: "Flicker volunteers. Everyone laughs. 'You? You're barely a spark.'", act: "ACT I" },
  { time: "1:45–2:30", section: "THE QUEST", external: "Flicker crosses the Thornwall — a massive barrier of dead brambles. Nearly crushed by a raindrop.", internal: "First moment of genuine fear. Goggles crack. Considers turning back.", act: "ACT II" },
  { time: "2:30–3:15", section: "THE MIDPOINT", external: "Flicker discovers dying fireflies along the path — their light absorbed. Touches one; absorbs their remaining glow.", internal: "Realisation: Flicker can carry other lights inside them. They're not dim — they're a vessel.", act: "ACT II" },
  { time: "3:15–4:00", section: "THE DARKEST HOUR", external: "Storm Ravine. Winds batter Flicker. Wing tears. Nearly extinguished.", internal: "Lowest point. 'Maybe I was right. I'm nothing.'", act: "ACT II" },
  { time: "4:00–4:45", section: "THE TWIST", external: "Reaches the Coldstone. It's not a stone — it's Umbra, a creature of shadow, curled up and shaking.", internal: "Flicker sees their own loneliness reflected in Umbra. Enemy becomes mirror.", act: "ACT III" },
  { time: "4:45–5:30", section: "THE CLIMAX", external: "Flicker releases all absorbed light into Umbra. A blinding flash. Flicker goes completely dark.", internal: "Ultimate sacrifice. Chooses to give everything.", act: "ACT III" },
];

export default function Pipeline() {
  const [steps, setSteps] = useState<PipelineStep[]>([
    { id: 0, label: "STEP 0", title: "THE KICKOFF", status: "active" },
    { id: 1, label: "STEP 1", title: "CORE IDEA", status: "locked" },
    { id: 2, label: "STEP 2", title: "CHARACTER", status: "locked" },
    { id: 3, label: "STEP 3", title: "ARCHITECTURE", status: "locked" },
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [interviewStep, setInterviewStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [seedLocked, setSeedLocked] = useState(false);
  const [selectedLogline, setSelectedLogline] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [synopsisLocked, setSynopsisLocked] = useState(false);
  const [characterLocked, setCharacterLocked] = useState(false);

  const lockStep = (stepId: number) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === stepId) return { ...s, status: "complete" as StepStatus };
        if (s.id === stepId + 1) return { ...s, status: "active" as StepStatus };
        return s;
      })
    );
    if (stepId < 3) setActiveStep(stepId + 1);
  };

  const goToStep = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (step && step.status !== "locked") {
      setActiveStep(stepId);
    }
  };

  const renderStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "active":
        return <div className="w-4 h-4 rounded-full border-2 border-electricBlue bg-electricBlue/30 animate-pulse" />;
      case "locked":
        return <Lock className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStep0 = () => {
    if (seedLocked) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-header text-xl text-white">NARRATIVE SEED</h3>
            <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" /> LOCKED
            </div>
          </div>
          <div className="glass-panel p-6 border border-green-500/30">
            <div className="font-mono text-xs text-green-400 mb-4">Narrative_Seed.md</div>
            <div className="space-y-4">
              <div>
                <span className="text-gray-500 text-xs font-mono">PROJECT NAME</span>
                <p className="text-white font-header text-lg">{SAMPLE_SEED.projectName}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-500 text-xs font-mono">FORMAT</span>
                  <p className="text-electricBlue text-sm">{SAMPLE_SEED.format}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs font-mono">GENRE</span>
                  <p className="text-electricBlue text-sm">{SAMPLE_SEED.genre}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs font-mono">TONE</span>
                  <p className="text-electricBlue text-sm">{SAMPLE_SEED.tone}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-xs font-mono">VISUAL ANCHOR</span>
                <p className="text-signalOrange text-sm">{SAMPLE_SEED.visualAnchor}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs font-mono">PROTAGONIST</span>
                <p className="text-white text-sm">{SAMPLE_SEED.protagonistName} — {SAMPLE_SEED.archetype}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs font-mono">THE SPARK</span>
                <p className="text-gray-400 text-sm">{SAMPLE_SEED.spark}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => lockStep(0)}
            data-testid="btn-advance-step0"
            className="w-full bg-electricBlue text-white py-3 font-header text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            ADVANCE TO STEP 1: CORE IDEA
          </button>
        </div>
      );
    }

    const currentQ = INTERVIEW_QUESTIONS[interviewStep];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-header text-xl text-white">THE CREATIVE INTERVIEW</h3>
          <span className="text-xs font-mono text-gray-500">QUESTION {interviewStep + 1} / {INTERVIEW_QUESTIONS.length}</span>
        </div>

        <div className="flex gap-2 mb-4">
          {INTERVIEW_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < interviewStep ? "bg-electricBlue" : i === interviewStep ? "bg-electricBlue/50 animate-pulse" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="glass-panel p-6 border border-electricBlue/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-electricBlue" />
            <span className="text-electricBlue text-xs font-mono tracking-widest">{currentQ.label}</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{currentQ.question}</p>
        </div>

        <div className="relative">
          <textarea
            value={answers[interviewStep]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[interviewStep] = e.target.value;
              setAnswers(newAnswers);
            }}
            data-testid={`input-answer-${interviewStep}`}
            placeholder="Type your response..."
            className="w-full h-32 bg-black/50 border border-white/10 p-4 text-sm text-white font-mono resize-none focus:border-electricBlue focus:outline-none transition-colors"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            {interviewStep > 0 && (
              <button
                onClick={() => setInterviewStep((p) => p - 1)}
                data-testid="btn-prev-question"
                className="p-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {interviewStep < INTERVIEW_QUESTIONS.length - 1 ? (
              <button
                onClick={() => {
                  if (answers[interviewStep].trim()) setInterviewStep((p) => p + 1);
                }}
                data-testid="btn-next-question"
                className="p-2 bg-electricBlue text-white hover:bg-white hover:text-black transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (answers[interviewStep].trim()) setSeedLocked(true);
                }}
                data-testid="btn-synthesize"
                className="px-4 py-2 bg-electricBlue text-white text-xs font-header tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3" /> SYNTHESIZE
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    if (synopsisLocked) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-header text-xl text-white">NARRATIVE EXPANSION</h3>
            <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" /> LOCKED
            </div>
          </div>
          <div className="glass-panel p-6 border border-green-500/30">
            <div className="font-mono text-xs text-green-400 mb-2">Synopsis_v1.md</div>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-xs font-mono">SELECTED LOGLINE</span>
                <p className="text-white text-sm">Option {selectedLogline}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs font-mono">FRAMEWORK</span>
                <p className="text-electricBlue text-sm">{FRAMEWORKS.find(f => f.id === selectedFramework)?.name}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => lockStep(1)}
            data-testid="btn-advance-step1"
            className="w-full bg-signalOrange text-black py-3 font-header text-xs tracking-widest hover:bg-white transition-all duration-300"
          >
            ADVANCE TO STEP 2: CHARACTER BLUEPRINT
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
          <h3 className="font-header text-xl text-white mb-2">LOGLINE STRESS TEST</h3>
          <p className="text-xs text-gray-500 font-mono">SELECT ONE NARRATIVE DIRECTION</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {LOGLINE_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelectedLogline(opt.id)}
              data-testid={`logline-option-${opt.id}`}
              className={`glass-panel p-6 cursor-pointer transition-all duration-300 ${
                selectedLogline === opt.id
                  ? `${COLOR_MAP[opt.color].border} ${COLOR_MAP[opt.color].bg}`
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-header text-2xl font-bold ${
                    selectedLogline === opt.id ? COLOR_MAP[opt.color].text : "text-gray-600"
                  }`}>{opt.id}</span>
                  <span className="text-xs font-mono text-gray-400">{opt.angle.toUpperCase()}</span>
                </div>
                {selectedLogline === opt.id && <CheckCircle2 className={`w-5 h-5 ${COLOR_MAP[opt.color].text}`} />}
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">{opt.logline}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{opt.pitch}</p>
              <div className="bg-black/30 p-3 border border-white/5">
                <span className="text-[10px] font-mono text-gray-600 block mb-1">THE LITMUS TEST</span>
                <p className="text-xs text-gray-400 italic">{opt.litmus}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedLogline && (
          <>
            <div className="border-t border-white/10 pt-8">
              <h3 className="font-header text-xl text-white mb-2">FRAMEWORK SELECTION</h3>
              <p className="text-xs text-gray-500 font-mono mb-6">AI RECOMMENDS: 3-ACT STRUCTURE FOR THIS NARRATIVE</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FRAMEWORKS.map((fw) => (
                  <div
                    key={fw.id}
                    onClick={() => setSelectedFramework(fw.id)}
                    data-testid={`framework-${fw.id}`}
                    className={`glass-panel p-5 cursor-pointer transition-all duration-300 text-center ${
                      selectedFramework === fw.id
                        ? `${COLOR_MAP[fw.color].border} ${COLOR_MAP[fw.color].bg}`
                        : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <h4 className={`font-header text-sm mb-1 ${
                      selectedFramework === fw.id ? COLOR_MAP[fw.color].text : "text-white"
                    }`}>{fw.name}</h4>
                    <span className="text-[10px] font-mono text-gray-500 block mb-2">{fw.subtitle}</span>
                    <p className="text-xs text-gray-400">{fw.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedFramework && (
              <button
                onClick={() => setSynopsisLocked(true)}
                data-testid="btn-lock-synopsis"
                className="w-full bg-signalOrange text-black py-3 font-header text-xs tracking-widest hover:bg-white transition-all duration-300"
              >
                LOCK DIRECTION & GENERATE SYNOPSIS
              </button>
            )}
          </>
        )}
      </div>
    );
  };

  const renderStep2 = () => {
    if (characterLocked) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-header text-xl text-white">CHARACTER BLUEPRINTS</h3>
            <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" /> LOCKED
            </div>
          </div>
          <div className="glass-panel p-6 border border-green-500/30">
            <div className="font-mono text-xs text-green-400 mb-2">CharacterSheet_{SAMPLE_CHARACTER.name}.md</div>
            <p className="text-white text-sm">{SAMPLE_CHARACTER.name} — {SAMPLE_CHARACTER.archetype}</p>
          </div>
          <button
            onClick={() => lockStep(2)}
            data-testid="btn-advance-step2"
            className="w-full bg-purple-500 text-white py-3 font-header text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            ADVANCE TO STEP 3: ARCHITECTURE
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-header text-xl text-white mb-1">CHARACTER BLUEPRINT</h3>
            <p className="text-xs text-gray-500 font-mono">THE PROTAGONIST — THE HERO</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="glass-panel p-5">
              <h4 className="font-header text-xs text-electricBlue mb-4 tracking-widest border-b border-white/10 pb-2">SECTION 1: PSYCHOLOGY</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-gray-600">NAME</span>
                  <p className="text-white text-sm">{SAMPLE_CHARACTER.name}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">ARCHETYPE</span>
                  <p className="text-electricBlue text-sm">{SAMPLE_CHARACTER.archetype}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">PRIMARY TACTIC</span>
                  <p className="text-signalOrange text-sm">{SAMPLE_CHARACTER.tactic}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">ARCHETYPAL SOUL</span>
                  <p className="text-gray-400 text-xs leading-relaxed">{SAMPLE_CHARACTER.soul}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h4 className="font-header text-xs text-signalOrange mb-4 tracking-widest border-b border-white/10 pb-2">SECTION 4: VOCAL PROFILE</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-gray-600">SONIC ANCHOR</span>
                  <p className="text-gray-400 text-xs leading-relaxed">{SAMPLE_CHARACTER.sonicAnchor}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">VOICE REFERENCE</span>
                  <p className="text-white text-sm">{SAMPLE_CHARACTER.voiceRef}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-5">
              <h4 className="font-header text-xs text-purple-400 mb-4 tracking-widest border-b border-white/10 pb-2">SECTION 3: VISUAL PROFILE</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-gray-600">[CORE_BODY]</span>
                  <div className="bg-black/50 border border-white/10 p-3 mt-1">
                    <p className="text-green-400 text-xs font-mono leading-relaxed">{SAMPLE_CHARACTER.coreBody}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">[OUTFIT_A] — DEFAULT</span>
                  <div className="bg-black/50 border border-white/10 p-3 mt-1">
                    <p className="text-green-400 text-xs font-mono leading-relaxed">{SAMPLE_CHARACTER.outfitA}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-600">[OUTFIT_B] — BATTLE-WORN</span>
                  <div className="bg-black/50 border border-white/10 p-3 mt-1">
                    <p className="text-yellow-400/70 text-xs font-mono leading-relaxed">{SAMPLE_CHARACTER.outfitB}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 border border-dashed border-white/20 flex flex-col items-center justify-center h-40">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs font-mono text-gray-500">GENERATE ANCHOR IMAGE</span>
              <span className="text-[10px] text-gray-600 mt-1">Nano Banana + Ingredients</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCharacterLocked(true)}
          data-testid="btn-lock-character"
          className="w-full bg-purple-500 text-white py-3 font-header text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          LOCK CHARACTER SHEET
        </button>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-header text-xl text-white mb-1">THE ARCHITECTURAL PLAN</h3>
            <p className="text-xs text-gray-500 font-mono">BEAT SHEET — 8-POINT ARC</p>
          </div>
          <span className="text-xs font-mono text-gray-500">TOTAL RUNTIME: ~5:30</span>
        </div>

        <div className="space-y-3">
          {SAMPLE_BEATS.map((beat, i) => (
            <div key={i} className="glass-panel p-4 hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24">
                  <span className={`text-[10px] font-mono px-2 py-1 ${
                    beat.act === "ACT I" ? "text-electricBlue bg-electricBlue/10" :
                    beat.act === "ACT II" ? "text-signalOrange bg-signalOrange/10" :
                    "text-purple-400 bg-purple-500/10"
                  }`}>{beat.act}</span>
                  <p className="text-[10px] font-mono text-gray-600 mt-2">{beat.time}</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-header text-xs text-white mb-2 tracking-widest">{beat.section}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-gray-600 block mb-1">STORY BEAT (EXTERNAL)</span>
                      <p className="text-gray-400 text-xs leading-relaxed">{beat.external}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-600 block mb-1">CHARACTER BEAT (INTERNAL)</span>
                      <p className="text-gray-400 text-xs leading-relaxed italic">{beat.internal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => lockStep(3)}
          data-testid="btn-lock-architecture"
          className="w-full bg-green-500 text-black py-3 font-header text-xs tracking-widest hover:bg-white transition-all duration-300"
        >
          LOCK PHASE 1 — ADVANCE TO PRE-PRODUCTION
        </button>
      </div>
    );
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      <Navbar />

      <div className="pt-20 flex h-[calc(100vh-80px)] relative z-10">
        {/* LEFT SIDEBAR — PHASE TRACKER */}
        <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-black/50 overflow-y-auto" data-testid="sidebar-tracker">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-gray-500">PIPELINE ACTIVE</span>
            </div>
            <h2 className="font-header text-sm text-white tracking-widest">CONTROL CENTER</h2>
          </div>

          <div className="px-4 pb-6 space-y-6">
            {Object.entries(PHASE_COLORS).map(([phaseNum, phase]) => {
              const isActive = phaseNum === "1";
              const PhaseIcon = phase.icon;
              return (
                <div key={phaseNum} data-testid={`phase-${phaseNum}`}>
                  <div className={`flex items-center gap-3 px-2 py-2 mb-2 ${isActive ? "" : "opacity-30"}`}>
                    <PhaseIcon className={`w-4 h-4 ${COLOR_MAP[phase.accent].text}`} />
                    <div>
                      <span className={`text-[10px] font-mono ${COLOR_MAP[phase.accent].text}`}>PHASE {phaseNum}</span>
                      <p className="text-xs font-header text-white tracking-wider">{phase.label}</p>
                    </div>
                  </div>

                  {isActive && (
                    <div className="ml-2 border-l border-white/10 pl-4 space-y-1">
                      {steps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => goToStep(step.id)}
                          data-testid={`step-btn-${step.id}`}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200 ${
                            activeStep === step.id
                              ? "bg-white/5 border-l-2 border-electricBlue -ml-[1px]"
                              : step.status === "locked"
                              ? "opacity-30 cursor-not-allowed"
                              : "hover:bg-white/5 cursor-pointer"
                          }`}
                        >
                          {renderStatusIcon(step.status)}
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 block">{step.label}</span>
                            <span className="text-xs text-white">{step.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {!isActive && (
                    <div className="ml-2 border-l border-white/5 pl-4">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <Lock className="w-3 h-3 text-gray-700" />
                        <span className="text-[10px] font-mono text-gray-700">REQUIRES PHASE {Number(phaseNum) - 1}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto" data-testid="main-workspace">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-3 h-3 rounded-full bg-electricBlue ${steps[activeStep]?.status === "complete" ? "" : "animate-pulse"}`} />
              <span className="text-electricBlue text-xs font-mono tracking-widest">PHASE 1 — {steps[activeStep]?.label}</span>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-white text-xs font-mono tracking-widest">{steps[activeStep]?.title}</span>
            </div>

            {renderActiveStep()}
          </div>
        </main>

        {/* RIGHT PANEL — INSPECTOR */}
        <aside
          className={`flex-shrink-0 border-l border-white/10 bg-black/30 overflow-y-auto transition-all duration-300 ${
            inspectorOpen ? "w-72" : "w-12"
          }`}
          data-testid="inspector-panel"
        >
          <div className="p-3">
            <button
              onClick={() => setInspectorOpen(!inspectorOpen)}
              data-testid="btn-toggle-inspector"
              className="w-full flex items-center justify-center p-1 text-gray-500 hover:text-white transition-colors"
            >
              {inspectorOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
          </div>

          {inspectorOpen && (
            <div className="px-4 pb-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-gray-600 tracking-widest">INSPECTOR</span>
                <h3 className="font-header text-xs text-white tracking-widest">REFERENCE DATA</h3>
              </div>

              {seedLocked && (
                <div className="glass-panel p-3 border border-electricBlue/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-mono text-green-400">Narrative_Seed.md</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">PROJECT</span>
                      <p className="text-white text-[10px]">{SAMPLE_SEED.projectName}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">GENRE</span>
                      <p className="text-electricBlue text-[10px]">{SAMPLE_SEED.genre}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">VISUAL ANCHOR</span>
                      <p className="text-signalOrange text-[10px]">{SAMPLE_SEED.visualAnchor}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">PROTAGONIST</span>
                      <p className="text-white text-[10px]">{SAMPLE_SEED.protagonistName}</p>
                    </div>
                  </div>
                </div>
              )}

              {synopsisLocked && (
                <div className="glass-panel p-3 border border-signalOrange/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-mono text-green-400">Synopsis_v1.md</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">DIRECTION</span>
                      <p className="text-white text-[10px]">Option {selectedLogline}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">FRAMEWORK</span>
                      <p className="text-signalOrange text-[10px]">{FRAMEWORKS.find(f => f.id === selectedFramework)?.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {characterLocked && (
                <div className="glass-panel p-3 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-mono text-green-400">CharacterSheet.md</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">NAME</span>
                      <p className="text-white text-[10px]">{SAMPLE_CHARACTER.name}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">ARCHETYPE</span>
                      <p className="text-purple-400 text-[10px]">{SAMPLE_CHARACTER.archetype}</p>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-gray-600">TACTIC</span>
                      <p className="text-purple-400 text-[10px]">{SAMPLE_CHARACTER.tactic}</p>
                    </div>
                  </div>
                </div>
              )}

              {!seedLocked && !synopsisLocked && !characterLocked && (
                <div className="text-center py-8">
                  <Circle className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  <p className="text-[10px] font-mono text-gray-600">NO DELIVERABLES LOCKED</p>
                  <p className="text-[10px] text-gray-700 mt-1">Complete steps to populate</p>
                </div>
              )}

              <div className="glass-panel p-3 border border-white/5">
                <span className="text-[10px] font-mono text-gray-600 block mb-2">PIPELINE STATUS</span>
                <div className="space-y-1">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">{step.title}</span>
                      <span className={`text-[8px] font-mono ${
                        step.status === "complete" ? "text-green-400" :
                        step.status === "active" ? "text-electricBlue" :
                        "text-gray-700"
                      }`}>
                        {step.status === "complete" ? "DONE" : step.status === "active" ? "ACTIVE" : "LOCKED"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
