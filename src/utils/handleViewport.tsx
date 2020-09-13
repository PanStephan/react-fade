import React, { useRef, forwardRef } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import useInViewport from './useInViewport';

interface InViewportProps {
    onEnterViewport: () => void
    onLeaveViewport: () => void
    ForwardedRefComponent: React.ComponentType
}

interface DefaultProps {
    className?: string
    childClassName?: string
    delay?: number
    transitionDuration?: number
}

interface HandleViewportProps {
    ( TargetComponent: React.ComponentType<any>, config: { disconnectOnLeave?: boolean }): React.FC<DefaultProps>
}

interface ForwardedRefComponentProps {
    inViewport: boolean
    enterCount: number
    leaveCount: number
    ref: Element
}

const noop = () => {};

const isFunctionalComponent = (Component: React.ComponentType) => {
    return typeof Component === "function" && !(Component.prototype && Component.prototype.render);
};

const isReactComponent = (Component: React.ComponentType) => {
    return Component.prototype && Component.prototype.isReactComponent;
};

// @ts-ignore
const handleViewport: HandleViewportProps = ( TargetComponent, config = { disconnectOnLeave: false }) => {
    const ForwardedRefComponent = forwardRef<ForwardedRefComponentProps>((props, ref) => {
        const refProps = {
            forwardedRef: ref,
            ...(isReactComponent(TargetComponent) && !isFunctionalComponent(TargetComponent)
                ? {
                    ref
                }
                : {})
        };
        return <TargetComponent {...props} {...refProps} />;
    });

    const InViewport: React.FC<InViewportProps> = ({ onEnterViewport = noop, onLeaveViewport = noop, ...restProps }) => {
        const node = useRef<Element>();
        // @ts-ignore
        const { inViewport, enterCount, leaveCount } = useInViewport(node, config, {
            onEnterViewport,
            onLeaveViewport
        });
        return (
            <ForwardedRefComponent
                {...restProps}
                enterCount={enterCount}
                inViewport={inViewport}
                leaveCount={leaveCount}
                // @ts-ignore
                ref={node}
            />
        );
    };

    const name = TargetComponent.displayName || TargetComponent.name || 'Component';
    InViewport.displayName = `handleViewport(${name})`;

    return hoistNonReactStatic(InViewport, ForwardedRefComponent);
}

export default handleViewport;