import type { StoreData } from './types';

export const storeData: StoreData = {
  name: 'Pet Saúde',
  tagline: 'Cuidado completo, carinho e saúde para o seu melhor amigo em Lagoa Nova',
  description: 'Clínica veterinária, pet shop e banho e tosa especializado em Natal. Uma equipe apaixonada por animais dedicada a oferecer o melhor atendimento para cães e gatos.',
  aboutText: 'O Pet Saúde nasceu do amor incondicional pelos animais. Entendemos que os pets são membros valiosos da família e merecem um atendimento que alie alta competência técnica com carinho genuíno. Localizado em Lagoa Nova, nosso espaço conta com consultórios equipados, centro de estética pet de última geração para banho e tosa de alto padrão, e uma farmácia veterinária completa para garantir o bem-estar do seu companheiro.',
  aboutImage: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200',
  logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh393t39d8sD-y5D2t2e3v-9sE-e300992Lg&s',
  phone: '(84) 3300-4444',
  phoneFormatted: '8433004444',
  whatsappNumber: '558433004444',
  whatsappMessage: 'Olá! Gostaria de agendar um banho e tosa ou uma consulta veterinária para o meu pet.',
  address: 'Av. Capitão-Mor Gouveia, 3000 - Lagoa Nova, Natal - RN, 59063-400',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.176461937965!2d-35.2131976!3d-5.8159187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b301a2f64627d7%3A0xe54e6fa16b0b2306!2sAv.%20Capit%C3%A3o-Mor%20Gouveia%2C%203000%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN%2C%2059063-400!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr',
  googleMapsDirectionsUrl: 'https://maps.app.goo.gl/u1XvXQ5V9c7s6b6C11',
  businessHours: {
    weekdays: 'Segunda a Sexta: 08:00 às 20:00',
    saturday: 'Sábado: 08:00 às 18:00',
    sunday: 'Domingo: Fechado (Emergências sob aviso)',
  },
  colors: {
    primaryHex: '#06b6d4', // Ciano Limpo Pet
    accentHex: '#fbbf24',  // Amarelo Alegre Pet
  },
  typography: {
    displayFontFamily: 'Fredoka',
    bodyFontFamily: 'Nunito',
    importUrl: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@300;450;600;800&display=swap',
  },
  features: [
    {
      title: 'Estética Pet Premium',
      description: 'Banhos relaxantes e tosas profissionais com produtos importados e seguros.',
      iconName: 'Scissors',
    },
    {
      title: 'Clínica Especializada',
      description: 'Consultas, vacinas éticas e acompanhamento com veterinários dedicados.',
      iconName: 'HeartPulse',
    },
    {
      title: 'Farmácia Veterinária',
      description: 'Linha completa de medicamentos, rações premium e acessórios exclusivos.',
      iconName: 'Pill',
    },
  ],
  products: [
    {
      id: 'pet-1',
      name: 'Estética & Tosa Artística',
      description: 'Banho morno relaxante, higienização de ouvidos, corte de unhas e tosa na tesoura ou máquina com shampoo hipoalergênico premium.',
      price: 'R$ 60,00',
      iconName: 'Scissors',
      imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
      category: 'estetica',
      tag: 'Mais Procurado'
    },
    {
      id: 'pet-2',
      name: 'Vacinação Importada & Checkup',
      description: 'Consulta clínica preventiva completa combinada com a aplicação de vacinas éticas importadas (V10 e Antirrábica).',
      price: 'R$ 139,90',
      iconName: 'HeartPulse',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      category: 'clinica',
      tag: 'Cuidado Essencial'
    },
    {
      id: 'pet-3',
      name: 'Rações Super Premium & PetShop',
      description: 'Nutrição especializada das melhores marcas (Royal Canin, Premier), brinquedos interativos, coleiras ergonômicas e farmácia.',
      price: 'Preço de Atacado',
      iconName: 'ShoppingBag',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      category: 'petshop',
      tag: 'Melhor Preço'
    }
  ],
  instagramUrl: 'https://www.instagram.com',
  facebookUrl: 'https://www.facebook.com',
  brands: [
    { name: 'Royal Canin', desc: 'Nutrição clínica para cães e gatos' },
    { name: 'Premier Pet', desc: 'Alimentação super premium nacional' },
    { name: 'Zoetis', desc: 'Medicamentos e vacinas veterinárias' },
    { name: 'Bravecto', desc: 'Proteção eficaz contra pulgas e carrapatos' }
  ]
};
