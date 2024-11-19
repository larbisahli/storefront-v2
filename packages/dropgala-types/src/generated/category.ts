import type * as grpc from '@grpc/grpc-js'
import type { MessageTypeDefinition } from '@grpc/proto-loader'

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype
}

export interface ProtoGrpcType {
  category: {
    Breadcrumbs: MessageTypeDefinition
    Categories: MessageTypeDefinition
    Category: MessageTypeDefinition
    Menu: MessageTypeDefinition
    MenuItem: MessageTypeDefinition
  }
  media: {
    Image: MessageTypeDefinition
  }
}
