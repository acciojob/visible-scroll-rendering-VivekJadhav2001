import React, { useEffect, useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const containerRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);

  const items = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    title: `Item ${index}`,
    description: "Lorem ipsum dolor sit amet.",
  }));

  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 10;

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);

  const endIndex = Math.min(
    startIndex + VISIBLE_ITEMS,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>Visible Scroll Rendering</h1>

      <div
        ref={containerRef}
        style={{
          height: "500px",
          overflow: "auto",
        }}
      >
        {/* Space before visible items */}
        <div
          style={{
            height: `${startIndex * ITEM_HEIGHT}px`,
          }}
        />

        {/* Visible items */}
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              height: `${ITEM_HEIGHT}px`,
              boxSizing: "border-box",
            }}
          >
            <h2>{item.title}</h2>

            <p>{item.description}</p>
          </div>
        ))}

        {/* Space after visible items */}
        <div
          style={{
            height: `${(items.length - endIndex) * ITEM_HEIGHT}px`,
          }}
        />
      </div>
    </div>
  );
};

export default App;
