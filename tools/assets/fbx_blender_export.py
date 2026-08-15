"""Pinned headless Blender bridge for Pixeldart offline import.

This script only produces a neutral GLB inspection artifact. It does not make
game-specific materials, LODs, collision, portals, or runtime manifests.
"""
import argparse
import bpy


def parse_args():
    marker = "--"
    argv = __import__("sys").argv
    if marker in argv:
        argv = argv[argv.index(marker) + 1 :]
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument(
        "--export-animations", choices=("true", "false"), default="false"
    )
    return parser.parse_args(argv)


def main():
    args = parse_args()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.fbx(
        filepath=args.source,
        use_custom_normals=True,
        use_image_search=False,
        automatic_bone_orientation=False,
        use_prepost_rot=True,
    )
    for obj in bpy.context.scene.objects:
        obj.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=args.out,
        export_format="GLB",
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_tangents=True,
        export_materials="EXPORT",
        export_animations=args.export_animations == "true",
    )


if __name__ == "__main__":
    main()
