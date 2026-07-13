import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

    // Cores do Pet Shop (Azul Ciano, Amarelo Mel, Arredondados)
    root.style.setProperty('--p-50', '#ecfeff'); // Azul Ciano Suave
    root.style.setProperty('--p-100', '#cffafe');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Azul Ciano
    root.style.setProperty('--p-600', '#0891b2');
    root.style.setProperty('--p-700', '#0e7490');
    root.style.setProperty('--p-800', '#155e75');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Amarelo/Laranja Mel

    document.title = `${storeData.name} — Carinho & Saúde Pet`;
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

  // Mensagem para o WhatsApp contendo os detalhes do Banho e Tosa simulado
  const getCustomServiceOrderLink = () => {
    const text = `Olá! Gostaria de agendar o Banho e Tosa simulado no site:\n- Porte do Pet: ${petSize}\n- Tipo de Pelo: ${furType}\n- Serviços Extras: ${selectedExtras.join(', ') || 'Nenhum'}\n- Valor Estimado: R$ ${calculateTotal().toFixed(2)}\nFavor confirmar data e hora disponíveis.`;
    return getWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-cyan-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="p-2 bg-cyan-500 text-white rounded-2xl">
                <Icon name="Activity" size={20} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
                Pet<span className="text-cyan-600 font-extrabold">Saúde</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#simulador" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Simulador Banho & Tosa</a>
              <a href="#servicos" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Serviços</a>
              <a href="#produtos" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Produtos</a>
              <a href="#localizacao" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Contato</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all hover:scale-105 shadow-md shadow-cyan-500/10">
                <Icon name="Phone" className="mr-2" size={16} /> Agendar Táxi Pet
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-gradient-to-br from-cyan-50/60 via-white to-amber-50/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
                🐾 O Seu Pet em Boas Mãos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Todo carinho e atenção que o <span className="text-cyan-500 block">seu melhor amigo merece!</span>
              </h1>
              <p className="text-lg text-slate-600 font-light max-w-xl mx-auto lg:mx-0">
                {storeData.description} Consultas veterinárias, banho e tosa profissional com produtos hipoalergênicos e táxi dog exclusivo na Prudente de Morais.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/20 transition-all hover:scale-105">
                  <Icon name="Phone" className="mr-2" size={20} /> Agendar Banho/Consulta
                </a>
                <a href="#simulador" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all">
                  🐾 Calcular Preço de Tosa
                </a>
              </div>
            </div>

            {/* Imagem do Pet Fofo */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 rounded-[40px] bg-cyan-500/10 transform rotate-3 scale-102 filter blur-sm"></div>
                <div className="relative bg-white p-4 rounded-[36px] border border-slate-100 shadow-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" alt="Cãozinho Feliz" className="w-full h-80 object-cover rounded-[28px]" />
                  <div className="absolute top-8 right-8 bg-amber-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md uppercase tracking-wider animate-bounce">
                    Táxi Pet Ativo
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SIMULADOR DE PREÇO BANHO & TOSA */}
      <section id="simulador" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Simulador de <span className="text-cyan-500">Banho & Tosa</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">
              Monte os serviços estéticos para o seu cãozinho ou gatinho e obtenha um orçamento estimado em segundos de forma interativa.
            </p>
          </div>

          <div className="bg-cyan-50/30 rounded-[32px] border border-cyan-100/50 p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Opções de Simulação */}
              <div className="space-y-6 text-left">
                <h3 className="text-xl font-bold text-slate-800">Escolha os detalhes do seu Pet:</h3>
                
                {/* Porte */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Porte do Animal:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Pequeno', 'Médio', 'Grande'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setPetSize(size)}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                          petSize === size
                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-500'
                        }`}
                      >
                        {size === 'Pequeno' ? 'P (Até 10kg)' : size === 'Médio' ? 'M (10-25kg)' : 'G (Acima 25kg)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipo de Pelo */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Comprimento do Pelo:</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Curto', 'Longo'].map((fur) => (
                      <button
                        key={fur}
                        onClick={() => setFurType(fur)}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                          furType === fur
                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-500'
                        }`}
                      >
                        Pelo {fur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Opcionais Extra:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(extrasPrices).map((extra) => (
                      <button
                        key={extra}
                        onClick={() => handleToggleExtra(extra)}
                        className={`py-2 px-3 rounded-lg border text-[10px] font-bold uppercase transition-all flex items-center justify-between ${
                          selectedExtras.includes(extra)
                            ? 'bg-cyan-500 text-white border-cyan-500'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-500'
                        }`}
                      >
                        <span>{extra}</span>
                        <span className="ml-1 text-slate-400">
                          +R$ {extrasPrices[extra].toFixed(0)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Resultado Resumo */}
              <div className="bg-white p-8 rounded-2xl border border-slate-250/60 shadow-inner flex flex-col justify-between min-h-[300px]">
                <div className="text-center space-y-4">
                  <div className="p-3 bg-cyan-500/10 rounded-full inline-block text-cyan-600 mb-2">
                    <Icon name="Award" size={32} />
                  </div>
                  <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Orçamento Estimado</h4>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400">Valor Total Estimado:</p>
                    <p className="text-4xl font-extrabold text-cyan-600">R$ {calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl inline-block border border-slate-100 text-left w-full text-xs text-slate-500">
                    <p>Porte: <strong>{petSize}</strong> (+ R$ {sizePrices[petSize].toFixed(0)})</p>
                    <p>Pelo: <strong>{furType}</strong> (+ R$ {furPrices[furType].toFixed(0)})</p>
                    <p>Extras: <strong>{selectedExtras.join(', ') || 'Nenhum'}</strong></p>
                  </div>
                </div>

                <a href={getCustomServiceOrderLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-all shadow-md">
                  Agendar este Serviço
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS / SERVIÇOS */}
      <section id="servicos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Nossos Serviços <span className="text-cyan-500">Especializados</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">Cuidado veterinário e serviços de estética de primeiro mundo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-lg transition-all duration-300 group text-center">
                <div className="p-3 bg-cyan-500/10 text-cyan-600 rounded-full inline-block mb-4 transition-transform group-hover:scale-110">
                  <Icon name={feature.iconName} size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section id="produtos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Pet Shop <span className="text-cyan-500">Destaques</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">Rações premium, acessórios especiais e brinquedos seguros para o seu pet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-650 bg-cyan-500/10 text-cyan-800 px-3 py-1 rounded-full">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de pedir o produto: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all">
                      Pedir
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLÍNICA (SOBRE NÓS) */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-slate-100 bg-[#0e7490] p-2">
                <img src={storeData.aboutImage} alt="Clínica Veterinária Pet Saúde" className="w-full h-[400px] object-cover rounded-[28px]" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-500/10 px-3 py-1 rounded-full">Clínica Veterinária 24h</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Estrutura de diagnóstico moderna e <span className="text-cyan-500 block mt-1">atendimento humanizado</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-light">
                {storeData.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-150">
                  <Icon name="Activity" className="text-cyan-500" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Exames Rápidos</h4>
                    <p className="text-[10px] text-slate-400">Laboratório próprio de análises clínicas.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-150">
                  <Icon name="Award" className="text-cyan-500" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">Veterinários 24h</h4>
                    <p className="text-[10px] text-slate-400">Pronto atendimento médico emergencial.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Visite Nossa Sede</h2>
            <p className="text-slate-500 text-lg font-light">Localizado em Lagoa Nova com fácil acesso e estacionamento gratuito.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-600">Pet Info</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100">
                      <Icon name="MapPin" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Endereço</h4>
                      <p className="text-xs text-slate-500 mt-1">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100">
                      <Icon name="Phone" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Telefone</h4>
                      <p className="text-xs text-slate-500 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100">
                      <Icon name="Clock" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Horários</h4>
                      <div className="text-xs text-slate-500 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all shadow-md">
                  Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-full transition-all">
                  Rotas Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full rounded-2xl border-0" allowFullScreen={false} loading="lazy" title="Localização Pet Saúde"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Pet<span className="text-cyan-500">Saúde</span>
              </span>
              <p className="text-xs text-slate-550 max-w-sm mx-auto md:mx-0">
                © {new Date().getFullYear()} Pet Saúde Natal. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-xs text-slate-550">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
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
