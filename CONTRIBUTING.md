# Contributing

Pixeldart is licensed under GPL-3.0. Contributions must be compatible with
that licence and must not include assets or code whose redistribution rights
are unclear.

Before opening a change:

1. Run `dart analyze`.
2. Run `dart run tools/renderer/test_all.dart`.
3. Run the relevant boundary, asset, and package guards.
4. Describe any browser or driver evidence separately from fake-device tests.

Keep renderer code independent of application/game packages. New public APIs
need a contract test and documentation; implementation-only changes should
remain behind the package facades.
