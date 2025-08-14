import React from 'react';
import { Header } from '@/components/header'; // Import the Header component
import { Building2, Users, Rocket, ShieldCheck, DollarSign, Zap, Award, Lightbulb, Briefcase } from 'lucide-react'; // Import icons

const ComoFuncionaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-trace-alabaster">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-trace-earth">Cómo Funciona Trace</h1>

        {/* Sección: Cómo Funciona Trace */}
        <section className="mb-16 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-trace-forest flex items-center justify-center gap-3">
            <Rocket size={32} /> Nuestra Plataforma en Acción
          </h2>
          <p className="text-lg text-trace-earth text-center mb-8">
            Trace conecta proyectos de impacto social con el financiamiento necesario, garantizando transparencia y seguimiento en cada paso.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Para Empresas */}
            <div className="flex flex-col items-center text-center">
              <Building2 size={48} className="text-trace-cherry mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-trace-forest">Para Empresas</h3>
              <p className="text-base text-trace-earth mb-4">
                Integre programas de impacto social de forma eficiente. Ofrecemos gestión integral, conexión con proyectos verificados y monitoreo continuo.
              </p>
              <ul className="list-disc list-inside text-base text-trace-earth text-left w-full px-4">
                <li className="mb-2">
                  <strong>Gestión Delegada:</strong> Nos encargamos de la administración y seguimiento de fondos.
                </li>
                <li className="mb-2">
                  <strong>Dashboards en Tiempo Real:</strong> Acceso a métricas de distribución de fondos, progreso y ODS.
                </li>
                <li className="mb-2">
                  <strong>Reportes Listos:</strong> Informes detallados para comunicar su impacto a stakeholders.
                </li>
              </ul>
              <img
                src="/images/how-it-works-companies.png" // Placeholder image
                alt="Empresas usando Trace"
                className="w-full h-auto rounded-lg shadow-sm mt-6 max-w-xs"
              />
            </div>

            {/* Para Donantes Individuales */}
            <div className="flex flex-col items-center text-center">
              <Users size={48} className="text-trace-cherry mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-trace-forest">Para Donantes Individuales</h3>
              <p className="text-base text-trace-earth mb-4">
                Contribuya a causas sociales de forma sencilla y transparente. Explore proyectos verificados y done directamente.
              </p>
              <ul className="list-disc list-inside text-base text-trace-earth text-left w-full px-4">
                <li className="mb-2">
                  <strong>Proyectos Verificados:</strong> Elija entre iniciativas auténticas y activas.
                </li>
                <li className="mb-2">
                  <strong>Donación Sencilla:</strong> Proceso intuitivo, sin necesidad de conocimientos técnicos.
                </li>
                <li className="mb-2">
                  <strong>Trazabilidad Clara:</strong> Vea cómo se utilizan sus fondos en cada etapa.
                </li>
              </ul>
              <img
                src="/images/how-it-works-donors.png" // Placeholder image
                alt="Donantes usando Trace"
                className="w-full h-auto rounded-lg shadow-sm mt-6 max-w-xs"
              />
            </div>
          </div>
        </section>

        {/* Sección: Sobre Stellar */}
        <section className="mb-16 p-8 bg-trace-forest text-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <ShieldCheck size={32} /> Stellar: Transparencia y Eficiencia
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Trace utiliza la red blockchain de Stellar para todas sus transacciones. Stellar es una plataforma descentralizada que permite transferencias de valor rápidas, seguras y con costos muy bajos.
              </p>
              <img
                src="/images/stellar-blockchain.png" // Placeholder image
                alt="Representación de la tecnología Stellar blockchain"
                className="w-full h-auto rounded-lg shadow-sm mt-6"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Ventajas Clave de Stellar:</h3>
              <ul className="list-disc list-inside text-lg">
                <li className="mb-2 flex items-center gap-2">
                  <Award size={20} /> <strong>Trazabilidad Completa:</strong> Cada transacción se registra en la blockchain, permitiendo verificar el flujo de fondos.
                </li>
                <li className="mb-2 flex items-center gap-2">
                  <DollarSign size={20} /> <strong>Comisiones Bajas:</strong> Más de su donación llega directamente al proyecto.
                </li>
                <li className="mb-2 flex items-center gap-2">
                  <ShieldCheck size={20} /> <strong>Seguridad Robusta:</strong> Operaciones financieras protegidas por tecnología blockchain.
                </li>
                <li className="mb-2 flex items-center gap-2">
                  <Zap size={20} /> <strong>Velocidad Instantánea:</strong> Transacciones confirmadas en segundos.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sección: Ventajas Competitivas de Trace */}
        <section className="mb-16 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-trace-forest flex items-center justify-center gap-3">
            <Lightbulb size={32} /> ¿Qué nos Hace Diferentes?
          </h2>
          <p className="text-lg text-trace-earth text-center mb-8">
            Trace se distingue por su compromiso con la transparencia, la eficiencia y la facilidad de uso.
          </p>
          <ul className="list-disc list-inside text-lg text-trace-earth grid md:grid-cols-2 gap-x-8 gap-y-4">
            <li className="mb-2 flex items-start gap-2">
              <span className="text-trace-cherry font-bold text-xl leading-none">&bull;</span>
              <div>
                <strong>Transparencia Total con Blockchain:</strong> Verifique el uso de cada fondo en tiempo real, desde el donante hasta el proyecto.
              </div>
            </li>
            <li className="mb-2 flex items-start gap-2">
              <span className="text-trace-cherry font-bold text-xl leading-none">&bull;</span>
              <div>
                <strong>Proyectos Verificados y Monitoreo Detallado:</strong> Solo proyectos auténticos y seguimiento del progreso de tareas y logros.
              </div>
            </li>
            <li className="mb-2 flex items-start gap-2">
              <span className="text-trace-cherry font-bold text-xl leading-none">&bull;</span>
              <div>
                <strong>Financiamiento Basado en Hitos:</strong> Fondos desembolsados progresivamente al completar micro-tareas, asegurando eficiencia.
              </div>
            </li>
            <li className="mb-2 flex items-start gap-2">
              <span className="text-trace-cherry font-bold text-xl leading-none">&bull;</span>
              <div>
                <strong>Facilidad de Uso sin Barreras Web3:</strong> Plataforma intuitiva, sin necesidad de conocimientos técnicos de blockchain.
              </div>
            </li>
            <li className="mb-2 flex items-start gap-2">
              <span className="text-trace-cherry font-bold text-xl leading-none">&bull;</span>
              <div>
                <strong>Gestión Integral para Empresas:</strong> Solución completa que libera a las empresas de la carga administrativa del impacto social.
              </div>
            </li>
          </ul>
          <img
            src="/images/competitive-advantage.png" // Placeholder image
            alt="Gráfico de ventajas competitivas"
            className="w-full h-auto rounded-lg shadow-sm mt-10 max-w-md mx-auto"
          />
        </section>
      </main>
    </div>
  );
};

export default ComoFuncionaPage;