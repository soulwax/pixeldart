# PLIB-05 Documentation Links

`tools/test_plib05_docs_links.dart` validates relative Markdown links in the
package-local `docs/` tree without network access. The README contains links to
parent-repository screenshots and browser tooling; those are non-normative
case-study evidence and are intentionally not treated as package contents.
External URLs are not fetched; release review must still verify those links
separately.
