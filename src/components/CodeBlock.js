import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CodeBlock = ({ inline, className, children }) => {
    if( inline ) {
        return <code className={className}>{children}</code>;
    }

    const match = /language-(\w+)/.exec( className || '' );
    const lang  = match && match[ 1 ] ? match[ 1 ] : '';
    const name  = match && match[ 2 ] ? match[ 2 ].slice(1) : ''; // 言語名
    return (
        <div>
            <div>{name}</div>
            {/**
            <SyntaxHighlighter
                style={hopscotch}
                language={lang}
                children={String(children).replace(/\n$/, '')}
            />
             */}
            <SyntaxHighlighter
                style={hopscotch}
                language={lang}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;