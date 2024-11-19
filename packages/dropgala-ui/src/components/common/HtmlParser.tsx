import ReactHtmlParser from 'html-react-parser'

interface Props {
  content: string
}

export default function HtmlParser({ content }: Props) {
  return ReactHtmlParser(content ?? '')
}
