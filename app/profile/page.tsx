"use client";

import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useUser } from "@/app/components/UserContext";
import { calculateBadges, Badge } from "@/lib/badges";
import { calculateStreak, StreakInfo } from "@/lib/streaks";
import CrossPromo from "@/app/components/CrossPromo";

interface ProfileData {
  nickname: string | null;
  readingsCount: number;
  ritualsCount: number;
  activityDates: string[];
  spreadTypes: string[];
  ritualSlugs: string[];
  hasPremium: boolean;
  hasDeep: boolean;
}

export default function ProfilePage() {
  const { isVerified, nullifierHash, setVerified } = useUser();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [tempNick, setTempNick] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Cargar datos reales de Supabase
  useEffect(() => {
    if (!nullifierHash) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nullifier_hash: nullifierHash }),
        });
        if (res.ok) {
          const data: ProfileData = await res.json();
          setProfileData(data);
          setNickname(data.nickname);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [nullifierHash]);

  // Calcular streak y badges desde datos reales
  const streak: StreakInfo = profileData
    ? calculateStreak(profileData.activityDates)
    : { current: 0, longest: 0, isActiveToday: false };

  const badges: Badge[] = calculateBadges({
    readingsCount: profileData?.readingsCount || 0,
    ritualsCount: profileData?.ritualsCount || 0,
    hasPremium: profileData?.hasPremium || false,
    hasDeep: profileData?.hasDeep || false,
    streakCurrent: streak.current,
    streakLongest: streak.longest,
    spreadTypes: new Set(profileData?.spreadTypes || []),
    ritualCategories: new Set(profileData?.ritualSlugs || []),
  });

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

  const readingsCount = profileData?.readingsCount || 0;
  const ritualsCount = profileData?.ritualsCount || 0;

  const saveNickname = async () => {
    if (!tempNick.trim() || !nullifierHash) return;
    try {
      const res = await fetch("/api/nickname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nullifier_hash: nullifierHash, nickname: tempNick.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setNickname(data.nickname);
      }
    } catch (err) {
      console.error("Failed to save nickname:", err);
    }
    setEditing(false);
  };

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) return;
    setVerifying(true);
    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: process.env.NEXT_PUBLIC_VERIFY_ACTION!,
        verification_level: "orb" as any,
      });

      if (finalPayload.status === "success") {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payload: finalPayload,
            action: process.env.NEXT_PUBLIC_VERIFY_ACTION,
            signal: "",
          }),
        });
        const data = await res.json();
        if (data.verifyRes?.success) {
          setVerified(data.nullifier_hash);
        }
      }
    } catch (err) {
      console.error("Verify error:", err);
    } finally {
      setVerifying(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pt-8 pb-28">
      <div className="max-w-md mx-auto">
        {/* Header perfil */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <div className="w-20 h-20 rounded-full glass-elevated flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{"\ud83d\udd2e"}</span>
          </div>

          {/* Nickname */}
          {!editing ? (
            <div>
              <h1 className="text-xl font-black text-content-primary">
                {nickname || "Buscador Mistico"}
              </h1>
              <button
                onClick={() => { setEditing(true); setTempNick(nickname || ""); }}
                className="text-brand-400 text-xs font-semibold mt-1"
              >
                Cambiar nombre
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-2">
              <input
                type="text"
                value={tempNick}
                onChange={(e) => setTempNick(e.target.value)}
                maxLength={20}
                placeholder="Tu nombre mistico"
                className="bg-white/5 border border-mystic-500/20 rounded-lg px-3 py-2 text-sm text-content-primary placeholder:text-content-muted/30 outline-none focus:border-mystic-500/50 w-48 text-center"
              />
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 rounded-xl bg-white/5 text-content-muted text-sm font-semibold active:scale-[0.96] transition-transform"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveNickname}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-bold active:scale-[0.96] transition-transform shadow-lg shadow-brand-500/20"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* Verificacion */}
          {isVerified ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">VERIFICADO</span>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold tracking-wide active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20"
            >
              <span>{"\ud83c\udf10"}</span>
              {verifying ? "Verificando..." : "VERIFICAR CON WORLD ID"}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500/30 border-t-brand-500 animate-spin mx-auto mb-3" />
            <p className="text-content-muted text-xs">Cargando perfil...</p>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up stagger-1">
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-brand-400">{streak.current}</p>
                <p className="text-[10px] text-content-muted">Racha</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-mystic-300">{readingsCount}</p>
                <p className="text-[10px] text-content-muted">Lecturas</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-2xl font-black text-accent-amber">{ritualsCount}</p>
                <p className="text-[10px] text-content-muted">Rituales</p>
              </div>
            </div>

            {/* Racha detail */}
            <div className="glass-card rounded-2xl p-4 mb-6 animate-fade-in-up stagger-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{streak.current > 0 ? "\ud83d\udd25" : "\u2744\ufe0f"}</span>
                  <div>
                    <p className="text-sm font-bold text-content-primary">Racha Actual</p>
                    <p className="text-content-muted text-[10px]">
                      {streak.isActiveToday ? "Activa hoy" : "Haz una lectura o ritual para activarla"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-brand-400">{streak.current}</p>
                  <p className="text-[9px] text-content-muted">Record: {streak.longest}</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="animate-fade-in-up stagger-3">
              <h2 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-3 px-1">
                Logros ({unlockedBadges.length}/{badges.length})
              </h2>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`rounded-xl p-3 text-center transition-all ${
                      badge.unlocked ? "glass-elevated" : "glass-card opacity-40"
                    }`}
                  >
                    <span className={`text-2xl block mb-1 ${badge.unlocked ? "" : "grayscale"}`}>
                      {badge.emoji}
                    </span>
                    <p className="text-[10px] font-bold text-content-primary leading-tight">{badge.name}</p>
                    <p className="text-[8px] text-content-muted mt-0.5">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Cross promo */}
        <div className="mt-6 animate-fade-in-up stagger-4">
          <CrossPromo />
        </div>
      </div>
    </main>
  );
}
