import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Sideqlinks from './components/Sideqlinks';
import { ISideqlinksProps } from './components/ISideqlinksProps';

export interface ISideqlinksWebPartProps {
  backgroundcolorOfTiles?: string;
  backgroundColorofWebPart?:string;
  fontColor?: string;
  webPartTitle?: string;
  listName?: string;
  numberOfrecords?: number;
  showBorder?: boolean;
}

export default class SideqlinksWebPart extends BaseClientSideWebPart<ISideqlinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISideqlinksProps> = React.createElement(
      Sideqlinks,
      {
        webpartContext: this.context,
        backgroundcolorOfTiles: this.properties.backgroundcolorOfTiles,
        webPartTitle: this.properties.webPartTitle,
        listName: this.properties.listName,
        numberOfrecords: this.properties.numberOfrecords,
        fontColor: this.properties.fontColor,
        showBorder: this.properties.showBorder,
        backgroundColorofWebPart: this.properties.backgroundColorofWebPart
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss(encodeURIComponent('https://fonts.googleapis.com/css?family=Source+Sans Pro&display=swap'));
    // SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
    return Promise.resolve();
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: 'Delphi-Side Quick Links',
              groupFields: [
                PropertyPaneTextField('webPartTitle', {
                  label: 'Enter WebPart Title',
                  placeholder: 'Enter web part title'
                }),
                PropertyPaneTextField('listName', {
                  label: 'Enter Source List Name',
                  placeholder: 'Source List'
                }),
                PropertyPaneTextField('numberOfrecords', {
                  label: 'Enter No. of records',
                  placeholder: '5'
                }),
                PropertyPaneTextField('backgroundColorofWebPart', {
                  label: 'Enter Background color of Webpart',
                  placeholder: 'red,gree,blue etc.'
                }),
                PropertyPaneTextField('backgroundcolorOfTiles', {
                  label: 'Enter Background color of tiles',
                  placeholder: 'red,gree,blue etc.'
                }),
                PropertyPaneTextField('fontColor', {
                  label: 'Enter Font color of text',
                  placeholder: 'red,gree,blue etc.'
                }),
                PropertyPaneCheckbox('showBorder', {
                  text: 'Click to Show Border'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
