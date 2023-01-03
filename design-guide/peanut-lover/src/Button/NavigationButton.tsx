/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import { BLUE, WHITE } from "../colors";

type Props = {
  /** 버튼의 클릭시 발생하는 함수 */
  onClick?: (e?: any) => void;
};

export const NavigationButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick
}) => {
    return <button css={[style]} onClick={onClick}>{children}</button>;
};

const style = css` 
  svg {
    width: 14px;
    margin-right: 8px;
  }
  outline: none;
  border: none;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.04);
  border-radius: 32px;
  padding: 16px 22px;
  background: ${WHITE};
  color: ${BLUE};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
    
  &:active {
    opacity: 0.5;
  }
`;
