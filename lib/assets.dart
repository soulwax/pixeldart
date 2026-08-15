/// Public entry point for Pixeldart's source-neutral asset pipeline.
///
/// Offline converters may live under `tools/assets`; browser-facing libraries
/// under `lib/**` must remain free of `dart:io` and game-package imports.
library;

export 'assets/assets.dart';
