import { SideLinksModel } from "../../../models/SideLinksModel"

export interface ISideqlinksState {
    records: Array<SideLinksModel>
    errors: Array<string>
    loading: boolean
}