import * as React from 'react';
import styles from './Sideqlinks.module.scss';
import { ISideqlinksProps } from './ISideqlinksProps';
import { SideLinksModel } from '../../../models/SideLinksModel';
import { ISideqlinksState } from './ISideqlinksState';
import { SPResponse } from '../../../models/SPResponse';
import {
  SPHttpClient
} from '@microsoft/sp-http';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { ResponseValue } from '../../../models/ResponseValue';
import(
  './sideqlinkscss.css'
);
export default class Sideqlinks extends React.Component<ISideqlinksProps, ISideqlinksState> {
  constructor(props: ISideqlinksProps, state: ISideqlinksState) {
    super(props);
    this.state = {
      records: new Array<SideLinksModel>(),
      errors: new Array<string>(),
      loading: true
    }
  }
  async componentDidMount(): Promise<void> {
    await this._fetchEvents().then(x => {
      console.log('sidelinks rendered');
    });
    return Promise.resolve();
  }
  private async _getListData(): Promise<SPResponse> {
    let records = '';
    if (this.props.numberOfrecords) {
      records = `&$top=${this.props.numberOfrecords}`;
    }
    const selectedColumns = `Title,Id,IconName,QuickLinkUrl,Order,Display,BackgroundImageUrl,BackgroundColor`;
    const filterCondition = `Display eq 1`;
    const ConfigUrl = `${this.props.webpartContext.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${this.props.listName}')/Items?$filter=${filterCondition}&$select=${selectedColumns}${records}&$orderby Order asc`;
    const response = await this.props.webpartContext.spHttpClient.get(ConfigUrl, SPHttpClient.configurations.v1);
    const responseValue: SPResponse = await response.json();
    return responseValue;
  }

  private async _fetchEvents(): Promise<void> {
    await this._getListData()
      .then(async (response) => {
        console.log(response);
        this.renderSideLinks(response.value);
      });
  }
  private renderSideLinks(response: ResponseValue[]): void {
    const sideLinks: SideLinksModel[] = [];
    if (response !== undefined && response.length > 0) {
      for (let index = 0; index < response.length; index++) {
        const item = response[index];
        if (item !== null) {
          const qLinks = new SideLinksModel();
          qLinks.IconName = item.IconName === (undefined || null) ? 'link' : item.IconName;
          qLinks.Id = item.Id?.toString();
          qLinks.Title = item.Title;
          qLinks.QuickLinkUrl = item.QuickLinkUrl;
          qLinks.Order = item.Order;
          qLinks.Target = item.QuickLinkUrl;
          qLinks.BackgroundImageUrl = item.BackgroundImageUrl;
          qLinks.BackgroundColor = item.BackgroundColor;
          sideLinks.push(qLinks);
        }
      }
      this.setState({ records: sideLinks, loading: false });
    }
  }
  public render(): React.ReactElement<ISideqlinksProps> {
    const backgroundColor = this.props.backgroundcolorOfTiles ?? '#F1F1F1';
    const fontColor = this.props.fontColor ?? 'black';

    return (
      <section className={styles.sideqlinks}>
        <div className="container">
          <div className="col-lg-12 bg">
            <div className="col-lg-4" style={{
              border: this.props.showBorder === true ? '1px solid' : 'none',
              backgroundColor: this.props.backgroundColorofWebPart
            }}>

              <div className="section-title">
                <div className="web-icon-bg">
                  <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI3LjI2NzMgMjMuMzM0QzI3LjQwMDcgMjIuMjM0IDI3LjUwMDcgMjEuMTM0IDI3LjUwMDcgMjAuMDAwN0MyNy41MDA3IDE4Ljg2NzMgMjcuNDAwNyAxNy43NjczIDI3LjI2NzMgMTYuNjY3M0gzMi45MDA2QzMzLjE2NzMgMTcuNzM0IDMzLjMzNCAxOC44NTA3IDMzLjMzNCAyMC4wMDA3QzMzLjMzNCAyMS4xNTA3IDMzLjE2NzMgMjIuMjY3MyAzMi45MDA2IDIzLjMzNE0yNC4zMTczIDMyLjYwMDZDMjUuMzE3MyAzMC43NTA2IDI2LjA4NCAyOC43NTA3IDI2LjYxNzMgMjYuNjY3M0gzMS41MzRDMjkuOTE5MyAyOS40NDc4IDI3LjM1NzUgMzEuNTU0IDI0LjMxNzMgMzIuNjAwNlpNMjMuOTAwNyAyMy4zMzRIMTYuMTAwN0MxNS45MzQgMjIuMjM0IDE1LjgzNCAyMS4xMzQgMTUuODM0IDIwLjAwMDdDMTUuODM0IDE4Ljg2NzMgMTUuOTM0IDE3Ljc1MDcgMTYuMTAwNyAxNi42NjczSDIzLjkwMDdDMjQuMDUwNyAxNy43NTA3IDI0LjE2NzMgMTguODY3MyAyNC4xNjczIDIwLjAwMDdDMjQuMTY3MyAyMS4xMzQgMjQuMDUwNyAyMi4yMzQgMjMuOTAwNyAyMy4zMzRaTTIwLjAwMDcgMzMuMjY3M0MxOC42MTczIDMxLjI2NzMgMTcuNTAwNyAyOS4wNTA3IDE2LjgxNzMgMjYuNjY3M0gyMy4xODRDMjIuNTAwNyAyOS4wNTA3IDIxLjM4NCAzMS4yNjczIDIwLjAwMDcgMzMuMjY3M1pNMTMuMzM0IDEzLjMzNEg4LjQ2NzMyQzEwLjA2NTQgMTAuNTQ2IDEyLjYyNTMgOC40MzY0NiAxNS42NjczIDcuNDAwNjVDMTQuNjY3MyA5LjI1MDY1IDEzLjkxNzMgMTEuMjUwNyAxMy4zMzQgMTMuMzM0Wk04LjQ2NzMyIDI2LjY2NzNIMTMuMzM0QzEzLjkxNzMgMjguNzUwNyAxNC42NjczIDMwLjc1MDYgMTUuNjY3MyAzMi42MDA2QzEyLjYzMTcgMzEuNTUzNCAxMC4wNzU0IDI5LjQ0NjggOC40NjczMiAyNi42NjczWk03LjEwMDY1IDIzLjMzNEM2LjgzMzk4IDIyLjI2NzMgNi42NjczMiAyMS4xNTA3IDYuNjY3MzIgMjAuMDAwN0M2LjY2NzMyIDE4Ljg1MDcgNi44MzM5OCAxNy43MzQgNy4xMDA2NSAxNi42NjczSDEyLjczNEMxMi42MDA3IDE3Ljc2NzMgMTIuNTAwNyAxOC44NjczIDEyLjUwMDcgMjAuMDAwN0MxMi41MDA3IDIxLjEzNCAxMi42MDA3IDIyLjIzNCAxMi43MzQgMjMuMzM0TTIwLjAwMDcgNi43MTczMkMyMS4zODQgOC43MTczMiAyMi41MDA3IDEwLjk1MDcgMjMuMTg0IDEzLjMzNEgxNi44MTczQzE3LjUwMDcgMTAuOTUwNyAxOC42MTczIDguNzE3MzIgMjAuMDAwNyA2LjcxNzMyWk0zMS41MzQgMTMuMzM0SDI2LjYxNzNDMjYuMDk1NyAxMS4yNjk3IDI1LjMyMzMgOS4yNzcxNCAyNC4zMTczIDcuNDAwNjVDMjcuMzg0IDguNDUwNjUgMjkuOTM0IDEwLjU2NzMgMzEuNTM0IDEzLjMzNFpNMjAuMDAwNyAzLjMzMzk4QzEwLjc4NCAzLjMzMzk4IDMuMzMzOTggMTAuODM0IDMuMzMzOTggMjAuMDAwN0MzLjMzMzk4IDI0LjQyMDkgNS4wODk5MyAyOC42NjAyIDguMjE1NTQgMzEuNzg1OEM5Ljc2MzE4IDMzLjMzMzQgMTEuNjAwNSAzNC41NjExIDEzLjYyMjYgMzUuMzk4NkMxNS42NDQ3IDM2LjIzNjIgMTcuODEyIDM2LjY2NzMgMjAuMDAwNyAzNi42NjczQzI0LjQyMDkgMzYuNjY3MyAyOC42NjAyIDM0LjkxMTQgMzEuNzg1OCAzMS43ODU4QzM0LjkxMTQgMjguNjYwMiAzNi42NjczIDI0LjQyMDkgMzYuNjY3MyAyMC4wMDA3QzM2LjY2NzMgMTcuODEyIDM2LjIzNjIgMTUuNjQ0NyAzNS4zOTg2IDEzLjYyMjZDMzQuNTYxMSAxMS42MDA1IDMzLjMzMzQgOS43NjMxOCAzMS43ODU4IDguMjE1NTRDMzAuMjM4MSA2LjY2Nzg5IDI4LjQwMDggNS40NDAyNCAyNi4zNzg3IDQuNjAyNjZDMjQuMzU2NiAzLjc2NTA4IDIyLjE4OTMgMy4zMzM5OCAyMC4wMDA3IDMuMzMzOThaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K' />
                </div>
                <span className="title">{this.props.webPartTitle}</span>
              </div>

              <div className="quick-link-lorem">
                {
                  this.state.loading &&
                  <Spinner label={`Loading ${this.props.webPartTitle} ...`} size={SpinnerSize.large} />
                }
                {
                  !this.state.loading && this.state.records.map(
                    (rec, index) => {
                      return (
                        this.RenderSideLinks(backgroundColor, rec, fontColor)
                      )
                    }
                  )
                }
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  private RenderSideLinks(backgroundColor: string, rec: SideLinksModel, fontColor: string): JSX.Element {
    return <div className="quick-links" key={rec.Id} style={{ backgroundColor: backgroundColor }}>
      <div className="mini-section-bg">
        <div>
          <img className="graph_icon"
            src={rec.BackgroundImageUrl}
            alt="graph icon" />
        </div>
        <div>
          <a href={rec.QuickLinkUrl} style={{ textDecoration: 'none', color: fontColor }} target='_new' rel='noopener'><span className="feature_text">{rec.Title}</span></a>
        </div>
      </div>
      <div className="arrow">
        <a href={rec.QuickLinkUrl} style={{ textDecoration: 'none', color: fontColor }} target='_new' rel='noopener'>
          <img className='graph_icon'
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjY2NzMgMzBMMTMuMzM0IDI3LjY2NjdMMjEuMDAwNyAyMEwxMy4zMzQgMTIuMzMzM0wxNS42NjczIDEwTDI1LjY2NzMgMjBMMTUuNjY3MyAzMFoiIGZpbGw9IiMyNjI2MjYiLz4KPC9zdmc+Cg==' />
        </a>
      </div>
    </div>;
  }
}
