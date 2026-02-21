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
          status: "published",
        },
        {
          title: "THE GOOGLE AI FILMMAKING ECOSYSTEM",
          slug: "google-ai-filmmaking-ecosystem",
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
          title: "EDITING IN GOOGLE VIDS",
          slug: "editing-in-google-vids",
          description:
            "Post-production workflows for the AI era. Learn to assemble, cut, and deliver using Google's cloud-native editing tools.",
          shortDescription:
            "Post-production workflows for the AI era.",
          price: "79.00",
          level: "Foundation",
          duration: "3.0 HOURS",
          lessonsCount: 10,
          badge: "FOUNDATION",
          color: "electricBlue",
          status: "draft",
          imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed3a90533?q=80&w=2670&auto=format&fit=crop",
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
        description:
          "50+ Consistent Character Sheets (Front/Side/45) ready for Veo Ingredients.",
        price: "49.00",
        category: "Character Sheets",
        badge: "Bestseller",
        imageUrl:
          "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop",
        fileFormat: "PNG + PROMPT JSON",
        fileSize: "240MB",
        color: "neonPurple",
      },
      {
        title: "NEON NOIR TEXTURES",
        description:
          "100+ High-Res Cyberpunk environment textures generated with Nano Banano.",
        price: "29.00",
        category: "Textures",
        badge: "New",
        imageUrl:
          "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "4K JPG",
        fileSize: "850MB",
        color: "electricBlue",
      },
      {
        title: "CINEMATIC SFX PACK",
        description:
          "Pre-mixed Foley stems for Sci-Fi films. Impacts, Risers, and Ambience.",
        price: "19.00",
        category: "Audio / SFX",
        badge: null,
        imageUrl:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "WAV / MP3",
        fileSize: "1.2GB",
        color: "signalOrange",
      },
      {
        title: "MASTER PROMPT LIBRARY",
        description:
          "500+ Production-Ready Prompts for Veo, categorized by genre and shot type.",
        price: "39.00",
        category: "Prompts",
        badge: null,
        imageUrl: null,
        fileFormat: "JSON + PDF",
        fileSize: "12MB",
        color: "white",
      },
      {
        title: "CYBERPUNK TEXTURES VOL. 1",
        description:
          "Grungy neon surfaces, holographic overlays, and rain-soaked streets.",
        price: "34.00",
        category: "Textures",
        badge: "NEW",
        imageUrl:
          "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "PNG 4K",
        fileSize: "680MB",
        color: "purple",
      },
      {
        title: "FANTASY ENVIRONMENT PACK",
        description:
          "Ethereal forests, ancient ruins, and mystical landscapes for Veo workflows.",
        price: "44.00",
        category: "Textures",
        badge: null,
        imageUrl:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2670&auto=format&fit=crop",
        fileFormat: "PNG + EXR",
        fileSize: "1.5GB",
        color: "green",
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
