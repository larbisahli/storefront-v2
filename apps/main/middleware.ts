import { NextRequest, NextResponse } from 'next/server'

const { TEMPLATE_1_URL, TEMPLATE_2_URL, TEMPLATE_3_URL } = process.env
export const config = {
  matcher: [
    '/',
    '/about/:path*',
    '/contact/:path*',
    '/set-tem1',
    '/set-tem2',
    '/set-tem3',
  ],
}

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
  console.log('_________',url, request.nextUrl.pathname.startsWith('/template1') )

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()

  let cookie = request.cookies.get('CLC_V_TEM')
  console.log({cookie})

  if(request.nextUrl.pathname === '/set-tem1'){
    response.cookies.set({
      name: 'CLC_V_TEM',
      value: 'template1',
      path: '/',
      maxAge: 3600*24,
      httpOnly: true
    })
    return response
  }
  else if(request.nextUrl.pathname === '/set-tem2'){
    response.cookies.set({
      name: 'CLC_V_TEM',
      value: 'template2',
      path: '/',
      maxAge: 3600*24,
      httpOnly: true
    })
    return response
  }
  else if(request.nextUrl.pathname === '/set-tem3'){
    response.cookies.set({
      name: 'CLC_V_TEM',
      value: 'template3',
      path: '/',
      maxAge: 3600*24,
      httpOnly: true
    })
    return response
  }

  if (cookie?.value === 'template1') {
    return NextResponse.rewrite(new URL(`${TEMPLATE_1_URL}${url.pathname}`, request.url))
  }
  if (cookie?.value === 'template2') {
    return NextResponse.rewrite(new URL(`${TEMPLATE_2_URL}${url.pathname}`, request.url))
  }
  if (cookie?.value === 'template3') {
    return NextResponse.rewrite(new URL(`${TEMPLATE_3_URL}${url.pathname}`, request.url))
  }
  return NextResponse.next();
}
