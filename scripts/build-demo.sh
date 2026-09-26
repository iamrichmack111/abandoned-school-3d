#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

VOICE_DIR=".piper/en_US-ryan-high"
MODEL="$VOICE_DIR/en_US-ryan-high.onnx"
CONFIG="$VOICE_DIR/en_US-ryan-high.onnx.json"

mkdir -p "$VOICE_DIR" public/audio docs/demo public/screenshots
cp -f docs/screenshots/*.png public/screenshots/

if [ ! -f "$MODEL" ]; then
  curl -fL "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx" -o "$MODEL"
fi

if [ ! -f "$CONFIG" ]; then
  curl -fL "https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx.json" -o "$CONFIG"
fi

if [ ! -x ".demo-venv/bin/piper" ]; then
  python3 -m venv .demo-venv
  .demo-venv/bin/python -m pip install --upgrade pip
  .demo-venv/bin/pip install piper-tts
fi

.demo-venv/bin/piper \
  --model "$MODEL" \
  --config "$CONFIG" \
  --output_file public/audio/narration.wav \
  < demo/narration.txt

npx remotion render \
  demo/remotion/index.jsx \
  AbandonedSchoolDemo \
  docs/demo/abandoned-school-3d-demo.mp4 \
  --codec=h264 \
  --crf=18 \
  --overwrite

ls -lh docs/demo/abandoned-school-3d-demo.mp4
