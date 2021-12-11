import { Field } from 'snarkyjs';

export class GenericField<
  T extends number | string | boolean | Field
> extends Field {
  x: T;
  constructor(x: T) {
    super(x);
    this.x = x;
  }
}
