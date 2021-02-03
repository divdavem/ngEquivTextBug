import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mylib',
  template: `
    <p i18n>
      Hello {{name}}!
    </p>
  `,
  styles: [
  ]
})
export class MylibComponent implements OnInit {
  @Input() name = "world";

  constructor() { }

  ngOnInit(): void {
  }

}
