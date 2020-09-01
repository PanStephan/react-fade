import React, { useEffect, useState } from "react";

interface FadeInProps {
    className?: string
    childClassName?: string
    delay?: number
    transitionDuration?: number
    children: React.ReactNode
}

export const FadeIn: React.FC<FadeInProps> = x => {
    const { className, childClassName, delay = 50, transitionDuration = 400, children } = x
    const [maxIsVisible, setMaxIsVisible] = useState(0);

    useEffect(() => {
        const childrenCount = React.Children.count(children);
        const interval = setInterval(() => {
                setMaxIsVisible((count) => {
                    if (count >= childrenCount) clearInterval(interval);
                    return count + 1;
                });
        }, delay);

        return () => clearInterval(interval);
    }, []);

    return (
          <div className={className}>
                { React.Children.map(children, (child, i) => {
                      return (
                          <div
                              className={childClassName}
                              style={{
                                    transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                                    transform: `translateY(${maxIsVisible > i ? 0 : 20}px)`,
                                    opacity: maxIsVisible > i ? 1 : 0,
                              }}
                          >
                            {child}
                          </div>
                      );
                }) }
          </div>
    );
};