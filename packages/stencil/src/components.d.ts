/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IdTag, IRelativePlaylistItem } from "@pluto-music/api";
export { IdTag, IRelativePlaylistItem } from "@pluto-music/api";
export namespace Components {
    interface MyComponent {
        "playlist": IRelativePlaylistItem;
    }
}
export interface MyComponentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMyComponentElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * 播放全部按钮
         */
        "onPlay-all"?: (event: MyComponentCustomEvent<any>) => void;
        /**
          * 跳转到 playlist 页面
         */
        "onTo-playlist"?: (event: MyComponentCustomEvent<{ id: IdTag }>) => void;
        "playlist"?: IRelativePlaylistItem;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}