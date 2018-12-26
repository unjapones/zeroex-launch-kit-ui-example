UI example project based on `create-react-app` that interfaces with `0x-launch-kit`.

## Install dependencies and start `create-react-app`

To install the dependencies and clone `0x-launch-kit`, run:

```
npm install
```

To start the Relayer and launch the `ui-example`, execute:

```
npm run dev
```

`0x-launch-kit` will listen on port 3000 (the default one) and the `ui-example` will be running on `3001`.

## Notes

`ui-example` is configured to use typescript.
`ui-example` is configured to proxy connections to the Relayer when making requests to [`/api/...`](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development).

