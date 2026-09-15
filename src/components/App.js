import React, { useEffect, useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const containerRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);

  // 100 items: Item 0 -> Item 99
  const items = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    title: `Item ${index}`,
    description: "Lorem ipsum dolor sit amet.",
  }));

  // Scroll container is 500px
  // 10 items are visible at a time
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

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const topSpacerHeight = startIndex * ITEM_HEIGHT;

  const bottomSpacerHeight =
    (items.length - endIndex) * ITEM_HEIGHT;

  return (
    <div>
      <h1>Visible Scroll Rendering</h1>

      <hr />

      <p>
        Suppose you have a component that renders a large list of
        items, and you want to optimize performance by only rendering
        the visible items. How would you use the useRef hook to keep
        track of the scroll position, and only render the items that
        are currently visible
      </p>

      <h3>
        <u>NOTE:</u>
      </h3>

      <p>
        Note use <code>height : "500px"</code> for scroll container.
      </p>

      <div
        ref={containerRef}
        style={{
          height: "500px",
          overflow: "auto",
        }}
      >
        {/* Space occupied by items above the visible items */}
        <div style={{ height: `${topSpacerHeight}px` }} />

        {/* Only 10 visible items are rendered */}
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              height: `${ITEM_HEIGHT}px`,
              boxSizing: "border-box",
              padding: "5px 20px",
            }}
          >
            <h2 style={{ margin: "0" }}>
              {item.title}
            </h2>

            <p style={{ margin: "5px 0 0" }}>
              {item.description}
            </p>
          </div>
        ))}

        {/* Space occupied by items below the visible items */}
        <div style={{ height: `${bottomSpacerHeight}px` }} />
      </div>
    </div>
  );
};

export default App;
