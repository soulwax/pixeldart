# PLIB-05 Vocabulary Guard

`tools/test_plib05_vocabulary.dart` scans public Pixeldart library source for
game-specific nouns as standalone words. It intentionally permits renderer
terms that merely contain those letter sequences, such as `history`, and keeps
game integration evidence outside the package API surface.
