export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-5 pt-8 pb-28 max-w-md mx-auto">
      <a href="/" className="text-content-muted text-xs mb-6 block">← Volver</a>
      <h1 className="text-xl font-black text-content-primary mb-4">Politica de Privacidad</h1>
      <div className="text-content-muted text-sm leading-relaxed space-y-4">
        <p>Tu privacidad es importante para nosotros. Esta politica explica como manejamos tu informacion.</p>
        <p><strong className="text-content-primary">Datos que recopilamos:</strong> Solo almacenamos tu nullifier hash de World ID (anonimo), historial de lecturas, y datos de transacciones. No recopilamos nombre, email ni datos personales.</p>
        <p><strong className="text-content-primary">Uso de datos:</strong> Tus datos se usan unicamente para proporcionar el servicio: guardar tu historial, procesar pagos y personalizar tu experiencia.</p>
        <p><strong className="text-content-primary">IA:</strong> Las lecturas de tarot se procesan con inteligencia artificial. El contenido de tus lecturas no se usa para entrenar modelos.</p>
        <p><strong className="text-content-primary">Terceros:</strong> No vendemos ni compartimos tus datos con terceros, excepto los necesarios para procesar pagos (World App/WorldChain).</p>
        <p><strong className="text-content-primary">Contacto:</strong> Si tienes preguntas sobre esta politica, puedes contactarnos a traves de World App.</p>
      </div>
    </main>
  );
}
