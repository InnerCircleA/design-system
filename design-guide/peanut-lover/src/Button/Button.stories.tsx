/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "components/Button",
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
