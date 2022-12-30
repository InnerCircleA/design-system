/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

type Props = {
  primary?: boolean;
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  primary,
  children,
}) => {
  const buttonTheme = primary ? theme["primary"] : undefined;
  return <button css={[style, buttonTheme]}>{children}</button>;
};

const theme = {
  primary: css`
    background: #20c997;
    color: white;
    svg {
      fill: white;
    }
    &:hover {
      background: #38d9a9;
    }
    &:active {
      background: #12b886;
    }
    &:disabled {
      background: #aed9cc;
    }
  `,
};
const style = css`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: #20c997;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background: #38d9a9;
  }
  &:active {
    background: #12b886;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
