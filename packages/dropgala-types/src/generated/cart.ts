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
  cart: {
    Cart: MessageTypeDefinition
    Item: MessageTypeDefinition
  }
  category: {
    Breadcrumbs: MessageTypeDefinition
    Categories: MessageTypeDefinition
    Category: MessageTypeDefinition
    Menu: MessageTypeDefinition
    MenuItem: MessageTypeDefinition
  }
  checkout: {
    AppliedCoupon: MessageTypeDefinition
    Checkout: MessageTypeDefinition
    FinalPrice: MessageTypeDefinition
    Geo: MessageTypeDefinition
    Metadata: MessageTypeDefinition
    PaymentConfiguration: MessageTypeDefinition
    Shipment: MessageTypeDefinition
    ShippingAddress: MessageTypeDefinition
    StepsConfig: MessageTypeDefinition
    Summary: MessageTypeDefinition
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
  shipping: {
    DeliveryTime: MessageTypeDefinition
    Rate: MessageTypeDefinition
    Shipping: MessageTypeDefinition
    Shippings: MessageTypeDefinition
  }
  tag: {
    Tag: MessageTypeDefinition
  }
}
