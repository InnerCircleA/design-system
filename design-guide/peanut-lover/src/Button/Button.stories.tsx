/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GREY_EXLIGHT, GREY_LIGHT } from "../colors";
import { Button } from "./Button"; 

export default {
  title: "Components/Button",
  component: Button, 
} as ComponentMeta<typeof Button>;

const Template = (args: any) => <Button {...args} />;

export const button: ComponentStory<typeof Button> = Template.bind({});
button.args = {
  theme: "primary",
  children: "버튼",
};
button.story = {
  name: "Default",
};

export const Primary: ComponentStory<typeof Button> = () => (
  <Button theme="primary">확인</Button>
);

export const Secondary: ComponentStory<typeof Button> = () => (
  <Button theme="secondary">나중에 확인</Button>
);

export const Negative: ComponentStory<typeof Button> = () => (
  <Button theme="negative"> 취소</Button>
);

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

export const sizes = () => {
  return (
    <div css={buttonWrapper}>
      <div>
        <div className="description">Small</div>
        <Button theme="secondary" size="small">
          Button
        </Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button theme="secondary" size="medium">
          Button
        </Button>
      </div>
      <div>
        <div className="description">Big</div>
        <Button theme="secondary" size="big">
          Button
        </Button>
      </div>
    </div>
  );
};

export const customWidth = () => {
  return (
    <div css={buttonWrapper}>
      <div>
        <div className="description">Custom Size</div>
        <Button theme="secondary" width={"20rem"} size="big">
          Custom Size
        </Button>
      </div>
      <div>
        <div className="description">Full</div>
        <Button theme="secondary" width={"100%"} size="big">
          Full Button
        </Button>
      </div>
    </div>
  );
};

const buttonHorizontalWrapper = css`
  & > div {
    display: inline-block;
  }
  .description {
    margin-bottom: 0.5rem;
  }
  & > div {
    margin-right: 2rem;
  }
`;

export const themes = () => (
  <div css={buttonHorizontalWrapper}>
    <div>
      <div className="description">Primary</div>
      <Button theme="primary" size="big">
        Button
      </Button>
    </div>
    <div>
      <div className="description">Secondary</div>
      <Button theme="secondary" size="big">
        Button
      </Button>
    </div>
    <div>
      <div className="description">Negative</div>
      <Button theme="negative" size="big">
        Button
      </Button>
    </div>
  </div>
);

const stickyButtonWrapper = css`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid ${GREY_LIGHT};

  & > button + button {
    margin-top: 8px;
  }
`;

const mobileDeviceContainer = css`
  display: flex;
  flex-direction: column;
  border: 2px solid ${GREY_EXLIGHT};
  width: 320px;
  height: 500px;
  background: ${GREY_EXLIGHT};
`;

export const stickyButton = () => {
  return (
    <div css={mobileDeviceContainer}>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Content
      </div>
      <div css={stickyButtonWrapper}>
        <Button theme="primary" size="big">
          확인
        </Button>
        <Button theme="secondary" size="big">
          취소
        </Button>
      </div>
    </div>
  );
};
 