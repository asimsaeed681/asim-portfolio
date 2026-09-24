# Media needed for the project cards

Nothing here is invented: each slot renders a labelled placeholder until the
real file exists. To light a slot up, put the file at the path below, then set
`ready: true` on that slot in `src/lib/content.ts`.

## W1  Content Generation & Automation Pipeline (looping muted video)

| File | Spec |
| --- | --- |
| `public/media/w1-pipeline-loop.webm` | VP9, 720x1280 (9:16), 6-8 s seamless loop, no audio track, under 1.5 MB |
| `public/media/w1-pipeline-loop.mp4` | H.264 fallback of the same clip, same limits |
| `public/media/w1-pipeline-poster.jpg` | First frame, 720x1280, under 100 KB |

Use one real render from the pipeline (not a mockup). The video plays only while
on screen, is muted, and is not autoplayed for visitors who prefer reduced motion.

## W3  YouTube Feed Blocker (3 screenshots, 640x400, WebP, under 40 KB each)

| File | What to show |
| --- | --- |
| `public/media/w3-shorts-before.webp` | Search results with the Shorts shelf visible, extension off |
| `public/media/w3-shorts-after.webp` | Same search results, extension on, Shorts shelf gone |
| `public/media/w3-home-widgets.webp` | Home feed replaced by the focus widgets mode |

You already have 1280x800 PNGs in the youtube-feed-blocker repo under
`store-assets/screenshots/` (`04-shorts-before.png`, `05-shorts-after.png`,
`01-widgets.png`). Resize to 640x400 (the slots display at about 210 px wide, so
this covers 3x screens), convert to WebP at quality ~80, and copy them across.
