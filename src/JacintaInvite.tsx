import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Gamepad2,
  Heart,
  MapPin,
  Music2,
  PartyPopper,
  PawPrint,
  Send,
  Sparkles,
  Trophy,
  Volume2,
} from "lucide-react";
import {
  ADDRESS,
  AGE_TURNING,
  BIRTHDAY_DATE_LABEL,
  CELEBRATION_DATE_LABEL,
  EVENT_TIME_LABEL,
  FUN_FACTS,
  GOOGLE_MAPS_URL,
  HOST_FULL_NAME,
  HOST_NAME,
  LIP_COLORS,
  PARTY_HIGHLIGHTS,
  PLAYLIST,
  TAGLINE,
  THEME,
  WHATSAPP_NUMBER,
  type LipColor,
  type PlaylistTrack,
} from "./constants";

type Screen = "hero" | "mundo" | "fiesta" | "musica" | "confirmar";

const SCREENS: { id: Screen; label: string }[] = [
  { id: "hero", label: "Inicio" },
  { id: "mundo", label: "Mundo" },
  { id: "fiesta", label: "Fiesta" },
  { id: "musica", label: "Música" },
  { id: "confirmar", label: "Confirmar" },
];

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function PandaFace({
  lipHex,
  blink,
  className = "",
}: {
  lipHex: string;
  blink?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {/* orejas suaves */}
      <ellipse cx="52" cy="52" rx="26" ry="28" fill="#2c2c2c" />
      <ellipse cx="148" cy="52" rx="26" ry="28" fill="#2c2c2c" />
      <ellipse cx="52" cy="54" rx="12" ry="13" fill="#ffc4d4" opacity="0.55" />
      <ellipse cx="148" cy="54" rx="12" ry="13" fill="#ffc4d4" opacity="0.55" />

      {/* carita redonda */}
      <ellipse cx="100" cy="110" rx="70" ry="66" fill="#fff9f6" />
      <ellipse cx="100" cy="118" rx="58" ry="48" fill="#ffffff" opacity="0.55" />

      {/* parches de ojos (redondos, no alargados) */}
      <ellipse cx="72" cy="102" rx="24" ry="22" fill="#2c2c2c" />
      <ellipse cx="128" cy="102" rx="24" ry="22" fill="#2c2c2c" />

      {/* ojos brillantes */}
      <motion.ellipse
        cx="72"
        cy="104"
        rx="11"
        ry={blink ? 1.2 : 12}
        fill="#fff"
        animate={blink ? { ry: [12, 1.2, 12] } : undefined}
        transition={{ duration: 0.32, repeat: blink ? Infinity : 0, repeatDelay: 2.8 }}
      />
      <motion.ellipse
        cx="128"
        cy="104"
        rx="11"
        ry={blink ? 1.2 : 12}
        fill="#fff"
        animate={blink ? { ry: [12, 1.2, 12] } : undefined}
        transition={{ duration: 0.32, repeat: blink ? Infinity : 0, repeatDelay: 2.8, delay: 0.04 }}
      />
      <circle cx="73" cy="105" r="6.5" fill="#1f1f1f" />
      <circle cx="129" cy="105" r="6.5" fill="#1f1f1f" />
      <circle cx="75.5" cy="102.5" r="2.4" fill="#fff" />
      <circle cx="131.5" cy="102.5" r="2.4" fill="#fff" />
      <circle cx="70.5" cy="108" r="1.1" fill="#fff" opacity="0.7" />
      <circle cx="126.5" cy="108" r="1.1" fill="#fff" opacity="0.7" />

      {/* naricita */}
      <ellipse cx="100" cy="122" rx="7" ry="5" fill="#2c2c2c" />
      <ellipse cx="98.5" cy="120.5" rx="2" ry="1.2" fill="#fff" opacity="0.35" />

      {/* mejillas rosadas */}
      <ellipse cx="52" cy="128" rx="12" ry="8" fill="#ffb3c6" opacity="0.55" />
      <ellipse cx="148" cy="128" rx="12" ry="8" fill="#ffb3c6" opacity="0.55" />

      {/* sonrisa + labial suave */}
      <path
        d="M86 138 Q100 150 114 138"
        fill="none"
        stroke={lipHex}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ellipse cx="100" cy="141" rx="9" ry="3.5" fill={lipHex} opacity="0.55" />
    </svg>
  );
}

function BambooBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#ffe4ef_0%,transparent_50%),radial-gradient(ellipse_at_90%_10%,#d8f5e4_0%,transparent_45%),linear-gradient(165deg,#fff8fb_0%,#f3fff8_42%,#ffeef5_100%)]" />
      <svg className="absolute -left-6 top-0 h-full w-28 opacity-[0.18]" viewBox="0 0 80 400" fill="none">
        {[40, 120, 200, 280, 360].map((y) => (
          <g key={y}>
            <rect x="28" y={y - 70} width="14" height="64" rx="4" fill="#1f8a55" />
            <line x1="28" y1={y - 8} x2="42" y2={y - 8} stroke="#0f5c38" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <svg className="absolute -right-4 top-10 h-full w-24 opacity-[0.14]" viewBox="0 0 80 400" fill="none">
        {[60, 140, 220, 300].map((y) => (
          <g key={y}>
            <rect x="30" y={y - 70} width="12" height="64" rx="4" fill="#1f8a55" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ff4f8b%22 fill-opacity=%220.08%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

function SparkBurst({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 0.4 }}
      animate={{ opacity: 0, scale: 1.6, y: -28 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Sparkles className="h-7 w-7 text-[#ff4f8b]" />
    </motion.div>
  );
}

export default function JacintaInvite() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>("hero");
  const [lip, setLip] = useState<LipColor>(LIP_COLORS[0]);
  const [activeTrack, setActiveTrack] = useState<PlaylistTrack | null>(null);
  const [openFact, setOpenFact] = useState<string | null>(null);
  const [colombaFound, setColombaFound] = useState(false);
  const [pandaTaps, setPandaTaps] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpChoice, setRsvpChoice] = useState<"si" | "talvez" | "no" | null>(null);

  const screenIndex = SCREENS.findIndex((s) => s.id === screen);

  const go = useCallback((id: Screen) => {
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onPandaTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setBursts((b) => [...b, { id, x, y }]);
    setPandaTaps((n) => n + 1);
    window.setTimeout(() => setBursts((b) => b.filter((i) => i.id !== id)), 700);
  };

  const rsvpMessage = useMemo(() => {
    const nombre = rsvpName.trim() || "una invitada";
    if (rsvpChoice === "si") {
      return `¡Hola! Soy ${nombre} y confirmo que VOY al cumpleaños panda de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL} 🐼💖`;
    }
    if (rsvpChoice === "talvez") {
      return `¡Hola! Soy ${nombre}. Todavía no estoy segura/o para el cumpleaños de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL}, pero aviso pronto 🐼`;
    }
    return `¡Hola! Soy ${nombre}. Lamentablemente no podré ir al cumpleaños de ${HOST_NAME} el ${CELEBRATION_DATE_LABEL}. ¡Que lo pasen genial! 🐼`;
  }, [rsvpChoice, rsvpName]);

  return (
    <div className="jacinta-root relative min-h-[100dvh] overflow-x-hidden text-[#1a1a1a]">
      <BambooBg />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="mb-3 flex items-center justify-between gap-3">
          <p className="jacinta-display text-lg tracking-wide text-[#ff4f8b]">
            {HOST_NAME.toUpperCase()}
          </p>
          <div className="flex gap-1">
            {SCREENS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.label}
                onClick={() => go(s.id)}
                className={`h-2 w-2 rounded-sm transition-all ${
                  i === screenIndex ? "w-5 bg-[#ff4f8b]" : "bg-[#1a1a1a]/20"
                }`}
              />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {screen === "hero" && (
            <motion.section
              key="hero"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col"
            >
              <div className="relative -mx-4 mb-5 aspect-[4/5] max-h-[52vh] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#ffe0eb_45%,#c8f0d8_100%)]" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PandaFace lipHex={lip.hex} blink={!reduceMotion} className="h-[78%] w-[78%] drop-shadow-sm" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1a1a]/55 via-[#1a1a1a]/15 to-transparent px-5 pb-6 pt-16 text-white">
                  <p className="jacinta-display text-4xl leading-none tracking-tight sm:text-5xl">
                    {HOST_NAME}
                  </p>
                  <p className="mt-2 max-w-[22ch] text-sm text-white/90">{TAGLINE}</p>
                </div>
              </div>

              <h1 className="jacinta-display text-3xl leading-tight text-[#1a1a1a]">
                Fiesta panda · {AGE_TURNING} añitos
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-[#1a1a1a]/70">
                Cumple el {BIRTHDAY_DATE_LABEL}. Celebramos el {CELEBRATION_DATE_LABEL}.
              </p>

              <button
                type="button"
                onClick={() => go("mundo")}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ff4f8b] px-6 jacinta-display text-lg text-white shadow-[0_10px_24px_-12px_rgba(255,79,139,0.8)] transition hover:bg-[#e83d78] active:scale-[0.98]"
              >
                <PartyPopper className="h-5 w-5" />
                Ábreme y ven a celebrarme
              </button>
            </motion.section>
          )}

          {screen === "mundo" && (
            <motion.section
              key="mundo"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-1 flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f8a55]">Conóceme</p>
              <h2 className="mt-1 jacinta-display text-3xl text-[#1a1a1a]">
                El mundo de {HOST_NAME}
              </h2>
              <p className="mt-2 text-[15px] text-[#1a1a1a]/65">
                Toca para descubrir… y busca a Colomba escondida.
              </p>

              <div className="mt-5 grid gap-3">
                {FUN_FACTS.map((f) => {
                  const open = openFact === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setOpenFact(open ? null : f.id)}
                      className="rounded-2xl border border-[#1a1a1a]/8 bg-white/70 px-4 py-3 text-left backdrop-blur-sm transition hover:border-[#ff4f8b]/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="jacinta-display text-lg">{f.title}</span>
                        <Sparkles className={`h-4 w-4 ${open ? "text-[#ff4f8b]" : "text-[#1a1a1a]/30"}`} />
                      </div>
                      <AnimatePresence>
                        {open && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pt-2 text-sm leading-relaxed text-[#1a1a1a]/70"
                          >
                            {f.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-dashed border-[#ff4f8b]/45 bg-[#fff0f5]/80 p-4">
                <p className="jacinta-display text-lg">¿Dónde está Colomba?</p>
                <p className="mt-1 text-sm text-[#1a1a1a]/60">Toca la huellita secreta</p>
                <div className="relative mt-4 h-24">
                  <button
                    type="button"
                    aria-label="Encontrar a Colomba"
                    onClick={() => setColombaFound(true)}
                    className="absolute right-6 top-2 rounded-full p-2 text-[#1a1a1a]/25 transition hover:text-[#ff4f8b]"
                  >
                    <PawPrint className="h-7 w-7" />
                  </button>
                  <AnimatePresence>
                    {colombaFound && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute inset-x-0 bottom-0 rounded-xl bg-[#1a1a1a] px-4 py-3 text-sm text-white"
                      >
                        ¡Guau! Colomba dice que vengas a la fiesta panda. Te espera con todo el glam.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => go("hero")}
                  className="min-h-11 flex-1 rounded-xl border border-[#1a1a1a]/15 bg-white/60 font-medium"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => go("fiesta")}
                  className="min-h-11 flex-[1.4] rounded-xl bg-[#1a1a1a] jacinta-display text-white"
                >
                  La fiesta →
                </button>
              </div>
            </motion.section>
          )}

          {screen === "fiesta" && (
            <motion.section
              key="fiesta"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-1 flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff4f8b]">Celebra conmigo</p>
              <h2 className="mt-1 jacinta-display text-3xl">
                Cumpleaños panda
              </h2>
              <p className="mt-2 text-[15px] text-[#1a1a1a]/65">
                Temática {THEME}. Maquillaje, risas y mucha actitud.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {PARTY_HIGHLIGHTS.map((h) => {
                  const Icon =
                    h.title === "Juegos" ? Gamepad2 : h.title === "Concursos" ? Sparkles : Trophy;
                  return (
                    <div
                      key={h.title}
                      className="rounded-2xl border border-[#1a1a1a]/8 bg-white/70 px-2.5 py-3 text-center backdrop-blur-sm"
                    >
                      <Icon className="mx-auto mb-1.5 h-4 w-4 text-[#ff4f8b]" />
                      <p className="jacinta-display text-sm leading-tight">{h.title}</p>
                      <p className="mt-1 text-[10px] leading-snug text-[#1a1a1a]/55">{h.body}</p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onPandaTap}
                className="relative mx-auto mt-5 h-44 w-44 touch-manipulation"
                aria-label="Toca el panda"
              >
                <PandaFace lipHex={lip.hex} className="h-full w-full" />
                <AnimatePresence>
                  {bursts.map((b) => (
                    <SparkBurst key={b.id} x={b.x} y={b.y} />
                  ))}
                </AnimatePresence>
              </button>
              <p className="mt-1 text-center text-sm text-[#1a1a1a]/55">
                Toca el panda · {pandaTaps} toque{pandaTaps === 1 ? "" : "s"}
              </p>

              <div className="mt-5">
                <p className="mb-2 flex items-center gap-2 jacinta-display text-lg">
                  <Heart className="h-4 w-4 text-[#ff4f8b]" /> Elige su labial
                </p>
                <div className="flex flex-wrap gap-2">
                  {LIP_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setLip(c)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                        lip.id === c.id
                          ? "border-[#1a1a1a] bg-white shadow-sm"
                          : "border-transparent bg-white/50"
                      }`}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-black/10"
                        style={{ background: c.hex }}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-[15px]">
                <li className="flex gap-3 rounded-2xl bg-white/65 px-4 py-3 backdrop-blur-sm">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#ff4f8b]" />
                  <div>
                    <p className="font-semibold">Cuándo</p>
                    <p className="text-[#1a1a1a]/70">{CELEBRATION_DATE_LABEL}</p>
                    <p className="text-xs text-[#1a1a1a]/50">Cumple el {BIRTHDAY_DATE_LABEL}</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl bg-white/65 px-4 py-3 backdrop-blur-sm">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#1f8a55]" />
                  <div>
                    <p className="font-semibold">Hora</p>
                    <p className="text-[#1a1a1a]/70">{EVENT_TIME_LABEL}</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl bg-white/65 px-4 py-3 backdrop-blur-sm">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1a1a1a]" />
                  <div>
                    <p className="font-semibold">Dónde</p>
                    <p className="text-[#1a1a1a]/70">{ADDRESS}</p>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-[#ff4f8b] underline-offset-2 hover:underline"
                    >
                      Abrir en Maps
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => go("mundo")}
                  className="min-h-11 flex-1 rounded-xl border border-[#1a1a1a]/15 bg-white/60 font-medium"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => go("musica")}
                  className="min-h-11 flex-[1.4] rounded-xl bg-[#ff4f8b] jacinta-display text-white"
                >
                  Su playlist →
                </button>
              </div>
            </motion.section>
          )}

          {screen === "musica" && (
            <motion.section
              key="musica"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-1 flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f8a55]">Soundtrack</p>
              <h2 className="mt-1 jacinta-display text-3xl">
                Playlist Jacinta
              </h2>
              <p className="mt-2 text-[15px] text-[#1a1a1a]/65">
                Toca un chip y reproduce (YouTube). Perfecto para ambientar el festejo.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {PLAYLIST.map((t) => {
                  const on = activeTrack?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTrack(on ? null : t)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                        on ? "border-transparent text-white" : "border-[#1a1a1a]/10 bg-white/70"
                      }`}
                      style={on ? { background: t.accent } : undefined}
                    >
                      <Music2 className="h-4 w-4 shrink-0" />
                      <span>
                        <span className="block font-semibold leading-tight">{t.label}</span>
                        <span className={`block text-xs ${on ? "text-white/80" : "text-[#1a1a1a]/50"}`}>
                          {t.subtitle}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-[#1a1a1a]/8 bg-[#1a1a1a] shadow-lg">
                {activeTrack ? (
                  <div className="aspect-video w-full">
                    <iframe
                      key={activeTrack.youtubeId}
                      title={activeTrack.label}
                      src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?rel=0&modestbranding=1`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center gap-2 px-6 text-center text-white/70">
                    <Volume2 className="h-8 w-8 text-[#ff4f8b]" />
                    <p className="text-sm">Elige una canción para escuchar</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => go("fiesta")}
                  className="min-h-11 flex-1 rounded-xl border border-[#1a1a1a]/15 bg-white/60 font-medium"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => go("confirmar")}
                  className="min-h-11 flex-[1.4] rounded-xl bg-[#1a1a1a] jacinta-display text-white"
                >
                  Confirmar →
                </button>
              </div>
            </motion.section>
          )}

          {screen === "confirmar" && (
            <motion.section
              key="confirmar"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-1 flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff4f8b]">RSVP</p>
              <h2 className="mt-1 jacinta-display text-3xl">
                ¿Vienes a mi fiesta?
              </h2>
              <p className="mt-2 text-[15px] text-[#1a1a1a]/65">
                {HOST_FULL_NAME} te espera el {CELEBRATION_DATE_LABEL} en casa · temática {THEME}.
              </p>

              <label className="mt-5 block text-sm font-medium">
                Tu nombre
                <input
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Ej: mamá de Sofía"
                  className="mt-1.5 w-full rounded-xl border border-[#1a1a1a]/12 bg-white/80 px-4 py-3 text-[15px] outline-none ring-[#ff4f8b]/40 focus:ring-2"
                />
              </label>

              <div className="mt-4 grid grid-cols-3 gap-2">
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
                        : "border-[#1a1a1a]/10 bg-white/70"
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
                className={`mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl jacinta-display text-lg text-white transition ${
                  rsvpChoice
                    ? "bg-[#25D366] shadow-[0_10px_24px_-12px_rgba(37,211,102,0.85)] hover:brightness-105"
                    : "cursor-not-allowed bg-[#25D366]/40"
                }`}
              >
                <Send className="h-5 w-5" />
                Enviar por WhatsApp
              </a>

              <motion.div
                className="mt-8 flex flex-col items-center text-center"
                animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <PandaFace lipHex={lip.hex} className="h-28 w-28" />
                <p className="mt-3 jacinta-display text-xl text-[#ff4f8b]">
                  ¡Te espero, eres top!
                </p>
              </motion.div>

              <button
                type="button"
                onClick={() => go("musica")}
                className="mt-6 min-h-11 rounded-xl border border-[#1a1a1a]/15 bg-white/60 font-medium"
              >
                Atrás
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[#1a1a1a]/8 bg-[#fff8fb]/92 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg justify-between gap-1">
          {SCREENS.map((s) => {
            const active = s.id === screen;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                  active ? "text-[#ff4f8b]" : "text-[#1a1a1a]/40"
                }`}
              >
                <span
                  className={`h-1 w-6 rounded-full ${active ? "bg-[#ff4f8b]" : "bg-transparent"}`}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
