import fs from 'fs';

const files = [
  { src: 'C:/Users/Hi Sir!!/.gemini/antigravity-ide/brain/2a728d9e-e022-4932-903c-0e1c71280623/hero_pushup_pose_1790573942499.png', dest: 'e:/ironise/frontend/public/hero_pushup_pose.png' },
  { src: 'C:/Users/Hi Sir!!/.gemini/antigravity-ide/brain/2a728d9e-e022-4932-903c-0e1c71280623/ai_plank_pose_1790573962833.png', dest: 'e:/ironise/frontend/public/ai_plank_pose.png' },
  { src: 'C:/Users/Hi Sir!!/.gemini/antigravity-ide/brain/2a728d9e-e022-4932-903c-0e1c71280623/exercise_squat_1790573999316.png', dest: 'e:/ironise/frontend/public/exercise_squat.png' },
  { src: 'C:/Users/Hi Sir!!/.gemini/antigravity-ide/brain/2a728d9e-e022-4932-903c-0e1c71280623/nike_style_athlete_1790575810711.png', dest: 'e:/ironise/frontend/public/nike_style_athlete.png' }
];

files.forEach(f => {
  if (fs.existsSync(f.src)) {
    fs.copyFileSync(f.src, f.dest);
    console.log(`Copied ${f.src} -> ${f.dest}`);
  }
});
