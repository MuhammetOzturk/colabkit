
# ColabKit

---

ColabKit is a lightweight bridge between Python and JavaScript for Google Colab.  
It allows you to load custom JavaScript tools, interact with the browser, control the webcam, capture frames, and build interactive Colab applications with minimal effort.

This package bundles two client-side JavaScript modules:

- `media.js` – Camera control, frame capture, device switching  
- `console.js` – A styled typewriter-style console component

and provides a Python interface (`ColabKit`) that communicates with them through `google.colab.output`.

---

## Features

- Load and run custom JavaScript utilities inside Google Colab
- Control the webcam (start/stop/change camera)
- Capture image frames directly into Python as Base64
- Monitor device changes (camera plugged/unplugged)
- Display a browser-side animated console
- Simple, clean and extensible API

---

## Installation

```bash
pip install google-colabkit
```
or
```bash
pip install git+https://github.com/MuhammetOzturk/colabkit.git
```

---

## Quick Start

### 1. Import the module

```python
from colabkit import ColabKit
kit = ColabKit()
````

### 2. Load the JavaScript tools into the notebook

```python
kit.loadTools(["media.js", "console.js"])
```

### 3. Start the camera

```python
kit.startCamera()
```

### 4. Capture a frame

```python
frame = kit.captureFrame()
```

### 5. List cameras

```python
kit.listCameras()
```

### 6. Switch camera

```python
kit.changeCamera("device-id-here")
```

### 7. Stop the camera

```python
kit.stopCamera()
```

---

## File Structure (for reference)

```
colabkit/
│
├── colabkit/
│   ├── __init__.py
│   ├── colabkit.py
│   └── static/
│       ├── console.js
│       ├── media.js
├── README.md
├── LICENSE
├── pyproject.toml
└── setup.cfg
```

---

## Why ColabKit?

Google Colab allows JavaScript execution but provides no standard pattern for organizing JS tools or interacting with them from Python.
ColabKit solves this problem by bundling JS modules and exposing clean, Python-friendly methods such as:

* `startCamera()`
* `captureFrame()`
* `watchDeviceChanges()`
* `loadTools()`

This makes it ideal for:

* AI/computer-vision experiments
* Real-time camera processing
* Interactive notebooks
* Educational tools
* Browser-based demos

---

## Requirements

* Python 3.8+
* Google Colab environment
* `google-colab` Python package
* IPython

---

## License

MIT License

---

## Author

Developed by **Muhammet Ozturk**  
GitHub: [https://github.com/muhammetozturk](https://github.com/muhammetozturk)  
Email: [muhammetozturk.219@gmail.com](mailto:muhammetozturk.219@gmail.com)


