import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/coco', '/_sites/:path'],
}

const { DOCS_URL } = process.env

// export default async function middleware(req: NextRequest) {

//   // Get hostname (e.g. vercel.com, test.vercel.app, etc.)

//   // If localhost, assign the host value manually
//   // If prod, get the custom domain/subdomain value by removing the root URL
//   // (in the case of "test.vercel.app", "vercel.app" is the root URL)

//   // Prevent security issues – users should not be able to canonically access
//   // the pages/sites folder and its respective contents.
//   if (url.pathname.startsWith(`/theme`)) {
//     url.pathname = `/404`
//   } else {
//     console.log('URL 2', req.nextUrl.href)
//     // rewrite to the current subdomain under the pages/sites folder
//     // url.pathname = '/'//`/${data.subdomain}${url.pathname}`
//   }

//   // return NextResponse.rewrite(url)
//   // return NextResponse.rewrite(new URL(`/coco`, req.url));
// }

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const url = request.nextUrl
  console.log('>>>> LALALAL',url, request.nextUrl.pathname )
  // if (request.nextUrl.pathname === "/coco") {
  //   return NextResponse.rewrite(new URL(`${DOCS_URL}/coco`, request.url))
  // }
  return NextResponse.next();
}
