import { useEffect, useCallback, useRef } from "react";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  // useRef for the timer, so it persists between renders
  const timerRef = useRef(null);

  // resetTimer is memoized so that it has a stable reference
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // logoutAction can be memoized as well
  const logoutAction = useCallback(() => {
    localStorage.clear();
    window.location.pathname = "/login";
  }, []);

  // handleTimer is memoized and depends on resetTimer
  const handleTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      resetTimer();
      logoutAction();
    }, 5000000);
  }, [resetTimer, logoutAction]);



  // Attach event listeners once on mount and clean up on unmount.
  useEffect(() => {
    // A single event handler that resets the timer and starts a new one
    const eventHandler = () => {
      resetTimer();
      handleTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, eventHandler);
    });

    // Clean up the event listeners when component unmounts.
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventHandler);
      });
      resetTimer();
    };
  }, [resetTimer, handleTimer]);

  return children;
};

export default AppLogout;
