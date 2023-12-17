import React, { memo } from "react";

type Props = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
};

const Button = memo(
  ({ id, className, style, onClick, children }: Props): React.JSX.Element => {
    return (
      <button
        id={id}
        className={`button ${className}`}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
