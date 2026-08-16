# Contributing to Pixeldart

Keep changes small, deterministic, and host-neutral.

Before submitting a change:

1. Run `dart format --output=none --set-exit-if-changed .`.
2. Run `dart analyze`.
3. Run the focused tests for the changed facade or renderer subsystem.
4. Document public API changes and update `CHANGELOG.md`.

Do not add game-specific imports, source-format policy, hidden fallback
backends, or filesystem/network access to the library.

