import React, { useEffect, useState, useCallback } from "react";
import * as shiki from "shiki";

shiki.setCDN("https://unpkg.com/shiki/");

export const getLanguageFromClassName = (className?: string) => {
  if (!className) return "";
  const match = /language-(\w+)/.exec(className || "");
  return match?.[1] ?? "";
};

export const convertCodeChildrenToString = (children: React.ReactNode) =>
  String(children).replace(/\n$/, "");

const InlineCode = (props: CodeProps) => {
  const { className, children } = props;
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const BlockCode = (props: CodeProps) => {
  const { code, language, preTagProps } = props;
  const [markedUpHtml, setMarkedUpHtml] = useState<string>("");

  const highlightWithShiki = useCallback(async () => {
    const highlighter = await shiki.getHighlighter({
      theme: "github-dark",
    });
    const markedUpHtml = highlighter.codeToHtml(code, { lang: language });
    setMarkedUpHtml(markedUpHtml);
  }, [code, language]);

  useEffect(() => {
    highlightWithShiki();
  }, [highlightWithShiki]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: markedUpHtml }}
      className="shiki-wrapper"
    />
  );

  // return (
  //   <SyntaxHighlighter
  //     showLineNumbers
  //     children={code}
  //     style={vs}
  //     language={language}
  //     {...preTagProps}
  //   />
  // );
};

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

export default Code;
