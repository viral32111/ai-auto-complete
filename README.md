# AI Auto-Complete

[![CI](https://github.com/viral32111/ai-auto-complete/actions/workflows/ci.yml/badge.svg)](https://github.com/viral32111/ai-auto-complete/actions/workflows/ci.yml)
[![CodeQL](https://github.com/viral32111/ai-auto-complete/actions/workflows/codeql.yml/badge.svg)](https://github.com/viral32111/ai-auto-complete/actions/workflows/codeql.yml)
![GitHub tag (with filter)](https://img.shields.io/github/v/tag/viral32111/ai-auto-complete?label=Latest)
![GitHub repository size](https://img.shields.io/github/repo-size/viral32111/ai-auto-complete?label=Size)
![GitHub release downloads](https://img.shields.io/github/downloads/viral32111/ai-auto-complete/total?label=Downloads)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/viral32111/ai-auto-complete?label=Commits)

This is a demonstration of using [OpenAI's GPT natural language models](https://platform.openai.com/docs/models) to generate suggestions & auto-completions for searches.

## 📜 Background

A website said it was doing this which made me want to try it out for myself 😛

# 📥 Usage

The recommended way to use this project is via the [Docker image](https://github.com/users/viral32111/packages/container/package/ai-auto-complete).

Run the following command to download the image and create a container:

```
docker run \
  --name ai-auto-complete \
  --env OPENAI_API_KEY=YOUR_API_KEY_HERE \
  --publish 6900:6900 \
  --detach \
  ghcr.io/viral32111/ai-auto-complete:latest
```

Ensure to replace `YOUR_API_KEY_HERE` with your OpenAI API key (see [configuration](#Configuration)).

## ⚙️ Configuration

The following environment variables are used to configure functionality:

* `EXPRESS_BROWSER_DIRECTORY`
  * The path to the [browser directory](browser/).
  * Defaults to `./browser`.
* `EXPRESS_ADDRESS`
  * The IP address to listen for web requests on.
  * Defaults to `127.0.0.1`.
* `EXPRESS_PORT`
  * The port number to listen for web requests on.
  * Defaults to `6900`.
* `OPENAI_API_KEY`
  * Your [OpenAI account API key](https://platform.openai.com/account/api-keys).
* `OPENAI_MODEL`
  * The name of an [OpenAI model](https://platform.openai.com/docs/models) your account has access to.
  * Defaults to `text-davinci-003`.
* `MAX_COMPLETIONS`
  * The maximum number of completions to generate.
  * Defaults to `5`.
* `MAX_QUERY_LENGTH`
  * The maximum character length of a search query.
  * Defaults to `100`.

## 🏗️ Building

1. Clone this repository via `git clone https://github.com/viral32111/ai-auto-complete`.
2. Open a terminal in the repository's directory.
3. Install production & development dependencies via `npm install`.
4. Create an environment variables file (`.env`) with [the required properties](#Configuration).
5. Launch via `npm start`.
6. Open your web browser & navigate to the configured address.

## 🔗 Useful Links

* [Tailwind CSS documentation](https://tailwindcss.com/docs/utility-first)
* [Webpack configuration documentation](https://webpack.js.org/concepts/configuration/)
* [OpenAI completion guide](https://platform.openai.com/docs/guides/completion)
* [OpenAI completions API reference](https://platform.openai.com/docs/api-reference/completions/create?lang=node.js)
* [Express guide](https://expressjs.com/en/guide/routing.html)
* [NPM log4js package](https://www.npmjs.com/package/log4js)
* [NPM dotenv package](https://www.npmjs.com/package/dotenv)
* [NPM openai package](https://www.npmjs.com/package/openai)

## ⚖️ License

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
