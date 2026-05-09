#!/bin/bash
# Synthesize cinematic motion videos from Nano Banana start/end keyframes
# using ffmpeg crossfade + Ken-Burns zoom. Produces raw/scene-N.mp4 (8s @ 30fps).
# This is the fallback path when Veo API is unavailable.

set -euo pipefail

SCENES=(1 2 3)
DURATION=8
FPS=30
W=1920
H=1080

mkdir -p raw

for n in "${SCENES[@]}"; do
  start="public/frames-source/scene-${n}-start.jpg"
  end="public/frames-source/scene-${n}-end.jpg"
  out="raw/scene-${n}.mp4"

  if [[ ! -f "$start" || ! -f "$end" ]]; then
    echo "✗ scene-${n}: missing keyframes"
    continue
  fi

  echo "→ scene-${n}: morphing ${start} → ${end} (${DURATION}s)"

  # Create a crossfade morph from start to end with Ken-Burns zoom on each.
  # Result: smooth cinematic motion.
  ffmpeg -y \
    -loop 1 -t $((DURATION + 2)) -i "$start" \
    -loop 1 -t $((DURATION + 2)) -i "$end" \
    -filter_complex "
      [0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},
        zoompan=z='zoom+0.0008':d=$((DURATION * FPS + 60)):x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS},
        format=yuv420p[v0];
      [1:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},
        zoompan=z='zoom+0.0008':d=$((DURATION * FPS + 60)):x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS},
        format=yuv420p[v1];
      [v0][v1]xfade=transition=fade:duration=${DURATION}:offset=0,trim=duration=${DURATION},setpts=PTS-STARTPTS[v]
    " \
    -map "[v]" \
    -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -r ${FPS} \
    -movflags +faststart \
    "$out" 2>&1 | tail -3

  echo "✓ scene-${n}: $(ls -lh "$out" | awk '{print $5}')"
done

echo "✓ all scenes morphed."
