# Course Creation Guide

This guide describes the complete expected format for creating a course compatible with LearnTech.

## Overview

A course is an archive (ZIP or TAR.ZST) containing a root folder with a `metadata.json` file, an icon, and a tree structure of chapters and lessons.

## Complete Course Structure

```
my-course/
├── metadata.json                          # Describes the course, its chapters and lessons
├── icon.png                               # Course icon (PNG, recommended 256×256)
└── chapters/
    ├── chapter-01/
    │   ├── lesson-01/
    │   │   ├── CourseContent.jsx           # Lesson text content (JSX)
    │   │   ├── video.mp4                   # Video (if type is VIDEO or TEXT_AND_VIDEO)
    │   │   ├── images/                     # Images referenced in JSX
    │   │   │   ├── diagram.png
    │   │   │   └── screenshot.jpg
    │   │   ├── code/                       # Code files displayed with syntax highlighting
    │   │   │   ├── example.js
    │   │   │   └── solution.tsx
    │   │   └── data/                       # Downloadable files
    │   │       ├── starter-project.zip
    │   │       └── cheatsheet.pdf
    │   └── lesson-02/
    │       └── ...
    └── chapter-02/
        └── ...
```

## metadata.json

The `metadata.json` file is located at the root of the course folder. It describes the entire structure.

### Full Schema

```json
{
  "id": "react-fundamentals",
  "name": "React Fundamentals",
  "description": "Learn the core concepts of React: components, hooks, and state management",
  "buildAt": "2025-03-15T10:30:00Z",
  "chapters": [
    {
      "id": "ch-01-introduction",
      "position": 1,
      "name": "Introduction to React",
      "lessons": [
        {
          "id": "lesson-01-what-is-react",
          "position": 1,
          "name": "What is React?",
          "type": "TEXT",
          "codeSnippets": [],
          "resources": [],
          "downloads": []
        },
        {
          "id": "lesson-02-setup",
          "position": 2,
          "name": "Setting Up Your Environment",
          "type": "TEXT_AND_VIDEO",
          "videoDuration": 420,
          "codeSnippets": [
            {
              "id": "create-app",
              "position": 1,
              "language": "bash",
              "extension": "sh"
            }
          ],
          "resources": [
            {
              "id": "github-repo",
              "type": "GITHUB",
              "url": "https://github.com/user/react-starter"
            }
          ],
          "downloads": [
            {
              "id": "dl-starter",
              "fileName": "starter-template.zip",
              "label": "Download Starter Template"
            }
          ]
        }
      ]
    }
  ]
}
```

### Field Details

#### Course (root)

| Field         | Type     | Required | Description                                  |
| ------------- | -------- | -------- | -------------------------------------------- |
| `id`          | string   | yes      | Unique identifier, used as folder name. Slug format recommended (e.g., `react-fundamentals`) |
| `name`        | string   | yes      | Display name in the application              |
| `description` | string   | yes      | Course description                           |
| `buildAt`     | string   | yes      | Build date in ISO 8601 format                |
| `chapters`    | array    | yes      | List of chapters                             |

#### Chapter

| Field     | Type     | Required | Description                                       |
| --------- | -------- | -------- | ------------------------------------------------- |
| `id`      | string   | yes      | Unique chapter identifier                         |
| `position`| number   | yes      | Display order (sequential integer starting from 1)|
| `name`    | string   | yes      | Display name                                      |
| `lessons` | array    | yes      | List of lessons                                   |

#### Lesson

| Field           | Type     | Required | Description                                  |
| --------------- | -------- | -------- | -------------------------------------------- |
| `id`            | string   | yes      | Unique lesson identifier                     |
| `position`      | number   | yes      | Display order (sequential integer, global to the course) |
| `name`          | string   | yes      | Display name                                 |
| `type`          | string   | yes      | Content type: `TEXT`, `VIDEO`, or `TEXT_AND_VIDEO` |
| `videoDuration` | number   | no       | Video duration in seconds (required if video present) |
| `codeSnippets`  | array    | yes      | List of code snippets (can be empty `[]`)    |
| `resources`     | array    | yes      | List of external resources (can be empty `[]`) |
| `downloads`     | array    | yes      | List of downloadable files (can be empty `[]`) |

#### CodeSnippet

| Field       | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `id`        | string | yes      | Unique identifier, also used as the base file name    |
| `position`  | number | yes      | Display order                                         |
| `language`  | string | yes      | Language for syntax highlighting (e.g., `javascript`, `typescript`, `python`) |
| `extension` | string | yes      | File extension (e.g., `js`, `tsx`, `py`)              |

The corresponding file must be placed in `code/{id}.{extension}`.

#### Resource

| Field  | Type   | Required | Description                                    |
| ------ | ------ | -------- | ---------------------------------------------- |
| `id`   | string | yes      | Unique identifier                              |
| `type` | string | yes      | Resource type: `GITHUB` or `STACKBLITZ`        |
| `url`  | string | yes      | Full URL to the resource                       |

- `GITHUB`: displayed as a link to the repository
- `STACKBLITZ`: embedded as an iframe in the lesson

#### Download

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `id`       | string | yes      | Unique identifier                              |
| `fileName` | string | yes      | Exact file name in the `data/` folder          |
| `label`    | string | yes      | Label displayed on the download button         |

The corresponding file must be placed in `data/{fileName}`.

## Lesson Types

| Type             | CourseContent.jsx | video.mp4 | Description                        |
| ---------------- | ----------------- | --------- | ---------------------------------- |
| `TEXT`           | required          | no        | Text content only                  |
| `VIDEO`          | no                | required  | Video only                         |
| `TEXT_AND_VIDEO`  | required          | required  | Video displayed on top, text below |

## Course Icon

- **File**: `icon.png` at the root of the course folder
- **Format**: PNG
- **Recommended size**: 256×256 pixels
- **Required**: yes

## Video

- **File**: `video.mp4` in the lesson folder
- **Name**: must be exactly `video.mp4`
- **Supported formats**: MP4 (recommended), WebM, MOV, AVI, MKV
- **Streaming**: the player supports seeking via HTTP range requests
- **Required**: only for lessons of type `VIDEO` or `TEXT_AND_VIDEO`

## Images

- **Folder**: `images/` in the lesson folder
- **Supported formats**: PNG, JPG/JPEG, SVG
- **Referencing**: via the `CourseImage` component in JSX (see next section)

## Downloadable Files

- **Folder**: `data/` in the lesson folder
- **Any format accepted**: ZIP, PDF, or any other file type
- **Download behavior**: opens a "Save As" dialog and copies the file to the chosen location
- **Two display modes**:
  - Automatic "Downloads" section at the bottom of the lesson (if `downloads` is non-empty in metadata)
  - Inline button via the `CourseDownload` component in JSX

## Code Snippets

- **Folder**: `code/` in the lesson folder
- **Naming**: `{id}.{extension}` (e.g., a snippet with `id: "example"` and `extension: "js"` becomes `code/example.js`)
- **Display**: automatic syntax highlighting with a "Copy" button
- **Languages**: all languages supported by Prism.js (javascript, typescript, python, rust, go, java, css, html, bash, etc.)

## CourseContent.jsx

The `CourseContent.jsx` file contains the lesson's text content, written in JSX. It is dynamically compiled by the application.

### Required Format

The file must export a named component called `CourseContent` that receives the available components as props:

```jsx
export const CourseContent = ({ CodeSnippet, CourseImage, CourseDownload }) => {
    return (
        <div>
            <h2>Introduction</h2>
            <p>Welcome to this lesson...</p>

            <CourseImage fileName="diagram.png" alt="Architecture diagram" />

            <h2>Code Example</h2>
            <CodeSnippet fileName="example.js" language="javascript" />

            <h2>Resources</h2>
            <CourseDownload fileName="starter-project.zip" label="Starter Project" />
        </div>
    )
}
```

### Available Components

#### `CourseImage`

Displays an image from the lesson's `images/` folder.

```jsx
<CourseImage
    fileName="diagram.png"    // File name in images/
    alt="Description"         // Alt text
    width={800}               // Width (optional)
    height={600}              // Height (optional)
/>
```

#### `CodeSnippet`

Displays a code excerpt with syntax highlighting and a copy button.

```jsx
<CodeSnippet
    fileName="example.js"       // File name in code/
    language="javascript"       // Language for highlighting
/>
```

#### `CourseDownload`

Displays a download button for a file from the `data/` folder.

```jsx
<CourseDownload
    fileName="starter.zip"              // File name in data/
    label="Download Starter"            // Button label (optional, defaults to file name)
/>
```

### Important Rules

- The export must be a **named export** called `CourseContent` using arrow function syntax
- React is handled internally — do not import or require it
- Only `CodeSnippet`, `CourseImage`, and `CourseDownload` are injected as props — no other imports are available
- Standard JSX (div, h1, p, ul, li, etc.) works normally

## Supported Archive Formats

| Format   | Extension        | Recommended | Notes                                    |
| -------- | ---------------- | ----------- | ---------------------------------------- |
| ZIP      | `.zip`           | yes         | Universal compatibility                  |
| TAR.ZST  | `.tar.zst`       | yes         | Better compression, ideal for large courses |

### Creating an Archive

```bash
# ZIP
zip -r my-course.zip my-course/

# TAR.ZST
tar --use-compress-program=zstd -cf my-course.tar.zst my-course/
```

## ID Naming Conventions

IDs must be unique within their context:

| Element          | Unique within         | Recommended format                 |
| ---------------- | --------------------- | ---------------------------------- |
| Course `id`      | global (all courses)  | `kebab-case` (e.g., `react-fundamentals`) |
| Chapter `id`     | the course            | `kebab-case` (e.g., `ch-01-intro`) |
| Lesson `id`      | the course            | `kebab-case` (e.g., `lesson-01-components`) |
| CodeSnippet `id` | the lesson            | `kebab-case` (e.g., `create-app`) — used as file name |
| Resource `id`    | the lesson            | `kebab-case` (e.g., `github-repo`) |
| Download `id`    | the lesson            | `kebab-case` (e.g., `dl-starter`) |

## Importing a Course into LearnTech

1. Open the **Course Manager** page
2. Set a **Root Folder** where courses will be extracted
3. Click **Import Archive** and select a ZIP or TAR.ZST file
4. The application checks for duplicates, extracts the archive, and creates database entries
5. The course appears in your library

## Full Example

Here is a minimal but complete example of a course with one chapter and two lessons:

### File Tree

```
react-hooks/
├── metadata.json
├── icon.png
└── chapters/
    └── ch-01-useState/
        ├── lesson-01-introduction/
        │   ├── CourseContent.jsx
        │   └── images/
        │       └── hooks-diagram.png
        └── lesson-02-counter/
            ├── CourseContent.jsx
            ├── video.mp4
            ├── code/
            │   ├── counter.jsx
            │   └── counter-final.jsx
            └── data/
                └── starter.zip
```

### metadata.json

```json
{
  "id": "react-hooks",
  "name": "React Hooks in Practice",
  "description": "Master useState, useEffect, and custom hooks",
  "buildAt": "2025-03-15T10:00:00Z",
  "chapters": [
    {
      "id": "ch-01-useState",
      "position": 1,
      "name": "useState",
      "lessons": [
        {
          "id": "lesson-01-introduction",
          "position": 1,
          "name": "Introduction to Hooks",
          "type": "TEXT",
          "codeSnippets": [],
          "resources": [],
          "downloads": []
        },
        {
          "id": "lesson-02-counter",
          "position": 2,
          "name": "Building a Counter",
          "type": "TEXT_AND_VIDEO",
          "videoDuration": 300,
          "codeSnippets": [
            {
              "id": "counter",
              "position": 1,
              "language": "jsx",
              "extension": "jsx"
            },
            {
              "id": "counter-final",
              "position": 2,
              "language": "jsx",
              "extension": "jsx"
            }
          ],
          "resources": [
            {
              "id": "demo-stackblitz",
              "type": "STACKBLITZ",
              "url": "https://stackblitz.com/edit/react-counter"
            }
          ],
          "downloads": [
            {
              "id": "dl-starter",
              "fileName": "starter.zip",
              "label": "Starter Project"
            }
          ]
        }
      ]
    }
  ]
}
```

### CourseContent.jsx (lesson-01-introduction)

```jsx
export const CourseContent = ({ CourseImage }) => {
    return (
        <div>
            <h2>React Hooks</h2>
            <p>
                Hooks are functions that let you use state and other React
                features in functional components.
            </p>
            <CourseImage fileName="hooks-diagram.png" alt="React Hooks Diagram" />
            <h3>Why Hooks?</h3>
            <ul>
                <li>Simplify component logic</li>
                <li>Reuse stateful logic between components</li>
                <li>Avoid classes</li>
            </ul>
        </div>
    )
}
```

### CourseContent.jsx (lesson-02-counter)

```jsx
export const CourseContent = ({ CodeSnippet, CourseDownload }) => {
    return (
        <div>
            <h2>Your First Hook: useState</h2>
            <p>Let's start by building a simple counter with useState.</p>

            <h3>Starter Code</h3>
            <CodeSnippet fileName="counter.jsx" language="jsx" />

            <h3>Final Solution</h3>
            <CodeSnippet fileName="counter-final.jsx" language="jsx" />

            <CourseDownload fileName="starter.zip" label="Download Starter Project" />
        </div>
    )
}
```
