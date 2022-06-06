import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as shiki from "shiki";

shiki.setCDN("https://unpkg.com/shiki/");

interface IMercenaryContextValue {
  shikiHighlighterInstance?: shiki.Highlighter;
  isShikiLoading: boolean;
}

const MercenaryContextDefaultValue: IMercenaryContextValue = {
  isShikiLoading: false,
};

export const MercenaryContext = createContext<IMercenaryContextValue>(
  MercenaryContextDefaultValue
);

// -----

export const useCreateMercenaryContext = (): IMercenaryContextValue => {
  const [isShikiLoading, setIsShikiLoading] = useState<boolean>(false);
  const [highlighter, setHighlighter] = useState<shiki.Highlighter>();
  const getHighlighter = useCallback(async () => {
    setIsShikiLoading(true);
    const highlighter = await shiki.getHighlighter({
      theme: "github-dark",
      // A list of languages to load upfront.
      langs: [
        "html",
        "css",
        "javascript",
        "typescript",
        "tsx",
        "graphql",
        "json",
        "bash",
      ],
      // A list of themes to load upfront.
      themes: ["github-dark", "github-light"],
    });
    setHighlighter(highlighter);
    setIsShikiLoading(false);
  }, []);
  useEffect(() => {
    getHighlighter();
  }, [getHighlighter]);

  return {
    shikiHighlighterInstance: highlighter,
    isShikiLoading,
  };
};

export const useMercenaryContext = () => {
  return useContext(MercenaryContext);
};
