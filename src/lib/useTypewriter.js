import { useCallback, useEffect, useRef, useState } from "react";

const TYPE_DELAY = 88;
const DELETE_DELAY = 45;
const HOLD_DELAY = 1500;
const EMPTY_DELAY = 260;
const PROGRESS_TICK = 50;

export function useTypewriter(phrases, { enabled, paused }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);
  const [progressState, setProgressState] = useState({
    phraseIndex: 0,
    value: 0,
  });

  const timerIdRef = useRef(null);
  const timeoutRef = useRef({
    remaining: null,
    startedAt: null,
  });
  const progressStartedAtRef = useRef(null);
  const progressInactiveStartedAtRef = useRef(null);
  const progressPhraseIndexRef = useRef(null);
  const pausedRef = useRef(paused);
  const cycleMsRef = useRef(0);

  const activePhrase = phrases[phraseIndex] ?? phrases[0] ?? "";

  useEffect(() => {
    if (!enabled || paused) return undefined;

    const timeoutState = timeoutRef.current;
    const phrase = phrases[phraseIndex] ?? phrases[0] ?? "";
    const isComplete = displayedLength === phrase.length;
    const isEmpty = displayedLength === 0;
    const delay = isDeleting
      ? (isEmpty ? EMPTY_DELAY : DELETE_DELAY)
      : (isComplete ? HOLD_DELAY : TYPE_DELAY);
    const remaining = timeoutState.remaining ?? delay;

    timeoutState.remaining = remaining;
    timeoutState.startedAt = performance.now();

    const timer = window.setTimeout(() => {
      timerIdRef.current = null;
      timeoutState.remaining = null;
      timeoutState.startedAt = null;

      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setDisplayedLength((current) => current + (isDeleting ? -1 : 1));
    }, remaining);
    timerIdRef.current = timer;

    return () => {
      window.clearTimeout(timer);
      if (timerIdRef.current === timer) timerIdRef.current = null;

      if (timeoutState.startedAt !== null) {
        const elapsed = performance.now() - timeoutState.startedAt;
        timeoutState.remaining = Math.max(
          0,
          (timeoutState.remaining ?? delay) - elapsed,
        );
        timeoutState.startedAt = null;
      }
    };
  }, [cycleVersion, displayedLength, enabled, isDeleting, paused, phraseIndex, phrases]);

  useEffect(() => {
    pausedRef.current = paused;
    cycleMsRef.current = activePhrase.length * 133 + 1760;
  }, [activePhrase.length, paused]);

  useEffect(() => {
    if (!enabled) {
      if (
        progressStartedAtRef.current !== null
        && progressInactiveStartedAtRef.current === null
      ) {
        progressInactiveStartedAtRef.current = performance.now();
      }
      return;
    }

    if (progressPhraseIndexRef.current !== phraseIndex) {
      progressPhraseIndexRef.current = phraseIndex;
      progressStartedAtRef.current = performance.now();
      progressInactiveStartedAtRef.current = paused ? performance.now() : null;
      return;
    }

    if (paused && progressInactiveStartedAtRef.current === null) {
      progressInactiveStartedAtRef.current = performance.now();
    } else if (!paused && progressInactiveStartedAtRef.current !== null) {
      progressStartedAtRef.current += performance.now() - progressInactiveStartedAtRef.current;
      progressInactiveStartedAtRef.current = null;
    }
  }, [enabled, paused, phraseIndex]);

  useEffect(() => {
    if (!enabled) return undefined;

    const interval = window.setInterval(() => {
      if (pausedRef.current || progressStartedAtRef.current === null) return;

      const elapsed = performance.now() - progressStartedAtRef.current;
      setProgressState({
        phraseIndex: progressPhraseIndexRef.current,
        value: Math.min(1, elapsed / cycleMsRef.current),
      });
    }, PROGRESS_TICK);

    return () => window.clearInterval(interval);
  }, [enabled]);

  const goTo = useCallback((index) => {
    if (phrases.length === 0) return;

    const nextIndex = ((index % phrases.length) + phrases.length) % phrases.length;

    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }

    timeoutRef.current.remaining = null;
    timeoutRef.current.startedAt = null;
    progressPhraseIndexRef.current = nextIndex;
    progressStartedAtRef.current = performance.now();
    progressInactiveStartedAtRef.current = enabled && !paused
      ? null
      : performance.now();

    setDisplayedLength(0);
    setIsDeleting(false);
    setPhraseIndex(nextIndex);
    setProgressState({ phraseIndex: nextIndex, value: 0 });
    setCycleVersion((current) => current + 1);
  }, [enabled, paused, phrases.length]);

  if (!enabled) {
    return {
      text: phrases[0] ?? "",
      phraseIndex: 0,
      progress: 1,
      goTo,
    };
  }

  return {
    text: activePhrase.slice(0, displayedLength),
    phraseIndex,
    progress: progressState.phraseIndex === phraseIndex
      ? progressState.value
      : 0,
    goTo,
  };
}
