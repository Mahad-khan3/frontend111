"use client";

import { useRef, useEffect, useState, type ElementType } from "react";

export function AnimatedHeading({
  as: Tag = "h2",
  className = "",
  children,
  ...props
}: {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
} & React.JSX.IntrinsicElements[typeof Tag]) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`heading-animate ${visible ? "is-visible" : ""} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
