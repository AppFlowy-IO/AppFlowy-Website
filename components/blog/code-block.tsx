'use client';
import React, { useEffect } from 'react';
import { Highlight, type Language, PrismTheme, Prism } from 'prism-react-renderer';
import { cn } from '@/lib/utils';
import CopyButton from '@/components/blog/copy-button';

const lightTheme: PrismTheme = {
  plain: {
    color: '#24292e',
    backgroundColor: '#f6f8fa',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6a737d',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#032f62',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#24292e',
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: {
        color: '#005cc5',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#d73a49',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#22863a',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['builtin'],
      style: {
        color: '#005cc5',
      },
    },
    {
      types: ['decorator'],
      style: {
        color: '#22863a',
      },
    },
    {
      types: ['interpolation'],
      style: {
        color: '#24292e',
      },
    },
    {
      types: ['generic-function'],
      style: {
        color: '#6f42c1',
      },
    },
  ],
};

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: Language;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, language }) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = language || (match && match[1]) || 'text';
  const [, setMounted] = React.useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.Prism = Prism || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void import('prismjs/components/prism-dart').then(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className='not-prose group relative my-4'>
      <Highlight prism={Prism} code={children.trim()} language={lang as Language} theme={lightTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            key={lang}
            className={cn(className, 'overflow-x-auto rounded-[8px] p-4 text-sm')}
            style={{ ...style, backgroundColor: '#f6f8fa', border: '1px solid #e1e4e8' }}
          >
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} className='table-row'>
                  <span className='table-cell select-none pr-4 text-right text-gray-500 opacity-50'>{i + 1}</span>
                  <span className='table-cell'>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <CopyButton text={children.trim()} />
    </div>
  );
};

export default CodeBlock;
