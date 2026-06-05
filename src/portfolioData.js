// Edit this file to update the portfolio's content.
// Keep images and downloadable files in /public, then reference them with paths
// such as "/photo.jpg" or "/Mahmudul-Islam-CV.pdf".

export const portfolio = {
  person: {
    firstName: "Mahmudul",
    fullName: "Mahmudul Islam",
    nickname: "Robince",
    location: "Dhaka, Bangladesh",
    role: "Embedded Systems Engineer",
    education: "BSc EEE, BUET",
    photo: "/myphoto.png",
    cv: "/Mahmudul-Islam-CV.pdf",
    availability: "Available for opportunities",
    introduction:
      "Building intelligent connected devices, AI-powered cameras, and embedded systems from hardware interfaces to cloud connectivity. 5+ years shipping production firmware across IoT, Embedded Linux, and Edge AI.",
  },

  navigation: ["Home", "About", "Skills", "Projects", "Experience", "Achievements", "Contact"],

  socialLinks: [
    { label: "LinkedIn", value: "/in/mahmudulrobince", href: "https://www.linkedin.com/in/mahmudulrobince/" },
    { label: "GitHub", value: "/mahmudulislam299", href: "https://github.com/mahmudulislam299" },
    { label: "Email", value: "mahmudulislam299@gmail.com", href: "mailto:mahmudulislam299@gmail.com" },
  ],

  hero: {
    typingStrings: [
      "Embedded Systems Engineer",
      "Embedded Linux Developer",
      "IoT Product Builder",
      "Edge AI Engineer",
      "Firmware Architect",
      "Hardware Designer",
    ],
    photoSubtitle: "Embedded Systems Engineer · BSc EEE, BUET",
    floatingTags: [
      { text: "Embedded Linux", top: "-18px", right: "24px" },
      { text: "Firmware", bottom: "100px", left: "-30px" },
      { text: "Edge AI", top: "38%", right: "-32px" },
    ],
  },

  about: {
    label: "Who I am",
    title: "Turning silicon into",
    highlightedTitle: "smart products",
    paragraphs: [
      "I'm a passionate Embedded Systems Engineer with 5+ years of experience developing firmware, IoT devices, Embedded Linux solutions, AI-enabled camera systems, and cloud-connected edge devices.",
      "From bare-metal C on microcontrollers to Linux kernel BSPs and Edge AI pipelines — I work across the full stack. Currently at Teton Electronics building next-gen camera platforms on Ingenic SoCs.",
    ],
    tags: ["Embedded C/C++", "Embedded Linux", "Device Drivers", "RTOS", "IoT", "Edge AI", "PCB Design", "HEVC Streaming"],
    facts: [
      { icon: "🎓", title: "BSc in EEE", subtitle: "BUET · 2016–2021" },
      { icon: "📍", title: "Based in", subtitle: "Dhaka, Bangladesh" },
      { icon: "🌐", title: "Experience", subtitle: "5+ Years" },
      { icon: "📄", title: "IEEE Published", subtitle: "EEE ICECE 2020" },
      { icon: "🌍", title: "Clients", subtitle: "USA · Finland · Remote" },
    ],
  },

  skillsSection: {
    label: "Technical expertise",
    title: "Core",
    highlightedTitle: "Skills",
    description: "From bare-metal firmware to cloud AI systems — full-stack embedded engineering.",
  },

  skills: [
    { category: "Firmware Development", icon: "⚙️", items: ["C / C++", "FreeRTOS", "Device Drivers", "Embedded Architecture", "Real-time Control", "Bare-metal Programming"] },
    { category: "Embedded Linux", icon: "🐧", items: ["Linux Kernel / BSP", "OpenWRT", "BusyBox", "Cross-compilation", "Shell Scripting", "Yocto / OE"] },
    { category: "Networking & Comms", icon: "📡", items: ["TCP/IP", "MQTT / HTTP", "BLE / Wi-Fi", "GSM / LTE", "SRT / RTSP", "MIPI CSI-2"] },
    { category: "Hardware & Interfaces", icon: "🔌", items: ["I2C / SPI / UART", "PCB Design (KiCad)", "Altium Designer", "Schematic Capture", "Li-ion BMS", "Power Electronics"] },
    { category: "AI & Computer Vision", icon: "🤖", items: ["Edge AI", "NCNN Engine", "Human Detection", "MobileNet", "Camera Pipeline", "Video Analytics"] },
    { category: "Cloud & IoT", icon: "☁️", items: ["Azure IoT Hub", "MQTT Broker", "OTA Firmware", "MongoDB", "Docker", "IoT Gateway"] },
  ],

  projectsSection: {
    label: "Featured work",
    title: "Selected",
    highlightedTitle: "Projects",
    description: "End-to-end embedded products — hardware, firmware, networking, AI, and cloud.",
  },

  projects: [
    { title: "Keo Cam — AI Body Camera", subtitle: "Embedded Linux · Edge AI · Cloud", description: "Full-stack AI-enabled body camera on Ingenic T31 SoC. HEVC/H.265 encoding, RTSP/SRT live streaming, BLE provisioning, remote monitoring, and cloud connectivity.", tags: ["Ingenic T31", "HEVC/H.265", "RTSP/SRT", "BLE", "Edge AI", "Embedded Linux"], color: "#6D28D9", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
    { title: "AI Human Detection Camera", subtitle: "Computer Vision · NCNN · Edge", description: "Real-time human detection on embedded hardware using NCNN inference engine and MobileNet. Optimized for low-power edge deployment with full video analytics pipeline.", tags: ["NCNN", "MobileNet", "Computer Vision", "Edge AI", "Embedded Linux"], color: "#7C3AED", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80" },
    { title: "Remote Battery Monitoring", subtitle: "IoT · Telecom · GSM/4G", description: "Monitors 48V Li-ion backup batteries at telecom towers — voltage, current, SOC, temperature — with GSM/4G remote data transmission and real-time alerting.", tags: ["GSM/4G", "Li-ion BMS", "IoT", "C Firmware", "Cloud"], color: "#9333EA", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80" },
    { title: "4G OpenWRT Cellular Router", subtitle: "OpenWRT · Networking · Embedded", description: "OpenWRT-based cellular router with UART data ingestion, eMMC local storage, 4G/LTE uplink, and full technical documentation for engineering team handover.", tags: ["OpenWRT", "4G/LTE", "UART", "eMMC", "Networking"], color: "#a855f7", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=80" },
    { title: "VuAI Workplace AI Sensor", subtitle: "RTOS · OTA · Power Optimization", description: "RTOS firmware optimization, power profiling, OTA firmware update via Linux-based IoT gateway. Production release for workplace AI sensing device.", tags: ["FreeRTOS", "Power Optimization", "OTA", "Linux Gateway"], color: "#c026d3", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80" },
    { title: "praniSheba IoT Base Station", subtitle: "TDM Sensor Network · KiCad PCB", description: "Remote cowshed environment monitoring (NH3, CH4, temp, humidity). Custom TDM-based nRF sensor network with Wi-Fi and GSM uplink.", tags: ["nRF TDM", "Wi-Fi", "GSM", "KiCad PCB", "IoT"], color: "#db2777", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80" },
  ],

  experience: [
    { role: "Embedded System Engineer", company: "Teton Electronics Ltd", companyIcon: "/TE.jpeg", location: "Dhaka, Bangladesh", period: "Jul 2024 – Present", current: true, points: ["Firmware for smart camera & IoT products on Ingenic T31/T23 SoC with Embedded Linux", "IMX327/GC4653 sensor integration, MIPI CSI-2, HEVC/H.265 RTSP/SRT pipeline", "OTA firmware architecture, cross-team integration with HW & SW partners"] },
    { role: "Embedded Software Engineer", company: "ACluster LLC (Remote)", companyIcon: "/AC.png", location: "USA-based", period: "Apr 2024 – Jul 2024", points: ["TRIAC-based AC motor controller firmware with phase-angle speed control", "Driver-level support for managed Ethernet switch embedded systems"] },
    { role: "Embedded Software Engineer", company: "Binate Solutions (for Avuity LLC)", companyIcon: "/BS.jpeg", location: "Dhaka, Bangladesh", period: "Jul 2023 – Mar 2024", points: ["Optimized VuAI workplace AI sensor: performance, memory, power on RTOS", "Resolved camera capture failure & production instability", "OTA firmware update via Linux-based IoT gateway"] },
    { role: "Embedded Project Consultant", company: "Tespack Ltd (Remote)", companyIcon: "/TP.jpeg", location: "Helsinki, Finland", period: "Oct 2023 – Jan 2024", points: ["Led 4G cellular router development on OpenWRT", "UART pipeline, eMMC storage, cellular data transmission"] },
    { role: "Senior IoT Engineer", company: "adorsho praniSheba Ltd", companyIcon: "/AP.png", location: "Dhaka, Bangladesh", period: "Oct 2022 – Jun 2023", points: ["Led IoT team, authored PRDs and product roadmaps", "Hardware research, PCB layout (KiCad), firmware, end-to-end delivery"] },
    { role: "IoT Engineer", company: "adorsho praniSheba Ltd", companyIcon: "/AP.png", location: "Dhaka, Bangladesh", period: "Mar 2021 – Oct 2022", points: ["Multi-product IoT development: HW design, firmware, PCB", "Custom firmware libs: async GSM, TDM sensor network, flash handler", "Assembled and tested 40+ IoT devices; automated flashing via Bash"] },
  ],

  achievements: [
    { icon: "🏆", title: "BASIS National ICT Award 2022", subtitle: "Winner — Industrial-Agriculture Category", color: "#6D28D9" },
    { icon: "🥇", title: "Inter University Project Competition", subtitle: "Champion — 2018", color: "#7C3AED" },
    { icon: "🌍", title: "International Client Projects", subtitle: "USA · Finland · Remote Engineering", color: "#9333EA" },
    { icon: "📄", title: "IEEE Publication", subtitle: "EEE ICECE 2020 — Signal Processing", color: "#c026d3" },
    { icon: "🎓", title: "BSc EEE — BUET", subtitle: "Bangladesh's top engineering university", color: "#db2777" },
  ],

  certifications: [
    { name: "Microsoft Azure Fundamentals", issuer: "Microsoft", icon: "☁️" },
    { name: "Cisco Certified Network Associate", issuer: "Cisco (CCNA)", icon: "🌐" },
  ],

  contact: {
    description: "Open to embedded systems roles, IoT consulting, PCB design, firmware projects, and Edge AI. Available for remote and international work.",
    phone: { label: "Phone", value: "+880 1811 177722", href: "tel:+8801811177722" },
  },
};
