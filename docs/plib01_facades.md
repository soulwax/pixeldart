# PLIB-01 Facade Map

PLIB-01 freezes three intentionally separate entry points. Existing deep
imports remain supported during the migration window; this packet does not
rename or remove them.

| Facade | Intended consumer | Includes | Excludes |
| --- | --- | --- | --- |
| `package:pixeldart/pixeldart.dart` | Game/application host | Renderer contracts, retained scene, materials, model packages, transforms | WebGL construction, passes, generated shaders, concrete stores |
| `package:pixeldart/pixeldart_advanced.dart` | Renderer policy/tooling host | Full renderer contracts, capability selection, graph planning, residency and browser promotion | Game state and host storage |
| `package:pixeldart/pixeldart_testing.dart` | Fake-device, conformance, and offline asset fixtures | Lifecycle/frame contracts, resource plans, device interface, deterministic LOD planning, cache fixture | Browser implementation and production-only host code |

The compile fixture is
`external/pixeldart/tools/test_plib01_facades.dart`. It proves that a stable
consumer, advanced policy consumer, and testing consumer can type-check through
these facades without importing undocumented paths.
