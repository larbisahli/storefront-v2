import { Page, Text, Code, Link } from '@vercel/examples-ui'
import { Navbar } from '@acme/components/navbar'

export default function IndexPage() {
  return (
    <Page>
      <Navbar isDocsApp />
      <Text variant="h1" className="mb-6">
        ABOUT TEMPLATE 1
      </Text>
    </Page>
  )
}
