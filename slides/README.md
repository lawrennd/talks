This directory exists to avoid GitHub Pages/Jekyll failing on a broken `slides` symlink.

Historically, `talks` used a symlink named `slides` pointing to a sibling repository (e.g. `../slides`)
on the author’s machine. GitHub Actions does a clean checkout without that sibling directory, which
breaks the build.

If you need to publish slide assets under `/talks/slides/`, place them in this directory (or manage
them via a submodule/subtree) rather than using a filesystem symlink that points outside this repo.
