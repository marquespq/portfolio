import type { en } from "./en";

export const pt: typeof en = {
  meta: {
    title: "Gabriel Borba Marques — Engenheiro de Software Full Stack",
    description:
      "Engenheiro de Software Full Stack especialista em Desenvolvimento Orientado por IA. 6+ anos construindo produtos digitais rápidos e escaláveis de ponta a ponta.",
  },
  preloader: "Gabriel Borba Marques — Portfólio ©2026",
  nav: {
    links: [
      { label: "Sobre", href: "#about" },
      { label: "Especialidades", href: "#expertise" },
      { label: "Trabalhos", href: "#work" },
      { label: "Experiência", href: "#experience" },
      { label: "Contato", href: "#contact" },
    ],
    menu: "Menu",
    close: "Fechar",
    logoAria: "Voltar ao topo",
  },
  hero: {
    role: "Engenheiro de Software Full Stack — Desenvolvimento Orientado por IA",
    tagline:
      "Construo produtos digitais rápidos e escaláveis de ponta a ponta — combinando visão de produto, arquitetura de software e IA generativa.",
    location: "Baseado no Brasil — Trabalhando para o mundo",
    scroll: "( Role )",
  },
  about: {
    eyebrow: "Sobre",
    title: "Engenharia de produtos, de ponta a ponta",
    paragraph:
      "Sou Gabriel — Engenheiro de Software Full Stack com mais de 6 anos de experiência transformando problemas complexos em produtos digitais rápidos e escaláveis. Especialista em Desenvolvimento Orientado por IA, combino IA generativa, arquitetura de software e engenharia de produto para acelerar entregas sem comprometer qualidade, performance ou escalabilidade. De fintechs e plataformas SaaS a automação de processos, sistemas corporativos e analytics — eu projeto, construo e entrego, de ponta a ponta.",
    pillars: [
      {
        index: "01",
        title: "Visão de Produto",
        description:
          "Código é meio, não fim. Toda decisão técnica parte do problema que ela resolve para o negócio e para o usuário.",
      },
      {
        index: "02",
        title: "Arquitetura de Software",
        description:
          "Sistemas projetados para evoluir — fronteiras claras, os trade-offs certos e complexidade apenas onde ela se paga.",
      },
      {
        index: "03",
        title: "Liderança Técnica",
        description:
          "Liderar entregando: desbloquear times, elevar a barra de qualidade e transformar objetivos ambíguos em entrega concreta.",
      },
      {
        index: "04",
        title: "Entrega Acelerada por IA",
        description:
          "IA como multiplicador de força — agentes e fluxos com LLMs embutidos no processo para ir mais rápido sem quebrar nada.",
      },
    ],
  },
  expertise: {
    eyebrow: "02 / Especialidades",
    title: "Seis disciplinas, um objetivo",
    keepScrolling: "( Continue rolando )",
    items: [
      {
        index: "01",
        title: "Engenharia Frontend",
        description:
          "Interfaces que parecem instantâneas. Arquitetura orientada a componentes, motion design e cuidado a nível de pixel — feitas para rodar a 60fps.",
        tags: ["React", "Next.js", "TypeScript", "Design Systems", "GSAP"],
      },
      {
        index: "02",
        title: "Engenharia Backend",
        description:
          "APIs e serviços projetados para durar — domínios bem delimitados, integrações resilientes e comportamento previsível sob carga.",
        tags: ["Node.js", "NestJS", "Python", "REST", "GraphQL"],
      },
      {
        index: "03",
        title: "Arquitetura de Sistemas",
        description:
          "De um monólito enxuto a serviços orientados a eventos — escolhendo a arquitetura mais simples que escala com o produto, e não contra ele.",
        tags: ["DDD", "Event-Driven", "Microsserviços", "Cloud-Native", "AWS"],
      },
      {
        index: "04",
        title: "Desenvolvimento Orientado por IA",
        description:
          "Vibe coding com rigor de engenharia. Agentes de IA e fluxos com LLMs integrados ao ciclo de entrega para acelerar sem perder qualidade.",
        tags: ["Integração de LLMs", "Agentes de IA", "RAG", "Prompt Engineering", "Copilot Workflows"],
      },
      {
        index: "05",
        title: "Performance & Escalabilidade",
        description:
          "Backends de baixa latência e frontends que nunca perdem um frame. Cache, filas, profiling e observabilidade como cidadãos de primeira classe.",
        tags: ["Cache", "Filas", "Observabilidade", "Testes de Carga", "Web Vitals"],
      },
      {
        index: "06",
        title: "Engenharia de Produto",
        description:
          "Além dos tickets: entender o negócio, moldar o produto e ser dono dos resultados da discovery à produção.",
        tags: ["Discovery", "Pensamento UX", "Métricas", "Ownership de Ponta a Ponta"],
      },
    ],
  },
  work: {
    eyebrow: "Trabalhos Selecionados",
    title: "Problemas que valem a pena resolver",
    nda: "Cliente sob NDA — detalhes compartilhados sob demanda",
    view: "Ver",
    projects: [
      {
        index: "01",
        codename: "Evertec Core",
        title: "Internet Banking White-Label",
        category: "Fintech",
        year: "2024",
        description:
          "Um core fintech altamente seguro e modular, projetado para alto throughput. Construído com uma camada BFF em FastAPI (Python) e um frontend React otimizado para entregar serviços financeiros escaláveis.",
        impact:
          "Arquitetura robusta e pronta para auditoria, atendendo instituições financeiras multi-tenant com tolerância zero a downtime.",
        tags: ["React", "FastAPI", "Python", "Arquitetura BFF", "PostgreSQL"],
        gradient: "from-emerald-950 via-teal-900 to-emerald-800",
      },
      {
        index: "02",
        codename: "Sicredi & Capitalizo",
        title: "Suíte de Análise & Inteligência",
        category: "Data Viz / Finanças",
        year: "2023",
        description:
          "Dashboards analíticos de alta performance e suítes de investimento. Foco em consultas sub-segundo sobre milhões de registros e experiência fluida para a tomada de decisão financeira.",
        impact:
          "Migração bem-sucedida de sistemas legados para infraestruturas React modernas, reduzindo drasticamente o trabalho manual de relatórios.",
        tags: ["React", "Node.js", "Spring Boot", "PostgreSQL", "Visualização de Dados"],
        gradient: "from-indigo-950 via-violet-900 to-indigo-800",
      },
      {
        index: "03",
        codename: "QA Copilot",
        title: "Motor Inteligente de Automação de QA",
        category: "IA / Operações",
        year: "2025",
        description:
          "Um assistente interno baseado em LLM para times de engenharia e qualidade. Usa prompt engineering avançado para ler requisitos corporativos e gerar automaticamente cenários de teste complexos.",
        impact:
          "Aceleração do ciclo de desenvolvimento (SDLC) ao automatizar fluxos repetitivos de documentação e desenho de testes.",
        tags: ["Prompt Engineering", "Dev Assistido por IA", "Integração de LLMs", "React", "Node.js"],
        gradient: "from-amber-950 via-orange-900 to-amber-800",
      },
      {
        index: "04",
        codename: "LowCost SGO",
        title: "Núcleo ERP & Inventário Corporativo",
        category: "Sistemas Corporativos",
        year: "2026",
        description:
          "A espinha dorsal digital de um sistema de gestão de operações (SGO) de locação de hardware em larga escala, orquestrando rastreamento de inventário ao vivo, validação de hardware e faturamento automatizado.",
        impact:
          "Fluxos legados reconstruídos em um sistema interconectado e de alta disponibilidade, garantindo consistência em tempo real na gestão de ativos.",
        tags: ["React", "Node.js", "TypeScript", "Docker", "APIs REST"],
        gradient: "from-sky-950 via-blue-900 to-sky-800",
      },
    ],
  },
  experience: {
    eyebrow: "Experiência",
    title: "6+ anos entregando produtos",
    entries: [
      {
        period: "2021 — Presente",
        role: "Engenheiro Full Stack",
        org: "Consultoria de Software",
        description:
          "Liderando squads e entregas para clientes enterprise. Difundindo práticas de desenvolvimento assistido por IA entre os times — aumentando a velocidade sem abrir mão de arquitetura e qualidade de código.",
      },
    ],
  },
  stack: {
    eyebrow: "05 / Stack",
    title: "Ferramentas do ofício",
    rows: [
      ["React", "Next.js", "TypeScript", "Node.js", "NestJS"],
      ["Python", "PostgreSQL", "MongoDB", "Docker", "AWS"],
      ["IA Generativa", "Agentes LLM", "GraphQL", "Redis", "CI/CD"],
    ],
  },
  contact: {
    eyebrow: "06 / Contato",
    title1: "Vamos construir",
    titleOutline: "algo",
    title2: "incrível",
    cta: "Diga olá",
    copyright: "© 2026 Gabriel Borba Marques — Feito com React, GSAP & Three.js",
    backToTop: "Voltar ao topo ↑",
  },
};
