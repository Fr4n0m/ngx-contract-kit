export type CodeLanguage = "json" | "ts" | "bash" | "text";

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function wrap(type: string, value: string): string {
  return `<span class="ck-token ck-${type}">${value}</span>`;
}

function highlightWithRegex(code: string, pattern: RegExp): string {
  const safe = escapeHtml(code);
  let result = "";
  let lastIndex = 0;

  for (const match of safe.matchAll(pattern)) {
    const index = match.index ?? 0;
    result += safe.slice(lastIndex, index);
    const groups = match.groups ?? {};
    const [value] = match;

    if (groups.comment) {
      result += wrap("comment", value);
    } else if (groups.key) {
      result += wrap("key", value);
    } else if (groups.keyword) {
      result += wrap("keyword", value);
    } else if (groups.string) {
      result += wrap("string", value);
    } else if (groups.number) {
      result += wrap("number", value);
    } else if (groups.literal) {
      result += wrap("literal", value);
    } else if (groups.command) {
      result += wrap("command", value);
    } else if (groups.flag) {
      result += wrap("flag", value);
    } else if (groups.path) {
      result += wrap("path", value);
    } else {
      result += value;
    }

    lastIndex = index + value.length;
  }

  result += safe.slice(lastIndex);
  return result;
}

function highlightJson(code: string): string {
  return highlightWithRegex(
    code,
    /(?<key>"(?:\\.|[^"\\])*")(?=\s*:)|(?<string>"(?:\\.|[^"\\])*")|(?<literal>\b(?:true|false|null)\b)|(?<number>\b\d+(?:\.\d+)?\b)/g,
  );
}

function highlightTs(code: string): string {
  return highlightWithRegex(
    code,
    /(?<comment>\/\/[^\n]*)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(?<keyword>import|from|export|type|class|constructor|private|public|protected|readonly|return|const|let|var|as|throw|new|function|interface|extends|implements|if|else|await|async|for|while|switch|case|break|continue|try|catch|finally)\b|(?<number>\b\d+(?:\.\d+)?\b)/g,
  );
}

function highlightBash(code: string): string {
  return highlightWithRegex(
    code,
    /(?<comment>#[^\n]*)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<flag>--[a-z0-9-]+)|(?<command>\b(?:pnpm|npm|yarn|bun|npx|contract-kit|ckit)\b)|(?<path>\b[a-zA-Z0-9_./-]+\.[a-z0-9]{2,8}\b)|(?<number>\b\d+(?:\.\d+)?\b)/gi,
  );
}

export function detectCodeLanguage(lang?: string, code?: string): CodeLanguage {
  const input = (lang ?? "").toLowerCase();
  if (input === "json") return "json";
  if (input === "ts" || input === "typescript") return "ts";
  if (input === "bash" || input === "sh" || input === "shell") return "bash";

  const source = (code ?? "").trimStart();
  if (source.startsWith("{") || source.startsWith("[")) return "json";
  if (source.startsWith("$ ")) return "bash";
  return "text";
}

export function highlightCodeHtml(code: string, lang?: string): string {
  const language = detectCodeLanguage(lang, code);
  if (language === "json") return highlightJson(code);
  if (language === "ts") return highlightTs(code);
  if (language === "bash") return highlightBash(code);
  return escapeHtml(code);
}
