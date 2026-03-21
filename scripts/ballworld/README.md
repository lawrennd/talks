# Ballworld Interactive Demos

This directory contains shared JavaScript runtime and scenario scripts for interactive physics demos used in talks.

## What lives here

- `ballworld.js`: shared runtime (objects, physics loop, collisions, drawing, histogram logic).
- Scenario overlays:
  - `multiball.js`
  - `maxwell.js`
  - `szilard.js`
  - `kappenball.js`
- Supporting/legacy scripts:
  - `pinball.js`, `kinetic.js`, `constructors.js`, `ballkeys.js`, `ballbuttons.js`, `script.js`, `script2.js`

## How talks include these scripts

Script loading is managed from the snippets repository via include guards:

- Base loader: `snippets/_scripts/includes/ballworld-js.md`
- Scenario loaders:
  - `snippets/_scripts/includes/multiball-js.md`
  - `snippets/_scripts/includes/maxwell-js.md`
  - `snippets/_scripts/includes/szilard-js.md`
  - `snippets/_scripts/includes/kappenball-js.md`

Typical usage in a talk snippet:

1. Add HTML elements (`canvas`, controls, outputs).
2. Include the scenario loader (for example `maxwell-js.md`).
3. The scenario loader includes `ballworld-js.md` and then scenario-specific JS.

## Entropy displayed in demos

In the `HistogramGame` code path in `ballworld.js`, the displayed entropy is:

- Shannon entropy of the empirical velocity-bin histogram
- computed from sampled `dx`/`dy` values across balls

So this is a **coarse-grained information measure** for visual intuition. It is **not** a full thermodynamic entropy of the complete microscopic state.

This is why the UI text and captions in snippets now use **"Velocity-bin entropy"**.

## Ball–ball collision implementation notes

Two subtleties worth knowing:

**Approaching guard** — `ballCollision` only exchanges velocities when the balls are
both overlapping *and* approaching (positive dot-product of relative position and
relative velocity). Without this guard the collision response fires on every frame
that two balls remain in contact, reversing the velocities each time and locking
them in a vibrating entangled cluster.

**Symmetric position correction** — `staticCollision` pushes each ball half the
overlap distance in opposite directions. An earlier version tried to move only the
"smaller" ball, but this aliased to the same object for equal-radius balls (all
balls in multiball have the same radius), leaving one ball unmoved and the overlap
unresolved, which compounded the re-collision problem above.

## Notes for maintainers

- Keep physics/runtime logic in `ballworld.js` where possible.
- Keep scenario behavior in scenario files (`maxwell.js`, `multiball.js`, etc.).
- If you add a new scenario script, add a matching loader include in `snippets/_scripts/includes/`.
