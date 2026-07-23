import fs from 'fs';

const plan = fs.readFileSync('implementation_plan.md', 'utf8');
const sql = fs.readFileSync('seed.sql', 'utf8');

const prefix = plan.split('```sql')[0] + '```sql\n';
const suffix = '\n```\n</details>\n' + plan.split('</details>\n')[1];

fs.writeFileSync('implementation_plan.md', prefix + sql.trim() + suffix);
console.log('Updated plan');
