import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { LOTTO_PURCHASE_UNIT } from '../constants/unit.js';
import { PRICE_FORM__INPUT, LOTTO_MODAL, LOTTO_FORM__WINNING_NUMBER } from '../constants/selectTarget.js';
import { $, $$ } from '../util/dom.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
  }

  eventHandler = {
    purchaseLotto: (e) => {
      e.preventDefault();
      try {
        const inputPrice = Number($(PRICE_FORM__INPUT).value);
        PriceModel.validators.isValidPrice(inputPrice);
        this.#priceModel.updatePrice(inputPrice);
        this.generateLotto(inputPrice);
      } catch (err) {
        alert(err.message);
      }
    },
    toggleDisplayLottoNumbers: () => {
      this.#lottoModel.toggleLottoTicketsNumbers();
    },
    displayWinningResultModal: (e) => {
      e.preventDefault();
      try {
        const inputNumbers = [];
        $$(LOTTO_FORM__WINNING_NUMBER).forEach(($el) => {
          inputNumbers.push($el.value);
        });
        LottoModel.validators.isDuplicatedWinningNumber(inputNumbers);
        $(LOTTO_MODAL).classList.add('open');
      } catch (err) {
        alert(err.message);
        console.log(err);
      }
    },
    closeWinningResultModal: (e) => {
      e.preventDefault();
      $(LOTTO_MODAL).classList.toggle('open');
    },
  };

  generateLotto(price) {
    try {
      const quantity = price / LOTTO_PURCHASE_UNIT;
      const totalQuantity = this.#lottoModel?.quantity + quantity;
      LottoModel.validators.isValidQuantity(totalQuantity);

      if (this.#lottoModel) {
        this.#lottoModel.addLotto(quantity);
        return;
      }

      this.#lottoModel = new LottoModel(quantity);
    } catch (e) {
      alert(e.message);
    }
  }

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }
}
