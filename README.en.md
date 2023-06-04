# Monster Notebook Case

## Used Technologies

- [NextJS](https://nextjs.org/): I prefer to use this after removing the create-react-app support in React. 
- [Storeon](https://github.com/storeon/storeon): It uses a structure similar to Redux architecture. It allows you to write less code compared to Redux and has a smaller byte size.
- [TailwindCSS](https://tailwindcss.com/): It is used to speed up the design process.

## Installation

This project is built using NextJS. You can navigate to the project folder and run the following commands to start the project.

```bash
npm install
npm run dev
```

**---OR--**

```bash
yarn install
yarn dev
```

## How It Works

The project runs on port 3000. If it is occupied, it continues on port 3001. You can check it there. At the beginning of the project, the store in the `store` folder integrates with the project. By default, it is based on `usd`, and the `currency/fetch/all-currencies` function is executed first. This function fetches the descriptions of all currencies and stores them in the `store`. Then the `currency/fetch/exchange-rate` function is executed to fetch the exchange rates of all currencies and store them in the `store`. However, since this function will be updated every minute, it is called again from a `setInterval` hook to be called every minute. After these processes are completed, the `currency` state in the `store` is updated. After this is done, to prevent old data from occupying memory, all data fetched two times ago is deleted based on the number of the `fetchCount` variable. The fetched data is printed to the screen by the `Table` component and a class is conditionally added while printing (whether the background will be white, green, or red).