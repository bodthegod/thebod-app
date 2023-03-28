import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  /*
    Handles user outside click from hamburger menu
    expanded is applied to user avatar & navbar dropdown menu
    to allow for navbar mobile functionality
  */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target?.classList.contains("expanded")) return;
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
