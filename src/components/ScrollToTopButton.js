import React, { useEffect, useState } from "react";
import styles from "../styles/ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`${styles.Button} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
    >
      <span><i class="fa-solid fa-circle-arrow-up"></i></span>
    </button>
  );
};

export default ScrollToTopButton;
