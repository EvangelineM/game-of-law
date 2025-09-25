import { motion } from "framer-motion";
import { Trophy, BookOpen, Sparkles, Scale, Gamepad2 } from "lucide-react";
import DidYouKnow from "../components/DidYouKnow";
import SectionCard from "../components/SectionCard";
import bgImage from '../background.png';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Hero Section with Simple Background */}
      <section
        className="relative w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Static Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/55" />

        {/* Subtle Static Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          
          {/* Static decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-[#FFEEA9]/10 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-xl" />
        </div>

        {/* Hero Content with Simple Animations */}
        <header className="relative z-10 px-6 -mt-20">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-[#FFEEA9] mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>Welcome to </span>
            <span className="relative inline-block">
              Game of Law
              <div className="absolute -inset-1 rounded-lg blur-sm -z-10" />
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#FFEEA9] max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Legal terms and rights often feel overwhelming.
            <br />
            <span>
              Game of Law makes it simple
            </span>{" "}
            with quizzes, challenges, and games anyone can play.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href="/login"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </a>
          </motion.div>
        </header>

      </section>

      {/* Beige Background for All Sections Below */}
      <div className="w-full bg-[#FFEEA9] relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D2691E 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #CD853F 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Did You Know Section */}
        <motion.div
          className="w-full flex justify-center -mt-52 mb-40 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <DidYouKnow />
        </motion.div>

        {/* Features Section */}
        <motion.section 
          className="flex justify-center w-full pb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
            {[
              {
                title: "Games",
                description: "Explore interactive games about law and the Constitution.",
                link: "/games",
                icon: <Gamepad2 />,
                backgroundImage: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=870&auto=format&fit=crop"
              },
              {
                title: "Leaderboard",
                description: "Compete with friends and climb the ranks.",
                link: "/leaderboard",
                icon: <Trophy />,
                backgroundImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"
              },
              {
                title: "Case Facts",
                description: "Explore fun legal scenarios and real-world cases.",
                link: "/case-facts",
                icon: <BookOpen />,
                backgroundImage: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=800&auto=format&fit=crop&q=60"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <SectionCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          className="max-w-4xl mx-auto py-16 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-3">About Game of Law</h2>
            <p className="text-lg text-amber-900 max-w-2xl mx-auto">
              An educational platform designed to make learning about law and the Indian Constitution engaging and accessible for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-2 text-amber-600" />
                Our Mission
              </h3>
              <p className="text-stone-700 mb-4">
                We believe everyone should understand their rights and the laws that protect them, regardless of age or background. Game of Law breaks down complex legal concepts into fun, interactive learning experiences.
              </p>
              <p className="text-stone-700">
                Through gamified learning, we aim to increase legal literacy and empower citizens with knowledge of their constitutional rights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-amber-600" />
                Our Approach
              </h3>
              <p className="text-stone-700 mb-4">
                Game of Law adapts content based on user age groups - children, teens, and adults - ensuring everyone receives age-appropriate explanations of legal concepts.
              </p>
              <p className="text-stone-700">
                Through quizzes, memory games, situation-based scenarios and interactive modules, we make learning about law engaging, memorable and fun.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Learn Law Section */}
        <motion.section
          className="bg-gradient-to-br from-[#FFBF78] to-[#FFB347] text-center py-12 px-6 rounded-2xl shadow-lg max-w-4xl mx-auto mb-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold text-[#4B2C14] mb-4 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Learn Law? ⚖️
          </motion.h2>
          
          <motion.p
            className="text-[#4B2C14] text-lg relative z-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Knowing your rights empowers you.
            <br />
            <span className="font-semibold">
              Start today with interactive games and challenges designed for everyone.
            </span>
          </motion.p>

          {/* Static decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#4B2C14]/20 rounded-full opacity-60" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#4B2C14]/20 rounded-full opacity-40" />
        </motion.section>
      </div>
    </div>
  );
}