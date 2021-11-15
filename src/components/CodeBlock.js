import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
            <SyntaxHighlighter
                style={darcula}
                language={lang}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;