export default function TermsPage() {
  return (
    <main className="min-h-screen px-5 pt-8 pb-28 max-w-md mx-auto">
      <a href="/" className="text-content-muted text-xs mb-6 block">← Volver</a>
      <h1 className="text-xl font-black text-content-primary mb-4">Terminos de Uso</h1>
      <div className="text-content-muted text-sm leading-relaxed space-y-4">
        <p>Bienvenido a MysticCraft. Al usar esta aplicacion, aceptas los siguientes terminos.</p>
        <p><strong className="text-content-primary">1. Servicio:</strong> MysticCraft es una aplicacion de entretenimiento y bienestar espiritual. Las lecturas de tarot, rituales y contenido astrologico son para fines de entretenimiento y autoconocimiento. No constituyen asesoramiento profesional.</p>
        <p><strong className="text-content-primary">2. Pagos:</strong> Los pagos se procesan en USDC a traves de World App. Todas las transacciones son finales y no reembolsables.</p>
        <p><strong className="text-content-primary">3. Verificacion:</strong> Se requiere verificacion con World ID para acceder a la aplicacion. Esto garantiza que cada usuario es un humano real y unico.</p>
        <p><strong className="text-content-primary">4. Contenido:</strong> El contenido generado por IA es unico para cada sesion. No garantizamos la precision de las interpretaciones.</p>
        <p><strong className="text-content-primary">5. Modificaciones:</strong> Nos reservamos el derecho de modificar estos terminos en cualquier momento.</p>
      </div>
    </main>
  );
}
