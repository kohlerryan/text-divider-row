import { LitElement, html, customElement, property, TemplateResult, css, CSSResult } from 'lit-element';
import { TextDividerRowConfig } from './types';
import { CARD_VERSION } from './const';

/* eslint no-console: 0 */
console.info(
  `%c  TEXT-DIVIDER-ROW  \n%c  Version ${CARD_VERSION}     `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('text-divider-row')
class TextDividerRow extends LitElement {
  @property() private _config?: TextDividerRowConfig;

  public setConfig(config: TextDividerRowConfig): void {
    if (!config || !config.text) {
      throw new Error('Error in card configuration.');
    }

    this._config = config;
  }

  protected getClass(): string {
    const allowedAlignValues = ['center', 'left', 'right'];
    const allowedPositionValues = ['inline', 'above'];
    if (this._config && this._config.align && this._config.position) {
      if (allowedAlignValues.includes(this._config.align) && allowedPositionValues.includes(this._config.position)) {
        return `text-divider text-divider-${this._config.align} text-divider-${this._config.position}`;
      }
    }
    return 'text-divider text-divider-center text-divider-inline';
  }

  protected getFontSize(): string {
    if (this._config && this._config.fontsize) {
      return `${this._config.fontsize}`;
    }
    return 'var(--text-divider-font-size, 14px)';
  }

  protected getMargin(): string {
    if (this._config && this._config.fontsize) {
      return `${this._config.margin}`;
    }
    return 'var(--text-divider-margin, 1em 0)';
  }

  protected render(): TemplateResult | void {
    if (!this._config) {
      return html``;
    }

    return html`
      <div class="text-divider-container" style="margin: ${this.getMargin()}">
        <div class="text-divider-line"></div>
        <div class="${this.getClass()}">
          <span style="font-size: ${this.getFontSize()}">${this._config.text}</span>
        </div>
        <div class="text-divider-line"></div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        --background: transparent;
        --divider-color: var(--text-divider-color, var(--secondary-text-color));
        --line-size: var(--text-divider-line-size, 1);
      }

      .text-divider {
        margin: 10px 0 20px;
        flex: auto;
      }

      .text-divider-line {
        margin: 10px 0 20px;
        border-bottom: 2px solid var(--divider-color);
        flex: 33%;
      }

      .text-divider-inline {
        line-height: 0;
      }

      .text-divider-above {
        line-height: 1.5;
        border-bottom: 2px solid var(--divider-color);
      }

      .text-divider-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      .text-divider-center {
        text-align: center;
        order: 0;
      }

      .text-divider-left {
        text-align: left;
        order: -1;
      }

      .text-divider-right {
        text-align: right;
        order: 2;
      }

      .text-divider span {
        font-size: var(--font-size);
        color: var(--divider-color);
        padding: 1px;
      }

      .text-divider-center span {
        margin: 0;
      }

      .text-divider-left span {
        margin: 0 0 0 1em;
      }

      .text-divider-right span {
        margin: 0 1em 0 0;
      }
    `;
  }
}
