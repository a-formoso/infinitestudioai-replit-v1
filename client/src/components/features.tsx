import { motion } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Code2, 
  BarChart3 
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI-Native Core",
    description: "Built from the ground up to support large language models and neural networks with zero latency."
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Deploy instantly to 35+ regions worldwide. Your app is always close to your users."
  },
  {
    icon: Zap,
    title: "Instant Deployments",
    description: "From git push to production in seconds. No complex configuration required."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2 Type II certified. End-to-end encryption and automated compliance checks."
  },
  {
    icon: Code2,
    title: "Universal API",
    description: "One API to rule them all. Connect to any database, service, or LLM with a single SDK."
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Deep insights into your application performance, usage patterns, and user behavior."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-black/50">
      <div className="container px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Powering the Next Wave
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build world-class applications, 
            packaged in a beautiful developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:bg-white/5"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
