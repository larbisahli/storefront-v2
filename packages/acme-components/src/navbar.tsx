import { Link, A } from '@vercel/examples-ui'

export function Navbar({ isDocsApp }: { isDocsApp?: boolean }) {
  return <ul className="inline-flex mb-4">
  <li>
    <A href="/">Home</A>
  </li>
  <li className="ml-4">
    <Link href="/about">about</Link>
  </li>
  <li className="ml-4">
    <Link href="/contact">contact</Link>
  </li>
</ul>
}
