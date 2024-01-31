#!/bin/bash

rm -f demo.gif
rm -f demo.mp4
agg demo.rec demo.gif --idle-time-limit 1 --theme monokai --font-size 14
ffmpeg -i demo.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" demo.mp4