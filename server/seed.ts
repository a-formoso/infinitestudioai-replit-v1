import { db } from "./db";
import { courses, lessons, assets } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create courses
    const [course2, course3, course4] = await db
      .insert(courses)
      .values([
        {
          title: "ADVANCED AI CINEMATOGRAPHY",
          slug: "advanced-ai-cinematography",
          description:
            "Mastering physics, compound camera moves, and the uncanny valley in Veo 3.1. Deep dive into motion control.",
          shortDescription:
            'Mastering physics, compound camera moves, and the "Invisible Cut" in Veo 3.1. Deep technical control.',
          price: "199.00",
          level: "Foundation",
          duration: "6.0 HOURS",
          lessonsCount: 30,
          badge: "FOUNDATION",
          color: "electricBlue",
          status: "draft",
        },
        {
          title: "THE GOOGLE AI FILMMAKER",
          slug: "the-google-ai-filmmaker",
          description:
            'The complete AI Production Pipeline. From Narrative Seed to Final Render — learn to direct Gemini, ImageFX, and Veo as a single production system using the Operations Guide methodology.',
          shortDescription:
            'The complete AI Production Pipeline. From Narrative Seed to Final Render — direct Gemini, ImageFX, and Veo as one system.',
          price: "249.00",
          level: "Specialist",
          duration: "8.0 HOURS",
          lessonsCount: 14,
          badge: "SPECIALIST",
          color: "signalOrange",
          status: "published",
        },
        {
          title: "NANO BANANA MASTERY",
          slug: "nano-banana-mastery",
          description:
            "Create Consistent Digital Actors. Stop Rolling the Dice. Master character consistency and style-locking — the entry point for anyone who wants to move beyond random generation.",
          shortDescription:
            "Master character consistency and style-locking. The entry point for moving beyond random generation.",
          price: "129.00",
          level: "Foundation",
          duration: "3.5 HOURS",
          lessonsCount: 11,
          badge: "FOUNDATION",
          color: "electricBlue",
          status: "published",
        },
        {
          title: "SCORING WITH MUSICFX",
          slug: "scoring-with-musicfx",
          description:
            "Learn to generate stems and mix your own soundtrack using Google's MusicFX. From ambient drones to full orchestral scores.",
          shortDescription:
            "Learn to generate stems and mix your own soundtrack.",
          price: "79.00",
          level: "Specialist",
          duration: "2.5 HOURS",
          lessonsCount: 8,
          badge: "SPECIALIST",
          color: "signalOrange",
          status: "draft",
          imageUrl: "https://images.unsplash.com/photo-1614726365723-49cfae96a6d6?q=80&w=2670&auto=format&fit=crop",
        },
        {
          title: "THE BUSINESS OF AI FILM",
          slug: "the-business-of-ai-film",
          description:
            "How to price, pitch, and sell AI video services. Build a sustainable creative business around AI filmmaking.",
          shortDescription:
            "How to price, pitch, and sell AI video services.",
          price: "99.00",
          level: "Specialist",
          duration: "2.0 HOURS",
          lessonsCount: 6,
          badge: "SPECIALIST",
          color: "signalOrange",
          status: "draft",
          imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        },
        {
          title: "AI CINEMATOGRAPHY & DIRECTION",
          slug: "ai-cinematography-and-direction",
          description:
            "Master the visual language of AI filmmaking. From lighting design and lens choices to blocking, staging, and coverage patterns — learn to direct AI-generated scenes like a professional cinematographer.",
          shortDescription:
            "Lighting design, lens language, blocking & staging, and coverage patterns for AI filmmaking.",
          price: "179.00",
          level: "Specialist",
          duration: "5.0 HOURS",
          lessonsCount: 16,
          badge: "SPECIALIST",
          color: "signalOrange",
          status: "draft",
          imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2670&auto=format&fit=crop",
        },
        {
          title: "AI POST-PRODUCTION & FINISHING",
          slug: "ai-post-production-and-finishing",
          description:
            "The complete post-production pipeline for AI-generated content. Color grading, sound design, music scoring, and title design — transform raw AI output into polished, deliverable work.",
          shortDescription:
            "Color grading, sound design, music scoring, and title design for AI content.",
          price: "149.00",
          level: "Foundation",
          duration: "4.5 HOURS",
          lessonsCount: 12,
          badge: "FOUNDATION",
          color: "electricBlue",
          status: "draft",
          imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2670&auto=format&fit=crop",
        },
      ])
      .returning();

    console.log("✅ Created courses");

    // Create lessons for Course 2
    await db.insert(lessons).values([
      // Module 1: Advanced Camera Control
      {
        courseId: course2.id,
        moduleNumber: 1,
        moduleName: "ADVANCED CAMERA CONTROL",
        lessonNumber: 1,
        title: "Physics-Based Camera Movement in Veo 3.1",
        videoUrl: null,
        duration: 16,
      },
      {
        courseId: course2.id,
        moduleNumber: 1,
        moduleName: "ADVANCED CAMERA CONTROL",
        lessonNumber: 2,
        title: "Compound Moves: Dolly + Pan + Tilt",
        videoUrl: null,
        duration: 21,
      },
      {
        courseId: course2.id,
        moduleNumber: 1,
        moduleName: "ADVANCED CAMERA CONTROL",
        lessonNumber: 3,
        title: "Handheld vs Steadicam Simulation",
        videoUrl: null,
        duration: 18,
      },

      // Module 2: Lighting & Atmospherics
      {
        courseId: course2.id,
        moduleNumber: 2,
        moduleName: "LIGHTING & ATMOSPHERICS",
        lessonNumber: 1,
        title: "Three-Point Lighting in AI",
        videoUrl: null,
        duration: 15,
      },
      {
        courseId: course2.id,
        moduleNumber: 2,
        moduleName: "LIGHTING & ATMOSPHERICS",
        lessonNumber: 2,
        title: "Volumetric Effects and Fog Control",
        videoUrl: null,
        duration: 19,
      },
      {
        courseId: course2.id,
        moduleNumber: 2,
        moduleName: "LIGHTING & ATMOSPHERICS",
        lessonNumber: 3,
        title: "Time of Day and Color Temperature",
        videoUrl: null,
        duration: 17,
      },
    ]);

    // Create lessons for Course 3 (The Google AI Filmmaking Ecosystem)
    await db.insert(lessons).values([
      // Module 1: THE WRITER'S ROOM (Phase 1 — Foundation)
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 1,
        title: "The Narrative Seed: The Creative Interview & Data Locking",
        videoUrl: null,
        duration: 28,
      },
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 2,
        title: 'The "What If" Engine: Logline Stress-Testing with 3 Angles',
        videoUrl: null,
        duration: 32,
      },
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 3,
        title: "Framework Selection & Narrative Expansion",
        videoUrl: null,
        duration: 30,
      },
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 4,
        title: "Casting the Digital Soul: Character Sheets & Visual Synthesis",
        videoUrl: null,
        duration: 34,
      },
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 5,
        title: "The Scene Breakdown: Synopsis to Structured JSON",
        videoUrl: null,
        duration: 36,
      },
      {
        courseId: course3.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 6,
        title: "The Dialogue Pass: Voice, Subtext & Performance Directives",
        videoUrl: null,
        duration: 26,
      },

      // Module 2: THE ART DEPARTMENT (Phase 2 — Pre-Production)
      {
        courseId: course3.id,
        moduleNumber: 2,
        moduleName: "THE ART DEPARTMENT",
        lessonNumber: 1,
        title: "The Audiovisual Blueprint: Building Style Presets & Digital LUTs",
        videoUrl: null,
        duration: 34,
      },
      {
        courseId: course3.id,
        moduleNumber: 2,
        moduleName: "THE ART DEPARTMENT",
        lessonNumber: 2,
        title: "The Cinematic Lexicon: Master Prompt Formula & Variable Mapping",
        videoUrl: null,
        duration: 38,
      },
      {
        courseId: course3.id,
        moduleNumber: 2,
        moduleName: "THE ART DEPARTMENT",
        lessonNumber: 3,
        title: "The Palette Limit: Constraining Your Film to 3–4 Visual Presets",
        videoUrl: null,
        duration: 28,
      },
      {
        courseId: course3.id,
        moduleNumber: 2,
        moduleName: "THE ART DEPARTMENT",
        lessonNumber: 4,
        title: "Shot Design & Keyframes: Camera Plans and Start/End Frame Pairs",
        videoUrl: null,
        duration: 36,
      },

      // Module 3: THE SHOOTING (Phase 3 — Production)
      {
        courseId: course3.id,
        moduleNumber: 3,
        moduleName: "THE SHOOTING",
        lessonNumber: 1,
        title: 'The Veo Prompt Structure: "Delta" Logic — Describing Motion, Not Appearance',
        videoUrl: null,
        duration: 34,
      },
      {
        courseId: course3.id,
        moduleNumber: 3,
        moduleName: "THE SHOOTING",
        lessonNumber: 2,
        title: "The Motion Package: Physics Trinity (Weight, Tempo, Texture)",
        videoUrl: null,
        duration: 32,
      },
      {
        courseId: course3.id,
        moduleNumber: 3,
        moduleName: "THE SHOOTING",
        lessonNumber: 3,
        title: "The Ghost Track Method: Dialogue Synthesis & Lip-Sync",
        videoUrl: null,
        duration: 30,
      },
      {
        courseId: course3.id,
        moduleNumber: 3,
        moduleName: "THE SHOOTING",
        lessonNumber: 4,
        title: "The Edit Assembly: Layering Video, Dialogue, SFX, Ambience & Score",
        videoUrl: null,
        duration: 34,
      },
    ]);

    // Create lessons for Course 4 (Nano Banana Mastery)
    await db.insert(lessons).values([
      {
        courseId: course4.id,
        moduleNumber: 1,
        moduleName: "INITIALIZATION",
        lessonNumber: 1,
        title: "The Consistency Problem: Why AI Usually Forgets Faces",
        videoUrl: null,
        duration: 12,
      },
      {
        courseId: course4.id,
        moduleNumber: 1,
        moduleName: "INITIALIZATION",
        lessonNumber: 2,
        title: "Interface & Architecture: Navigating the Workspace",
        videoUrl: null,
        duration: 14,
      },
      {
        courseId: course4.id,
        moduleNumber: 1,
        moduleName: "INITIALIZATION",
        lessonNumber: 3,
        title: 'The "Ingredient" Workflow: Face, Costume & Style Layers',
        videoUrl: null,
        duration: 16,
      },
      {
        courseId: course4.id,
        moduleNumber: 1,
        moduleName: "INITIALIZATION",
        lessonNumber: 4,
        title: "Your First Actor: Zero-Shot Character Profile",
        videoUrl: null,
        duration: 20,
      },
      {
        courseId: course4.id,
        moduleNumber: 2,
        moduleName: "THE DIGITAL WARDROBE",
        lessonNumber: 1,
        title: "Advanced Inpainting: Changing Clothes Without Changing the Character",
        videoUrl: null,
        duration: 22,
      },
      {
        courseId: course4.id,
        moduleNumber: 2,
        moduleName: "THE DIGITAL WARDROBE",
        lessonNumber: 2,
        title: '"Hand & Eye" Surgery: Fixing Common AI Artifacts',
        videoUrl: null,
        duration: 18,
      },
      {
        courseId: course4.id,
        moduleNumber: 2,
        moduleName: "THE DIGITAL WARDROBE",
        lessonNumber: 3,
        title: "Style Transfer: Keeping the Actor, Changing the Genre",
        videoUrl: null,
        duration: 20,
      },
      {
        courseId: course4.id,
        moduleNumber: 2,
        moduleName: "THE DIGITAL WARDROBE",
        lessonNumber: 4,
        title: "Whisk & Visual Remix: Blending Inputs While Keeping Fidelity",
        videoUrl: null,
        duration: 18,
      },
      {
        courseId: course4.id,
        moduleNumber: 3,
        moduleName: "SCENE PLACEMENT",
        lessonNumber: 1,
        title: "Perspective Matching: Placing Characters Into Complex Backgrounds",
        videoUrl: null,
        duration: 20,
      },
      {
        courseId: course4.id,
        moduleNumber: 3,
        moduleName: "SCENE PLACEMENT",
        lessonNumber: 2,
        title: "Lighting Consistency: Relighting the Face to Match the Environment",
        videoUrl: null,
        duration: 18,
      },
      {
        courseId: course4.id,
        moduleNumber: 3,
        moduleName: "SCENE PLACEMENT",
        lessonNumber: 3,
        title: "Multi-Character Scenes: Two Distinct Actors in One Frame",
        videoUrl: null,
        duration: 22,
      },
    ]);

    console.log("✅ Created lessons");

    // Create assets
    await db.insert(assets).values([
      {
        title: "SCI-FI CHARACTERS VOL. 1",
        slug: "sci-fi-characters-vol-1",
        description:
          "50+ Consistent Character Sheets (Front/Side/45) ready for Veo Ingredients.",
        shortDescription: "50+ Consistent Character Sheets for Veo Ingredients.",
        price: "49.00",
        category: "CHARACTER SHEETS",
        badge: "BESTSELLER",
        imageUrl:
          "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop",
        fileFormat: "PNG + PROMPT JSON",
        fileSize: "240MB",
        color: "neonPurple",
        status: "published",
      },
      {
        title: "NEON NOIR TEXTURES",
        slug: "neon-noir-textures",
        description:
          "100+ High-Res Cyberpunk environment textures generated with Nano Banana.",
        shortDescription: "100+ High-Res Cyberpunk environment textures.",
        price: "29.00",
        category: "TEXTURES",
        badge: "NEW",
        imageUrl:
          "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "4K JPG",
        fileSize: "850MB",
        color: "electricBlue",
        status: "published",
      },
      {
        title: "CINEMATIC SFX PACK",
        slug: "cinematic-sfx-pack",
        description:
          "Pre-mixed Foley stems for Sci-Fi films. Impacts, Risers, and Ambience.",
        shortDescription: "Pre-mixed Foley stems for Sci-Fi films.",
        price: "19.00",
        category: "AUDIO / SFX",
        badge: null,
        imageUrl:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "WAV / MP3",
        fileSize: "1.2GB",
        color: "signalOrange",
        status: "published",
      },
      {
        title: "MASTER PROMPT LIBRARY",
        slug: "master-prompt-library",
        description:
          "500+ Production-Ready Prompts for Veo, categorized by genre and shot type.",
        shortDescription: "500+ Curated Prompts for Veo 3.1. Copy/Paste ready.",
        price: "39.00",
        category: "PROMPTS",
        badge: null,
        imageUrl: null,
        fileFormat: "JSON + PDF",
        fileSize: "12MB",
        color: "white",
        status: "published",
      },
      {
        title: "CYBERPUNK TEXTURES VOL. 1",
        slug: "cyberpunk-textures-vol-1",
        description:
          "Grungy neon surfaces, holographic overlays, and rain-soaked streets.",
        shortDescription: "50+ Nano Banana Generated Surfaces.",
        price: "34.00",
        category: "TEXTURES",
        badge: "NEW",
        imageUrl:
          "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "PNG 4K",
        fileSize: "680MB",
        color: "neonPurple",
        status: "published",
      },
      {
        title: "FANTASY ENVIRONMENT PACK",
        slug: "fantasy-environment-pack",
        description:
          "Ethereal forests, ancient ruins, and mystical landscapes for Veo workflows.",
        shortDescription: "Ethereal forests, ancient ruins, and mystical landscapes.",
        price: "44.00",
        category: "TEXTURES",
        badge: null,
        imageUrl:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "PNG + EXR",
        fileSize: "1.5GB",
        color: "electricBlue",
        status: "draft",
      },
      {
        title: "DIRECTOR's KIT",
        slug: "directors-kit",
        description: `Stop Prompting. Start Architecting.\nGet the exact algorithmic workflows, JSON schemas, and documentation we use to direct Veo 3.1 and Nano Banana with Hollywood-level precision.\n\n[The Problem]\nGenerating one cool image is easy. Generating 50 consistent shots with the same character, accurate physics, and matching emotional tone is a nightmare. Most AI filmmakers rely on luck. We rely on DIRECTOR's KIT.\n\n[What's Inside]\n* **The AI Director's Operations Guide (13-Page PDF):** The master playbook. Learn how to turn ChatGPT/Claude into your "Production Partner" using our Rule of One Motion and Variable Mapping Logic.\n* **The Universal Character Sheet Formula (10-Page PDF):** The ultimate "Single Source of Truth." Learn to define characters by Tactics and Vector Rotations so Nano Banana never hallucinates their face again.\n* **Production-Ready JSON Schemas:** Stop using messy documents. Get our exact SceneBreakdown_Template_v1.json code to structure your scripts, metadata, and lip-sync dialogue for immediate AI ingestion.\n* **Blank Markdown Templates:** Ready-to-use .md files to immediately start building your own cinematic lexicons and shot lists.\n\n> "The AI landscape shifts rapidly, but architecture is timeless. Models will update (Veo 4, etc.), but the principles of breaking a scene into variables, locking character traits into JSON, and isolating camera motion will always apply. This O.S. is designed to scale with the technology."`,
        shortDescription: "Stop Prompting. Start Architecting. The exact algorithmic workflows, JSON schemas, and documentation we use to direct Veo 3.1 with Hollywood-level precision.",
        price: "149.00",
        originalPrice: "199.00",
        category: "PRODUCTION SYSTEMS",
        badge: "PRO SYSTEM",
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "PDF + JSON + MD",
        fileSize: "48MB",
        color: "neonPurple",
        status: "published",
      },
    ]);

    console.log("✅ Created assets");
    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
