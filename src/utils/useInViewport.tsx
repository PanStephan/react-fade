import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";

interface useInViewportPros {
    (
        target: {
            current: Element
        },
        config: { disconnectOnLeave?: boolean },
        props: { onEnterViewport: () => void, onLeaveViewport: () => void }
    ): {
        inViewport: boolean
        enterCount: number
        leaveCount: number
    }
}

const useInViewport: useInViewportPros = (target, config = { disconnectOnLeave: false }, props) => {
    const { onEnterViewport, onLeaveViewport } = props;
    const [, forceUpdate] = useState(false);

    const observer = useRef<IntersectionObserver | null>();

    const inViewportRef = useRef(false);
    const intersected = useRef(false);

    const enterCountRef = useRef(0);
    const leaveCountRef = useRef(0);

    function startObserver() {
        if (!target) return
        if (target.current && observer.current) {
            const node = findDOMNode(target.current);
            if (node) {
                if (node instanceof Element)
                    observer.current.observe(node);
            }
        }
    }

    function stopObserver() {
        if (!target) return
        if (target.current && observer.current) {
            const node = findDOMNode(target.current);
            if (node) {
                if (node instanceof Element)
                observer.current.unobserve(node);
                observer.current.disconnect();
                observer.current = null;
            }
        }
    }

    function handleIntersection(entries : IntersectionObserverEntry[]) {
        const entry = entries[0] || {};
        const { isIntersecting, intersectionRatio } = entry;
        const isInViewport = typeof isIntersecting !== 'undefined' ? isIntersecting : intersectionRatio > 0;

        if (!intersected.current && isInViewport) {
            intersected.current = true;
            onEnterViewport && onEnterViewport();
            enterCountRef.current += 1;
            inViewportRef.current = isInViewport;
            forceUpdate(isInViewport);
            return;
        }

        if (intersected.current && !isInViewport) {
            intersected.current = false;
            onLeaveViewport && onLeaveViewport();
            if (config.disconnectOnLeave && observer.current) {
                observer.current.disconnect();
            }
            leaveCountRef.current += 1;
            inViewportRef.current = isInViewport;
            forceUpdate(isInViewport);
        }
    }

    function initIntersectionObserver() {
        if (!observer.current) {
            observer.current = new IntersectionObserver(handleIntersection);
        }
    }

    useEffect(
        () => {
            initIntersectionObserver();
            startObserver();

            return () => {
                stopObserver();
            };
        },
        [target, config, onEnterViewport, onLeaveViewport]
    );

    return {
        inViewport: inViewportRef.current,
        enterCount: enterCountRef.current,
        leaveCount: leaveCountRef.current
    };
};

export default useInViewport;