'use client';

import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import React from 'react';

type HtmlContentProps = {
  html: string;
  className?: string;
  allowLinks?: boolean;
};

const HtmlContent: React.FC<HtmlContentProps> = ({ html, className, allowLinks = true }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  // если ссылки запрещены, меняем <a> на <span>
  // для того чтобы можно было вложить в тег <a>
  const processedHtml = allowLinks
    ? cleanHtml
    : cleanHtml.replace(/<\/?a\b[^>]*>/g, (tag) => (tag.startsWith('</') ? '</span>' : '<span>'));

  return <div className={className}>{parse(processedHtml)}</div>;
};

export default HtmlContent;
