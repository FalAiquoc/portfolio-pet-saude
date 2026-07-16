import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo Vetorial Personalizado (Patinha estilizada com cruz de cuidado veterinário interna e anel de proteção)
function Logo({ className = "h-10", dark = false }: { className?: string; dark?: boolean }) {
  const primaryColor = '#06b6d4'; // Ciano
  const accentColor = '#fbbf24';  // Amarelo
  const textColor = dark ? '#0F172A' : '#FFFFFF';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <svg className="h-full aspect-square overflow-visible" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke={primaryColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {/* Patinha com cruz médica */}
          <circle cx="100" cy="115" r="50" strokeWidth="14" />
          {/* Dedos da pata */}
          <circle cx="60" cy="55" r="16" fill={primaryColor} stroke="none" />
          <circle cx="100" cy="35" r="18" fill={primaryColor} stroke="none" />
          <circle cx="140" cy="55" r="16" fill={primaryColor} stroke="none" />
          {/* Cruz Veterinária interna */}
          <path d="M 100 95 L 100 135" stroke={accentColor} strokeWidth="10" />
          <path d="M 80 115 L 120 115" stroke={accentColor} strokeWidth="10" />
        </g>
      </svg>
      <div className="flex flex-col leading-[0.9] text-left font-display">
        <span className="text-xl font-black tracking-tight uppercase" style={{ color: textColor }}>PET</span>
        <span className="text-[14px] font-black tracking-[0.25em]" style={{ color: primaryColor }}>SAÚDE</span>
        <span className="text-[8px] font-bold tracking-[0.1em] text-slate-400">Veterinária & Estética</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Estados para o Simulador de Banho e Tosa
  const [petSize, setPetSize] = useState<string>('Pequeno');
  const [furType, setFurType] = useState<string>('Curto');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Tabela de Preços do Pet Shop
  const sizePrices: Record<string, number> = { Pequeno: 50.00, Médio: 70.00, Grande: 90.00 };
  const furPrices: Record<string, number> = { Curto: 0.00, Longo: 15.00 };
  const extrasPrices: Record<string, number> = {
    'Tosa Higiênica': 15.00,
    'Hidratação de Pelos': 20.00,
    'Corte de Unhas': 10.00,
    'Limpeza de Ouvidos': 10.00
  };

  // Cálculo de Preço Estimado
  const calculateTotal = () => {
    let total = (sizePrices[petSize] || 50.00) + (furPrices[furType] || 0.00);
    selectedExtras.forEach(extra => {
      total += extrasPrices[extra] || 0;
    });
    return total;
  };

  const handleToggleExtra = (extra: string) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter(item => item !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  // Injeção de fontes e cores
  useEffect(() => {
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Cores do Pet Shop
    root.style.setProperty('--p-50', '#ecfeff');
    root.style.setProperty('--p-100', '#cffafe');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Ciano
    root.style.setProperty('--p-600', '#0891b2');
    root.style.setProperty('--p-700', '#0e7490');
    root.style.setProperty('--p-800', '#155e75');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Amarelo Mel

    document.title = `${storeData.name} — Cuidado Completo e Carinho Pet`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  const getCustomServiceOrderLink = () => {
    const text = `Olá! Gostaria de agendar o Banho e Tosa simulado no site:\n- Porte do Pet: ${petSize}\n- Tipo de Pelo: ${furType}\n- Serviços Extras: ${selectedExtras.join(', ') || 'Nenhum'}\n- Valor Estimado: R$ ${calculateTotal().toFixed(2)}\nFavor confirmar data e hora disponíveis.`;
    return getWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 antialiased selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* LETREIRO MARQUEE DESLIZANTE DE INFORMAÇÕES DO PET SHOP */}
      <div className="bg-[#06b6d4] text-white text-[10px] font-black uppercase tracking-widest py-2.5 overflow-hidden relative z-50 border-b border-white/10">
        <div className="whitespace-nowrap flex space-x-12 animate-marquee">
          <span>🐶 TÁXI DOG DISPONÍVEL PARA BUSCAR E LEVAR SEU PET EM LAGOA NOVA COM TOTAL CONFORTO!</span>
          <span>🐾 PROGRAMA DE VACINAÇÃO ÉTICA IMPORTADA COM ATENDIMENTO CLINICO COMPLETO!</span>
          <span>🛁 BANHO E TOSA REALIZADOS COM PRODUTOS HIP OALERGÊNICOS IMPORTADOS DA ITÁLIA!</span>
          <span>🐶 TÁXI DOG DISPONÍVEL PARA BUSCAR E LEVAR SEU PET EM LAGOA NOVA COM TOTAL CONFORTO!</span>
        </div>
      </div>

      {/* TOPBAR */}
      <div className="bg-stone-900 text-stone-405 text-xs py-2 border-b border-stone-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#06b6d4]" /> (84) 3300-4444</span>
            <span className="flex items-center gap-1.5"><Icon name="Activity" size={13} className="text-[#06b6d4]" /> Responsável Técnico: CRMV/RN 2984</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#06b6d4]" /> Lagoa Nova, Natal</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#simulador" className="hover:text-white transition-colors font-bold text-stone-300">Simulador Estética</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-stone-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-lg py-2 border-b border-cyan-50' : 'top-0 sm:top-18 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" />
            </a>
            
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-slate-700">
              <a href="#simulador" className="hover:text-[#06b6d4] transition-colors">Simulador de Tosa</a>
              <a href="#servicos" className="hover:text-[#06b6d4] transition-colors">Clínica Veterinária</a>
              <a href="#produtos" className="hover:text-[#06b6d4] transition-colors">Pet Shop</a>
              <a href="#sobre" className="hover:text-[#06b6d4] transition-colors">Infraestrutura</a>
              <a href="#localizacao" className="hover:text-[#06b6d4] transition-colors">Contato</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-[#06b6d4] hover:bg-cyan-600 transition-all shadow-md shadow-cyan-500/20">
                <Icon name="Phone" className="mr-2" size={14} /> WhatsApp Táxi Dog
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#06b6d4] hover:bg-stone-100 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-t border-stone-850 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-300 text-sm font-semibold">
            <a href="#simulador" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#06b6d4]">🛁 Simulador de Tosa</a>
            <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#06b6d4]">🩺 Clínica Veterinária</a>
            <a href="#produtos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#06b6d4]">🛍️ Pet Shop & Ração</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#06b6d4]">🐾 Nosso Espaço</a>
            <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#06b6d4]">📍 Contato</a>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#06b6d4] hover:bg-cyan-600">
              <Icon name="Phone" className="mr-2" size={16} /> WhatsApp Atendimento
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - Premium Playful Pet Care Layout */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-56 md:pb-36 bg-gradient-to-br from-cyan-50/50 via-white to-[#FAF9F6] overflow-hidden border-b-4 border-[#06b6d4]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[400px] h-[400px] rounded-full bg-[#fbbf24] filter blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] rounded-full bg-[#06b6d4] filter blur-[160px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black tracking-widest uppercase border border-[#06b6d4]/50 bg-[#06b6d4]/10 text-[#06b6d4]">
                🐾 ATENDIMENTO VETERINÁRIO DE EXCELÊNCIA EM NATAL
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.95] text-slate-900 uppercase">
                Cuidado completo, <br />
                <span className="text-[#06b6d4] italic font-light lowercase">carinho de verdade.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {storeData.description} Contamos com salas climatizadas, banho e tosa profissional com cromoterapia e táxi pet exclusivo para sua comodidade.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href={getWhatsAppLink('Olá! Gostaria de agendar banho e tosa ou uma consulta com o veterinário.')} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-[#06b6d4] hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30">
                  <Icon name="Phone" className="mr-2" size={16} /> Agendar Banho / Consulta
                </a>
                <a href="#simulador" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-700 border border-slate-300 hover:border-slate-850 hover:bg-slate-50 transition-all">
                  <Icon name="Activity" className="mr-2" size={16} /> Simular Preço de Tosa
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#06b6d4]/40 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-white p-3 border border-slate-200 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Atendimento clínico de cachorro no veterinário" 
                    className="w-full h-[400px] object-cover filter brightness-[0.98]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-slate-900/95 backdrop-blur-sm border-l-4 border-[#06b6d4] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#06b6d4] font-black">Cromoterapia Pet</p>
                    <p className="text-xs text-stone-300 font-light mt-0.5">Estética relaxante sem estresse</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS PARCEIRAS / LABORATORIOS VET */}
      <section className="py-10 bg-stone-950 border-y border-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-500 font-bold mb-6">Vacinas e Rações de Confiança</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {storeData.brands?.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-wider text-slate-350 font-semibold italic border-b border-cyan-500/20 pb-1 group-hover:text-[#06b6d4] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS DE CUIDADO PET */}
      <section className="py-8 bg-stone-900 border-b border-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-cyan-500/10 text-[#06b6d4] rounded-none border border-cyan-500/20">
                <Icon name="Activity" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">CRMV Registrado</h4>
              <p className="text-[10px] text-stone-400">Responsabilidade e ética profissional em todas as consultas.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-cyan-500/10 text-[#06b6d4] rounded-none border border-cyan-500/20">
                <Icon name="Scissors" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Estética Completa</h4>
              <p className="text-[10px] text-stone-400">Banhos, hidratação de pelagem e tosa artística na tesoura.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-cyan-500/10 text-[#06b6d4] rounded-none border border-cyan-500/20">
                <Icon name="Pill" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Farmácia Vet</h4>
              <p className="text-[10px] text-stone-400">Linha completa de antibióticos, antiparasitários e vermífugos.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-cyan-500/10 text-[#06b6d4] rounded-none border border-cyan-500/20">
                <Icon name="Truck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Táxi Dog Rápido</h4>
              <p className="text-[10px] text-stone-400">Buscamos e levamos seu amiguinho com caixas de transporte seguras.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-cyan-500/10 text-[#06b6d4] rounded-none border border-cyan-500/20">
                <Icon name="ShieldCheck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Cuidado Humanizado</h4>
              <p className="text-[10px] text-stone-400">Atendimento calmo respeitando os limites físicos de cada animal.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULADOR DE PREÇOS BANHO & TOSA INTERATIVO */}
      <section id="simulador" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Estética Pet</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Simulador de <span className="text-[#06b6d4] italic font-light lowercase">banho e tosa</span>
            </h2>
            <div className="w-16 h-1 bg-[#06b6d4] mx-auto"></div>
            <p className="text-slate-550 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Simule o valor estimado do atendimento estético escolhendo o porte do seu cãozinho e os serviços opcionais desejados.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-slate-200 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <h3 className="text-base font-display font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-3">Configure o Atendimento</h3>
                
                {/* Porte */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase">Porte do Pet:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Pequeno', 'Médio', 'Grande'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setPetSize(size)}
                        className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                          petSize === size
                            ? 'bg-[#06b6d4] text-white border-[#06b6d4] shadow-lg'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#06b6d4]'
                        }`}
                      >
                        {size === 'Pequeno' ? 'P (Até 10kg)' : size === 'Médio' ? 'M (10-25kg)' : 'G (Acima 25kg)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comprimento do Pelo */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase">Comprimento do Pelo:</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Curto', 'Longo'].map((fur) => (
                      <button
                        key={fur}
                        onClick={() => setFurType(fur)}
                        className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                          furType === fur
                            ? 'bg-[#06b6d4] text-white border-[#06b6d4] shadow-lg'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#06b6d4]'
                        }`}
                      >
                        Pelo {fur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opcionais Extras */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase">Serviços Opcionais Extras:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(extrasPrices).map((extra) => (
                      <button
                        key={extra}
                        onClick={() => handleToggleExtra(extra)}
                        className={`py-3 px-4 text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center justify-between ${
                          selectedExtras.includes(extra)
                            ? 'bg-[#06b6d4] text-white border-[#06b6d4]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#06b6d4]'
                        }`}
                      >
                        <span>{extra}</span>
                        <span className="text-[9px] text-[#06b6d4] bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/10">
                          +R$ {extrasPrices[extra]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-none border border-slate-200 shadow-xl min-h-[300px] flex flex-col justify-center space-y-6 text-center">
                <div className="p-3 bg-cyan-500/10 rounded-none inline-block text-[#06b6d4] border border-cyan-500/25 mx-auto">
                  <Icon name="Scissors" size={28} />
                </div>
                <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Orçamento Estético Estimado</h4>
                
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Total Simulado:</p>
                  <p className="text-4xl font-extrabold text-[#06b6d4]">R$ {calculateTotal().toFixed(2)}</p>
                </div>
                
                <div className="bg-[#FAF9F6] p-3 rounded-none border border-slate-200 text-xs text-slate-600">
                  Porte: <strong>{petSize}</strong> | Pelo: <strong>{furType}</strong>
                </div>
                
                <div className="pt-2">
                  <a 
                    href={getCustomServiceOrderLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#06b6d4] hover:text-cyan-700"
                  >
                    Agendar pelo WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE SERVIÇOS E PRODUTOS */}
      <section id="produtos" className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Atendimento e Conveniência</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              Serviços e <span className="text-[#06b6d4] italic font-light lowercase">Pet Shop</span>
            </h2>
            <div className="w-16 h-1 bg-[#06b6d4] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Clique nos botões de contato para agendar atendimentos ou solicitar entrega de rações e medicamentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-none overflow-hidden flex flex-col group hover:shadow-2xl hover:border-[#06b6d4]/50 transition-all duration-300 relative">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#06b6d4] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                    {product.tag}
                  </span>
                )}
                
                <div className="relative h-80 overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.98]" loading="lazy" />
                  <div className="absolute inset-0 bg-[#06b6d4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 border border-white">Pedir pelo WhatsApp</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-extrabold text-slate-900 uppercase tracking-wide line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-black text-[#06b6d4] bg-cyan-500/5 border border-cyan-500/20 px-3 py-1">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de agendar/pedir o item: ${product.name} (${product.price}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#06b6d4] hover:bg-cyan-600 transition-all border border-[#06b6d4]">
                      Agendar <Icon name="ChevronRight" className="ml-1" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: NOSSO ESPAÇO E CLINICA (WOW Factor) */}
      <section id="sobre" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-3 border-2 border-[#06b6d4]/20 transform -translate-x-2 translate-y-2 pointer-events-none"></div>
                <div className="relative bg-slate-900 p-2 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Centro veterinário e pet shop moderno Pet Saúde" 
                    className="w-full h-96 object-cover filter brightness-[0.95]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-[#06b6d4]/10 px-3 py-1 border border-[#06b6d4]/20">Centro Estético & Médico</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-tight uppercase">
                  Estrutura moderna para <span className="text-[#06b6d4] italic font-light lowercase">cuidado total</span>
                </h2>
              </div>
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light text-center lg:text-left">
                {storeData.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-5 bg-[#FAF9F6] border border-slate-200">
                  <span className="p-3 bg-[#06b6d4] text-white rounded-none">
                    <Icon name="Activity" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">Clínica Veterinária</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Exames rápidos e vacinação ética importada com registro em caderneta.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-5 bg-[#FAF9F6] border border-slate-200">
                  <span className="p-3 bg-[#06b6d4] text-white rounded-none">
                    <Icon name="Scissors" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">Estética Sem Estresse</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Utilizamos música relaxante e cabines de secagem ultrassilenciosas.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS DE TUTORES PET */}
      <section className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Tutores Felizes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">
              O que dizem os <span className="text-[#06b6d4] italic font-light lowercase">nossos clientes</span>
            </h2>
            <div className="w-16 h-1 bg-[#06b6d4] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Depoimento de quem confia a saúde e a higiene dos seus pets com a nossa equipe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-cyan-500 mb-4">
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Veterinária fantástica. Meu gato precisou de uma consulta de urgência e fomos atendidos na hora. Equipe carinhosa e muito bem preparada."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Beatriz Fontes" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Beatriz Fontes</h4>
                  <span className="text-[10px] text-slate-400">Tutora do Garfield - Tirol</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-cyan-500 mb-4">
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "Uso o táxi dog deles toda semana para o banho do meu Golden. Ele volta super cheiroso, de gravatinha e muito feliz. Confiança total na equipe!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Marcos Pimentel" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Marcos Pimentel</h4>
                  <span className="text-[10px] text-slate-400">Tutor do Hulk - Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-slate-200 relative">
              <div className="flex items-center space-x-1 text-cyan-500 mb-4">
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
                <Icon name="Star" size={16} className="fill-[#06b6d4] text-[#06b6d4]" />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic mb-6">
                "O simulador do site dá o preço certinho. Adicionei hidratação e tosa higiênica e gastei exatamente o estimado. Facilita muito o planejamento do mês."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Cláudia Viana" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Cláudia Viana</h4>
                  <span className="text-[10px] text-slate-400">Tutora da Mel - Capim Macio</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ INTERATIVO PET SHOP */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Perguntas Frequentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950 uppercase">
              Perguntas <span className="text-[#06b6d4] italic font-light lowercase">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#06b6d4] mx-auto"></div>
            <p className="text-slate-550 text-sm sm:text-base font-light">
              Esclareça dúvidas rápidas sobre táxi dog, vacinas e cuidados higiênicos pet.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como agendar o serviço de Táxi Dog?",
                a: "Você pode solicitar a busca e entrega do seu pet diretamente pelo nosso WhatsApp. Buscamos em Lagoa Nova e bairros vizinhos com caixas individuais higienizadas em carro climatizado."
              },
              {
                q: "Quais vacinas vocês aplicam no centro veterinário?",
                a: "Aplicamos vacinas importadas (éticas) como a V10 (quíntupla) e vacina contra raiva para cães, e as vacinas quádrupla/quíntupla felina (V4/V5) para gatos."
              },
              {
                q: "A tosa artística é feita na tesoura ou na máquina?",
                a: "Realizamos os dois tipos de tosa. Nossos profissionais são especialistas em tosa bebê, tosa higiênica e cortes específicos de raças na tesoura ou na máquina."
              },
              {
                q: "Vocês atendem emergências fora do horário comercial?",
                a: "Trabalhamos sob aviso prévio para emergências de pacientes cadastrados. Caso precise de assistência, entre em contato pelo nosso telefone celular de plantão divulgado no WhatsApp."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className="text-[#06b6d4]"
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Nossa Unidade</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase">Como nos Encontrar</h2>
            <div className="w-16 h-1 bg-[#06b6d4] mx-auto"></div>
            <p className="text-slate-500 text-sm sm:text-base font-light">
              Estamos situados no coração de Lagoa Nova com estacionamento privativo grátis e sala de espera climatizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-white p-8 rounded-none border border-slate-200 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-slate-900 uppercase tracking-wide">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF9F6] rounded-none text-stone-500 border border-slate-200">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Endereço da Clínica</h4>
                      <p className="text-xs text-slate-505 mt-1 leading-relaxed">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF9F6] rounded-none text-stone-500 border border-slate-200">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Telefone Central</h4>
                      <p className="text-xs text-slate-505 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#FAF9F6] rounded-none text-stone-500 border border-slate-200">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Horário de Atendimento</h4>
                      <div className="text-xs text-slate-505 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#06b6d4] hover:bg-cyan-600 transition-all">
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 bg-[#FAF9F6] border border-slate-200 hover:bg-slate-100 transition-all">
                  <Icon name="MapPin" className="mr-2 text-stone-500" size={16} /> Como Chegar (Google Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-none overflow-hidden border border-slate-200 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0" allowFullScreen={false} loading="lazy" title="Localização da Clínica Pet Saúde"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-450 py-16 border-t border-[#06b6d4]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Sobre o Centro</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossa Clínica</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de saber sobre vagas para médicos veterinários ou tosadores.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Serviços & Estética</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#simulador" className="hover:text-white transition-colors">Simulador de Banho & Tosa</a></li>
                <li><a href="#produtos" className="hover:text-white transition-colors">Produtos e Ração</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de saber sobre pacotes mensais de banho.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pacotes Mensais</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#06b6d4]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#06b6d4]" /> Facebook</a></li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Pagamento</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-stone-300">💳 Crédito</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">💵 Dinheiro</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">✍️ Convênios</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" />
              <p className="text-[10px] text-stone-500 font-light mt-2">
                © {new Date().getFullYear()} Pet Saúde – Lagoa Nova. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-stone-500 text-[9px] uppercase font-bold tracking-wider">
              <p>Clínica Veterinária e Pet Shop Lagoa Nova</p>
              <p>Médico Veterinário Responsável: Dra. Júlia Ramos - CRMV/RN 2984</p>
              <p>
                Desenvolvido por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors text-slate-400">
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
