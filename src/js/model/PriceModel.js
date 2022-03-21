import { LOTTO_PURCHASE_UNIT, LOTTO_PURCHASE_MAX_PRICE } from '../constants/unit.js ';
import { ERR_MESSAGE } from '../constants/alertMessage.js';
import { PRICE_FORM__INPUT } from '../constants/selectTarget.js';
import { $ } from '../util/dom.js';

export default class PriceModel {
  #price;

  constructor() {
    this.initPrice();
  }

  initPrice() {
    this.#price = '';
  }

  static validators = {
    isValidPrice: (price) => {
      if (price === 0) throw new Error(ERR_MESSAGE.NONE_PRICE);
      if (price < LOTTO_PURCHASE_UNIT) throw new Error(ERR_MESSAGE.LESS_THAN_ENOUGH);
      if (price > LOTTO_PURCHASE_MAX_PRICE) throw new Error(ERR_MESSAGE.GREATER_THAN_ENOUGH);
      if (price % LOTTO_PURCHASE_UNIT !== 0) throw new Error(ERR_MESSAGE.NOT_DIVIDED_BY_UNIT);
    },
  };

  updatePrice(newPrice) {
    this.#price = newPrice;
    $(PRICE_FORM__INPUT).value = '';
  }

  getPrice() {
    return this.#price;
  }
}
