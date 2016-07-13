import Ember from 'ember';
import {
  findInputByLabel,
  findLabelByText,
  findByAutoId,
  findInputByName
} from '../helpers/finders';

const { isEmpty } = Ember;

export function clickByLabel(labelText) {
  return () => {
    const labelForInput = findLabelByText(labelText);

    click(labelForInput);
  }
}

export function clickButton(text) {
  return function() {
    let button = find(`button:contains('${text}')`);

    if (isEmpty(button)) {
      button = findWithAssert(`input[type="button"][value='${text}']`);
    }

    click(button);
  };
}

export function clickLink(linkText) {
  return function() {
    click(`a:contains('${linkText}')`);
  };
}

export function clickRadioByLabel(label) {
  return function() {
    const labelForInput = findLabelByText(label);
    const input = findInputByLabel(labelForInput);

    click(input);
  }
}

export function fillInByLabel(label, value) {
  return function() {
    const labelForInput = findLabelByText(label);
    const input = findInputByLabel(labelForInput);

    fillIn(input, value);
    return find(input).focusout();
  };
}

export  function selectByLabel(label, optionText) {
  return () => {
    const selectId = findWithAssert(`label:contains('${label}')`).attr('for');
    const option = findWithAssert(`#${selectId} option:contains('${optionText}')`);

    fillIn(`#${selectId}`, option.attr('value'))
    .then(() => find(`#${selectId}`).trigger('focusout'));
  }
}

export function clickByAutoId(autoId) {
  andThen(() => {
    let element = findByAutoId(autoId);
    click(element);
  });
}

export function fillInByAutoId(autoId, value) {
  andThen(() => {
    let element = findByAutoId(autoId);
    fillIn(element, value);
  });
}

export function fillInByName(name, value) {
  andThen(() => {
    let element = findInputByName(name);
    fillIn(element, value);
  });
}

export function chooseFromDropdown(optionText, selector = 'select') {
  andThen(() => {
    let option = findWithAssert(`option:contains('${optionText}')`);

    fillIn(selector, option.attr('value'))
    .then(() => find(selector).trigger('focusout'));
  });
}
