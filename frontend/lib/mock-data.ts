export interface Project {
  id: string
  name: string
  description: string
  problemSolved: string
  category: string
  currentAmount: number
  targetAmount: number
  deadline: string
  location: {
    city: string
    province: string
    coordinates: [number, number] // [lng, lat] for Argentina
  }
  milestones: Milestone[]
  updates: Update[]
  imageUrl: string
  organizationName: string
  verified: boolean
  donorsCount: number
  daysLeft: number
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  completed: boolean
  completedDate?: string
  percentage: number
}

export interface Update {
  id: string
  title: string
  content: string
  date: string
  imageUrl?: string // Keep for backward compatibility
  media?: MediaAttachment[] // Added support for multiple media attachments
  milestoneId?: string // Link to specific milestone for proof
}

export interface MediaAttachment {
  id: string
  type: "photo" | "video"
  url: string
  caption?: string
  thumbnail?: string // For videos
}

export interface CompanyDonation {
  id: string
  projectId: string
  amount: number
  date: string
  taxDeductible: boolean
}

export interface CompanyStats {
  totalDonated: number
  projectsSupported: number
  taxDeductions: number
  impactMetrics: {
    peopleHelped: number
    communitiesReached: number
    sdgGoals: string[]
  }
}

// Mock projects data for Argentina
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Comedor Escolar San Martín",
    description: "Construcción de un comedor escolar para 200 niños en situación de vulnerabilidad",
    problemSolved: "Desnutrición infantil en zonas rurales de Salta",
    category: "Educación y Alimentación",
    currentAmount: 18500,
    targetAmount: 30000,
    deadline: "2025-12-15",
    location: {
      city: "Salta",
      province: "Salta",
      coordinates: [-65.4176, -24.7821],
    },
    milestones: [
      {
        id: "m1",
        title: "Preparación del terreno",
        description: "Limpieza y nivelación del terreno para construcción",
        targetAmount: 5000,
        currentAmount: 5000,
        completed: true,
        completedDate: "2025-06-15",
        percentage: 100,
      },
      {
        id: "m2",
        title: "Construcción de cimientos",
        description: "Excavación y construcción de la base del comedor",
        targetAmount: 8000,
        currentAmount: 6500,
        completed: false,
        percentage: 81,
      },
      {
        id: "m3",
        title: "Estructura y techo",
        description: "Construcción de paredes y colocación del techo",
        targetAmount: 12000,
        currentAmount: 4000,
        completed: false,
        percentage: 33,
      },
      {
        id: "m4",
        title: "Equipamiento y mobiliario",
        description: "Instalación de cocina, mesas y sillas",
        targetAmount: 5000,
        currentAmount: 3000,
        completed: false,
        percentage: 60,
      },
    ],
    updates: [
      {
        id: "u1",
        title: "¡Comenzamos la construcción!",
        content:
          "Hoy iniciamos oficialmente la construcción del comedor escolar. Los niños están muy emocionados y las familias nos acompañan en este proceso.",
        date: "2025-06-01",
        imageUrl: "/construction-site-school-cafeteria.png",
        media: [
          {
            id: "m1",
            type: "photo",
            url: "/construction-site-school-cafeteria.png",
            caption: "Inicio de la construcción del comedor",
          },
          {
            id: "m2",
            type: "photo",
            url: "/excited-children-construction.png",
            caption: "Los niños observando el inicio de las obras",
          },
          {
            id: "m3",
            type: "photo",
            url: "/construction-video-thumbnail.png",
            caption: "Video del primer día de construcción",
          },
        ],
      },
      {
        id: "u2",
        title: "Cimientos completados - Hito 1 alcanzado",
        content:
          "¡Excelentes noticias! Terminamos la primera etapa según lo planificado. Los cimientos están sólidos y listos. Adjuntamos fotos del progreso como prueba del hito completado.",
        date: "2025-06-15",
        imageUrl: "/placeholder-2irmn.png",
        milestoneId: "m1",
        media: [
          {
            id: "m4",
            type: "photo",
            url: "/completed-concrete-foundation.png",
            caption: "Cimientos completados y curados",
          },
          {
            id: "m5",
            type: "photo",
            url: "/foundation-measurements-verification.png",
            caption: "Verificación de medidas y calidad",
          },
          {
            id: "m6",
            type: "photo",
            url: "/foundation-inspection.png",
            caption: "Inspección técnica de los cimientos",
          },
        ],
      },
    ],
    imageUrl: "/school-cafeteria-construction-argentina.png",
    organizationName: "Fundación Futuro Salta",
    verified: true,
    donorsCount: 127,
    daysLeft: 89,
  },
  {
    id: "2",
    name: "Biblioteca Comunitaria Quilmes",
    description: "Creación de una biblioteca comunitaria con acceso a internet y programas de alfabetización",
    problemSolved: "Falta de acceso a educación y tecnología en barrios periféricos",
    category: "Educación y Tecnología",
    currentAmount: 12300,
    targetAmount: 25000,
    deadline: "2025-11-30",
    location: {
      city: "Quilmes",
      province: "Buenos Aires",
      coordinates: [-58.2543, -34.7203],
    },
    milestones: [
      {
        id: "m1",
        title: "Acondicionamiento del local",
        description: "Reparación y pintura del espacio destinado a biblioteca",
        targetAmount: 8000,
        currentAmount: 8000,
        completed: true,
        completedDate: "2025-05-20",
        percentage: 100,
      },
      {
        id: "m2",
        title: "Mobiliario y estanterías",
        description: "Compra e instalación de estanterías, mesas y sillas",
        targetAmount: 7000,
        currentAmount: 4300,
        completed: false,
        percentage: 61,
      },
      {
        id: "m3",
        title: "Equipos tecnológicos",
        description: "Computadoras, tablets y conexión a internet",
        targetAmount: 10000,
        currentAmount: 0,
        completed: false,
        percentage: 0,
      },
    ],
    updates: [
      {
        id: "u1",
        title: "Local renovado y listo - Hito 1 completado",
        content:
          "El espacio ya está completamente renovado. Las paredes lucen hermosas y el ambiente es perfecto para el aprendizaje. Compartimos el antes y después.",
        date: "2025-05-20",
        imageUrl: "/renovated-argentina-library.png",
        milestoneId: "m1",
        media: [
          {
            id: "m7",
            type: "photo",
            url: "/pre-renovation-library.png",
            caption: "Estado inicial del local",
          },
          {
            id: "m8",
            type: "photo",
            url: "/renovated-argentina-library.png",
            caption: "Local completamente renovado",
          },
          {
            id: "m9",
            type: "photo",
            url: "/library-reading-area.png",
            caption: "Área de lectura preparada",
          },
        ],
      },
    ],
    imageUrl: "/community-library-buenos-aires.png",
    organizationName: "Red de Bibliotecas Populares",
    verified: true,
    donorsCount: 89,
    daysLeft: 134,
  },
  {
    id: "3",
    name: "Huerta Urbana Sustentable",
    description: "Implementación de huertas urbanas en escuelas de Córdoba para educación ambiental",
    problemSolved: "Falta de conciencia ambiental y acceso a alimentos frescos",
    category: "Medio Ambiente",
    currentAmount: 8750,
    targetAmount: 15000,
    deadline: "2025-10-15",
    location: {
      city: "Córdoba",
      province: "Córdoba",
      coordinates: [-64.181, -31.4201],
    },
    milestones: [
      {
        id: "m1",
        title: "Diseño y planificación",
        description: "Diseño de las huertas y planificación pedagógica",
        targetAmount: 3000,
        currentAmount: 3000,
        completed: true,
        completedDate: "2025-04-10",
        percentage: 100,
      },
      {
        id: "m2",
        title: "Materiales y herramientas",
        description: "Compra de semillas, tierra, herramientas y sistemas de riego",
        targetAmount: 7000,
        currentAmount: 5750,
        completed: false,
        percentage: 82,
      },
      {
        id: "m3",
        title: "Implementación y capacitación",
        description: "Instalación de huertas y capacitación a docentes",
        targetAmount: 5000,
        currentAmount: 0,
        completed: false,
        percentage: 0,
      },
    ],
    updates: [
      {
        id: "u1",
        title: "Diseños aprobados y materiales adquiridos",
        content:
          "Los directivos y docentes aprobaron los diseños. Ya compramos las primeras semillas y herramientas. ¡Estamos listos para comenzar la implementación!",
        date: "2025-04-10",
        imageUrl: "/urban-garden-school-argentina.png",
        milestoneId: "m1",
        media: [
          {
            id: "m10",
            type: "photo",
            url: "/urban-garden-school-argentina.png",
            caption: "Planos aprobados de la huerta",
          },
          {
            id: "m11",
            type: "photo",
            url: "/urban-garden-school-cordoba.png",
            caption: "Semillas y herramientas adquiridas",
          },
          {
            id: "m12",
            type: "photo",
            url: "/school-meeting-video.png",
            caption: "Reunión con docentes y directivos",
          },
        ],
      },
    ],
    imageUrl: "/urban-garden-school-cordoba.png",
    organizationName: "EcoEducar Córdoba",
    verified: true,
    donorsCount: 64,
    daysLeft: 67,
  },
]

export const mockCompanyStats: CompanyStats = {
  totalDonated: 45600,
  projectsSupported: 8,
  taxDeductions: 13680, // 30% of total donated
  impactMetrics: {
    peopleHelped: 1250,
    communitiesReached: 12,
    sdgGoals: ["Educación de Calidad", "Fin de la Pobreza", "Acción por el Clima"],
  },
}

export const mockCompanyDonations: CompanyDonation[] = [
  {
    id: "d1",
    projectId: "1",
    amount: 15000,
    date: "2025-06-01",
    taxDeductible: true,
  },
  {
    id: "d2",
    projectId: "2",
    amount: 12000,
    date: "2025-05-15",
    taxDeductible: true,
  },
  {
    id: "d3",
    projectId: "3",
    amount: 8500,
    date: "2025-04-20",
    taxDeductible: true,
  },
]
