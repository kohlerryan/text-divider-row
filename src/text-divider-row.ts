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

  protected render(): TemplateResult | void {
    if (!this._config) {
      return html``;
    }

    return html`
      <div class="text-divider-container">
        <h2 class="${this.getClass()}">
          <span>${this._config.text}</span>
        </h2>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        position: relative;
        --background: var(--ha-card-background, var(--card-background-color));
        --divider-color: var(--text-divider-color, var(--secondary-text-color));
        --font-size: var(--text-divider-font-size, 14px);
        --line-size: var(--text-divider-line-size, 1px);
      }

      .text-divider {
        width: 100%;
        margin: 10px 0 20px;
        border-bottom: var(--line-size) solid var(--divider-color);
      }

      .text-divider-inline {
      }

      .text-divider-inline {
        line-height: 0;
      }

      .text-divider-above {
        line-height: calc(var(--text-divider-font-size, 14px) + 15px);
      }

      .text-divider-container {
        margin: var(--text-divider-margin, 1em 0);
      }

      .text-divider-center {
        text-align: center;
      }

      .text-divider-left {
        text-align: left;
      }

      .text-divider-right {
        text-align: right;
      }

      .text-divider span {
        font-size: var(--font-size);
        color: var(--divider-color);
        padding: 1px 1em;
      }

      .text-divider-inline span {
        background: var(--background);
      }

      .text-divider-above span {
        background: transparent;
        vertical-align: text-top;
      }

      .text-divider-center span {
        margin: 0px;
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
