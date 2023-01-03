/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { BLACK, BLUE, GREY_LIGHT, WHITE } from "../colors";

type Props = {
  /** theme는 버튼의 중요도를 나트내는 표시 */
  theme?: "primary" | "secondary";
};

export const FullButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme = "primary",
}) => {
  return <button css={[style, themes[theme]]}>{children}</button>;
};

const themes = {
  primary: css`
    background: ${BLUE};
    color: ${WHITE};
    &:active {
      opacity: 0.5;
    }
  `,
  secondary: css`
    background: ${GREY_LIGHT};
    color: ${BLACK};
    &:active {
      opacity: 0.5;
    }
  `,
};
const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  font-size: 1.125rem;
  padding: 16px 1.5rem;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;
