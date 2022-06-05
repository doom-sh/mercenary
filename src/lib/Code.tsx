import React from "react";
import { useMercenaryContext } from "./context";
import cx from "classnames";

export const getLanguageFromClassName = (className?: string) => {
  if (!className) return "";
  const match = /language-(\w+)/.exec(className || "");
  return match?.[1] ?? "";
};

export const convertCodeChildrenToString = (children: React.ReactNode) =>
  String(children).replace(/\n$/, "");

interface CodeProps {
  inline: boolean;
  code: string;
  language: string;
  className?: string;
  children?: React.ReactNode;
  preTagProps?: React.HTMLAttributes<HTMLPreElement>;
}

const Code = (props: CodeProps) => {
  const { inline } = props;
  return inline ? <InlineCode {...props} /> : <BlockCode {...props} />;
};

const InlineCode = (props: CodeProps) => {
  const { className, children } = props;
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const BlockCode = (props: CodeProps) => {
  const { code, language, preTagProps, className } = props;
  const { shikiHighlighterInstance, isShikiLoading } = useMercenaryContext();

  // note: if you ever want to customize Shiki's HTML output, you can use https://github.com/shikijs/shiki/issues/3#issuecomment-451528955
  // todo(sarim): add line highlighting with https://github.com/shikijs/shiki/pull/259 and https://rehype-pretty-code.netlify.app/
  const markedUpHtml =
    shikiHighlighterInstance?.codeToHtml(code, {
      lang: language,
    }) ?? "";

  return isShikiLoading ? (
    <div>Loading code block...</div>
  ) : (
    <div
      className={cx(className)}
      dangerouslySetInnerHTML={{ __html: markedUpHtml }}
    />
  );
};

export default Code;
