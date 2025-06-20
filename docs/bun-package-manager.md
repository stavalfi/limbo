##### Install project

```shell
bun install
```

##### Add a new depenency

```shell
bun install lodash@4.0.0
bun install lodash@4.0.0 -D # will be listen in devDependencies
```

##### Why a dependnecy is installed in our node_modules

currently, bun [still dont support](https://github.com/oven-sh/bun/issues/692) `npm ls` natively so we can use an external package to do this:

```shell
> bunx qnm mimic-fn

exmaple output:

mimic-fn 5.0.0 ↰ 1 year ago | 4.0.0 ↰ 3 years ago
├── 4.0.0 ⇡ 3 years ago
├─┬ jest-changed-files
│ └─┬ execa
│   └─┬ onetime
│     └── 2.1.0 ⇡ 5 years ago
├─┬ lint-staged
│ └── 4.0.0 ⇡ 3 years ago
├─┬ log-update
│ └─┬ cli-cursor
│   └─┬ restore-cursor
│     └─┬ onetime
│       └── 2.1.0 ⇡ 5 years ago
└─┬ restore-cursor
  └─┬ onetime
    └── 2.1.0 ⇡ 5 years ago
```

##### find a package in npm registery

```shell
bunx npm view lodash
```
