#!/usr/bin/env python3
"""Decode a saved Google Drive MCP tool-result into a real image file.

Large downloads exceed the tool's inline output limit, so the harness spills the
full JSON payload to disk instead. That payload is base64 — this reads it from
disk and writes the decoded bytes out, so the encoded blob never has to pass
through the conversation.

Usage: decode-drive-result.py <result.json/.txt> <output-dir>
"""

import base64
import json
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__.strip())
        return 2

    result_path, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    payload = json.loads(result_path.read_text())
    title = payload.get("title") or payload["id"]
    data = base64.b64decode(payload["content"])

    dest = out_dir / title
    dest.write_bytes(data)
    print(f"{dest}  {len(data) / 1e6:.1f}MB  {payload.get('mimeType', '?')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
