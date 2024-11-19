import type * as grpc from '@grpc/grpc-js'
import type { MessageTypeDefinition } from '@grpc/proto-loader'

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype
}

export interface ProtoGrpcType {
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
  shipping: {
    DeliveryTime: MessageTypeDefinition
    Rate: MessageTypeDefinition
    Shipping: MessageTypeDefinition
    Shippings: MessageTypeDefinition
  }
}
