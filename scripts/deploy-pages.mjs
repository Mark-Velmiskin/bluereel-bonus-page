// Publishes ./dist to the gh-pages branch (GitHub Pages source: gh-pages / root).
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' })
const remote = execSync('git remote get-url origin').toString().trim()

writeFileSync('dist/.nojekyll', '')
run('git init -q -b gh-pages')
run('git add -A')
run('git commit -q -m "Deploy"')
run(`git push -q -f ${remote} gh-pages`)
console.log('Deployed to gh-pages')
