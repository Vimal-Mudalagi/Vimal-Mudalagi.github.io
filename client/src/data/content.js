// ============================================================
// ALL EDITABLE CONTENT LIVES HERE.
// Anything marked "PLACEHOLDER" must be replaced before publishing.
// ============================================================

export const site = {
  name: "Vimal Mudalagi",
  logo: "/logo.svg", // replace client/public/logo.svg (or change path)
  profileImage: "/profile.svg", // PLACEHOLDER: replace client/public/profile.svg or point to your photo
  resumeUrl: "/resume.pdf", // PLACEHOLDER: put your PDF at client/public/resume.pdf
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const social = {
  github: "https://github.com/Vimal-Mudalagi",
  linkedin: "https://www.linkedin.com/in/PLACEHOLDER", // PLACEHOLDER
  email: "mailto:PLACEHOLDER@example.com", // PLACEHOLDER
  leetcode: "https://leetcode.com/u/PLACEHOLDER", // PLACEHOLDER
};

export const hero = {
  intro:
    "MSc Cybersecurity student with interests in SOC analysis, threat hunting, and security engineering. Looking for internships and entry-level roles where I can learn from real security operations.",
  roles: ["Cybersecurity Enthusiast", "SOC Analyst Aspirant", "Threat Hunting", "Security Research"],
};

export const about = [
  "I am an MSc Cybersecurity student at Digital University Kerala (DUK), following a BSc in Computer Science. My focus is on defensive and analytical security work: monitoring, detection, and understanding how attacks are carried out.",
  "I have worked on projects in API development, IoT security assessment, and Android application pentesting. I am seeking internships and entry-level technical roles in SOC operations, threat hunting, or security engineering.",
];

// PLACEHOLDER: confirm every item below reflects what you are actually comfortable discussing.
export const skills = [
  { group: "Cybersecurity", items: ["Threat Modelling", "Penetration Testing (basics)", "SOC Fundamentals", "Threat Hunting (learning)", "[EDIT: add confirmed skills]"] },
  { group: "Networking and Systems", items: ["TCP/IP", "Linux", "Windows", "[EDIT: add confirmed skills]"] },
  { group: "Programming", items: ["Python", "JavaScript", "Flask", "[EDIT: add confirmed languages]"] },
  { group: "Tools and Platforms", items: ["Git & GitHub", "Docker", "[EDIT: e.g. Wireshark, Burp Suite, Splunk — only if used]"] },
];

// Add a project by appending an object. Omit github/demo to hide the link.
export const projects = [
  {
    title: "Extinct-API",
    description:
      "Dockerized Flask REST API providing data on extinct animals and birds, including species names, extinction years, and locations.",
    tech: ["Flask", "Python", "Docker", "REST"],
    github: "https://github.com/Vimal-Mudalagi", // PLACEHOLDER: link to the exact repo
  },
  {
    title: "IoT Security Assessment and Threat Modelling",
    description: "[EDIT: add a short description of scope and approach. Mention results only if completed.]",
    tech: ["IoT", "Threat Modelling"],
  },
  {
    title: "Android Application Pentesting",
    description: "[EDIT: add a short description of apps tested and methodology. Mention results only if completed.]",
    tech: ["Android", "Pentesting"],
  },
  {
    title: "ML/DL Project",
    description: "[EDIT: project details to be added.]",
    tech: ["[EDIT]"],
  },
];

export const education = [
  {
    school: "Digital University Kerala (DUK)",
    degree: "MSc Cybersecurity",
    period: "2025 – 2027",
    grade: "CGPA: [EDIT: official value]", // PLACEHOLDER
    note: "Currently pursuing.",
  },
  {
    school: "K.L.E. Society’s G.I. Bagewadi Arts, Science and Commerce College, Nipani",
    degree: "Bachelor of Science — Computer Science",
    period: "Nov 2022 – Oct 2025",
    grade: "8.71 CGPA", // VERIFY against your official marksheet before publishing
    note: "Completed coursework in Data Structures, Algorithms, Object-Oriented Programming, and related computer science subjects.",
  },
  {
    school: "K.L.E. Society’s Independent College, Chikodi",
    degree: "XII Science (PCMB)",
    period: "Jul 2020 – Apr 2022",
    grade: "90%",
  },
  {
    school: "Shivashankar Jolie English Medium Public School, Nandni",
    degree: "CBSE (X)",
    period: "Jun 2019 – Mar 2020",
    grade: "90.2%",
  },
  {
    school: "Shri Swami Vivekanand English Medium School, Khanapur",
    degree: "Primary education",
    period: "Jun 2013 – Mar 2020",
    grade: "97.5%",
  },
];
