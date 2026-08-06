"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  Search,
  User,
  Menu,
  X,
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./CinematicHero.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const NAV_LINKS = ["Movies", "TV Series", "Editor's Pick", "Interviews", "User Reviews"];

const VIDEO_URL =
  "https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/cinematic.mp4";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CinematicHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className={cx(
        inter.className,
        "relative flex h-screen w-full flex-col overflow-hidden bg-black text-white",
      )}
    >
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        aria-hidden
        className={cx(
          "pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl",
          styles.bottomBlur,
        )}
      />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
        <Link
          href="/"
          className={cx(
            styles.animateBlurFadeUp,
            "flex h-8 items-center text-lg font-semibold tracking-widest md:h-10 md:text-xl",
          )}
          style={{ animationDelay: "0ms" }}
        >
          CINEMATIC
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={cx(
                styles.animateBlurFadeUp,
                "text-sm transition-colors hover:text-gray-300",
              )}
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cx(
              styles.liquidGlass,
              styles.animateBlurFadeUp,
              "hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex md:px-6",
            )}
            style={{ animationDelay: "350ms" }}
          >
            <Search size={18} />
            Search
          </button>

          <button
            type="button"
            aria-label="Profile"
            className={cx(
              styles.liquidGlass,
              styles.animateBlurFadeUp,
              "hidden h-10 w-10 items-center justify-center rounded-full sm:flex",
            )}
            style={{ animationDelay: "400ms" }}
          >
            <User size={18} />
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={cx(
              styles.liquidGlass,
              styles.animateBlurFadeUp,
              "relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            )}
            style={{ animationDelay: "350ms" }}
          >
            <Menu
              size={18}
              className={cx(
                "absolute transition-all duration-500 ease-out",
                menuOpen ? "rotate-180 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
              )}
            />
            <X
              size={18}
              className={cx(
                "absolute transition-all duration-500 ease-out",
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-50 opacity-0",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cx(
          "absolute inset-x-0 top-[72px] z-40 border-t border-b border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden",
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <div className="flex flex-col px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={cx(
                "rounded-lg px-3 py-3 text-sm transition-all duration-500 ease-out hover:bg-gray-800/50",
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-gray-800 px-4 py-4 sm:hidden sm:px-6">
          <button
            type="button"
            className={cx(
              styles.liquidGlass,
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm",
            )}
          >
            <Search size={18} />
            Search
          </button>
          <button
            type="button"
            aria-label="Profile"
            className={cx(
              styles.liquidGlass,
              "flex h-10 w-10 items-center justify-center rounded-full",
            )}
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16">
        <div className="flex flex-col items-end gap-8 md:flex-row">
          <div className="flex-1">
            <div
              className={cx(
                styles.animateBlurFadeUp,
                "mb-6 flex flex-wrap items-center gap-3 text-xs sm:mb-8 sm:gap-6 sm:text-sm",
              )}
              style={{ animationDelay: "300ms" }}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Star size={16} className="fill-white sm:h-5 sm:w-5" />
                8.7/10 IMDB
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                132 min
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                April, 2025
              </span>
            </div>

            <h1
              className={cx(
                styles.animateBlurFadeUp,
                "mb-4 text-3xl font-normal tracking-[-0.04em] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl",
              )}
              style={{ animationDelay: "400ms" }}
            >
              Step Through. Work Smarter.
            </h1>

            <p
              className={cx(
                styles.animateBlurFadeUp,
                "mb-6 max-w-2xl text-base text-gray-400 sm:text-lg md:mb-12 md:text-xl",
              )}
              style={{ animationDelay: "500ms" }}
            >
              A voyage through forgotten realms, where past and future intertwine.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                className={cx(
                  styles.animateBlurFadeUp,
                  "flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3",
                )}
                style={{ animationDelay: "600ms" }}
              >
                <Play size={18} className="fill-black" />
                Watch Now
              </button>

              <button
                type="button"
                className={cx(
                  styles.liquidGlass,
                  styles.animateBlurFadeUp,
                  "rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3",
                )}
                style={{ animationDelay: "700ms" }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="flex w-full gap-3 sm:gap-4 md:w-auto md:justify-end">
            <button
              type="button"
              aria-label="Previous"
              className={cx(
                styles.liquidGlass,
                styles.animateBlurFadeUp,
                "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 sm:px-6 sm:py-3",
              )}
              style={{ animationDelay: "800ms" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next"
              className={cx(
                styles.liquidGlass,
                styles.animateBlurFadeUp,
                "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 sm:px-6 sm:py-3",
              )}
              style={{ animationDelay: "900ms" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
