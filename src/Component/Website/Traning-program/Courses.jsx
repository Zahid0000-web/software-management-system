import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowUpRight, BsCodeSquare, BsWindowStack, BsPhoneFlip, BsX } from "react-icons/bs";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { MdOutlineDesignServices, MdOutlineCloudQueue, MdOutlineSecurity } from "react-icons/md";
import { AiOutlineRobot } from "react-icons/ai";
import { SiBlockchaindotcom } from "react-icons/si";

const coursesData = [
  {
    id: 1,
    title: "Software Development",
    tag: "SOFTWARE DEV",
    icon: <BsCodeSquare className="text-4xl" />,
    color: "from-blue-600 to-indigo-600",
    description:
      "We create and maintain powerful, scalable software so you can stay focused on growing your revenue streams — from strategy to post-production support.",
    modalContent: {
      overview:
        "Our software development service covers the full lifecycle — from requirements gathering and architecture design to development, testing, and long-term maintenance.",
      features: [
        "Custom enterprise software tailored to your business",
        "Agile development with regular sprint reviews",
        "Code quality assurance & peer reviews",
        "CI/CD pipeline setup & DevOps integration",
        "Post-launch support & performance monitoring",
      ],
      tech: ["Node.js", "Python", "Java", "Go", "PostgreSQL", "Docker"],
    },
  },
  {
    id: 2,
    title: "Web Development",
    tag: "WEB DEV",
    icon: <BsWindowStack className="text-4xl" />,
    color: "from-indigo-500 to-blue-600",
    description:
      "We build scalable, robust web applications using modern architecture and technologies — designed to perform and impress across every device.",
    modalContent: {
      overview:
        "From landing pages to complex web platforms, we engineer fast, accessible, and visually stunning web experiences using the latest frontend and backend technologies.",
      features: [
        "Responsive UI/UX across all screen sizes",
        "SEO-optimized and performance-first development",
        "REST & GraphQL API integration",
        "CMS integration (Sanity, Contentful, Strapi)",
        "Progressive Web App (PWA) capabilities",
      ],
      tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Prisma", "Vercel"],
    },
  },
  {
    id: 3,
    title: "App Development",
    tag: "APP DEV",
    icon: <BsPhoneFlip className="text-4xl" />,
    color: "from-purple-500 to-indigo-600",
    description:
      "We deliver cross-platform mobile applications using the modern stack — Flutter-powered, beautiful on Android and iOS, built for real-world performance.",
    modalContent: {
      overview:
        "We specialize in cross-platform and native mobile app development — delivering smooth, high-performance apps that users love on both Android and iOS.",
      features: [
        "Cross-platform with Flutter & React Native",
        "Native iOS (Swift) & Android (Kotlin) development",
        "Offline-first architecture with local data sync",
        "Push notifications & real-time features",
        "App Store & Play Store deployment support",
      ],
      tech: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Supabase"],
    },
  },
  {
    id: 4,
    title: "UI/UX Design",
    tag: "DESIGN",
    icon: <MdOutlineDesignServices className="text-4xl" />,
    color: "from-orange-500 to-rose-500",
    description:
      "We craft intuitive, beautiful interfaces that convert visitors into customers — blending research-driven design with pixel-perfect execution.",
    modalContent: {
      overview:
        "Great products start with great design. Our UX team conducts user research, builds wireframes, and delivers polished high-fidelity prototypes.",
      features: [
        "User research & persona development",
        "Wireframing & interactive prototyping",
        "Design systems & component libraries",
        "Usability testing & iteration",
        "Handoff-ready Figma files for developers",
      ],
      tech: ["Figma", "Adobe XD", "Framer", "Lottie", "Zeroheight", "Maze"],
    },
  },
  {
    id: 5,
    title: "Cloud Solutions",
    tag: "CLOUD",
    icon: <MdOutlineCloudQueue className="text-4xl" />,
    color: "from-sky-500 to-cyan-500",
    description:
      "We architect and deploy cloud infrastructure that scales with your business — secure, cost-optimized, and built for 99.99% uptime.",
    modalContent: {
      overview:
        "We help businesses migrate to the cloud, optimize existing infrastructure, and build cloud-native applications that leverage the full power of modern platforms.",
      features: [
        "Cloud migration strategy & execution",
        "Multi-cloud & hybrid cloud architecture",
        "Kubernetes & container orchestration",
        "Cost optimization & resource management",
        "24/7 monitoring & incident response",
      ],
      tech: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Datadog"],
    },
  },
  {
    id: 6,
    title: "Cybersecurity",
    tag: "SECURITY",
    icon: <MdOutlineSecurity className="text-4xl" />,
    color: "from-red-600 to-rose-700",
    description:
      "We protect your digital assets with enterprise-grade security audits, penetration testing, and compliance-ready infrastructure hardening.",
    modalContent: {
      overview:
        "In a world of evolving threats, we provide end-to-end cybersecurity services — from vulnerability assessments to ongoing threat monitoring.",
      features: [
        "Penetration testing & vulnerability assessments",
        "OWASP Top 10 security audits",
        "GDPR, SOC 2, ISO 27001 compliance",
        "Zero-trust architecture implementation",
        "Security awareness training for teams",
      ],
      tech: ["Kali Linux", "Burp Suite", "Nessus", "Splunk", "Cloudflare", "Vault"],
    },
  },
  {
    id: 7,
    title: "AI & Machine Learning",
    tag: "AI / ML",
    icon: <AiOutlineRobot className="text-4xl" />,
    color: "from-violet-600 to-fuchsia-600",
    description:
      "We build intelligent systems — from predictive analytics and NLP solutions to custom LLM integrations that automate your business.",
    modalContent: {
      overview:
        "Leverage the power of artificial intelligence with our end-to-end ML solutions — model training, deployment, and integration into your existing product.",
      features: [
        "Custom ML model development & training",
        "LLM integration & fine-tuning (GPT, Claude, Llama)",
        "Computer vision & NLP pipelines",
        "Recommendation engines & predictive analytics",
        "MLOps — model versioning, monitoring & retraining",
      ],
      tech: ["Python", "TensorFlow", "PyTorch", "LangChain", "Hugging Face", "FastAPI"],
    },
  },
  {
    id: 8,
    title: "Blockchain Development",
    tag: "BLOCKCHAIN",
    icon: <SiBlockchaindotcom className="text-4xl" />,
    color: "from-amber-500 to-yellow-500",
    description:
      "We develop decentralized applications, smart contracts, and Web3 integrations — building trust and transparency into your product.",
    modalContent: {
      overview:
        "From DeFi protocols to NFT marketplaces and enterprise blockchain solutions, we deliver secure, audited smart contracts and seamless Web3 UX.",
      features: [
        "Smart contract development & auditing",
        "DeFi protocol & DEX development",
        "NFT marketplace & minting platforms",
        "Web3 wallet integration (MetaMask, WalletConnect)",
        "Cross-chain bridge & interoperability solutions",
      ],
      tech: ["Solidity", "Ethereum", "Polygon", "Hardhat", "IPFS", "Ethers.js"],
    },
  },
];

const Modal = ({ course, onClose }) => {
  const navigate = useNavigate();

  if (!course) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10"
        style={{ animation: "modalIn 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-2 w-full rounded-t-3xl bg-gradient-to-r ${course.color}`} />
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <BsX className="text-xl text-gray-600" />
          </button>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              {course.icon}
            </div>
            <span className="text-xs font-bold tracking-widest px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700">
              {course.tag}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{course.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{course.modalContent.overview}</p>
          <div className="mb-6">
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">What's Included</h4>
            <ul className="space-y-2">
              {course.modalContent.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${course.color} flex-shrink-0`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {course.modalContent.tech.map((t, i) => (
                <span key={i} className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/apply")}
            className={`mt-8 w-full py-3 rounded-2xl bg-gradient-to-r ${course.color} text-white font-bold text-sm tracking-wide hover:opacity-90 transition-opacity`}
          >
            Get Started →
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <style>{`
        .course-card {
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 1.5rem;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 360px;
        }
        .course-card:hover {
          background: #1e2d5e;
          border-color: #2e3f7c;
          transform: translateY(-8px);
          box-shadow: 0 30px 70px rgba(20, 35, 100, 0.55);
        }
        .card-circle {
          position: absolute;
          top: 0; right: 0;
          width: 110px; height: 110px;
          border-bottom-left-radius: 100%;
          background: rgba(199, 210, 254, 0.4);
          transition: background 0.4s ease;
          pointer-events: none;
        }
        .course-card:hover .card-circle {
          background: rgba(99, 102, 241, 0.2);
        }
        .card-icon-box {
          width: 64px; height: 64px;
          border-radius: 1rem;
          background: #ede9fe;
          color: #4f46e5;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          transition: background 0.4s ease, color 0.4s ease;
        }
        .course-card:hover .card-icon-box {
          background: rgba(99, 102, 241, 0.25);
          color: #a5b4fc;
        }
        .card-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 5px 14px;
          border-radius: 999px;
          background: #ede9fe;
          color: #4338ca;
          margin-bottom: 1rem;
          transition: background 0.4s ease, color 0.4s ease;
        }
        .course-card:hover .card-tag {
          background: rgba(99, 102, 241, 0.22);
          color: #c7d2fe;
        }
        .card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.75rem;
          transition: color 0.4s ease;
        }
        .course-card:hover .card-title { color: #ffffff; }
        .card-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #6b7280;
          flex: 1;
          transition: color 0.4s ease;
        }
        .course-card:hover .card-desc { color: #94a3b8; }
        .card-readmore {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #4338ca;
          margin-top: 1.5rem;
          transition: color 0.4s ease;
        }
        .course-card:hover .card-readmore { color: #ffffff; }
      `}</style>

      <div className="bg-[#0f172a] py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
              <HiOutlineCpuChip className="text-indigo-400 text-sm" />
              <span className="text-xs font-bold tracking-wider text-indigo-300 uppercase">What We Deliver</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Enterprise-Grade
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400"> Digital Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
              From concept to deployment — we engineer excellence across every platform
            </p>
          </div>

          {/* 3-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="card-circle" />
                <div className="p-8 flex flex-col h-full">
                  <div className="card-icon-box">{course.icon}</div>
                  <span className="card-tag">{course.tag}</span>
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-desc">{course.description}</p>
                  <div className="card-readmore">
                    Read More <BsArrowUpRight />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">Trusted by 50+ startups & enterprises</span>
            </div>
          </div>
        </div>

        {selectedCourse && (
          <Modal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </div>
    </>
  );
};

export default Courses;