"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HERO_TAGLINE = "Agência criativa";
const HERO_TITLE_LINE_1 = "IDEIAS QUE";
const HERO_TITLE_LINE_2 = "MOVEM MARCAS";
const HERO_SUBTITLE =
  "Branding, conteúdo e performance pra marcas que querem ser lembradas.";
const HERO_CREDIT = "© DSY Solutions";
const ARTIST_INITIALS = "DSY";
const ARTIST_NAME = "DSY";
const FPS_LABEL = "FPS: 60";
const LABEL_LOADING = "LOADING";
const LABEL_STOP = "STOP";
const LABEL_PLAY = "PLAY";

type FilmGrainApplyOptions = {
  intensity?: number;
  colorize?: boolean;
  hue?: number;
};

class FilmGrain {
  private width: number;
  private height: number;
  private readonly grainCanvas: HTMLCanvasElement;
  private readonly grainCtx: CanvasRenderingContext2D;
  private grainData: ImageData;
  private frame = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grainCanvas = document.createElement("canvas");
    this.grainCanvas.width = width;
    this.grainCanvas.height = height;
    const ctx = this.grainCanvas.getContext("2d");
    if (!ctx) {
      throw new Error("FilmGrain: 2d context unavailable");
    }
    this.grainCtx = ctx;
    this.grainData = this.grainCtx.createImageData(width, height);
    this.generateGrainPattern();
  }

  private generateGrainPattern() {
    const data = this.grainData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
  }

  update() {
    this.frame++;
    if (this.frame % 2 !== 0) return;

    const data = this.grainData.data;
    const time = this.frame * 0.01;
    for (let i = 0; i < data.length; i += 4) {
      const grain = Math.random();
      const pixel = i / 4;
      const x = pixel % this.width;
      const y = Math.floor(pixel / this.width);
      const pattern = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 - time);
      const value = (grain * 0.8 + pattern * 0.2) * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
    }
    this.grainCtx.putImageData(this.grainData, 0, 0);
  }

  apply(ctx: CanvasRenderingContext2D, options: FilmGrainApplyOptions = {}) {
    const { intensity = 0.05, colorize = true, hue = 0 } = options;
    ctx.save();

    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = intensity * 0.5;
    ctx.drawImage(this.grainCanvas, 0, 0);

    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = 1 - intensity * 0.3;
    ctx.drawImage(this.grainCanvas, 0, 0);

    if (colorize) {
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = intensity * 0.3;
      ctx.fillStyle = `hsla(${hue}, 50%, 50%, 1)`;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    ctx.restore();
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grainCanvas.width = width;
    this.grainCanvas.height = height;
    this.grainData = this.grainCtx.createImageData(width, height);
    this.generateGrainPattern();
  }
}

type Wave = {
  amplitude: number;
  frequency: number;
  speed: number;
  offset: number;
  thickness: number;
  opacity: number;
};

type BeamState = {
  bassIntensity: number;
  midIntensity: number;
  trebleIntensity: number;
  time: number;
  filmGrain: FilmGrain;
  waves: Wave[];
  bassHistory: number[];
  postProcessing: {
    filmGrainIntensity: number;
    vignetteIntensity: number;
    scanlineIntensity: number;
  };
};

type AudioContextGlobals = {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
};

const resolveAudioContextCtor = (): typeof AudioContext | undefined => {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as AudioContextGlobals;
  return w.AudioContext ?? w.webkitAudioContext;
};

const buildInitialBeam = (filmGrain: FilmGrain): BeamState => ({
  bassIntensity: 0,
  midIntensity: 0,
  trebleIntensity: 0,
  time: 0,
  filmGrain,
  waves: [
    { amplitude: 30, frequency: 0.003, speed: 0.02, offset: 0, thickness: 1, opacity: 0.9 },
    { amplitude: 25, frequency: 0.004, speed: 0.015, offset: Math.PI * 0.5, thickness: 0.8, opacity: 0.7 },
    { amplitude: 20, frequency: 0.005, speed: 0.025, offset: Math.PI, thickness: 0.6, opacity: 0.5 },
    { amplitude: 35, frequency: 0.002, speed: 0.01, offset: Math.PI * 1.5, thickness: 1.2, opacity: 0.6 },
  ],
  bassHistory: new Array<number>(20).fill(0),
  postProcessing: {
    filmGrainIntensity: 0.04,
    vignetteIntensity: 0.4,
    scanlineIntensity: 0.02,
  },
});

const getButtonLabel = (isLoading: boolean, isPlaying: boolean) => {
  if (isLoading) return LABEL_LOADING;
  if (isPlaying) return LABEL_STOP;
  return LABEL_PLAY;
};

type ComponentProps = {
  audioSrc?: string;
};

export const Component = ({ audioSrc }: ComponentProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const beamRef = useRef<BeamState | null>(null);
  const isPlayingRef = useRef(false);

  const hasAudio = Boolean(audioSrc);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(hasAudio);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const initAudio = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;

    try {
      const Ctor = resolveAudioContextCtor();
      if (!Ctor) throw new Error("AudioContext not supported");

      const audioContext = new Ctor();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const filmGrain = new FilmGrain(window.innerWidth, window.innerHeight);
    const beam = buildInitialBeam(filmGrain);
    beamRef.current = beam;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      beam.filmGrain.resize(canvas.width, canvas.height);
    };
    resizeCanvas();

    const readFrequencies = () => {
      const analyser = analyserRef.current;
      if (!analyser || !isPlayingRef.current) return null;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      let bassSum = 0;
      for (let i = 0; i < 30; i++) bassSum += dataArray[i];
      const bass = bassSum / (30 * 255);

      let midSum = 0;
      for (let i = 30; i < 200; i++) midSum += dataArray[i];
      const mid = midSum / (170 * 255);

      let trebleSum = 0;
      for (let i = 200; i < 800; i++) trebleSum += dataArray[i];
      const treble = trebleSum / (600 * 255);

      return { bass, mid, treble };
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      ctx.fillStyle = "rgba(0, 0, 0, 0.92)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const frequencies = readFrequencies();

      if (frequencies) {
        const { bass, mid, treble } = frequencies;
        beam.bassHistory.shift();
        beam.bassHistory.push(bass);
        const avgBass =
          beam.bassHistory.reduce((a, b) => a + b, 0) / beam.bassHistory.length;

        beam.bassIntensity = avgBass;
        beam.midIntensity = mid;
        beam.trebleIntensity = treble;

        beam.postProcessing.filmGrainIntensity = 0.03 + bass * 0.2;
      } else {
        beam.bassIntensity = 0.4 + Math.sin(beam.time * 0.01) * 0.3;
        beam.midIntensity = 0.3 + Math.sin(beam.time * 0.015) * 0.2;
        beam.trebleIntensity = 0.2 + Math.sin(beam.time * 0.02) * 0.1;
      }

      beam.time++;
      const centerY = canvas.height / 2;

      beam.waves.forEach((wave, waveIndex) => {
        wave.offset += wave.speed * (1 + beam.bassIntensity * 0.8);
        const freqInfluence = waveIndex < 2 ? beam.bassIntensity : beam.midIntensity;
        const dynamicAmplitude = wave.amplitude * (1 + freqInfluence * 5);

        const gradient = ctx.createLinearGradient(
          0,
          centerY - dynamicAmplitude,
          0,
          centerY + dynamicAmplitude,
        );
        const alpha = wave.opacity * (0.5 + beam.bassIntensity * 0.5);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        for (let x = -50; x <= canvas.width + 50; x += 2) {
          const y1 = Math.sin(x * wave.frequency + wave.offset) * dynamicAmplitude;
          const y2 =
            Math.sin(x * wave.frequency * 2 + wave.offset * 1.5) *
            (dynamicAmplitude * 0.3 * beam.midIntensity);
          const y3 =
            Math.sin(x * wave.frequency * 0.5 + wave.offset * 0.7) * (dynamicAmplitude * 0.5);
          const y = centerY + y1 + y2 + y3;
          if (x === -50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width + 50, canvas.height);
        ctx.lineTo(-50, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      beam.filmGrain.update();
      beam.filmGrain.apply(ctx, {
        intensity: beam.postProcessing.filmGrainIntensity,
        colorize: false,
      });

      ctx.strokeStyle = `rgba(0, 0, 0, ${beam.postProcessing.scanlineIntensity})`;
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }


      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.9,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(
        0.5,
        `rgba(0, 0, 0, ${beam.postProcessing.vignetteIntensity * 0.3})`,
      );
      vignette.addColorStop(
        0.8,
        `rgba(0, 0, 0, ${beam.postProcessing.vignetteIntensity * 0.6})`,
      );
      vignette.addColorStop(1, `rgba(0, 0, 0, ${beam.postProcessing.vignetteIntensity})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.02) {
        const dustCount = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < dustCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 2 + 0.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const flicker = Math.sin(beam.time * 0.3) * 0.02 + Math.random() * 0.01;
      ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      if (Math.random() < 0.005) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
        ctx.lineWidth = Math.random() * 2 + 0.5;
        ctx.beginPath();
        const scratchX = Math.random() * canvas.width;
        ctx.moveTo(scratchX, 0);
        ctx.lineTo(scratchX + (Math.random() - 0.5) * 20, canvas.height);
        ctx.stroke();
      }
    };

    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      initAudio();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume().catch((error) => {
        console.error("Error resuming AudioContext:", error);
      });
    }
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  }, [isPlaying, initAudio]);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setAudioProgress((audio.currentTime / audio.duration) * 100);
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setIsLoading(false);
    const handleError = (event: Event) => {
      console.error("Audio error:", event);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [updateProgress]);

  const buttonClassName = ["play-button", isPlaying && "playing"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="music-reactive-hero">
      {/* <canvas ref={canvasRef} className="visualization-canvas" /> */}

      <div className="hero-content">
        <p className="hero-tagline">{HERO_TAGLINE}</p>
        <h1 className="hero-title">
          <span className="title-line">{HERO_TITLE_LINE_1}</span>
          <span className="title-line">{HERO_TITLE_LINE_2}</span>
        </h1>
        <p className="hero-subtitle">{HERO_SUBTITLE}</p>
        <p className="hero-credit">{HERO_CREDIT}</p>
      </div>

      {hasAudio ? (
        <>
          <button
            className={buttonClassName}
            onClick={togglePlayback}
            disabled={isLoading}
            type="button"
          >
            {getButtonLabel(isLoading, isPlaying)}
          </button>

          <div className="audio-progress">
            <div className="progress-bar" style={{ width: `${audioProgress}%` }} />
          </div>

          <audio ref={audioRef} src={audioSrc} crossOrigin="anonymous" preload="auto" />
        </>
      ) : null}

      <div className="corner-info">
        <span className="fps-counter">{FPS_LABEL}</span>
      </div>

      <div className="bottom-info">
        <div className="artist-avatar">{ARTIST_INITIALS}</div>
        <span className="artist-name">{ARTIST_NAME}</span>
      </div>
    </div>
  );
};
