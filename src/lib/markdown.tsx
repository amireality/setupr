import React from "react";
import { Link } from "react-router-dom";

/**
 * Shared markdown renderer for blog content.
 * Used by both BlogPost (public) and BlogEditor (admin preview).
 */

// Parse inline markdown (bold, italic, links, code, images)
export const parseInlineMarkdown = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for inline image ![alt](url)
    const imageMatch = remaining.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    // Check for markdown link [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Check for italic *text* (not bold)
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    // Check for inline code `code`
    const codeMatch = remaining.match(/`([^`]+)`/);

    // Find indices
    const imageIndex = imageMatch ? remaining.indexOf(imageMatch[0]) : -1;
    const linkIndex = linkMatch ? remaining.indexOf(linkMatch[0]) : -1;
    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;
    const italicIndex = italicMatch ? remaining.indexOf(italicMatch[0]) : -1;
    const codeIndex = codeMatch ? remaining.indexOf(codeMatch[0]) : -1;

    // Find the earliest match
    const indices = [
      { type: "image", index: imageIndex, match: imageMatch },
      { type: "link", index: linkIndex, match: linkMatch },
      { type: "bold", index: boldIndex, match: boldMatch },
      { type: "italic", index: italicIndex, match: italicMatch },
      { type: "code", index: codeIndex, match: codeMatch },
    ].filter((item) => item.index !== -1);

    if (indices.length === 0) {
      parts.push(remaining);
      break;
    }

    // Sort by index to find the first match
    indices.sort((a, b) => a.index - b.index);
    const first = indices[0];

    // Add text before the match
    if (first.index > 0) {
      parts.push(remaining.substring(0, first.index));
    }

    switch (first.type) {
      case "image": {
        const [fullMatch, alt, url] = first.match!;
        parts.push(
          <img
            key={`img-${keyIndex++}`}
            src={url}
            alt={alt}
            className="rounded-xl my-6 w-full max-w-2xl mx-auto"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        );
        remaining = remaining.substring(first.index + fullMatch.length);
        break;
      }
      case "link": {
        const [fullMatch, linkText, linkUrl] = first.match!;
        const isInternal = linkUrl.startsWith("/");
        parts.push(
          isInternal ? (
            <Link
              key={`link-${keyIndex++}`}
              to={linkUrl}
              className="text-primary hover:underline"
            >
              {parseInlineMarkdown(linkText)}
            </Link>
          ) : (
            <a
              key={`link-${keyIndex++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {parseInlineMarkdown(linkText)}
            </a>
          )
        );
        remaining = remaining.substring(first.index + fullMatch.length);
        break;
      }
      case "bold": {
        const [fullMatch, boldText] = first.match!;
        parts.push(
          <strong key={`bold-${keyIndex++}`} className="font-semibold text-foreground">
            {parseInlineMarkdown(boldText)}
          </strong>
        );
        remaining = remaining.substring(first.index + fullMatch.length);
        break;
      }
      case "italic": {
        const [fullMatch, italicText] = first.match!;
        parts.push(
          <em key={`italic-${keyIndex++}`} className="italic">
            {parseInlineMarkdown(italicText)}
          </em>
        );
        remaining = remaining.substring(first.index + fullMatch.length);
        break;
      }
      case "code": {
        const [fullMatch, codeText] = first.match!;
        parts.push(
          <code
            key={`code-${keyIndex++}`}
            className="px-1.5 py-0.5 rounded bg-secondary text-sm font-mono"
          >
            {codeText}
          </code>
        );
        remaining = remaining.substring(first.index + fullMatch.length);
        break;
      }
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
};

// Render a markdown table
const renderTable = (tableLines: string[], startIndex: number): JSX.Element => {
  const rows = tableLines.filter((line) => !line.match(/^\|[-:|\s]+\|$/));
  const headers =
    rows[0]
      ?.split("|")
      .filter((cell) => cell.trim())
      .map((cell) => cell.trim()) || [];
  const bodyRows = rows.slice(1);

  return (
    <div key={startIndex} className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-primary/30 bg-primary/5">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold text-foreground"
              >
                {parseInlineMarkdown(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => {
            const cells = row
              .split("|")
              .filter((cell) => cell.trim() !== "" || cell.includes(" "))
              .map((cell) => cell.trim());
            return (
              <tr
                key={rowIndex}
                className={`border-b border-border/30 ${
                  rowIndex % 2 === 0 ? "bg-card/30" : "bg-card/10"
                } hover:bg-primary/5 transition-colors`}
              >
                {cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-sm text-muted-foreground">
                    {parseInlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Render markdown content to React elements.
 * Supports: headers, bold, italic, links, images, lists, blockquotes, tables, hr, code.
 */
export const renderMarkdown = (content: string): JSX.Element[] => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let tableLines: string[] = [];
  let inTable = false;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag
          key={elements.length}
          className={`${
            listType === "ul" ? "list-disc" : "list-decimal"
          } list-inside space-y-2 my-4 text-muted-foreground`}
        >
          {currentList.map((item, i) => (
            <li key={i}>{parseInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableLines.length > 0) {
      elements.push(renderTable(tableLines, elements.length));
      tableLines = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Check if this is a table row
    const isTableRow = trimmedLine.startsWith("|") && trimmedLine.endsWith("|");

    if (isTableRow) {
      flushList();
      inTable = true;
      tableLines.push(trimmedLine);
      return;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal rules
    if (trimmedLine === "---" || trimmedLine === "***" || trimmedLine === "___") {
      flushList();
      elements.push(<hr key={index} className="my-8 border-border/50" />);
      return;
    }

    // Headers
    if (trimmedLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index} className="text-xl font-semibold font-display mt-6 mb-3">
          {parseInlineMarkdown(trimmedLine.replace("### ", ""))}
        </h3>
      );
    } else if (trimmedLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index} className="text-2xl font-bold font-display mt-8 mb-4">
          {parseInlineMarkdown(trimmedLine.replace("## ", ""))}
        </h2>
      );
    }
    // Unordered list items
    else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      if (listType === "ol") flushList();
      listType = "ul";
      currentList.push(trimmedLine.replace(/^[-*]\s/, ""));
    }
    // Ordered list items
    else if (/^\d+\.\s/.test(trimmedLine)) {
      if (listType === "ul") flushList();
      listType = "ol";
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ""));
    }
    // Blockquotes
    else if (trimmedLine.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={index}
          className="border-l-4 border-primary/50 pl-4 my-6 italic text-muted-foreground bg-primary/5 py-3 pr-4 rounded-r-lg"
        >
          {parseInlineMarkdown(trimmedLine.replace("> ", ""))}
        </blockquote>
      );
    }
    // Images on their own line
    else if (trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) {
      flushList();
      const match = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (match) {
        elements.push(
          <figure key={index} className="my-8">
            <img
              src={match[2]}
              alt={match[1]}
              className="rounded-xl w-full max-w-2xl mx-auto"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {match[1] && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {match[1]}
              </figcaption>
            )}
          </figure>
        );
      }
    }
    // Empty lines
    else if (trimmedLine === "") {
      flushList();
    }
    // Regular paragraphs
    else {
      flushList();
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {parseInlineMarkdown(trimmedLine)}
        </p>
      );
    }
  });

  flushList();
  flushTable();
  return elements;
};
