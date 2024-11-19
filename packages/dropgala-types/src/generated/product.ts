import type * as grpc from '@grpc/grpc-js'
import type { MessageTypeDefinition } from '@grpc/proto-loader'

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype
}

export interface ProtoGrpcType {
  attribute: {
    Attribute: MessageTypeDefinition
    AttributeValue: MessageTypeDefinition
  }
  category: {
    Breadcrumbs: MessageTypeDefinition
    Categories: MessageTypeDefinition
    Category: MessageTypeDefinition
    Menu: MessageTypeDefinition
    MenuItem: MessageTypeDefinition
  }
  commons: {
    Country: MessageTypeDefinition
    Currency: MessageTypeDefinition
    GoogleAnalytics: MessageTypeDefinition
    Icon: MessageTypeDefinition
    Seo: MessageTypeDefinition
    Social: MessageTypeDefinition
    Unit: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  media: {
    Image: MessageTypeDefinition
  }
  product: {
    Price: MessageTypeDefinition
    Product: MessageTypeDefinition
    ProductSeo: MessageTypeDefinition
    ProductShippingInfo: MessageTypeDefinition
    Products: MessageTypeDefinition
    Unit: MessageTypeDefinition
    Variation: MessageTypeDefinition
    VariationOption: MessageTypeDefinition
  }
  tag: {
    Tag: MessageTypeDefinition
  }
}
