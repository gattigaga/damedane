import { getByLabelText, getByTestId, fireEvent } from '@testing-library/dom'

import damedane from '../damedane'

describe('Damedane', () => {
  const initDOM = () => {
    const $container = document.createElement('div')

    $container.innerHTML = `
      <form id="form" action="" method="POST" data-testid="form">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" type="text" name="username" />
          <p data-error="username" data-testid="error-username"></p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" name="password" />
          <p data-error="password" data-testid="error-password"></p>
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

  it('should runs the validation rules', () => {
    const $main = initDOM()
    const $form = getByTestId($main, 'form')

    const errorUsername = getByTestId($form, 'error-username')
    const errorPassword = getByTestId($form, 'error-password')

    expect(errorUsername).toHaveTextContent('')
    expect(errorPassword).toHaveTextContent('')

    const usernameIsRequired = (values) => {
      const { username } = values

      return {
        name: 'username',
        isError: !username.length,
        message: 'Username is required'
      }
    }

    const usernameHasInvalidLength = (values) => {
      const { username } = values

      return {
        name: 'username',
        isError: !(username.length >= 5 && username.length <= 10),
        message: 'Username at least minimum 5 characters and maximum 10 characters'
      }
    }

    const passwordIsRequired = (values) => {
      const { password } = values

      return {
        name: 'password',
        isError: !password.length,
        message: 'Password is required'
      }
    }

    const passwordHasInvalidLength = (values) => {
      const { password } = values

      return {
        name: 'password',
        isError: !(password.length >= 8 && password.length <= 50),
        message: 'Password at least minimum 8 characters and maximum 50 characters'
      }
    }

    damedane($form, {
      values: {
        username: '',
        password: ''
      },
      rules: [
        usernameIsRequired,
        usernameHasInvalidLength,
        passwordIsRequired,
        passwordHasInvalidLength
      ]
    })

    expect(errorUsername).toHaveTextContent('Username is required')
    expect(errorPassword).toHaveTextContent('Password is required')

    const inputUsername = getByLabelText($form, 'Username')
    const inputPassword = getByLabelText($form, 'Password')

    fireEvent.input(inputUsername, { target: { value: 'jin' } })
    fireEvent.input(inputPassword, { target: { value: 'kazama' } })

    expect(errorUsername).toHaveTextContent('Username at least minimum 5 characters and maximum 10 characters')
    expect(errorPassword).toHaveTextContent('Password at least minimum 8 characters and maximum 50 characters')
  })
})
