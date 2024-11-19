import ReactHtmlParser from 'html-react-parser'

export default function ProductDescription({
  description
}: {
  description: string
}) {
  return (
    <div className="w-full xl:px-2 py-5 desktop:py-8 xl:py-10 sm:px-0 break-all">
      <h3 className="mb-3 font-semibold text-md">About this item</h3>
      {ReactHtmlParser(description ?? '')}
    </div>
  )
}
