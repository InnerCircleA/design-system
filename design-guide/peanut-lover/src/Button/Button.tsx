/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { BLUE, BLUE_DARK, BLUE_LIGHT, BLUE_STROKE, WHITE } from "../colors";

type Props = {
  /** theme는 버튼의 중요도를 나트내는 표시 */
  theme: "primary" | "secondary";
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  theme,
  children,
}) => {
  return <button css={[style, themes[theme]]}>{children}</button>;
};

const themes = {
  primary: css`
    background: ${BLUE};
    color: ${WHITE};
    &:hover {
      background: ${BLUE_DARK};
    }
    &:active {
      opacity: 0.5;
    }
    &:disabled {
      background: ${BLUE_STROKE};
    }
  `,
  secondary: css`
    background: ${BLUE_LIGHT};
    color: ${BLUE};
    &:hover {
      background: ${BLUE};
      color: ${WHITE};
    }
    &:active {
      opacity: 0.5;
    }
    &:disabled {
      background: ${BLUE_STROKE};
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
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;
