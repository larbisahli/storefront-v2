// Original file: packages/dropgala-query/src/proto/payment.proto

import type {
  Payment as _payment_Payment,
  Payment__Output as _payment_Payment__Output
} from '../payment/Payment'

export interface Payments {
  payments?: _payment_Payment[]
}

export interface Payments__Output {
  payments: _payment_Payment__Output[]
}
