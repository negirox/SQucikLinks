import { WebPartContext } from "@microsoft/sp-webpart-base"

export interface ISideqlinksProps {
  webpartContext: WebPartContext
  backgroundcolorOfTiles?: string
  webPartTitle?: string
  listName?: string
  numberOfrecords?: number
  fontColor?: string
  showBorder?: boolean
  backgroundColorofWebPart?: string
}
