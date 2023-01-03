/** @jsxImportSource @emotion/react */

import { PropsWithChildren } from "react";
import { BLACK } from "../colors";
import * as icons from "./svg";

type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as any[]; // 스토리에서 불러오기위함.

export type Props = {
  /** 사용 할 아이콘 타입 */
  icon:  IconType;
  /** 아이콘 색상 */
  color?: string;
  /** 아이콘 크기 */
  size?: string | number; 
  className?: string;
};

export const Icon: React.FC<PropsWithChildren<Props>> = ({
    icon,
    color,
    size = "24px",
    className,
  }) => {
  const SVGIcon = icons[icon];
  if (SVGIcon === undefined) return null;
    return (
      <SVGIcon
        css={{ fill: color || "currentColor", storke: color || "currentColor", width: size, height: "auto" }}
        className={className}
      />
    );
  };
   
  