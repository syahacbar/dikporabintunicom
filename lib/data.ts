import {
  BookOpen,
  Building2,
  CalendarDays,
  Database,
  GraduationCap,
  Handshake,
  Landmark,
  Megaphone,
  Search,
  School,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "#home", label: "home" },
  { href: "#profil", label: "profile" },
  { href: "#peta-tematik", label: "statistics" },
  { href: "#layanan", label: "services" },
] as const;

export const heroSlides = [
  {
    key: "education",
    icon: GraduationCap,
    color: "from-[#06182a] via-[#0f4c81] to-[#2d9cdb]",
    image: "/images/hero-1.webp",
  },
  {
    key: "spmb",
    icon: School,
    color: "from-[#071d33] via-[#0f4c81] to-[#f2c94c]",
    image: "/images/hero-2.webp",
  },
  {
    key: "data",
    icon: Database,
    color: "from-[#06243a] via-[#0f4c81] to-[#2d9cdb]",
    image: "/images/hero-3.webp",
  },
  {
    key: "support",
    icon: BookOpen,
    color: "from-[#081829] via-[#0f4c81] to-[#4fb8e8]",
    image: "/images/hero-4.webp",
  },
] as const;

export const trustItems = [
  { key: "official", icon: ShieldCheck },
  { key: "data", icon: Database },
  { key: "access", icon: Search },
  { key: "collaboration", icon: Handshake },
] as const;

export const serviceSearchItems = ["sibansos", "spmb", "sispendik", "nisnNuptk"] as const;

export const serviceGroups = [
  { key: "sibansos", icon: Handshake, href: "#" },
  { key: "spmb", icon: School, href: "https://spmb.dikporabintuni.com" },
  { key: "sispendik", icon: Database, href: "https://lapbul.dikporabintuni.com" },
  { key: "nisnNuptk", icon: Search, href: "#" },
] as const;

export const stats = [
  { key: "schools", value: 290, icon: School },
  { key: "teachers", value: 1817, icon: GraduationCap },
  { key: "students", value: 20873, icon: BookOpen },
  { key: "classrooms", value: 962, icon: Building2 },
  { key: "graduates", value: 3840, icon: ShieldCheck },
  { key: "operators", value: 216, icon: Users },
] as const;

export const educationStats = {
  schoolsByStatus: [
    { key: "public", value: 129, color: "bg-primary" },
    { key: "private", value: 161, color: "bg-secondary" },
  ],
  schoolsByLevel: [
    { key: "kb", value: 61 },
    { key: "tk", value: 88 },
    { key: "sd", value: 88 },
    { key: "smp", value: 38 },
    { key: "sma", value: 18 },
    { key: "smk", value: 1 },
  ],
  schoolsByDistrict: [
    { name: "Bintuni", public: 15, private: 53 },
    { name: "Manimeri", public: 15, private: 32 },
    { name: "Sumuri", public: 6, private: 22 },
    { name: "Tomu", public: 9, private: 5 },
    { name: "Aroba", public: 4, private: 8 },
    { name: "Babo", public: 4, private: 7 },
    { name: "Merdey", public: 7, private: 4 },
    { name: "Meyado", public: 9, private: 1 },
    { name: "Kaitaro", public: 8, private: 2 },
    { name: "Tembuni", public: 4, private: 6 },
    { name: "Wamesa", public: 3, private: 7 },
    { name: "Kuri", public: 7, private: 2 },
    { name: "Aranday", public: 7, private: 1 },
    { name: "Tuhiba", public: 5, private: 2 },
    { name: "Moskona Selatan", public: 6, private: 0 },
    { name: "Farfurwar", public: 1, private: 4 },
    { name: "Weriagar", public: 1, private: 4 },
    { name: "Kamundan", public: 3, private: 1 },
    { name: "Moskona Utara", public: 4, private: 0 },
    { name: "Moskona Barat", public: 4, private: 0 },
    { name: "Dataran Beimes", public: 3, private: 0 },
    { name: "Masyeta", public: 2, private: 0 },
    { name: "Moskona Timur", public: 2, private: 0 },
  ],
  studentsByLevel: [
    { key: "kb", value: 552 },
    { key: "tk", value: 2031 },
    { key: "sd", value: 9614 },
    { key: "smp", value: 4144 },
    { key: "sma", value: 2713 },
    { key: "smk", value: 611 },
    { key: "skb", value: 1122 },
  ],
  teachersByEmployment: [
    { key: "pns", value: 850, color: "bg-primary" },
    { key: "pppk", value: 699, color: "bg-secondary" },
    { key: "contract", value: 268, color: "bg-accent" },
  ],
  teachersByLevel: [
    { key: "kb", value: 50 },
    { key: "tk", value: 182 },
    { key: "sd", value: 813 },
    { key: "smp", value: 431 },
    { key: "sma", value: 294 },
    { key: "smk", value: 39 },
    { key: "skb", value: 8 },
  ],
} as const;

export const thematicDistricts = educationStats.schoolsByDistrict.map((district, index) => {
  const positions = [
    { lat: -2.1069, lng: 133.5244 },
    { lat: -2.044, lng: 133.642 },
    { lat: -2.63, lng: 133.18 },
    { lat: -2.58, lng: 133.67 },
    { lat: -2.88, lng: 133.58 },
    { lat: -2.53, lng: 133.43 },
    { lat: -1.74, lng: 133.35 },
    { lat: -1.95, lng: 133.52 },
    { lat: -2.45, lng: 134.02 },
    { lat: -1.82, lng: 133.81 },
    { lat: -2.28, lng: 133.36 },
    { lat: -2.72, lng: 133.83 },
    { lat: -1.54, lng: 133.72 },
    { lat: -1.88, lng: 133.68 },
    { lat: -1.86, lng: 133.32 },
    { lat: -2.71, lng: 133.86 },
    { lat: -2.34, lng: 133.83 },
    { lat: -2.17, lng: 133.98 },
    { lat: -1.54, lng: 133.28 },
    { lat: -1.66, lng: 133.05 },
    { lat: -1.92, lng: 133.12 },
    { lat: -1.72, lng: 133.17 },
    { lat: -1.62, lng: 133.48 },
  ];
  const totalSchools = district.public + district.private;
  const studentFactors = [116, 88, 92, 70, 64, 75, 62, 58, 51, 74, 68, 54, 61, 49, 45, 53, 52, 48, 44, 42, 40, 38, 37];
  const teacherFactors = [9, 8, 8, 7, 6, 7, 6, 6, 5, 7, 6, 5, 5, 5, 4, 5, 5, 4, 4, 4, 3, 3, 3];

  return {
    ...district,
    ...positions[index],
    students: totalSchools * studentFactors[index],
    teachers: totalSchools * teacherFactors[index],
  };
});

export const programGroups = [
  { key: "education", icon: GraduationCap, items: ["digitalSchool", "teacherQuality"] },
  { key: "culture", icon: Landmark, items: ["localCulture", "regionalFestival"] },
  { key: "youth", icon: Users, items: ["youthIncubator", "leadership"] },
  { key: "sports", icon: Trophy, items: ["athleteDevelopment", "studentCompetition"] },
] as const;

export const news = [
  { key: "n1", category: "education", date: "2026-06-12", image: "from-sky-200 to-blue-500" },
  { key: "n2", category: "culture", date: "2026-06-08", image: "from-amber-200 to-orange-500" },
  { key: "n3", category: "youth", date: "2026-06-02", image: "from-emerald-200 to-teal-600" },
  { key: "n4", category: "sports", date: "2026-05-28", image: "from-blue-200 to-indigo-600" },
  { key: "n5", category: "education", date: "2026-05-24", image: "from-cyan-200 to-sky-600" },
  { key: "n6", category: "culture", date: "2026-05-18", image: "from-yellow-200 to-red-500" },
] as const;

export const announcements = [
  { key: "pppk", priority: "high", icon: ShieldCheck },
  { key: "ppdb", priority: "medium", icon: School },
  { key: "aid", priority: "medium", icon: Megaphone },
  { key: "event", priority: "low", icon: CalendarDays },
] as const;

export const agenda = [
  { key: "festival", date: "2026-07-05", icon: Landmark },
  { key: "teacherTraining", date: "2026-07-12", icon: GraduationCap },
  { key: "tournament", date: "2026-07-20", icon: Trophy },
  { key: "youthSeminar", date: "2026-08-03", icon: Users },
] as const;

export const gallery = [
  { key: "education", color: "from-sky-100 to-sky-500", height: "h-64" },
  { key: "culture", color: "from-amber-100 to-orange-500", height: "h-80" },
  { key: "youth", color: "from-emerald-100 to-teal-600", height: "h-56" },
  { key: "sports", color: "from-blue-100 to-indigo-600", height: "h-72" },
  { key: "school", color: "from-cyan-100 to-blue-600", height: "h-56" },
  { key: "community", color: "from-yellow-100 to-amber-500", height: "h-72" },
] as const;

export const partners = [
  { key: "kemendikbud", icon: GraduationCap },
  { key: "pemkab", icon: Building2 },
  { key: "schools", icon: School },
  { key: "youthOrg", icon: Users },
  { key: "koni", icon: Trophy },
  { key: "cultureCommunity", icon: Landmark },
] as const;
