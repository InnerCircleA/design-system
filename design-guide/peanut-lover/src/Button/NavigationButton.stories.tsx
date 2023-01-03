/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BLUE, GREY_EXLIGHT, GREY_LIGHT, WHITE } from "../colors";
import { Icon } from "../icon";

import { NavigationButton } from "./NavigationButton";

export default {
  title: "Components/NavigationButton",
  component: NavigationButton,
} as ComponentMeta<typeof NavigationButton>;

const Template: ComponentStory<typeof NavigationButton> = (args: any) => (
  <NavigationButton {...args} />
);

export const navigatonButton: ComponentStory<typeof NavigationButton> = () => (
  <NavigationButton>확인</NavigationButton>
);

navigatonButton.story = {
  name: "Default",
};

const buttonHorizontalWrapper = css`
  display: inline-block;
  padding: 20px;
  background: ${GREY_LIGHT};
  & > div {
    display: inline-block;
    margin-right: 2rem;
  }
  .description {
    color: ${BLUE};
    display: flex;
    justify-content:center;
    margin-bottom: 4px;
  }
`;

export const navigationButtonWithIcon = () => {
  return (
    <div css={buttonHorizontalWrapper}>
      <div>
        <div className="description">Min Length: 4</div>
        <NavigationButton>
          <Icon icon="add" color={BLUE} />
          예약하기
        </NavigationButton>
      </div>
      <div>
        <div className="description">Best</div>
        <NavigationButton>
          <Icon icon="gift" color={BLUE} />
          친구 추천하기
        </NavigationButton>
      </div>
      <div>
        <div className="description">Max Length: 12</div>
        <NavigationButton>
          <Icon icon="add" color={BLUE} />홈 서비스 받아보세요
        </NavigationButton>
      </div>
    </div>
  );
};
