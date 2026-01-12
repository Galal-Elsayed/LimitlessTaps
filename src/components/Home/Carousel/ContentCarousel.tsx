"use client";


import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";


interface CarouselItem {
  type: "video" | "image";
  src: string;
  alt: string;
  text?: React.ReactNode;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

interface ContentCarouselProps {
  items: CarouselItem[];
  textVariant?: "default" | "linear";
}

export default function ContentCarousel({ items, textVariant = "default" }: ContentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoStates, setVideoStates] = useState(items.map(() => ({ isPlaying: false })));
  const [videoLoading, setVideoLoading] = useState(items.map(() => true));
  const [isInView, setIsInView] = useState(false);
  const videosLoadedRef = useRef<Set<number>>(new Set());
  const hasInitializedRef = useRef(false);
  const isScrollingRef = useRef(false);

  // Pre-buffer first video on mount
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const preBufferFirst = () => {
      const firstVideo = videoRefs.current[0];
      if (firstVideo && firstVideo.readyState === 0) {
        firstVideo.preload = "auto";
        firstVideo.load();
      }
    };

    const timer = setTimeout(preBufferFirst, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer to handle out-of-view pausing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Pause all videos when out of view
          videoRefs.current.forEach(video => {
            if (video) video.pause();
          });
          setVideoStates(prev => prev.map(() => ({ isPlaying: false })));
        } else {
          // Optionally resume active video when coming back into view?
          // For now, let's just update state to reflect active index is "ready" to play if needed
          // But user might prefer manual resume or auto-resume. 
          // Let's trigger a state update that the effect below will catch if we want auto-play.
          // Actually, the effect below depends on activeIndex. 
          // We can toggle the active one to play if it was supposed to be playing.
          setVideoStates(prev => prev.map((s, i) => ({ isPlaying: i === activeIndex })));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex]);

  // Handle scroll to update active index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Skip scroll update if we're programmatically scrolling
      if (isScrollingRef.current) return;

      const scrollLeft = container.scrollLeft;
      const itemWidth = container.clientWidth < 768 ? container.clientWidth * 0.85 : container.clientWidth * 0.25;
      const gap = 24;
      const totalItemWidth = itemWidth + gap;

      const index = Math.round(scrollLeft / totalItemWidth);
      const clampedIndex = Math.min(Math.max(index, 0), items.length - 1);
      setActiveIndex(clampedIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  // Auto-play active video with robust buffering handling
  useEffect(() => {
    if (!isInView) return; // Don't auto-play if not in view

    // When active index changes, ensure the previous videos are paused and reset
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) return; // keep handling for active below
      try {
        video.pause();
        video.currentTime = 0;
      } catch { }
    });

    const current = videoRefs.current[activeIndex];
    if (!current) return;

    // Ensure video is loaded
    if (current.readyState === 0) {
      current.load();
    }

    // Preload only the next video to save bandwidth
    const nextIndex = (activeIndex + 1) % items.length;
    const nextVid = videoRefs.current[nextIndex];
    if (nextVid && nextVid.readyState === 0 && nextIndex !== activeIndex) {
      nextVid.preload = "auto";
      nextVid.load();
    }

    const markLoaded = () => {
      if (!videosLoadedRef.current.has(activeIndex)) {
        videosLoadedRef.current.add(activeIndex);
      }
    };

    const attemptPlay = () => {
      if (!isInView) return;
      current.playbackRate = 1.0; // Ensure normal playback rate
      current.play().catch(() => { });
      markLoaded();
    };

    // Handle loading state and video playback based on readyState
    const handleVideoReady = () => {
      if (current.readyState >= 2) {
        current.playbackRate = 1.0;
        setVideoLoading(prev => {
          const copy = [...prev];
          copy[activeIndex] = false;
          return copy;
        });
        setVideoStates(prev => prev.map((s, i) => ({ isPlaying: i === activeIndex })));
        attemptPlay();
      } else {
        setVideoLoading(prev => {
          const copy = [...prev];
          copy[activeIndex] = true;
          return copy;
        });
        // Listen for when video becomes ready
        const onCanPlay = () => {
          setVideoLoading(prev => {
            const copy = [...prev];
            copy[activeIndex] = false;
            return copy;
          });
          setVideoStates(prev => prev.map((s, i) => ({ isPlaying: i === activeIndex })));
          attemptPlay();
        };
        current.addEventListener('canplay', onCanPlay, { once: true });
        return () => current.removeEventListener('canplay', onCanPlay);
      }
    };

    return handleVideoReady();
  }, [activeIndex, isInView, items.length]);

  // Removed redundant useEffect - video state is now handled in the main effect above

  // Sync actual video play/pause with state
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex && videoStates[index]?.isPlaying) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [videoStates, activeIndex]);


  const toggleVideo = (index: number) => {
    setVideoStates(prev => {
      const newStates = [...prev];
      newStates[index] = { isPlaying: !newStates[index].isPlaying };
      return newStates;
    });
    // scroll to the item to ensure it's visible when toggled
    scrollToIndex(index);
    const v = videoRefs.current[index];
    if (!v) return;
    if (videoLoading[index]) return; // wait until buffered
    // play or pause based on current play state
    setTimeout(() => {
      try {
        v.playbackRate = 0.1; // Reset playback rate
        if (v.paused) v.play().catch(() => { });
        else v.pause();
      } catch { }
    }, 30);
  };

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    // Always allow scroll to proceed - update activeIndex immediately
    // This prevents the double-click bug caused by stale state checks
    setActiveIndex(index);

    // Mark that we're programmatically scrolling to prevent scroll listener from 
    // updating activeIndex based on partial scroll position during animation
    isScrollingRef.current = true;

    const item = container.children[index] as HTMLElement;
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }

    // Keep flag set until smooth scroll animation completes (~500ms)
    // This prevents the scroll listener from interfering with our programmatic scroll
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 550);
  };

  const goToPrevious = () => {
    const newIndex = activeIndex - 1;
    if (newIndex >= 0) {
      scrollToIndex(newIndex);
    } else {
      // Loop to the end
      scrollToIndex((items.length + newIndex) % items.length);
    }
  };

  const goToNext = () => {
    const newIndex = activeIndex + 1;
    if (newIndex < items.length) {
      scrollToIndex(newIndex);
    } else {
      // Loop to the beginning
      scrollToIndex(newIndex % items.length);
    }
  };

  return (
    <div className="w-full relative">
      {/* Outer wrapper with the side padding - items will slide under this */}
      <div className="relative">
        {/* Scrollable container - extends full width, items peek from edges */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            // Add scroll padding so snapping accounts for the visual margins
            scrollPaddingLeft: "clamp(4rem, 20vw, 16rem)",
            scrollPaddingRight: "clamp(4rem, 20vw, 16rem)",
          }}
        >
          {/* Spacer for left margin - pushes first item into view */}
          <div className="shrink-0 w-[clamp(4rem,20vw,16rem)]" aria-hidden="true" />

          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col shrink-0 w-[60vw] md:w-[30vw] snap-center h-auto"
            >
              <div className="relative w-full aspect-[9/16] md:aspect-auto md:h-[70vh] rounded-2xl overflow-hidden bg-black group">
                {item.type === "video" ? (
                  <>
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover"
                      muted={item.muted ?? true} // Default to true if autoPlay is on
                      loop={item.loop ?? false}
                      playsInline
                      preload={index <= 1 ? "auto" : "metadata"}
                      controlsList="nodownload"
                      crossOrigin="anonymous"
                      disablePictureInPicture
                      disableRemotePlayback
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      onEnded={() => {
                        if (item.loop) return; // Let loop handle it
                        if (activeIndex === items.length - 1) scrollToIndex(0);
                        else goToNext();
                      }}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>

                    {/* Play/Pause Button - Hide if autoPlay is true */}
                    {!item.autoPlay && (
                      <button
                        onClick={() => toggleVideo(index)}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                      >
                        {videoStates[index]?.isPlaying ? (
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <rect width="3" height="14" rx="1.5" fill="white" />
                            <rect x="9" width="3" height="14" rx="1.5" fill="white" />
                          </svg>
                        ) : (
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-0.5">
                            <path d="M11 7L1 13.0622L1 0.937822L11 7Z" fill="white" />
                          </svg>
                        )}
                      </button>
                    )}

                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 60vw, 30vw"
                  />
                )}
              </div>

              {/* Text below the item */}
              <div className="mt-6 text-center md:text-left">
                <div className={`text-sm md:text-base font-medium leading-relaxed font-[family-name:var(--font-sf-text)] ${textVariant === 'linear'
                  ? 'text-transparent bg-clip-text bg-linear-to-r from-[#ffeebb] to-[#dcb076]'
                  : 'text-[#86868B]'
                  }`}>
                  {item.text}
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for right margin - allows last item to be centered */}
          <div className="shrink-0 w-[clamp(4rem,20vw,16rem)]" aria-hidden="true" />
        </div>
      </div>

      {/* Navigation Arrows - hidden on mobile */}
      <div className={`absolute -bottom-12 gap-3 z-20 hidden md:flex ${isRTL ? 'left-6 md:left-12' : 'right-6 md:right-12'}`}>
        <button
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/10 flex items-center justify-center transition-all duration-300 group"
          aria-label="Previous"
        >
          <svg width="8" height="12" viewBox="0 0 10 16" fill="none" className={`opacity-70 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`}>
            <path d="M8 2L2 8L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="w-10 h-10 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-white/10 flex items-center justify-center transition-all duration-300 group"
          aria-label="Next"
        >
          <svg width="8" height="12" viewBox="0 0 10 16" fill="none" className={`opacity-70 group-hover:opacity-100 transition-opacity ${isRTL ? 'rotate-180' : ''}`}>
            <path d="M2 2L8 8L2 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
