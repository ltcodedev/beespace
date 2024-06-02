# Beespace Browser

Beespace is a browser based on the [Arc](https://arc.net/) browser. We are developing it using electron, as it is still based on chromium, but without a lot of clutter. A lot of things are manual and redone, but we believe it pays off, as we can bring a clean and fully customized browser.

### Motivation

What motivated me to make this browser. One of the reasons is that I always had a dream of developing my own browser and after getting to know the [Arc](https://arc.net/) project, I really wanted to try it out, as it seemed very interesting to me, but unfortunately there is a waiting list for an invitation to try it out, and from what I heard, it takes a long time for the invitation to arrive and since I didn't want to wait, I combined the useful with the pleasant, I started developing my own browser using the technologies that I had the most knowledge of and in a way that I could maintain without having to learn new technologies or programming languages.

## To-do list of things we want to bring to our browser

- [x] Style similar to the Arc browser
- [x] Bar to type url for navigation
- [x] Load url by pressing enter and without having to click on buttons
- [x] Url changes as you navigate (experimental)
- [x] Close, maximize and minimize buttons
- [x] Button to close and open the sidebar
- [x] Remove rounding when maximizing
- [ ] Search bar and to type a url (Put the keyboard shortcut `CTRL + E` Electron and Vivaldi style)
- [ ] Develop a home page to load when opening the browser
- [ ] Develop a page for when a new tab is created
- [ ] Develop a sidebar to load mini applications, such as for example: Whatsapp, Instagram, among others.
- [ ] [Find in page](https://www.electronjs.org/docs/latest/api/webview-tag#webviewfindinpagetext-options)
- [ ] Tabs
- [ ] Support for multiple windows
- [ ] Support for multiple profiles
- [ ] Settings page
- [ ] Make the browser customizable by the user
- [ ] Auto maximize on open application
- [ ] Support for extensions of
  - [Reference 1](https://www.electronjs.org/pt/docs/latest/api/extensions)
  - [Reference 2](https://github.com/ramboxapp/electron-chrome-extensions)
  - [ ] bring pre-installed adblock extension
  - [ ] bring pre-installed translation extension

> New things will be brought to the implementation list over time.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

Would you like to help us develop this project? Beebrowser is an open source project, feel free to want to help us.

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Stack used.

**Front-end:** React, TailwindCSS

**Back-end:** Node, Electron

## Authors

- [@eulukasthyago](https://www.github.com/eulukasthyago)
- [@ltcodedev](https://www.github.com/ltcodedev)
