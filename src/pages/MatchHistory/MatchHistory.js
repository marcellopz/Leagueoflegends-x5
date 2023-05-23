import React, { useEffect, useMemo, useState } from "react";
import { getMatches } from "../../services/firebaseDatabase";
import MatchDisplay from "./MatchDisplay/MatchDisplay";

export default function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const matchKeys = useMemo(() => Object.keys(matches).reverse(), []);
  const [numberOfMatches, setNumberOfMatches] = useState(7);

  useEffect(() => {
    getMatches().then((ms) => setMatches(ms));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      // Check if the user has reached the end of the page
      if (scrollPosition + windowHeight >= documentHeight) {
        setNumberOfMatches((prev) => prev + 5);
        // Perform any action you need here, such as loading more content
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1600px" }}>
        {matchKeys.slice(0, numberOfMatches).map((key) => (
          <div
            style={{
              margin: "20px",
            }}
            key={key}
          >
            <MatchDisplay match={matches[key]} />
          </div>
        ))}
      </div>
    </div>
  );
}
