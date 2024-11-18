import { Page, Text, Code, Link } from '@vercel/examples-ui'
import { Navbar } from '@acme/components/navbar'
import * as moduleComponents from './components'
import { JSXElementConstructor } from 'react'

export default function IndexPage() {
  const layout = [
    // {
    //   id:1,
    //   moduleName: 'Button',
    //   text: 'My klaka button'
    // },
    {
      id:1,
      moduleName: 'Quote',
      text: 'My Quote'
    }
  ]

  return (
    <Page>
      <Navbar isDocsApp />
      <Text variant="h1" className="mb-6">
        <span>TEMPLATE 1</span>
        <br></br>
        {/* <Button>Button</Button>
        <Quote>Quote</Quote> */}
        {layout.map(component => {
          const Component = (
            moduleComponents as { [key: string]: (props: any) => JSX.Element }
          )[component?.moduleName]
          return <Component key={component.id} {...component}></Component>
        })}
      </Text>
    </Page>
  )
}
