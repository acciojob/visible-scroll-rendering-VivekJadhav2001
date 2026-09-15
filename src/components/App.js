import React, { useState, useRef, useEffect } from "react";
import "./../styles/App.css";

const App = () => {
  // Create a large list of items
  const items = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: "Lorem ipsum dolor sit amet.",
  }));

  const containerRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);

  // Height of each item
  const ITEM_HEIGHT = 70;

  // Height of scroll container
  const CONTAINER_HEIGHT = 500;

  // Calculate which items should be visible
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const endIndex = Math.min(
    startIndex + visibleCount + 1,
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
        the visible items.
      </p>

      <p>
        This example uses <code>useRef</code> to track the scroll
        position and renders only the items currently visible.
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
          overflowY: "auto",
          width: "250px",
        }}
      >
        {/* Space for items above the visible area */}
        <div style={{ height: `${topSpacerHeight}px` }} />

        {/* Only visible items are rendered */}
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              height: `${ITEM_HEIGHT}px`,
              boxSizing: "border-box",
              padding: "10px 20px",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>
              {item.title}
            </h2>

            <p style={{ margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}

        {/* Space for items below the visible area */}
        <div style={{ height: `${bottomSpacerHeight}px` }} />
      </div>
    </div>
  );
};

export default App;
