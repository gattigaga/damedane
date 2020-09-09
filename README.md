# Damedane

Damedane is a small form validation library.

* Easy to use
* Small size
* It's jQuery free

## Installation

You can download it from:

https://github.com/gattigaga/damedane/releases

You can pick **damedane.min.js** from **dist** directory and use that like this.

```html
<!DOCTYPE html>
<html lang="en">
  <!-- Other code -->

  <body>
    <!-- Other code -->

    <script src="./damedane.min.js"></script>
  </body>
</html>
```

or

You can install it via NPM:

```bash
npm install damedane
```

And import that like this.

```javascript
import damedane from "damedane";
```

## Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo | Damedane</title>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }

      .container {
        height: 100vh;
        padding: 16px;
        box-sizing: border-box;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <form id="login-form" action="" method="POST">
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" name="username" />
          <!-- "data-error" attribute should be same with the "name" attribute. Error message will appear here. -->
          <p data-error="username"></p>
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" name="password" />
          <!-- "data-error" attribute should be same with the "name" attribute. Error message will appear here. -->
          <p data-error="password"></p>
        </div>
        <br />
        <button>Submit</button>
      </form>
    </div>

    <script src="./damedane.min.js"></script>
    <script>
      const $loginForm = document.querySelector('#login-form');

      const usernameRequired = (values) => {
        const { username } = values;

        return {
          name: 'username',
          isError: !username.length,
          message: 'Username is required',
        };
      };

      const passwordRequired = (values) => {
        const { password } = values;

        return {
          name: 'password',
          isError: !password.length,
          message: 'Password is required',
        };
      };

      damedane($loginForm, {
        values: {
          username: "",
          password: "",
        },
        rules: [
          usernameRequired,
          passwordRequired,
        ],
      });
    </script>
  </body>
</html>
```

[Access the working example here.](https://codesandbox.io/s/damedane-example-eove2)

## Options

**values**

Type: ```Object```

Initial values that will be set to the defined element in the form.
Name of the values should be same with element "name" attribute.

Example:

```html
<input type="text" name="username" value="" />
<input type="password" name="password" value="" />

<script>
  const values = {
    username: "steve.fox",
    password: "mishima.killer",
  }
</script>
```

**rules**

Type: ```Function[]```

Rules that used to validate the values.
The array contains functions that create the rules.

```javascript
// You can rename the ruleName.
const ruleName = (values) => {
  // Get updated value that you want to validate.
  const { username } = values;

  return {
    // It should be same with element "name" attribute that you want to validate.
    name: "username",
    // Indicate if the value is error or not.
    // If error, the message below will appear.
    isError: !username.length,
    // Message that appear if the value is error.
    message: "Username is required",
  };
}
```

Example:

```javascript
const usernameIsRequired = (values) => {
  const { username } = values;

  return {
    name: "username",
    isError: !username.length,
    message: "Username is required",
  };
};

const passwordIsRequired = (values) => {
  const { password } = values;

  return {
    name: "password",
    isError: !password.length,
    message: "Password is required",
  };
};

const rules = [
  usernameIsRequired,
  passwordIsRequired,
];
```

## Development

```npm start``` - to start development environment

```npm test``` - to test the project

```npm run build``` - to build project in production

## License

This project is licensed under the MIT License.

