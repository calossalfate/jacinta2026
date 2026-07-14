import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, PartyPopper, Send } from "lucide-react";
import {
  ADDRESS,
  AGE_TURNING,
  BIRTHDAY_DATE_LABEL,
  CELEBRATION_DATE_LABEL,
  EVENT_TIME_LABEL,
  GOOGLE_MAPS_URL,
  HOST_FULL_NAME,
  HOST_NAME,
  PARTY_LINE,
  TAGLINE,
  THEME,
  WHATSAPP_NUMBER,
} from "./constants";

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function PandaFace({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <ellipse cx="52" cy="52" rx="26" ry="28" fill="#2c2c2c" />
      <ellipse cx="148" cy="52" rx="26" ry="28" fill="#2c2c2c" />
      <ellipse cx="52" cy="54" rx="12" ry="13" fill="#ffc4d4" opacity="0.55" />
      <ellipse cx="148" cy="54" rx="12" ry="13" fill="#ffc4d4" opacity="0.55" />
      <ellipse cx="100" cy="110" rx="70" ry="66" fill="#fff9f6" />
      <ellipse cx="100" cy="118" rx="58" ry="48" fill="#ffffff" opacity="0.55" />
      <ellipse cx="72" cy="102" rx="24" ry="22" fill="#2c2c2c" />
      <ellipse cx="128" cy="102" rx="24" ry="22" fill="#2c2c2c" />
      <motion.ellipse
        cx="72"
        cy="104"
        rx="11"
        ry={12}
        fill="#fff"
        animate={reduceMotion ? undefined : { ry: [12, 1.2, 12] }}
        transition={{ duration: 0.32, repeat: Infinity, repeatDelay: 2.8 }}
      />
      <motion.ellipse
        cx="128"
        cy="104"
        rx="11"
        ry={12}
        fill="#fff"
        animate={reduceMotion ? undefined : { ry: [12, 1.2, 12] }}
        transition={{ duration: 0.32, repeat: Infinity, repeatDelay: 2.8, delay: 0.04 }}
      />
      <circle cx="73" cy="105" r="6.5" fill="#1f1f1f" />
      <circle cx="129" cy="105" r="6.5" fill="#1f1f1f" />
      <circle cx="75.5" cy="102.5" r="2.4" fill="#fff" />
      <circle cx="131.5" cy="102.5" r="2.4" fill="#fff" />
      <ellipse cx="100" cy="122" rx="7" ry="5" fill="#2c2c2c" />
      <ellipse cx="52" cy="128" rx="12" ry="8" fill="#ffb3c6" opacity="0.55" />
      <ellipse cx="148" cy="128" rx="12" ry="8" fill="#ffb3c6" opacity="0.55" />
      <path
        d="M86 138 Q100 150 114 138"
        fill="none"
        stroke="#ff4f8b"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function JacintaInvite() {
  const reduceMotion = useReducedMotion();
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpChoice, setRsvpChoice] = useState<"si" | "talvez" | "no" | null>(null);

  const rsvpMessage = useMemo(() => {
    const nombre = rsvpName.trim() || "una invitad@";
    if (rsvpChoice === "si") {
      return `¡Hola! Soy ${nombre} y confirmo que VOY al cumpleaños panda de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL}.`;
    }
    if (rsvpChoice === "talvez") {
      return `¡Hola! Soy ${nombre}. Todavía no estoy segura/o para el cumpleaños de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL}, aviso pronto.`;
    }
    return `¡Hola! Soy ${nombre}. Lamentablemente no podré ir al cumpleaños de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL}. ¡Que lo pasen genial!`;
  }, [rsvpChoice, rsvpName]);

  return (
    <div className="jacinta-root relative min-h-[100dvh] overflow-x-hidden text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#ffe4ef_0%,transparent_50%),radial-gradient(ellipse_at_90%_10%,#d8f5e4_0%,transparent_45%),linear-gradient(165deg,#fff8fb_0%,#f3fff8_48%,#ffeef5_100%)]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-lg px-4 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
        {/* Hero */}
        <section className="text-center">
          <p className="jacinta-display text-sm tracking-[0.22em] text-[#ff4f8b]">
            ESTÁS INVITAD@
          </p>
          <motion.div
            className="mx-auto mt-3 h-44 w-44"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <PandaFace className="h-full w-full" />
          </motion.div>
          <h1 className="jacinta-display mt-2 text-5xl leading-none tracking-tight text-[#1a1a1a]">
            {HOST_NAME}
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#1a1a1a]/80">
            Cumple {AGE_TURNING} · Fiesta {THEME.toLowerCase()}
          </p>
          <p className="mx-auto mt-2 max-w-[28ch] text-[15px] leading-relaxed text-[#1a1a1a]/65">
            {TAGLINE}
          </p>
          <a
            href="#confirmar"
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ff4f8b] px-6 jacinta-display text-lg text-white shadow-[0_10px_24px_-12px_rgba(255,79,139,0.8)]"
          >
            <PartyPopper className="h-5 w-5" />
            Confirmar asistencia
          </a>
        </section>

        {/* Datos */}
        <section className="mt-8 space-y-3">
          <h2 className="jacinta-display text-2xl">Datos de la fiesta</h2>

          <div className="rounded-2xl bg-white/75 px-4 py-4 backdrop-blur-sm">
            <div className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#ff4f8b]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/45">
                  Día de la fiesta
                </p>
                <p className="text-lg font-semibold leading-snug">{CELEBRATION_DATE_LABEL}</p>
                <p className="mt-1 text-sm text-[#1a1a1a]/55">
                  (Cumple el {BIRTHDAY_DATE_LABEL})
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/75 px-4 py-4 backdrop-blur-sm">
            <div className="flex gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#1f8a55]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/45">
                  Hora
                </p>
                <p className="text-lg font-semibold">{EVENT_TIME_LABEL}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/75 px-4 py-4 backdrop-blur-sm">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1a1a1a]/45">
                  Lugar
                </p>
                <p className="text-lg font-semibold leading-snug">{ADDRESS}</p>
                <p className="mt-1 text-sm text-[#1a1a1a]/55">Casa de {HOST_FULL_NAME}</p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-[#ff4f8b] underline-offset-2 hover:underline"
                >
                  Abrir ubicación en Maps
                </a>
              </div>
            </div>
          </div>

          <p className="rounded-2xl border border-[#ff4f8b]/25 bg-[#fff0f5]/90 px-4 py-3 text-[15px] leading-relaxed text-[#1a1a1a]/75">
            {PARTY_LINE}
          </p>
        </section>

        {/* Confirmar */}
        <section id="confirmar" className="mt-8 scroll-mt-6">
          <h2 className="jacinta-display text-2xl">¿Vienes?</h2>
          <p className="mt-1 text-[15px] text-[#1a1a1a]/65">
            Confirma con un toque y te abre WhatsApp listo para enviar.
          </p>

          <label className="mt-4 block text-sm font-semibold">
            Tu nombre
            <input
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
              placeholder="Ej: mamá de Sofía"
              className="mt-1.5 w-full rounded-xl border border-[#1a1a1a]/12 bg-white px-4 py-3 text-[15px] font-normal outline-none ring-[#ff4f8b]/35 focus:ring-2"
            />
          </label>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                ["si", "¡Voy!"],
                ["talvez", "Tal vez"],
                ["no", "No puedo"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRsvpChoice(id)}
                className={`min-h-12 rounded-xl border text-sm font-semibold transition ${
                  rsvpChoice === id
                    ? id === "si"
                      ? "border-transparent bg-[#ff4f8b] text-white"
                      : id === "talvez"
                        ? "border-transparent bg-[#1f8a55] text-white"
                        : "border-transparent bg-[#1a1a1a] text-white"
                    : "border-[#1a1a1a]/10 bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href={rsvpChoice ? waUrl(rsvpMessage) : undefined}
            aria-disabled={!rsvpChoice}
            onClick={(e) => {
              if (!rsvpChoice) e.preventDefault();
            }}
            className={`mt-4 inline-flex w-full min-h-14 items-center justify-center gap-2 rounded-xl jacinta-display text-xl text-white transition ${
              rsvpChoice
                ? "bg-[#25D366] shadow-[0_10px_24px_-12px_rgba(37,211,102,0.85)]"
                : "cursor-not-allowed bg-[#25D366]/40"
            }`}
          >
            <Send className="h-5 w-5" />
            Enviar por WhatsApp
          </a>

          {!rsvpChoice && (
            <p className="mt-2 text-center text-sm text-[#1a1a1a]/45">
              Primero elige: Voy, Tal vez o No puedo
            </p>
          )}
        </section>

        <p className="mt-10 pb-[env(safe-area-inset-bottom)] text-center jacinta-display text-lg text-[#ff4f8b]">
          ¡Te esperamos!
        </p>
      </main>
    </div>
  );
}
