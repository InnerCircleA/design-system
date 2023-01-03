/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react"
import { ComponentStory } from "@storybook/react";
import { GREY_EXLIGHT } from "../colors";
import { FullButton } from "./FullButton";

export default {
    title: "Components/FullButton",
    components: FullButton
}

const Template: ComponentStory<typeof FullButton> = (args: any) => <FullButton {...args} /> 


export const fullButton: ComponentStory<typeof FullButton> = Template.bind({});

fullButton.args = {
    theme: "primary",
    children: "확인"
}
fullButton.story = {
    name: "Default"
}

export const Primary: ComponentStory<typeof FullButton> = () => <FullButton theme="primary">확인</FullButton>

export const Secondary: ComponentStory<typeof FullButton> = () => <FullButton theme="secondary">확인</FullButton>



const buttonHorizontalWrapper = css`
  display: flex;
  width: 50%;
  & > div { 
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 2rem;
  }
  .description {
    margin-bottom: 0.5rem;
  } 
`;

export const themes = () => (
    <div css={buttonHorizontalWrapper}>
      <div>
        <div className="description">Primary</div>
        <FullButton theme="primary">
          확인
        </FullButton>
      </div>
      <div>
        <div className="description">Secondary</div>
        <FullButton theme="secondary" >
          확인
        </FullButton>
      </div> 
    </div>
  );
  


const modalWrapper = css`
    width: 327px; 
    display: flex;
    flex-direction: column; 
    background: ${GREY_EXLIGHT};
    margin: 3em;
`;

const modalContent = css`
    flex: 1;
    padding: 24px;
`

export const fullButtonInModal = () => {
    return <div css={modalWrapper}>
        <div css={modalContent}>
            <p style={{fontSize: 28, marginTop:0, marginBottom: 12}}>Title</p>
            <p style={{ fontSize: 14, marginTop: 0, marginBottom: 0 }}>Description</p>
        </div>
        <FullButton>확인</FullButton>
    </div> 
}

