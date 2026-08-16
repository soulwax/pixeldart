# Three Productization Slices

The package boundary runner now covers three high-value slices:

1. **Facade ownership:** stable, advanced, and testing exports cannot drift
   into one another.
2. **Neutral host:** the minimal browser example stays independent of game
   code while retaining first-frame and context-recovery telemetry.
3. **Release boundary:** package vocabulary, links, sample media, governance,
   imports, and content hygiene run from one command.

Run `dart run tools/test_package_boundaries.dart` to execute all slices.
