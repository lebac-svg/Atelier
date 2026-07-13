# Render photoreal từ GLB của Atelier bằng Blender (backlog P5+ — doc 10).
#
#   blender -b -P scripts/render-photoreal.py -- <file.glb> <out.png> [gio] [thang]
#
# - Nhập GLB (export format 'gltf' của Atelier — mét thật, mỗi entity một node).
# - Dựng nắng theo giờ + tháng (mặc định 9h, tháng 6) — cùng công thức rút gọn
#   với sun study trong editor; trời nền procedural (Nishita sky).
# - Camera tự đóng khung toàn nhà từ góc 3/4; Cycles 128 samples.
# Đây là pipeline TÙY CHỌN: cần cài Blender ≥ 3.6 (https://blender.org).

import math
import sys

import bpy

argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
if len(argv) < 2:
    print("Cách dùng: blender -b -P scripts/render-photoreal.py -- <file.glb> <out.png> [gio] [thang]")
    sys.exit(1)
glb_path, out_path = argv[0], argv[1]
gio = float(argv[2]) if len(argv) > 2 else 9.0
thang = int(argv[3]) if len(argv) > 3 else 6
vi_do = 10.8  # TP.HCM — đổi nếu cần

# ── cảnh sạch + nhập GLB ────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=glb_path)

# ── nắng: declination Cooper + góc giờ (khớp sun.ts) ────────────
n = [15, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349][max(0, min(11, thang - 1))]
decl = math.radians(23.45 * math.sin(math.radians(360 * (284 + n) / 365)))
H = math.radians(15 * (gio - 12))
phi = math.radians(vi_do)
sin_alt = math.sin(phi) * math.sin(decl) + math.cos(phi) * math.cos(decl) * math.cos(H)
alt = math.asin(max(-1, min(1, sin_alt)))
cos_az = (math.sin(decl) - math.sin(phi) * sin_alt) / (math.cos(phi) * math.cos(alt) or 1e-9)
az = math.acos(max(-1, min(1, cos_az)))
if H > 0:
    az = 2 * math.pi - az

sun = bpy.data.objects.new("Sun", bpy.data.lights.new("Sun", type="SUN"))
sun.data.energy = 4.0
sun.rotation_euler = (math.pi / 2 - alt, 0, -az)
bpy.context.collection.objects.link(sun)

world = bpy.data.worlds.new("Sky")
world.use_nodes = True
sky = world.node_tree.nodes.new("ShaderNodeTexSky")
sky.sky_type = "NISHITA"
sky.sun_elevation = alt
sky.sun_rotation = az
bg = world.node_tree.nodes["Background"]
world.node_tree.links.new(sky.outputs["Color"], bg.inputs["Color"])
bpy.context.scene.world = world

# ── camera tự đóng khung ────────────────────────────────────────
xs, ys, zs = [], [], []
for ob in bpy.context.scene.objects:
    if ob.type == "MESH":
        for c in ob.bound_box:
            w = ob.matrix_world @ __import__("mathutils").Vector(c)
            xs.append(w.x)
            ys.append(w.y)
            zs.append(w.z)
cx, cy, cz = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, (min(zs) + max(zs)) / 2
r = max(max(xs) - min(xs), max(ys) - min(ys), max(zs) - min(zs))

cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
cam.location = (cx + r * 1.3, cy - r * 1.5, cz + r * 0.9)
bpy.context.collection.objects.link(cam)
bpy.context.scene.camera = cam
direction = __import__("mathutils").Vector((cx, cy, cz)) - cam.location
cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

# ── đất nền ─────────────────────────────────────────────────────
bpy.ops.mesh.primitive_plane_add(size=r * 12, location=(cx, cy, min(zs) - 0.01))

# ── render Cycles ───────────────────────────────────────────────
sc = bpy.context.scene
sc.render.engine = "CYCLES"
sc.cycles.samples = 128
sc.render.resolution_x = 1920
sc.render.resolution_y = 1280
sc.render.filepath = out_path
bpy.ops.render.render(write_still=True)
print(f"✔ render → {out_path} (nắng {gio}h tháng {thang})")
