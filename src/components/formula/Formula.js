import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor ($root) {
    super($root, {
      name: 'Formula',
      listeners: [
        {
          jsEvent: 'input',
          fn: 'inputHandler',
        },
        {
          jsEvent: 'click',
          fn: 'clickHandler',
        },
      ],
    });
  }

  inputHandler (e) {
    console.log('Formula: on input', e);
    this.destroy();
  }

  clickHandler() {
    console.log('click');
  }

  toHTML () {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
