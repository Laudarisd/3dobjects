# Product Files Directory

This directory contains the downloadable ZIP files for your 3D products.

## File Naming Convention

- Use the product ID as the filename: `1.zip`, `2.zip`, etc.
- Or use descriptive names: `robot-model.zip`, `spaceship-pack.zip`

## Example Structure

```
assets/products/
├── 1.zip          # Robot Model Files
├── 2.zip          # Spaceship Pack
├── 3.zip          # Building Set
├── 4.zip          # Character Pack
├── 5.zip          # Vehicle Collection
└── 6.zip          # Weapon Arsenal
```

## What to Include in Each ZIP

Each product ZIP should contain:

1. **3D Model Files**
   - `.blend` (Blender files)
   - `.fbx` or `.obj` (Universal formats)
   - `.max` (3ds Max files, if applicable)

2. **Textures & Materials**
   - Diffuse maps
   - Normal maps
   - Specular/Roughness maps
   - Material files (.mtl, .mat)

3. **Documentation**
   - `README.txt` with usage instructions
   - License information
   - Version notes
   - System requirements

4. **Preview Images**
   - High-resolution renders
   - Wireframe views
   - Different angles

## Security Note

Files in this public directory are accessible to anyone who knows the direct URL. For better security in production:

1. Use obfuscated filenames (e.g., `a8f3d92b4e1c.zip`)
2. Implement server-side download verification
3. Use time-limited download tokens
4. Consider cloud storage solutions (AWS S3, Google Cloud)

## Sample File Structure for a Product

```
robot-model.zip
├── models/
│   ├── robot.blend
│   ├── robot.fbx
│   └── robot.obj
├── textures/
│   ├── robot_diffuse.jpg
│   ├── robot_normal.jpg
│   └── robot_specular.jpg
├── materials/
│   └── robot.mtl
├── documentation/
│   ├── README.txt
│   ├── LICENSE.txt
│   └── changelog.txt
└── previews/
    ├── robot_front.jpg
    ├── robot_side.jpg
    └── robot_wireframe.jpg
```
