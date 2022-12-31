/** @jsxImportSource @emotion/react */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button"; 

export default {
  title: "components/Button",
  component: Button, 
} as ComponentMeta<typeof Button>;

const Template = (args: any) =>  <Button {...args}/>

export const Primary: ComponentStory<typeof Button> = Template.bind({})

Primary.args = {
  theme: 'primary',
  children: "Button"
}

export const Secondary: ComponentStory<typeof Button> = Template.bind({})

Secondary.args = {
  theme: 'secondary',
  children: "Secondary"
}