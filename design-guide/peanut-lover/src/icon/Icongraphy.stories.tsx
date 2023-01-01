/** @jsxImportSource @emotion/react */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Icon, iconTypes } from ".";
import { css } from "@emotion/react";
import IcongraphyMDXDocument from "./Icongraphy.mdx";

export default {
  title: "Foundations/Icongraphy",
  component: Icon,
  parameters: {
    docs: {
      page: IcongraphyMDXDocument
    }
  }
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const icon: ComponentStory<typeof Icon> = Template.bind({});

icon.args = {
    icon: "add"
}
icon.story = {
  name: "Default",
};

export const customSize = () => <Icon icon="address" size="4rem" />;

export const customColor = () => <Icon icon="address" color="red" />;

export const customizedWithStyle = () => (
  <Icon icon="address" css={{ color: "red", width: "4rem" }} />
);

export const listOfIcons = () => {
  return (
    <ul css={iconListStyle}>
      {iconTypes.map((icon) => (
        <li key={icon}>
          <Icon icon={icon} />
          {icon}
        </li>
      ))}
    </ul>
  );
};

const iconListStyle = css`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    width: 25%;
    padding: 1rem;
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
`;
