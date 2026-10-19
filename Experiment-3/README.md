# Experiment 3: Dynamic To-Do List

## Aim

Create a simple dynamic to-do list using HTML, CSS, and JavaScript.

## Tools and technologies used

- HTML5
- CSS3
- JavaScript and the browser DOM

## Basic description of the implementation

The page has a labelled task input and an Add Task button. When the form is submitted, JavaScript checks the input, creates a list item, and adds a Delete button. Each Delete button removes only its own task. Blank input displays a short message.

## Main concepts used

- Listening for a form submit event
- Reading and trimming input text
- Creating and removing DOM elements
- Using `textContent` to display user-entered text safely
- Keeping HTML, CSS, and JavaScript in separate files

## Steps to run the project

1. Open `index.html` in a web browser.
2. Enter a task and select **Add Task** (or press Enter).
3. Select **Delete** beside a task to remove it.

## How the JavaScript works

The script selects the form, input, task list, and message area by their IDs. A submit event listener prevents the page from reloading, checks that the trimmed input is not empty, and creates the task elements with `document.createElement`. The entered task is assigned with `textContent`, then the new list item is appended to the list. A click listener on each Delete button removes its list item with `.remove()`.

## Expected output

Tasks appear beneath the input after they are added. Each task can be removed independently, and blank tasks are not added.
