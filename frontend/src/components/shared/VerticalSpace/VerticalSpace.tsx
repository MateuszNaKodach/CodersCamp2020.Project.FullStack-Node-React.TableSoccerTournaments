import React from "react";

export const VerticalSpace = (props: { height: string | number }) => (
    <div style={{ minHeight: props.height }} />
);