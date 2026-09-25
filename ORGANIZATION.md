# Where the original material went

The repository is now organized by **topic and learning order**, not by which source generated the material.
The lesson text, exercises, solutions, and example logic were retained. Navigation and run commands were updated.

| Previous location | Current location |
| --- | --- |
| `js-basics/Phase0_Environment/` | [curriculum/00-getting-started/](curriculum/00-getting-started/README.md); scripts are in `examples/` |
| `js-basics/Phase1_Fundamentals/` | [curriculum/01-fundamentals/](curriculum/01-fundamentals/README.md) |
| `js-basics/Phase2_Functions/` | [curriculum/02-functions-and-scope/](curriculum/02-functions-and-scope/README.md) |
| `js-basics/Phase3_Objects_Arrays_Prototypes/` | [curriculum/03-objects-and-arrays/](curriculum/03-objects-and-arrays/README.md) |
| `js-basics/Phase4_Async/` | [curriculum/04-asynchronous-javascript/](curriculum/04-asynchronous-javascript/README.md) |
| `js-basics/Phase5_DOM_Browser_APIs/` | [curriculum/05-dom-and-browser/](curriculum/05-dom-and-browser/README.md) |
| `js-basics/Phase6_Quality/` | [curriculum/06-modules-and-quality/](curriculum/06-modules-and-quality/README.md) |
| `js-basics/LEARNING_PATH.md` | [reference/STUDY_GUIDE.md](reference/STUDY_GUIDE.md), optional review rather than a second starting point |
| `js-basics/QUICK_REFERENCE.md` | [reference/QUICK_REFERENCE.md](reference/QUICK_REFERENCE.md) |
| `LearnJSUI5/js-basics/variables.js`, `dataTypes.js` | [Fundamentals examples](curriculum/01-fundamentals/README.md) |
| `LearnJSUI5/js-basics/functions.js`, `LearnJSUI5/advanced-js/closures.js` | [Functions and scope examples](curriculum/02-functions-and-scope/README.md) |
| `LearnJSUI5/js-basics/objects.js`, `arrays.js`, `LearnJSUI5/advanced-js/this-keyword.js`, `prototypes.js` | [Objects and arrays examples](curriculum/03-objects-and-arrays/README.md) |
| `LearnJSUI5/advanced-js/promises.js`, `async-await.js` | [Asynchronous JavaScript examples](curriculum/04-asynchronous-javascript/README.md) |
| `LearnJSUI5/ui5-aligned/` | [tracks/ui5/examples/](tracks/ui5/README.md) |
| `LearnJSUI5/mini-project/simple-ui5-like-app.js` | [projects/ui5-style/simple-ui5-like-app.js](projects/ui5-style/simple-ui5-like-app.js) |
| `SimpleJS_Opus/01-hello-world/` | [practice/01-hello-world/](practice/01-hello-world/README.md) |
| `SimpleJS_Opus/CHEATSHEET.md`, `GLOSSARY.md` | [reference/](reference/README.md), with the same filenames |
| `SimpleJS_Opus/package.json` | [package.json](package.json); run commands from the repository root |
| `SimpleJS_GPT/JAVASCRIPT_TUTORIAL.md` | [reference/JAVASCRIPT_TUTORIAL.md](reference/JAVASCRIPT_TUTORIAL.md) |

The four old top-level README files now introduce `curriculum/`, `practice/`, `reference/`, and `tracks/ui5/`.
The old Opus roadmap's unimplemented lessons and placeholder commands are no longer presented as available lessons.
The working `lesson:01` commands are retained for the hello-world practice set; `01` there is not the curriculum chapter number.

## Keeping it organized

- Put a new concept in the relevant curriculum chapter, and link it from that chapter's README.
- Keep runnable examples beside the topic in `examples/`; identify Node.js, browser, or external-service requirements.
- Add exercise/solution pairs to `practice/`, and link them from the relevant chapter.
- Put longer builds in `projects/` and framework-specific material in an optional `tracks/` subfolder.
- Keep alternative explanations in `reference/`; don't create another competing learning path.
- Link only to material that exists. Label future ideas as ideas, not completed lessons.
- Preserve existing lesson filenames; use consecutive numbering when extending a numbered lesson series.

[Back to the learning path](README.md)