'use client';

import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import React from 'react';

type HtmlContentProps = {
  html: string;
  className?: string;
};

const HtmlContent: React.FC<HtmlContentProps> = ({ html, className }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return <div className={className}>{parse(cleanHtml)}</div>;
};

export default HtmlContent;
