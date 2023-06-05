# 💅 DataGrid Proof of concept

[![Netlify Status](https://api.netlify.com/api/v1/badges/31e43b90-bcc3-42bd-8dbd-cdbecf2bb988/deploy-status)](https://app.netlify.com/sites/comfy-cendol-ac4ce5/deploys)


## 🔎 Filtering

Users should be able to filter the table.
They expressed that every column should include an input field where they could type their search.
The table should then be filtered so that only rows that match the search term for the respective column are included.


## 🗄️ Sorting

Users should be able to sort every column of the table.
If the user clicks the column title for the first time it should sort this column in ascending order.
When an user clicks the same title again this should toggle between ascending and descending.


### 🎁 Installing dependencies

This project uses `yarn`.
You can run the following command to install all dependencies.

```sh
yarn install
```

### 🛠️ Running the dev server

To see what you're building run the following command:

```sh
yarn start
```

It will start the dev-server and open a page in your default browser.

### 🧪 Testing

This project uses [`jest`](https://jestjs.io/) as a test runner.
The tests are written using [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro).
Also, we have enhanced the `expects` with [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) to give you some more explicit assertions.

You can run all tests with the following command:

```sh
yarn test
```

### 📦 Example data

Since there is no backend in this exercise all data comes from `./src/data.json`.

On a real world scenario, you could potentially argue with a backend developer to change the way the data is provided. For this specific exercise our focus in on how you would handle this data in the way you got it right now.

## [Live Demo](https://comfy-cendol-ac4ce5.netlify.app/) 🔥

![Demo](/demo/screen1.jpg)

![Demo](/demo/screen2.jpg)

![Demo](/demo/demo.gif)
