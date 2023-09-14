import { ResponseValue } from "./ResponseValue"

export interface SPResponse {
    "@odata.context"?: string
    value: ResponseValue[]
  }
  
