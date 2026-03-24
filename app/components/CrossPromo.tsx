"use client";

export default function CrossPromo() {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-mystic-500/15 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{"\ud83e\udde0"}</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-mystic-300 font-semibold tracking-widest uppercase">Del mismo creador</p>
          <h3 className="text-sm font-bold text-content-primary mt-0.5">MindCraft</h3>
          <p className="text-content-muted text-[11px] mt-0.5">Tests psicologicos que revelan tu verdadero yo</p>
        </div>
      </div>
      <p className="text-content-muted/40 text-[10px] mt-3 text-center">
        Buscalo en World App
      </p>
    </div>
  );
}
