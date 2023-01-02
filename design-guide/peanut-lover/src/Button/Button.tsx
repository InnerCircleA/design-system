/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import {
  BLUE,
  BLUE_DARK,
  BLUE_LIGHT,
  BLUE_STROKE,
  RED,
  SALMON,
  WHITE,
} from "../colors";

type Props = {
  /** theme는 버튼의 중요도를 나트내는 표시 */
  theme: "primary" | "secondary" | "negative";
  /** 버튼의 너비를 임의로 설정합니다. */
  width?: string | number;
  /** 버튼의 사이즈 */
  size?: "small" | "medium" | "big"
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  theme,
  size = "medium",
  children,
  width,
}) => {
  return <button css={[style, themes[theme], sizes[size], { width }]}>{children}</button>;
};
 
const sizes = {
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  big: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 16px 1.5rem;
  `,
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
  negative: css`
    background: ${SALMON};
    color: ${RED};
    &:active {
      opacity: 0.5;
    }
    &:disabled {
      opacity: 0.5;
    }
  `,
};

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 16px;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;
