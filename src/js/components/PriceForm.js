import { PRICE_FORM, PRICE_FORM__INPUT, PRICE_FORM__BUTTON } from '../constants/selectTarget.js';

const PriceForm = ($parent, { onSubmit }) => {
  const getHtml = () => {
    return `<form class="mt-9">
              <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                    <div class="d-flex">
                        <input
                            type="number"
                            class="w-100 mr-2 pl-2 ${PRICE_FORM__INPUT}"
                            placeholder="구입 금액"/>
                  <button type="submit" class="btn btn-cyan ${PRICE_FORM__BUTTON}"></button>
              </div>
            </form>`;
  };

  const $el = document.createElement('form');
  $el.className = PRICE_FORM;
  $el.innerHTML = getHtml();
  $el.addEventListener('submit', onSubmit);
  $parent.replaceWith($el);
};

export default PriceForm;
