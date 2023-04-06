# AI Auto-Complete

![GitHub CI workflow status](https://img.shields.io/github/actions/workflow/status/viral32111/ai-auto-complete/ci.yml?label=CI)
![GitHub CodeQL workflow status](https://img.shields.io/github/actions/workflow/status/viral32111/ai-auto-complete/codeql.yml?label=CodeQL)
![GitHub repository size](https://img.shields.io/github/repo-size/viral32111/ai-auto-complete?label=Size)
![GitHub last commit](https://img.shields.io/github/last-commit/viral32111/ai-auto-complete?label=Last%20Commit)

This is a demonstration of using [OpenAI's GPT natural language models](https://platform.openai.com/docs/models) to generate suggestions & auto-completions for searches.

**NOTE: This project is under development, functionality is not guaranteed!**

## Background

A website said it was doing this which made me want to try it out for myself 😛

## Configuration

Environment variables are used to configure functionality.

* `EXPRESS_BROWSER_DIRECTORY`
  * Should be the path to the [browser directory](browser/).
  * Defaults to `./browser`.
* `EXPRESS_ADDRESS`
  * Should be the IP address to listen for web requests on.
  * Defaults to `127.0.0.1`.
* `EXPRESS_PORT`
  * Should be the port number to listen for web requests on.
  * Defaults to `6900`.

## Building

1. Clone this repository via `git clone https://github.com/viral32111/ai-auto-complete`.
2. Open a terminal in the repository's directory.
3. Install production & development dependencies via `npm install`.
4. Create an environment variables file (`.env`) with [the required properties](#Configuration).
5. Launch via `npm start`.
6. Open your web browser & navigate to the configured address.

## Useful Links

* [Tailwind CSS documentation](https://tailwindcss.com/docs/utility-first)
* [Webpack configuration documentation](https://webpack.js.org/concepts/configuration/)
* [OpenAI chat completion guide](https://platform.openai.com/docs/guides/chat)
* [OpenAI chat API reference](https://platform.openai.com/docs/api-reference/chat/create)
* [Express guide](https://expressjs.com/en/guide/routing.html)
* [NPM log4js package](https://www.npmjs.com/package/log4js)
* [NPM dotenv package](https://www.npmjs.com/package/dotenv)
* [NPM openai package](https://www.npmjs.com/package/openai)

## License

Copyright (C) 2023 [viral32111](https://viral32111.com).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see https://www.gnu.org/licenses.
