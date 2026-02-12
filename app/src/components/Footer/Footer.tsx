export function Footer() {
  return (
    <footer className="bg-[#2E3B2B] text-white w-full font-sans">
      {/* Main Content */}
      <div className="px-8 md:px-12 pt-10 pb-8 w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/assets/Logomor.svg"
            alt="Morelos - La tierra que nos une"
            className="h-12 w-auto brightness-0 invert"
          />
        </div>

        <div className="space-y-10">
          {/* Servicio de atención ciudadana */}
          <section>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-white">
              Servicio de atención ciudadana
            </h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>Horario: lunes a viernes de 9:00 AM a 2:00 PM</p>
              <p>
                <a href="tel:7773292200" className="hover:text-white transition-colors underline decoration-white/30">
                  (777) 329 2200
                </a>
              </p>
              <p>
                <a
                  href="mailto:atencionciudadana@morelos.gob.mx"
                  className="hover:text-white transition-colors underline decoration-white/30"
                >
                  atencionciudadana@morelos.gob.mx
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-white transition-colors underline decoration-white/30">
                  Buscador de oficinas
                </a>
              </p>
            </div>
          </section>

          {/* Ubicación */}
          <section>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-white">
              Ubicación
            </h3>
            <div className="space-y-1 text-sm text-white/80">
              <p>Palacio de Gobierno 2do. Piso</p>
              <p>Plaza de Armas S/N, Colonia Centro, Cuernavaca, Morelos.</p>
              <p>C.P. 62000</p>
            </div>
          </section>

          {/* Nuestras redes */}
          <section>
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-white">
              Nuestras redes
            </h3>
            <div className="flex items-center gap-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/GobiernoEstadodeMorelos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/gobiernomorelos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://x.com/margarita_gs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="X"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@MargaritaGonzalezSaravia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </section>

          {/* Enlaces de interés */}
          <section className="pb-4 text-left">
            <h3 className="text-sm font-bold mb-5 uppercase tracking-wider text-white">
              Enlaces de interés
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="https://www.morelos.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Gobierno</a>
              <a href="https://www.morelos.gob.mx/noticias" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Prensa</a>
              <a href="https://www.morelos.gob.mx/inicio/secretaria-de-desarrollo-economico-y-del-trabajo" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Economía</a>
              <a href="https://www.morelos.gob.mx/inicio/secretaria-de-bienestar" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Bienestar</a>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Links Bar */}
      <div className="border-t border-white/10 bg-black/10 w-full">
        <div className="px-8 md:px-12 py-6">
          <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-3 text-[11px] uppercase tracking-widest text-white/50 font-medium">
            <a href="https://www.morelos.gob.mx/convocatorias-secretarias/nuevo-codigo-de-etica" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Código de ética</a>
            <a href="https://www.morelos.gob.mx/tramites-y-servicios" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portal de trámites y atención ciudadana</a>
            <a href="https://www.morelos.gob.mx/aviso-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aviso de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
