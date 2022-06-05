import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Mercenary from "../lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Mercenary",
  component: Mercenary,
} as ComponentMeta<typeof Mercenary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Mercenary> = (args) => (
  <Mercenary {...args} />
);

const sampleMarkdown = `  
  # H1
  ## H2
  ### H3
  #### H4
  ##### H5
  ###### H6

  \`\`\`graphql
  query {
    name
  }
  \`\`\`
`;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  markdown: sampleMarkdown,
  className: "",
};
