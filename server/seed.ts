import { db } from "./db";
import { courses, lessons, assets } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create courses
    const [course1, course2] = await db
      .insert(courses)
      .values([
        {
          title: "MASTER THE GOOGLE ECOSYSTEM",
          slug: "master-the-google-ecosystem",
          description:
            "Stop using fragmented tools. Learn to run a complete Hollywood-style studio from your browser using the integrated power of Gemini 3.0, Nano Banana, and Veo.",
          shortDescription:
            "The foundation. Learn the connected workflow of Gemini 3.0, Nano Banana, and Veo to run a one-person studio.",
          price: "149.00",
          level: "Foundation",
          duration: "4.5 HOURS",
          lessonsCount: 25,
          badge: "FOUNDATION",
          color: "electricBlue",
        },
        {
          title: "ADVANCED AI CINEMATOGRAPHY",
          slug: "advanced-ai-cinematography",
          description:
            "Mastering physics, compound camera moves, and the uncanny valley in Veo 3.1. Deep dive into motion control.",
          shortDescription:
            'Mastering physics, compound camera moves, and the "Invisible Cut" in Veo 3.1. Deep technical control.',
          price: "199.00",
          level: "Specialist",
          duration: "6.0 HOURS",
          lessonsCount: 30,
          badge: "SPECIALIST",
          color: "signalOrange",
        },
      ])
      .returning();

    console.log("✅ Created courses");

    // Create lessons for Course 1
    await db.insert(lessons).values([
      // Module 1: The Writer's Room
      {
        courseId: course1.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 1,
        title: "The Multimodal Script: Writing with Images",
        videoUrl: null,
        duration: 12,
      },
      {
        courseId: course1.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 2,
        title: "Context is King: Managing the 2M Token Window",
        videoUrl: null,
        duration: 15,
      },
      {
        courseId: course1.id,
        moduleNumber: 1,
        moduleName: "THE WRITER'S ROOM",
        lessonNumber: 3,
        title: "Generating the Visual Bible",
        videoUrl: null,
        duration: 18,
      },

      // Module 2: The Casting Department
      {
        courseId: course1.id,
        moduleNumber: 2,
        moduleName: "THE CASTING DEPARTMENT",
        lessonNumber: 1,
        title: "Nano Banana's Ingredient System Explained",
        videoUrl: null,
        duration: 14,
      },
      {
        courseId: course1.id,
        moduleNumber: 2,
        moduleName: "THE CASTING DEPARTMENT",
        lessonNumber: 2,
        title: "Building Your Digital Actor Library",
        videoUrl: null,
        duration: 20,
      },
      {
        courseId: course1.id,
        moduleNumber: 2,
        moduleName: "THE CASTING DEPARTMENT",
        lessonNumber: 3,
        title: "Character Consistency Across Shots",
        videoUrl: null,
        duration: 16,
      },

      // Module 3: Production Pipeline
      {
        courseId: course1.id,
        moduleNumber: 3,
        moduleName: "PRODUCTION PIPELINE",
        lessonNumber: 1,
        title: "From Gemini to Veo: The Connected Workflow",
        videoUrl: null,
        duration: 22,
      },
      {
        courseId: course1.id,
        moduleNumber: 3,
        moduleName: "PRODUCTION PIPELINE",
        lessonNumber: 2,
        title: "The Ingredients Workflow",
        videoUrl: null,
        duration: 19,
      },
      {
        courseId: course1.id,
        moduleNumber: 3,
        moduleName: "PRODUCTION PIPELINE",
        lessonNumber: 3,
        title: "Batch Processing for Efficiency",
        videoUrl: null,
        duration: 17,
      },
    ]);

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
