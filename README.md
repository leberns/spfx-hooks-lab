# spfx-hooks-lab

## Summary

Experiments with React Hooks.

### Add the TSLint Rules of Hooks

    cd C:\Dev\GitHub\leberns\spfx-hooks-lab   (your solution root folder)
    npm install tslint-react-hooks --save-dev

See the configurations with names containing "hooks" at `tslint.json`.

To check if the rule works open `TodoListEditor.tsx` and add a condition to one of the hooks, ex.:

```TypeScript
const [text, updateText] = useState('');
if (text === 'abc') {
const [priority, updatePriority] = useState(1);
}
```

In `useState(1)` the following message can be seen: "A hook cannot appear inside an if statement (react-hooks-nesting)tslint(1)"

If not, you might need to enable workspace library execution:

- open the Command Palette in VSCode (Control Shift P)
- type `ESLint: Manage Library Execution`
- enable it

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

None

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  npm install
  gulp serve

## References

- [TSLint - Rules of Hooks](https://www.npmjs.com/package/tslint-react-hooks)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
