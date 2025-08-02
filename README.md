<div align="center">

<a href="https://marketplace.visualstudio.com/items?itemName=lofcz.model-pulse"><picture>
<img alt="Model Pulse Logo" src="https://github.com/lofcz/model-pulse/raw/main/media/icon.png" width="160px">
</picture></a>

<h1 align="center">Model Pulse</h1>

<p>
Your cosmic guide to the latest free-to-use AI models, right in your editor.
</p>

<!-- Badges -->
<p>
  <a href="https://marketplace.visualstudio.com/items?itemName=lofcz.model-pulse">
    <img alt="Visual Studio Marketplace Version" src="https://img.shields.io/visual-studio-marketplace/v/lofcz.model-pulse?style=for-the-badge&label=Version&color=5865F2">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=lofcz.model-pulse">
    <img alt="Visual Studio Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/lofcz.model-pulse?style=for-the-badge&color=57F287">
  </a>
  <a href="https://github.com/lofcz/model-pulse/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/lofcz/model-pulse?style=for-the-badge&color=orange">
  </a>
</p>

</div>

---

## 🔮 Stay Ahead of the Curve

**Model Pulse** is a lightweight VS Code extension that keeps you on the cutting edge of generative AI. It automatically fetches the latest free-to-use models from OpenRouter and displays them in a clean, native tree view in your sidebar. Never miss a new model release again.

## ✨ Key Features

- **Real-Time Updates**: Automatically discovers and lists the newest free models from OpenRouter.
- **Effortless Configuration**: Instantly copy the provider, base URL, and model ID to configure tools like Cline.
- **Native VS Code UI**: A clean, fast, and responsive tree view that feels right at home in your editor.
- **Hourly Sync**: Keeps the model list fresh with automatic checks every hour.

## 🚀 Quick Start

1. **Install** the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lofcz.model-pulse).
2. **Open** the Model Pulse icon in your activity bar.
3. **Expand** a model to view its details.
4. **Click** on `Provider`, `Base URL`, or `Model ID` to copy the value.

*We recommend adding a demo GIF here to showcase the extension in action.*

## ⚙️ How to Use with Cline

Model Pulse makes it trivial to use the latest free models with powerful AI assistants like [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev).

1. **Open Cline's Settings** in VS Code (`File` > `Preferences` > `Settings`, then search for `cline`).
2. **Copy & Paste the Provider**:
    - In Model Pulse, expand a model and click **`Provider: openrouter`**.
    - In Cline's settings, set both `Plan Mode API Provider` and `Act Mode API Provider` to `openrouter`.
3. **Copy & Paste the Model ID**:
    - In Model Pulse, click **`Model ID: ...`**.
    - In Cline's settings, paste the ID into `Plan Mode OpenRouter Model ID` and `Act Mode OpenRouter Model ID`.

That's it! You're ready to code with the newest models.

## 🤝 Contributing

Have an idea to make Model Pulse even better? Contributions are welcome! Please feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/lofcz/model-pulse).

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
