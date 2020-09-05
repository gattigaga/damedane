import { getByLabelText, getByTestId } from '@testing-library/dom'

import damedane from '../damedane'

describe('Damedane', () => {
  const initDOM = () => {
    const $container = document.createElement('div')

    $container.innerHTML = `
      <form id="form" action="" method="POST" data-testid="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" type="text" name="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
        <br />
        <button>Submit</button>
      </form>
    `

    return $container
  }

  it('should set default value', () => {
    const $main = initDOM()
    const $form = getByTestId($main, 'form')

    const inputUsername = getByLabelText($form, 'Username')
    const inputPassword = getByLabelText($form, 'Password')

    expect(inputUsername.value).toBe('')
    expect(inputPassword.value).toBe('')

    damedane($form, {
      values: {
        username: 'steve.fox',
        password: 'mishimakiller'
      }
    })

    expect(inputUsername.value).toBe('steve.fox')
    expect(inputPassword.value).toBe('mishimakiller')
  })
})
