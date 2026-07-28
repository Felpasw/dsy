"use client";

import { motion } from "framer-motion";
import { FastForward, Rewind } from "lucide-react";
import { useEffect, useState } from "react";

export interface CarouselItem {
  id: number;
  title: string;
}

type InfiniteItem = {
  id: string;
  title: string;
  originalIndex: number;
};

const SET_COUNT = 3;
const ITEM_WIDTH_PX = 400;
const ITEM_GAP_PX = 100;
const ITEM_STRIDE_PX = ITEM_WIDTH_PX + ITEM_GAP_PX;

const createInfiniteItems = (originalItems: CarouselItem[]): InfiniteItem[] => {
  const items: InfiniteItem[] = [];
  for (let copy = 0; copy < SET_COUNT; copy++) {
    originalItems.forEach((item, index) => {
      items.push({
        id: `${copy}-${item.id}`,
        title: item.title,
        originalIndex: index,
      });
    });
  }
  return items;
};

type RulerLinesProps = {
  top?: boolean;
  totalLines?: number;
};

const RulerLines = ({ top = true, totalLines = 100 }: RulerLinesProps) => {
  const lineSpacing = 100 / (totalLines - 1);
  const centerIndex = Math.floor(totalLines / 2);
  const positionClass = top ? "" : "bottom-0";

  const resolveLineStyle = (i: number) => {
    if (i === centerIndex) {
      return { height: "h-8", color: "bg-primary dark:bg-white" };
    }
    if (i % 5 === 0) {
      return { height: "h-4", color: "bg-primary dark:bg-white" };
    }
    return { height: "h-3", color: "bg-gray-500 dark:bg-gray-400" };
  };

  const lines = Array.from({ length: totalLines }, (_, i) => {
    const { height, color } = resolveLineStyle(i);
    return (
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${color} ${positionClass}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  });

  return <div className="relative w-full h-8 px-4">{lines}</div>;
};

type RulerCarouselProps = {
  originalItems: CarouselItem[];
};

export function RulerCarousel({ originalItems }: RulerCarouselProps) {
  const infiniteItems = createInfiniteItems(originalItems);
  const itemsPerSet = originalItems.length;
  const centerPosition = Math.floor(itemsPerSet / 2);
  const initialActiveIndex = itemsPerSet + centerPosition;

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isResetting, setIsResetting] = useState(false);

  const handleItemClick = (newIndex: number) => {
    if (isResetting) return;
    const targetOriginalIndex = newIndex % itemsPerSet;
    const possibleIndices = [
      targetOriginalIndex,
      targetOriginalIndex + itemsPerSet,
      targetOriginalIndex + itemsPerSet * 2,
    ];

    let closestIndex = possibleIndices[0];
    let smallestDistance = Math.abs(possibleIndices[0] - activeIndex);
    for (const index of possibleIndices) {
      const distance = Math.abs(index - activeIndex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    }
    setActiveIndex(closestIndex);
  };

  const handlePrevious = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (isResetting) return;

    const needsResetLeft = activeIndex < itemsPerSet;
    const needsResetRight = activeIndex >= itemsPerSet * 2;
    if (!needsResetLeft && !needsResetRight) return;

    const jump = needsResetLeft ? itemsPerSet : -itemsPerSet;

    const enterReset = setTimeout(() => {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex((prev) => prev + jump);
        setIsResetting(false);
      }, 0);
    }, 0);

    return () => clearTimeout(enterReset);
  }, [activeIndex, itemsPerSet, isResetting]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isResetting) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => prev - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetting]);

  const targetX =
    -ITEM_WIDTH_PX + (centerPosition - (activeIndex % itemsPerSet)) * ITEM_STRIDE_PX;

  const currentPage = (activeIndex % itemsPerSet) + 1;
  const totalPages = itemsPerSet;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background dark:bg-black">
      <div className="w-full h-[200px] flex flex-col justify-center relative">
        <div className="flex items-center justify-center">
          <RulerLines top />
        </div>
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          <motion.div
            className="flex items-center gap-[100px]"
            animate={{ x: targetX }}
            transition={
              isResetting
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 20, mass: 1 }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;
              const buttonColor = isActive
                ? "text-primary dark:text-white"
                : "text-muted-foreground dark:text-gray-500 hover:text-foreground dark:hover:text-gray-400";
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(index)}
                  className={`text-4xl md:text-6xl font-bold whitespace-nowrap cursor-pointer flex items-center justify-center ${buttonColor}`}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 25 }
                  }
                  style={{ width: `${ITEM_WIDTH_PX}px` }}
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="flex items-center justify-center">
          <RulerLines top={false} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Previous item"
        >
          <Rewind className="w-5 h-5 text-primary/80" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">
            {currentPage}
          </span>
          <span className="text-sm text-muted-foreground dark:text-gray-500">/</span>
          <span className="text-sm font-medium text-muted-foreground dark:text-gray-400">
            {totalPages}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Next item"
        >
          <FastForward className="w-5 h-5 text-primary/80" />
        </button>
      </div>
    </div>
  );
}
