export const highlightText = (text: string) => text.split(' ').map((el, i) => el.startsWith('#')
    ? <span key={el + i}><span className='tag'>{el}</span>{' '}</span>
    : <span key={el + i}>{el + ' '}</span>)
