export const highlightText = (text: string) => text.split(' ').map((word, i) => word.startsWith('#') && word.length > 1
    ? <span key={word + i}><span className='tag'>{word}</span>{' '}</span>
    : <span key={word + i}>{word + ' '}</span>)
