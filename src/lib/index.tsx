import cx from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Code, {
  convertCodeChildrenToString,
  getLanguageFromClassName,
} from "./Code";
import { TaskList, UnorderedList } from "./List";
interface MercenaryProps {
  // className to style the wrapper
  className?: string;
  // GFM-compliant markdown
  markdown: string;
}

const Mercenary = ({ className, markdown }: MercenaryProps) => {
  return (
    <ReactMarkdown
      className={cx(className)}
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          return (
            <Code
              code={convertCodeChildrenToString(children)}
              inline={!!inline}
              language={getLanguageFromClassName(className)}
              className={className}
              children={children}
              {...props}
            />
          );
        },
        ul: ({ node, depth, ordered, className, ...delegated }) => {
          if (className?.includes("contains-task-list")) {
            return <TaskList className={className} {...delegated} />;
          }
          return <UnorderedList className={className} {...delegated} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Mercenary;
