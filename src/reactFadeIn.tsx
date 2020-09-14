import React, { useEffect, useState } from "react";
import handleViewport from "./utils/handleViewport";
import DefaultProps from "./utils/handleViewport"

interface FadeInProps {
    className?: string
    childClassName?: string
    delay?: number
    transitionDuration?: number
    inViewport: boolean
    enterCount: number
    forwardedRef: string
}

const Fade: React.FC<FadeInProps> = x => {
    const { className, childClassName, delay = 300, transitionDuration = 800, children, inViewport, enterCount, forwardedRef } = x;
    const [maxIsVisible, setMaxIsVisible] = useState(0);

    useEffect(() => {
        const childrenCount = React.Children.count(children);
        if (inViewport) {
            const interval = setInterval(() => {
                setMaxIsVisible(count => {
                    if (count >= childrenCount) clearInterval(interval);
                    return count + 1;
                });
            }, delay);
            return () => clearInterval(interval);
        }
    }, [inViewport]);

    const getStyle = (i: number) => {
        if (inViewport && enterCount === 1) {
            return {
                transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                transform: `translateY(${maxIsVisible > i ? 0 : 20}px)`,
                opacity: maxIsVisible > i ? 1 : 0
            };
        } else if (!inViewport && enterCount < 1) {
            return {
                opacity: 0,
                transform: "none"
            };
        } else {
            return {};
        }
    };

    return (
        <div className={className}>
            { React.Children.map(children, (child, i) => {
                return (
                    <div
                        ref={forwardedRef}
                        className={childClassName}
                        style={getStyle(i)}>
                        { child }
                    </div>
                );
            }) }
        </div>
    );
};

const FadeIn = handleViewport(Fade, {});

export default FadeIn;