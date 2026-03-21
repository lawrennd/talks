# talks

Talks from Neil Lawrence

To create talks from these files you need to access the python package `makemd`. This package includes a macro language implemented in the generic preprocessor, `gpp` for interpeting the markdown.

You can install with

```
apt-get install gpp
pip install lamd
```

## Keeping LaMD tooling (and local Cursor rules) up to date

If you’re working on this repo regularly, it’s often simplest to rerun LaMD’s minimal installer to refresh the **local LaMD editor/agent guidance** (Cursor rules, optional `.cursor/rules`, etc.).

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/lawrennd/lamd/main/scripts/install-minimal.sh)"
```

Note: this does **not** (yet) install/update system dependencies like `gpp` or `pandoc`. It also only installs the Python tooling if you opt in (creates a local venv and installs `lamd`):

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/lawrennd/lamd/main/scripts/install-minimal.sh)" -- --with-venv
```

The talks folder is organised as follows.

Each general subject or lecture series comes under a sub-directory 

```
_subject/
```


Under that subject, there are a series of talks. Each as a markdown file. These files include various snippet files mainly from anothe repository. <https://github.com/lawrennd/snippets/>. They are also allocated to different subject files.

```
_subject/includes/
```

Different subjects have their own configuration files that are found in

```
_subject/_lamd.yml
```

## Ballworld interactive demos

Some talks include interactive physics demos (for example entropy billiards and Maxwell's demon) powered by scripts in `scripts/ballworld/`.

- Runtime and architecture documentation: `scripts/ballworld/README.md`
- Script includes are wired through snippet loaders in the snippets repo (`_scripts/includes/*-js.md`).
- The demo entropy readout is a velocity-histogram Shannon entropy proxy (coarse-grained), not full thermodynamic entropy.

